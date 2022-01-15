import { useStateValue } from '../../StateProvider'
import React, { useRef, useEffect } from 'react'
import Icon from '../base/Icon'

const AudioControls = ({onPlayToggleClick, onPrevTrack, onNextTrack, theme, trackIndex}) => {
    const [{currentTrack, playState}, dispatch] = useStateValue();
    const nextRef = useRef(null);
    const prevRef = useRef(null);

    useEffect(() => {
        if (trackIndex < (currentTrack?.items?.length - 1)) {
            nextRef.current.disabled = prevRef.current.disabled = false
        } else {
            nextRef.current.disabled = prevRef.current.disabled = true
        }
    }, [trackIndex])
	
    return (
		<div className="flex items-center justify-center mb-3">
            <button className="p-2 bg-gray-50 bg-opacity-0 hover:bg-opacity-5 rounded-full">
                <Icon w={2}><polyline points="16 3 21 3 21 8"></polyline><line x1="4" y1="20" x2="21" y2="3"></line><polyline points="21 16 21 21 16 21"></polyline><line x1="15" y1="15" x2="21" y2="21"></line><line x1="4" y1="4" x2="9" y2="9"></line></Icon>
            </button>

            <button 
                ref={prevRef}
                onClick={onPrevTrack}
                className="p-2 bg-gray-50 bg-opacity-0 hover:bg-opacity-5 rounded-full mx-4">
                <Icon w={2}><polygon points="19 20 9 12 19 4 19 20"></polygon><line x1="5" y1="19" x2="5" y2="5"></line></Icon>
            </button>

            <button 
                onClick={() => onPlayToggleClick(true, !playState)} 
                className="text-gray-50 p-3 rounded-full shadow-xl hover:shadow" style={{ backgroundColor: theme }}>
                <Icon size="16">
                    { playState ? <><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></> : <polygon points="21.57 12 5.98 3 5.98 21 21.57 12" fill="currentColor"></polygon>}
                </Icon>
            </button>

            <button 
                ref={nextRef}
                onClick={onNextTrack} 
                className="p-2 bg-gray-50 bg-opacity-0 hover:bg-opacity-5 rounded-full mx-4">
                <Icon w={2}><polygon points="5 4 15 12 5 20 5 4"></polygon><line x1="19" y1="5" x2="19" y2="19"></line></Icon>
            </button>

            <button className="p-2 bg-gray-50 bg-opacity-0 hover:bg-opacity-5 rounded-full">
                <Icon w={2}><polyline points="17 1 21 5 17 9"></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14"></path><polyline points="7 23 3 19 7 15"></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3"></path></Icon>
            </button>
        </div>
	)
}

export default AudioControls