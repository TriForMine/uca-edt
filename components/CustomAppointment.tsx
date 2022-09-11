import * as React from 'react'
import {Appointments} from '@devexpress/dx-react-scheduler-material-ui'
import AppointmentProps = Appointments.AppointmentProps
import AppointmentContentProps = Appointments.AppointmentContentProps

export const CustomAppointmentContent = ({
											 type,
											 children,
											 ...restProps
										 }: AppointmentContentProps) => {
	const rgbColor = hex2rgb(restProps?.data?.color.slice(1) || 'FFC107')
	let foreground

	if (
		rgbColor &&
		(rgbColor.r * 299 + rgbColor.g * 587 + rgbColor.b * 114) / 1000 >= 128
	) {
		foreground = '#000000'
	} else {
		foreground = '#ffffff'
	}

	return (
		<Appointments.AppointmentContent
			{...restProps}
			type={type}
			style={{
				color: foreground,
			}}
		>
			{children}
		</Appointments.AppointmentContent>
	)
}

function hex2rgb(hex: string) {
	const validHEXInput = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
	if (!validHEXInput) {
		return false
	}
	return {
		r: parseInt(validHEXInput[1], 16),
		g: parseInt(validHEXInput[2], 16),
		b: parseInt(validHEXInput[3], 16),
	}
}

export const CustomAppointment = ({
									  children,
									  ...restProps
								  }: AppointmentProps) => {
	return (
		<Appointments.Appointment
			{...restProps}
			style={{
				backgroundColor: restProps?.data?.color || '#FFC107',
				borderRadius: '8px',
			}}
		>
			{children}
		</Appointments.Appointment>
	)
}
