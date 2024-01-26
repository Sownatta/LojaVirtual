const cadastrarCliente = require('../db/insert');
const atualizarCliente = require('../db/update');
const deletarCliente = require('../db/delete');
const listClientesAll = require('../db/consultClientesAll');
const consultClienteById = require('../db/consultClienteById');


exports.listarClientes = async (req, res) => {
    try {
        const clientList = await listClientesAll();
        res.render('../views/clientList.ejs', { clientList });
    } catch (err) {
        res.status(500).send('Erro ao recuperar a lista de clientes.');
    }
};

exports.cliente = (req, res) => {
    const id = req.params.id;
    const cliente = consultClienteById(id);

    if (cliente) {
        res.send(cliente);
    } else {
        res.status(404).send('Cliente não encontrado.');
    }
};

exports.login = (req, res, auth) => {
    
    auth();

    req.session.cliente = {
        Nome: req.body.Nome,
        DataDeNascimento: req.body.DataDeNascimento,
        cpf: req.body.cpf
    };
    
    res.send('Sessão criada com sucesso!');

    res.cookie('nomeDoCookie', 'valorDoCookie', { maxAge: 900000, httpOnly: true });
    res.send('Cookie de sessão gerado com sucesso!');
};

exports.logout = (req, res, auth) => {
    res.send('Hello World!')

    res.clearCookie('nomeDoCookie');
    res.send('Cookie de sessão removido com sucesso!');
};

exports.cadastrar = (req, res) => {
    const cliente = {
        Nome: req.body.Nome,
        DataDeNascimento: req.body.DataDeNascimento,
        cpf: req.body.cpf
    };

    cadastrarCliente('clientes', cliente);
    res.send('Cliente cadastrado com sucesso!');
};

exports.atualizarCliente = (req, res) => {
    const id = req.params.id;
    const cliente = {
        Nome: req.body.Nome,
        DataDeNascimento: req.body.DataDeNascimento,
        cpf: req.body.cpf
    };

    atualizarCliente(id, 'clientes', cliente);

    res.send(`Cliente com ID ${id} atualizado com sucesso!`);
};

exports.attParcialCliente = (req, res) => {
    const id = req.params.id;
    const dadosAtualizados = req.body;

    const clienteAtualizado = atualizarCliente(id, 'clientes', dadosAtualizados);

    if (clienteAtualizado) {
        res.send(clienteAtualizado);
    } else {
        res.status(404).send('Cliente não encontrado.');
    }
};

exports.deletarCliente = (req, res) => {
    const id = req.params.id;
    deletarCliente(id, 'clientes');
    res.send('Cliente excluído com sucesso!');
};