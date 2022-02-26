const { connection } = require("../config/database")
const user = require("../models/user.model")


module.exports.search = async (req, res) => {
    try {
        let senderId = req.query.senderId ?? ''
        let email = req.query.search ?? ''
        const search = `%${email}%`
        const finds = await user.search(search)
        // console.log(finds)
        const data = []
        const friends = await user.searchFriend(senderId)
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
        for (let value of finds) {
            if (value.id == senderId)
                continue
            const object = {
                receiverId: value.id,
                image: value.image,
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
        if(data.length > 0) {
            return res.status(200).json({
                message: 'Tìm kiếm thành công!',
                data
            })
        }else{
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

module.exports.setTemplate = async (req, res) => {
    try {
        const { userId, template } = req.body
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
        const day = timeObj.getDate()
        const month = timeObj.getMonth() + 1
        const year = timeObj.getFullYear()
        
        const data = {
            name: info[0].lastName + ' ' + info[0].firstName,
            email: info[0].email,
            firstName: info[0].firstName,
            lastName: info[0].lastName,
            // DOB: info[0].DOB,
            DOB: day + '/' + month + '/' + year,
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