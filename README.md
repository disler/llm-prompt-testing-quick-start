# LLM Evaluation & Testing quick start with Promptfoo
> Better, Faster, Cheaper Prompts with LLM Testing & Evaluation

## Setup

- Install promptfoo
  - `npm install -g promptfoo`
- To get started, set your OPENAI_API_KEY environment variable.
  - `export OPENAI_API_KEY=<your key>`
  - [Install Docs](https://www.promptfoo.dev/docs/installation)
- cd into the directory you want to test
- Run `promptfoo eval` to evaluate

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
  - With LLM testing you cna determine if you need GPT-4 or if you can save money and time with GPT-3
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
- `/<name of agent 1>`
  - `/prompt.txt` - the prompt(s) to test
  - `/test.yaml` - variables and assertions
  - `/promptfooconfig.yaml` - llm config
- `/<name of agent N>`
  - `...`
- `...`

## Important Docs
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

## Great LLM Testing & Evaluation Patterns
- Trim your prompts to the minimum number of tokens needed to generate the desired output
- Always compare multiple LLM models to see if you need a expensive, slower model or if a cheaper, faster model will work
- Add as many test assertions as possible to ensure your prompt is generating the output you expect
- Your prompts don't 'always' need to validate every assertions, but they should always validate the most important assertions and most test cases
- Use JSON as the output format for your prompt this makes it easy to validate the output
- Isolate your prompts into separate files for readability and maintainability
- Identify which parts of your prompt are variables and which are static then separate them into different test variables
- Use the `--no-cache` flag to ensure you are always testing the latest version of your prompt