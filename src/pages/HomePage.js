import React, {useEffect, useState} from 'react'
import {Box, Button, dividerClasses, Grid, Paper, styled} from '@mui/material'
import AppNav from '../components/app/AppNav'
import AppLogo from '@/components/app/AppLogo'
import {getNewsCollection} from '@/api/news'
import {useFetching} from '@/hooks/useFetching'
import NewsList from '@/components/news/NewsList'

const HomePage = () => {
    const [ newsCollection, setNews ] = useState([])

    const [ fetchNews, isNewsLoading, newsError ] = useFetching(async () => {
        const response = await getNewsCollection({})
        setNews([ ...newsCollection, ...response.data ])
    })

    useEffect(() => {
        fetchNews()
    }, [])

    return <Grid container spacing={2}>
        <Grid
            lg={2}
            md={3}
            sm={4}
            xs={12}
            item
        >
            <AppLogo/>
            <AppNav/>
            <Button>Compare font</Button>
        </Grid>
        <Grid
            lg={10}
            md={9}
            sm={8}
            xs={12}
            item
        >
            <h1>Home page</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi, deleniti dicta dignissimos
                distinctio dolor ducimus eaque itaque officia perspiciatis quibusdam quidem quisquam sequi suscipit?
                Error id illo incidunt natus ullam.</p>
            {newsError &&
                <h1>Error: ${newsError}</h1>
            }
            {isNewsLoading
                ? <div>Loading...</div>
                : <div>
                    <NewsList
                        title="News"
                        items={newsCollection}
                    />
                </div>
            }

        </Grid>
    </Grid>
}

export default HomePage
