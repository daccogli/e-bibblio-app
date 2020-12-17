const express = require("express");
const router = express.Router();

const Delete = require("../Services/Lendings/Delete");
const AddLending = require("../Services/Lendings/Add");
const Update = require("../Services/Lendings/Update");
const getLendingsOfUser = require("../Services/Lendings/GetLendingsOfUser");
const GetUserOfBook = require("../Services/Lendings/GetUserOfBook");
 



//Get a list of a User’s current Lendings by userID
router.get("/search",   (req, res) => {
    getLendingsOfUser(req, res);
});


//Get the User currently borrowing a Book
router.get("/user",   (req, res) => {
    GetUserOfBook(req, res);
});

//Lending a Book to a User (if it is not already out on Lending), specifying the Due Date
router.post("/book/:bookID/user/:userID",   (req, res) => {
    AddLending(req, res)
});

router.put("/:lendingID",   (req, res) => {
    req.body.dueDate = new Date(req.body.dueDate)
    Update(req, res, 'Lending', 'lendingID', 'dueDate')
});

router.delete("/delete",   (req, res) => {
    Delete(req, res, 'Lending', 'id')
});









module.exports = router;
