
const db = require("../../model/data");
const writeLogs = require("../Common/WriteLogs");

const AddLending = (req, res) =>{
        db.User.findByPk(req.params.userID).then(function(user) {
        if (user) {
            db.Book.findByPk(req.params.bookID).then(function(book) {
                if (book) {
                    db.Lending.findOrCreate({
                        where: { UserId: req.params.userID, BookId: req.params.bookID }
                    }).spread(function(Lending, created) {
                        Lending.dueDate = new Date(req.body.dueDate);
                        Lending.save().then(function(Lending) {
                            res.json(Lending);
                        });
                    });
                    writeLogs(`Added Lending: UserID:${req.params.userID}, BookID:${req.params.bookID}`)
                }
            });
        } else {
            res.sendStatus(400);
        }
    });
}

module.exports = AddLending;