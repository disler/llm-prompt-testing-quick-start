const Anthropic = require('@anthropic-ai/sdk');
const dotenv = require('dotenv');
dotenv.config();

class AnthropicApi {
    constructor(options) {
        this.anthropic = new Anthropic({
            apiKey: process.env.ANTHROPIC_API_KEY // defaults to process.env["ANTHROPIC_API_KEY"]
        });
        this.providerId = options.id || 'claude-3-opus-20240229';
        this.config = options.config;
    }

    id() {
        return this.providerId;
    }

    async callApi(prompt) {
        try {
            // await new Promise(resolve => setTimeout(resolve, 500)); // Sleep for 0.5 seconds
            const msg = await this.anthropic.messages.create({
                max_tokens: 1024,
                // model: "claude-3-opus-20240229",
                model: "claude-3-sonnet-20240229",
                messages: [{ role: "user", content: prompt }],
            });
            console.log('msg:::::::', msg);
            const response = msg.content?.[0].text
            const totalLen = response.length;
            const promptLen = prompt.length;
            const completionLen = totalLen - promptLen;

            return {
                id: this.providerId,
                output: response,
                tokenUsage: {
                    total: totalLen,
                    prompt: promptLen,
                    completion: completionLen,
                },
            };
        } catch (error) {
            throw error
            console.error("Error fetching chat completion:", error);
        }
    }
}

module.exports = AnthropicApi;
