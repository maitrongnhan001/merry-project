import React, {useState} from 'react'
import Picker from 'emoji-picker-react';
import './emoji.scss'
import {useDispatch} from 'react-redux'
import { saveEmoji } from '../../../../redux/actions/message'


function Emoji(props) {

    const dispatch = useDispatch()
    
    const [chosenEmoji, setChosenEmoji] = useState(null);

    const onEmojiClick = (event, emojiObject) => {
      setChosenEmoji(emojiObject);
      const data = saveEmoji(emojiObject.emoji)
      dispatch(data)
    };
  
    return (
      <div className="chat-emoji">
        <Picker onEmojiClick={onEmojiClick} />
      </div>
    );
}

export default Emoji