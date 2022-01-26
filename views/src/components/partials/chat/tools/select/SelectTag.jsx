import React, {useEffect, useState} from 'react'
import $ from 'jquery'
import './SelectTag.scss'


export default function SelectTag({onSelected, option_select, default_value, name, width}) {

    /*----states----*/
    //item duoc chon
    const [item, setItem] = useState(default_value)
    
    //danh sach item
    const [option, setOption] = useState([])

    /*----data----*/
    const mapOption = ()=> {
        return (
            option.map((elm, idx)=>{
                return <li key={idx} data-country={elm} className='select-option-item' onClick={changeOption}>{elm}</li>
            })
        )
    } 

    /*----handles----*/
    const changeOption = (e)=>{
        setItem(e.target.dataset.country)
        onSelected(name, e.target.dataset.country)
    }

    const handleClickItem = (e)=>{
        $(e.target).next().stop().slideToggle(400)
        const height = $(e.target).next().height()
        $(e.target).find('i').css('transform', `rotateZ(${height  > 10 ? 90:-90}deg)`)
        for(let value of $('.select-items') ){
            if(value !== $(e.target)[0]){
                $(value).next().slideUp(400)
                $(value).find('i').css('transform', `rotate(90deg)`)
            }
        }
    }

    /*----lifecycle----*/
    useEffect(()=>{
        $('.select-tag .select-option').hide()
        $('body').click((e)=>{
            if(!e.target.classList.value.match(/select-items/)){
                $('.select-tag .select-option').slideUp(400)
                $('.select-tag .select-items .select-tag-icon').css('transform', 'rotateZ(90deg)')
            }
        })
    },[]) 

    useEffect(()=>{
        if(option_select){
            setOption(option_select)
        }
    }, [option_select])

    return (
        <div className='select-tag' style={{width: width ? width : ''}}>
            <div className='select-items' onClick={handleClickItem}>
                <p className='select-tag-title'>{item}</p>
                <i className='fas fa-chevron-right select-tag-icon'></i>
            </div>
            <div className='select-option'>
                <ul>
                    {mapOption()}
                </ul>
            </div>
        </div>
    )
}