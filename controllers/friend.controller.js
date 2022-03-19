const friend = require('../models/friend.model')
const user = require('../models/user.model')
const detailGroup = require('../models/detailGroup.model')
const waiting = require('../models/waiting.model');
const group = require('../models/group.model')

const getMembers = async (groupId) => {
    let id = await group.getMembers(groupId)
    let user1 = await user.getUserId(id[0].userId)
    let user2 = await user.getUserId(id[1].userId)
    const idMembersArray = id.map(element => {
        return element.userId
    })
    const members = {
        members: idMembersArray,
        image:
            { image1: user1[0].image, image2: user2[0].image },
        groupName: `${user1[0].lastName} ${user1[0].firstName}, ${user2[0].lastName} ${user2[0].firstName},...`,
    }
    // console.log(members)
    return members
}

module.exports.getFriend = async (req, res) => {
    try {
        //http://localhost:8080/api/friends/1?limit=1&position=1
        const userId = req.params.userId;
        let limit = req.query.limit ?? '100000000';
        let offset = req.query.position ?? '0';
        limit = parseInt(limit);
        offset = parseInt(offset);
        const array = [];
        if (!userId) {
            return res.sendStatus(404)
        }
        const friends = await friend.listFriend(userId, limit, offset);
        if (!friends) {
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
            let getGroupId = await detailGroup.getGroupIdMember(userId, value)
            // console.log(getGroupId)
            if (!getUserIds || !getGroupId) {
                return res.sendStatus(404)
            }
            result.push({ ...getUserIds[0], groupId: getGroupId, image: { image1: getUserIds[0].image } })
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
        return res.sendStatus(500)
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
        if (!userId) {
            return res.sendStatus(404)
        }
        const requestFriends = await friend.getRequestFriend(userId, limit, offset);
        if (!requestFriends)
            return res.sendStatus(404)
        for (let value of requestFriends) {
            array.push(value.sendId)
        }
        const result = []
        for (let value of array) {
            let getUserIds = await friend.getUserId(value);
            let data = {
                senderId: getUserIds[0].id,
                receiverId: userId,
                image: getUserIds[0].image,
                name: getUserIds[0].name,
                sex: getUserIds[0].sex
            }
            result.push(data)
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
        return res.sendStatus(500)
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
        if (!senderId) {
            return res.sendStatus(404)
        }
        for (let friend of friends) {
            if (friend.sendId == senderId) {
                array.push(friend.receiveId)
                continue
            }
            if (friend.receiveId == senderId) {
                array.push(friend.sendId)
            }
        }
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
        if (data.length > 0) {
            return res.status(200).json({
                message: 'Tìm kiếm thành công!',
                data
            })
        } else {
            return res.sendStatus(404)
        }
    } catch (err) {
        console.error(err)
        return res.sendStatus(500)
    }
}

module.exports.checkFriend = async (req, res) => {
    try {
        const userId = req.query.userId || null
        const groupId = req.query.groupId || null

        //check user
        if (!userId || !groupId) {
            return res.sendStatus(404)
        }

        //get user
        const anotherUserId = (await detailGroup.getUserIdByAnotherUserIdAndGroupId(userId, groupId))[0].userId;

        //check users is friend
        const resultFriend = await friend.isFriend(userId, anotherUserId);

        if (resultFriend) {
            //return data
            const returnData = {
                message: 'Truy vấn thành công',
                statusFriend: 2,
                data: anotherUserId
            }
            return res.status(200).json(returnData);
        }

        //khong la ban be, kiem tra trong ban waiting
        const resultWaiting = await waiting.isWaiting(userId, anotherUserId);

        if (resultWaiting) {
            //return data
            const returnData = {
                message: 'Truy vấn thành công',
                statusFriend: 1,
                data: resultWaiting[0]
            }
            return res.status(200).json(returnData);
        }

        //return data, khong co trong ban waiting 
        const returnData = {
            message: 'Truy vấn thành công',
            statusFriend: 0,
            data: anotherUserId
        }
        return res.status(200).json(returnData);
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
}

module.exports.searchFriendAndGroupByName = async (req, res) => {
    try {
        let senderId = req.query.senderId
        let {name}= req.query
        let limit = req.query.limit ?? '100000000';
        let offset = req.query.position ?? '0';
        const search = `%${name}%`
        const friends = await user.searchFriend(senderId)
        const data = []
        let array = []

        if(!friends){
            return res.status(200).json({
                message: "Không phải là bạn"
            })
        }

        if (!senderId) {
            return res.sendStatus(404)
        }
        for (let friend of friends) {
            if (friend.sendId == senderId) {
                array.push(friend.receiveId)
                continue
            }
            if (friend.receiveId == senderId) {
                array.push(friend.sendId)
            }
        }
        for (let value of array) {
            let finds = await user.searchUserByName(search,value)
            if(!name){
                finds = await user.searchUserAll(value)
            }
            if(finds.length <= 0) {
                return res.status(200).json({
                    message: "Không có dữ liệu"
                })
            }
            for (let info in finds) {
                if (value == senderId)
                    continue
                const membersId = []
                membersId.push(value)
                const object = {
                    members: membersId,
                    image:{
                        image1:finds[0].image,
                        image2: "",
                    },
                    name: finds[0].lastName + ' ' + finds[0].firstName,
                }
                data.push(object)
            }
        }
        let groupId = await group.searchGroupByName(search)
        if(!name){
            groupId = await group.searchGroupALL(senderId)
        }
        //truong hop k co viet ham lay all
        // console.log(groupId);
        if(!groupId){
            return res.status(200).json({
                message: "Không có trong nhóm",
            })
        }
        if(!friends || !groupId){
            return res.sendStatus(404)
        }
        const arrGroup = []
        for(let value of groupId){
            arrGroup.push(value.id)
        }
        const arrUserIdOfGroup = []
        for(let value of arrGroup){
            const userIdOfGroup = await group.getUserIdByGroupId(value)
            arrUserIdOfGroup.push(userIdOfGroup)
        }
        if(arrUserIdOfGroup.length <= 0){
            return res.status(200).json({
                message: 'Tìm kiếm thành công!',
                data
            })
        }else{

            for (let value of arrUserIdOfGroup) {
                let arrImage = {
                    image1: "",
                    image2: ""
                }
                if(!value.groupId){
                    return res.status(200).json({
                        message: 'Tìm kiếm thành công!',
                        data
                    })
                }
                const members = await getMembers(value.groupId)
                // console.log(members)
                if (value.AdminId != null) {
                    //console.log(value);
                    if (value.image) {
                        arrImage.image1 = value.image
                        if (value.groupName) {
                            const group = {
                                members: members.members,
                                groupId: value.groupId,
                                image: arrImage,
                                groupName: value.groupName
                            }
                            // arr.push(group)
                            data.push(group)
                        } else {
                            //truy xuat 2 doi tuong trong nhom
                            const group = {
                                members: members.members,
                                groupId: value.groupId,
                                image: arrImage,
                                groupName: members.groupName
                            }
                            // arr.push(group)
                            data.push(group)
                        }
                    } else {
                        arrImage = members.image
                        if (value.groupName) {
                            const group = {
                                members: members.members,
                                groupId: value.groupId,
                                image: arrImage,
                                groupName: value.groupName
                            }
                            // arr.push(group)
                            data.push(group)
                        } else {
                            //truy xuat 2 doi tuong trong nhom
                            const group = {
                                members: members.members,
                                groupId: value.groupId,
                                image: arrImage,
                                groupName: members.groupName
                            }
                            // arr.push(group)
                            data.push(group)
                        }
                    }
                }
            }
            if (data.length > 0) {
                return res.status(200).json({
                    message: 'Tìm kiếm thành công!',
                    data
                })
            } else {
                return res.sendStatus(404)
            }
        }

    } catch (err) {
        console.error(err)
        return res.sendStatus(500)
    }
}