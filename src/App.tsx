import { useSetTheme } from './hooks/useSetTheme'
import { Header } from './components/header'
import { Countdown } from './components/countdown'
import { RegisterReminderForm } from './components/register-reminder'
import { ReminderList } from './components/reminder-list'
import './styles/home.css'

export function App() {
  useSetTheme()

  return (
    <>
      <Header />

      <main>
        <Countdown />

        <RegisterReminderForm />

        <ReminderList />
      </main>
    </>
  )
}
