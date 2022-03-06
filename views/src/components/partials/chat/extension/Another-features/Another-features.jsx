import React, {useState} from 'react';
import './another-features.scss';
import CreateGroup from './create-group/create-group';
import LeaveGroup from './leave-group/leave-group';
import ManagerFriend from './manager-friend/manager-friend';
import SetAvatarGroup from './set-avatar-group/set-avatar-group';
import SetNameGroup from './set-name-group/set-name-group';
import AddMember from './add-members/add-member';
import $ from 'jquery';

const AnotherFeatures = () => {
    const [is_active, setIsActive] = useState(false);

    const onActive = () => {
        setIsActive(!is_active);

        //animation show member group
        $('.list-another-feature').animate({
            height: 'toggle'
        });
    }

    return (
        <div className='element-extension'>
            <div
                className="show-feature-extension-button"
                onClick={onActive}>
                <p>Chức năng khác</p>

                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20" height="20"
                    fill="currentColor"
                    className={is_active ? 'active' : ''}
                    viewBox="0 0 16 16">
                    <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                </svg>
            </div>

            <div
                className={`list-another-feature hide ${is_active ? 'show' : 'hide'}`}
            >
                <CreateGroup/>
                <ManagerFriend/>
                <AddMember/>
                <SetAvatarGroup/>
                <SetNameGroup/>
                <LeaveGroup/>
            </div>
        </div>
    );
}

export default AnotherFeatures;
