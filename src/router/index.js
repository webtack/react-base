import React from 'react'
import loadable from '@loadable/component'

const HomePage = loadable(() => import('@/pages/HomePage'))
const AboutPage = loadable(() => import('@/pages/AboutPage'))
const Error404Page = loadable(() => import('@/pages/Errors/Error404Page'))

export const privateRoutes = [

]

export const publicRoutes = [
    {
        path: '/',
        element: <HomePage/>,
    },
    {
        path: '/about',
        element:  <AboutPage/>
    },
    {
        path: '*',
        element:  <Error404Page/>
    }
]
