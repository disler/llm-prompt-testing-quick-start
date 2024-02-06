const CustomModelBase = require('./customModelBase');


class Mistral7b extends CustomModelBase {
    constructor(options) {
      super(options);
      // Provider ID can be overridden by the config file (e.g. when using multiple of the same provider)
      this.providerId = options.id || 'custom provider';
  
      // options.config contains any custom options passed to the provider
      this.config = options.config;

      this.model_file_name = "dolphin-2.5-mixtral-8x7b.Q2_K.llamafile"
        
      this.model_short_name = "dolphin-2.5-mixtral"
    }
  
    id() {
      return this.providerId;
    }

    customizePrompt(prompt) {
        return `[INST]${prompt}[/INST]`
    }

    customizeParse(rawResponse) {
      // get everything after [/INST] including new lines
      const regex = /\[\/INST\](.*)/s;
      const output = regex.exec(rawResponse)?.[1];
      return output || rawResponse;
  }
  }
  
  module.exports = Mistral7b;