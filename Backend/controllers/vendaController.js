const db = require('../config/db');

const vendaController = {

    // error:"Failed to create venda: Error: Cannot add or update a child row: a foreign key constraint fails 
    // (`sellhub`.`vendas`, CONSTRAINT `vendas_ibfk_3` FOREIGN KEY (`product_id`) REFERENCES `produto` (`id`) ON UPDATE CASCADE)"

    createVenda: (req, res) => {
        const { endereco, numResidencia, cep, valor, quantidade, metodoPagamento, cpf, user_id, id_produto, vendedor_id } = req.body;
        
        console.log({ endereco, numResidencia, cep, valor, quantidade, metodoPagamento, cpf, user_id, id_produto, vendedor_id })
        
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

    // ========================================================================== \\


    EditVenda: (req, res) => {
        const { endereco, numResidencia, cep, valor, quantidade, metodoPagamento, cpf, user_id, id_produto, vendedor_id, diferençaQuantidade, id } = req.body;
        console.log(endereco, numResidencia, cep, valor, quantidade, metodoPagamento, cpf, user_id, id_produto, vendedor_id, diferençaQuantidade, id)
        console.log(req.body)

        if (!endereco || !numResidencia || !cep || !valor || !quantidade || !metodoPagamento || !cpf || !user_id || !id_produto || !vendedor_id || !id) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
        }

        const updateVendaQuery = 'UPDATE vendas SET endereco = ?, num_residencia = ?, cep = ?, total = ?, quantidade = ?, mtd_pay = ?, cpf = ?, user_id = ?, product_id = ?, vendedor_id = ? WHERE id = ?';
        const updateProdutoQuery = 'UPDATE produto SET quantidade = quantidade - ? WHERE id = ?';

        // Inicia uma transação
        db.beginTransaction(err => {
            if (err) {
                return res.status(500).json({ error: 'Failed to start transaction: ' + err });
            }

            // Primeiro insere a venda
            db.query(updateVendaQuery, [endereco, numResidencia, cep, valor, quantidade, metodoPagamento, cpf, user_id, id_produto, vendedor_id, id], (err, results) => {
                if (err) {
                    return db.rollback(() => {
                        res.status(500).json({ error: 'Failed to create venda: ' + err });
                    });
                }

                console.log("primeira etapa realizada; affectedRows: " + results.changedRows)

                // Depois atualiza o produto
                db.query(updateProdutoQuery, [diferençaQuantidade, id_produto, id], (err, results) => {
                    if (err) {
                        return db.rollback(() => {
                            res.status(500).json({ error: 'Failed to update produto: ' + err });
                        });
                    }

                    console.log("segunda etapa realizada; affectedRows: " + results.changedRows)

                    // Se tudo correu bem, faz commit da transação
                    db.commit(err => {
                        if (err) {
                            return db.rollback(() => {
                                res.status(500).json({ error: 'Failed to commit transaction: ' + err });
                            });
                        }

                        console.log("Processo de edição da venda: " + id + " realizado com sucesso!");
                        // Envia a resposta ao cliente
                        res.status(201).json({ message: 'Venda cadastrada com sucesso e produto atualizado' });
                    });
                });
            });
        });
    },

    // ========================================================================== \\


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

    // ========================================================================== \\


    getVenda: (req, res) => {

        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: 'ID is required' });
        }
        const query = 'SELECT * FROM vendas WHERE id = ?';

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


    // ========================================================================== \\


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

    // ========================================================================== \\


    getComprasClient: (req, res) => {

        const { user_id } = req.params;

        if (!user_id) {
            return res.status(400).json({ error: 'User ID is required' });
        }
        const query = 'SELECT  vendas.*, produto.nome, produto.garantia, produto.imagem FROM vendas JOIN produto ON vendas.product_id = produto.id WHERE vendas.user_id = ?';

        db.query(query, [user_id], (err, results) => {
            if (err) {
                res.status(500).json({ error: err });
            } else if (results.length === 0) {
                res.status(404).json({ message: 'No sells found for this user' });
            } else {
                res.status(200).json(results);
            }
        });
    },

    // ========================================================================== \\


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
    },

    // ========================================================================== \\


    restaurarVenda: (req, res) => {
        const { id, product_id, quantidade } = req.body;
        const confirmada = "Confirmada";
        console.log(id, product_id, quantidade)

        if (!id || !product_id || !quantidade) {
            return res.status(400).json({ error: "Dados inválidos na requisição" });
        }

        console.log(`Iniciando a restauração da venda com ID: ${id}, Produto ID: ${product_id}, Quantidade: ${quantidade}`);

        db.beginTransaction(err => {
            if (err) {
                return res.status(500).json({ error: 'Failed to start transaction: ' + err });
            }

            // Capturando a quantidade atual
            db.query('SELECT quantidade FROM produto WHERE id = ?', [product_id], (err, results) => {
                if (err) {
                    console.error("Erro ao obter a quantidade do produto:", err);
                    return res.status(500).json({ error: 'Failed to get quantidade: ' + err });
                }

                if (results.length === 0) {
                    console.warn('Produto não encontrado para o ID:', product_id);
                    return res.status(404).json({ error: 'Produto não encontrado' });
                }

                const quantidadeAtual = results[0].quantidade;
                console.log(`Quantidade atual do produto (ID: ${product_id}): ${quantidadeAtual}`);

                if (quantidadeAtual < quantidade) {
                    console.warn('Quantidade insuficiente no estoque. Quantidade solicitada:', quantidade, 'Quantidade atual:', quantidadeAtual);
                    return res.status(400).json({ error: 'Quantidade insuficiente no estoque' });
                }

                const quantidadeNova = quantidadeAtual - quantidade;
                console.log(`Nova quantidade do produto (ID: ${product_id}) após subtração: ${quantidadeNova}`);

                // Atualiza o valor da quantidade
                const queryResturaVenda = "UPDATE vendas SET sts_venda = ? WHERE id = ?";
                const queryResturaProduto = "UPDATE produto SET quantidade = ? WHERE id = ?";

                db.query(queryResturaVenda, [confirmada, id], (err, results) => {
                    if (err) {
                        console.error('Erro ao atualizar a venda:', err);
                        return db.rollback(() => {
                            res.status(500).json({ error: 'Failed to update venda: ' + err });
                        });
                    }

                    console.log(`Venda (ID: ${id}) atualizada com sucesso para o status: ${confirmada}`);

                    // Atualiza o produto se der certo
                    db.query(queryResturaProduto, [quantidadeNova, product_id], (err, results) => {
                        if (err) {
                            console.error('Erro ao atualizar o produto:', err);
                            return db.rollback(() => {
                                res.status(500).json({ error: 'Failed to update produto: ' + err });
                            });
                        }

                        console.log(`Produto (ID: ${product_id}) atualizado com sucesso para a nova quantidade: ${quantidadeNova}`);

                        // Se for um sucesso, ele dá commit no banco
                        db.commit(err => {
                            if (err) {
                                console.error('Erro ao fazer commit da transação:', err);
                                return db.rollback(() => {
                                    res.status(500).json({ error: 'Failed to commit transaction: ' + err });
                                });
                            }

                            console.log('Transação concluída com sucesso.');
                            // Caso tudo ocorra bem, ele retorna sucesso
                            res.status(201).json({ message: "Venda restaurada com sucesso!" });
                        });
                    });
                });
            });
        });
    },


    // ========================================================================== \\


    CancelarVenda: (req, res) => {
        const { id, product_id, quantidade } = req.body;
        console.log(id, product_id, quantidade)

        if (!id) {
            return res.status(404).json({ err: "id Invalido" });
        }

        const queryCancelaVenda = "UPDATE vendas SET sts_venda = 'Cancelada' WHERE id = ?";
        const queryVoltaProduto = "UPDATE produto SET quantidade = quantidade + ? WHERE id = ?";

        db.beginTransaction(err => {
            if (err) {
                return res.status(500).json({ error: 'Failed to start transaction: ' + err });
            }

            db.query(queryCancelaVenda, [id], (err, results) => {
                if (err) {
                    return db.rollback(() => {
                        res.status(500).json({ error: 'Failed to update venda: ' + err });
                    });
                }

                //atualiza o produto se der certo
                db.query(queryVoltaProduto, [quantidade, product_id], (err, results) => {
                    if (err) {
                        return db.rollback(() => {
                            res.status(500).json({ error: 'Failed to update produto: ' + err });
                        });
                    }

                    // se for um sucesso ele da commit no banco
                    db.commit(err => {
                        if (err) {
                            return db.rollback(() => {
                                res.status(500).json({ error: 'Failed to commit transaction: ' + err });
                            });
                        }
                        // caso tudo ocorra bem ele retorna sucesso
                        res.status(201).json({ message: "Venda restaurada com sucesso!" })
                    })
                })
            });
        });
    }
}
module.exports = vendaController;