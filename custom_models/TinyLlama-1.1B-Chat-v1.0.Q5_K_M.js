const CustomModelBase = require('./customModelBase');


class TinyLlama1b extends CustomModelBase {
    constructor(options) {
      super(options);
      // Provider ID can be overridden by the config file (e.g. when using multiple of the same provider)
      this.providerId = options.id || 'custom provider';
  
      // options.config contains any custom options passed to the provider
      this.config = options.config;

      this.model_file_name = "TinyLlama-1.1B-Chat-v1.0.Q5_K_M.llamafile"
        
      this.model_short_name = "TinyLlama-1.1B-Chat-v1.0.Q5_K_M"
    }
  
    id() {
      return this.providerId;
    }
  }
  
  module.exports = TinyLlama1b;