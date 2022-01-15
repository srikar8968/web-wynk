import React from 'react'
import List from './base/List'
import Icon from './base/Icon'
import { useStateValue } from '../StateProvider'
import { Link } from 'react-router-dom'

const Sidebar = ({children}) => {
    const navLinks = [
        {
            id: 1,
            name: 'Browse',
            path: '/',
            icon: <Icon><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></Icon>
        },
        {
            id: 2,
            name: 'My Library',
            path: '/',
            icon: <Icon><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></Icon>
        },
        {
            id: 3,
            name: 'Favourites',
            path: '/',
            icon: <Icon><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></Icon>
        }
    ];
    const [{ playlists }, dispatch] = useStateValue();
    return (
        <div className="w-64 border-gray-800 border-r z-30 bg-gray-900 min-h-screen flex-shrink-0 text-center">
            <div className="sticky top-0 py-6 px-2">
                <a className="cursor-pointer text-sm font-bold tracking-widest text-yellow-700 block">Web<span className="text-red-700 text-3xl font-bolder pl-px">Wynk</span></a>
                <div className="text-xs mb-4 mt-1"><img className="w-14 opacity-50 block mx-auto" src="/images/spotify_logo_sm.png" alt="powered by spotify"/></div>
                <List className="text-sm text-left" list={navLinks} />
                <div className="text-left my-4 px-4">
                    <h4 className="text-xs font-bold tracking-widest text-gray-600 mb-2"><small>PLAYLISTS</small></h4>
                    {/*<a href="#" className="flex items-center px-4 py-2 text-sm mb-2 border border-gray-800 hover:border-yellow-700 hover:text-yellow-700">
                        <span className="pr-2"><Icon><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></Icon></span>
                        Create Playlist
                    </a>*/}
                    <nav>
                        { playlists.length > 0 ? playlists.map(item => (
                            <Link to={"/playlist/" + item.id} key={item.id} className="flex items-center px-4 py-2 text-sm border-l-4 border-yellow-700 bg-gray-800 mb-px mt-px overflow-hidden">
                                {item?.name || item?.title}
                            </Link>
                        )) : 
                            <React.Fragment>
                                <span className="h-9 bg-gray-800 block mb-px border-l-4 border-yellow-700"></span>
                                <span className="h-9 bg-gray-800 block mb-px border-l-4 border-yellow-700"></span>
                                <span className="h-9 bg-gray-800 block mb-px border-l-4 border-yellow-700"></span>
                                <span className="h-9 bg-gray-800 block mb-px border-l-4 border-yellow-700"></span>
                            </React.Fragment> }
                    </nav>
                </div>
                { children }
            </div>
        </div>
    )
}

export default Sidebar