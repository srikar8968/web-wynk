import React from 'react'
import {msToTime} from '../../utils/utills'
import './Slider.css'

const Slider = ({ progress, currentTime, duration, onScrubChange, onScrubEnded }) => {

    return (
        <div className="flex w-full justify-center items-center">
            <span className="text-xs pr-3">0{ (currentTime / 100).toFixed(2) }</span>
            <input
                type="range"
                value={progress}
                step="1"
                min="0"
                max={duration ? duration : `${duration}`}
                className="progress w-full"
                onChange={(e) => onScrubChange(e.target.value)}
                onMouseUp={onScrubEnded}
                onKeyUp={onScrubEnded}
              />
            <span className="text-xs pl-3">0{ (duration / 100).toFixed(2) }</span>
        </div>
    )
}

export default Slider