const db = require('../config/db');

const dashboardController = {

    SomaVendasPorDiaS: (req, res) => {
        //vendedor id
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: "Erro ao receber ID, ID = " + id })
        }
        const query = "SELECT DATE(created_at) as venda_data, SUM(total) as total_vendas, COUNT(id) as numero_vendas, MAX(quantidade) as quantidade, MAX(cep) as cep, MAX(sts_venda) as sts_venda, MAX(mtd_pay) as mtd_pay FROM vendas WHERE vendedor_id = ? GROUP BY venda_data ORDER BY venda_data ASC";

        db.query(query, [id], (err, data) => {
            if (err) {
                res.status(500).json({ error: "Erro ao puxar dados -> " + err });
                console.log({ error: "Erro ao puxar dados -> " + err });
            }
            res.status(200).json(data);
        });
    },

    SomaVendasDoDiaS: (req, res) => {
        //vendedor id
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: "Erro ao receber ID " })
        }
        const query = "SELECT DATE(created_at) as venda_data, SUM(total) as total_vendas, COUNT(id) as numero_vendas, quantidade, cep, sts_venda, mtd_pay FROM vendas WHERE vendedor_id = ? GROUP BY id ORDER BY venda_data ASC";

        db.query(query, [id], (err, data) => {
            if (err) {
                res.status(500).json({ error: "Erro ao puxar dados -> " + err });
            }
            res.status(200).json(data);
        });
    },

    MetodoPayS: (req, res) => {
        //vendedor id
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: "Erro ao receber ID " })
        }
        const query = "SELECT mtd_pay, COUNT(id) AS numero_vendas FROM vendas WHERE vendedor_id = ? GROUP BY mtd_pay";
        db.query(query, [id], (err, data) => {
            if (err) {
                res.status(500).json({ error: "Erro ao puxar dados -> " + err });
                console.log({ error: "Erro ao puxar dados -> " + err })
            }
            res.status(200).json(data);
        });
    },

    SumVendasPorVenda: (req, res) => {
        //vendedor id
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: "Erro ao receber ID " })
        }
        const query = "SELECT mtd_pay, COUNT(id) AS numero_vendas FROM vendas WHERE vendedor_id = ? GROUP BY mtd_pay";
        db.query(query, [id], (err, data) => {
            if (err) {
                res.status(500).json({ error: "Erro ao puxar dados -> " + err });
                console.log({ error: "Erro ao puxar dados -> " + err })
            }
            res.status(200).json(data);
        });
    },

    SomaVendasDoDiaC: (req, res) => {
        //Cliente id
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: "Erro ao receber ID " })
        }
        const query = "SELECT DATE(created_at) as venda_data, SUM(total) as total_vendas, COUNT(id) as numero_vendas, quantidade FROM vendas WHERE user_id = ? GROUP BY id ORDER BY venda_data ASC";

        db.query(query, [id], (err, data) => {
            if (err) {
                res.status(500).json({ error: "Erro ao puxar dados -> " + err });
            }
            res.status(200).json(data);
        });
    },

}

module.exports = dashboardController;