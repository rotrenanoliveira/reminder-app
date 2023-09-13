declare type ReminderCreateInput = {
  reminderOf: string
  reminderAt: Date
}

declare interface Reminder {
  of: string
  at: Date
  created_at: Date
  visibility: 'hidden' | 'visible'
  status: 'completed' | 'in-progress'
}
