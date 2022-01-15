import React from 'react'
import Card from './Card'
import ScrollContainer from 'react-indiana-drag-scroll'

const Row = ({title, list, type}) => {
    return (
        <div className="mb-4">
            <h2 className="mb-4 pl-4 text-lg font-bold tracking-wide">{ title }</h2>
            <div className="relative">
                <ScrollContainer vertical={false} hideScrollbars={false} className="ww_carousel px-4">
                    <div className="flex items-stretch">
                        { list?.map(item => (
                            <Card type={type} key={item.id} item={item} />
                        )) }
                    </div>
                </ScrollContainer>
            </div>
        </div>
    )
}

export default Row