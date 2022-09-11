import {AppointmentModel, ViewState} from '@devexpress/dx-react-scheduler'
import {
	Scheduler,
	WeekView,
	DayView,
	Appointments,
	CurrentTimeIndicator,
	DateNavigator,
	Toolbar,
	TodayButton,
	AppointmentTooltip,
} from '@devexpress/dx-react-scheduler-material-ui'
import {
	CustomAppointment,
	CustomAppointmentContent,
} from './CustomAppointment'
import {CustomTooltipContent} from './CustomAppointmentTooltip'

export default function EDT({
								showWeekView,
								schedulerData,
							}: {
	showWeekView: boolean
	schedulerData: Array<AppointmentModel>
}) {
	return (
		/*
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore */
		<Scheduler locale="fr-fr" data={schedulerData}>
			<ViewState/>
			{showWeekView ? (
				<WeekView
					cellDuration={60}
					excludedDays={[0, 6]}
					startDayHour={8}
					endDayHour={20}
				/>
			) : (
				<DayView cellDuration={60} startDayHour={8} endDayHour={20}/>
			)}
			<Appointments
				appointmentContentComponent={CustomAppointmentContent}
				appointmentComponent={CustomAppointment}
			/>
			<AppointmentTooltip
				contentComponent={CustomTooltipContent}
				showCloseButton
			/>
			<CurrentTimeIndicator
				shadePreviousAppointments
				shadePreviousCells
			/>
			<Toolbar/>
			<DateNavigator/>
			<TodayButton messages={{today: "Aujourd'hui"}}/>
		</Scheduler>
	)
}
