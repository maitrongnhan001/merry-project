const chat = require('../models/chat.model')

module.exports.getListChat = async (req, res)=>{
    try{

        const userId = req.params.userId;
        let limit = req.query.limit ?? '100000000';
        let offset = req.query.position ?? '0';
        limit = parseInt(limit);
        offset = parseInt(offset);
        const listChat = await chat.getListChat(userId, limit, offset);

        if(listChat.length > 0){
            res.status(200).json({data: listChat});
        }else{
            res.json({data: []})
        }

    }catch(err){
        console.error(err)
    }
}