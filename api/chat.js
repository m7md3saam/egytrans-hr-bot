export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { messages, system } = req.body;

    if (!messages || !system) {
      return res.status(400).json({ error: "Missing messages or system prompt" });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      console.error("ANTHROPIC_API_KEY not found in server environment");
      return res.status(500).json({ error: "Server configuration error" });
    }

    const r = await fetch("https://api.anthropic.com/v1/messages", {
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
        messages
      })
    });

    const data = await r.json();

    if (!r.ok) {
      console.error(`Anthropic API Error ${r.status}:`, data);
      return res.status(r.status).json({ error: data });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("Serverless function error:", error.message);
    return res.status(500).json({
      error: error.message || "Internal server error"
    });
  }
}