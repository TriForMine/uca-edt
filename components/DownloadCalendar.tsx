'use client'
import * as React from 'react'

export const DownloadCalendar = ({
    ics,
    ine,
}: {
    ics?: string
    ine: string
}) => {
    let blobUrl

    if (ics) {
        const blob = new Blob([ics], {
            type: 'text/calendar',
        })
        blobUrl = URL.createObjectURL(blob)
    }

    return (
        <a
            className={`btn btn-success btn-outline btn-sm normal-case ${
                !ics && 'btn-disabled'
            }`}
            href={blobUrl}
            target="_blank"
            download={`edt-${ine}.ics`}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                />
            </svg>
            Télécharger le Calendrier (iCalendar)
        </a>
    )
}
