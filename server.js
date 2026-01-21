require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'Server is running',
        timestamp: new Date().toISOString()
    });
});

// Proxy endpoint for forex rates
app.get('/api/rates', async (req, res) => {
    try {
        // Check if API key exists
        if (!process.env.API_KEY) {
            return res.status(500).json({ 
                error: 'API_KEY not configured in .env file' 
            });
        }

        // Fetch data from external API
        const response = await fetch('https://api.apilayer.com/fixer/latest', {
            method: 'GET',
            headers: {
                'apikey': process.env.API_KEY
            }
        });

        if (!response.ok) {
            throw new Error(`External API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        
        // Return the data to frontend
        res.json(data);
        
    } catch (error) {
        console.error('Error fetching forex rates:', error);
        res.status(500).json({ 
            error: 'Failed to fetch forex rates',
            message: error.message 
        });
    }
});

// Serve index.html for root path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`
        Forex Rates Server Running
        URL: http://localhost:${PORT}
        Health Check: http://localhost:${PORT}/health
        API Endpoint: http://localhost:${PORT}/api/rates
        Press Ctrl+C to stop the server
    `);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    server.close(() => {
        console.log('HTTP server closed');
    });
});
