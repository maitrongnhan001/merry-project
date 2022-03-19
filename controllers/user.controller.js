const user = require("../models/user.model")
const friend = require("../models/friend.model")
const detailGroup = require("../models/detailGroup.model")
const userIsOnline = require("../stores/UserLoginStore")

module.exports.search = async (req, res) => {
    try {
        let senderId = req.query.senderId ?? ''
        let email = req.query.search ?? ''
        const search = `%${email}%`
        const finds = await user.search(search)
        if (!finds)
            return res.sendStatus(404)
        const data = []
        const friends = await user.searchFriend(senderId)
        let array = []
        if (friends) {
            for (let friend of friends) {
                if (friend.sendId == senderId) {
                    array.push(friend.receiveId)
                    continue
                }
                if (friend.receiveId == senderId) {
                    array.push(friend.sendId)
                }
            }
        }

        for (let value of finds) {
            if (value.id == senderId)
                continue
            const object = {
                receiverId: value.id,
                image: { image1: value.image, image2: '' },
                name: value.lastName + ' ' + value.firstName,
                isFriend: 0,
            }
            for (let arr of array) {
                if (arr == value.id) {
                    object.isFriend = 1
                    break
                } else {
                    object.isFriend = 0
                }
            }

            data.push(object)
        }
        if (data.length > 0) {
            return res.status(200).json({
                message: 'Tìm kiếm thành công!',
                data
            })
        } else {
            return res.json({
                message: 'Không có dữ liệu',
                data: []
            })
        }


    } catch (err) {
        console.error(err)
        return res.sendStatus(500)
    }
}

//get template
module.exports.getTemplate = async (req, res) => {
    try {
        const { userId } = req.params
        if (!userId) {
            return res.semdStatus(404)
        }
        const template = await user.getTemplates(userId)
        if (!template) {
            return res.semdStatus(404)
        } else {
            return res.status(200).json({
                message: 'Tìm kiếm thành công!',
                template
            })
        }

    } catch (err) {
        console.error(err)
        return res.sendStatus(500)
    }
}

//update template
module.exports.setTemplate = async (req, res) => {
    try {
        const { userId } = req.params
        const { template } = req.body
        if (!userId || !template) {
            return res.sendStatus(404)
        }
        const updateTemplates = await user.updateTemplate(template, userId);
        if (updateTemplates) {
            return res.status(200).json({
                message: 'Cập nhật thành công',
                data: {
                    userId, template
                }
            })
        }

        return res.sendStatus(404)

    } catch (err) {
        console.error(err)
        return res.sendStatus(500)
    }
}

//search by id 
module.exports.searchById = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            return res.sendStatus(404)
        }

        const info = await user.get(id)
        var timeObj = new Date(info[0].DOB);
        const date = timeObj.getDate()
        const month = timeObj.getMonth() + 1
        const year = timeObj.getFullYear()

        const data = {
            name: info[0].lastName + ' ' + info[0].firstName,
            email: info[0].email,
            firstName: info[0].firstName,
            lastName: info[0].lastName,
            // DOB: info[0].DOB,
            date,
            month,
            year,
            image: info[0].image,
            sex: info[0].sex,

        }
        if (data) {
            return res.status(200).json({
                message: "Có thông tin người dùng",
                data
            })
        }
        return res.sendStatus(404)
    } catch (err) {
        console.error(err)
        return res.sendStatus(500)
    }
}

//get other users
module.exports.getOtherUsers = async (req, res) => {
    try {
        const userId = req.params.userId
        let limit = req.query.limit
        limit = 10
        let offset = req.query.position ?? '0';
        limit = parseInt(limit);
        offset = parseInt(offset);
        const array = [];
        if (!userId) {
            return res.sendStatus(404)
        }
        const friends = await friend.listFriend(userId, limit, offset);
        if (friends) {
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
        }
        const arrAllUsers = []
        const allUsers = await user.getAllUser();
        for (let value of allUsers) {
            for (let isFriend of array) {
                if (value.id == isFriend) {
                    delete value.id
                    continue
                }
            }
            arrAllUsers.push(value.id)
        }
        const idOther = []
        for (let value of arrAllUsers) {
            if (value) {
                idOther.push(value)
            }
        }
        const data = []
        for (let value of idOther) {
            let getUser = await user.get(value)
            if (value == userId)
                continue
            data.push({
                userId: getUser[0].id,
                image: {
                    image1: getUser[0].image,
                },
                name: getUser[0].lastName + ' ' + getUser[0].firstName,
            })
        }
        if (data) {
            return res.status(200).json({
                message: "Các bạn khác nè!",
                data: data
            })
        } else {
            return res.sendStatus(404)
        }

    } catch (err) {
        console.error(err)
        res.sendStatus(500)
    }
}

//get another user by user id and group id
module.exports.getUserByGroupIdAndUserId = async (req, res) => {
    try {
        //get data
        const userId = req.query.userId || null
        const groupId = req.query.groupId || null

        //check data
        if (!userId || !groupId) return res.sendStatus(404)

        //get data
        const anotherUser = (await detailGroup.getUserIdByAnotherUserIdAndGroupId(userId, groupId))[0].userId

        //return data for client
        if (anotherUser) {
            return res.status(200).json({ message: "Truy vấn thành công", data: anotherUser })
        } else {
            return res.status(200).json({ message: "Truy vấn thành công, không có dữ liệu", data: null })
        }
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
}

module.exports.getUserOnline = async (req, res) => {
    try {
        //lay & kiem tra du lieu
        const userId = req.params.userId;
        if (!userId) return res.status(404);

        //lay ban be
        const listFriend = await friend.listFriend(userId, 100000, 0);
        const userOnlineArr = [];
        if (!listFriend) return res.status(404);

        await listFriend.forEach(async (Element) => {
            //kiem tra ai online
            const IdFriend = Element.sendId == userId ? Element.receiveId : Element.sendId;
            if (await userIsOnline.checkUser(IdFriend)) {
                userOnlineArr.push(IdFriend);
            }
        });
        //tra ve client
        res.status(200).json({
            message: "Truy vấn thành công",
            data: userOnlineArr
        });
    } catch (error) {
        console.log(error);
        return res.status(500);
    }
}

module.exports.getUserInformation = async (req, res) => {
    //get user's information
    try {
        //get data
        const userId1 = parseInt(req.query.userId1) || null
        const userId2 = parseInt(req.query.userId2) || null

        //check data
        if (!userId1 || !userId2) return res.sendStatus(404)

        //get information of user 2
        const returnData = {} //this is data, it will return for client
        const informationOfUser2 = await user.get(userId2)
        returnData.email = informationOfUser2[0].email
        returnData.image = informationOfUser2[0].image
        returnData.name = `${informationOfUser2[0].lastName} ${informationOfUser2[0].firstName}`
        returnData.userId = userId2

        //check user1 and user2 are friend
        const isFriend = await friend.isFriend(userId1, userId2)
        returnData.isFriend = isFriend

        //get id group chat of user1 and user2
        const idGroupChat = await detailGroup.getGroupIdByUserIds(userId1, userId2)
        if (idGroupChat.length > 0) {
            returnData.receiverId = idGroupChat[0].groupId
        } else {
            returnData.receiverId = null
        }

        //return data for user
        res.status(200).json({
            message: 'Truy vấn thành công',
            data: returnData
        });
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
}