import React from 'react'
import  {useSelector} from 'react-redux'
import Item from '../friend-group-items/item'

function Groups() {

    /*----redux----*/
    //lay du lieu tu redux
    const groupsList = useSelector(state => state.groups.groupsList)

    /*----data----*/
    const items = groupsList.map((value, idx)=>{
        return (
             <Item key={idx} id={value.groupId} image={value.image} name={value.groupName}></Item>
        )
    })

    return (
        <div className="groups-tab">
            {
                items
            }
        </div>
    );
}

export default Groups;