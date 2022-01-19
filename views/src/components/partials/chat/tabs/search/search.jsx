import React from 'react'
import './search.scss'
import { useDispatch } from 'react-redux'
import { showDialog } from '../../../../../redux/actions/taskbar'

function Search(props) {

    //redux
    const dispatch = useDispatch()

    //handle
    const handleClickToShowAddedFriend = ()=> {
        const isDisplay = showDialog(1)
        dispatch(isDisplay) 
    }

    const handleClickToShowCreateGroup = ()=> {
        const isDisplay = showDialog(2)
        dispatch(isDisplay) 
    }

    return (
        <div className="tab-tools">
            <div className="tab-search-box">
                <input type="text" placeholder="Tìm kiếm"/>
                <i className="fas fa-search"></i>
            </div>
            <div className="tab-add-items">
                <i className="fas fa-user-plus" onClick={handleClickToShowAddedFriend}></i>
                <i className="fas fa-plus-circle" onClick={handleClickToShowCreateGroup}></i>
            </div>
        </div>
    );
}

export default React.memo(Search)