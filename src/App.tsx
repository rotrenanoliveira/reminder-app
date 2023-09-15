import { useContext } from 'react'
import { ReminderContext } from './contexts/reminder'
import { Header } from './components/header'
import { Countdown } from './components/countdown'
import { RegisterReminderForm } from './components/register-reminder'

import './styles/home.css'

export function App() {
  const { reminders, currentReminder } = useContext(ReminderContext)

  return (
    <main>
      <Header />

      {currentReminder && <Countdown />}

      <RegisterReminderForm />

      <div className="countdown-list">
        {reminders.map((reminder) => {
          return (
            <p className="countdown-item" key={reminder.id}>
              {reminder.of} - {new Date(reminder.at).toLocaleString('pt-BR')}
            </p>
          )
        })}
      </div>
    </main>
  )
}
