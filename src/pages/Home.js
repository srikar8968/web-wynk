import React, { useEffect, useState } from 'react'
import SpotifyWebApi from 'spotify-web-api-js'
import { useStateValue } from '../StateProvider'
import Row from '../components/songs/Row'
import actiontypes, { pageSteps } from '../reducers/actionTypes'

const spotify = new SpotifyWebApi();

const Home = () => {
    const [featuredPlaylists, setFeaturedPlaylists] = useState([]);
    const [newReleases, setnewReleases] = useState([]);
    const [recentTracks, setrecentTracks] = useState([]);
    const [{ token }, dispatch] = useStateValue();
    useEffect(() => {
        spotify.setAccessToken(token);
        spotify.getFeaturedPlaylists({ limit: 10 }).then(featuredPlaylists => {
            setFeaturedPlaylists(featuredPlaylists.playlists.items);
        });
        spotify.getNewReleases({ limit: 10 }).then(newReleases => {
            setnewReleases(newReleases.albums.items);
        })
        spotify.getMyRecentlyPlayedTracks({ limit: 10 }).then(recentTracks => {
            let _tracks = [...recentTracks?.items];
            const tracks = [];
            if(_tracks.length > 0) {
                for (let x = 0; x < _tracks.length; x++) {
                    tracks.push(_tracks[x].track.album);
                }
            }
            setrecentTracks([...tracks]);
        })
    }, [token]);
    useEffect(() => {
        dispatch({
            type: actiontypes.setPageLoadStatus,
            pageStatus: pageSteps.loaded
        })
    }, []);
    return (
        <div className="px-4">
            <Row title="Featured" list={featuredPlaylists} />
            <Row title="New Releases" list={newReleases} type="album" />
            <Row title="Recently Played" list={recentTracks} type="album" />
        </div>
    )
}

export default Home