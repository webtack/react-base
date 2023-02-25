import React from 'react'
import Image from '@/components/UI/CImage'
import PropTypes from 'prop-types'

const NewsPreview = ({item}) => {
    return (
        <div>
            <h3>{item.title}</h3>
            <div>
                <Image src={item.preview} width="426px"/>
            </div>
            <small>{item.summary}</small>
        </div>
    )
}

NewsPreview.propTypes = {
    item: PropTypes.object
}

export default NewsPreview
