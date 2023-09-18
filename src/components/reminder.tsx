import { useContext } from 'react'
import { CheckCircle, Circle, Eye, EyeOff } from 'lucide-react'
import { ReminderContext } from '../contexts/reminder'
import '../styles/reminder-status.css'

interface ReminderProps {
  reminder: Reminder
}

export function Reminder({ reminder }: ReminderProps) {
  const { toggleReminderVisibility, setCurrentReminder, currentReminder } = useContext(ReminderContext)

  function handleSetCurrentReminder() {
    setCurrentReminder(reminder.id)
  }

  function handleReminderVisibility() {
    toggleReminderVisibility(reminder.id)
  }

  return (
    <div className={`reminder ${reminder.visibility === 'hidden' ? 'hidden-reminder' : ''}`}>
      <div className="description">
        {reminder.status === 'in-progress' ? (
          currentReminder?.id === reminder.id ? (
            <CheckCircle size={16} strokeWidth={1} />
          ) : (
            <button onClick={handleSetCurrentReminder}>
              <Circle size={16} strokeWidth={1} />
            </button>
          )
        ) : (
          <></>
        )}
        {reminder.status === 'completed' ? (
          <div className="reminder-status completed" />
        ) : (
          <div className="reminder-status in-progress" />
        )}
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
