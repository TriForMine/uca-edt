import * as React from 'react'
import type {NextPage} from 'next'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import {
	Alert,
	Button,
	IconButton,
	Stack,
	Tooltip,
	useTheme,
} from '@mui/material'
import Link from 'next/link'
import {useState} from 'react'
import AuthCode from 'react-auth-code-input'
import InfoIcon from '@mui/icons-material/Info'
import {NextSeo} from 'next-seo'
import {useRouter} from 'next/router'

const Home: NextPage = () => {
	const {query} = useRouter()
	const theme = useTheme()
	const [INE, setINE] = useState<number | undefined>()

	return (
		<>
			<NextSeo title="Connexion"/>
			<Stack direction="row">
				<Typography
					variant="h4"
					component="h1"
					gutterBottom
					textAlign="center"
				>
					Veuillez rentrer votre numéro étudiant (INE)
				</Typography>
				<Tooltip
					title="Vous pouvez le retrouver sur votre carte étudiante."
					sx={{marginBottom: '0.35em'}}
				>
					<IconButton>
						<InfoIcon color="info"/>
					</IconButton>
				</Tooltip>
			</Stack>
			{query?.invalid === 'true' ? (
				<Alert variant="outlined" severity="error">
					Le numéro étudiant rentrer n&apos;existe pas dans notre base
					de données.
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
			<Link href={`/edt/${INE}`} prefetch={INE !== undefined} passHref>
				<Button
					variant="contained"
					disabled={INE?.toString().length !== 8}
				>
					Confirmer
				</Button>
			</Link>
		</>
	)
}

export default Home
