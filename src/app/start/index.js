

async function sistema(props) {
    const WhatsApp = require('../../whatsapp/index');
    const mensage = require(`../sistema/${props.Operation}/index.js`);

    WhatsApp
        .then((Client) => Client.openChat('5511967456346@c.us').then(Client.waPage.screenshot({ path: 'screenshot.png' })) /* mensage( { Client, props }) */)
        .catch((erro) => {
            console.log(erro);
        });
}

module.exports = sistema