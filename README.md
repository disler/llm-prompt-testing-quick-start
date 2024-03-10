# LLM Evaluation & Testing quick start with [Promptfoo](https://www.promptfoo.dev)
> Better, Faster, Cheaper Prompts with LLM Testing & Evaluation

![Last LLM Standing Wins](imgs/last-llm-standing-wins.png)
![Local On Device LLMs Are The Future](imgs/local-on-device-llms-are-the-future-but-not-yet.png)
![Gemini Pro vs GPT-3.5 Turbo](imgs/prompt-testing-gemini-vs-gpt-3.5-turbo.png)
![Fast, Cheap, Accurate](imgs/fast-cheap-accurate-prompt-testing-with-promptfoo.png)

## Update on format
- In EXPERIMENT Branch We're modernizing things a little bit
- Run commands explicitly from package.json
- Use the promptfoo library and additional node modules inside code (for grok and dotenv etc)
- use .env and dotenv

## Watch the video tutorials
- Last LLM Standing Wins [Video Walk Through](https://youtu.be/Cy1Z8J0anKw). In this video we build a visual LLM benchmarking tool built on top of Promptfoo.
- Check out the brief [Video Tutorial](https://youtu.be/KhINc5XwhKs) where we highlight the key features of Promptfoo and how to get started with this repo.
- Compare [Gemini Pro vs GPT-3.5 Turbo](https://youtu.be/V_SyO0t7TZY) with Promptfoo.
- Monitor the performance of [Local, On Device LLMs](https://youtu.be/urymhRw86Fc) with prompt testing


## Setup

### API Keys

- To get started with OpenAI, set your OPENAI_API_KEY environment variable.
  - `export OPENAI_API_KEY=<your key>`
  - [OpenAI Setup Docs](https://promptfoo.dev/docs/providers/openai)
- To get started with Gemini, set your VERTEX_API_KEY environment variable.
  - `export VERTEX_API_KEY=<your key>`
  - `export VERTEX_PROJECT_ID=<your google cloud project id>`
  - [Gemini Setup Docs](https://promptfoo.dev/docs/providers/vertex)
- To setup anthropic
  - `export ANTHROPIC_API_KEY=<your key>
  - [Anthropic Setup Docs](https://promptfoo.dev/docs/providers/anthropic)
- To setup GROQ
  - `export GROQ_API_KEY=`<your key>
  - [Groq Setup Docs](https://promptfoo.dev/docs/providers/groq)

### Global Install

- Install promptfoo
  - `npm install -g promptfoo`
  - [Install Docs](https://www.promptfoo.dev/docs/installation)
- cd into the directory you want to test
- Run `promptfoo eval` to evaluate

### Local Install
- Install promptfoo
  - `npm install promptfoo`
  - [Install Docs](https://www.promptfoo.dev/docs/installation)
- Update the `package.json` file to include the following scripts
  - ```json
    "scripts": {
      "eval": "promptfoo eval -c `./path/to/your/promptfooconfig.yaml`",
      "view": "promptfoo view"
    }
    ```
  - See the package.json for examples

### Opinionated Setup
- I recommend using separate prompt.txt, test.txt, promptfooconfig.yaml with a dedicated directory and package.json script for each prompt you want to test.
- This way you can create multiple test + prompt combinations.
- For example this package.json: script section show cases running different tests
```json
"scripts": {
    "nlq_to_sql_ten": "source .env && promptfoo eval -c ./nlq_to_sql/promptfooconfig.yaml -t ./nlq_to_sql/test_ten.yaml -p ./nlq_to_sql/prompt.txt --no-cache --output ./nlq_to_sql/output_ten.json",
    "nlq_to_sql_twenty": "source .env && promptfoo eval -c ./nlq_to_sql/promptfooconfig.yaml -t ./nlq_to_sql/test_twenty.yaml -p ./nlq_to_sql/prompt.txt --no-cache --output ./nlq_to_sql/output_twenty.json",
    "view": "promptfoo view"
  },
```

### Promptfoo delay if you run into API rate limit issues (anthropic + grok)
- You can set a delay between prompt tests by using the `PROMPTFOO_DELAY_MS` env variable.
- [Delay Docs](https://www.promptfoo.dev/docs/providers/openai/#openai-rate-limits)

### Install llamafile to test local models
> You can reuse the `./custom_models/customModelBase.js` to test llama models locally. Or you can create a new .js file for your model. See [promptfoo custom model docs](https://www.promptfoo.dev/docs/providers/custom-api).
- Read the instructions here and download the llama files
  - https://github.com/Mozilla-Ocho/llamafile?tab=readme-ov-file#quickstart
  - I recommend installing `mistral-7b-instruct-v0.1-Q4_K_M-main.llamafile` for the best results for 4GB models
- Place the model into the custom_models/ directory
- Make sure the name of your model file matches the 
- Create a <your model name>.js file in custom_models/ for your model and inherit the CustomModelBase class. Use `custom_models/mistral-7b-v0.1-Q4.js` as a template.
- Add the path to the `custom_models/<your model name>.js` in the ./\*/promptfooconfig.yaml providers section
- Run `promptfoo eval` to evaluate your model



### Quickly test your prompts on different custom_models - 
- Use the `sh run_local_llm.sh` script to quickly test prompts on different custom_models. Update the prompt variable to be whatever prompt you want to test.

*If you want to run OpenAI exclusively comment out other models in the ./\*/promptfooconfig.yaml providers section.*

## Commands

`promptfoo eval` - load and evaluate in the current directory

`promptfoo eval --no-cache` - load and evaluate in the current directory without using the cache

`promptfoo view` - load the UI in the current directory

## Prompt Evaluation Elements
- Providers
- Prompts
- Assertions
- Variables

## Use Cases & Value Prop of LLM Testing & Evaluation

- 💰 Save Money & Same Time (Resource Optimization)
  - With LLM testing you can determine if you need GPT-4 or if you can save money and time with GPT-3
  - You can find the minimum number of tokens you can use without sacrificing quality
  - Compare different LLM providers to determine which is the best fit for your application
- 👍 Ship with confidence (Validate Accuracy)
  - Gain certainty that your prompt will generate the results you want
  - Confidently generate json responses
  - Compare prompts to determine which is more accurate
- ✅ Prevent Regressions (Consistency)
  - Ensure that the output of a prompt is within the bounds of your expectations
  - Make sure that when you update your prompt it doesn't break your application
  - With version control and CI/CD you can ensure your prompts are always working as expected

## Organizational Pattern
- `/<name of agent/test 1>`
  - `/prompt.txt` - the prompt(s) to test
  - `/test.yaml` - variables and assertions
  - `/promptfooconfig.yaml` - llm config
- `/<name of agent/test N>`
  - `...`
- `...`

## Important Docs & Resources
- Vertex Promptfoo Provider
  - https://www.promptfoo.dev/docs/providers/vertex
- Vertex AI Pricing
  - https://cloud.google.com/vertex-ai/pricing
- Great Breakdown of Gemini pro vs gpt-3.5
  - https://klu.ai/blog/gemini-pro-vs-gpt-3-5-turbo
  - https://www.promptfoo.dev/docs/guides/gemini-vs-gpt
- Don't repeat test data
  - https://www.promptfoo.dev/docs/configuration/guide#avoiding-repetition
- Ensure output is in json format and the keys exist
  - https://www.promptfoo.dev/docs/guides/evaluate-json/#ensuring-that-outputs-are-valid-json
- Reference prompt, and test files using globs and lists
  - https://www.promptfoo.dev/docs/configuration/parameters#prompts-from-file
- Assertions ('equals', 'contains', 'is-json', 'levenshtein-distance', 'python', 'regex', 'llm-rubric', and more)
  - https://www.promptfoo.dev/docs/configuration/expected-outputs/
- Example using Scenarios for test assertion variables
  - https://github.com/promptfoo/promptfoo/blob/main/examples/multiple-translations-scenarios/promptfooconfig.yaml
- LLM Providers
  - https://www.promptfoo.dev/docs/providers
- Vertex Provider Src
  - https://github.com/promptfoo/promptfoo/blob/main/src/providers/vertex.ts#L7-L22

## Gemini Pro vs GPT-3.5 Turbo Highlights
> Results generated by GPT-4 and then tweaked - take it with two grains of salt.
- Resources: 
  - Source Blog: https://klu.ai/blog/gemini-pro-vs-gpt-3-5-turbo
  - Vertex Pricing: https://cloud.google.com/vertex-ai/pricing
  - Promptfoo: https://www.promptfoo.dev/docs/guides/gemini-vs-gpt

#### Overall:
- `Gemini-Pro ⚪️⚪️⚪️⚪️🟢|⚪️⚪️⚪️⚪️⚪️ GPT-3.5 Turbo`
- Explanation: Gemini-Pro has a small to medium sized edge and is likely a better fit for most applications.

#### Pricing Comparison:
- `Gemini-Pro ⚪️⚪️⚪️⚪️⚪️|⚪️⚪️⚪️⚪️⚪️ GPT-3.5 Turbo`
- Explanation: Gemini-Pro is the same price as GPT-3.5 Turbo.

#### Speed:
- `Gemini-Pro ⚪️🟢🟢🟢🟢|⚪️⚪️⚪️⚪️⚪️ GPT-3.5 Turbo`
- Explanation: Gemini-Pro demonstrates superior speed, processing inputs faster than GPT-3.5 Turbo.

#### Instruction Following:
- `Gemini-Pro ⚪️⚪️🟢🟢🟢|⚪️⚪️⚪️⚪️⚪️ GPT-3.5 Turbo`
- Explanation: Gemini-Pro excels at following instructions accurately, outperforming GPT-3.5 Turbo in this regard.

#### Content Generation:
- `Gemini-Pro ⚪️⚪️⚪️⚪️⚪️|🟢🟢⚪️⚪️⚪️ GPT-3.5 Turbo`
- Explanation: GPT-3.5 Turbo has a slight advantage in content generation, producing more nuanced and varied outputs.

#### Language Understanding:
- `Gemini-Pro ⚪️⚪️🟢🟢🟢|⚪️⚪️⚪️⚪️⚪️ GPT-3.5 Turbo`
- Explanation: Gemini-Pro shows superior language understanding, especially in complex comprehension tasks.

#### Bias:
- `Gemini-Pro ⚪️⚪️⚪️⚪️⚪️|🟢🟢🟢⚪️⚪️ GPT-3.5 Turbo`
- Explanation: Gemini seems to exibit more google specific bias than GPT-3.5 Turbo.

#### API Design and Developer Experience:
- `Gemini-Pro ⚪️⚪️⚪️⚪️⚪️|🟢🟢⚪️⚪️⚪️ GPT-3.5 Turbo`
- Explanation: OpenAIs API is much easier to use than Vertex AI's API.

#### AI Alignment and Safety:
- `Gemini-Pro ⚪️⚪️⚪️⚪️⚪️|🟢🟢🟢🟢⚪️ GPT-3.5 Turbo`
- Explanation: Gemini-Pro is extremely restricted in its capabilities.

#### Multimodal Capabilities:
- `Gemini-Pro 🟢🟢🟢🟢🟢|⚪️⚪️⚪️⚪️⚪️ GPT-3.5 Turbo`
- *Explanation: Gemini-Pro supports both text and image inputs, offering a significant advantage over GPT-3.5 Turbo, which is limited to text only.*



## Great LLM Testing & Evaluation Patterns
- Trim your prompts to the minimum number of tokens needed to generate the desired output
- Always compare multiple LLM models to see if you need a expensive, slower model or if a cheaper, faster model will work
- Add as many test assertions as possible to ensure your prompt is generating the output you expect
- Your prompts don't 'always' need to validate every assertions, but they should always validate the most important assertions and most test cases
- Use JSON as the output format for your prompt this makes it easy to validate the output
- Isolate your prompts into separate files for readability and maintainability
- Identify which parts of your prompt are variables and which are static then separate them into different test variables
- Use the `--no-cache` flag to ensure you are always testing the latest version of your prompt
- Use your users as THE primary source for your test cases. Testing every use case your users will encounter is the best way to ensure your prompt is working as expected. This is especially true for prompts that are used in production. 
- Focus on asserting an acceptable range of results over specific, exact results. LLMs are non-deterministic and will generate different results each time. Your tests should account for this.
