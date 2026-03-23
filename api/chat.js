export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { messages, system } = req.body || {};

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({
        error: "Messages must be a non-empty array",
      });
    }

    if (!system || typeof system !== "string") {
      return res.status(400).json({
        error: "System prompt must be a non-empty string",
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: "GEMINI_API_KEY missing on server",
      });
    }

    const safeMessages = messages
      .filter((m) => m && (m.role === "user" || m.role === "assistant"))
      .map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [
          {
            text:
              typeof m.content === "string"
                ? m.content
                : String(m.content ?? ""),
          },
        ],
      }))
      .filter((m) => m.parts[0].text.trim().length > 0);

    if (safeMessages.length === 0) {
      return res.status(400).json({
        error: "No valid messages to send",
      });
    }

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: system }],
          },
          contents: safeMessages,
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 500,
          },
        }),
      }
    );

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      return res.status(response.status).json({
        error:
          data?.error?.message ||
          JSON.stringify(data) ||
          "Gemini request failed",
      });
    }

    const text =
      data?.candidates?.[0]?.content?.parts
        ?.map((p) => p.text || "")
        .join("")
        .trim() || "عذرًا، لم أتمكن من الرد.";

    return res.status(200).json({
      content: [{ text }],
    });
  } catch (error) {
    return res.status(500).json({
      error: error?.message || "Internal server error",
    });
  }
}