
const db = require("../../model/data");

const getLendingsOfUser = async(req, res) => {
    try {
        //get lendingsList
        let data ;
        if (req.query.userID){
        data =await db.Lending.findAll({ where: { UserId: req.query.userID||'' } });
        }
        else{
            data = await db.Lending.findAll(); 
        }
        const lendingsList = await Promise.all(data.map((mappedData)=>{
            return mappedData.dataValues
        }))

        //assign isbn to Lending obj
        await getISBN(lendingsList);
        res.json(lendingsList)

    } catch (e) {
        console.log(e);
        res.sendStatus(400);
    }
}

const getISBN = async(lendingsList) => {
    for(let Lending of lendingsList) {
        let book = await db.Book.findOne({where:{id: Lending.BookId }});
        Lending.isbn = book.dataValues.isbn;
    }
}

module.exports = getLendingsOfUser;