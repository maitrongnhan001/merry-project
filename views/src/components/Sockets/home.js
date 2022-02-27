import { sendSocket, listenSocketOneTime, listenSocket } from "./socket-config";

const login = async (data) => {
    sendSocket('user-login', data);
    const result = await listenSocketOneTime('user-login');
    return result;
}

const sendConnection = (userId) => {
    sendSocket('connection', {userId: userId});
}

const getConnection = (callback) => {
    listenSocket('connection', callback);
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
    getLogout
}