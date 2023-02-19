export const MODE = 'light'
export const CONTAINER_MAX_WIDTH = 1600

export const palette = {
    light: {
        mode: 'light'
    },
    dark: {
        mode: 'dark',
        background: {
            default: '#0F141D',
            paper: '#1E222A'
        }
    }
}
export default {
    typography: {
        "fontFamily": `"Inter", "Helvetica", "Arial", sans-serif`,
        "fontSize": 14,
        "fontWeightLight": 300,
        "fontWeightRegular": 400,
        "fontWeightMedium": 500
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: CONTAINER_MAX_WIDTH,
        }
    },
    palette: palette[MODE]
}
