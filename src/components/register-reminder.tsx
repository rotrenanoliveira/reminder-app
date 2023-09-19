import { FormEvent, useContext, useState } from 'react'
import { differenceInSeconds } from '../util/calc-date/difference-in-seconds'
import { ReminderContext } from '../contexts/reminder'
import '../styles/register-reminder-form.css'

export function RegisterReminderForm() {
  const { createNewReminder } = useContext(ReminderContext)

  const [errorMessage, setErrorMessage] = useState<string | null>(null)

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

    const reminderYear = reminderAt.split('-')[0] ? Number(reminderAt.split('-')[0]) : 0
    const currentYear = new Date().getFullYear()
    const isValidYear = reminderYear >= currentYear && reminderYear <= 2099

    if (!isValidYear) {
      return setErrorMessage(
        "Maybe you don't need to remember an event that far away, how about putting a closer date.",
      )
    }

    const reminder = {
      of: reminderOf,
      at: new Date(reminderAt),
    }

    const secondsDiff = differenceInSeconds(reminder.at, new Date())
    if (secondsDiff <= 0) {
      return setErrorMessage('How about remembering something that is yet to happen?')
    }

    createNewReminder({
      reminderOf: reminder.of,
      reminderAt: reminder.at,
    })

    event.currentTarget.reset()
    setErrorMessage(null)
  }

  function handleInputGroupOnFocus(event: React.FocusEvent<HTMLDivElement, Element>) {
    const elementClass = event.currentTarget.classList.value
    event.currentTarget.classList.value = elementClass.concat(' border-onfocus')
  }

  function handleInputGroupOnBlur(event: React.FocusEvent<HTMLDivElement, Element>) {
    event.currentTarget.classList.value = 'input-group'
  }

  return (
    <form onSubmit={handleCreateReminder}>
      <div className="inputs">
        <p>Remind me</p>

        <div className="input-group" onFocus={handleInputGroupOnFocus} onBlur={handleInputGroupOnBlur}>
          <label htmlFor="reminder-of">of:</label>
          <input type="text" name="reminder-of" id="reminder-of" required />
        </div>

        <div className="input-group" onFocus={handleInputGroupOnFocus} onBlur={handleInputGroupOnBlur}>
          <label htmlFor="reminder-at">at:</label>
          <input type="datetime-local" name="reminder-at" id="reminder-at" placeholder="" required />
        </div>
      </div>

      {errorMessage && <span className="form-error">{errorMessage}</span>}

      <button>Remind me</button>
    </form>
  )
}
