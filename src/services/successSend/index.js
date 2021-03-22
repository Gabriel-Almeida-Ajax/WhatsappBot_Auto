class Files {
    constructor() {
        this.fs = require('fs');
        this.join = require('path').join;
    }
    successSend(fnc, dir, path) {
        this.fs.appendFileSync('./success.json', JSON.stringify(fnc));
        fnc.path = `${fnc.referencia} - ${fnc.matricula} - ${fnc.nome} - ${fnc.numero}.pdf`
        this.fs.renameSync(path, dir.replace(new RegExp("(PENDENTES)"), "ENVIADOS\\") + fnc.path);
    }
    errSend(fnc, dir, path) {
        this.fs.appendFileSync('./error.json', JSON.stringify(fnc));
        fnc.path = `${fnc.referencia} - ${fnc.matricula} - ${fnc.nome} - ${fnc.numero}.pdf`
        this.fs.renameSync(path, dir.replace(new RegExp("(PENDENTES)"), "ERROS\\") + fnc.path);
    }

}

module.exports = new Files()