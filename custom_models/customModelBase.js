const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

/**
 * Reusable base class for custom models.
 */
class CustomModelBase {
    constructor(options) {
      // Provider ID can be overridden by the config file (e.g. when using multiple of the same provider)
      this.providerId = options.id || 'custom provider';
  
      // options.config contains any custom options passed to the provider
      this.config = options.config;

      // set this to the name of the model file in custom_models/
      this.model_file_name = ''

        // set this to be a short name
        this.model_short_name = ''

        this.prompt_suffix = 'OUTPUT ->'
    }
  
    id() {
      return this.providerId;
    }

    /**
     * Customize prompt before running it. Some models may require special formatting [INST]...[/INST]
     */
    customizePrompt(prompt) {
        return `${prompt} ${this.prompt_suffix}`
    }

    /**
     * Customize the raw response before returning it to the user. Some models may require special parsing.
     */
    customizeParse(rawResponse) {
      // parse everything after the first OUTPUT:
      const split = rawResponse.split(this.prompt_suffix)
      if (split.length > 1) {
        return split[1].trim()
      }
      return rawResponse
    }

    dumpToLog(output, prefix, id, timeBasedUniqueId) {
      const uniqueId = id ? `${id}_${timeBasedUniqueId}` : timeBasedUniqueId ;

        // create logs folder if it doesn't exist
        if (!fs.existsSync(path.resolve(__dirname, "..", 'logs'))){
            fs.mkdirSync(path.resolve(__dirname, "..", 'logs'));
        }

        const writePath = path.resolve(__dirname, "..", 'logs', `${prefix}__${uniqueId}__${this.model_short_name}.txt`)

        // dump raw output to file with unique id
        fs.writeFileSync(writePath, output);
    }
  
    async runPrompt(prompt, temp = 0.3) {
      return new Promise((resolve, reject) => {
          const scriptPath = path.resolve(__dirname, this.model_file_name);
          const customizedPrompt = this.customizePrompt(prompt)
          const shellCommand = `"${scriptPath}" --temp ${temp} -p "${customizedPrompt}"`;

          exec(shellCommand, (err, stdout, stderr) => {
              if (err) {
                  reject(err);
                  return;
              }
              console.log(`stdout`, stdout)
              resolve(stdout);
          });
      });
  }
    async callApi(prompt, context) {
        // Add your custom API logic here
        // Use options like: `this.config.temperature`, `this.config.max_tokens`, etc.
        // console.log('Vars for this test case:', JSON.stringify(context.vars));

        const rawOutput = await this.runPrompt(prompt, this.config?.temperature || 0.5);

      const timeBasedUniqueId = Date.now()

        this.dumpToLog(rawOutput, "raw_output", context.vars.id, timeBasedUniqueId)

        const parsedOutput = this.customizeParse(rawOutput)

        this.dumpToLog(parsedOutput, "parsed_output", context.vars.id, timeBasedUniqueId)

        const output = parsedOutput;

        const totalLen = prompt.length + output.length;
        const promptLen = prompt.length;
        const completionLen = output.length;

        return {
        // Required
        output,

        // Optional
        tokenUsage: {
            total: totalLen,
            prompt: promptLen,
            completion: completionLen,
        },
      };
    }
  }
  
  module.exports = CustomModelBase;