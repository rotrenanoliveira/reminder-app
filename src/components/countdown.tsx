import { useState, useEffect, useContext } from 'react'
import { ReminderContext } from '../contexts/reminder'
import { calcDateTime } from '../util/calc-datetime'
import { differenceInSeconds } from '../util/calc-date/difference-in-seconds'
import '../styles/countdown.css'

export function Countdown() {
  const { currentReminder, remainingSeconds, setSecondsRemaining, completeReminder } = useContext(ReminderContext)

  const [eventDate, setEventDate] = useState({ days: '00h', hours: '00h', minutes: '00m', seconds: '00s' })
  const { days, hours, minutes, seconds } = eventDate

  useEffect(() => {
    let interval: number

    if (currentReminder) {
      setEventDate(calcDateTime(remainingSeconds))

      interval = setInterval(() => {
        const secondsDiff = differenceInSeconds(currentReminder.at, new Date())

        if (secondsDiff <= remainingSeconds && secondsDiff !== 0) {
          setSecondsRemaining(secondsDiff)
        } else {
          setSecondsRemaining(secondsDiff)

          completeReminder(currentReminder.id)
          clearInterval(interval)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [currentReminder, remainingSeconds, completeReminder, setSecondsRemaining])

  if (!currentReminder) {
    return <></>
  }

  return (
    <div className="countdown">
      <div className="countdown-timers">
        <span>{days}</span>
        <span>{hours}</span>
        <span>{minutes}</span>
        <span>{seconds}</span>
      </div>

      <div className="divider" />

      <span className="description">{currentReminder.of}</span>
    </div>
  )
}
