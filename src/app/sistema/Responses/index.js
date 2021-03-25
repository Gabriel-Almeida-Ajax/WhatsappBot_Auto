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

        try {
            Client.loadAndGetAllMessagesInChat(`${fnc.numero}@c.us`, true, true).then((Messages) => {
                Client.openChat(`${fnc.numero}@c.us`).then((Chat) => {
                    console.log('> Messages is: ', Chat)
                    if (Chat) {
                        resolve(
                            Client.waPage.setViewport({ width: 1280, height: 720 }),
                            Client.waPage.screenshot({ clip: { x: 460, y: 0, width: 820, height: 720 }, path: `./src/app/sistema/Responses/lib/${fnc.matricula}.png` })
                        )
                    }
                })
            })
        } catch (erro) {
            //console.log("@ !> Error in: ", erro)
            //reject(erro)
        }
    })
}

module.exports = mensage