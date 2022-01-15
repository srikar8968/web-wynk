import React from 'react'
import Proptypes from 'prop-types'
import { Link } from 'react-router-dom'

const List = ({list, ...props}) => {
    return (
        <React.Fragment>
            { list.length > 0 && <ul {...props}>
                { list.map((item, index) => (
                    <li key={item?.id || index}>
                        <Link className="py-3 px-4 w-full flex items-center text-gray-400 rounded-md hover:bg-gray-800 hover:shadow-md transition-all ease-in duration-150" to={item.path}>
                            { item.icon && <i className="pr-3">{ item.icon }</i> }
                            { item.name }
                        </Link>
                    </li>
                )) }
            </ul> }
        </React.Fragment>
    )
}

List.propTypes = {
    list: Proptypes.array
}

export default List