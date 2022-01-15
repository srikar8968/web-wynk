import React from 'react'
import { useReadableDigits, getDate } from '../../utils/utills'
import Icon  from '../base/Icon'
import { useStateValue } from '../../StateProvider'
import PlayButton from '../player/PlayButton'

const SongHero = ({item}) => {
    const [{playlistPallete}, dispatch] = useStateValue();

    return (
        <React.Fragment>
            <div className="flex items-end px-8 text-gray-300">
                <div className="w-56 h-56 rounded overflow-hidden shadow-lg flex-shrink-0 bg-gray-800">
                    <img className="w-full h-full rounded" src={item?.images[0]?.url} alt={item?.name} />
                </div>
                <div className="ml-8">
                    <span className="capitalize">{ item?.type }</span>
                    <h1 className="text-6xl mb-4 mt-1 text-gray-50 font-extrabold">{ item?.name }</h1>
                    <p>{ item?.description }</p>
                    <div className="text-sm mt-1">
                        { item?.type === "playlist" && <span className="text-gray-50 font-semibold">{ item?.owner?.display_name }&nbsp;•&nbsp;</span> }
                        { item?.type === "album" && <div className="text-gray-50 inline-block font-semibold">
                            { item?.artists?.map(artist => (
                                <span key={artist.id}>{ artist?.name }&nbsp;•&nbsp;</span>
                            )) }
                        </div> }

                        <span className={ item?.type === 'playlist' ? '' : 'hidden' }>{ useReadableDigits(item?.followers?.total) } followers&nbsp;•&nbsp;</span>
                        <span>{ useReadableDigits(item?.tracks?.total) } tracks&nbsp;•&nbsp;</span>
                        <span>{ getDate(item?.release_date, 'year') }</span>
                    </div>
                </div>
            </div>
            
            <div className="h-24 mt-4 w-full px-8 flex items-center relative" style={{ backgroundColor: playlistPallete.darkVibrant }}>
                <div className="absolute z-0 top-full h-24 w-full left-0" style={{backgroundImage: `linear-gradient(to bottom, ${playlistPallete.darkVibrant}, rgba(28, 25, 23, 0)`}}></div>

                <PlayButton track={item}>
                    <span className="inline-block text-gray-50 bg-gray-800 p-6 rounded-full shadow-md hover:shadow" style={{ backgroundColor: playlistPallete.darkMuted }}>
                        <Icon size="20"><polygon points="21.57 12 5.98 3 5.98 21 21.57 12" fill="currentColor"></polygon></Icon>
                    </span>
                </PlayButton>

                <button className="mx-4 text-gray-50 p-2 rounded-full bg-gray-100 bg-opacity-0 hover:bg-opacity-10"><Icon size="28"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></Icon></button>
                <button className="text-gray-50 p-2 rounded-full bg-gray-100 bg-opacity-0 hover:bg-opacity-10"><Icon size="28"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></Icon></button>
            </div>
        </React.Fragment>
    )
}

export default SongHero