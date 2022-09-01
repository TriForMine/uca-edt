const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})
const withPreact = require('next-plugin-preact');

/** @type {import('next').NextConfig} */
const nextConfig = withPreact(withBundleAnalyzer({
  reactStrictMode: true,
  swcMinify: true
}))

module.exports = nextConfig
