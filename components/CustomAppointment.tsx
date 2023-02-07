import * as React from 'react'
import { Appointments } from '@devexpress/dx-react-scheduler-material-ui'
import AppointmentProps = Appointments.AppointmentProps
import AppointmentContentProps = Appointments.AppointmentContentProps
import classNames from 'clsx'
// @ts-ignore
import { HOUR_MINUTE_OPTIONS } from '@devexpress/dx-scheduler-core'

const addCommaAndSpaceToString = (string: string | undefined) =>
    string && `${string},\xa0`

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

    const PREFIX = `${type[0].toUpperCase()}${type.slice(1)}Appointment`

    const classes = {
        title: `${PREFIX}-title`,
        textContainer: `${PREFIX}-textContainer`,
        middleContainer: `${PREFIX}-middleContainer`,
        time: `${PREFIX}-time`,
        content: `${PREFIX}-content`,
        shortContent: `${PREFIX}-shortContent`,
        shortContainer: `${PREFIX}-shortContainer`,
        shortTime: `${PREFIX}-shortTime`,
        shortTitle: `${PREFIX}-shortTitle`,
        container: `${PREFIX}-container`,
        recurringContainer: `${PREFIX}-recurringContainer`,
        imageContainer: `${PREFIX}-imageContainer`,
        image: `${PREFIX}-image`,
    }

    const RecurringIcon = restProps.recurringIconComponent

    const repeat = !!restProps.data.rRule
    const isShortHeight = restProps.durationType === 'short'
    const isMiddleHeight = restProps.durationType === 'middle'

    return (
        <Appointments.AppointmentContent
            {...restProps}
            type={type}
            style={{
                color: foreground,
            }}
        >
            <React.Fragment>
                <div
                    className={classNames({
                        [classes.container]: !repeat,
                        [classes.recurringContainer]: repeat,
                    })}
                >
                    {isShortHeight ? (
                        <div className={classes.shortContainer}>
                            <div
                                className={classNames(
                                    classes.title,
                                    classes.shortTitle
                                )}
                            >
                                {addCommaAndSpaceToString(restProps.data.title)}
                            </div>
                            <div
                                className={classNames(
                                    classes.time,
                                    classes.shortTime
                                )}
                            >
                                {restProps.formatDate(
                                    restProps.data.startDate,
                                    HOUR_MINUTE_OPTIONS
                                )}
                            </div>
                        </div>
                    ) : (
                        <React.Fragment>
                            <div className={classes.title}>
                                {restProps.data.title}
                            </div>
                            <div
                                className={classNames({
                                    [classes.textContainer]: true,
                                    [classes.middleContainer]: isMiddleHeight,
                                })}
                            >
                                <div className={classes.time}>
                                    {restProps.formatDate(
                                        restProps.data.startDate,
                                        HOUR_MINUTE_OPTIONS
                                    )}
                                </div>
                                <div className={classes.time}>
                                    &nbsp; - &nbsp;
                                </div>
                                <div className={classes.time}>
                                    {restProps.formatDate(
                                        restProps.data.endDate,
                                        HOUR_MINUTE_OPTIONS
                                    )}
                                </div>
                                <div>{restProps.data?.location}</div>
                            </div>
                        </React.Fragment>
                    )}
                </div>

                {repeat ? (
                    <div className={classes.imageContainer}>
                        {
                            // @ts-ignore
                            <RecurringIcon className={classes.image} />
                        }
                    </div>
                ) : undefined}
            </React.Fragment>
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
