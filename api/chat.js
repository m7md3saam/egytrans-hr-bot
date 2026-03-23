export default async function handler(req, res) {
  // دعم preflight لو احتاجه المتصفح
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
      return res.status(400).json({ error: "Messages must be a non-empty array" });
    }

    if (!system || typeof system !== "string") {
      return res.status(400).json({ error: "System prompt must be a non-empty string" });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      console.error("ANTHROPIC_API_KEY not found in server environment");
      return res.status(500).json({ error: "Server configuration error" });
    }

    // تنظيف الرسائل قبل الإرسال
    const safeMessages = messages
      .filter((m) => m && (m.role === "user" || m.role === "assistant"))
      .map((m) => ({
        role: m.role,
        content: typeof m.content === "string" ? m.content : String(m.content ?? "")
      }))
      .filter((m) => m.content.trim().length > 0);

    if (safeMessages.length === 0) {
      return res.status(400).json({ error: "No valid messages to send" });
    }

    const anthropicResponse = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 900,
        system,
        messages: safeMessages
      })
    });

    const data = await anthropicResponse.json().catch(() => null);

    if (!anthropicResponse.ok) {
      console.error("Anthropic API Error:", {
        status: anthropicResponse.status,
        data
      });

      return res.status(anthropicResponse.status).json({
        error:
          data?.error?.message ||
          data?.error ||
          data ||
          "Anthropic request failed"
      });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("Serverless function error:", error);
    return res.status(500).json({
      error: error?.message || "Internal server error"
    });
  }
}