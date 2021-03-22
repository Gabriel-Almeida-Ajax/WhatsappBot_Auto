const prompts = require('prompts');
const sistema = require('./app/start/index.js');
const fs = require('fs');
var state = {};
var funcionarios = [];

const questions = [
    {
        type: 'select',
        name: 'Operation',
        message: 'What are you sending?',
        choices: [
            { title: 'Aviso', value: 'Aviso' },
            { title: 'Recibo', value: 'Recibo' },
        ],

    },
    {
        type: 'confirm',
        name: 'Funcionarios',
        message: 'Updated for whom, in disk.json?',
        
    },
    {
        type: prev => prev ? 'text': process.exit(),
        name: 'Path',
        message: `Where are the files?`
    }
];

const onCancel = () => {
    console.log('Serviço finalizado!');
    process.exit();
}

const onSubmit = (prompt, answers) => option(prompt, answers);

function option(prompt, answers) {
    let sistem = {
        "Operation": (answers) => {
        },
        "Funcionarios": (answers) => {

            funcionarios = require("./lib/disk.json"); //answers.length > 0 ? : answers.forEach(e => funcionarios.push(JSON.parse(e)));
           

        },
        "Path": (answers) => {
            let documents = [];
            let Cpdf = [];
            let Spdf = [];

            fs.readdirSync(answers).forEach(file => {
                console.log(file)
                let docName = file.match(RegExp("(\\d{6})", "g"))[0];
                let busca = documents.indexOf(docName, 0)
                if (busca == (-1)) {
                    documents.push(file.match(RegExp("(\\d{6})", "g"))[0])
                }

            });

            funcionarios.forEach(funcionario => {
                if (documents.find(element => element == funcionario.matricula)) {
                    Cpdf.push(funcionario)
                } else {
                    Spdf.push(funcionario)
                    console.log(`> Funcionario sem pdf: ${funcionario.matricula}`);
                }
            })

            state = { documents: documents, Cpdf: Cpdf, Spdf: Spdf, funcionarios: funcionarios }
        },
    }


    sistem[prompt.name] ? sistem[prompt.name](answers) : onCancel(prompt);
}

(async () => {
    const props = await prompts(questions, { onSubmit, onCancel });
    props.state = state

    await sistema(props)

})();