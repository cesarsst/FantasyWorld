module.exports.emitError = (msg, socket)=>{

    socket.emit('msgErro', {msg: msg});


}