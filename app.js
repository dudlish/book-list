// Book Constructor (creating actual book obj)
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// UI Constructor (a set of prototype methods to do things like: add book to the list, delete book; show the alert. all things that have to do with the UI)
function UI() { }

UI.prototype.addBookToList = function (book) {
    const list = document.getElementById('book-list');

    // Create An Element (tr)
    const row = document.createElement('tr');
    console.log(row);

    // Insert
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class = "delete">X</a></td>
    `;

    list.appendChild(row);
}

// Show alert
UI.prototype.showAlert = function (message, className) {
    // Create a DIV
    const div = document.createElement('div');
    // Add Classes (one is alert and another passed in the func)
    div.className = `alert ${className}`;
    // Add Text
    div.appendChild(document.createTextNode(message));
    // Insert div into the dome: Get Parent
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    container.insertBefore(div, form);

    // Disappear after 3 sec
    setTimeout(function () {
        document.querySelector('.alert').remove();
    }, 3000);
}

// Delete Item
UI.prototype.deleteBook = function (target) {
    if (target.className === 'delete') {
        // going from a tag to td and finally tr
        target.parentElement.parentElement.remove();
    }
}

// Clear Input
UI.prototype.clearFields = function () {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}


// Event Listener for Add Book
document.getElementById('book-form').addEventListener('submit', function (e) {

    // Get Form Values
    const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;

    // Instantiate A Book
    const book = new Book(title, author, isbn);

    // Instantiate UI
    const ui = new UI();

    // Validate
    if (title === '' || author === '' || isbn === '') {
        // Error Alert (error is a classes, created in style part of html)
        ui.showAlert('Please, fill in all fields', 'error');
    } else {
        // Add The Book To A List
        ui.addBookToList(book);

        // Show Alert
        ui.showAlert('The book is added', 'success');

        // Clear Input
        ui.clearFields();
    }

    e.preventDefault();
});

// Event Listener for Delete
// we use the parent
document.getElementById('book-list').addEventListener('click', function (e) {
    // Instantiate UI
    const ui = new UI();

    ui.deleteBook(e.target);
    // Show Alert
    ui.showAlert('The book is removed', 'success');

    e.preventDefault();
});