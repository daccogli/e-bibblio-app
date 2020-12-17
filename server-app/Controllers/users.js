const express = require("express");
const router = express.Router();
const AddUsers = require("../Services/Users/AddUsers");
const Delete = require("../Services/Common/Delete");
const Search = require("../Services/Common/Search");
const Update = require("../Services/Common/Update");


router.get("/search",   (req, res) => {
    Search(req, res, 'User', 'name', 'username')
});

router.post("/add",   (req, res) => {
    AddUsers(req, res)
});

router.put("/:userID",   (req, res) => {
    Update(req, res, 'User', 'userID', 'name', 'username', 'memberType')
});

router.delete("/delete",   (req, res) => {
    Delete(req, res, 'User', 'id', 'username', 'User')
});



module.exports = router;
