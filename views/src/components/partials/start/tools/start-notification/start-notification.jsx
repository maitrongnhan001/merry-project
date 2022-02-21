import React from 'react';
import './start-notification.scss';
import { updateNotofication } from '../../../../../redux/reducers/email';
import { useDispatch } from 'react-redux';

const StartNotification = (props) => {
    const { email } = props;
    
    const dispatch = useDispatch();

    const handleClickOK = () => {
        const action = updateNotofication(false);
        dispatch(action);
    }

    return (
        <div className='start-notification'>
            <div className="start-notification-main">
                <div className="notification-main">
                    <h1 className='start-notification-title center'>Thông báo</h1>
                    <p className='start-notification-message'>
                        Xác thực email thành công.
                        <br/><br/>
                        Hệ thống vừa gửi một email tới địa chỉ: {email}, vui lòng kiểm tra email và bắt đầu
                        trải niệm Merry Chat nhé!
                        <br/><br/>
                        Merry Chat xin chúc bạn có được trải niệm tốt nhất!
                    </p>
                    <div className="start-notification-footer">
                        <button 
                            className='start-btn start-btn-primary'
                            onClick={() => handleClickOK()}
                        >
                            OK
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StartNotification;
