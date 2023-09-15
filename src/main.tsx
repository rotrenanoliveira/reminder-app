import React from 'react'
import ReactDOM from 'react-dom/client'
import { ReminderContextProvider } from './contexts/reminder.tsx'
import { App } from './App.tsx'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ReminderContextProvider>
      <App />
    </ReminderContextProvider>
  </React.StrictMode>,
)
