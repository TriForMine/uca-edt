import * as React from "react";
import type { GetStaticProps, NextPage } from "next";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
	Scheduler,
	WeekView,
	DayView,
	Appointments,
	CurrentTimeIndicator,
	DateNavigator,
	Toolbar,
	TodayButton,
	AppointmentTooltip,
} from "@devexpress/dx-react-scheduler-material-ui";
import {
	CustomAppointment,
	CustomAppointmentContent,
} from "../../components/CustomAppointment";
import { CustomTooltipContent } from "../../components/CustomAppointmentTooltip";
import { Alert, Button, Stack, useMediaQuery } from "@mui/material";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useTheme } from "@mui/system";
import axios from "axios";

const schedulerData = [
	{
		startDate: "2022-09-01T09:45",
		endDate: "2022-09-01T11:00",
		title: "TD Math Approfondissement",
		color: "#ff00ff",
		location: "M22",
	},
	{
		startDate: "2022-09-01T12:00",
		endDate: "2022-09-01T13:30",
		title: "CM Math Approfondissement",
		color: "#0ff000",
		location: "Amphi M",
	},
];

const Home: NextPage = () => {
	const theme = useTheme();
	const showWeekView = useMediaQuery(theme.breakpoints.up("sm"));

	return (
		<Container maxWidth="lg">
			<Box
				sx={{
					my: 4,
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Stack
					sx={{ width: "100%" }}
					direction="row"
					justifyContent="left"
				>
					<Link href="/" passHref>
						<Button startIcon={<ArrowBackIcon />} color="error">
							Changer d&apos;étudiant
						</Button>
					</Link>
				</Stack>

				<Typography variant="h4" component="h1" gutterBottom>
					Votre emploi du temps
				</Typography>

				<Alert variant="outlined" severity="warning">
					L&apos;emploi du temps est généré automatiquement, est peut
					contenir des erreurs.
					<br />
					Veuillez vous référer à votre emploi du temps officiel, ou
					aux dernières informations reçues.
				</Alert>
			</Box>
			{/*
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore */}
			<Scheduler locale="fr-fr" data={schedulerData}>
				<ViewState />
				{showWeekView ? (
					<WeekView
						cellDuration={60}
						excludedDays={[0, 6]}
						startDayHour={8}
						endDayHour={18}
					/>
				) : (
					<DayView
						cellDuration={60}
						startDayHour={8}
						endDayHour={18}
					/>
				)}
				<Appointments
					appointmentContentComponent={CustomAppointmentContent}
					appointmentComponent={CustomAppointment}
				/>
				<AppointmentTooltip
					contentComponent={CustomTooltipContent}
					showCloseButton
				/>
				<CurrentTimeIndicator
					shadePreviousAppointments
					shadePreviousCells
				/>
				<Toolbar />
				<DateNavigator />
				<TodayButton messages={{ today: "Aujourd'hui" }} />
			</Scheduler>
		</Container>
	);
};

export async function getStaticPaths() {
	return {
		paths: [],
		fallback: true, // can also be true or 'blocking'
	};
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	console.log(params);

	// `getStaticProps` is executed on the server side.
	const edt = await axios.get(
		`https://api-uca-edt.triformine.dev/api/edt/${params?.INE}`
	);
	const path = `/edt/${params?.INE}`;

	return {
		props: {
			fallback: {
				path: edt,
			},
		},
	};
};

export default Home;
