const express = require('express');
const router = express.Router();

const user = require('./controllers/userController');
const venda = require('./controllers/vendaController');
const product = require('./controllers/productsController');
const dashboard = require('./controllers/dashboardController');
const categoriaController = require('./controllers/categoriasController');

// ========================================================================== \\

// rotas user:
router.post('/Users/Post/Cadastro', user.createUser);
router.post('/Users/Post/Login', user.loginUser);

router.get('/Users/FetchUser/:email', user.fetchUser);
router.get('/Users/GetUser/:id', user.getUser);
router.get('/Users/GetAll', user.getAllUsers);

// ========================================================================== \\

// rotas produto:
router.post('/Products/Post/Create', product.createProduct)
router.put('/Products/Put/Edit', product.editProduct)

router.get('/Products/GetAll', product.getAll)
router.get('/Product/Get/:id', product.getProduct)
router.get('/User/Products/Get/:user_id', product.getUserProduct)

// ========================================================================== \\

// rotas vendas:
router.post('/Vendas/Post/Compra', venda.createVenda);
router.put('/Vendas/Put/Edit', venda.EditVenda);
router.put('/Vendas/Put/Restaurar', venda.restaurarVenda);
router.put('/Vendas/Put/Cancelar', venda.CancelarVenda);

router.get('/Vendas/GetAll', venda.getAll);
router.get('/Vendas/Get/:id', venda.getVenda);
router.get('/Vendas/Client/Get/:id', venda.getClientVenda);
router.get('/Vendas/User/Get/:user_id', venda.getUserVendas);

// ========================================================================== \\

//rota dashboard:
router.get('/Dashboard/Vendedor/DoDia/:id', dashboard.SomaVendasDoDiaS);
router.get('/Dashboard/Vendedor/PorDia/:id', dashboard.SomaVendasPorDiaS);
router.get('/Dashboard/Vendedor/MtdPay/:id', dashboard.MetodoPayS);
router.get('/Dashboard/Cliente/DoDia/:id', dashboard.SomaVendasDoDiaC);

// ========================================================================== \\

//rota categorias
router.get('/Categoria/Get/:categoria',  categoriaController.getCategoria);

module.exports = router;