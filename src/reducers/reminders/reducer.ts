import { ReminderReducerActionsTypes } from './actions'

interface ReminderReducerState {
  reminders: Reminder[]
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function reminderReducer(state: ReminderReducerState, action: any) {
  switch (action.type) {
    case ReminderReducerActionsTypes.ADD_REMINDER:
      return {
        reminders: [...state.reminders, action.payload.newReminder],
      }

    case ReminderReducerActionsTypes.COMPLETE_REMINDER:
      return {
        reminders: state.reminders.map((reminder) => {
          if (reminder.id !== action.payload.reminderId) {
            return reminder
          }

          reminder.status = 'completed'
          reminder.visibility = 'hidden'

          return {
            ...reminder,
          }
        }),
      }

    case ReminderReducerActionsTypes.TOGGLE_REMINDER_VISIBILITY:
      return {
        reminders: state.reminders.map((reminder) => {
          if (reminder.id !== action.payload.reminderId) {
            return reminder
          }

          const isReminderVisible = reminder.visibility === 'visible'
          // console.log(isReminderVisible)
          const visibility = isReminderVisible ? 'hidden' : 'visible'
          // console.log(visibility)

          return {
            ...reminder,
            visibility,
          }
        }),
      }

    case ReminderReducerActionsTypes.REMOVE_REMINDER:
      return {
        reminders: state.reminders.filter((reminder) => reminder.id !== action.payload.reminderId),
      }

    default:
      return state
  }
}
