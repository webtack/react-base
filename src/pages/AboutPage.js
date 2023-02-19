import React from 'react'
import {Grid} from '@mui/material'
import AppNav from '@/components/app/AppNav'
import AppLogo from '@/components/app/AppLogo'

const AboutPage = () => {
    return (
        <Grid container spacing={2}>
            <Grid
                lg={2}
                md={3}
                sm={4}
                xs={12}
                item
            >
                <AppLogo/>
                <AppNav/>
            </Grid>
            <Grid
                lg={10}
                md={9}
                sm={8}
                xs={12}
                item
            >
                <h1>About page</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias architecto at aut corporis delectus dignissimos doloribus eos, et facere iste, maiores nesciunt nulla, obcaecati officia officiis quibusdam quod quos tempore!</p>
            </Grid>
        </Grid>
    )
}

export default AboutPage
