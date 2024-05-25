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
            console.log('User: ' + user);
            
            res.status(200).json({ message: 'Validated!' });
        });
    },
    
    getUser: (req, res) => {
        
        const { id } = req.params;

        const query = 'SELECT * FROM usuario WHERE id = ?';

        db.query(query, [id],(err, results) => {

            if (err) {
                res.status(500).json({ error: 'Failed to fetch users' });
                return;
            }

            res.json(results);

        });

    },

};

module.exports = userController;