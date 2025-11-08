"use client"

import type React from "react"
import { memo } from "react"
import { CVStore } from "@/lib/store"
import { useHasMounted } from "@/lib/hooks/useHasMounted"

interface SkillsSectionProps {
  title?: string
  titleEditable?: boolean
  titleValue?: string
  onTitleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onTitleBlur?: () => void
  onTitleKeyDown?: (e: React.KeyboardEvent) => void
  titleRef?: React.RefObject<HTMLInputElement>
}

const SkillsSection = memo(function SkillsSection({
  title = "Curriculum & Teaching Expertise",
  titleEditable = false,
  titleValue = "",
  onTitleChange,
  onTitleBlur,
  onTitleKeyDown,
  titleRef,
}: SkillsSectionProps) {
  const { skills, theme } = CVStore()
  const hasMounted = useHasMounted()

  // Don't access store until mounted
  if (!hasMounted) {
    return (
      <div className="mb-6">
        <div className="h-6 bg-gray-200 w-48 mb-3 animate-pulse rounded"></div>
        <div className="space-y-1">
          <div className="h-4 bg-gray-200 w-full animate-pulse rounded"></div>
          <div className="h-4 bg-gray-200 w-3/4 animate-pulse rounded"></div>
          <div className="h-4 bg-gray-200 w-5/6 animate-pulse rounded"></div>
        </div>
      </div>
    )
  }

  if (!skills || skills.length === 0) return null

  return (
    <div className="mb-6">
      <h3
        className="text-lg font-semibold mb-3 border-b border-slate-300 pb-1 flex items-center"
        style={{ color: theme.colors.titleColor }}
      >
        {titleEditable ? (
          <input
            ref={titleRef}
            type="text"
            value={titleValue}
            onChange={onTitleChange}
            onBlur={onTitleBlur}
            onKeyDown={onTitleKeyDown}
            className="w-full bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-blue-500 px-0"
          />
        ) : (
          title
        )}
      </h3>
      <ul className="space-y-1">
        {skills.map((skill) => (
          <li key={skill.id} className="flex items-center text-sm" style={{ color: theme.colors.fontColor }}>
            <span className="w-2 h-2 bg-slate-600 rounded-full mr-3 flex-shrink-0"></span>
            {skill.name}
          </li>
        ))}
      </ul>
    </div>
  )
})

export { SkillsSection }
