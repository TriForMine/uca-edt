import * as React from 'react';
import type { NextPage } from 'next';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {Button, useTheme} from "@mui/material";
import Link from "next/link";
import {useState} from "react";
import AuthCode from "react-auth-code-input";

const Home: NextPage = () => {
    const theme = useTheme()
    const [INE, setINE] = useState<number | undefined>();

    return (
        <Container maxWidth="lg">
            <Box
                sx={{
                    my: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Typography variant="h4" component="h1" gutterBottom textAlign="center">
                    Veuillez rentrer votre numéro étudiant (INE)
                </Typography>
                <AuthCode containerClassName={`auth-container auth-container-${theme.palette.mode}`} length={8} allowedCharacters='numeric' onChange={(res) => setINE(parseInt(res))} />
                <Link href={`/edt/${INE}`} passHref>
                    <Button variant='contained' disabled={INE?.toString().length !== 8}>
                        Confirmer
                    </Button>
                </Link>
            </Box>
        </Container>
    );
};

export default Home;
