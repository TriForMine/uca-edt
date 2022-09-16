import * as React from 'react'
import type { GetServerSideProps, NextPage } from 'next'
import Typography from '@mui/material/Typography'
import {
    Alert,
    Button,
    IconButton,
    Stack,
    Tooltip,
    useTheme,
} from '@mui/material'
import Link from '@mui/material/Link'
import { useState } from 'react'
import AuthCode from 'react-auth-code-input'
import InfoIcon from '@mui/icons-material/Info'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import { getCookie, setCookie } from 'cookies-next'

const Home: NextPage = () => {
    const { query } = useRouter()
    const theme = useTheme()
    const [INE, setINE] = useState<number | undefined>()

    return (
        <>
            <NextSeo
                title="Connexion"
                canonical="https://uca-edt.triformine.dev/"
            />
            <Typography
                variant="h3"
                component="h1"
                gutterBottom
                textAlign="center"
            >
                Emploi du Temps - UCA
            </Typography>
            <Typography variant="subtitle1" textAlign="center" gutterBottom>
                Un site pour consulter votre emploi du temps. <br /> Créé par{' '}
                <NextLink href="https://github.com/triformine" passHref>
                    <Link target="_blank" underline="none">
                        TriForMine
                    </Link>
                </NextLink>{' '}
                et{' '}
                <NextLink href="https://github.com/corentings" passHref>
                    <Link target="_blank" underline="none">
                        CorentinGS
                    </Link>
                </NextLink>
                .
            </Typography>
            <Stack sx={{ mt: 5 }} direction="row">
                <Typography
                    variant="h4"
                    component="h2"
                    gutterBottom
                    textAlign="center"
                >
                    Veuillez rentrer votre numéro étudiant (INE)
                </Typography>
                <Tooltip
                    title="Vous pouvez le retrouver sur votre carte étudiante."
                    sx={{ marginBottom: '0.35em' }}
                >
                    <IconButton>
                        <InfoIcon color="info" />
                    </IconButton>
                </Tooltip>
            </Stack>
            {query?.invalid === 'true' ? (
                <Alert variant="outlined" severity="error">
                    Le numéro étudiant rentré n&apos;existe pas dans notre base
                    de donnée.
                </Alert>
            ) : (
                ''
            )}
            <AuthCode
                containerClassName={`auth-container auth-container-${theme.palette.mode}`}
                length={8}
                allowedCharacters="numeric"
                onChange={(res) => setINE(parseInt(res))}
            />
            <NextLink
                href={`/edt/${INE}`}
                prefetch={INE !== undefined && INE.toString().length === 8}
                passHref
            >
                <Button
                    variant="contained"
                    onClick={() => {
                        setCookie('ine', INE?.toString())
                    }}
                    disabled={INE?.toString().length !== 8}
                >
                    Confirmer
                </Button>
            </NextLink>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    const INE = getCookie('ine', { req, res })

    if (INE) {
        return {
            redirect: {
                destination: `/edt/${INE}`,
                permanent: false,
            },
        }
    } else {
        return {
            props: {},
        }
    }
}

export default Home
