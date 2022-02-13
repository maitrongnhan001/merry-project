import { sendSocket, listenSocket } from "./socket-config";

const login = async (data) => {
    sendSocket('user-login', data);
    const result = await listenSocket('user-login');
    return result;
}

export {
    login
}