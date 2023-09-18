import { useCallback } from 'react'
import { useToggleTheme } from './useToggleTheme'

export const useSetTheme = () => {
  const { setTheme } = useToggleTheme()

  useCallback(() => {
    setTheme()
  }, [setTheme])

  return
}
