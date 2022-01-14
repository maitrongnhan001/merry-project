import React, { useEffect } from 'react'
import './extension.scss'
import {useSelector} from 'react-redux'
import $ from 'jquery'

function Extension(props) {

    //redux
    const isShow = useSelector(state => state.extension.isShow)

    useEffect(()=>{
        if(isShow) {
            $('.extension-wrapper').css('display', 'block')
        }else {
            $('.extension-wrapper').css('display', 'none')
        }
    }, [isShow])

    return (
        <div className="extension-wrapper">
            
        </div>
    );
}

export default Extension;