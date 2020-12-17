
const db = require("../../model/data");

const GetUserOfBook = async(req, res) => {
    try {
        //get UserId by BookId on Lending
        const data = await db.Lending.findOne({ where: { BookId: req.query.bookID||'' } });
        const UserId = (data&&data.dataValues)?data.dataValues.UserId:'';
        if(UserId==''){
            res.json([]);
        };
        //get user by userId
        let user = {}
        await getUser(user, UserId)
        res.json([user])

    } catch (e){
        console.log(e);
        res.sendStatus(400);}
}

const getUser = async(user, UserId) => {
        let User = await db.User.findOne({where:{id: UserId }});
        user.id = User.dataValues.id
        user.name = User.dataValues.name;
        user.username = User.dataValues.username;
        user.memberType = User.dataValues.memberType;
}

module.exports = GetUserOfBook;