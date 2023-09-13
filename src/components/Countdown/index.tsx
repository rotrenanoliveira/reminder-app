import { useState, useEffect } from 'react'
import { differenceInSeconds } from '../../util/calc-date/difference-in-seconds'
import { calcDateTime } from '../../util/calc-datetime'

interface CountdownProps {
  reminder: Reminder
  completeReminder: (reminderId: string) => void
}

export function Countdown({ reminder, completeReminder }: CountdownProps) {
  // console.log(reminder)

  const [remainingSeconds, setRemainingSeconds] = useState(differenceInSeconds(reminder.at, new Date()))

  useEffect(() => {
    setRemainingSeconds(differenceInSeconds(reminder.at, new Date()))
  }, [reminder])

  const [eventDate, setEventDate] = useState({ days: '00h', hours: '00h', minutes: '00m', seconds: '00s' })
  const { days, hours, minutes, seconds } = eventDate

  useEffect(() => {
    // console.log(reminder)

    const interval = setInterval(() => {
      const secondsDiff = differenceInSeconds(reminder.at, new Date())

      if (secondsDiff > remainingSeconds) {
        setRemainingSeconds(secondsDiff)
      }

      if (secondsDiff !== 0) {
        setRemainingSeconds((seconds) => seconds - 1)
        setEventDate(calcDateTime(remainingSeconds))
      } else {
        completeReminder(reminder.id)
        clearInterval(interval)
      }
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [remainingSeconds, reminder, completeReminder])

  return (
    <div className="countdown-card">
      <div className="countdown-timers">
        <span>{days}</span>
        <span>{hours}</span>
        <span>{minutes}</span>
        <span>{seconds}</span>
      </div>

      <span>{reminder.of}</span>
    </div>
  )
}
