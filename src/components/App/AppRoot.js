import React from 'react'
import {Container, createTheme, CssBaseline, ThemeProvider} from '@mui/material'
import themeConfig from '@/config/theme'
import {Outlet} from 'react-router-dom'

const AppRoot = () => {
    const appTheme = createTheme(themeConfig)

    return (
        <ThemeProvider theme={appTheme}>
            <CssBaseline />
            <Container maxWidth="xl">
                <Outlet />
            </Container>
        </ThemeProvider>
    )
}

export default AppRoot
