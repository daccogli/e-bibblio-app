const path = require("path");
const Sequelize = require("sequelize");
const {logger} = require('shared-library');
//initialise a database connection
const sequelize = new Sequelize('sqlite::memory:',{
logging: msg => logger.debug(msg),     // Use custom logger (e.g. Winston or Bunyan), 
});
 
// connect to the database
sequelize.authenticate().then(
    function() {
        console.log("Connection has been established successfully.");
    },
    function(err) {
        console.log("Unable to connect to the database:", err);
    }
);

//  MODELS

// Author has a Name
const Author = sequelize.define("Author", {
    name: Sequelize.STRING
});

// Book has a Title and an ISBN number
const Book = sequelize.define("Book", {
    title: Sequelize.STRING,
    isbn: Sequelize.STRING
});

// Book has one or more Authors
Book.belongsToMany(Author, { through: "author_books" });
// Author has written one or more Books
Author.belongsToMany(Book, { through: "author_books" });

// User has a Name, a username and a MemberType (which can be Staff or Student)
const User = sequelize.define("User", {
    name: Sequelize.STRING,
    username: Sequelize.STRING,
    memberType: Sequelize.ENUM("Staff", "Student")
});

// Lending has a DueDate
const Lending = sequelize.define("Lending", {
    dueDate: Sequelize.DATE
});

// A User can have many Lendings
User.hasMany(Lending, { as: "Lendings" });

// A Book can be on one Lending at a time
Book.hasOne(Lending);



// Log table for audit logs 
const Log = sequelize.define("Logs", {
    messages:Sequelize.STRING
});

//  SYNC SCHEMA
const initialiseDatabase = function(wipeAndClear, repopulate) {
    sequelize.sync({ force: wipeAndClear }).then(
        function() {
            console.log("Database Synchronised");
            if (repopulate) {
                repopulate();
            }
        },
        function(err) {
            console.log("An error occurred while creating the tables:", err);
        }
    );
};

module.exports = {
    initialiseDatabase,
    Author,
    Book,
    User,
    Lending, 
    Log
};
