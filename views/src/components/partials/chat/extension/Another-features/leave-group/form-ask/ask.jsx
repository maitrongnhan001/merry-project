import React, { useEffect } from 'react'
import './ask.scss'
import { useSelector, useDispatch } from 'react-redux'
import { updateNotification } from '../../../../../../../redux/actions/notification'
import { showFormFeatureExtension } from '../../../../../../../redux/actions/extension'
import { sendDeleteMember } from '../../../../../../Sockets/socket-group'
import $ from 'jquery'


function Ask() {

    /*----localstorage----*/
    const userId = parseInt(localStorage.getItem('userId'));

    /*----redux----*/
    //lay du lieu tu redux
    const idChat = useSelector(state => state.groups.leaveGroup);

    //ket noi voi redux
    const dispatch = useDispatch()
    
    /*----handles----*/

    //xu ly an form tao nhom
    const handleClickToHideCreateGroup = (e) =>{
        e.stopPropagation()
        const isDisplay = showFormFeatureExtension(0)
        dispatch(isDisplay)
    }

    //xu ly submits form
    const handleSubmit = async (e) => {
        e.preventDefault()
        
        //check is group
        if (!idChat || idChat.indexOf('G') !== 0 ) return
        
        //check userId
        if (!userId) return;
        
        //submit data
        const dataOutGroup = {
            groupId: idChat,
            memberId: userId
        }
        console.log(dataOutGroup);
        await sendDeleteMember(dataOutGroup)

        //set notification
        const notification = updateNotification('Rời nhóm thành công');
        dispatch(notification);

        //hide form
        const isDisplay = showFormFeatureExtension(0)
        dispatch(isDisplay)
    }

    //------------------life cycle-----------------------//
    useEffect(()=>{
        $('.create-group-form-action').fadeTo('.5s', 1)

        return () => {}
    })

    return (
        <div className="out-group-form-wrapper" onClick={handleClickToHideCreateGroup}>
            <form className="out-group-form-action" onSubmit={handleSubmit}>
                <div className="out-group-form" onClick={(e)=>e.stopPropagation()}>
                    <p className="out-group-form-title">
                        <i className="fas fa-times" onClick={handleClickToHideCreateGroup}></i>
                    </p>
                    <p className='text-ask'>Bạn có chắc chắn muốn rời nhóm?</p>
                    <div className="out-group-form-submit">
                        <input type="button" className="out-group-form-submit-btn out-group-form-submit-btn-1" value="Hủy bỏ" onClick={handleClickToHideCreateGroup}/>
                        <input type="submit"  className="out-group-form-submit-btn out-group-form-submit-btn-2" value="Rời nhóm" />
                    </div>
                </div>
            </form>
            
        </div>
    );
}

export default Ask;