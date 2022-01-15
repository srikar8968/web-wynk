import SpotifyWebApi from 'spotify-web-api-js'
import { useStateValue } from '../../StateProvider'
import actionTypes from '../../reducers/actionTypes'

const spotify = new SpotifyWebApi();

const PlayButton = ({track, children}) => {
    const [{}, dispatch] = useStateValue();

	const onPlay = (id, type) => {
	    const getList = type === 'playlist' ? spotify.getPlaylist : spotify.getAlbum;

	    getList(id).then(list => {
	        const items = [];
	        const parent = {...list};

	        if (type === 'playlist') {
	            list?.tracks?.items.map(item => items.push(item?.track))
	        } else {
	            list?.tracks?.items.map(item => items.push(item))
	        }

	        dispatch({
	            type: actionTypes.setCurrentTrack,
	            currentTrack: { items, parent }
	        });
	        dispatch({
	            type: actionTypes.setPlayState,
	            playState: true
	        });
	    });
	}
	return (
		<button onClick={() => onPlay(track?.id, track?.type)} className="inline-block rounded-full" style={{ backgroundColor: 'transparent', border: 'none' }}>
			{ children }
		</button>
	)
}

export default PlayButton