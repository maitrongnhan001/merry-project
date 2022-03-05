const group = require('../models/group.model')
const user = require('../models/user.model')

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

// get groups api/groups/:userId
module.exports.getGroups = async (req, res) => {
    try {
        const userId = req.params.userId;
        let limit = req.query.limit ?? '100000000';
        let offset = req.query.position ?? '0';
        limit = parseInt(limit);
        offset = parseInt(offset);
        if (!userId) {
            return res.sendStatus(404)
        }
        const getGroup = await group.getGroup(userId, limit, offset);
        if (!getGroup) { //refalsy
            return res.sendStatus(404)
        }
        const getGroupMembers = []

        const getMemberID = []
        const arr = []

        for (let value of getGroup) {
            let arrImage = {
                image1: "",
                image2: ""
            }
            const members = await getMembers(value.groupId)
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
                        arr.push(group)
                    } else {
                        //truy xuat 2 doi tuong trong nhom
                        const group = {
                            members: members.members,
                            groupId: value.groupId,
                            image: arrImage,
                            groupName: members.groupName
                        }
                        arr.push(group)
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
                        arr.push(group)
                    } else {
                        //truy xuat 2 doi tuong trong nhom
                        
                        const group = {
                            members: members.members,
                            groupId: value.groupId,
                            image: arrImage,
                            groupName: members.groupName
                        }
                        arr.push(group)
                    }
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

//get groups api/group?groupId=&userId= (nhan)
module.exports.getGroupQuery = async (req, res) => {
    try {

        const { userId, groupId } = req.query
        if (!userId || !groupId) {
            return res.sendStatus(404)
        }
        const getGroup = await group.getGroupQuery(userId, groupId);
        // console.log(getGroup)
        if (!getGroup) { //refalsy
            return res.sendStatus(404)
        }
        const getGroupMembers = []
        const arrImage = {
            image1: "",
            image2: ""
        }
        const getMemberID = []
        const arr = []
        var ob = {}

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
                        ob = group
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
                        ob = group
                    }
                } else {

                    const members = await getMembers(value.groupId)
                    const group = {
                        groupId: value.groupId,
                        image: members.image,
                        groupName: members.groupName
                    }
                    arr.push(group)
                    ob = group

                }

            }
        }

        if (arr.length > 0) {
            res.status(200).json({
                data: ob
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

//lay thanh vien nien
module.exports.getMembersLimit = async (req, res) => {
    try {
        const receiverId = req.query.receiverId;
        let limit = req.query.limit ?? '100000000';
        let offset = req.query.position ?? '0';
        limit = parseInt(limit);
        offset = parseInt(offset);
        if (!receiverId) {
            return res.sendStatus(404)
        }
        const getMembersLimits = await group.getMembersLimit(receiverId, limit, offset)
        // console.log(getMembersLimits)
        const getIDAdmin = await group.getByGroupId(receiverId)
        const infoAdmin = await user.getUserId(getIDAdmin[0].AdminId)
        if (!getMembersLimits && !getIDAdmin && !infoAdmin) {
            return res.sendStatus(404)
        }
        const admin = {
            id: infoAdmin[0].id,
            image: infoAdmin[0].image,
            name: infoAdmin[0].lastName + ' ' + infoAdmin[0].firstName,
        }
        if (admin) {
            return res.status(200).json({
                message: 'Lay thanh vien thanh cong!',
                data: {
                    member: getMembersLimits,
                    admin: admin
                }
            })
        } else {
            return res.sendStatus(404)
        }

    } catch (err) {
        console.error(err)
        return res.sendStatus(500)
    }
}

module.exports.getGroupsById = async (req, res) => {
    try {
        const  {groupId} = req.params
        if(!groupId) {
            return res.sendStatus(404)
        }
        const userListInGroup = await group.getByGroupId(groupId)
        if(userListInGroup.length == 0) {
            return res.sendStatus(404)
        }

        let data =[];

        userListInGroup.forEach((value, idx)=> {
            data.push(value.userId)
        })

        return res.status(200).json({
            message: 'Danh sach Id nhom!',
            data
        })
    }catch(err) {
        console.error(err)
        return res.sendStatus(500)
    }
}