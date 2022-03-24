import React, { useEffect, useState } from 'react'
import './tab.scss'
import { useDispatch, useSelector } from 'react-redux'
import { showFeature } from '../../../../redux/actions/taskbar'
import $ from 'jquery'
import ChatTab from './chats/Chats'
import FriendsTab from '../tabs/friends/friends'
import GroupsTab from '../tabs/groups/groups'
import Search  from './search/search'
import SearchLayout from './search-layout/search-layout'

function Tab() {
    /*----redux----*/
    //lay du lieu tu redux
    const state = useSelector(state => state.taskbar.data)
    const feature = useSelector(state => state.taskbar.feature)
    const [searchData, setSearchData] = useState([])

    //ket noi den redux
    const dispatch = useDispatch()

    const handleSearch = (value)=> {
        setSearchData(value)
    }

    /*----lifecycle----*/
    useEffect(()=>{
        $('.tab-main').scrollTop(0)
        $('.tab-main').scroll(()=>{
            const display = showFeature({...feature, isShow: 0})
            dispatch(display)
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state])

    return (
        <div className='tab-wrapper' id="tab-wrapper">
            <Search onSearch={handleSearch}></Search>
            <div className="tab-main">
                {state === 0 ? <ChatTab></ChatTab>: 
                 state === 1 ? <FriendsTab></FriendsTab> : 
                 state === 2 ? <GroupsTab></GroupsTab> : <SearchLayout data={searchData}></SearchLayout>}
            </div>
        </div>
    );
}

export default React.memo(Tab)

