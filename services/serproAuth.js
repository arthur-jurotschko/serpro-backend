const axios = require('axios');
require('dotenv').config();

const obterTokenSerpro = async () => {
    try {
        const response = await axios.post(process.env.SERPRO_AUTH_URL, {
            grant_type: 'client_credentials',
            client_id: process.env.SERPRO_CLIENT_ID,
            client_secret: process.env.SERPRO_CLIENT_SECRET
        });

        return response.data.access_token;
    } catch (error) {
        console.error('Erro ao obter token SERPRO:', error);
        return null;
    }
};

module.exports = obterTokenSerpro;
