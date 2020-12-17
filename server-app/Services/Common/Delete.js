
const db = require("../../model/data");
const writeLogs = require("./WriteLogs");

const Delete = async(req, res, table, body1, body2) => {

    try {
        const data = await db[table].findByPk(req.body[body1]);
        if (data && data.dataValues[body2] === req.body[body2]) { 
            await data.destroy(); 
            res.json('successfully deleted');
            writeLogs(`Deleted ${table}:  ${req.body[body1]},  ${req.body[body2]}`)
        } else {
            res.sendStatus(400);
        }
    
    } catch {res.sendStatus(400)};
}

module.exports = Delete;