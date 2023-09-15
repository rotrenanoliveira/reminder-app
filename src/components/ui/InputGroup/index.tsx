import React, { useState } from 'react'
import './styles.css'

interface InputGroupProps {
  children: React.ReactNode
}

export function InputGroup({ children }: InputGroupProps) {
  const [isFocused, setIsFocused] = useState(false)

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleBlur = () => {
    setIsFocused(false)
  }

  const elementClassName = isFocused ? `input-group input-group-onfocus` : 'input-group'

  return (
    <div className={elementClassName} onFocus={handleFocus} onBlur={handleBlur}>
      {children}
    </div>
  )
}
