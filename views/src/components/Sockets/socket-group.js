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

const getAddGroup = (callback) => {
    listenSocket('add-group', callback)
}

const getUpdateGroup = (callback) => {
    listenSocket('update-group', callback)
}

const getDeleteGroup = (callback) => {
    listenSocket('delete-group', callback)
}

const getAddMember = (callback) => {
    listenSocket('add-member', callback)
}

const getDeleteMember = (callback) => {
    listenSocket('delete-member', callback)
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