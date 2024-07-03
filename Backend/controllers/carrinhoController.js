const db = require('../config/db');

const carrinhoController = {

    getCarrinho: (req, res) => {
        const { user_id } = req.params

        if (!user_id) {
            return res.status(400).json({ error: 'ID está null | undefined.' });
        }

        const query = 'SELECT carrinho.*, produto.nome, produto.garantia, produto.preco, produto.quantidade as disponivel ,produto.imagem FROM carrinho JOIN produto ON carrinho.product_id = produto.id WHERE carrinho.user_id = ?';

        db.query(query, [user_id], (err, results) => {
            if (err) {
                console.log(err)
                res.status(500).json({ error: err });
            } else {
                res.status(200).json(results);
            }
        });
    },

    createCarrinho: (req, res) => {

        const { user_id, product_id, quantidade } = req.body;

        if (!product_id || !user_id) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
        }

        db.query('SELECT quantidade FROM carrinho WHERE user_id = ? AND product_id = ?',
            [user_id, product_id], (err, results) => {
                if (err) {
                    console.log('impossível recuperar carrinho')
                    return res.status(500).json({ error: err })
                }
                if (results.length > 0) { //produto ja esta no carrinho
                    const novaQuantidade = results[0].quantidade + quantidade;
                    const query = 'UPDATE carrinho SET quantidade = ? WHERE user_id = ? AND product_id = ?'
                    db.query(query, [novaQuantidade, user_id, product_id], (err, results) => {
                        if (err) {
                            console.log({ error: err })
                            return res.status(500).json({ error: err })
                        }
                        return results.affectedRows;
                    })
                } else {
                    const query = 'INSERT INTO carrinho (user_id,product_id,quantidade) VALUES(?,?,?)'
                    db.query(query, [user_id, product_id, quantidade], (err, results) => {
                        if (err) {
                            res.status(500).json({ error: 'Failed to create carrinho, may alredy exists <br></br>' + err })
                            return;
                        }
                        console.log('Carrinho criado com sucesso, carrinho: ', results)
                        res.status(201).json({ message: "Cadastro de carrinho completo" })
                    });
                }
            }
        )
    },

    editQuantidade: (req, res) => {

        const { quantidade, id } = req.body;

        if (!quantidade || !id) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
        }

        const query = `UPDATE produto SET quantidade = ? WHERE id = ?`;

        db.query(query, [quantidade, id], (err, results) => {
            if (err) {
                res.status(500).json({ error: 'Failed to update product, may alredy exists <br></br>' + err })
                return;
            }
            console.log('produto atualizado com sucesso, linhas afetadas', results.affectedRows)
            res.status(201).json({ id: id, nome })
        })
    },

    // getCarrinho: (req, res) => {

    //     const { id } = req.params;

    //     if (!id) {
    //         return res.status(400).json({ error: 'ID is required' });
    //     }
    //     const query = 'SELECT * FROM produto WHERE id = ? AND deleted_at IS NULL';

    //     db.query(query, [id], (err, results) => {
    //         if (err) {
    //             res.status(500).json({ error: err });
    //         } else if (results.length === 0) {
    //             res.status(404).json({ message: 'No products found for this id' });
    //         } else {
    //             res.status(200).json(results);
    //         }
    //     });
    // },

    delete: (req, res) => {
        const { id } = req.params

        if (!id) {
            return res.status(400).json({ error: 'ID is required' });
        }

        db.query("DELETE FROM carrinho WHERE id = ?", [id], (err, results) => {
            if (err) {
                console.log({ "erro ao deletar produto id: ": id, Error: err })
                return res.status(500).json({ error: err });
            } else {
                console.log("deleção confirmada! id: " + id)
                return res.status(200).json(results);
            }
        })
    },
}
module.exports = carrinhoController;