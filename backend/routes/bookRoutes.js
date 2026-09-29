const express = require("express");
const Book = require("../models/Book");

const router = express.Router();

// Add a book
router.post("/", async (req, res) => {
  try {
    const {
      title,
      author,
      isbn,
      category,
      publicationYear
    } = req.body;

    if (!title || !author || !isbn || !category || !publicationYear) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const existingBook = await Book.findOne({ isbn });

    if (existingBook) {
      return res.status(400).json({
        message: "Book with this ISBN already exists"
      });
    }

    const book = new Book({
      title,
      author,
      isbn,
      category,
      publicationYear
    });

    await book.save();

    res.status(201).json({
      message: "Book added successfully",
      book
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// Get all books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();

    res.json(books);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

module.exports = router;