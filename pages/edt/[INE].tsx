import * as React from "react";
import type {
	GetStaticPaths,
	GetStaticProps,
	InferGetStaticPropsType,
	NextPage,
} from "next";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {
	Alert,
	Button,
	CircularProgress,
	Stack,
	useMediaQuery,
} from "@mui/material";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useTheme } from "@mui/system";
import axios from "axios";
import { useRouter } from "next/router";
import useSWR from "swr";
import { EDT } from "../../src/types";
import { NextSeo } from "next-seo";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const EDTTable = dynamic(() => import("../../components/EDT"));

const calculateDayOffset = (day: EDT["edt"][0]["day"]) => {
	switch (day) {
		case "Lundi":
			return 0;
		case "Mardi":
			return 1;
		case "Mercredi":
			return 2;
		case "Jeudi":
			return 3;
		case "Vendredi":
			return 4;
		default:
			return 0;
	}
};

function stringToColor(str: string) {
	let hash = 0;
	for (let i = 0; i < str.length; i++) {
		hash = str.charCodeAt(i) + ((hash << 3) - hash);
	}
	const color = Math.abs(hash).toString(16).substring(0, 6);

	return "#" + "000000".substring(0, 6 - color.length) + color;
}

function hourStringToHourMinutes(str?: string) {
	const splitted = str?.toLowerCase()?.includes("h")
		? str.toLowerCase()?.split("h")
		: str?.split(" ");

	return {
		hours: splitted?.[0] ? parseInt(splitted[0]) : 0,
		minutes: splitted?.[0] ? parseInt(splitted[1]) : 0,
	};
}

const EDT: NextPage = (
	props: InferGetStaticPropsType<typeof getStaticProps>
) => {
	const router = useRouter();
	const theme = useTheme();
	const showWeekView = useMediaQuery(theme.breakpoints.up("sm"));

	const { data: edt } = useSWR<EDT>(
		router?.query?.INE ? `/edt/${router.query.INE}` : null,
		{
			fallbackData: props.data,
		}
	);

	if (!edt) return <CircularProgress />;

	const schedulerData = edt.edt
		.filter((course) => {
			return !(
				course.type === "CM" &&
				edt.edt.find(
					(other_course) =>
						other_course.type !== "CM" &&
						course.name === other_course.name &&
						course.hour === other_course.hour &&
						course.day === other_course.day
				)
			);
		})
		.map((course) => {
			const startHour = hourStringToHourMinutes(
				course.hour
					?.replaceAll("8-10H", "08h00-10h00")
					.split("-")[0]
					.trim()
			);

			const endHour = hourStringToHourMinutes(
				course.hour
					?.replaceAll("8-10H", "08h00-10h00")
					.split("-")[1]
					.trim()
			);

			const startDate = new Date(
				2022,
				8,
				5 +
					calculateDayOffset(course.day) +
					(course.type != "CM" ? 7 : 0),
				startHour.hours,
				startHour.minutes
			);

			const endDate = new Date(
				2022,
				8,
				5 +
					calculateDayOffset(course.day) +
					(course.type != "CM" ? 7 : 0),
				endHour.hours,
				endHour.minutes
			);

			return {
				title: `${course.type} - ${course.name}`,
				color: stringToColor(`${course.name}`),
				location: course.salle,
				startDate,
				endDate,
				rRule: "FREQ=WEEKLY;COUNT=12",
			};
		});

	return (
		<>
			<NextSeo title="Votre Emploi Du Temps" />
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
						L&apos;emploi du temps est généré automatiquement, est
						peut contenir des erreurs.
						<br />
						Veuillez vous référer à votre emploi du temps officiel,
						ou aux dernières informations reçues.
					</Alert>
				</Box>
				<Suspense fallback={<CircularProgress />}>
					<EDTTable
						schedulerData={schedulerData}
						showWeekView={showWeekView}
					/>
				</Suspense>
			</Container>
		</>
	);
};

export const getStaticPaths: GetStaticPaths = async () => {
	return {
		paths: [],
		fallback: "blocking", // can also be true or 'blocking'
	};
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	try {
		// `getStaticProps` is executed on the server side.
		const edt = await axios
			.get<EDT>(
				`https://api-uca-edt.triformine.dev/api/edt/${params?.INE}`
			)
			.then((res) => res.data);

		if (!edt) {
			return {
				redirect: {
					destination: "/?invalid=true",
					permanent: false,
					// statusCode: 301
				},
			};
		}

		return {
			props: {
				edt,
			},
			revalidate: 360,
		};
	} catch (e) {
		return {
			redirect: {
				destination: "/?invalid=true",
				permanent: false,
				// statusCode: 301
			},
		};
	}
};

export default EDT;
