import actionTypes from './actionTypes'

export const initialState = {
    user: null,
    playlists: [],
    currentTrack: null,
    trackIndex: 0,
    playState: false,
    token: null,
    playlistPallete: {
        darkMuted: null,
        darkVibrant: null,
        lightMuted: null,
        lightVibrant: null,
        muted: null,
        vibrant: null
    },
    pageStatus: {
        loading: false,
        loaded: false,
        error: false
    }
}

const reducer = (state, action) => {
    switch(action.type) {
        case actionTypes.setPageLoadStatus:
            return {
                ...state,
                pageStatus: action.pageStatus
            }
        case actionTypes.setUser:
            return {
                ...state,
                user: action.user
            }
        case actionTypes.setToken:
            return {
                ...state,
                token: action.token
            }
        case actionTypes.setUserPlaylists:
            return {
                ...state,
                playlists: action.playlists
            }
        case actionTypes.setPlayListPalette:
            return {
                ...state,
                playlistPallete: action.playlistPallete
            }
        case actionTypes.setCurrentTrack:
            return {
                ...state,
                currentTrack: action.currentTrack
            }
        case actionTypes.setPlayState:
            return {
                ...state,
                playState: action.playState
            }
        case actionTypes.setTrackIndex:
            return {
                ...state,
                trackIndex: action.trackIndex
            }
        default:
            return state
    }
}

export default reducer