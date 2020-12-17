
const { FALSE } = require("node-sass");
const db = require("./data");

function addData() {
    var today = new Date();
    const book1 = db.Book.create({
        title: "Le cronache del ghiaccio e del fuoco",
        isbn: "3289589036"
    });
    const book2 = db.Book.create({
        title: "IT",
        isbn: "3344543566"
    });
    const book3 = db.Book.create({
        title: "La leggenda di Earthsea",
        isbn: "9878934725897"
    });

    const author1 = db.Author.create({
        name: "George R.R. Martin"
    });
    const author2 = db.Author.create({
        name: "Stephen King"
    });
    const author3 = db.Author.create({
        name: "Ursula K. Le Guin"
    });

    const user1 = db.User.create({
        name: "Donato Accogli",
        username: "admin",
        memberType: "Staff"
    });

    const lending1 = db.Lending.create({
        dueDate: new Date(Date.now() + 2 * 24*60*60*1000),
    });
 
 

    // wait for all the objects to save and then instantiate relationships.
    Promise.all([book1, book2, book3, author1, author2, author3, user1, lending1])
        .then(results => {
        b1 = results[0];
        b2 = results[1];
        b3 = results[2];
        a1 = results[3];
        a2 = results[4];
        a3 = results[5];
        u1 = results[6];
        l1 = results[7];
        b1.addAuthor(a1);
        b2.addAuthor(a2);
        b3.addAuthors(a3);
        u1.addLending(l1);
        b3.setLending(l1);
    });
}


module.exports= addData;

