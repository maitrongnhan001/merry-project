import React, {useState} from 'react'
import './message.scss'

function Message(props) {

    const [sender ] = useState(props.sender)
    const [next] = useState(props.next)


    const styleContent = {
        backgroundColor: props.children.type === 'img' ? 'none' : sender === 0 ? '#5865F2' : '',
        color: sender === 0 ? 'white' : '',
        padding: props.children.type !== 'img' ? '.5rem 1.25rem' : '0',
        translate : props.children.type !== 'img' ? '0, 0' : sender === 0 ? '.5rem, -3.5rem' : '-.5rem, -3.5rem',
        float: sender === 0 ? 'left' : 'right'

    }

    return (
        <div className="message-block" style={{justifyContent: sender === 0 ? 'flex-end' : 'flex-start'}}>
            {
                sender === 0 ? '':   <div className="avatar">
                    {next === 0 ? '' : <img src="/img/me.jpg" alt="" />}
                </div>
            }
            
            <div className="message-content" style={{background: styleContent.backgroundColor, color: styleContent.color, padding: styleContent.padding}}>
                {props.children}
                <p className="message-content-time">7.30pm</p>
                <p className='message-content-emotion' style={{transform: `translate(${styleContent.translate})`, float: styleContent.float}}>o 10</p>
            </div>
        </div>
    );
}

export default React.memo(Message)