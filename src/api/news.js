import { faker } from '@faker-js/faker'
export const mockNewsCollection = () => {
    console.log('Make mock News collection')

    const collection = []

    for (let i = 0; i < 10; i++) {
        collection.push({
            id: faker.datatype.bigInt(),
            preview: faker.image.business(426, 240),
            title: faker.lorem.sentence(10),
            summary: faker.lorem.sentence(40),
            createdAt: Date.now()
        })
    }

    return collection
}

const mockData = mockNewsCollection()

export const getNewsCollection = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                success: 1,
                data: mockData
            });
        }, 2000);
    })
}
