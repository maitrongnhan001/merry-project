import React from 'react'
import './data-loader.scss'

function DataLoader() {
    return (
        <div className="main-chat-data-loader">
            <span style={{"--value": 1}}></span>
            <span style={{"--value": 2}}></span>
            <span style={{"--value": 3}}></span>
        </div>
    )
}

export default DataLoader