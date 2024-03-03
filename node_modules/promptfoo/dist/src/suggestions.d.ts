import type { TokenUsage } from './types';
interface GeneratePromptsOutput {
    prompts?: string[];
    error?: string;
    tokensUsed: TokenUsage;
}
export declare function generatePrompts(prompt: string, num: number): Promise<GeneratePromptsOutput>;
export {};
//# sourceMappingURL=suggestions.d.ts.map