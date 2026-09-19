const express = require('express');
const axios = require('axios');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (isValid(username)) { 
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "Customer successfully registered. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});
    }
  } 
  return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  res.send(JSON.stringify(books, null, 4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  res.send(books[isbn]);
});
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author;
  let booksByAuthor = [];
  for (let key in books) {
    if (books[key].author === author) {
      booksByAuthor.push(books[key]);
    }
  }
  res.send(booksByAuthor);
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title;
  let booksByTitle = [];
  for (let key in books) {
    if (books[key].title === title) {
      booksByTitle.push(books[key]);
    }
  }
  res.send(booksByTitle);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  res.send(books[isbn].reviews);
});

// --------------------------------------------------------------------------
// Task 11: Implementations using async/await and Axios
// --------------------------------------------------------------------------
const getBooksAsync = async () => {
    try {
        const response = await axios.get('http://localhost:5000/');
        console.log("All books retrieved using async/await: ", response.data);
    } catch (error) {
        console.error(error);
    }
};

const getBookByISBNAsync = async (isbn) => {
    try {
        const response = await axios.get(`http://localhost:5000/isbn/${isbn}`);
        console.log(`Book with ISBN ${isbn} retrieved using async/await: `, response.data);
    } catch (error) {
        console.error(error);
    }
};

const getBooksByAuthorAsync = async (author) => {
    try {
        const response = await axios.get(`http://localhost:5000/author/${author}`);
        console.log(`Books by ${author} retrieved using async/await: `, response.data);
    } catch (error) {
        console.error(error);
    }
};

const getBooksByTitleAsync = async (title) => {
    try {
        const response = await axios.get(`http://localhost:5000/title/${title}`);
        console.log(`Books with title ${title} retrieved using async/await: `, response.data);
    } catch (error) {
        console.error(error);
    }
};

// These functions demonstrate the requirement for Task 11.
// getBooksAsync();
// getBookByISBNAsync(1);
// getBooksByAuthorAsync('Chinua Achebe');
// getBooksByTitleAsync('Things Fall Apart');

module.exports.general = public_users;
