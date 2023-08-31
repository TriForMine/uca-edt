'use client'

import NextLink from 'next/link'
import * as React from 'react'

export default function Footer() {
    return (
        <footer className="footer footer-center mt-auto w-full rounded bg-base-200 p-10 text-base-content">
            <div>
                <p>
                    Copyright ©2022-{new Date().getFullYear()} - Tous droits
                    réservés -{' '}
                    <NextLink
                        href="https://github.com/triformine/uca-edt"
                        target="_blank"
                        className="text-blue-400"
                        rel="noopener noreferrer"
                    >
                        EDT UCA
                    </NextLink>{' '}
                    - Créé par{' '}
                    <NextLink
                        href="https://github.com/triformine"
                        target="_blank"
                        className="text-blue-400"
                        rel="noopener noreferrer"
                    >
                        TriForMine
                    </NextLink>{' '}
                    et{' '}
                    <NextLink
                        href="https://github.com/corentings"
                        target="_blank"
                        className="text-blue-400"
                        rel="noopener noreferrer"
                    >
                        CorentinGS
                    </NextLink>
                </p>
            </div>
        </footer>
    )
}
