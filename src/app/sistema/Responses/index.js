async function mensage({ Client, props }) {
    //console.log("Aviso", props)


    for (const [idx, fnc] of props.state.funcionarios.entries()) {
        console.log(" ! > Opening chat in: ", new Date().toLocaleString("PT-br", { timeStyle: "medium", hour12: false }))
        const todo = await getResponse({ fnc, Client, props });
        console.log(`${fnc.referencia} - ${fnc.matricula} - ${fnc.nome} - ${fnc.numero} ${idx + 1} de ${props.state.Cpdf.length}`)
    }
    console.log('Finished process!');
    process.exit()
}

async function getResponse({ fnc, Client, props }) {

    Client.getMessageById(`${fnc.numero}@c.us`).then((Message) => {
        if(Message.isMedia !== true && Message.isMMS !== true) {
            console.log(Message.body.split(" "))
        }

    })
}

module.exports = mensage