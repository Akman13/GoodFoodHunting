const { Pool } = require('pg');

const config = {
    dev: {
        database: 'goodfoodhunting',
        user: 'postgres',
        password: process.env.POSTGRES_PW
    },

    prod: {
        connectionString: process.env.DATABASE_URL,
    }
}

const db = new Pool (process.env.DATABASE_URL ? config.prod : config.dev);

module.exports = db;