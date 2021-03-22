class WebWhatsapp {
    constructor() {
      this.Web = require('venom-bot');
      this.name = 'Root-Session';
    }
  
    async start() {
      console.log('> Start session in WebWhatsapp with:')
      return Promise.resolve(this.Web.create(this.name))
    }
  
  }
  
  module.exports = new WebWhatsapp().start();