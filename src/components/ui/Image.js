import React from 'react'

const Image = ({src, width, height}) => {
    width = width || '24px'
    height = height || 'auto'

    return (
        <img
            src={require('@/assets/images/' + src)}
            alt=""
            width={width}
            height={height}
        />
    )
}

export default Image
