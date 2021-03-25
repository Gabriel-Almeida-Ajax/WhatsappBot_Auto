async function mensage({ Client, props }) {
    //console.log("Aviso", props)


    for (const [idx, fnc] of props.state.funcionarios.entries()) {
        console.log(" ! > Opening chat in: ", new Date().toLocaleString("PT-br", { timeStyle: "medium", hour12: false }))
        const todo = await getResponse({ fnc, Client, props });
        console.log(`${fnc.referencia} - ${fnc.matricula} - ${fnc.nome} - ${fnc.numero} ${idx + 1} de ${props.state.funcionarios.length}`)
    }
    console.log('Finished process!');
    process.exit()
}

async function getResponse({ fnc, Client, props }) {

    console.log('> Geting message from client: ', fnc.numero)
    return new Promise((resolve, reject) => {
        Client.loadAndGetAllMessagesInChat(`${fnc.numero}@c.us`, false, true).then((Chat) => {
            console.log('> Messages is: ', Chat.length)
            Client.waPage.screenshot(`${fnc.matricula}.png`)
            resolve(Chat)
        }).catch((err) => reject(err))
    })
}

module.exports = mensage