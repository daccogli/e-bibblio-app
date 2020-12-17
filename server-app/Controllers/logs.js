const express = require("express");
const router = express.Router();
const Search = require("../Services/Common/Search")

router.get("/search",   (req, res) => {
    
    Search(req, res, 'Log', 'createdAt')
})

module.exports = router;
