import React, { useRef, useState, useEffect } from 'react'
import { usePalette } from 'react-palette'
import { useStateValue } from '../../StateProvider'
import { Link } from 'react-router-dom'
import Icon from '../base/Icon'
import Slider from './Slider'
import AudioControls from './AudioControls'
import Disc from './Disc'
import actionTypes from '../../reducers/actionTypes'

const Player = () => {
    const _track = {
        title: "RapCaviar",
        src: "/distortion.wav",
        img: "https://i.scdn.co/image/ab67706f000000036e22582f250658d7157853ab"
    }
    const [trackIndex, setTrackIndex] = useState(0);
    const [muted, setMuted] = useState(false);
    const [trackProgress, setTrackProgress] = useState(0);
    const [isReady, setIsReady] = useState(false);

    const [{currentTrack, playState}, dispatch] = useStateValue();
    const track = currentTrack?.items ? currentTrack?.items[trackIndex] : _track;
    const _palleteImg = currentTrack ? currentTrack?.parent?.images[0]?.url : _track.img;
    const { data, loading, error } = usePalette(_palleteImg);

    const audioRef = useRef(new Audio(_track.src));
    const intervalRef = useRef();

    const { duration } = audioRef.current;

    const toPrevTrack = () => {
      if (trackIndex - 1 < 0) {
        setTrackIndex(currentTrack?.items.length - 1);
      } else {
        setTrackIndex(trackIndex - 1);
      }
    }

    const toNextTrack = () => {
      if (trackIndex < currentTrack?.items.length - 1) {
        setTrackIndex(trackIndex + 1);
      } else {
        setTrackIndex(0);
      }
    }

    const startTimer = () => {
      // Clear any timers already running
      clearInterval(intervalRef.current);

      intervalRef.current = setInterval(() => {
        if (audioRef.current.ended || !track?.preview_url) {
          toNextTrack();
        } else {
          setTrackProgress(audioRef.current.currentTime);
        }
      }, [1000]);
    }

    const onPlayToggle = (explicit = false, val = false) => {
        dispatch({
            type: actionTypes.setPlayState,
            playState: explicit ? val : !playState
        })
    }

    const onPlayPause = () => {
        if (playState) {
            audioRef.current.play();
            startTimer();
        } else {
            clearInterval(intervalRef.current);
            audioRef.current.pause();
        }
    }

    const onScrub = (value) => {
        // Clear any timers already running
      clearInterval(intervalRef.current);
      audioRef.current.currentTime = value;
      setTrackProgress(audioRef.current.currentTime);
    }

    const onScrubEnd = () => {
      // If not already playing, start
      if (!playState) {
        onPlayToggle(true, true)
      }
      startTimer();
    }

    const onMuteToggle = () => {
        setMuted(!muted);
        audioRef.current.volume = +muted;
    }

    useEffect(() => {
        setTrackIndex(0)
    }, [currentTrack])

    useEffect(() => {
        console.log(track);
        setIsReady(true);
        onPlayPause();

        return () => {
            audioRef.current.pause();
            clearInterval(intervalRef.current);
        }
    }, [currentTrack, playState, trackIndex])

    return (
        <>
        { currentTrack?.items && isReady &&
            <React.Fragment>
                <audio src={track?.preview_url || _track.src} ref={audioRef} />
                <div className="p-2 h-24 bg-gray-800 z-30 border-t border-gray-800 fixed bottom-0 w-full left-0 text-center flex items-center justify-between px-8"
                style={{ backgroundImage: `linear-gradient(to right, ${data.darkVibrant} 0%, rgba(28, 25, 23, 1) 25%`}}>
    
                    <div className="flex items-center w-1/4">
                        <Disc theme={data} cover={currentTrack?.parent?.images[0]?.url || _palleteImg} playing={playState} />
                        <div className="mr-6 text-left h-full flex justify-center flex-col">
                            <h2 className="text-xs text-gray-300 font-bold leading-tight">{ track?.name?.length > 42 ? track?.name?.substr(0, 42) + '...' : (track?.name) }</h2>
                            <p className="text-xs flex overflow-hidden">
                                { track?.artists.map((artist, index) => (
                                    <small className="py-px flex-shrink-0 rounded-full leading-tight" key={artist?.id}>
                                        &nbsp;{ index === 0 ? artist?.name : `| ${artist?.name}` }
                                    </small>
                                )) }
                            </p>
                        </div>
                        <button className="p-2 bg-gray-50 bg-opacity-0 hover:bg-opacity-5 rounded-full mr-2">
                            <Icon size="20" w={2}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></Icon>
                        </button>
                        <button className="p-2 bg-gray-50 bg-opacity-0 hover:bg-opacity-5 rounded-full">
                            <Icon size="20" w={2}><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></Icon>
                        </button>
                    </div>
    
                    <div className="w-1/2">
                        <AudioControls 
                            onPlayToggleClick={onPlayToggle}
                            onPrevTrack={toPrevTrack}
                            onNextTrack={toNextTrack}
                            playState={playState}
                            theme={data.darkVibrant}
                            trackIndex={trackIndex} />
    
                        <Slider 
                            progress={trackProgress}
                            currentTime={audioRef.current.currentTime}
                            duration={duration}
                            onScrubChange={onScrub}
                            onScrubEnded={onScrubEnd} />
                    </div>
                    
                    <div className="w-1/4 flex items-center justify-end">
                        <Link to={"/" + currentTrack?.parent?.type.toLowerCase() + "/" + currentTrack?.parent?.id} className="p-2 mr-2 bg-gray-50 bg-opacity-0 hover:bg-opacity-5 rounded-full inline-block">
                            <Icon w={2}><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></Icon>
                        </Link>
                        <button onClick={onMuteToggle} className="p-2 mr-1 bg-gray-50 bg-opacity-0 hover:bg-opacity-5 rounded-full">
                            <Icon w={2}>
                                { !muted ? 
                                    <><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></> : 
                                    <><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></> }
                            </Icon>
                        </button>
                        {/*<Slider theme={data} className="w-20" />*/}
                    </div>
                </div>
            </React.Fragment>
        }
        </>
    )
}

export default Player