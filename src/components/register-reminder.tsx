import { FormEvent, useContext } from 'react'
import { ReminderContext } from '../contexts/reminder'

export function RegisterReminderForm() {
  const { createNewReminder } = useContext(ReminderContext)

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

  return (
    <form onSubmit={handleCreateReminder}>
      <div className="inputs-form">
        <span>Remind me</span>
        <div>
          <label htmlFor="reminder-of">of:</label>
          <input type="text" name="reminder-of" required />
        </div>

        <div>
          <label htmlFor="reminder-at">at:</label>
          <input type="datetime-local" name="reminder-at" placeholder="" required />
        </div>
      </div>

      <button>Remind me</button>
    </form>
  )
}
