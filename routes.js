const express = require('express');
const routes = express.Router();
const produtos = require('./controllers/produtos');
const clientes = require('./controllers/clientes')

//Rotas dos produtos
routes.get('/', produtos.redirect);
routes.get('/home', produtos.home);
routes.get('/produto/:id', produtos.produto);
routes.get('/catalogo', produtos.catalogo);
routes.post('/cadastrar-produto', produtos.inserir);
routes.put('/produto/:id', produtos.atualizar);
routes.patch('/produto/:id', produtos.atualizarParcial);
routes.delete('/delete/:id', produtos.delete);

//Rotas dos clientes
routes.get('/clientes', clientes.listarClientes);
routes.get('/cliente/:id', clientes.cliente);
routes.get('/cliente/login', clientes.login);
routes.get('/cliente/logout', clientes.logout);
routes.post('/cadastrar-cliente', clientes.cadastrar);
routes.put('/cliente/:id', clientes.atualizarCliente);
routes.patch('/cliente/:id', clientes.attParcialCliente);
routes.delete('/cliente/:id', clientes.deletarCliente);

module.exports = routes;