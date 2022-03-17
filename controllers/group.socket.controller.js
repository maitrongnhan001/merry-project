const userIsLogin = require('../stores/UserLoginStore');
const group = require('../models/group.model');
const detailGroup = require('../models/detailGroup.model');
const user = require('../models/user.model');
const fs = require('fs');
const path = require('path');
const chat = require('../models/chat.model');
const media = require('../models/mediaMessage.model');
const document = require('../models/document.model');

module.exports.addGroup = async (data, socket, io) => {
    //thong bao toi cac nguoi dung trong nhom, co mot nhom vua tao
    try {
        //kiem tra du lieu
        if (!(data.members)) {
            socket.emit('add-group', { msg: 'Lỗi, không đính kèm dữ liệu' });
            return;
        }
        //lay du lieu
        var groupName = (data.groupName) ? data.groupName : '';
        const members = data.members.map(Element => {
            return parseInt(Element);
        });

        const imageGroup = (data.image) ? data.image : null;

        //lay admin id
        const AdminId = await userIsLogin.getUserId(socket);

        //luu thong tin group vao bang group
        if (members.length > 2) {
            //random id
            var groupId = `G${(new Date()).getTime()}`;

            //xu ly hinh anh
            if (imageGroup) {
                const fileName = imageGroup.fileName;
                const fileNameArr = fileName.split('.');
                const extension = fileNameArr.pop();
                var imageName = `group-${(new Date()).getTime()}.${extension}`;

                //luu hinh anh vao server
                fs.writeFile(path.resolve(__dirname, '../public/avatarUser/', imageName), imageGroup.file, (error) => {
                    if (error) {
                        socket.emit('add-group', { msg: 'Lỗi, xữ lý dữ liệu không thành công' });
                        console.error(error);
                    }
                });
            }

            //them mot chat group
            var groupObj = {
                id: groupId,
                groupName: groupName,
                AdminId: AdminId,
                image: imageName
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
                socket.emit('add-group', { msg: 'Lỗi, chat này đã tồn tại' });
                return;
            }
        }

        const dataGroup = await group.create(groupObj);

        //luu thong tin member vao bang detailgroup
        let listDetailGroups = [];
        for (let i = 0; i < members.length; i++) {
            if (members[i]) {
                const detailGroupObj = [
                    groupId,
                    members[i]
                ]
                listDetailGroups.push(detailGroupObj);
            }
        }
        await detailGroup.create(listDetailGroups);

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
            //lay ten chat nhom
            //lay hinh anh nhom
            if (!imageName) {
                //neu tao nhom ma khong co hinh anh thi lay anh
                for (let i = 0; i < members.length; i++) {
                    if (members[i] != AdminId) {
                        const dataUser1 = await user.get(AdminId);
                        const dataUser2 = await user.get(members[i]);
                        groupName = groupName ? groupName : `${dataUser1[0].firstName}, ${dataUser2[0].firstName}, ...`;
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
            image: imageName ? {
                image1: imageName,
                image2: ''
            } : {
                image1: img1,
                image2: img2
            }
        }

        console.log(returnData);

        io.to(`${groupId}`).emit('add-group', returnData);
    } catch (err) {
        socket.emit('add-group', { msg: 'Lỗi, xữ lý dữ liệu không thành công' });
        console.error(err);
    }
}

module.exports.updateGroup = async (data, socket, io) => {
    try {
        //kiem tra du lieu
        if (!(data.groupId && (data.groupName || (data.image.fileName && data.image.file)))) {
            socket.emit('update-group', { msg: 'Lỗi, không đính kèm dữ liệu' });
            return;
        }

        //lay du lieu
        const groupId = data.groupId;
        let updateGroupObj = {};
        if (data.groupName) updateGroupObj.groupName = data.groupName;

        //random ten anh
        if (data.image) {
            //kiem tra hinh anh da luu truoc do, neu anh ton tai thi xoa
            let getImage = (await group.get(groupId))[0].image;
            if (getImage) {
                fs.unlink(path.resolve(__dirname, '../public/avatarUser/', getImage), (error) => {
                    if (error) {
                        socket.emit('update-group', { msg: 'Lỗi, xữ lý dữ liệu không thành công' });
                        console.error(error);
                    }
                });
            }

            const fileName = data.image.fileName;
            const fileNameArr = fileName.split('.');
            const extension = fileNameArr.pop();
            const imageName = `group-${(new Date()).getTime()}.${extension}`;
            updateGroupObj.image = imageName;

            //luu hinh anh vao server
            fs.writeFile(path.resolve(__dirname, '../public/avatarUser/', updateGroupObj.image), data.image.file, (error) => {
                if (error) {
                    socket.emit('update-group', { msg: 'Lỗi, xữ lý dữ liệu không thành công' });
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

        //lay ten group
        if (!updateGroupObj.groupName) {
            let groupName = (await group.get(groupId))[0].groupName;
            if (groupName.length == 0) {
                const getNameFromMembers = await detailGroup.getUserByGroupId(groupId, 2, 0);
                groupName = `${getNameFromMembers[0].firstName}, ${getNameFromMembers[1].firstName}, ...`;
            }
            updateGroupObj.groupName = groupName;
        }

        let image = {};
        //lay anh dai dien group
        if (!updateGroupObj.image) {
            let getImage = (await group.get(groupId))[0].image;
            if (!image) {
                const getImageFromMembers = await detailGroup.getUserByGroupId(groupId, 2, 0);
                image = {
                    img1: getImageFromMembers[0].image,
                    img2: getImageFromMembers[1].image
                }
            } else {
                image = {
                    img1: getImage,
                    img2: ''
                }
            }
        } else {
            image = {
                img1: updateGroupObj.image,
                img2: ''
            }
        }

        //tra du lieu ve cho client
        const returnData = {
            groupId: groupId,
            groupName: updateGroupObj.groupName,
            image: image
        }
        console.log(returnData);

        io.to(`${groupId}`).emit('update-group', returnData);
    } catch (err) {
        socket.emit('update-group', { msg: 'Lỗi, xữ lý dữ liệu không thành công' });
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

        //xoa tin nhan va cac file lien quan
        //xoa file va media lien quan
        const listMedias = await media.get(groupId, 100000, 0);
        if (listMedias) {
            listMedias.forEach(Element => {
                fs.unlink(path.resolve(__dirname, '../public/Medias/', Element.content), (error) => {
                    if (error) {
                        socket.emit('delete-member', { msg: 'Lỗi, xữ lý dữ liệu không thành công' });
                        console.error(error);
                    }
                });
            });
        }
        const listDocuments = await document.get(groupId, 100000, 0);
        if (listDocuments) {
            listDocuments.forEach(Element => {
                fs.unlink(path.resolve(__dirname, '../public/Documents/', Element.content), (error) => {
                    if (error) {
                        socket.emit('delete-member', { msg: 'Lỗi, xữ lý dữ liệu không thành công' });
                        console.error(error);
                    }
                });
            });
        }

        //xoa du lieu bang message
        await chat.deleteChat(groupId);

        //xoa du lieu trong bang detail group
        await detailGroup.deleteByGroupId(groupId);

        //xoa hinh anh group
        const image = (await group.get(groupId))[0].image;
        if (image) {
            fs.unlink(path.resolve(__dirname, '../public/avatarGroup/', image), (error) => {
                if (error) {
                    socket.emit('delete-group-error', { msg: 'Lỗi, xữ lý dữ liệu không thành công' });
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
            groupId: groupId,
            isAdmin: true
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
        if (!(data.groupId && data.members && (data.members.length > 0))) {
            socket.emit('add-member-error', { msg: 'Lỗi, không đính kèm dữ liệu' });
            return;
        }

        //lay du lieu
        const groupId = data.groupId;
        const members = data.members;

        //mang danh sach thanh vien nhom vua duoc them moi
        let ResultMemebers = [];

        //luu du lieu vao table detail group
        let listDetailGroups = [];
        for (let i = 0; i < members.length; i++) {
            if (members[i]) {
                const detailGroupObj = [
                    groupId,
                    members[i]
                ]
                listDetailGroups.push(detailGroupObj);

                //cai dat du lieu tra ve cho client
                const ResultMember = await user.get(members[i]);
                ResultMemebers.push({
                    id: ResultMember[0].id,
                    name: `${ResultMember[0].lastName} ${ResultMember[0].firstName}`,
                    image: ResultMember[0].image
                });
            }
        }
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
            members: ResultMemebers
        }
        io.to(`${groupId}`).emit('add-member', returnData);
    } catch (err) {
        socket.emit('add-member-error', { msg: 'Lỗi, xữ lý dữ liệu không thành công' });
        console.error(err);
    }
}

module.exports.deleteMember = async (data, socket, io) => {
    //thong bao toi cac nguoi dung trong nhom, vua xoa thanh vien
    try {
        //kiem tra du lieu
        if (!(data.groupId && data.memberId)) {
            socket.emit('delete-member', { msg: 'Lỗi, không đính kèm dữ liệu' });
            return;
        }

        //lay du lieu
        const groupId = data.groupId;
        const memberId = data.memberId;

        //lay tat ca user trong room
        const listMembers = await detailGroup.getMembers(groupId, 10000, 0);

        //kiem tra co phai truong nhom khong
        const idAdmin = await group.getAdminId(groupId);
        if (idAdmin[0].AdminId === memberId) {
            //xoa file va media lien quan
            const listMedias = await media.get(groupId, 100000, 0);
            if (listMedias) {
                listMedias.forEach(Element => {
                    fs.unlink(path.resolve(__dirname, '../public/Medias/', Element.content), (error) => {
                        if (error) {
                            socket.emit('delete-member', { msg: 'Lỗi, xữ lý dữ liệu không thành công' });
                            console.error(error);
                        }
                    });
                });
            }
            const listDocuments = await document.get(groupId, 100000, 0);
            if (listDocuments) {
                listDocuments.forEach(Element => {
                    fs.unlink(path.resolve(__dirname, '../public/Documents/', Element.content), (error) => {
                        if (error) {
                            socket.emit('delete-member', { msg: 'Lỗi, xữ lý dữ liệu không thành công' });
                            console.error(error);
                        }
                    });
                });
            }

            //xoa du lieu bang message
            await chat.deleteChat(groupId);

            //xoa du lieu bang detail
            await detailGroup.deleteByGroupId(groupId);

            //xoa group
            await group.delete(groupId);

            //tra du lieu ve cho client
            const returnData = {
                groupId: groupId,
                memberId: memberId,
                isAdmin: true
            }
            return io.to(`${groupId}`).emit('delete-member', returnData);
        }

        //luu du lieu vao table detail group
        await detailGroup.deleteByUserId(groupId, memberId);

        //tra du lieu cho client

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
            memberId: memberId
        }
        io.to(`${groupId}`).emit('delete-member', returnData);
    } catch (err) {
        socket.emit('delete-member-error', { msg: 'Lỗi, xữ lý dữ liệu không thành công' });
        console.error(err);
    }
}