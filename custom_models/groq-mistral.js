const dotenv = require('dotenv');
const Groq = require("groq-sdk");
dotenv.config();

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

async function groqPrompt(prompt) {
    try {
        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: prompt
                }
            ],
            model: "mixtral-8x7b-32768"
        });
        return completion.choices[0]?.message?.content || "";
    } catch (error) {
        console.error("Error fetching chat completion:", error);
    }
}

class GroqMistral {
    constructor(options) {
        // Provider ID can be overridden by the config file (e.g. when using multiple of the same provider)
        this.providerId = options.id || 'custom provider';
    
        // options.config contains any custom options passed to the provider
        this.config = options.config;
    }

    id() {
        return this.providerId;
      }
  

    async callApi(prompt, context) {
        const response = await groqPrompt(prompt)

        const totalLen = response.length
        const promptLen = prompt.length
        const completionLen = totalLen - promptLen


        return {
            id: this.providerId,
            output: response,
            tokenUsage: {
                total: totalLen,
                prompt: promptLen,
                completion: completionLen,
            },
        }
    }
}

module.exports = GroqMistral

