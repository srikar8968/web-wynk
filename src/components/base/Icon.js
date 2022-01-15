import React from 'react'
import Svg from './Svg'
import PropTypes from 'prop-types'

const Icon = ({children, size, w, ...props}) => {
    return (
        <Svg {...props} width={size || "20"} height={size || "20"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={w || "1"} strokeLinecap="round" strokeLinejoin="round">
            { children }
        </Svg>
    )
}

Icon.propTypes = {
    w: PropTypes.number
}
export default Icon