import * as React from 'react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { INEForm } from '../components/LoginForm'
import NextLink from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
    metadataBase: new URL('https://uca-edt.triformine.dev'),
    title: 'Connexion | Emploi du Temps - UCA',
    description:
        "Ce site est fait par des étudiants pour les étudiants du Campus Valrose. Il permet d'obtenir votre emploi du temps, en fournissant votre numéro étudiant.",
    openGraph: {
        type: 'website',
        locale: 'fr_FR',
        siteName: 'EDT UCA',
    },
    alternates: {
        canonical: `/`,
    },
}

export default function Page({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    const cookieStore = cookies()
    const ine_cookie = cookieStore.get('ine')

    if (ine_cookie && !searchParams['invalid']) {
        redirect(`/edt/${ine_cookie.value}`)
    }

    return (
        <>
            <h1 className="pb-4 text-center text-5xl font-bold">
                Emploi du Temps - UCA
            </h1>
            <h2 className="mt-2 text-center text-lg">
                Un site pour consulter votre emploi du temps. <br /> Créé par{' '}
                <NextLink
                    href="https://github.com/triformine"
                    passHref
                    target="_blank"
                    className="text-blue-400"
                >
                    TriForMine
                </NextLink>{' '}
                et{' '}
                <NextLink
                    href="https://github.com/corentings"
                    passHref
                    target="_blank"
                    className="text-blue-400"
                >
                    CorentinGS
                </NextLink>
                .
            </h2>
            <div className="mt-auto flex flex-row items-center pb-4 pt-5">
                <h2 className="text-center text-2xl font-bold">
                    Veuillez rentrer votre numéro étudiant (INE)
                </h2>
                <div
                    className="tooltip ml-2"
                    data-tip="Vous pouvez le retrouver sur votre carte étudiante."
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-6 w-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                        />
                    </svg>
                </div>
            </div>
            {searchParams['invalid'] === 'true' ? (
                <div className="text-center text-error">
                    Le numéro étudiant rentré n&apos;existe pas dans notre base
                    de donnée.
                </div>
            ) : (
                ''
            )}
            <INEForm error={searchParams['invalid'] === 'true'} />
        </>
    )
}
