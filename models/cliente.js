class Cliente {

    constructor (Nome, CPF, DataDeNascimento) {
        Object.assign(this, { Nome, CPF, DataDeNascimento });
    }
    
}

module.exports = Cliente;