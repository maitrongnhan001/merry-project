import React, { useState} from 'react';
import Picker from 'emoji-picker-react';
import './emoji.scss'

function Emoji(props) {
    const [chosenEmoji, setChosenEmoji] = useState(null);

    const onEmojiClick = (event, emojiObject) => {
      setChosenEmoji(emojiObject);
    };
  
    return (
      <div className="chat-emoji">
        {chosenEmoji ? (
          <p>{chosenEmoji.emoji}</p>
        ) : (
          <span>No emoji Chosen</span>
        )}
        <Picker onEmojiClick={onEmojiClick} />
      </div>
    );
}

export default Emoji;