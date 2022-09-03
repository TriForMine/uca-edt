import * as React from "react";
import { Appointments } from "@devexpress/dx-react-scheduler-material-ui";
import AppointmentProps = Appointments.AppointmentProps;
import AppointmentContentProps = Appointments.AppointmentContentProps;

export const CustomAppointmentContent = ({
	type,
	children,
	...restProps
}: AppointmentContentProps) => {
	return (
		<Appointments.AppointmentContent {...restProps} type={type}>
			{children}
		</Appointments.AppointmentContent>
	);
};

export const CustomAppointment = ({
	children,
	...restProps
}: AppointmentProps) => {
	return (
		<Appointments.Appointment
			{...restProps}
			style={{
				backgroundColor: restProps?.data?.color || "#FFC107",
				borderRadius: "8px",
			}}
		>
			{children}
		</Appointments.Appointment>
	);
};
