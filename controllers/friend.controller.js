const friend = require('../models/friend.model')
const user = require('../models/user.model')

module.exports.getFriend = async (req, res) => {
    try {
        //http://localhost:8080/api/friends/1?limit=1&position=1
        const userId = req.params.userId;
        let limit = req.query.limit ?? '100000000';
        let offset = req.query.position ?? '0';
        limit = parseInt(limit);
        offset = parseInt(offset);
        const array = [];
        const friends = await friend.listFriend(userId, limit, offset);
        if(!friends) {
            return res.sendStatus(404)
        }
        for (let value of friends) {
            if (value.sendId == userId) {
                delete value.sendId;
                array.push(value.receiveId)
                continue         
            }
            if (value.receiveId == userId) {
                delete value.receiveId
                array.push(value.sendId)
            }
        }
        const result = []
        for (let value of array) {
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
    } catch (err) {
        console.error(err);
    }
}


module.exports.requestFriend = async (req, res) => {
    try {
        //http://localhost:8080/api/friends/friends-request/1?limit=2&position=0
        const userId = req.params.userId;
        let limit = req.query.limit ?? '100000000';
        let offset = req.query.position ?? '0';
        limit = parseInt(limit);
        offset = parseInt(offset);
        const array = [];
        const requestfriends = await friend.getRequestFriend(userId, limit, offset);
        for (let value of requestfriends) {
            if (value.sendId == userId) {
                delete value.sendId;
                array.push(value.receiveId)
                continue
            }
            if (value.receiveId == userId) {
                delete value.receiveId
                array.push(value.sendId)
            }
        }
        const result = []
        for (let value of array) {
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
    } catch (err) {
        console.error(err);
    }
}

// search friend

module.exports.search = async (req, res) => {
    try {
        let senderId = req.query.senderId ?? ''
        let email = req.query.search ?? ''
        const search = `%${email}%`
        const friends = await user.searchFriend(senderId)
        const data = []
        let array = []
        for (let friend of friends) {
            if (friend.sendId == senderId) {
                array.push(friend.receiveId)
                continue
            }
            if (friend.receiveId == senderId) {
                array.push(friend.sendId)
            }
        }
        console.log(search)
        for (let value of array) {
            const finds = await user.searchUser(search, value)
            for (let info in finds) {
                if (value == senderId)
                    continue
                const object = {
                    userId: value,
                    image: finds[0].image,
                    name: finds[0].lastName + ' ' + finds[0].firstName,
                }
                data.push(object)
            }
        }
        return res.status(200).json({
            message: 'Tìm kiếm thành công!',
            data
        })
    } catch (err) {
        console.error(err)
        return res.sendStatus(500)
    }
}
