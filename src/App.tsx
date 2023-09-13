import { FormEvent, useMemo, useState } from 'react'
import { differenceInSeconds } from './util/calc-date/difference-in-seconds'
import { Countdown } from './components/Countdown'
import { haskey } from './util/has-key'
import './App.css'

export function App() {
  const [reminders, setReminders] = useState<Reminder[]>(() => {
    const stringifiedReminders = localStorage.getItem('@reminder-me:countdown')

    if (stringifiedReminders === null) {
      return []
    }

    const parsedReminders: unknown[] = JSON.parse(stringifiedReminders)

    const reminders: Reminder[] = parsedReminders.map((reminder) => {
      if (!(reminder && typeof reminder === 'object')) {
        throw new TypeError('reminder is not assigned correctly')
      }

      if (
        !haskey('at', reminder) ||
        !haskey('of', reminder) ||
        !haskey('status', reminder) ||
        !haskey('visibility', reminder) ||
        !haskey('created_at', reminder)
      ) {
        throw new TypeError('reminder is not assigned correctly')
      }

      if (
        !(typeof reminder.at === 'string') ||
        !(typeof reminder.of === 'string') ||
        !(typeof reminder.created_at === 'string')
      ) {
        throw new TypeError('reminder is not assigned correctly')
      }

      if (reminder.status !== 'completed' && reminder.status !== 'in-progress') {
        throw new TypeError('reminder is not assigned correctly')
      }

      if (reminder.visibility !== 'hidden' && reminder.visibility !== 'visible') {
        throw new TypeError('reminder is not assigned correctly')
      }

      return {
        of: reminder.of,
        at: new Date(reminder.at),
        created_at: new Date(reminder.created_at),
        visibility: reminder.visibility,
        status: reminder.status,
      }
    })

    return reminders
  })

  const remindersInProgress = reminders.filter((reminder) => reminder.status === 'in-progress')

  const currentReminder = useMemo(() => {
    return remindersInProgress.sort((a, b) => {
      const aSecondsDiff = differenceInSeconds(a.at, new Date())
      const bSecondsDiff = differenceInSeconds(b.at, new Date())

      if (aSecondsDiff < bSecondsDiff) {
        return -1
      }

      if (aSecondsDiff > bSecondsDiff) {
        return 1
      }

      return 0
    })[0]
  }, [remindersInProgress])

  function handleCreateReminder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const reminderOf = formData.get('reminder-of')
    const reminderAt = formData.get('reminder-at')

    if (reminderOf === null || reminderAt === null) {
      throw new Error('Reminder me of or at could no be null.')
    }

    const reminder: Reminder = {
      created_at: new Date(),
      of: String(reminderOf),
      at: new Date(String(reminderAt)),
      visibility: 'visible',
      status: 'in-progress',
    }

    setReminders((state) => {
      const reminders = [reminder, ...state]
      localStorage.setItem('@reminder-me:countdown', JSON.stringify(reminders))

      return reminders
    })

    event.currentTarget.reset()
  }

  function handleCompleteReminder(createdAt: Date) {
    const reminder = reminders.find((reminder) => reminder.created_at.getTime() === createdAt.getTime())

    if (!reminder) {
      // throw new Error('Remind not found')
      console.warn('Remind not found')

      return
    }

    setReminders((state) => {
      const reminders = state.map((reminder) => {
        if (reminder.created_at.getTime() !== createdAt.getTime()) {
          return reminder
        }

        reminder.status = 'completed'
        reminder.visibility = 'hidden'

        return {
          ...reminder,
        }
      })

      localStorage.setItem('@reminder-me:countdown', JSON.stringify(reminders))

      return reminders
    })

    console.log(reminders)
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
            <p key={reminder.created_at.getTime()}>
              {reminder.of} - {reminder.at.toLocaleString('pt-BR')}
            </p>
          )
        })}
      </div>
    </main>
  )
}
