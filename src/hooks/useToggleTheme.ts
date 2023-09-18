import { useState } from 'react'

export const useToggleTheme = () => {
  const [activeTheme, setActiveTheme] = useState(() => {
    const theme = localStorage.getItem('@reminder:theme')
    if (!theme) {
      return 'light-theme'
    }

    return theme
  })

  function setLightTheme() {
    document.getElementsByTagName('html')[0].classList.remove('dark-theme')
    localStorage.setItem('@reminder:theme', 'light-theme')
    setActiveTheme('light-theme')
  }

  function setDarkTheme() {
    document.getElementsByTagName('html')[0].classList.add('dark-theme')
    localStorage.setItem('@reminder:theme', 'dark-theme')
    setActiveTheme('dark-theme')
  }

  function toggleTheme() {
    if (activeTheme === 'dark-theme') {
      return setLightTheme()
    } else {
      return setDarkTheme()
    }
  }

  function setTheme() {
    document.getElementsByTagName('html')[0].classList.add(activeTheme)
  }

  return {
    setTheme,
    activeTheme,
    toggleTheme,
  }
}
