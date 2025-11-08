"use client"

import type React from "react"

import { useState, type ReactNode } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff } from "lucide-react"

interface EditSectionContainerProps {
  title: string
  isEnabled: boolean
  setIsEnabled: (enabled: boolean) => void
  children: ReactNode
}

export function EditSectionContainer({ title, isEnabled, setIsEnabled, children }: EditSectionContainerProps) {
  const [expanded, setExpanded] = useState(true)

  const toggleVisibility = (e: React.MouseEvent) => {
    setIsEnabled(!isEnabled)
    e.stopPropagation()
  }

  const toggleExpanded = () => {
    setExpanded(!expanded)
  }

  return (
    <div className="shadow-sm rounded-lg mb-4">
      <div
        className={`bg-slate-100 h-12 w-full ${
          expanded ? "rounded-t-lg" : "rounded-lg"
        } relative flex items-center justify-between px-4 text-slate-800 font-bold text-lg select-none cursor-pointer z-10`}
        onClick={toggleExpanded}
      >
        <span>{title}</span>
        <Button variant="ghost" size="icon" onClick={toggleVisibility} className="h-8 w-8">
          {isEnabled ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
        </Button>
      </div>
      <AnimatePresence>
        {expanded && (
          <motion.div
            className={`bg-white relative rounded-b-lg px-4 py-6 overflow-hidden ${
              !isEnabled && "opacity-60 pointer-events-none"
            }`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
