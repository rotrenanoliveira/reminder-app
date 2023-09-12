import { useEffect, useMemo, useState } from 'react'
import { differenceInSeconds } from './util/calc-date/difference-in-seconds'
import { calcDateTime } from './util/calc-datetime'
import './App.css'

export function App() {
  const laterDate = useMemo(() => {
    return new Date(2023, 8, 25, 21, 0)
  }, [])

  const [remainingSeconds, setRemainingSeconds] = useState(differenceInSeconds(laterDate, new Date()))

  const [eventDate, setEventDate] = useState({ days: '00h', hours: '00h', minutes: '00m', seconds: '00s' })
  const { days, hours, minutes, seconds } = eventDate

  useEffect(() => {
    const interval = setInterval(() => {
      const secondsDiff = differenceInSeconds(laterDate, new Date())

      if (secondsDiff !== 0) {
        setRemainingSeconds((seconds) => seconds - 1)
        setEventDate(calcDateTime(remainingSeconds))
      } else {
        clearInterval(interval)
      }
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [remainingSeconds, laterDate])

  return (
    <>
      <h1>Countdown - Reminder me</h1>
      <div className="countdown-card">
        <div className="countdown-timers">
          <span>{days}</span>
          <span>{hours}</span>
          <span>{minutes}</span>
          <span>{seconds}</span>
        </div>

        <span>My event</span>
      </div>
    </>
  )
}
