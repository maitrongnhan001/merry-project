import React, { useEffect, useRef } from 'react'
import './feature.scss'
import $ from 'jquery'

function Feature({children, offset}) {

    //ref
    const ref = useRef(null)
    
    if(ref.current != null) {
        ref.current.style.display = 'none'
    }

    //lifecycle
    useEffect(()=>{
        $('.tab-item-feature').slideDown('fast')
    })
    

    return (
        <div ref={ref} className="tab-friend-feature-item-show tab-item-feature" style={{top: offset.top, left: offset.left + 25}}>
            <p className="tab-friend-feature-item-show tab-item-feature-elm tab-item-feature-elm-1">Xem thông tin</p>
            <p className="tab-friend-feature-item-show tab-item-feature-elm tab-item-feature-elm-2">{children}</p>
        </div>
    )
}

export default Feature