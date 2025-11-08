"use client"

import { useState, type ReactNode } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronUp, ChevronDown, Trash2 } from "lucide-react"

interface MoveEditSectionProps {
  title: string
  index: number
  length: number
  onMoveUp: (index: number) => void
  onMoveDown: (index: number) => void
  onDelete: (index: number) => void
  children: ReactNode
}

export function MoveEditSection({
  title,
  index,
  length,
  onMoveUp,
  onMoveDown,
  onDelete,
  children,
}: MoveEditSectionProps) {
  const [expanded, setExpanded] = useState(true)

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
        <span className="w-[15rem] overflow-hidden text-ellipsis whitespace-nowrap" title={title}>
          {title}
        </span>
        <div className="flex gap-2">
          {length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={(e) => {
                  e.stopPropagation()
                  onMoveUp(index)
                }}
                disabled={index === 0}
              >
                <ChevronUp className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={(e) => {
                  e.stopPropagation()
                  onMoveDown(index)
                }}
                disabled={index === length - 1}
              >
                <ChevronDown className="h-4 w-4" />
              </Button>
            </>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
            onClick={(e) => {
              e.stopPropagation()
              onDelete(index)
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <AnimatePresence>
        {expanded && (
          <motion.div
            className="bg-white relative rounded-b-lg px-4 pt-6 pb-2 overflow-hidden"
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
