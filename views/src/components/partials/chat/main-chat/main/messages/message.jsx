import React, {useState} from 'react'
import './message.scss'

function Message(props) {

    const [sender ] = useState(props.sender)
    const [next] = useState(props.next)
    const [emotion, setEmotion] = useState(0)

    const styleContent = {
        backgroundColor: props.children.type === 'img' ? 'none' : sender === 0 ? '#5865F2' : '',
        color: sender === 0 ? 'white' : '',
        padding: props.children.type !== 'img' ? '.5rem 1.25rem' : '0',
        float: sender === 0 ? 'left' : 'right',
        position: props.children.type !== 'img'? '': 'absolute',
        left: sender === 0 ? '7%' : '65%',
        leftTime: sender === 0 ? '-35%' : '105%'
    }

    const handleExpressEmotion = (e) => {
        setEmotion(emotion ? 0 : 1)
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
                <p className="message-content-time" style={{position: styleContent.position, left: styleContent.leftTime}}>7.30pm</p>
                <p className='message-content-emotion' onClick={handleExpressEmotion} style={{position: styleContent.position, left: styleContent.left, float: styleContent.float, color: emotion ? 'red ': ''}}><i className="fas fa-heart" style={{color: emotion ? 'red ': ''}}></i> 10</p>
            </div>
        </div>
    );
}

export default React.memo(Message)