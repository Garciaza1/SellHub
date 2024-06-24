const db = require('../config/db');

const productController = {

    getAll: (req, res) => {
        const query = 'SELECT * FROM produto';
        db.query(query, (err, results) => {
            if (err) {
                res.status(500).json({ error: err });
            } else {
                res.status(200).json(results);
            }
        });
    },

    createProduct:(req, res) => {
        const {nome, descricao, imagem, imagem_nome ,preco, quantidade, codigo, garantia, categoria, marca, user_id } = req.body;
        if (!nome || !descricao || !imagem || !imagem_nome || !preco || !quantidade || !codigo || !garantia || !categoria || !marca || !user_id) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
        }
        const query = 'INSERT INTO produto (user_id, nome, descricao, imagem, imagem_nome, preco, quantidade, codigo, garantia, categoria, marca) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
        
        db.query(query, [user_id, nome, descricao, imagem, imagem_nome, preco, quantidade, codigo, garantia, categoria, marca], (err, results)=>{
            if (err){
                res.status(500).json({error: 'Failed to create product, may alredy exists <br></br>' + err})
                return;
            }
            console.log('produto cadastrado com sucesso, produto:', results)
            res.status(201).json({id: results.insertId, nome, imagem})
        })
    },

    editProduct: (req, res) => {
        const { nome, descricao, imagem, imagem_nome, preco, quantidade, codigo, garantia, categoria, marca, id } = req.body;
        if (!nome || !descricao || !imagem || !imagem_nome || !preco || !quantidade || !codigo || !categoria || !marca || !id) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
        }
        const query = `UPDATE produto SET nome = ?, descricao = ?, imagem = ?, imagem_nome = ?, preco = ?, quantidade = ?, codigo = ?, garantia = ?, categoria = ?, marca = ? WHERE id = ?;`;
        db.query(query, [nome, descricao, imagem, imagem_nome, preco, quantidade, codigo, garantia, categoria, marca, id], (err, results) => {
            if (err) {
                res.status(500).json({ error: 'Failed to update product, may alredy exists <br></br>' + err })
                return;
            }
            console.log('produto atualizado com sucesso, linhas afetadas', results.affectedRows)
            res.status(201).json({ id: id, nome })
        })
    },

    getProduct: (req, res) => {

        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: 'ID is required' });
        }
        const query = 'SELECT * FROM produto WHERE id = ?';

        db.query(query, [id], (err, results) => {
            if (err) {
                res.status(500).json({ error: err });
            } else if (results.length === 0) {
                res.status(404).json({ message: 'No products found for this id' });
            } else {
                res.status(200).json(results);
            }
        });
    },

    getUserProduct: (req, res) => {

        const { user_id } = req.params;

        if (!user_id) {
            return res.status(400).json({ error: 'User ID is required' });
        }
        const query = 'SELECT * FROM produto WHERE user_id = ?';

        db.query(query, [user_id], (err, results) => {
            if (err) {
                res.status(500).json({ error: err });
            } else if (results.length === 0) {
                res.status(404).json({ message: 'No products found for this user' });
            } else {
                res.status(200).json(results);
            }
        });
    }

}
module.exports = productController;