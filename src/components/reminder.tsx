import { Eye, EyeOff } from 'lucide-react'
import { ReminderCompleted } from './ui/reminder-completed'
import { ReminderInProgress } from './ui/reminder-in-progress'
import { useContext } from 'react'
import { ReminderContext } from '../contexts/reminder'

interface ReminderProps {
  reminder: Reminder
}

export function Reminder({ reminder }: ReminderProps) {
  const { toggleReminderVisibility } = useContext(ReminderContext)

  function handleReminderVisibility() {
    toggleReminderVisibility(reminder.id)
  }

  return (
    <div className={`reminder ${reminder.visibility === 'hidden' ? 'hidden-reminder' : ''}`}>
      <div className="description">
        {reminder.status === 'completed' ? <ReminderCompleted /> : <ReminderInProgress />}
        <span className="reminder-of">{reminder.of}</span>{' '}
      </div>

      <div className="info">
        <span className="reminder-at">{new Date(reminder.at).toLocaleString('pt-BR')}</span>

        <button onClick={handleReminderVisibility} name="toggle-reminder-visibility">
          {reminder.visibility === 'visible' ? <EyeOff size={24} strokeWidth={1} /> : <Eye size={24} strokeWidth={1} />}
        </button>
      </div>
    </div>
  )
}
