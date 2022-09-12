import * as React from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider, EmotionCache } from '@emotion/react'
import theme from '../src/theme'
import createEmotionCache from '../src/createEmotionCache'
import '../styles/auth_code.css'
import { DefaultSeo } from 'next-seo'
import { SWRConfig } from 'swr'
import { api } from '../src/api'
import Footer from '../components/Footer'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
    emotionCache?: EmotionCache
}

export default function MyApp(props: MyAppProps) {
    const {
        Component,
        emotionCache = clientSideEmotionCache,
        pageProps,
    } = props
    return (
        <SWRConfig
            value={{
                refreshInterval: 3000,
                fetcher: (url) => api.get(url).then((res) => res.data),
            }}
        >
            <CacheProvider value={emotionCache}>
                <DefaultSeo
                    titleTemplate="%s | EDT UCA"
                    description="Ce site est fait par des étudiants pour les étudiants du Campus Valrose. Il permet d'obtenir votre emploi du temps, en fournissant votre numéro étudiant."
                    openGraph={{
                        type: 'website',
                        locale: 'fr_FR',
                        url: 'https://uca-edt.triformine.dev/',
                        site_name: 'EDT UCA',
                    }}
                />
                <Head>
                    <meta
                        name="viewport"
                        content="initial-scale=1, width=device-width"
                    />
                </Head>
                <ThemeProvider theme={theme}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            minHeight: '100vh',
                        }}
                    >
                        <CssBaseline />
                        <Container maxWidth="lg">
                            <Box
                                sx={{
                                    py: 3,
                                    px: 2,
                                    mt: 'auto',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <Component {...pageProps} />
                            </Box>
                        </Container>
                        <Footer />
                    </Box>
                </ThemeProvider>
            </CacheProvider>
        </SWRConfig>
    )
}
