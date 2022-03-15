import React from 'react'
import { urlDocument } from '../../../../../../APIs/ConnectAPI'
import './document.scss'

function Document({color, children}) {
    return (
        <div className="message-doc-content-wrapper">
            <a className="message-doc-content" href={urlDocument + children} target="_blank" rel="noopener noreferrer">
                <div className="message-doc-icon">
                    <i className="fas fa-file-word" style={{color: color}}></i>
                </div>
                <p className="message-doc-content" style={{color: color}}>{children}</p>
            </a>
            <div className="message-doc-download-btn">
                <a download href={urlDocument + children} target="_blank" rel="noopener noreferrer"> 
                    <i className="fas fa-cloud-download-alt" style={{color: color}}></i>
                </a>
            </div>
        </div>
    )
}

export default Document