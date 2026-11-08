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

    const borrowedKey = `borrowedBooks_${user.username}`;

    let borrowedBooks =
        JSON.parse(localStorage.getItem(borrowedKey)) || [];

    // RETURN BOOK
    if (book.borrowedBy === user.username) {

        book.available = true;
        book.borrowedBy = null;
        book.dueDate = null;

        borrowedBooks = borrowedBooks.filter(
            b => b.id !== bookId
        );

        localStorage.setItem(
            borrowedKey,
            JSON.stringify(borrowedBooks)
        );

        localStorage.setItem(
            "books",
            JSON.stringify(books)
        );

        alert(`${book.title} returned successfully!`);

        location.reload();
        return;
    }

    // BOOK ALREADY BORROWED BY ANOTHER USER
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

    localStorage.setItem(
        "books",
        JSON.stringify(books)
    );

    // Add to borrowed section
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
document
    .getElementById("borrowBtn")
    .addEventListener("click", () => {
        borrowBook(21); // book id
    });
    const user = JSON.parse(localStorage.getItem("currentUser"));
const books = JSON.parse(localStorage.getItem("books")) || [];

const book = books.find(b => b.id === 21);

if (
    user &&
    book &&
    book.borrowedBy === user.username
) {
    document.getElementById("borrowBtn").textContent =
        "Return Book";
}



