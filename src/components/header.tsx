import { Bell, Moon, Sun } from 'lucide-react'
import { useToggleTheme } from '../hooks/useToggleTheme'
import '../styles/header.css'

export function Header() {
  const { activeTheme, toggleTheme } = useToggleTheme()

  function handleToggleTheme() {
    toggleTheme()
  }

  return (
    <header>
      <section className="logo">
        <Bell size={32} strokeWidth={1} className="bell-icon" />
        <h1>Reminder</h1>
      </section>

      <button onClick={handleToggleTheme}>
        {activeTheme === 'light-theme' ? <Moon size={24} strokeWidth={1} /> : <Sun size={24} strokeWidth={1} />}
      </button>
    </header>
  )
}
