import * as React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import theme from "../src/theme";
import createEmotionCache from "../src/createEmotionCache";
import "../styles/auth_code.css";
import { DefaultSeo } from "next-seo";
import { SWRConfig } from "swr";
import axios from "axios";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
	emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
	const {
		Component,
		emotionCache = clientSideEmotionCache,
		pageProps,
	} = props;
	return (
		<SWRConfig
			value={{
				refreshInterval: 3000,
				fetcher: (url) =>
					axios
						.get(url, {
							baseURL: "https://api-uca-edt.triformine.dev/api",
						})
						.then((res) => res.data),
			}}
		>
			<CacheProvider value={emotionCache}>
				<DefaultSeo
					titleTemplate="%s | EDT UCA"
					openGraph={{
						type: "website",
						locale: "fr_FR",
						url: "https://www.url.ie/",
						site_name: "EDT UCA",
					}}
				/>
				<Head>
					<meta
						name="viewport"
						content="initial-scale=1, width=device-width"
					/>
				</Head>
				<ThemeProvider theme={theme}>
					{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
					<CssBaseline />
					<Component {...pageProps} />
				</ThemeProvider>
			</CacheProvider>
		</SWRConfig>
	);
}
