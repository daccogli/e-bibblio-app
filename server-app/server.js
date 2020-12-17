
const express = require("express");
const cors = require("cors");
const db = require("./model/data");
const initDb = require('./model/initialise_database')

const booksRouter = require("./Controllers/books");
const usersRouter = require("./Controllers/users");
const lendingsRouter = require("./Controllers/lendings");
const logsRouter = require("./Controllers/logs");


const server = express();

// interpret JSON body of requests
server.use(express.json());

// interpret url-encoded queries
server.use(express.urlencoded({ extended: false }));

// allow CORS
server.use(cors());

// allow CORS preflight for all routes
server.options("*", cors());

 
server.use("/books", booksRouter);
server.use("/users", usersRouter);
server.use("/lendings", lendingsRouter);
server.use("/logs", logsRouter);

// handle errors last
server.use((err, req, res, next) => {
    res.status = err.status || 500;
    res.send(err);
});

// connect to the database and start the server running
db.initialiseDatabase(true, initDb);
server.listen(5000, () => {
    console.log("server listening");
});
