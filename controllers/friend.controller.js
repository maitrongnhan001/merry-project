const friend = require('../models/friend.model')

module.exports.getFriend = async(req, res) =>{
    try{
        //http://localhost:8080/api/friends/1?limit=1&position=1
        const userId = req.params.userId;
        let limit = req.query.limit ?? '100000000';
        let offset = req.query.position ?? '0';
        limit = parseInt(limit);
        offset = parseInt(offset);
        const array = [];
        const friends = await friend.listFriend(userId, limit, offset);
        for(let value of friends){
            if(value.sendId == userId ){
                delete value.sendId;
                array.push(value.receiveId)
                continue
            }
            if(value.receiveId == userId){
                delete value.receiveId
                array.push(value.sendId) 
            }
        }
        const result = []
        for(let value of array){
            let getUserIds = await friend.getUserId(value);
            result.push(...getUserIds)
        }
        
        if (result.length > 0) {
            res.status(200).json({
                data: result
            });
        }
        else {
            res.json({
                data: []
            })
        }
    }catch(err){
        console.error(err);
    }
}


module.exports.requestFriend = async (req, res) => {
    try{
        //http://localhost:8080/api/friends/friends-request/1?limit=2&position=0
        const userId = req.params.userId;
        let limit = req.query.limit ?? '100000000';
        let offset = req.query.position ?? '0';
        limit = parseInt(limit);
        offset = parseInt(offset);
        const array = [];
        const requestfriends = await friend.getRequestFriend(userId, limit, offset);
        for(let value of requestfriends){
            if(value.sendId == userId ){
                delete value.sendId;
                array.push(value.receiveId)
                continue         
            }
            if(value.receiveId == userId){
                delete value.receiveId
                array.push(value.sendId) 
            }
        }
        const result = []
        for(let value of array){
            let getUserIds = await friend.getUserId(value);
            result.push(...getUserIds)
        }
        
        if (result.length > 0) {
            res.status(200).json({
                data: result
            });
        }
        else {
            res.json({
                data: []
            })
        }
    }catch(err){
        console.error(err);
    }
}