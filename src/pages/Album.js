import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import SpotifyWebApi from 'spotify-web-api-js'
import { usePalette } from 'react-palette'
import { useStateValue } from '../StateProvider'
import actionTypes from '../reducers/actionTypes'
import RowList from '../components/songs/RowList'
import SongHero from '../components/songs/SongHero'

const spotify = new SpotifyWebApi();

const Album = () => {
    const { id } = useParams();
    const [album, setAlbum] = useState(null);
    const { data, loading, error } = usePalette(album?.images[0]?.url);
    const [{}, dispatch] = useStateValue();

    useEffect(() => {
        spotify.getAlbum(id).then(album => {
            setAlbum({...album});
        });
    }, [id]);

    useEffect(() => {
        dispatch({
            type: actionTypes.setPlayListPalette,
            playlistPallete: {...data}
        })
    }, [data]);

    return (
        <div className="py-4" data-id={album?.id}>
            
            <SongHero item={album} />

            <div className="bg-gray-900">
                <RowList tracks={ album?.tracks } album={album} />
            </div>
        </div>
    )
}

export default Album