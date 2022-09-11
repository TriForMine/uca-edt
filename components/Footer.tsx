import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "next/link";

export default function Footer() {
	return (
		<Paper
			sx={{
				py: 3,
				px: 2,
				mt: "auto",
			}}
			component="footer"
			square
		>
			<Container maxWidth="lg">
				<Box
					sx={{
						flexGrow: 1,
						justifyContent: "center",
						display: "flex",
						py: 2,
						mb: 0,
					}}
				>
					<Typography variant="caption">
						Copyright ©2022 - All right reserved -{" "}
						<Link href="https://github.com/triformine/uca-edt">
							EDT UCA
						</Link>
					</Typography>
				</Box>
			</Container>
		</Paper>
	);
}
