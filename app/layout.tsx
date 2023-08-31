import * as React from 'react'
import Footer from '../components/Footer'
import './globals.css'

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="fr">
            <head>
                <meta name="application-name" content="EDT UCA" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta
                    name="apple-mobile-web-app-status-bar-style"
                    content="default"
                />
                <meta name="apple-mobile-web-app-title" content="EDT UCA" />
                <meta name="mobile-web-app-capable" content="yes" />

                <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="/favicon-32x32.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="/favicon-16x16.png"
                />

                <link rel="manifest" href="/manifest.webmanifest" />
                <link rel="shortcut icon" href="/favicon.ico" />

                <meta name="theme-color" content="#4B9CD3" />
                <link rel="shortcut icon" href="/favicon.ico" />

                <meta
                    name="viewport"
                    content="initial-scale=1, width=device-width"
                />
            </head>
            <body>
                <div className="flex min-h-screen flex-col items-center justify-center pt-6">
                    <div className="max-w-7xl px-4">{children}</div>
                    <Footer />
                </div>
            </body>
        </html>
    )
}
