
const db = require("../../model/data");
const writeLogs = require("../Common/WriteLogs");

const AddUsers = async(req, res) => {

    try {
        const {name, username, memberType} = req.body;
        await db.User.create({name: name,username: username, memberType: memberType});
        res.json("Successfully Added");
        writeLogs(`Added User Name: '${name}' , username: ${username}, MemberType: ${memberType}`);
    } 
    catch {res.sendStatus(400)};
}

module.exports = AddUsers;