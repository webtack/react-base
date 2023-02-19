import React from 'react'
import Image from '@/components/ui/Image'

const NewsPreview = ({item}) => {
    return (
        <div>
            <h3>{item.title}</h3>
            <div>
                <Image src={item.preview} width="150px"/>
            </div>
            <small>{item.summary}</small>
        </div>
    )
}

export default NewsPreview
