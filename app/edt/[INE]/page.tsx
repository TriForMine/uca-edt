import { EDT } from '@/types'
import { ICalendar } from 'datebook'
import * as React from 'react'
import dynamic_import from 'next/dynamic'
import { DownloadCalendar } from '../../../components/DownloadCalendar'
import { LogoutButton } from '../../../components/LogoutButton'
import type { Appointment } from 'devextreme/ui/scheduler/'
import { deleteCookie } from 'cookies-next'
import { redirect } from 'next/navigation'
import { Metadata, ResolvingMetadata } from 'next'

const EDTTable = dynamic_import(() => import('../../../components/EDT'), {
    ssr: true,
    loading: () => <span className="loading loading-ring loading-lg"></span>,
})

const calculateDayOffset = (day: EDT['edt'][0]['day']) => {
    switch (day) {
        case 'Lundi':
            return 0
        case 'Mardi':
            return 1
        case 'Mercredi':
            return 2
        case 'Jeudi':
            return 3
        case 'Vendredi':
            return 4
        default:
            return 0
    }
}

function stringToColor(str: string) {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 3) - hash)
    }
    const color = Math.abs(hash).toString(16).substring(0, 6)

    return '#' + '000000'.substring(0, 6 - color.length) + color
}

function hourStringToHourMinutes(str?: string) {
    const splitted = str?.toLowerCase()?.includes('h')
        ? str.toLowerCase()?.split('h')
        : str?.split(' ')

    return {
        hours: splitted?.[0] ? parseInt(splitted[0]) : 0,
        minutes: splitted?.[0] ? parseInt(splitted[1]) : 0,
    }
}

async function getCalendar(INE: string): Promise<EDT | undefined> {
    const edt = await fetch(
        `https://api-uca-edt.triformine.dev/api/edt/${INE}`,
        {
            next: {
                revalidate: 360,
            },
        }
    ).then((res) => res.json())

    if (edt.error) return undefined

    return edt
}

export const dynamicParams = true
export const dynamic = 'auto'

type Props = {
    params: { INE: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    return {
        metadataBase: new URL('https://uca-edt.triformine.dev'),
        title: 'Votre Emploi Du Temps | Emploi du Temps - UCA',
        description:
            "Ce site est fait par des étudiants pour les étudiants du Campus Valrose. Il permet d'obtenir votre emploi du temps, en fournissant votre numéro étudiant.",
        openGraph: {
            type: 'website',
            locale: 'fr_FR',
            siteName: 'EDT UCA',
        },
        alternates: {
            canonical: `/edt/${params.INE}`,
        },
    }
}

export default async function Page({ params }: { params: { INE: string } }) {
    const edt = await getCalendar(params.INE)
    let icalendar: ICalendar | null = null

    if (!edt) {
        deleteCookie('ine')
        redirect('/?invalid=true')
    }

    const schedulerData: Array<Appointment> = edt.edt
        .filter((course) => {
            return !(
                course.type === 'CM' &&
                edt.edt.find(
                    (other_course) =>
                        other_course.type !== 'CM' &&
                        course.name === other_course.name &&
                        course.hour === other_course.hour &&
                        course.day === other_course.day
                )
            )
        })
        .map((course) => {
            const startHour = hourStringToHourMinutes(
                course.hour
                    ?.replaceAll('8-10H', '08h00-10h00')
                    .split('-')[0]
                    .trim()
            )

            const endHour = hourStringToHourMinutes(
                course.hour
                    ?.replaceAll('8-10H', '08h00-10h00')
                    .split('-')[1]
                    .trim()
            )

            const startDate = new Date(
                2023,
                0,
                16 +
                    calculateDayOffset(course.day) +
                    (course.type != 'CM' &&
                    course.name !==
                        "Concepts d'Intelligence artificifielle  (CIA)"
                        ? 7
                        : 0) +
                    (course.name === 'ANGLAIS' ? 14 : 0) +
                    (course.name ===
                    "Concepts d'Intelligence artificifielle  (CIA)"
                        ? 77
                        : 0) +
                    (course.name === 'Systèmes 2 (S2) - TP' ? 14 : 0),
                startHour.hours,
                startHour.minutes
            )

            const endDate = new Date(
                2023,
                0,
                16 +
                    calculateDayOffset(course.day) +
                    (course.type != 'CM' &&
                    course.name !==
                        "Concepts d'Intelligence artificifielle  (CIA)"
                        ? 7
                        : 0) +
                    (course.name ===
                    "Concepts d'Intelligence artificifielle  (CIA)"
                        ? 77
                        : 0) +
                    (course.name === 'ANGLAIS' ? 14 : 0) +
                    (course.name === 'Systèmes 2 (S2) - TP' ? 14 : 0),
                endHour.hours,
                endHour.minutes
            )

            let newCalendar = new ICalendar({
                title: `${course.type} - ${course.name}`,
                location: course.salle,
                start: startDate,
                end: endDate,
                recurrence: {
                    frequency: 'WEEKLY',
                    count: 14,
                },
            })

            if (!icalendar) {
                icalendar = newCalendar
            } else {
                icalendar.addEvent(newCalendar)
            }

            return {
                text: `${course.type} - ${course.name}`,
                type: course.type,
                course: course.name,
                color: course.name ? stringToColor(course.name) : '#000000',
                room: course.salle,
                startDate,
                endDate,
                recurrenceRule: 'FREQ=WEEKLY;COUNT=14',
            }
        })

    const colors: Array<{
        id: string
        color: string
        text: string
    }> = []

    schedulerData.forEach((appointment) => {
        const color = stringToColor(appointment.course)

        if (!colors.find((color) => color.id === appointment.course)) {
            colors.push({
                color,
                id: appointment.course,
                text: appointment.course,
            })
        }
    })

    const rooms: Array<{
        id: string
        color: string
        text: string
    }> = []

    schedulerData.forEach((appointment) => {
        const color = stringToColor(appointment.room)

        if (!rooms.find((color) => color.id === appointment.room)) {
            rooms.push({
                color,
                id: appointment.room,
                text: appointment.room,
            })
        }
    })

    return (
        <>
            <div className="w-full justify-start">
                <LogoutButton />
            </div>

            <h1 className="py-2 pb-4 text-center text-4xl font-bold">
                Votre emploi du temps
            </h1>

            <div className="alert alert-warning">
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
                        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                    />
                </svg>
                L&apos;emploi du temps est généré automatiquement, et peut
                contenir des erreurs.
                <br />
                Veuillez vous référer à votre emploi du temps officiel, ou aux
                dernières informations reçues.
            </div>

            <div className="flex w-full flex-col items-center justify-center py-8">
                <DownloadCalendar
                    ics={(
                        icalendar as unknown as ICalendar | undefined
                    )?.render()}
                    ine={params.INE}
                />
            </div>
            <EDTTable
                schedulerData={schedulerData}
                colors={colors}
                rooms={rooms}
            />
        </>
    )
}
