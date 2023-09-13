declare type ReminderCreateInput = {
  reminderOf: string
  reminderAt: Date
}

declare interface Reminder {
  id: string
  of: string
  at: Date
  createdAt: Date
  visibility: 'hidden' | 'visible'
  status: 'completed' | 'in-progress'
}
