import { useContext } from 'react'
import { ReminderContext } from '../contexts/reminder'
import { Reminder } from './reminder'
import '../styles/reminder-list.css'

export function ReminderList() {
  const { reminders } = useContext(ReminderContext)

  return (
    <section className="reminder-list">
      {reminders.map((reminder) => {
        return <Reminder key={reminder.id} reminder={reminder} />
      })}
    </section>
  )
}
