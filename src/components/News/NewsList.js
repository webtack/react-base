import React from 'react'
import NewsPreview from '@/components/news/NewsPreview'
import PropTypes from 'prop-types'

const NewsList = ({items, title}) => {
    return (
        <div className="news-list">
            <h2>{title}</h2>
            <div >
                {
                    items.map(item =>
                        <NewsPreview
                            key={item.id}
                            item={item}
                        />
                    )
                }
            </div>
        </div>
    )
}

NewsList.defaultProps = {
    items: []
}

NewsList.propTypes = {
    items: PropTypes.array,
    title: PropTypes.string
}

export default NewsList
