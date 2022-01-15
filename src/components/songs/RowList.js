import React, {useEffect, useState} from 'react'
import './RowList.css'
import {Link} from 'react-router-dom'
import Icon from '../base/Icon'
import {msToTime} from '../../utils/utills'
import PlayButton from '../player/PlayButton'

const RowList = ({tracks, album = null, type, ...props}) => {
    const [onScroll, setOnScroll] = useState(false);

    const handleScroll = event => {
        window.scrollY > 360 ? setOnScroll(true) : setOnScroll(false);
    }
    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])

    return (
        <div {...props} className="text-left pb-2 relative z-10">
            <div className={`sticky top-16 px-6 ${onScroll ? 'bg-gray-900' : ''}`}>
                <div className={`flex items-center justify-between text-sm py-3 text-gray-400 border-b border-gray-700 px-4`}>
                    <span className="w-4 flex-shrink-0 text-right">#</span>
                    <span className="w-full px-6">Title</span>
                    { type === 'playlist' && <span className="w-full pr-6">Album</span>}
                    <span className="w-10 flex-shrink-0"><Icon size="18"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></Icon></span>
                    <span className="w-6 flex-shrink-0 mx-4"></span>
                    <span className="w-6 flex-shrink-0"></span>
                </div>
            </div>
            <div className={ type === 'playlist' ? 'px-4' : 'pt-2 px-4' }>
                { tracks?.items?.map((item, index) => (
                    <div key={item?.id} className={`trackrow flex items-center justify-between text-sm rounded py-1 px-6 bg-gray-800 bg-opacity-0 hover:bg-opacity-40 hover:shadow-lg ${type === 'playlist' ? 'h-16' : 'h-12'}`}>
                        <div className="w-4 overflow-x-hidden flex-shrink-0 text-right">
                            <span className="trackSortId">{ index + 1 }</span>
                            <PlayButton track={item}>
                                <span className="pltrack_btn hidden hover:text-yellow-700"><Icon size="16"><polygon points="21.57 12 5.98 3 5.98 21 21.57 12" fill="currentColor"></polygon></Icon>
                                </span>
                            </PlayButton>
                        </div>
                        <div className="flex items-center w-full px-6">
                            { item?.album?.images[2]?.url && <div className="w-11 h-11 rounded mr-4 bg-gray-800 shadow-lg"><img className="w-full h-full rounded" src={ item?.album?.images[2]?.url } alt={ item?.name } /></div>}
                            <div className="leading-tight">
                                <h3 className="leading-none">{ item?.name }</h3>
                                { item?.artists?.map(artist => (
                                    <Link to="/" className="text-xs text-gray-600 leading-none hover:text-yellow-700 pr-2" key={artist?.id}>{ artist?.name }</Link>
                                ))}
                            </div>
                        </div>
                        { type === 'playlist' && <Link to={"/" + item?.album?.type + "/" + item?.album?.id} className="w-full hover:text-yellow-700 pr-6">{ item?.album?.name }</Link>}
                        <span className="w-10 flex-shrink-0">{ msToTime(item?.duration_ms) }</span>
                        <button className="w-6 flex-shrink-0 mx-4 hover:text-yellow-700"><Icon size="18"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></Icon></button>
                        <button className="w-6 flex-shrink-0"><Icon size="18"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></Icon></button>
                    </div>
                )) }
            </div>
        </div>
    )
}

export default RowList