import React from 'react'
import './main.scss'
import Message from './messages/message'

function Main(props) {
    return (
        <div className="main-chat-chat-area">
            <div className="main-chat-chat-area-wrapper">
                <Message sender={0}>Ngu</Message>
                <Message sender={0}>Ngu</Message>                
                <Message sender={0}>Ngu</Message>
                <Message sender={0}>Ngu</Message>
                <Message next={0}>Hie</Message>
                <Message next={0}>alo</Message>
                <Message next={0}>co do hong</Message>
                <Message next={1}>ui</Message>
                <Message sender={0}>dau r dau r dau r dau r dau r dau r dau r dau r dau r dau r dau r dau r dau r dau r dau r dau r dau r dau r dau r dau r dau r dau r dau r dau r dau r dau r dau r dau r dau r dau r dau r dau r dau r dau r dau r dau r dau r dau r dau r </Message>
                <Message next={0}>doi hoi lau nha</Message>
                <Message next={0}>gion mat ha</Message>
                <Message next={0}>dam cai chet a</Message>
                <Message next={0}>alo</Message>
                <Message next={0}>alo</Message>
                <Message next={1}>ek</Message>
            </div>
        </div>
    );
}

export default Main;