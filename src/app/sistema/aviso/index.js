
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
            .sendMentioned(
                `${fnc.numero}@c.us`,
                `Olá @${fnc.numero}, \n\nPeço lhe perdão pela ultima mensagem. Houve um equivoco no envio!\n\nPor gentileza, confirme apenas seu documento e exclua o errado.\n\nAtt. Gabriel Santos;`,
                [`${fnc.numero}`]
            )
            .then(() => resolve(fnc) )
            .catch((erro) => console.log(erro))

        // Client
        //     .sendFile(
        //         `${fnc.numero}@c.us`,
        //         `${props.Path}\\Aviso_${fnc.matricula}.pdf`, /**************************************************************************************************** */
        //         `Aviso_${fnc.referencia} - ${fnc.matricula} - ${fnc.nome} - ${fnc.numero}`,
        //         'Instuções: Verifique o documento, e caso não haja objeção, confirme de acordo.\n\n*'
        //     )
        //     .then((result) => {
        //         console.log("> Sending vacation warning...")
        //         Client
        //             .sendFile(
        //                 `${fnc.numero}@c.us`,
        //                 `${props.Path}\\Recibo_${fnc.matricula}.pdf`, /**************************************************************************************************** */
        //                 `Recibo_${fnc.referencia} - ${fnc.matricula} - ${fnc.nome} - ${fnc.numero}`,
        //                 'Instuções: Verifique o documento, e caso não haja objeção, confirme de acordo.\n\n*'
        //             ).then((result) => {
        //                 console.log("> Sending vacation receipt...")

        //                 // Controll of documents
        //                 Files.successSend(fnc, `${props.Path}\\Aviso_`, `${props.Path}\\Aviso_${fnc.matricula}.pdf`)
        //                 Files.successSend(fnc, `${props.Path}\\Recibo_`, `${props.Path}\\Recibo_${fnc.matricula}.pdf`)
        //                 console.log("> Success when sending warning and values...")

        //                 // Send @tagged message
        //                 Client
        //                     .sendMentioned(
        //                         `${fnc.numero}@c.us`,
        //                         `Olá @${fnc.numero}, \n\nInstruções: Verifique o documento, e confirme dizendo *Estou de acordo com o recibo encaminhado*;\n\nTambém pode acessar seus documentos em: https://meusdocumentos.lello.com.br/\n\nAtenciosamente, Equipe DP/Férias.`,
        //                         [`${fnc.numero}`]
        //                     )
        //                     .then((result) => {

        //                         console.log("> Finished typing for: " + fnc.nome)
        //                         resolve(fnc)
        //                     })
        //                     .catch((erro) => {
        //                         Files.errSend(fnc, `${props.Path}\\Aviso_`, `${props.Path}\\Aviso_${fnc.matricula}.pdf`)
        //                         Files.errSend(fnc, `${props.Path}\\Recibo_`, `${props.Path}\\Recibo_${fnc.matricula}.pdf`)
        //                         console.error(`> Error in ${fnc.referencia} - ${fnc.matricula} - ${fnc.nome} - ${fnc.numero}`)
        //                         console.error('Error when sending mentioned message on col: ', erro); //return object error
        //                         resolve(erro)
        //                     });
        //             })
        //             .catch((erro) => {
        //                 Files.errSend(fnc, `${props.Path}\\Aviso_`, `${props.Path}\\Aviso_${fnc.matricula}.pdf`)
        //                 Files.errSend(fnc, `${props.Path}\\Recibo_`, `${props.Path}\\Recibo_${fnc.matricula}.pdf`)
        //                 console.error(`> Error in ${fnc.referencia} - ${fnc.matricula} - ${fnc.nome} - ${fnc.numero}`)
        //                 console.error('Error when sending sendFile: ', erro); //return object error
        //                 resolve(erro)
        //             });
        //     }).catch((erro) => {
        //         Files.errSend(fnc, `${props.Path}\\Aviso_`, `${props.Path}\\Aviso_${fnc.matricula}.pdf`)
        //         Files.errSend(fnc, `${props.Path}\\Recibo_`, `${props.Path}\\Recibo_${fnc.matricula}.pdf`)
        //         console.error(`> Error in ${fnc.referencia} - ${fnc.matricula} - ${fnc.nome} - ${fnc.numero}`)
        //         console.error('Error when sending sendFile: ', erro.text); //return object error
        //         resolve(erro)
        //     })
    });

}



module.exports = mensage