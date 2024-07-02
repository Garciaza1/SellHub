const express = require('express');
const router = express.Router();

const user = require('./controllers/userController');
const venda = require('./controllers/vendaController');
const product = require('./controllers/productsController');
const dashboard = require('./controllers/dashboardController');
const categoriaController = require('./controllers/categoriasController');
const carrinhoController = require('./controllers/carrinhoController');

// ========================================================================== \\

// rotas user:
router.post('/Users/Post/Cadastro', user.createUser);
router.post('/Users/Post/Login', user.loginUser);
router.put('/Users/Put/EditUser', user.EditUser);

router.get('/Users/FetchUser/:email', user.fetchUser);
router.get('/Users/GetUser/:id', user.getUser);
router.get('/Users/GetAll', user.getAllUsers);

// ========================================================================== \\

// rotas produto:
router.post('/Products/Post/Create', product.createProduct)
router.put('/Products/Put/Edit', product.editProduct)
router.put('/Products/Delete/:id', product.delete)
router.put('/Products/Restaurar/:id', product.restaurar)

router.get('/Products/GetAll', product.getAll)
router.get('/Product/Get/:id', product.getProduct)
router.get('/Product/Get/Edit/:id', product.getProductEdit)
router.get('/User/Products/Get/:user_id', product.getUserProduct)

// deleted products
router.get('/Product/Get/Deleted/:id', product.getDeletedProduct)
router.get('/User/Products/Get/Deleted/:user_id', product.getUserDeletedProduct)

// ========================================================================== \\

// rotas vendas:
router.post('/Vendas/Post/Compra', venda.createVenda);
router.put('/Vendas/Put/Edit', venda.EditVenda);
router.put('/Vendas/Put/Restaurar', venda.restaurarVenda);
router.put('/Vendas/Put/Cancelar', venda.CancelarVenda);

router.get('/Vendas/Get/Compras/:user_id', venda.getComprasClient);
router.get('/Vendas/GetAll', venda.getAll);
router.get('/Vendas/Get/:id', venda.getVenda);
router.get('/Vendas/Client/Get/:id', venda.getClientVenda);
router.get('/Vendas/User/Get/:user_id', venda.getUserVendas);

// ========================================================================== \\

//rota dashboard:
router.get('/Dashboard/Vendedor/DoDia/:id', dashboard.SomaVendasDoDiaS);
router.get('/Dashboard/Vendedor/PorDia/:id', dashboard.SomaVendasPorDiaS);
router.get('/Dashboard/Vendedor/MtdPay/:id', dashboard.MetodoPayS);
router.get('/Dashboard/Vendedor/Somas/:id', dashboard.SomasVendedor);
router.get('/Dashboard/Cliente/DoDia/:id', dashboard.SomaVendasDoDiaC);

// ========================================================================== \\

//rota categorias
router.get('/Categoria/Get/:categoria',  categoriaController.getCategoria);

// ========================================================================== \\

//rota Carrinho

router.get('/Carrinho/Get/:user_id', carrinhoController.getCarrinho)

router.post('/Carrinho/Post', carrinhoController.createCarrinho)

router.put('/Carrinho/Put/Quantidade/:id', carrinhoController.editQuantidade)

router.delete('/Carrinho/Delete/:id', carrinhoController.delete)

module.exports = router;