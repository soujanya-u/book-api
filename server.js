const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

// In-memory array to store books
let books = [
  { id: 1, title: "Atomic Habits", author: "James Clear" },
  { id: 2, title: "The Alchemist", author: "Paulo Coelho" }
];

// GET /books - Retrieve all books
app.get('/books', (req, res) => {
  res.status(200).json(books);
});

// POST /books - Add a new book
app.post('/books', (req, res) => {
  console.log("Request Body:", req.body); // Debugging
  const { title, author } = req.body;

  if (!title || !author) {
    return res.status(400).json({ error: "Title and author required" });
  }

  const newBook = { id: books.length + 1, title, author };
  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT /books/:id - Update a book
app.put('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const { title, author } = req.body;
  const book = books.find(b => b.id === bookId);

  if (!book) {
    return res.status(404).json({ error: "Book not found" });
  }

  if (title) book.title = title;
  if (author) book.author = author;

  res.status(200).json(book);
});

// DELETE /books/:id - Delete a book
app.delete('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const index = books.findIndex(b => b.id === bookId);

  if (index === -1) {
    return res.status(404).json({ error: "Book not found" });
  }

  const deletedBook = books.splice(index, 1);
  res.status(200).json({ message: "Book deleted", book: deletedBook[0] });
});

// Start server
app.listen(port, () => {
  console.log(`Book API running at http://localhost:${port}`);
});
