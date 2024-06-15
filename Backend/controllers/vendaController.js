const db = require('../config/db');

const vendaController = {

    createVenda: (req, res) => {
        const { endereco, numResidencia, cep, valor, quantidade, metodoPagamento, cpf, user_id, id_produto, vendedor_id } = req.body;

        if (!endereco || !numResidencia || !cep || !valor || !quantidade || !metodoPagamento || !cpf || !user_id || !id_produto || !vendedor_id) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
        }

        const insertVendaQuery = 'INSERT INTO vendas (endereco, num_residencia, cep, total, quantidade, mtd_pay, cpf, user_id, product_id, vendedor_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const updateProdutoQuery = 'UPDATE produto SET quantidade = quantidade - ? WHERE id = ?';
    
        // Inicia uma transação
        db.beginTransaction(err => {
            if (err) {
                return res.status(500).json({ error: 'Failed to start transaction: ' + err });
            }
    
            // Primeiro insere a venda
            db.query(insertVendaQuery, [endereco, numResidencia, cep, valor, quantidade, metodoPagamento, cpf, user_id, id_produto, vendedor_id], (err, results) => {
                if (err) {
                    return db.rollback(() => {
                        res.status(500).json({ error: 'Failed to create venda: ' + err });
                    });
                }
    
                const vendaId = results.insertId;
    
                // Atualiza o produto
                db.query(updateProdutoQuery, [quantidade, id_produto], (err, results) => {
                    if (err) {
                        return db.rollback(() => {
                            res.status(500).json({ error: 'Failed to update produto: ' + err });
                        });
                    }
    
                    // Se tudo correu bem, faz commit da transação
                    db.commit(err => {
                        if (err) {
                            return db.rollback(() => {
                                res.status(500).json({ error: 'Failed to commit transaction: ' + err });
                            });
                        }
    
                        // Envia a resposta ao cliente
                        res.status(201).json({ message: 'Venda cadastrada com sucesso e produto atualizado', vendaId });
                    });
                });
            });
        });
    },


    getAll: (req, res) => {
        const query = 'SELECT * FROM vendas';
        db.query(query, (err, results) => {
            if (err) {
                res.status(500).json({ error: err });
            } else {
                res.status(200).json(results);
            }
        });
    },


    getClientVenda: (req, res) => {

        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: 'ID is required' });
        }
        const query = 'SELECT * FROM vendas WHERE user_id = ?';

        db.query(query, [id], (err, results) => {
            if (err) {
                res.status(500).json({ error: err });
            } else if (results.length === 0) {
                res.status(404).json({ message: 'No sells found for this id' });
            } else {
                res.status(200).json(results);
            }
        });
    },

    getUserVendas: (req, res) => {

        const { user_id } = req.params;

        if (!user_id) {
            return res.status(400).json({ error: 'User ID is required' });
        }
        const query = 'SELECT * FROM vendas WHERE vendedor_id = ?';

        db.query(query, [user_id], (err, results) => {
            if (err) {
                res.status(500).json({ error: err });
            } else if (results.length === 0) {
                res.status(404).json({ message: 'No sells found for this user' });
            } else {
                res.status(200).json(results);
            }
        });
    }

}
module.exports = vendaController;