import { useState } from 'react'
import './SearchBar.styl'

export const SearchBar = (props) => {
    return (
        <>
            <div className="searchBar">
                <input placeholder={props.placeholder} />
                <img src={props.icon} className='searchIcon' />
            </div>

        </>
    )
}