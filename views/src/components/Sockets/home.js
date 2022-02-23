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

export {
    login,
    sendConnection,
    getConnection
}