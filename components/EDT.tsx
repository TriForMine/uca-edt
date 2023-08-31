'use client'
import 'devextreme/dist/css/dx.dark.css'

import { Resource, Scheduler, Scrolling } from 'devextreme-react/scheduler'
import { Appointment } from 'devextreme/ui/scheduler'
import React from 'react'
import frMessages from 'devextreme/localization/messages/fr.json'
import { locale, loadMessages } from 'devextreme/localization'
import Devices from 'devextreme/core/devices'

const contrastColor = (c: string) =>
    ['text-black', 'text-white'][
        ~~(
            [0.299, 0.587, 0.114].reduce(
                (r, v, i) => parseInt(c.substr(i * 2 + 1, 2), 16) * v + r,
                0
            ) < 128
        )
    ]

const renderAppointment = (model: any) => {
    const { targetedAppointmentData } = model.data

    return (
        <React.Fragment>
            <p
                className={`${contrastColor(
                    targetedAppointmentData.color
                )} text-bold text-base`}
            >
                {targetedAppointmentData.text}
            </p>
            <p className={`${contrastColor(targetedAppointmentData.color)}`}>
                {targetedAppointmentData.startDate.toLocaleTimeString('fr-FR', {
                    hour: '2-digit',
                    minute: '2-digit',
                })}{' '}
                -{' '}
                {targetedAppointmentData.endDate.toLocaleTimeString('fr-FR', {
                    hour: '2-digit',
                    minute: '2-digit',
                })}
            </p>
            <p className={`${contrastColor(targetedAppointmentData.color)}`}>
                {targetedAppointmentData.room}
            </p>
        </React.Fragment>
    )
}

export const EDT = ({
    schedulerData,
    colors,
    rooms,
}: {
    schedulerData: Array<Appointment>
    colors: Array<{
        id: string
        color: string
        text: string
    }>
    rooms: Array<{
        id: string
        color: string
        text: string
    }>
}) => {
    loadMessages(frMessages)
    locale('fr')

    return (
        <div>
            <Scheduler
                timeZone={'Europe/Paris'}
                dataSource={schedulerData}
                editing={false}
                defaultCurrentView={Devices.real().phone ? 'day' : 'workWeek'}
                views={['workWeek', 'day']}
                showCurrentTimeIndicator
                adaptivityEnabled={Devices.real().phone}
                startDayHour={8}
                endDayHour={20}
                cellDuration={60}
                showAllDayPanel={false}
                firstDayOfWeek={1}
                appointmentComponent={renderAppointment}
            >
                <Scrolling mode="virtual" />
                <Resource
                    dataSource={colors}
                    fieldExpr="course"
                    label="Cours"
                    useColorAsDefault
                />
                <Resource dataSource={rooms} fieldExpr="room" label="Salle" />
            </Scheduler>
        </div>
    )
}

export default EDT
