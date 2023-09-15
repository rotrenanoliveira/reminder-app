import { Bell } from 'lucide-react'
import './header.css'

export function Header() {
  return (
    <header>
      <Bell size={32} strokeWidth={1} className="bell-icon" />
      <h1>Reminder</h1>
    </header>
  )
}
