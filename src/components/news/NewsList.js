import React from 'react'
import NewsPreview from '@/components/news/NewsPreview'

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

export default NewsList
