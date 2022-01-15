import React from 'react'
import './Card.css'
import { Link } from 'react-router-dom'
import Icon from '../base/Icon'
import PlayButton from '../player/PlayButton'

const Card = ({item, type}) => {
    
    return (
        <div className="mx-2 flex flex-col items-center mb-4 flex-shrink-0 w-52 sng_item">
            <div className="relative flex-shrink-0 overflow-hidden w-40 h-40 mx-auto box-content border-gray-900 border-8 rounded-xl">
                <Link to={"/" + item.type.toLowerCase() + "/" + item.id} className="sng_img block flex-shrink-0 w-40 h-40 mx-auto bg-no-repeat z-10 bg-center bg-gray-800" style={{ backgroundImage: 'url("' + item?.images[0]?.url + '")' }}>
                </Link>
                <PlayButton track={item}>
                    <span className="sng_play absolute shadow-md bg-gradient-to-tr from-yellow-700 to-red-700 p-3 text-gray-50 rounded-full hover:to-yellow-700"><Icon size="14"><polygon points="21.57 12 5.98 3 5.98 21 21.57 12" fill="currentColor"></polygon></Icon>
                    </span>
                </PlayButton>
            </div>
            <Link to={"/" + item.type.toLowerCase() + "/" + item.id} className="px-4 pb-4 w-full pt-20 -mt-20 shadow-lg bg-gray-800 rounded-b rounded-t text-center">
                <h4 className="sng_title font-semibold mt-2 h-6 overflow-hidden">{ item?.name }</h4>
                { item.type == 'album' ? 
                    <p className="text-xs flex flex-wrap justify-center items-center mt-2 h-6 overflow-hidden">
                        { item?.artists.map(artist => (
                            <small className="py-px px-2 rounded-full bg-gray-700 mr-1" key={artist?.id}>{ artist?.name }</small>
                        )) }
                    </p> :
                    <p className="text-xs text-gray-500 h-8 overflow-hidden">{ item?.description }</p> }
            </Link>
        </div>
    )
}
export default Card