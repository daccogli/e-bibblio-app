const express = require("express");
const router = express.Router();

const AddBook = require("../Services/Books/AddBookAndAuthor");
const SearchBook = require("../Services/Books/SearchBook");
const Delete = require("../Services/Common/Delete");



router.post("/add",   (req, res) => {
    AddBook(req, res)
});

router.get("/search",   (req, res) => {
    SearchBook(req, res); 
})

router.delete("/delete",   (req, res) => {

    Delete(req, res, 'Book', 'id', 'isbn')
});



module.exports = router;
