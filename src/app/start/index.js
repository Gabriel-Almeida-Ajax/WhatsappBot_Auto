

async function sistema(props) {
    const WhatsApp = require('../../whatsapp/index');
    const mensage = require(`../sistema/Aviso/index.js`);
    
    WhatsApp
        .then((Client) => mensage( { Client, props }))
        .catch((erro) => {
            console.log(erro);
        });
}

module.exports = sistema