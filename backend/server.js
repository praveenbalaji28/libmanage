// server.js

const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('pg');
const cors = require('cors');

const app = express();
const port =  5000;

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

app.get('/api/books', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM books');
    res.json(result.rows);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/books', async (req, res) => {
  const { title, author, isbn, published_year } = req.body;
  try {
    const result = await client.query(
      'INSERT INTO books (title, author, isbn, published_year) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, author, isbn, published_year]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error adding book', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.delete('/api/books/:id', async (req, res) => {
  const bookId = req.params.id;
  console.log(bookId);
  try {
    const result = await client.query('DELETE FROM books WHERE id = $1 RETURNING *', [bookId]);
    if (result.rowCount === 0) {
      res.status(404).json({ message: 'Book not found' });
    } else {
      res.json({ message: 'Book deleted successfully', deletedBook: result.rows[0] });
    }
  } catch (error) {
    console.error('Error deleting book', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});