import { sendSocket, listenSocket } from './socket-config'

const sendAddGroup = (data) => {
    sendSocket('add-group', data)
}

const sendUpdateGroup = (data) => {
    sendSocket('update-group', data)
}

const sendDeleteGroup = (data) => {
    sendSocket('delete-group', data)
}

const sendAddMember = (data) => {
    sendSocket('add-member', data)
}

const sendDeleteMember = (data) => {
    sendSocket('delete-member', data)
}

const getAddGroup = async (cb)=> {
     listenSocket('add-group', cb)
}

const getUpdateGroup = async ()=> {
    return await listenSocket('update-group')
}

const getDeleteGroup = async ()=> {
    return await listenSocket('delete-group')
}

const getAddMember = async ()=> {
    return await listenSocket('add-member')
}

const getDeleteMember = async ()=> {
    return await listenSocket('delete-member')
}

export {
    sendAddGroup,
    sendDeleteGroup,
    sendUpdateGroup,
    sendAddMember,
    sendDeleteMember,
    getAddGroup,
    getUpdateGroup,
    getDeleteGroup,
    getAddMember,
    getDeleteMember
}