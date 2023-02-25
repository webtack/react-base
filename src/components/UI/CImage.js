import React from 'react'

const CImage = ({src, width, height, alt}) => {
    const isAbsolutePath = src.startsWith('blob:') || src.startsWith('http')

    src = isAbsolutePath ? src : require('@/assets/' + src)
    width = width || '24px'
    height = height || 'auto'

    return (
        <img
            src={src}
            alt={alt}
            width={width}
            height={height}
        />
    )
}

// CImage.propTypes = {
//     src: PropTypes.string.isRequired,
//     width: PropTypes.string,
//     height: PropTypes.string,
//     alt: PropTypes.string
// }

export default CImage
