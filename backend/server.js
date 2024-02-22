// server.js

const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('pg');
const cors = require('cors'); 

const app = express();
const port = process.env.PORT || 5000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()); 

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'libmng',
  password: 'Praveen28*',
  port: 5432,
});
client.connect();

// Routes
app.get('/api/books', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM books');
    res.json(result.rows);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
