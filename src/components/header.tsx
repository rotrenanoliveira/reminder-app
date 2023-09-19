import { useContext } from 'react'
import { Bell, Moon, Sun } from 'lucide-react'
import { LanguageContext } from '../contexts/language'
import { useToggleTheme } from '../hooks/useToggleTheme'
import * as translate from '../util/translate'
import '../styles/header.css'

export function Header() {
  const { activeTheme, toggleTheme } = useToggleTheme()
  const { userLocale } = useContext(LanguageContext)

  function handleToggleTheme() {
    toggleTheme()
  }

  return (
    <header>
      <section className="logo">
        <Bell size={32} strokeWidth={1} className="bell-icon" />
        <h1>{translate.content['header'][userLocale].title}</h1>
      </section>

      <button onClick={handleToggleTheme}>
        {activeTheme === 'light-theme' ? <Moon size={24} strokeWidth={1} /> : <Sun size={24} strokeWidth={1} />}
      </button>
    </header>
  )
}
