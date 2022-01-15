import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import SpotifyWebApi from 'spotify-web-api-js'
import { usePalette } from 'react-palette'
import { useStateValue } from '../StateProvider'
import actionTypes from '../reducers/actionTypes'
import RowList from '../components/songs/RowList'
import SongHero from '../components/songs/SongHero'

const spotify = new SpotifyWebApi();

const PlayList = () => {
    const { id } = useParams();
    const [playList, setPlayList] = useState(null);
    const [tracks, setTracks] = useState([]);
    const { data, loading, error } = usePalette(playList?.images[0]?.url);
    const [{}, dispatch] = useStateValue();

    useEffect(() => {
        spotify.getPlaylist(id).then(playlist => {
            setPlayList({...playlist});

            let _tracks = { items: [] };
            playlist?.tracks?.items?.map(item => {
                _tracks.items.push(item.track)
            });
            setTracks({..._tracks})
        });
    }, [id]);

    useEffect(() => {
        dispatch({
            type: actionTypes.setPlayListPalette,
            playlistPallete: {...data}
        })
    }, [data]);
    
    return (
        <div className="py-4" data-id={playList?.id}>
            
            <SongHero item={playList} />

            <div className="bg-gray-900">
                <RowList type={playList?.type} album={playList} tracks={ tracks } />
            </div>
        </div>
    )
}

export default PlayList