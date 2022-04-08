import React, { useEffect, useState } from 'react'
import './extension.scss'
import { useSelector, useDispatch } from 'react-redux'
import { updateShowOrderFeature } from '../../../../redux/actions/extension'
import HeaderExtension from './header-extension/header-extension'
import MemberGroup from './member-group-extension/member-group'
import $ from 'jquery'
import Medias from './medias-extension/medias'
import Documents from './documents-extension/documents'
import AnotherFeatures from './Another-features/Another-features'
import { showExtension } from '../../../../redux/actions/extension'

function Extension(props) {

    //--------------------redux-----------------------//
    const isShowExtension = useSelector(state => state.extension.isShow)
    const idChat = useSelector(state => state.message.currentChat.receiverId)
    const dispatch = useDispatch()

    //------------------state-----------------------//
    const [isGroup, setIsGroup] = useState(false)

    //------------------handle-----------------------//
    const handleClick = (e) => {
        e.stopPropagation()

        if (e.target.classList.value.indexOf('feature-item') === -1) {
            //hide order feature in extension component
            const hideOrderFeatureExtension = updateShowOrderFeature(null)
            dispatch(hideOrderFeatureExtension)
        }
    }


    //------------------life cycle-----------------------//
    useEffect(() => {
        if (isShowExtension === 1) {
            if ($(window).width() <= 1200) {
                $('.extension-wrapper').css('display', 'block')
                setTimeout(() => {
                    $('.extension-wrapper').css('right', '0')
                }, 100)
            } else {
                setTimeout(() => {
                    $('.extension-wrapper').css('display', 'block')
                }, 100)
            }
        } else {
            setTimeout(() => {
                $('.extension-wrapper').css('display', 'none')
                $('.extension-wrapper').css('right', '')
            }, 50)
            if ($(window).width() <= 1200) {
                $('.extension-wrapper').css('right', '-25rem')
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isShowExtension])

    useEffect(() => {
        if (idChat.indexOf('G') === 0) {
            setIsGroup(true);
        } else {
            setIsGroup(false);
        }

        return () => {
            setIsGroup(false);
        }

    }, [idChat])

    useEffect(() => {
        $(window).click(() => {
            if ($(window).width() <= 1200) {
                const display = showExtension(0)
                dispatch(display)
            }
        })

        $(window).resize(() => {
            if ($(window).width() <= 1200) {
                const display = showExtension(0)
                dispatch(display)
            } else {
                const display = showExtension(1)
                dispatch(display)
            }
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="extension-wrapper" onClick={handleClick}>
            <HeaderExtension></HeaderExtension>
            {isGroup ? <MemberGroup></MemberGroup> : ''}
            <Medias></Medias>
            <Documents></Documents>
            <AnotherFeatures />
        </div>
    );
}

export default React.memo(Extension)