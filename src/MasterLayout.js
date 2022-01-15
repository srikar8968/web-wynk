import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Switch, Route, useLocation } from 'react-router-dom'
import './MasterLayout.css'
import { useStateValue } from './StateProvider'
import { initialState } from './reducers'
import actionTypes from './reducers/actionTypes'
import {urlSegment} from './utils/utills'

import Home from './pages/Home'
import PlayList from './pages/PlayList'
import NotFound from './pages/NotFound'
import Album from './pages/Album'

const MasterLayout = () => {
    let _location = useLocation();
    const [page, setPage] = useState(null);
    const [{playlistPallete}, dispatch] = useStateValue();
    useEffect(() => {
        dispatch({
            type: actionTypes.setPlayListPalette,
            playlistPallete: {...initialState.playlistPallete}
        });
        // get page identifier
        let _page = urlSegment(0);
        setPage(_page);
        // set page status
        
    }, [_location])

    return (
        <div className="flex master_lay">
            <Sidebar />
            <div className={ `content w-full max-w-full ${playlistPallete.darkVibrant ? 'themed' : ''}` } style={{ backgroundColor: playlistPallete?.darkVibrant }}>
                <Navbar page={page} />
                <div className="py-4 min-h-screen">
                    <Switch>
                        <Route path="/" exact>
                            <Home />
                        </Route>
                        <Route path="/playlist/:id" exact>
                            <PlayList />
                        </Route>
                        <Route path="/album/:id" exact>
                            <Album />
                        </Route>
                        <Route path="*">
                            <NotFound />
                        </Route>
                    </Switch>
                </div>
            </div>
        </div>
    )
}

export default MasterLayout