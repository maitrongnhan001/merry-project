import React from 'react'
import Item from '../friend-group-items/item'
import  {useSelector} from 'react-redux'

function Friends(props) {
    //redux

    const friendsList = useSelector(state => state.friends.friendsList)
    

    const items = friendsList.map((value, idx)=>{
        const name = `${value.firstName} ${value.lastName}`
        return (
             <Item key={idx} id={value.id} image={value.image} name={name}></Item>
        )
    })

    return (
        <div className='tab-friend'>
            {
                items    
            }
        </div>
    );
}

export default Friends