"use client"

import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from './button'

type PromptOptions = {
  title: string
  defaultValue?: string
  placeholder?: string
}

type PromptContextType = {
  ask: (titleOrOptions: string | PromptOptions, fallbackDefault?: string) => Promise<string | null>
}

const PromptContext = createContext<PromptContextType | undefined>(undefined)

export function usePrompt() {
  const context = useContext(PromptContext)
  if (!context) {
    throw new Error('usePrompt must be used within a PromptProvider')
  }
  return context
}

export function PromptProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [options, setOptions] = useState<PromptOptions>({ title: '' })
  const [value, setValue] = useState('')
  const resolveRef = useRef<((value: string | null) => void) | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const ask = useCallback((titleOrOptions: string | PromptOptions, fallbackDefault?: string) => {
    return new Promise<string | null>((resolve) => {
      let opts: PromptOptions
      if (typeof titleOrOptions === 'string') {
        opts = { title: titleOrOptions, defaultValue: fallbackDefault }
      } else {
        opts = titleOrOptions
      }
      
      setOptions(opts)
      setValue(opts.defaultValue || '')
      resolveRef.current = resolve
      setIsOpen(true)
    })
  }, [])

  const handleClose = (result: string | null) => {
    setIsOpen(false)
    if (resolveRef.current) {
      resolveRef.current(result)
      resolveRef.current = null
    }
  }

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  return (
    <PromptContext.Provider value={{ ask }}>
      {children}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              onClick={() => handleClose(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-md rounded-xl bg-card border border-border shadow-2xl p-6"
            >
              <h3 className="text-lg font-semibold mb-4">{options.title}</h3>
              <form 
                onSubmit={(e) => {
                  e.preventDefault()
                  handleClose(value)
                }}
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder={options.placeholder || "Type here..."}
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all mb-6"
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') handleClose(null)
                  }}
                />
                <div className="flex justify-end gap-3">
                  <Button type="button" variant="ghost" onClick={() => handleClose(null)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    Confirm
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </PromptContext.Provider>
  )
}
