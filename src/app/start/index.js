

async function sistema(props) {
    const WhatsApp = require('../../whatsapp/index');
    const mensage = require(`../sistema/${props.Operation}/index.js`);

    WhatsApp
        .then((Client) => { Client.waPage.setViewport({ width: 1280, height: 720 }); mensage({ Client, props }); })
        .catch((erro) => {
            console.log(erro);
        });
}

module.exports = sistema