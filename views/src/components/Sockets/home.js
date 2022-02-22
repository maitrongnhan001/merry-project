import { sendSocket, listenSocket } from "./socket-config";

const login = async (data) => {
    sendSocket('user-login', data);
    const result = await listenSocket('user-login');
    return result;
}

const getLogin = async () => {
    const result = await listenSocket('user-login')
    return result;
}

const getLogout = async()=> {
    return await listenSocket('logout')
} 

const sendLogout = async(data)=> {
    sendSocket('logout', data);
}

export {
    login,
    getLogin,
    getLogout,
    sendLogout
}