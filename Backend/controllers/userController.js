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

        const { nome, email, senha, tipo, tel, endereco, cpf, cep } = req.body;
        const query = 'INSERT INTO usuario (nome, email, senha, tipo, tel, endereco, cpf, cep) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

        db.query(query, [nome, email, senha, tipo, tel, endereco, cpf, cep], (err, results) => {
            if (err) {
                res.status(500).json({ error: 'Failed to create user, may already exist. ' + err });
                return;
            }

            console.log('Usuario cadastrado do tipo: ' + tipo);
            res.status(201).json({ id: results.insertId, nome, email, senha, tipo, tel, endereco, cpf, cep });
        });

    },

    EditUser: (req, res) => {

        const { nome, email, senha, tipo, tel, endereco, cpf, cep, id } = req.body;
        const query = 'UPDATE usuario SET nome = ?, email = ?, senha = ?, tipo = ?, tel = ?, endereco = ?, cpf = ?, cep = ?, updated_at = NOW() WHERE id = ?';

        db.query(query, [nome, email, senha, tipo, tel, endereco, cpf, cep, id], (err, results) => {
            if (err) {
                res.status(500).json({ error: 'Failed to update user. ' + err });
                return;
            }

            console.log({message: 'Usuario atualizado', id:id, nome:nome, email:email, tipo:tipo, resultado:results});
            res.status(201).json({message: 'Usuario atualizado com sucesso', tipo: tipo});
        });

    },

    loginUser: (req, res) => {

        // lembrar de dar console log pra ver como e oque esta vindo do body
        const { email, senha } = req.body;
        const query = 'SELECT * FROM usuario WHERE email = ?';

        db.query(query, [email], (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to get user' });
            }

            if (results.length === 0) {
                return res.status(401).json({ error: 'User not found' });
            }

            const user = results[0];

            if (user.senha !== senha) {
                return res.status(401).json({ error: 'Invalid password' });
            }

            console.log('User logged in');
            // console.log('User: ' + JSON.stringify(user));

            res.status(200).json({ message: 'Validated!', user: user });
        });
    },

    getUser: (req, res) => {

        const { id } = req.params;

        const query = 'SELECT * FROM usuario WHERE id = ?';

        db.query(query, [id], (err, results) => {

            if (err) {
                res.status(500).json({ error: 'Failed to fetch users' });
                return;
            }

            res.json(results);

        });
    },
    fetchUser: (req, res) => {

        const { email } = req.params;

        const query = 'SELECT * FROM usuario WHERE email = ?';

        db.query(query, [email], (err, results) => {

            if (err) {
                res.status(500).json({ error: 'Failed to fetch users' });
                return;
            }
            res.json(results[0]);

        });

    },

};

module.exports = userController;