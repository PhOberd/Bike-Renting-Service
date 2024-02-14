const express = require('express');
const router = express.Router();
const pool = require('./pool.js');

router.post('/', (req, res) => {
    const { email, password } = req.body;
    const isAdmin = false;
    const wallet = 0;
    // prepare DB query
    const query = {
        text: 'SELECT * FROM users WHERE email = $1',
        values: [email]
    };

    // check if email already exists
    pool.query(query)
        .then(results => {
            if (results.rows.length > 0) {
                res.status(400).json({ message: 'Email already registered' });
            } else {
                // email is not registered
                const insertQuery = {
                    text: 'INSERT INTO users (email, password, wallet, isAdmin) VALUES ($1, $2, $3, $4) RETURNING *',
                    values: [email, password, wallet, isAdmin]
                };
                return pool.query(insertQuery);
            }
        })
        .then(results => {
            // succesful
            res.status(200).json({
                message: 'Registration successful',
            });
        })
        .catch(error => {
            // error
            console.error('Registration error:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        });
});

module.exports = router;
