import React from 'react'
import './search-layout.scss'
import Item from '../friend-group-items/item'
import Loader from '../../tools/data-loader/data-loader'

function SearchLayout({data}) {
    const [stateLoad, setStateLoad] = React.useState(1)

    const dataState = data.map((value, idx)=> {
        return (
            <Item key={idx} members={value.members} id={value.receiveId} image={value.image} name={value.receiverName}></Item>
        )
    })

    React.useEffect(()=> {
        setStateLoad(1)
        setTimeout(()=> setStateLoad(0), 500)
    }, [data])

    return (
        <div className="search-tab">
            {
                // eslint-disable-next-line eqeqeq
                stateLoad ? <Loader/> : dataState.length == 0 ? <p className="search-tab-error">Không tìm thấy được kết quả.</p> : dataState 
            }
        </div>
    );
}

export default SearchLayout;