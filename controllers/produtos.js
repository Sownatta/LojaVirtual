const listAll = require("../db/consultAll");
const consultById = require("../db/consultById");
const deleteProduto = require("../db/delete");
const insertProduto = require("../db/insert");
const updateProduto = require("../db/update");

exports.redirect = (req,res) => {
    res.redirect('/home');
};

exports.home = (req, res) => {
    res.render('../views/home.ejs');
};

exports.produto = (req, res) => {
    const id = req.params.id;
    const produto = consultById(id);

    if (produto) {
        res.send(produto);
    } else {
        res.status(404).send('Produto não encontrado.');
    }
};

exports.catalogo = async (req, res) => {
    try {
        const productList = await listAll();
        res.render('../views/catalogo.ejs', { productList });
    } catch (err) {
        res.status(500).send('Erro ao recuperar a lista de produtos.');
    }
};

exports.inserir = (req, res) => {
    const produto = {
        Nome: req.body.Nome,
        Estoque: req.body.Estoque,
        Categoria: req.body.Categoria,
        Preco: req.body.Preco,
        Descricao: req.body.Descricao,
        ImgURL: req.body.ImgURL
    };

    insertProduto('produtos', produto);
    res.send('Produto inserido com sucesso!');
};

exports.atualizar = (req, res) => {
    const id = req.params.id;
    const produto = {
        Nome: req.body.Nome,
        Estoque: req.body.Estoque,
        Categoria: req.body.Categoria,
        Preco: req.body.Preco,
        Descricao: req.body.Descricao,
        ImgURL: req.body.ImgURL
    };

    updateProduto(id, 'produtos', produto);

    res.send(`Produto com ID ${id} atualizado com sucesso!`);
};

exports.atualizarParcial = (req, res) => {
    const id = req.params.id;
    const dadosAtualizados = req.body;

    const produtoAtualizado = updateProduto(id, 'produtos', dadosAtualizados);

    if (produtoAtualizado) {
        res.send(produtoAtualizado);
    } else {
        res.status(404).send('Produto não encontrado.');
    }
};

exports.delete = (req, res) => {
    const id = req.params.id;
    deleteProduto(id, 'produtos');
    res.send('Produto excluído com sucesso!');
};