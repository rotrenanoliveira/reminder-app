import { useContext } from 'react'
import { Countdown } from './components/Countdown'
import { ReminderContext } from './contexts/reminder'
import { RegisterReminderForm } from './components/Form/RegisterReminder'
import './App.css'
import { Header } from './components/Header'

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
