import React from 'react'
import './toolbar-chat.scss'

function ToolbarChat(props) {
    return (
        <div className="main-chat-toolbar">
            <i className="fas fa-grin-stars" title="Gửi biểu tượng cảm xúc"></i>
            <i className="fas fa-photo-video" title="Gửi tệp đa phương tiện"></i>
            <i className="fas fa-paperclip" title="Gửi tệp"></i>
        </div>
    );
}

export default ToolbarChat;