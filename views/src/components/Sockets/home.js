import { sendSocket, listenSocket } from "./socket-config";

const login = async (data) => {
    sendSocket('user-login', data);
    const result = await listenSocket('user-login');
    return result;
}

const sendConnection = async (userId) => {
    sendSocket('connection', {userId})
    const result = await listenSocket('connection')
    return result;
}

const getConnection = async () => {
    const result = await listenSocket('connection')
    return result;
}

const getLogout = async()=> {
    return await listenSocket('logout')
} 

const sendLogout = (data)=> {
    sendSocket('logout', data);
}

export {
    login,
    getConnection,
    getLogout,
    sendLogout, 
    sendConnection
}