import * as React from 'react'
import {AppointmentTooltip} from '@devexpress/dx-react-scheduler-material-ui'
import Grid from '@mui/material/Grid'
import Room from '@mui/icons-material/Room'
import {styled} from '@mui/material/styles'
import AppointmentContentProps = AppointmentTooltip.ContentProps

const PREFIX = 'Content'

const classes = {
	icon: `${PREFIX}-icon`,
	textCenter: `${PREFIX}-textCenter`,
	lens: `${PREFIX}-lens`,
}

const StyledGrid = styled(Grid)(() => ({
	[`&.${classes.textCenter}`]: {
		textAlign: 'center',
	},
}))

const StyledRoom = styled(Room)(({theme: {palette}}) => ({
	[`&.${classes.icon}`]: {
		color: palette.action.active,
	},
}))

const StyledContent = styled(AppointmentTooltip.Content)(
	({appointmentData}) => {
		return {
			[`& .${classes.lens}`]: {
				color: appointmentData?.color,
			},
		}
	}
)

export const CustomTooltipContent = ({
										 appointmentData,
										 ...restProps
									 }: AppointmentContentProps) => (
	<StyledContent {...restProps} appointmentData={appointmentData}>
		<Grid container alignItems="center">
			<StyledGrid item xs={2} className={classes.textCenter}>
				<StyledRoom className={classes.icon}/>
			</StyledGrid>
			<Grid item xs={10}>
				<span>{appointmentData?.location}</span>
			</Grid>
		</Grid>
	</StyledContent>
)
