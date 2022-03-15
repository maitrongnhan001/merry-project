import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './notification.scss';

const Notification = () => {
    const notification = useSelector(state => state.notification.notification);
    const amountNotification = useSelector(state => state.notification.amountNotification);
    const [displayNotification, setDisplayNotification] = useState(false);

    const showNotification = async () => {
        setDisplayNotification(true);
        await setTimeout( () => {
            setDisplayNotification(false);
        }, 3000);
    }

    useEffect(() => {
        if (!notification) return;

        showNotification();
        return () => {
            setDisplayNotification(false);
        };
    }, [amountNotification]);

    return (
        <div className={`notification-component ${displayNotification ? 'show-notification' : 'hide-notification'}`}>
            <p className='text-notification'>{notification}</p>
        </div>
    );
}

export default Notification;
