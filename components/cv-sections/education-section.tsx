"use client"
import { memo } from "react"
import { CVStore } from "@/lib/store"
import { format } from "date-fns"
import { useHasMounted } from "@/lib/hooks/useHasMounted"
import type React from "react"

interface EducationSectionProps {
  title?: string
  titleEditable?: boolean
  titleValue?: string
  onTitleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onTitleBlur?: () => void
  onTitleKeyDown?: (e: React.KeyboardEvent) => void
  titleRef?: React.RefObject<HTMLInputElement>
}

const EducationSection = memo(function EducationSection({
  title = "Education",
  titleEditable = false,
  titleValue = "",
  onTitleChange,
  onTitleBlur,
  onTitleKeyDown,
  titleRef,
}: EducationSectionProps) {
  const { education, educationDisplaySettings, theme } = CVStore()
  const hasMounted = useHasMounted()

  // Don't access store until mounted
  if (!hasMounted) {
    return (
      <div className="mb-6">
        <div className="h-6 bg-gray-200 w-32 mb-3 animate-pulse rounded"></div>
        <div className="space-y-4">
          <div>
            <div className="h-5 bg-gray-200 w-48 mb-1 animate-pulse rounded"></div>
            <div className="h-4 bg-gray-200 w-36 animate-pulse rounded"></div>
            <div className="h-4 bg-gray-200 w-24 animate-pulse rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!education || education.length === 0) return null

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
      <div className="space-y-4">
        {education.map((edu) => (
          <div key={edu.id}>
            {/* Degree - always shown and prominent */}
            <div className="font-semibold text-base" style={{ color: theme.colors.titleColor }}>
              {edu.degree}
            </div>

            {/* Institution - conditional */}
            {educationDisplaySettings.showInstitutions && edu.showInstitution !== false && (
              <div className="text-sm mt-1" style={{ color: theme.colors.fontColor }}>
                {edu.institution}
              </div>
            )}

            {/* Field of study - conditional */}
            {educationDisplaySettings.showFields && edu.showField !== false && edu.field && (
              <div className="text-sm" style={{ color: theme.colors.fontColor }}>
                {edu.field}
              </div>
            )}

            {/* Dates - conditional */}
            {educationDisplaySettings.showDates && edu.showDates !== false && (
              <div className="text-sm" style={{ color: theme.colors.fontColor }}>
                {edu.startDate && format(new Date(edu.startDate), "MMM yyyy")} -{" "}
                {edu.current ? "Present" : edu.endDate ? format(new Date(edu.endDate), "MMM yyyy") : ""}
              </div>
            )}

            {/* Location - conditional */}
            {educationDisplaySettings.showLocations && edu.showLocation !== false && edu.location && (
              <div className="text-sm" style={{ color: theme.colors.fontColor }}>
                {edu.location}
              </div>
            )}

            {/* Description - conditional and smallest */}
            {educationDisplaySettings.showDescriptions && edu.showDescription !== false && edu.description && (
              <div className="text-xs mt-1 text-slate-600" style={{ color: theme.colors.fontColor }}>
                {edu.description}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
})

export { EducationSection }
