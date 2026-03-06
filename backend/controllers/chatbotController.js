const { OpenAI } = require("openai");

exports.chat = async (req, res) => {
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });
    const { message, history } = req.body;

    if (!message) {
        return res.status(400).json({ error: "Message is required" });
    }

    try {
        // Construct standard ChatGPT messages array
        // Start with a strong system prompt for healthcare only
        const messages = [
            {
                role: "system",
                content:
                    "You are 'HospitalFlow AI', a dedicated healthcare assistant for a hospital management platform. " +
                    "Your role is to provide helpful, health-related information and assist users with hospital-related queries. " +
                    "STRICT RULE: ONLY answer questions related to healthcare, medical topics, or hospital operations. " +
                    "If a user asks about anything else (e.g. coding, entertainment, unrelated general knowledge), " +
                    "politely explain that you are a healthcare assistant and cannot answer that.",
            },
        ];

        // Format history for OpenAI
        if (history && Array.isArray(history)) {
            history.forEach((h) => {
                // OpenAI roles: "user", "assistant", "system"
                // Gemini roles: "user", "model"
                const role = h.role === "model" ? "assistant" : h.role;
                if (h.parts && h.parts[0]?.text) {
                    messages.push({ role, content: h.parts[0].text });
                }
            });
        }

        // Add the current user message
        messages.push({ role: "user", content: message });

        const completion = await openai.chat.completions.create({
            model: "gpt-4.1-mini", // Or gpt-4 if preferred
            messages: messages,
            max_tokens: 500,
        });

        const botReply = completion.choices[0].message.content;

        res.json({ reply: botReply });
    } catch (error) {
        console.error("OpenAI Error:", error);
        res.status(500).json({
            error: "Failed to connect to AI assistant",
            details: error.message,
        });
    }
};
