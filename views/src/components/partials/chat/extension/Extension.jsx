import React, { useEffect } from 'react'
import './extension.scss'
import { useSelector, useDispatch } from 'react-redux'
import HeaderExtension from './header-extension/header-extension'
import MemberGroup from './member-group-extension/member-group'
import Links from './links-extension/links'
import $ from 'jquery'
import Medias from './medias-extension/medias'
import Documents from './documents-extension/documents'
import { showExtension } from '../../../../redux/actions/extension'

function Extension(props) {

    //redux
    const isShowExtension = useSelector(state => state.extension.isShow);
    const dispatch = useDispatch()

    console.log(isShowExtension)

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
    }, [isShowExtension]);

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
            }else {
                const display = showExtension(1)
                dispatch(display)
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])






    return (
        <div className="extension-wrapper" onClick={(e) => e.stopPropagation()}>
            <HeaderExtension></HeaderExtension>
            <MemberGroup></MemberGroup>
            <Links></Links>
            <Medias></Medias>
            <Documents></Documents>
        </div>
    );
}

export default React.memo(Extension)