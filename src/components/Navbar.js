import React, { useState, useEffect } from 'react'
import Icon from './base/Icon'
import { useStateValue } from '../StateProvider'
import actionTypes from '../reducers/actionTypes'

const Navbar = ({ page }) => {
    const [{ user, playlistPallete }, dispatch] = useStateValue();
    const [onScroll, setOnScroll] = useState(false);
    const [onScrollStepTwo, setOnScrollStepTwo] = useState(false);

    const handleScroll = event => {
        window.scrollY > 26 ? setOnScroll(true) : setOnScroll(false);
        window.scrollY > 360 ? setOnScrollStepTwo(true) : setOnScrollStepTwo(false);
    }
    
    const logout = () => {
        localStorage.removeItem("token");
        dispatch({
            type: actionTypes.setToken,
            token: null
        });
        dispatch({
            type: actionTypes.setUser,
            user: null
        });
        dispatch({
            type: actionTypes.setUserPlaylists,
            playlists: []
        })
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])

    return (
        <header 
            className={ 
                `ww_navbar sticky w-full top-0 z-40 flex h-16 items-center justify-between px-8 bg-gray-900  
                ${onScroll ? 'bg-opacity-100 shadow-md scrolled' : 'bg-opacity-0'} 
                ${playlistPallete.darkVibrant ? 'themed' : ''} ` } 
            style={
                { backgroundColor: !onScrollStepTwo ? 
                playlistPallete?.darkVibrant : 
                'rgba(28, 25, 23, 1)' 
                }
            }>
            <div 
                className={ 
                    `w-64 flex items-center rounded-full border shadow-md px-4 
                    ${  (page === 'playlist' || page === 'album' || page === 'track') && 
                        !onScrollStepTwo ? 
                            'border-gray-400 text-gray-50' : 
                            'border-gray-800 bg-gray-900'
                    }` 
                }>
                <Icon><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></Icon>
                <input disabled={true} className="bg-gray-900 bg-opacity-0 text-gray-300 text-sm leading-tight px-4 py-2 w-full focus:outline-none placeholder-gray-400" placeholder="Search" />
            </div>
            <div className="flex items-center">
                <button className="p-1 bg-gray-900 text-sm mr-2 flex items-center border-2 border-gray-800 rounded-full pr-4 leading-none">
                    <img 
                        className="w-6 h-6 rounded-full mr-2 border border-gray-800 bg-gray-800" 
                        src={ user?.images[0]?.url || '/images/avatar.png' } 
                        alt={user?.display_name} />
                    { user?.display_name }
                    <small className="pl-2 text-yellow-700 font-bold">{user?.country}</small>
                </button>
                <button onClick={logout} className="btn">Logout</button>
            </div>
        </header>
    )
}

export default Navbar