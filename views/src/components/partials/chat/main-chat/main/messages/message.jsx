import React, {useState} from 'react'
import './message.scss'

function Message(props) {

    const [sender ] = useState(props.sender)
    const [next] = useState(props.next)


    const styleContent = {
        backgroundColor: sender === 0 ? '#5865F2' : '',
        color: sender === 0 ? 'white' : '',
    }

    return (
        <div className="message-block" style={{justifyContent: sender === 0 ? 'flex-end' : 'flex-start'}}>
            {
                sender === 0 ? '':   <div className="avatar">
                    {next === 0 ? '' : <img src="/img/me.jpg" alt="" />}
                </div>
            }
            
            <div className="message-content" style={{backgroundColor: styleContent.backgroundColor}}>
                <p className="massage-text" style={{color: styleContent.color}}>{props.children}
                </p>
                <p className='message-emotion'></p>
            </div>
        </div>
    );
}

export default Message;