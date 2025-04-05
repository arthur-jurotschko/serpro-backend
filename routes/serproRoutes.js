const express = require('express');
const obterTokenSerpro = require('../services/serproAuth');
const axios = require('axios');
const db = require('../database'); // Importação do banco
require('dotenv').config();

const router = express.Router();

// 🔍 Rota para consultar CPF
router.post('/consulta-cpf', async (req, res) => {
    try {
        const token = await obterTokenSerpro();
        if (!token) return res.status(500).json({ error: 'Falha na autenticação' });

        const { cpf } = req.body;
        const response = await axios.get(`${process.env.SERPRO_BASE_URL}/cpf/${cpf}`, {
            headers: { 
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        await db.query(
            'INSERT INTO logs_consulta (tipo_consulta, dados_enviados, resultado, status) VALUES ($1, $2, $3, $4)',
            ['consulta-cpf', req.body, response.data, 'concluido']
        );

        res.json(response.data);
    } catch (error) {
        console.error('Erro na consulta CPF:', error);
        res.status(500).json({ error: 'Erro na consulta CPF' });
    }
});

// 🚗 Rota para consultar CNH
router.post('/consulta-cnh', async (req, res) => {
    try {
        const token = await obterTokenSerpro();
        if (!token) return res.status(500).json({ error: 'Falha na autenticação' });

        const { cnh } = req.body;
        const response = await axios.get(`${process.env.SERPRO_BASE_URL}/cnh/${cnh}`, {
            headers: { 
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        await db.query(
            'INSERT INTO logs_consulta (tipo_consulta, dados_enviados, resultado, status) VALUES ($1, $2, $3, $4)',
            ['consulta-cnh', req.body, response.data, 'concluido']
        );

        res.json(response.data);
    } catch (error) {
        console.error('Erro na consulta CNH:', error);
        res.status(500).json({ error: 'Erro na consulta CNH' });
    }
});

module.exports = router;
