// backend/controllers/userController.js
const db = require('../config/db');

const userController = {

    getAllUsers: (req, res) => {

        const query = 'SELECT * FROM usuario';

        db.query(query, (err, results) => {

            if (err) {
                res.status(500).json({ error: 'Failed to fetch users' });
                return;
            }

            res.json(results);

        });

    },

    createUser: (req, res) => {

        const { nome, email, senha, tipo } = req.body;

        const query = 'INSERT INTO usuario (nome, email, senha, tipo) VALUES (?, ?, ?, ?)';

        db.query(query, [nome, email, senha, tipo], (err, results) => {

            if (err) {
                res.status(500).json({ error: 'Failed to create user' });
                return;
            }

            res.status(201).json({ id: results.insertId, name, email });

        });

    },

    loginUser: (req, res) => {

        const { email, senha } = req.body;

        const query = 'SELECT * FROM usuario WHERE email = ?';

        db.query(query, [email ], (err, results) => {

            if (err) {
                res.status(500).json({ error: 'Failed to get user' });
                return;
            }

            if (results.senha !== senha) {
                return res.status(401).json({ error: `Senha inválida ${user.senha}` });
            }
            
            console.log("Usuario se conectou");
            res.status(201).json({ message: "Validado!" });
            return;

        });

    }
};

module.exports = userController;