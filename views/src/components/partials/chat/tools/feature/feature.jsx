import React, { useEffect, useRef } from 'react'
import './feature.scss'
import $ from 'jquery'
import { useDispatch, useSelector } from 'react-redux'
import { showFriendProfile } from '../../../../../redux/actions/friends'
import { showDialog, showFeature } from '../../../../../redux/actions/taskbar'

function Feature({children, offset, group}) {

    /*----redux----*/
    //lay du lieu tu redux
    const feature = useSelector(state => state.taskbar.feature)
    
    //ket noi den redux
    const dispatch = useDispatch()

    /*----refs----*/
    const ref = useRef(null)
    
    if(ref.current != null) {
        ref.current.style.display = 'none'
    }

    /*----handles----*/
    //xu ly hien thi form thong tin ca nhan 
    const handleClickToShowProfile = ()=> {
        const updateFeature = showFeature({...feature, isShow: 0}) 
        dispatch(updateFeature)
        const show = showDialog(3)
        dispatch(show)
        const display = showFriendProfile(1)
        dispatch(display)
    }

    /*----lifecycle ----*/
    useEffect(()=>{
        $('.tab-item-feature').slideDown('fast')
    })
    

    return (
        <div ref={ref} className="tab-friend-feature-item-show tab-item-feature" style={{top: offset.top, left: offset.left + 25}}>
            {
               !group ? <p className="tab-friend-feature-item-show tab-item-feature-elm tab-item-feature-elm-1" onClick={handleClickToShowProfile}>Xem thông tin</p> : ''
            }
            <p className="tab-friend-feature-item-show tab-item-feature-elm tab-item-feature-elm-2">{children}</p>
        </div>
    )
}

export default Feature