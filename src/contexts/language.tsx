import React, { createContext, useMemo } from 'react'

type SupportedLanguages = 'en-US' | 'pt-BR'

interface LanguageContextType {
  userLocale: SupportedLanguages
}

export const LanguageContext = createContext({} as LanguageContextType)

interface LanguageContextProviderProps {
  children: React.ReactNode
}

export function LanguageProvider({ children }: LanguageContextProviderProps) {
  const userLocale = useMemo(() => {
    const language = navigator.language

    if (language !== 'en-US' && language !== 'pt-BR') {
      return 'en-US'
    }

    return language
  }, [])

  return <LanguageContext.Provider value={{ userLocale }}>{children}</LanguageContext.Provider>
}
