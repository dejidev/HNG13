require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

// Middleware
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());

// Environment variables
const PORT = process.env.PORT || 3000;
const USER_EMAIL = process.env.USER_EMAIL || 'adetayoayodeji7@gmail.com';
const USER_NAME = process.env.USER_NAME || 'Ayodeji Adetayo';
const USER_STACK = process.env.USER_STACK || 'Node.js/Express';
const CATFACT_TIMEOUT_MS = Number(process.env.CATFACT_TIMEOUT_MS) || 3000;

// Helper: fetch cat fact
async function fetchCatFact() {
    try {
        const response = await axios.get('https://catfact.ninja/fact', {
            timeout: CATFACT_TIMEOUT_MS,
        });
        return response.data.fact || 'Could not retrieve a cat fact right now.';
    } catch (error) {
        console.error('Error fetching cat fact:', error.message);
        return 'Cat facts service unavailable — fallback fact.';
    }
}

app.get('/', (req, res) => {
    res.status(200).json("Check '/me' for the project submission");
});


// Main endpoint: /me
app.get('/me', async (req, res) => {
    const fact = await fetchCatFact();
    const payload = {
        status: 'success',
        user: {
            email: USER_EMAIL,
            name: USER_NAME,
            stack: USER_STACK,
        },
        timestamp: new Date().toISOString(),
        fact,
    };

    res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(payload);
});

// 404 fallback
app.use((req, res) => {
    res.status(404).json({ status: 'error', message: 'Not Found' });
});

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
