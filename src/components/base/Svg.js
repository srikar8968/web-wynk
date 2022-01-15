import React from 'react'
import PropTypes from 'prop-types'

const Svg = ({children, viewBox, ...props}) => {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox={viewBox}>
            { children }
        </svg>
    )
}

Svg.propTypes = {
    viewBox: PropTypes.string
}
export default Svg