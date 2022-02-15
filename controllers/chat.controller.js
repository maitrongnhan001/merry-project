const chat = require('../models/chat.model')
const getText = require('../models/textMessage.model')
const group = require('../models/group.model')
const user = require('../models/user.model')

const getMembers = async (groupId) => {

    let id = await group.getMembers(groupId)
    let user1 = await user.getUserId(id[0].userId)
    let user2 = await user.getUserId(id[1].userId)
    const members = {
        image: id[0].AdminId ?
            { image1: user1[0].image, image2: user2[0].image } : { image1: user2[0].image, image2: null },
        groupName: id[0].AdminId ? `${user1[0].lastName} ${user1[0].firstName}, ${user2[0].lastName} ${user2[0].firstName},...` : `${user2[0].lastName} ${user2[0].firstName}`,
    }
    return members
}


module.exports.getListChat = async (req, res) => {
    try {

        const userId = req.params.userId;
        let limit = req.query.limit ?? '100000000';
        let offset = req.query.position ?? '0';
        limit = parseInt(limit);
        offset = parseInt(offset);
        const listChat = await chat.getListChat(userId, limit, offset);
        const arr = []
        for (let value of listChat) {

            const lastMessage = {
                type: value.type,
                isSender: value.sendId == userId ? 1 : 0,
                content: null
            };

            if (value.type == 'text') {
                const getTexts = await getText.get(value.id)
                lastMessage.content = getTexts
            }
            const receiver = await getMembers(value.receiveId)

            const chatItem = {
                receiverId: value.receiveId,
                image: receiver.image,
                receiverName: receiver.groupName,
                lastMessage
            }

            arr.push(chatItem);
        }

        // console.log(arr);


        if (listChat.length > 0) {
            res.status(200).json({ data: arr });
        } else {
            res.json({ data: [] })
        }

    } catch (err) {
        console.error(err)
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
        for(let message of searchMessage) {
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

    }catch(Err) {
        console.error(err)
        return res.sendStatus(500)
    }
}