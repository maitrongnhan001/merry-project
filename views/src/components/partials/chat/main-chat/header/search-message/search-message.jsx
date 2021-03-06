import React, { useState, useEffect } from 'react'
import './search-message.scss'
import $ from 'jquery'

function SearchMessage({onShowSearchMessageBox}) {

    /*----states----*/
    const [search, setSearch] = useState('')

    /*----handles----*/
    //xu ly dong khung tim kiem tin nhan
    const handleClickButton = () =>{
        $('.search-message-wrapper').slideToggle('.15s')
        onShowSearchMessageBox(0)
    }

    //xu ly input
    const handleChange = (e)=> {
        setSearch(e.target.value)
    }

    //xu ly clear du lieu khung tim kiem
    const handleClickClearData = ()=>{
        $('.search-message-wrapper .search-message-input').val('')
        $('.search-message-wrapper .fa-times-circle').css('visibility', 'hidden')
    }

    /*----lifecycle----*/
    useEffect(() => {
        $('.search-message-wrapper .search-message-input').focus()
    }, []);

    useEffect(() =>{
        if(search === '') {
            $('.search-message-wrapper .fa-times-circle').css('visibility', 'hidden')
        }else {
            $('.search-message-wrapper .fa-times-circle').css('visibility', 'visible')
        }
    }, [search])

    return (
        <div className="search-message-wrapper">
            <div className="search-message">
                <i className="fas fa-search"></i>
                <input type="text" className="search-message-input" name='search' placeholder="Nhập nội dung tin nhắn cần tìm." onChange={handleChange}/>
                <i className="fas fa-times-circle" onClick={handleClickClearData}></i>
                <button onClick = {handleClickButton}>Đóng</button>
            </div>
        </div>
    );
}

export default SearchMessage;