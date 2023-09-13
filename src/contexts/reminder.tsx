import React, { createContext, useMemo, useState } from 'react'
import { differenceInSeconds } from '../util/calc-date/difference-in-seconds'
import { haskey } from '../util/has-key'

interface ReminderContextType {
  reminders: Reminder[]
  currentReminder: Reminder
  createNewReminder: ({ reminderOf, reminderAt }: ReminderCreateInput) => void
  completeReminder: (createdAt: Date) => void
}

export const ReminderContext = createContext({} as ReminderContextType)

interface ReminderContextProviderProps {
  children: React.ReactNode
}

export function ReminderContextProvider({ children }: ReminderContextProviderProps) {
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

  function createNewReminder({ reminderOf, reminderAt }: ReminderCreateInput) {
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
  }

  function completeReminder(createdAt: Date) {
    const reminder = reminders.find((reminder) => reminder.created_at.getTime() === createdAt.getTime())

    if (!reminder) {
      throw new Error('Remind not found')
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
  }

  return (
    <ReminderContext.Provider value={{ reminders, currentReminder, createNewReminder, completeReminder }}>
      {children}
    </ReminderContext.Provider>
  )
}
