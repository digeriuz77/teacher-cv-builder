"use client"

import type React from "react"
import { CVStore } from "@/lib/store"
import { format } from "date-fns"
import { useHasMounted } from "@/lib/hooks/useHasMounted"

interface ExperienceSectionProps {
  title?: string
  titleEditable?: boolean
  titleValue?: string
  onTitleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onTitleBlur?: () => void
  onTitleKeyDown?: (e: React.KeyboardEvent) => void
  titleRef?: React.RefObject<HTMLInputElement>
}

export function ExperienceSection({
  title = "Teaching Experience",
  titleEditable = false,
  titleValue = "",
  onTitleChange,
  onTitleBlur,
  onTitleKeyDown,
  titleRef,
}: ExperienceSectionProps) {
  const { experience, theme } = CVStore()
  const hasMounted = useHasMounted()

  // Don't access store until mounted
  if (!hasMounted) {
    return (
      <div className="mb-8">
        <div className="h-6 bg-gray-200 w-40 mb-4 animate-pulse rounded"></div>
        <div className="space-y-6">
          <div>
            <div className="h-5 bg-gray-200 w-48 mb-2 animate-pulse rounded"></div>
            <div className="h-4 bg-gray-200 w-36 mb-2 animate-pulse rounded"></div>
            <div className="h-4 bg-gray-200 w-full animate-pulse rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (experience.length === 0) return null

  return (
    <div className="mb-8">
      <h3
        className="text-xl font-semibold mb-4 border-b-2 border-slate-300 pb-2 flex items-center"
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
      <div className="space-y-6">
        {experience.map((exp) => (
          <div key={exp.id}>
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-semibold" style={{ color: theme.colors.titleColor }}>
                  {exp.position}
                </h4>
                <div style={{ color: theme.colors.fontColor }}>{exp.company}</div>
                {exp.location && <div className="text-sm text-slate-500">{exp.location}</div>}
              </div>
              <div className="text-sm text-slate-500 text-right">
                {exp.startDate && format(new Date(exp.startDate), "MMM yyyy")} -{" "}
                {exp.current ? "Present" : exp.endDate ? format(new Date(exp.endDate), "MMM yyyy") : ""}
              </div>
            </div>
            {exp.description && (
              <p className="mb-2" style={{ color: theme.colors.fontColor }}>
                {exp.description}
              </p>
            )}
            {exp.highlights.length > 0 && (
              <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                {exp.highlights.map((highlight, index) => (
                  <li key={index}>{highlight}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
