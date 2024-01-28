const CustomModelBase = require('./customModelBase');


class Mistral7bV2 extends CustomModelBase {
    constructor(options) {
      super(options);
      // Provider ID can be overridden by the config file (e.g. when using multiple of the same provider)
      this.providerId = options.id || 'custom provider';
  
      // options.config contains any custom options passed to the provider
      this.config = options.config;

      this.model_file_name = "mistral-7b-instruct-v0.2-Q5_K_M-main.llamafile"
        
      this.model_short_name = "mistral-7b-inst-v2"
    }
  
    id() {
      return this.providerId;
    }

    customizePrompt(prompt) {
        return `[INST]${prompt}[/INST]`
    }
  }
  
  module.exports = Mistral7bV2;