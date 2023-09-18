import { useToggleTheme } from './hooks/useToggleTheme'
import { Header } from './components/header'
import { Countdown } from './components/countdown'
import { RegisterReminderForm } from './components/register-reminder'
import { ReminderList } from './components/reminder-list'
import './styles/home.css'

export function App() {
  const { setTheme } = useToggleTheme()
  setTheme()

  return (
    <>
      <Header />

      <main>
        <Countdown />

        <RegisterReminderForm />

        <ReminderList />
      </main>

      <footer>
        by <a href="https://github.com/rotrenanoliveira">rotrenanoliveira</a> - 2023
      </footer>
    </>
  )
}
