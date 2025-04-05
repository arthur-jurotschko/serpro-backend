const { Client } = require('pg');

const client = new Client({
    connectionString: process.env.DATABASE_URL,
});

client.connect()
    .then(() => console.log('Conectado ao PostgreSQL!'))
    .catch((err) => console.error('Erro ao conectar ao PostgreSQL', err));

module.exports = client;
