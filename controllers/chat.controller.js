const chat = require('../models/chat.model')
const getText = require('../models/textMessage.model')
const group = require('../models/group.model')
const user = require('../models/user.model')

const getMembers = async (groupId, userId) => {

    let id = await group.getMembers(groupId)
    var user1, user2;
    if (userId == id[0].userId) {
        user1 = await user.getUserId(id[0].userId)
        user2 = await user.getUserId(id[1].userId)
    } else {
        user1 = await user.getUserId(id[1].userId)
        user2 = await user.getUserId(id[0].userId)
    }

    const idMembersArray = id.map(element => {
        return element.userId
    })

    const members = {
        members: idMembersArray,
        image: id[0].AdminId ?
            { image1: user1[0].image, image2: user2[0].image } : { image1: user2[0].image, image2: null },
        groupName: id[0].AdminId ? `${user1[0].lastName} ${user1[0].firstName}, ${user2[0].lastName} ${user2[0].firstName},...` : `${user2[0].lastName} ${user2[0].firstName}`,
    }
    return members
}


module.exports.getListChat = async (req, res) => {
    try {
        const userId = req.params.userId;
        if(!userId) return res.sendStatus(404)
        let limit = req.query.limit ?? '100000000';
        let offset = req.query.position ?? '0';
        limit = parseInt(limit);
        offset = parseInt(offset);
        const listChat = await chat.getListChat(userId, limit, offset);
        if (!listChat) {
            return res.sendStatus(404)
        }
        const arr = []
        for (let value of listChat) {
            const lastMessage = {
                type: value.type,
                isSender: value.sendId == userId ? 1 : 0,
                content: null
            };
            if (value.type == 'text') {
                const getTexts = await getText.get(value.receiveId)
                lastMessage.content = getTexts
            }
            const receiver = await getMembers(value.receiveId, userId)
            const chatItem = {
                receiverId: value.receiveId,
                image: receiver.image,
                receiverName: receiver.groupName,
                members: receiver.members,
                lastMessage
            }
            arr.push(chatItem);
        }
        if (listChat.length > 0) {
            res.status(200).json({ data: arr });
        } else {
            res.json({ data: [] })
        }
    } catch (err) {
        console.error(err)
        return res.sendStatus(500)
    }
}

module.exports.searchMessage = async (req, res) => {
    try {
        let content = req.query.content ?? '';
        let receiverId = req.query.receiverId ?? '';
        const search = `%${content}%`
        const searchMessage = await chat.getMessageID(search, receiverId)
        const getMessage = await chat.getMessageByReceiverId(receiverId)
        console.log(getMessage)
        const data = []
        for (let message of searchMessage) {
            const senderInfo = await user.getUserId(message.sendId)
            const idx = getMessage.findIndex(value => message.messageId == value.id)
            const object = {
                receiverId: message.receiveId,
                messageId: message.messageId,
                time: message.time,
                content: message.content,
                image: senderInfo[0].image,
                senderName: senderInfo[0].lastName + ' ' + senderInfo[0].firstName,
                positionMessage: idx,
            }
            data.push(object)
        }
        return res.status(200).json({
            message: 'Tìm kiếm thành công!',
            data
        })
    } catch (Err) {
        console.error(err)
        return res.sendStatus(500)
    }
}

//get content 
module.exports.getContent = async (req, res) => {
    try {
        let senderId = req.query.senderId
        let receiverId = req.query.receiverId
        if (!senderId && !receiverId) {
            return res.sendStatus(404)
        }
        const getMessage = await chat.getContents(senderId, receiverId)
        
        if (!getMessage) {
            return res.sendStatus(404)
        }
        let data = {
            receiverId: getMessage[0].receiveId,
            message: []
        }
        //mỗi lần for là sẽ tạo 1 đối tương mới nên không nên tạo đối tượng ở ngoài scrop 
        for(let message of getMessage){
            let object = {
                messageId :message.id,
                senderId : message.sendId,
                receiverId : message.receiveId,
                content : message.content,
                image: message.image,
                type : message.type,
                status : message.status,
                time: message.time,
                
            }
            data.message.push(object)
        }
        return res.status(200).json({
            message: 'Có tin nhắn',
            data
        })
    } catch (err) {
        console.error(err)
        return res.sendStatus(500)
    }
}