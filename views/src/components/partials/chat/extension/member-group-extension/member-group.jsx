import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Member from './member/member';
import DataLoader from '../../tools/data-loader/data-loader';
import { getMembers } from '../../../../APIs/ConnectAPI';
import './member-group.scss';
import $ from 'jquery';

const MemberGroup = () => {
    //--------------------redux-----------------------//
    const idChat = useSelector(state => state.message.currentChat.receiverId);
    const newMemberObj = useSelector(state => state.extension.newMember);
    const deleteMemberObj = useSelector(state => state.extension.deleteMember);

    //--------------------localstorage-----------------------//
    const userId = parseInt(localStorage.getItem('userId'));

    //-----------------------state--------------------------//
    const [is_active, setIsActive] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [members, setMembers] = useState([]);
    const [admin, setAdmin] = useState(null);
    const [offset, setOffset] = useState(0);

     //----------------------handle-------------------------//
    const getListAndSetState = async (idGroup, limit, position, caseLoad) => {
        if (!idGroup) return;
        setIsLoading(true);
        const endLimit = limit || 10000;
        const endPosition = (position) ? position : 0;
        const result = await getMembers(idGroup, endLimit, endPosition);

        switch (result.status) {
            case 200: {
                const listResponeMembers = result.data.data;
                let list_members = caseLoad ? members : [];
                for (let index of listResponeMembers.member) {
                    //becasue admin must in top array member
                    if (index.id === listResponeMembers.admin.id) {
                        list_members.unshift(index);
                    } else {
                        list_members.push(index);
                    }
                }
                
                //swap user is me
                if (listResponeMembers.admin.id !== parseInt(userId)) {
                    for (let index = 0; index < list_members.length; index ++) {
                        if (list_members[index].id === parseInt(userId)) {
                            const element = list_members[index];
                            list_members.splice(index, 1);
                            list_members.splice(1, 0, element);
                            break;
                        }
                    }
                } 

                setMembers(list_members);
                setAdmin(listResponeMembers.admin.id);
                setOffset(list_members.length);
                break;
            }

            case 500: {
                setError("Có lỗi xảy ra, xin vui lòng thử lại");
                break;
            }
        }

        setIsLoading(false);
    }

    const handleScroll = async () => {
        const scroolTop = $('#list_member_elements').scrollTop();
        const heightParent = $('#list_member_elements').height();
        const fullHeight = $('#list-members-full-size').height();
        if (scroolTop + heightParent - fullHeight >= -10 && scroolTop + heightParent - fullHeight <= -5) {
            await getListAndSetState(idChat, 10, offset, true);
        }
    }

    const onActive = () => {
        setIsActive(!is_active);

        //animation show member group
        $('.list-member-group').animate({
            height: 'toggle'
        });
    }


    //------------------life cycle-----------------------//
    useEffect(async () => {
        if (idChat.indexOf('G') !== 0) return;
        setOffset(0);
        setIsLoading(false);
        setMembers([]);
        setError(null);

        await getListAndSetState(idChat, 10, 0);

        return () => {
            setOffset(0);
            setIsLoading(false);
            setMembers([]);
            setError(null);
        }
    }, [idChat]);

    useEffect(() => {
        if (!newMemberObj || newMemberObj.groupId !== idChat || idChat.indexOf('G') !== 0) return;

        setMembers(members.concat(newMemberObj.members));

        return () => {}
    }, [newMemberObj]);

    useEffect(() => {
        if (!deleteMemberObj || deleteMemberObj.groupId !== idChat  || idChat.indexOf('G') !== 0) return;

       let newMembers = members.filter( value => { return value.id !== deleteMemberObj.memberId } );
       setMembers(newMembers);

       return () => {}
    }, [deleteMemberObj]);


    //----------------------data-------------------------//
    const listElements = members.map((Element, Key) => {
        return <Member
            image={Element.image}
            name={Element.name}
            isAdmin={(admin == Element.id) ? true : false}
            meIsAdmin={userId === admin ? true : false}
            index={Key}
            id={Element.id}
            key={Key}
            />;
    });

    return (
        <div className='element-extension'>
            <div
                className="show-feature-extension-button"
                id='show-member-group'
                onClick={onActive}>
                <p>Thành viên nhóm</p>

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
                className={`list-member-group ${is_active ? 'show' : 'hide'}`}
                id='list_member_elements'
                onScroll={handleScroll}
            >
                <div id="list-members-full-size">
                    {listElements}
                    <div className="text-error center">{error}</div>
                    {isLoading ? <DataLoader /> : ''}
                </div>
            </div>
        </div>
    );
}

export default MemberGroup;
