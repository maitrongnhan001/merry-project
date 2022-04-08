import { sendSocket, listenSocketOneTime, listenSocket } from "./socket-config";

const login = async (data) => {
    sendSocket('user-login', data);
    const result = await listenSocketOneTime('user-login');
    return result;
}

const sendConnection = (userId) => {
    sendSocket('user-connection', {userId: userId});
}

const getConnection = (callback) => {
    listenSocket('user-connection', callback);
}

const sendUpdateProfile = (data) => {
    sendSocket('update-profile', data);
}

const getUpdateProfile = (callback) => {
    listenSocket('update-profile', callback);
}

const sendLogout = (userId) => {
    sendSocket('logout', {userId: userId})
}

const getLogout = (callback) => {
    listenSocket('logout', callback);
}

export {
    login,
    sendConnection,
    getConnection,
    sendLogout,
    getLogout,
    getUpdateProfile,
    sendUpdateProfile
}