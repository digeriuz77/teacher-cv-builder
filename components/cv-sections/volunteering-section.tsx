"use client"

import type React from "react"
import { CVStore } from "@/lib/store"
import { useHasMounted } from "@/lib/hooks/useHasMounted"

interface VolunteeringSectionProps {
  title?: string
  titleEditable?: boolean
  titleValue?: string
  onTitleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onTitleBlur?: () => void
  onTitleKeyDown?: (e: React.KeyboardEvent) => void
  titleRef?: React.RefObject<HTMLInputElement>
}

export function VolunteeringSection({
  title = "Professional Certifications",
  titleEditable = false,
  titleValue = "",
  onTitleChange,
  onTitleBlur,
  onTitleKeyDown,
  titleRef,
}: VolunteeringSectionProps) {
  const hasMounted = useHasMounted()
  const { volunteering, certificationDisplaySettings, theme } = CVStore()

  // Don't access store until mounted
  if (!hasMounted) {
    return (
      <div className="mb-6">
        <div className="h-6 bg-gray-200 w-44 mb-3 animate-pulse rounded"></div>
        <div className="space-y-3">
          <div>
            <div className="h-5 bg-gray-200 w-48 mb-1 animate-pulse rounded"></div>
            <div className="h-4 bg-gray-200 w-36 animate-pulse rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (volunteering.length === 0) return null

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
      <div className="space-y-3">
        {volunteering.map((cert) => (
          <div key={cert.id}>
            {/* Main certification title - always shown and prominent */}
            <div className="font-semibold text-base" style={{ color: theme.colors.titleColor }}>
              {cert.position}
            </div>

            {/* Issuing organization - smaller, conditional */}
            {certificationDisplaySettings.showOrganizations && cert.showOrganization !== false && (
              <div className="text-sm mt-1" style={{ color: theme.colors.fontColor }}>
                {cert.organization}
              </div>
            )}

            {/* Additional details - smallest, conditional */}
            {certificationDisplaySettings.showDescriptions && cert.showDescription !== false && cert.description && (
              <div className="text-xs mt-1 text-slate-600" style={{ color: theme.colors.fontColor }}>
                {cert.description}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
