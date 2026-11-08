const express = require('express');
const app = express();
const PORT = 3000;
const books = [
{ id: 1, title: 'Book 1', author: 'Author 1' },
{ id: 2, title: 'Book 2', author: 'Author 2' },
{ id: 3, title: 'Book 3', author: 'Author 3' }
];

app.get('/books', (req, res) => {
    res.json(books);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});