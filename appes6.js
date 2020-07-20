// Turn Constructors into Functions
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn
    }
}

class UI {
    addBookToList(book) {
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

    showAlert(message, className) {
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

        document.querySelector("#submit-btn").disabled = true;

        // Disappear after 3 sec
        setTimeout(function () {
            document.querySelector('.alert').remove();
            document.querySelector("#submit-btn").disabled = false;
        }, 3000);
    }

    deleteBook(target) {
        if (target.className === 'delete') {
            // going from a tag to td and finally tr
            target.parentElement.parentElement.remove();
        }
    }

    clearFields() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
}

// Local Storage Class
class Store {
    // Fetch books from local storage
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            // we need this to ba a JS obj
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static displayBooks() {
        const books = Store.getBooks();
        books.forEach(function (book) {
            const ui = new UI;
            // Add book to UI
            ui.addBookToList(book);
        });
    }

    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn) {
        // as in this project there's no unique id for any book, we'll use isbn
        const books = Store.getBooks();
        books.forEach(function (book, index) {
            if (book.isbn === isbn) {
                books.splice(index, 1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books));
    }
}

// DOM Load Event
document.addEventListener('DOMContentLoaded', Store.displayBooks)

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
        // Add Book to Local Storage
        Store.addBook(book);

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

    // Remove from LS
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    // Show Alert
    ui.showAlert('The book is removed', 'success');

    e.preventDefault();
});