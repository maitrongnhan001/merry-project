const userIsLogin = require('../stores/UserLoginStore');
const group = require('../models/group.model');
const detailGroup = require('../models/detailGroup.model');
const user = require('../models/user.model');
const fs = require('fs');
const path = require('path');

module.exports.addGroup = async (data, socket, io) => {
    //thong bao toi cac nguoi dung trong nhom, co mot nhom vua tao
    try {
        //kiem tra du lieu
        if (!(data.members)) {
            socket.emit('add-group-error', { msg: 'Lỗi, không đính kèm dữ liệu' });
            return;
        }

        //lay du lieu
        var groupName = (data.groupName) ? data.groupName : '';
        const members = data.members;

        //lay admin id
        const AdminId = await userIsLogin.getUserId(socket);

        //luu thong tin group vao bang group
        if (members.length > 2) {
            //random id
            var groupId = `G${(new Date()).getTime()}`;

            //them mot chat group
            var groupObj = {
                id: groupId,
                groupName: groupName,
                AdminId: AdminId
            }
        } else {
            //kiem tra group co ton tai chua
            if (!(await detailGroup.checkSingleGroup(members[0], members[1]))) {
                //random id
                var groupId = `U${(new Date()).getTime()}`;

                //them mot chat thuong
                var groupObj = {
                    id: groupId,
                    groupName: ''
                }
            } else {
                socket.emit('add-group-error', { msg: 'Lỗi, chat này đã tồn tại' });
                return;
            }
        }

        const dataGroup = await group.create(groupObj);

        //luu thong tin member vao bang detailgroup
        for (let i = 0; i < members.length; i++) {
            const detailObj = {
                groupId: groupId,
                userId: members[i]
            }
            await detailGroup.create(detailObj);
        }

        //create room
        //lay tat ca user trong room
        const listMembers = await detailGroup.getMembers(groupId, 10000, 0);

        //join all member to room
        await listMembers.forEach(async (Element) => {
            const userId = Element.userId;
            const userSocket = await userIsLogin.getUserSocket(userId);

            if (userSocket) {
                userSocket.join(`${groupId}`);
            }
        });

        //tra du lieu ve cho client
        if (members.length > 2) {
            if (!groupName) {
                //lay ten chat nhom
                //lay hinh anh nhom
                for (let i = 0; i < members.length; i++) {
                    if (members[i] != AdminId) {
                        const dataUser1 = await user.get(AdminId);
                        const dataUser2 = await user.get(members[i]);
                        groupName = `${dataUser1[0].firstName}, ${dataUser2[0].firstName}, ...`;
                        var img1 = dataUser1[0].image;
                        var img2 = dataUser2[0].image;
                        i = members.length;
                    }
                }
            }
        } else {
            //lay ten chat thuong
            //lay hinh anh chat
            for (let i = 0; i < members.length; i++) {
                if (members[i] !== AdminId) {
                    const dataUser = await user.get(members[i]);
                    groupName = `${dataUser[0].lastName} ${dataUser[0].firstName}`;
                    var img1 = dataUser[0].image;
                    var img2 = null;
                    i = members.length;
                }
            }
        }

        const returnData = {
            groupId: groupId,
            groupName: groupName,
            members: members,
            image: {
                img1: img1,
                img2: img2
            }
        }

        io.to(`${groupId}`).emit('add-group', returnData);
    } catch (err) {
        socket.emit('add-group-error', { msg: 'Lỗi, xữ lý dữ liệu không thành công' });
        console.error(err);
    }
}

module.exports.updateGroup = async (data, socket, io) => {
    //thong bao toi cac nguoi dung trong nhom, vua cap nhat nhom
    try {
        //kiem tra du lieu
        if (!(data.groupId && (data.groupName || (data.image.fileName && data.image.file)))) {
            socket.emit('update-group-error', { msg: 'Lỗi, không đính kèm dữ liệu' });
            return;
        }

        //lay du lieu
        const groupId = data.groupId;
        let updateGroupObj = {};
        if (data.groupName) updateGroupObj.groupName = data.groupName;

        //random ten anh
        if (data.image) {
            const fileName = data.image.fileName;
            const fileNameArr = fileName.split('.');
            const extension = fileNameArr.pop();
            const imageName = `group-${(new Date()).getTime()}.${extension}`;
            updateGroupObj.image = imageName;

            //luu hinh anh vao server
            fs.writeFile(path.resolve(__dirname, '../public/avatarGroup/', updateGroupObj.image), data.image.file, (error) => {
                if (error) {
                    socket.emit('update-group-error', { msg: 'Lỗi, xữ lý dữ liệu không thành công' });
                    console.error(error);
                }
            });
        }

        //luu du lieu vao table group
        await group.update(updateGroupObj, groupId);

        //lay tat ca user trong room
        const listMembers = await detailGroup.getMembers(groupId, 10000, 0);

        //join all member to room
        await listMembers.forEach(async (Element) => {
            const userId = Element.userId;
            const userSocket = await userIsLogin.getUserSocket(userId);

            if (userSocket) {
                userSocket.join(`${groupId}`);
            }
        });

        //tra du lieu ve cho client
        const returnData = {
            groupId: groupId,
            groupName: (updateGroupObj.groupName) ? updateGroupObj.groupName : null,
            image: (updateGroupObj.image) ? { img1: updateGroupObj.image, img2: null } : null
        }

        io.to(`${groupId}`).emit('update-group', returnData);
    } catch (err) {
        socket.emit('update-group-error', { msg: 'Lỗi, xữ lý dữ liệu không thành công' });
        console.error(err);
    }
}

module.exports.deleteGroup = async (data, socket, io) => {
    //thong bao toi cac nguoi dung trong nhom, vua xoa nhom
    try {
        //kiem tra du lieu
        if (!data.groupId) {
            socket.emit('delete-group-error', { msg: 'Lỗi, không đính kèm dữ liệu' });
            return;
        }
        //lay du lieu
        const groupId = data.groupId;

        //lay tat ca user trong room
        const listMembers = await detailGroup.getMembers(groupId, 10000, 0);

        //xoa du lieu trong bang detail group
        await detailGroup.deleteByGroupId(groupId);

        //xoa hinh anh group
        const image = (await group.get(groupId))[0].image;
        console.log(image);
        if (image) {
            fs.unlink(path.resolve(__dirname, '../public/avatarGroup/', image), (error) => {
                if (error) {
                    socket.emit('update-group-error', { msg: 'Lỗi, xữ lý dữ liệu không thành công' });
                    console.error(error);
                }
            });
        }

        //xoa du lieu trong bang group
        await group.delete(groupId);

        //join all member to room
        await listMembers.forEach(async (Element) => {
            const userId = Element.userId;
            const userSocket = await userIsLogin.getUserSocket(userId);

            if (userSocket) {
                userSocket.join(`${groupId}`);
            }
        });

        //tra du lieu ve cho client
        const returnData = {
            groupId: groupId
        }
        io.to(`${groupId}`).emit('delete-group', returnData);
    } catch (err) {
        socket.emit('delete-group-error', { msg: 'Lỗi, xữ lý dữ liệu không thành công' });
        console.error(err);
    }
}

module.exports.addMember = async (data, socket, io) => {
    //thong bao toi cac nguoi dung trong nhom, chao don thanh vien moi
    try {
        //kiem tra du lieu
        if (!(data.groupId && data.member && (data.member.length > 0))) {
            socket.emit('add-member-error', { msg: 'Lỗi, không đính kèm dữ liệu' });
            return;
        }

        //lay du lieu
        const groupId = data.groupId;
        const member = data.member;

        //luu du lieu vao table detail group
        let listDetailGroups = [];
        for (let i = 0; i < member.length; i++) {
            if (member[i]) {
                const detailGroupObj = [
                    groupId,
                    member[i]
                ]
                listDetailGroups.push(detailGroupObj);
            }
        }
        console.log(listDetailGroups);
        await detailGroup.create(listDetailGroups);

        //tra du lieu cho client
        //lay tat ca user trong room
        const listMembers = await detailGroup.getMembers(groupId, 10000, 0);

        //join all member to room
        await listMembers.forEach(async (Element) => {
            const userId = Element.userId;
            const userSocket = await userIsLogin.getUserSocket(userId);

            if (userSocket) {
                userSocket.join(`${groupId}`);
            }
        });

        //tra du lieu ve cho client
        const returnData = {
            groupId: groupId,
            member: member
        }
        io.to(`${groupId}`).emit('add-member', returnData);
    } catch (err) {
        socket.emit('add-member-error', { msg: 'Lỗi, xữ lý dữ liệu không thành công' });
        console.error(err);
    }
}

module.exports.deleteMember = (data, socket, io) => {
    //thong bao toi cac nguoi dung trong nhom, vua xoa thanh vien
}