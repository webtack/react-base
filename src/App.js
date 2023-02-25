import React from 'react'
import '@/styles/app.scss'

import {createBrowserRouter,
    RouterProvider
} from 'react-router-dom'
import {publicRoutes} from '@/router'
import AppRoot from '@/components/app/AppRoot'

const App = () => {

    const router = createBrowserRouter([
        {
            path: '/',
            element: <AppRoot/>,
            children: publicRoutes
        }
    ])

    return (
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
    )
}

export default App
