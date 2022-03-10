import React from 'react'
import { urlUserAvatar } from '../../../../../APIs/ConnectAPI';
import './message.scss'

function Message({sender, next, children, date, image, name, id}) {
    /*----redux----*/
    //lay du lieu tu redux

    /*----states----*/ 

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

    return (
        <div className="message-block" style={{justifyContent: sender === 0 ? 'flex-end' : 'flex-start'}}>
            {
                sender === 0 ? <div  className="message-block-distance"></div> : <div className="avatar">
                    {next === 0 ? '' : <img src={urlUserAvatar + image} alt="" />}
                </div>
            }
            <div className="message-content" style={{background: styleContent.backgroundColor, color: styleContent.color, padding: styleContent.padding}}>
                {sender !== 0 && id.indexOf('G') === 0 && next !== 0? <p className="message-content-name" style={{fontSize: '.8rem', color: '#afbace', height: '1.25rem'}}>{name}</p> : ''}
                {children}
                <p className="message-content-time" style={{position: styleContent.position, left: styleContent.leftTime}}>{date}</p>
            </div>
        </div>
    );
}

export default Message