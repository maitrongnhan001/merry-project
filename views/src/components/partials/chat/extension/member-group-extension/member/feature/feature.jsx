import React from 'react';
import './feature.scss';

const Feature = (props) => {
    const { isActiveFeature, meIsAdmin } = props;

    return (
        <div className={`feature-group ${!isActiveFeature ? 'hide' : ''}`}>
            <div className="feature-item">
                Kết bạn
            </div>
            {meIsAdmin ? <div className="feature-item text-error">
                Mời ra khỏi nhóm
            </div> : ''}
        </div>
    );
}

export default Feature;
