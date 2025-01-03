const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3002;

// Route to call the API server
app.get('/fetch-data', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:3000/people');
        res.json({ message: 'Data fetched successfully!', data: response.data });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching data from API server.' });
    }
});

// Serve a basic HTML page to make browser requests
app.get('/', (req, res) => {
    res.send(`
    <html>
      <body>
        <h1>Test CORS</h1>
        <button onclick="fetchData()">Fetch Data</button>
        <script>
          async function fetchData() {
            try {
              const response = await fetch('http://localhost:3000/people');
              const data = await response.json();
              console.log(data);
            } catch (error) {
              console.error('CORS error:', error);
            }
          }
        </script>
      </body>
    </html>
  `);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Client server running on http://localhost:${PORT}`);
});