import { Header } from './components/header'
import { Countdown } from './components/countdown'
import { RegisterReminderForm } from './components/register-reminder'
import { ReminderList } from './components/reminder-list'
import './styles/home.css'

export function App() {
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
