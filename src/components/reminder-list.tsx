import { useContext } from 'react'
import { ReminderContext } from '../contexts/reminder'
import '../styles/reminder-list.css'

export function ReminderList() {
  const { reminders } = useContext(ReminderContext)

  reminders.sort((a) => {
    if (a.status === 'in-progress') {
      return -1
    }

    return 1
  })

  return (
    <section className="reminder-list">
      {reminders.map((reminder) => {
        return (
          <div className={`reminder ${reminder.visibility === 'hidden' ? 'hidden-reminder' : ''}`} key={reminder.id}>
            <span className="reminder-of">{reminder.of}</span>{' '}
            <span className="reminder-at">{new Date(reminder.at).toLocaleString('pt-BR')}</span>
          </div>
        )
      })}
    </section>
  )
}
