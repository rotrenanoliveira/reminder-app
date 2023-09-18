import React, { createContext, useEffect, useMemo, useReducer, useState } from 'react'
import { completeReminderAction, createReminder, toggleVisibility } from '../reducers/reminders/actions'
import { differenceInSeconds } from '../util/calc-date/difference-in-seconds'
import { reminderReducer } from '../reducers/reminders/reducer'
import { v4 as uuid } from 'uuid'

interface ReminderContextType {
  reminders: Reminder[]
  currentReminder: Reminder | null
  remainingSeconds: number
  createNewReminder: ({ reminderOf, reminderAt }: ReminderCreateInput) => void
  completeReminder: (reminderId: string) => void
  toggleReminderVisibility: (reminderId: string) => void
  setSecondsRemaining: (seconds: number) => void
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

  // GET reminders from reminders state and sort by status na order by closer
  const reminders = remindersState.reminders.sort((a, b) => {
    const aSecondsDiff = differenceInSeconds(new Date(a.at), new Date())
    const bSecondsDiff = differenceInSeconds(new Date(b.at), new Date())

    if (aSecondsDiff < bSecondsDiff) {
      return -1
    }

    return 1
  })

  // GET the current reminder by default is the closest
  const currentReminder = useMemo(() => {
    const remindersInProgress = reminders.filter((reminder) => reminder.status === 'in-progress')

    for (const reminder of remindersInProgress) {
      const diff = differenceInSeconds(new Date(reminder.at), new Date())

      if (diff < 0) {
        completeReminder(reminder.id)
      }
    }

    const nearestReminder = remindersInProgress.length > 0 ? remindersInProgress[0] : undefined

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

  // Seconds left until reminder
  const [remainingSeconds, setRemainingSeconds] = useState(() => {
    if (currentReminder) {
      return differenceInSeconds(currentReminder.at, new Date())
    }

    return 0
  })

  function setSecondsRemaining(seconds: number) {
    setRemainingSeconds(seconds)
  }

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

  function toggleReminderVisibility(reminderId: string) {
    dispatch(toggleVisibility(reminderId))
  }

  useEffect(() => {
    const stateJSON = JSON.stringify(remindersState)
    localStorage.setItem('@reminder-me:countdown', stateJSON)
  }, [remindersState])

  useEffect(() => {
    setRemainingSeconds(() => {
      if (currentReminder) {
        return differenceInSeconds(currentReminder.at, new Date())
      }

      return 0
    })
  }, [currentReminder])

  return (
    <ReminderContext.Provider
      value={{
        reminders,
        currentReminder,
        remainingSeconds,
        createNewReminder,
        completeReminder,
        toggleReminderVisibility,
        setSecondsRemaining,
      }}
    >
      {children}
    </ReminderContext.Provider>
  )
}
