import { FormEvent, useContext } from 'react'
import { Countdown } from './components/Countdown'
import { ReminderContext } from './contexts/reminder'
import './App.css'

export function App() {
  const { reminders, currentReminder, createNewReminder, completeReminder } = useContext(ReminderContext)

  function handleCreateReminder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const reminderOf = formData.get('reminder-of')
    const reminderAt = formData.get('reminder-at')

    if (reminderOf === null && reminderAt === null) {
      throw new Error('Fields reminder-of and reminder-at is required.')
    }

    if (typeof reminderOf !== 'string') {
      throw new TypeError('Remind of should be a string')
    }

    if (typeof reminderAt !== 'string') {
      throw new TypeError('Remind at should be a string')
    }

    createNewReminder({
      reminderOf: reminderOf,
      reminderAt: new Date(reminderAt),
    })

    event.currentTarget.reset()
  }

  function handleCompleteReminder(reminderId: string) {
    completeReminder(reminderId)
  }

  return (
    <main>
      <h1>Countdown - Reminder me</h1>

      <form onSubmit={handleCreateReminder}>
        <div>
          <label htmlFor="reminder-of">Remind me of</label>
          <input type="text" name="reminder-of" required />
        </div>

        <div>
          <label htmlFor="reminder-at">Remind me at</label>
          <input type="datetime-local" name="reminder-at" required />
        </div>

        <button>Reminder me</button>
      </form>

      {currentReminder && <Countdown reminder={currentReminder} completeReminder={handleCompleteReminder} />}

      <div className="countdown-list">
        {reminders.map((reminder) => {
          return (
            <p key={reminder.id}>
              {reminder.of} - {reminder.at.toLocaleString('pt-BR')}
            </p>
          )
        })}
      </div>
    </main>
  )
}
