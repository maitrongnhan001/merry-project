const group = require('../models/group.model')
const user = require('../models/user.model')

const getMembers = async (groupId) => {

    let id = await group.getMembers(groupId)
    let user1 = await user.getUserId(id[0].userId)
    let user2 = await user.getUserId(id[1].userId)
    // console.log(user1)
    const members = {
        image:
            { image1: user1[0].image, image2: user2[0].image },
        groupName: `${user1[0].lastName} ${user1[0].firstName}, ${user2[0].lastName} ${user2[0].firstName},...`,
    }
    console.log(members)
    return members
}

module.exports.getGroups = async (req, res) => {
    try {
        const userId = req.params.userId;
        let limit = req.query.limit ?? '100000000';
        let offset = req.query.position ?? '0';
        limit = parseInt(limit);
        offset = parseInt(offset);
        const getGroup = await group.getGroup(userId, limit, offset);
        const getGroupMembers = []
        const arrImage = {
            image1: "",
            image2: ""
        }
        const getMemberID = []
        const arr = []

        for (let value of getGroup) {
            if (value.AdminId != null) {

                if (value.image) {
                    arrImage.image1 = value.image

                    if (value.groupName) {
                        const group = {
                            groupId: value.groupId,
                            image: arrImage,
                            groupName: value.groupName
                        }
                        arr.push(group)
                    } else {
                        //truy xuat 2 doi tuong trong nhom
                        const members = await getMembers(value.groupId)
                        const group = {
                            groupId: value.groupId,
                            image: arrImage,
                            groupName: members.groupName
                        }
                        arr.push(group)
                    }
                } else {

                    const members = await getMembers(value.groupId)
                    const group = {
                        groupId: value.groupId,
                        image: members.image,
                        groupName: members.groupName
                    }
                    arr.push(group)

                }

            }
        }

        if (arr.length > 0) {
            res.status(200).json({
                data: arr
            });
        } else {
            res.json({
                data: []
            })
        }

    } catch (err) {
        console.error(err)
    }
}