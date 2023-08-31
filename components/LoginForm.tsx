'use client'

import { useState } from 'react'
import AuthCode from 'react-auth-code-input'
import NextLink from 'next/link'
import * as React from 'react'
import { setCookie } from 'cookies-next'

export function INEForm() {
    const [INE, setINE] = useState<number | undefined>()

    return (
        <div className="flex flex-col items-center justify-center">
            <AuthCode
                containerClassName={`auth-container`}
                length={8}
                allowedCharacters="numeric"
                onChange={(res) => setINE(parseInt(res))}
            />
            <NextLink
                href={`/edt/${INE}`}
                prefetch={INE !== undefined && INE.toString().length === 8}
            >
                <button
                    className="btn btn-success mt-2 "
                    onClick={() => {
                        setCookie('ine', INE?.toString(), {
                            maxAge: 30 * 24 * 60 * 60 * 1000,
                        })
                    }}
                    disabled={INE?.toString().length !== 8}
                >
                    Confirmer
                </button>
            </NextLink>
        </div>
    )
}
