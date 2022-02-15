import React from 'react'
import './document.scss'

function Document({children}) {
    return (
        <div className="message-doc-content-wrapper">
            <a className="message-doc-content" href="http://localhost:3000/" target="_blank" rel="noopener noreferrer">
                <div className="message-doc-icon">
                    <i className="fas fa-file-word"></i>
                </div>
                <p className="message-doc-content">{children}</p>
            </a>
            <div className="message-doc-download-btn">
                <a download href="http://localhost:3000/">
                    <i className="fas fa-cloud-download-alt"></i>
                </a>
            </div>
        </div>
    )
}

export default Document