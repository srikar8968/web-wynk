import React from 'react'
import './Disc.css'

const Disc = ({ cover, theme, playing = false }) => {
    return (
        <div className={ playing ? 'dscWrapper pr-4 pl-6 relative play' : 'dscWrapper pr-4 pl-6 relative' }>
            <div 
                className="dscContainer w-16 h-16 box-content rounded-full shadow-lg border-2 border-gray-900 bg-gray-900 relative"
                style={{
                    borderColor: theme.vibrant
                }}>
                <img className="w-full h-full opacity-40 rounded-full" src={cover} alt="Panda" />
                <span 
                    className="dscCenter absolute top-1/2 left-1/2 w-4 h-4 rounded-full border-4 -ml-2 -mt-2 bg-gray-900 shadow-lg"
                    style={{
                        borderColor: theme.vibrant
                    }}></span>
            </div>
            <div className="dscTools absolute top-1/2 -mt-2 left-0 z-10">
                <span 
                    className="w-4 h-4 bg-gray-800 shadow rounded-full inline-block leading-none"
                    style={{ backgroundColor: theme.vibrant }}></span>
                <div className="dscHandle w-11 h-7 mt-1 overflow-hidden absolute left-0 top-0">
                    <span 
                        className="w-16 h-16 absolute left-1 ml-px bottom-0 inline-block rounded-full border-2 border-gray-800"
                        style={{ borderColor: theme.vibrant }}></span>
                </div>
                <span className="w-1 h-1 right-1 top-1 mt-px mr-px rounded-full opacity-70 bg-gray-900 absolute"
                    style={{ backgroundColor: theme.darkVibrant }}></span>
            </div>
        </div>
    )
}

export default Disc