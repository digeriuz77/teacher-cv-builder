"use client"

import type React from "react"
import { CVStore } from "@/lib/store"
import { useHasMounted } from "@/lib/hooks/useHasMounted"

interface ActivitiesSectionProps {
  title?: string
  titleEditable?: boolean
  titleValue?: string
  onTitleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onTitleBlur?: () => void
  onTitleKeyDown?: (e: React.KeyboardEvent) => void
  titleRef?: React.RefObject<HTMLInputElement>
}

export function ActivitiesSection({
  title = "Professional Educator Experiences",
  titleEditable = false,
  titleValue = "",
  onTitleChange,
  onTitleBlur,
  onTitleKeyDown,
  titleRef,
}: ActivitiesSectionProps) {
  const { activities, theme } = CVStore()
  const hasMounted = useHasMounted()

  // Don't access store until mounted
  if (!hasMounted) {
    return (
      <div className="mb-8">
        <div className="h-6 bg-gray-200 w-56 mb-4 animate-pulse rounded"></div>
        <div className="space-y-3">
          <div>
            <div className="h-5 bg-gray-200 w-48 mb-1 animate-pulse rounded"></div>
            <div className="h-4 bg-gray-200 w-full animate-pulse rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (activities.length === 0) return null

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
      <div className="space-y-3">
        {activities.map((activity) => (
          <div key={activity.id}>
            <h4 className="font-semibold" style={{ color: theme.colors.titleColor }}>
              {activity.title}
            </h4>
            {activity.description && (
              <p className="text-sm mt-1" style={{ color: theme.colors.fontColor }}>
                {activity.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
