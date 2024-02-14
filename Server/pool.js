const { Pool } = require('pg');

let cfg = require('./config.json')

console.log('Using pool.js file');

let pool = /* from EX3: write your code to initialize connection pool using node-postgres */new Pool({
    user:`postgres`,
    host:`localhost`,
    database:`postgres`,
    password:`12345`,
    port: 5432,
});

module.exports = pool;