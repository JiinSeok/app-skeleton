'use client'

import koMessages from '@/lib/constants/locales/ko.json'
import React, { createContext, ReactNode, useContext } from 'react'

// Define the type for the context value
type TextContextType = {
  t: (key: string) => string
}

// Create the context with a default value
const TextContext = createContext<TextContextType>({
  t: () => '',
})

// Custom hook to use the text context
export function useTranslations(namespace?: string) {
  const context = useContext(TextContext)

  if (!context) {
    throw new Error('useTranslations must be used within a TextProvider')
  }

  // If namespace is provided, return a function that prepends the namespace to the key
  if (namespace) {
    return (key: string) => {
      const fullKey = `${namespace}.${key}`
      return context.t(fullKey)
    }
  }

  return context.t
}

// Helper function to get a nested value from an object using a dot-notation path
export function getNestedValue(obj: any, path: string): string {
  const keys = path.split('.')
  let result = obj

  for (const key of keys) {
    if (result === undefined || result === null) {
      return ''
    }
    result = result[key]
  }

  return result || ''
}

// Utility function to create a translation function for directly imported JSON
export function createTranslator(messages: any) {
  return (key: string): string => {
    return getNestedValue(messages, key)
  }
}

// Provider component
export function TextProvider({ children }: { children: ReactNode }) {
  // Function to get text by key
  const t = (key: string): string => {
    return getNestedValue(koMessages, key)
  }

  return <TextContext.Provider value={{ t }}>{children}</TextContext.Provider>
}
