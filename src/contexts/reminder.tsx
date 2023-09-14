import React, { createContext, useEffect, useMemo, useReducer } from 'react'
import { completeReminderAction, createReminder } from '../reducers/reminders/actions'
import { differenceInSeconds } from '../util/calc-date/difference-in-seconds'
import { reminderReducer } from '../reducers/reminders/reducer'
import { v4 as uuid } from 'uuid'

interface ReminderContextType {
  reminders: Reminder[]
  currentReminder: Reminder
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
    },
  )

  const remindersInProgress = remindersState.reminders.filter((reminder) => reminder.status === 'in-progress')

  const currentReminder = useMemo(() => {
    const nearestReminder = remindersInProgress.sort((a, b) => {
      const aSecondsDiff = differenceInSeconds(new Date(a.at), new Date())
      const bSecondsDiff = differenceInSeconds(new Date(b.at), new Date())

      if (aSecondsDiff < bSecondsDiff) {
        return -1
      }

      if (aSecondsDiff > bSecondsDiff) {
        return 1
      }

      return 0
    })[0]

    // When data is parsed from localStorage the dates fields are assigned type "string" and need to be converted to "Date" or "number"
    return {
      ...nearestReminder,
      at: new Date(nearestReminder.at),
      createdAt: new Date(nearestReminder.createdAt),
    }
  }, [remindersInProgress])

  function createNewReminder(data: ReminderCreateInput) {
    dispatch(
      createReminder({
        id: uuid(),
        of: data.reminderOf,
        at: data.reminderAt,
        createdAt: new Date(),
        visibility: 'visible',
        status: 'in-progress',
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

  return (
    <ReminderContext.Provider
      value={{ reminders: remindersState.reminders, currentReminder, createNewReminder, completeReminder }}
    >
      {children}
    </ReminderContext.Provider>
  )
}
