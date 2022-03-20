
module.exports.call  = (data, socket, io) =>{
    try {
        const { senderId, receiverId, type } = data
        if(!senderId || !receiverId || !type) 
            return socket.emit('call', {msg: 'Không nhận được dữ liệu', status: 404})
        return socket.to(receiverId).emit('call', data)
    }catch(err) {
        console.error(err)
        socket.emit('call', {msg: 'Lỗi server.'})
    }
    
}

module.exports.callUp = (data, socket, io) => {
    try{
        const { senderId, receiverId, type } = data
        if(!senderId || !receiverId || !type) 
            return socket.emit('call-up', {msg: 'Không nhận được dữ liệu', status: 404})
        return socket.to(receiverId).emit('call-up', data)
    }catch(err){
        console.error(err)
        socket.emit('call-up', {msg: 'Lỗi server.'})
    }
}

module.exports.callDown = (data, socket, io) => {
    try{
        const { senderId, receiverId, type } = data
        if(!senderId || !receiverId || !type) 
            return socket.emit('call-down', {msg: 'Không nhận được dữ liệu', status: 404})
        return socket.to(receiverId).emit('call-down', data)
    }catch(err){
        console.error(err)
        socket.emit('call-down', {msg: 'Lỗi server.'})
    }
}