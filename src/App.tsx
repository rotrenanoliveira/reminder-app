import { useContext } from 'react'
import { Countdown } from './components/Countdown'
import { ReminderContext } from './contexts/reminder'
import { RegisterReminderForm } from './components/Form/RegisterReminder'
import './App.css'

export function App() {
  const { reminders, currentReminder } = useContext(ReminderContext)

  return (
    <main>
      <h1>Countdown - Reminder me</h1>

      <RegisterReminderForm />

      {currentReminder && <Countdown />}

      <div className="countdown-list">
        {reminders.map((reminder) => {
          return (
            <p key={reminder.id}>
              {reminder.of} - {new Date(reminder.at).toLocaleString('pt-BR')}
            </p>
          )
        })}
      </div>
    </main>
  )
}
