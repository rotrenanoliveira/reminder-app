import React, { createContext, useEffect, useMemo, useReducer } from 'react'
import { completeReminderAction, createReminder } from '../reducers/reminders/actions'
import { differenceInSeconds } from '../util/calc-date/difference-in-seconds'
import { reminderReducer } from '../reducers/reminders/reducer'
import { v4 as uuid } from 'uuid'

interface ReminderContextType {
  reminders: Reminder[]
  currentReminder: Reminder | null
  createNewReminder: ({ reminderOf, reminderAt }: ReminderCreateInput) => void
  completeReminder: (reminderId: string) => void
}

// Create Reminder Context
export const ReminderContext = createContext({} as ReminderContextType)

interface ReminderContextProviderProps {
  children: React.ReactNode
}

// Reminder Context Provider
export function ReminderContextProvider({ children }: ReminderContextProviderProps) {
  const [remindersState, dispatch] = useReducer(
    reminderReducer,
    {
      reminders: [],
    },
    () => {
      const storedState = localStorage.getItem('@reminder-me:countdown')

      if (storedState) {
        return JSON.parse(storedState)
      }

      return {
        reminders: [],
      }
    },
  )

  function createNewReminder(data: ReminderCreateInput) {
    const createdAt = new Date()
    const secondsDiff = differenceInSeconds(data.reminderAt, createdAt)

    const status = secondsDiff > 0 ? 'in-progress' : 'completed'
    const visibility = status === 'completed' ? 'hidden' : 'visible'

    dispatch(
      createReminder({
        id: uuid(),
        of: data.reminderOf,
        at: data.reminderAt,
        createdAt,
        visibility,
        status,
      }),
    )
  }

  function completeReminder(reminderId: string) {
    dispatch(completeReminderAction(reminderId))
  }

  useEffect(() => {
    const stateJSON = JSON.stringify(remindersState)
    localStorage.setItem('@reminder-me:countdown', stateJSON)
  }, [remindersState])

  const reminders = remindersState.reminders

  const currentReminder = useMemo(() => {
    const remindersInProgress = reminders.filter((reminder) => reminder.status === 'in-progress')

    const sortedReminders: Reminder[] = remindersInProgress.sort((a, b) => {
      const aSecondsDiff = differenceInSeconds(new Date(a.at), new Date())
      const bSecondsDiff = differenceInSeconds(new Date(b.at), new Date())

      if (aSecondsDiff < bSecondsDiff) {
        return -1
      }

      if (aSecondsDiff > bSecondsDiff) {
        return 1
      }

      return 0
    })

    const nearestReminder = sortedReminders.length > 0 ? sortedReminders[0] : undefined

    if (nearestReminder === undefined) {
      return null
    }

    // When data is parsed from localStorage the dates fields are assigned type "string" and need to be converted
    return {
      ...nearestReminder,
      at: new Date(nearestReminder.at),
      createdAt: new Date(nearestReminder.createdAt),
    } as Reminder
  }, [reminders])

  return (
    <ReminderContext.Provider value={{ reminders, currentReminder, createNewReminder, completeReminder }}>
      {children}
    </ReminderContext.Provider>
  )
}
