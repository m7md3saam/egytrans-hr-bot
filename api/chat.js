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
      console.error("GEMINI_API_KEY not found in server environment");
      return res.status(500).json({
        error: "Gemini API key missing on server",
      });
    }

    const safeMessages = messages
      .filter((m) => m && (m.role === "user" || m.role === "assistant"))
      .map((m) => ({
        role: m.role,
        content:
          typeof m.content === "string"
            ? m.content
            : String(m.content ?? ""),
      }))
      .filter((m) => m.content.trim().length > 0);

    if (safeMessages.length === 0) {
      return res.status(400).json({
        error: "No valid messages to send",
      });
    }

    // تحويل history من صيغة Anthropic/OpenAI-style إلى Gemini contents[]
    const contents = safeMessages.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

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
          contents,
        }),
      }
    );

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      console.error("Gemini API Error:", {
        status: response.status,
        data,
      });

      return res.status(response.status).json({
        error:
          data?.error?.message ||
          data?.error ||
          data ||
          "Gemini request failed",
      });
    }

    const text =
      data?.candidates?.[0]?.content?.parts
        ?.map((p) => p.text || "")
        .join("")
        .trim() || "";

    return res.status(200).json({
      content: [{ text: text || "عذرًا، لم أتمكن من الرد." }],
      raw: data,
    });
  } catch (error) {
    console.error("Serverless function error:", error);
    return res.status(500).json({
      error: error?.message || "Internal server error",
    });
  }
}