const mockData = {
    title: 'News title',
    preview: 'news/News-Preview.jpg',
    summary: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
}


export const mockNewsCollection = () => {
    const collection = []

    for (let i = 0; i < 10; i++) {
        collection.push({
            ...mockData,
            id: i + 1,
            title: `${mockData.title} id: ${i + 1}`
        })
    }

    return collection
}

export const getNewsCollection = (params) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                success: 1,
                data: mockNewsCollection()
            });
        }, 2000);
    })
}
