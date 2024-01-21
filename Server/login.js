let cfg = require('./config.json')
const express = require('express');
const router = express.Router();

const pool = require('./pool.js');

const jwt = require('jsonwebtoken');

// login route creating/returning a token on successful login
router.post('/', (req, res) => {

    // TODO: get login parameters from request body
    const { email, password } = req.body;
    console.log(`${email}  ${password}`);
    // prepare DB query
    const query = {
        text:`SELECT * FROM users WHERE email = $1 AND password = $2`,
        values: [email, password]
    };

    // issue query (returns promise)
    pool.query(query)
        .then (results => {

			// handle no match (login failed)
            console.log(results.rows);

            if(results.rows.length === 0){
                return res.status(401).json({message:`Invalid credentials`});
            }

            // everything is ok
            let resultUser = results.rows[0];
            console.log("reached token");
			const token = jwt.sign({userId:resultUser.id, email: resultUser.email}, cfg.auth.jwt_key, {expiresIn:cfg.auth.expiration});/* form the token with userData (accessible when decoding token), jwtkey, expiry time */;
            
			res.status(200).json({
                "message": "login successful",
                login: resultUser.login,
                token: token
            });

        })
        .catch(error => {
            // handle error accessing db
            console.error(`Error accessing database: `, error);
            res.status(500).json({message:`Internal Server Error`});
        });

});

module.exports = router;
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDEwNDE4OTIsImV4cCI6MTcwMTA0NTQ5Mn0.nhNIzC_qTXmMB2YznouUVg4IMiv3yrTlwGvrbKuw5fU