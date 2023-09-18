export enum ReminderReducerActionsTypes {
  ADD_REMINDER = 'ADD_REMINDER',
  COMPLETE_REMINDER = 'COMPLETE_REMINDER',
  TOGGLE_REMINDER_VISIBILITY = 'TOGGLE_REMINDER_VISIBILITY',
}

export function createReminder(newReminder: Reminder) {
  return {
    type: ReminderReducerActionsTypes.ADD_REMINDER,
    payload: {
      newReminder,
    },
  }
}

export function completeReminderAction(reminderId: string) {
  return {
    type: ReminderReducerActionsTypes.COMPLETE_REMINDER,
    payload: {
      reminderId,
    },
  }
}

export function toggleVisibility(reminderId: string) {
  return {
    type: ReminderReducerActionsTypes.TOGGLE_REMINDER_VISIBILITY,
    payload: {
      reminderId,
    },
  }
}
