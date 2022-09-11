const withBundleAnalyzer = require("@next/bundle-analyzer")({
	enabled: process.env.ANALYZE === "true"
});
const withPWA = require('next-pwa')({
	dest: 'public'
})
const withPreact = require("next-plugin-preact");

/** @type {import('next').NextConfig} */
const nextConfig = withPWA(withPreact(
	withBundleAnalyzer({
		reactStrictMode: true,
		swcMinify: true,
		output: "standalone",
		experimental: {
			esmExternals: false,
		},
	})
));

module.exports = nextConfig;
