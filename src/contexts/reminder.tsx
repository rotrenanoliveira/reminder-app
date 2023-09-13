import React, { createContext, useMemo, useState } from 'react'
import { differenceInSeconds } from '../util/calc-date/difference-in-seconds'
import { v4 as uuid } from 'uuid'
import { z } from 'zod'

interface ReminderContextType {
  reminders: Reminder[]
  currentReminder: Reminder
  createNewReminder: ({ reminderOf, reminderAt }: ReminderCreateInput) => void
  completeReminder: (reminderId: string) => void
}

const reminderSchema = z.object({
  id: z.string().uuid(),
  of: z.string(),
  at: z.coerce.date(),
  status: z.enum(['completed', 'in-progress']),
  visibility: z.enum(['hidden', 'visible']),
  createdAt: z.coerce.date(),
})

export const ReminderContext = createContext({} as ReminderContextType)

interface ReminderContextProviderProps {
  children: React.ReactNode
}

export function ReminderContextProvider({ children }: ReminderContextProviderProps) {
  const [reminders, setReminders] = useState<Reminder[]>(() => {
    const stringifiedData = localStorage.getItem('@reminder-me:countdown')

    if (stringifiedData === null) {
      return []
    }

    const parsedData: Reminder[] = JSON.parse(stringifiedData)

    const reminders = parsedData
      .map((data) => {
        const parsedReminder = reminderSchema.safeParse(data)
        if (parsedReminder.success === true) {
          return parsedReminder.data
        }
      })
      .filter((data): data is Reminder => data !== undefined)

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
      id: uuid(),
      of: String(reminderOf),
      at: new Date(String(reminderAt)),
      createdAt: new Date(),
      visibility: 'visible',
      status: 'in-progress',
    }

    setReminders((state) => {
      const reminders = [reminder, ...state]
      localStorage.setItem('@reminder-me:countdown', JSON.stringify(reminders))

      return reminders
    })
  }

  function completeReminder(reminderId: string) {
    const reminder = reminders.find((reminder) => reminder.id === reminderId)

    if (!reminder) {
      throw new Error('Remind not found')
    }

    setReminders((state) => {
      const reminders = state.map((reminder) => {
        if (reminder.id !== reminderId) {
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
