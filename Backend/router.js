const express = require('express');
const router = express.Router();

const user = require('./controllers/userController');
const venda = require('./controllers/vendaController');
const product = require('./controllers/productsController');

// rotas user
router.post('/Users/Post/Cadastro', user.createUser);
router.post('/Users/Post/Login', user.loginUser);


router.get('/Users/FetchUser/:email', user.fetchUser);
router.get('/Users/GetUser/:id', user.getUser);
router.get('/Users/GetAll', user.getAllUsers);


// rotas produto
router.post('/Products/Post/Create', product.createProduct)

router.get('/Products/GetAll', product.getAll)
router.get('/Client/Products/Get/:id', product.getClientProduct)
router.get('/User/Products/Get/:user_id', product.getUserProduct)


// rotas vendas

router.post('/Vendas/Post/Compra', venda.createVenda);


router.get('/Vendas/GetAll', venda.getAll);
router.get('/Vendas/Client/Get', venda.getClientVenda);
router.get('/Vendas/User/Get', venda.getUserVendas);



module.exports = router;