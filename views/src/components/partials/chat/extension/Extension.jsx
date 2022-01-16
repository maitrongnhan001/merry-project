import React, { useEffect } from 'react'
import './extension.scss'
import {useSelector} from 'react-redux'
import HeaderExtension from './header-extension/header-extension'
import MemberGroup from './member-group-extension/member-group'
import Links from './links-extension/links'
import $ from 'jquery'
import Medias from './medias-extension/medias'
import Documents from './documents-extension/documents'

function Extension(props) {

    //redux
    const isShow = useSelector(state => state.extension.isShow);

    useEffect(()=>{
        if(isShow) {
            $('.extension-wrapper').css('display', 'block')
        }else {
            $('.extension-wrapper').css('display', 'none')
        }
    }, [isShow]);

    

    return (
        <div className="extension-wrapper">
            <HeaderExtension></HeaderExtension>
            <MemberGroup></MemberGroup>
            <Links></Links>
            <Medias></Medias>
            <Documents></Documents>
        </div>
    );
}

export default Extension;