const express = require('express');
const axios = require('axios'); // For async/await calls

const public_users = express.Router();

async function getBooks() {
  try {
    const response = await axios.get('http://localhost:5000/books'); // Assuming a books API endpoint
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

// Get the book list available in the shop
public_users.get('/', async (req, res) => {
  const books = await getBooks();
  res.json(books);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', async (req, res) => {
  const isbn = req.params.isbn;
  try {
    const response = await axios.get(`http://localhost:5000/books/${isbn}`); // Assuming a books API endpoint
    res.json(response.data);
  } catch (error) {
    res.status(404).json({ message: 'Book not found' });
  }
});

// Get book details based on author
public_users.get('/author/:author', async (req, res) => {
  const author = req.params.author;
  try {
    const response = await axios.get(`http://localhost:5000/books/author/${author}`); // Assuming a books API endpoint
    res.json(response.data);
  } catch (error) {
    res.status(404).json({ message: 'Books not found' });
  }
});

// Get all books based on title (Implement using the same approach as getBooks)

public_users.get('/review/:isbn', (req, res) => {
  const isbn = req.params.isbn;
  const book = books[isbn];
  if (book) {
    res.json(book.reviews); // Assuming reviews are stored in the book object
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

module.exports = { general: public_users };
