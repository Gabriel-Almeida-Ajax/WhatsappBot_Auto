
async function mensage({ Client, props }) {
    //console.log("Aviso", props)


    for (const [idx, fnc] of props.state.Cpdf.entries()) {
        console.log(" ! > Sending in: ", new Date().toLocaleString("PT-br", { timeStyle: "medium", hour12: false }))
        const todo = await send({ fnc, Client, props });
        console.log(`${fnc.referencia} - ${fnc.matricula} - ${fnc.nome} - ${fnc.numero} ${idx + 1} de ${props.state.Cpdf.length}`)
    }
    console.log('Finished process!');
    process.exit()
}



async function send({ fnc, Client, props }) {
    const Files = require('../../../services/successSend/index.js');


    console.log("> Joined in execution with: ", fnc)
    return new Promise((resolve, reject) => {

        // Send file (venom will take care of mime types, just need the path)
        // you can also upload an image using a valid HTTP protocol

        Client
            .sendFile(
                `${fnc.numero}@c.us`,
                `${props.Path}\\Recibo_${fnc.matricula}.pdf`, /**************************************************************************************************** */
                `Recibo_${fnc.referencia} - ${fnc.matricula} - ${fnc.nome} - ${fnc.numero}`,
                'Instuções: Verifique o documento, e caso não haja objeção, confirme de acordo.\n\n*'
            ).then((result) => {
                console.log("> Sending vacation receipt...")

                // Controll of documents
                Files.successSend(fnc, `${props.Path}\\Recibo_`, `${props.Path}\\Recibo_${fnc.matricula}.pdf`)
                console.log("> Success when sending warning and values...")

                // Send @tagged message
                Client
                    .sendMentioned(
                        `${fnc.numero}@c.us`,
                        `Olá @${fnc.numero}, boa tarde! \n\nPara seu conhecimento, segue em anexo o recibo de suas férias, e não é necessario retorno;\n\nCaso tenha alguma duvida não relacionada a férias: @5511933686169 ou @5511933686169!\n\nTambém pode acessar seus documentos em: https://meusdocumentos.lello.com.br/\n\nAtenciosamente, Gabriel Santos.`,
                        [`${fnc.numero}`, '5511933686169', '5511933686169']
                    );

                // Send a list of contact cards
                Client
                    .sendContactVcardList(`${fnc.numero}@c.us`, [
                        '5511974611630@c.us',
                        '5511933686169@c.us'
                    ])
                    .then((result) => {

                        console.log("> Finished typing for: " + fnc.nome)
                        resolve(fnc)
                    })
                    .catch((erro) => {
                        Files.errSend(fnc, `${props.Path}\\Recibo_`, `${props.Path}\\Recibo_${fnc.matricula}.pdf`)
                        console.error(`> Error in ${fnc.referencia} - ${fnc.matricula} - ${fnc.nome} - ${fnc.numero}`)
                        console.error('Error when sending sendContactVcardList: ', erro.text); //return object error
                        resolve(erro)
                    });
            })
            .catch((erro) => {
                Files.errSend(fnc, `${props.Path}\\Recibo_`, `${props.Path}\\Recibo_${fnc.matricula}.pdf`)
                console.error(`> Error in ${fnc.referencia} - ${fnc.matricula} - ${fnc.nome} - ${fnc.numero}`)
                console.error('Error when sending sendFile: ', erro.text); //return object error
                resolve(erro)
            });
    });

}



module.exports = mensage