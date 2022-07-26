const Pool = require('pg').Pool;
require('dotenv').config();

const configDb = {
        user:           process.env.DB_USER,
        password:       process.env.DB_PASSWORD,
        host:           process.env.DB_HOST,
        port:           process.env.DB_PORT,
        database:       process.env.DB_DATABASE,
};

// console.dir(configDb);

const pool = new Pool(configDb);

module.exports = pool;