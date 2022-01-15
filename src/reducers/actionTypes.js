const actionTypes = {
    setUser: "SET_USER",
    setToken: "SET_TOKEN",
    setUserPlaylists: "SET_USER_PLAYLIST",
    setPlayListPalette: "SET_PLAYLIST_PALETTE",
    setPageLoadStatus: 'SET_PAGE_LOAD_STATUS',
    setCurrentTrack: "SET_CURRENT_TRACK",
    setPlayState: "SET_PLAY_STATE",
    setTrackIndex: "SET_TRACK_INDEX"
}

export const pageSteps = {
    loading: 'loading',
    loaded: 'loaded',
    error: 'error'
}

export default actionTypes