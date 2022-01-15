import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Player from './components/player/Player'
import { getTokenFromResponse } from './auth/auth'
import SpotifyWebApi from 'spotify-web-api-js'
import { useStateValue } from './StateProvider'
import actionTypes from './reducers/actionTypes'
import Layout from './MasterLayout'
import Login from './pages/Login'

const spotify = new SpotifyWebApi();

function App() {
  let _location = useLocation();
  const [{ token }, dispatch] = useStateValue();

  const fetchTokenFromURI = () => {
    let hash = getTokenFromResponse();
    let localToken = localStorage.getItem("token");
    let _token = localToken ? localToken : hash.access_token;

    window.location.hash = "";

    if(_token) {
      spotify.setAccessToken(_token);
      dispatch({
        type: actionTypes.setToken,
        token: _token
      });
      localStorage.setItem("token", _token);
      return true
    }
    return false
  }
  const fetchCurrentUser = () => {
    spotify.getMe().then(
      user => {
        dispatch({
          type: actionTypes.setUser,
          user
        })
      },
      err => {
        localStorage.removeItem("token")
        dispatch({
          type: actionTypes.setToken,
          token: null
        })
      }
    )
  }
  const fetUserPlaylists = () => {
    spotify.getUserPlaylists().then(
      playlists => {
        dispatch({
          type: actionTypes.setUserPlaylists,
          playlists: playlists.items
        })
      }
    )
  }

  useEffect(() => {
    if(fetchTokenFromURI()) {
      fetchCurrentUser();
    }
    window.scrollTo(0, 0);
  }, [token, dispatch, _location]);
  
  useEffect(() => {
    fetUserPlaylists();
  }, [token]);

  return (
    <div className="App bg-gray-900 min-h-screen text-gray-400">
      { token ? 
        <React.Fragment>
          <Layout />
          <Player />
        </React.Fragment> : 
        <Login /> }
    </div>
  );
}

export default App;
