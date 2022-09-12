import Paper from '@mui/material/Paper'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import NextLink from 'next/link'
import Link from '@mui/material/Link'
import * as React from 'react'

export default function Footer() {
    return (
        <Paper
            sx={{
                py: 2,
                px: 2,
                mt: 'auto',
            }}
            component="footer"
            square
        >
            <Container maxWidth="lg">
                <Box
                    sx={{
                        flexGrow: 1,
                        justifyContent: 'center',
                        display: 'flex',
                        py: 2,
                        mb: 0,
                    }}
                >
                    <Typography variant="caption">
                        Copyright ©2022 - Tous droits réservés -{' '}
                        <NextLink
                            href="https://github.com/triformine/uca-edt"
                            passHref
                        >
                            <Link underline="none">EDT UCA</Link>
                        </NextLink>{' '}
                        - Créé par{' '}
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
                    </Typography>
                </Box>
            </Container>
        </Paper>
    )
}
