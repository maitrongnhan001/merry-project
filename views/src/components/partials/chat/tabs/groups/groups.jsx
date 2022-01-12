import React from 'react'
import  {useSelector} from 'react-redux'
import Item from '../friend-group-items/item'

function Groups(props) {

    //redux
    const groupsList = useSelector(state => state.groups.groupsList)

    const items = groupsList.map((value, idx)=>{
        const name = value.name ? value.name : `${value.members[0].lastName} ${value.members[0].firstName}, 
                                                ${value.members[1].lastName} ${value.members[1].firstName}, 
                                                ... `
        return (
             <Item key={idx} image={value.image} name={name}></Item>
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