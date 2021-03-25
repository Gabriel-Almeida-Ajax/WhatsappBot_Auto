

async function sistema(props) {
    const WhatsApp = require('../../whatsapp/index');
    const mensage = require(`../sistema/${props.Operation}/index.js`);

    WhatsApp
        .then((Client) => Client.openChat('5511962354427@c.us')
            .then(Client.waPage.setViewport({
                width: 1280,
                height: 720,
            })
                .then(Client.waPage.screenshot({ clip: { x: 460, y: 0, width: 820, height: 720 }, path: 'screenshot.png' }))) /* mensage( { Client, props }) */)
        .catch((erro) => {
            console.log(erro);
        });
}

module.exports = sistema