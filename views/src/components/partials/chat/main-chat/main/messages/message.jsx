import React, {useState} from 'react'
import './message.scss'

function Message({sender, next, children}) {
    /*----redux----*/
    //lay du lieu tu redux

    /*----states----*/
    //xac dinh bay to cam xuc
    const [emotion, setEmotion] = useState(0)    

    /*----styles----*/
    const styleContent = {
        backgroundColor: children.type === 'img' ? 'none' : sender === 0 ? '#5865F2' : '',
        color: sender === 0 ? 'white' : '',
        padding: children.type !== 'img' ? '.5rem 1.25rem' : '0',
        float: sender === 0 ? 'left' : 'right',
        position: children.type !== 'img'? '': 'absolute',
        left: sender === 0 ? '7%' : '65%',
        leftTime: sender === 0 ? '-35%' : '105%'
    }

    /*----handles----*/
    //xu ly bay to bieu tuong cam xuc
    const handleExpressEmotion = (e) => {
        setEmotion(emotion ? 0 : 1)
    }

    return (
        <div className="message-block" style={{justifyContent: sender === 0 ? 'flex-end' : 'flex-start'}}>
            {
                sender === 0 ? <div  className="message-block-distance"></div> : <div className="avatar">
                    {next === 0 ? '' : <img src="/img/me.jpg" alt="" />}
                </div>
            }
            <div className="message-content" style={{background: styleContent.backgroundColor, color: styleContent.color, padding: styleContent.padding}}>
                {children}
                <p className="message-content-time" style={{position: styleContent.position, left: styleContent.leftTime}}>7.30pm</p>
                <p className='message-content-emotion' onClick={handleExpressEmotion} style={{position: styleContent.position, left: styleContent.left, float: styleContent.float, color: emotion ? 'red ': ''}}><i className="fas fa-heart" style={{color: emotion ? 'red ': ''}}></i> 0</p>
            </div>
        </div>
    );
}

export default React.memo(Message)