'use client'
import Link from 'next/link'
import * as React from 'react'
import { deleteCookie } from 'cookies-next'

export const LogoutButton = () => {
    return (
        <Link
            href="/"
            className="btn btn-error btn-outline btn-sm normal-case"
            onClick={() => {
                deleteCookie('ine')
            }}
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
                    d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
            </svg>
            Changer d&apos;étudiant
        </Link>
    )
}
