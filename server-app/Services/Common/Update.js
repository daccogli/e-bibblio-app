  
const db = require("../../model/data");
const writeLogs = require("./WriteLogs");

const Update = async (
    req, res, table, para1, updateItem1, updateItem2, updateItem3
) => {

    const data = await db[table].findByPk(req.params[para1])
        if (data) {

            //update items
            data[updateItem1] = req.body[updateItem1];
            data[updateItem2] = req.body[updateItem2];
            data[updateItem3] = req.body[updateItem3];
            await data.save();
            res.json('updated sucessfully');
            writeLogs(`Updated ${table}  id: ${req.params[para1]}`);
        } else {res.sendStatus(400)};
}

module.exports =  Update