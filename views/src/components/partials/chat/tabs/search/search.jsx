import React from 'react'
import './search.scss'

function Search(props) {
    return (
        <div className="tab-tools">
            <div className="tab-search-box">
                <input type="text" placeholder="Tìm kiếm"/>
                <i className="fas fa-search"></i>
            </div>
            <div className="tab-add-items">
                <i className="fas fa-user-plus"></i>
                <i className="fas fa-plus-circle"></i>
            </div>
        </div>
    );
}

export default React.memo(Search)