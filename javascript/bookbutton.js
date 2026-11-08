function borrowBook(bookId) {
    const user = JSON.parse(localStorage.getItem("currentUser"));

    // Redirect if not logged in
    if (!user) {
        window.location.href = "login.html";
        return;
    }

    const books = JSON.parse(localStorage.getItem("books")) || [];

    const book = books.find(b => b.id === bookId);

    if (!book) {
        alert("Book not found.");
        return;
    }

    if (!book.available) {
        alert("This book is already borrowed.");
        return;
    }

    // 14-day loan period
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 14);

    // Update catalog
    book.available = false;
    book.borrowedBy = user.username;
    book.dueDate = dueDate.toISOString();

    localStorage.setItem("books", JSON.stringify(books));

    // Add to user borrowed list
    const borrowedKey = `borrowedBooks_${user.username}`;

    const borrowedBooks =
        JSON.parse(localStorage.getItem(borrowedKey)) || [];

    borrowedBooks.push(book);

    localStorage.setItem(
        borrowedKey,
        JSON.stringify(borrowedBooks)
    );

    alert(
        `${book.title} borrowed successfully!\nDue: ${dueDate.toLocaleDateString()}`
    );

    location.reload();
}