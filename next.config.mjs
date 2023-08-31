const ContentSecurityPolicy = `default-src 'self'; script-src 'unsafe-inline' 'unsafe-eval' 'report-sample' 'self'; style-src 'unsafe-inline' 'report-sample' 'self'; object-src 'none'; base-uri 'self'; connect-src https://api-uca-edt.triformine.dev 'self'; font-src 'self' https://fonts.gstatic.com; frame-src 'self'; img-src 'self'; manifest-src 'self'; media-src 'self'; worker-src 'self';`

const securityHeaders = [
    {
        key: 'Content-Security-Policy',
        value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim(),
    },
    {
        key: 'X-XSS-Protection',
        value: '1; mode=block',
    },
    {
        key: 'Permissions-Policy',
        value: 'accelerometer=(), ambient-light-sensor=(), autoplay=(), battery=(), camera=(), cross-origin-isolated=(), display-capture=(), document-domain=(), encrypted-media=(), execution-while-not-rendered=(), execution-while-out-of-viewport=(), fullscreen=(), geolocation=(), gyroscope=(), keyboard-map=(), magnetometer=(), microphone=(), midi=(), navigation-override=(), payment=(), picture-in-picture=(), publickey-credentials-get=(), screen-wake-lock=(), sync-xhr=(), usb=(), web-share=(), xr-spatial-tracking=()',
    },
    {
        key: 'X-Frame-Options',
        value: 'SAMEORIGIN',
    },
    {
        key: 'X-Content-Type-Options',
        value: 'nosniff',
    },
    {
        key: 'Referrer-Policy',
        value: 'origin-when-cross-origin',
    },
    {
        key: 'Access-Control-Allow-Origin',
        value: '*',
    },
]

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    output: 'standalone',
    async headers() {
        return [
            {
                source: '/:path*',
                headers: securityHeaders,
            },
        ]
    },
    transpilePackages: [
        '@mui/system',
        '@mui/material',
        '@mui/icons-material',
        'rrule',
        '@devexpress/dx-react-core',
        '@devexpress/dx-scheduler-core',
        '@devexpress/dx-react-scheduler-material-ui',
        '@devexpress/dx-react-scheduler',
    ],
}

export default nextConfig
