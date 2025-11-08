"use client"

import { CVStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { ZoomIn, ZoomOut, RefreshCw, Settings, Type } from "lucide-react"
import { ProfileSection } from "./cv-sections/profile-section"
import { SkillsSection } from "./cv-sections/skills-section"
import { EducationSection } from "./cv-sections/education-section"
import { ExperienceSection } from "./cv-sections/experience-section"
import { ActivitiesSection } from "./cv-sections/activities-section"
import { VolunteeringSection } from "./cv-sections/volunteering-section"
import { LayoutSettingsDialog } from "./layout-settings-dialog"
import { FontSettingsDialog } from "./font-settings-dialog"
import { useState, useMemo, useCallback } from "react"
import type { SectionConfig } from "@/lib/store"
import { useHasMounted } from "@/lib/hooks/useHasMounted"

export function CVPreview() {
  const hasMounted = useHasMounted()
  const [showLayoutSettings, setShowLayoutSettings] = useState(false)
  const [showFontSettings, setShowFontSettings] = useState(false)

  // Only access store after mounting to prevent hydration issues
  const { zoom, zoomIn, zoomOut, resetZoom, sectionConfig, columnTitles, fontSettings, theme } = CVStore()

  // Memoize sections to prevent unnecessary recalculations
  const { leftSections, rightSections } = useMemo(() => {
    if (!hasMounted) return { leftSections: [], rightSections: [] }

    const left = sectionConfig.filter((section) => section.column === "left" && section.visible)
    const right = sectionConfig.filter((section) => section.column === "right" && section.visible)
    return { leftSections: left, rightSections: right }
  }, [sectionConfig, hasMounted])

  // Memoize section rendering to prevent unnecessary re-renders
  const renderSection = useCallback((section: SectionConfig) => {
    switch (section.id) {
      case "skills":
        return <SkillsSection key={section.id} title={section.title} />
      case "education":
        return <EducationSection key={section.id} title={section.title} />
      case "experience":
        return <ExperienceSection key={section.id} title={section.title} />
      case "activities":
        return <ActivitiesSection key={section.id} title={section.title} />
      case "volunteering":
        return <VolunteeringSection key={section.id} title={section.title} />
      default:
        return null
    }
  }, [])

  // Memoize CV styles to prevent unnecessary recalculations
  const cvStyle = useMemo(() => {
    if (!hasMounted) return {}

    return {
      fontFamily: fontSettings.fontFamily,
      fontSize: `${fontSettings.fontSize}px`,
      transform: `scale(${zoom})`,
      color: theme.colors.fontColor,
    }
  }, [fontSettings, zoom, theme.colors.fontColor, hasMounted])

  // Stable callback references
  const handleShowLayoutSettings = useCallback(() => setShowLayoutSettings(true), [])
  const handleShowFontSettings = useCallback(() => setShowFontSettings(true), [])

  // Show loading state during hydration
  if (!hasMounted) {
    return (
      <div className="flex flex-col items-center">
        <div className="flex items-center justify-between w-full mb-4 print:hidden">
          <h2 className="text-xl font-bold text-slate-800">Professional Resume</h2>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-200 animate-pulse rounded"></div>
            <div className="w-8 h-8 bg-gray-200 animate-pulse rounded"></div>
            <div className="w-8 h-8 bg-gray-200 animate-pulse rounded"></div>
            <div className="w-12 h-6 bg-gray-200 animate-pulse rounded"></div>
            <div className="w-8 h-8 bg-gray-200 animate-pulse rounded"></div>
            <div className="w-8 h-8 bg-gray-200 animate-pulse rounded"></div>
          </div>
        </div>
        <div className="w-[210mm] h-[297mm] bg-gray-200 animate-pulse rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Loading Preview...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-between w-full mb-4 print:hidden">
        <h2 className="text-xl font-bold text-slate-800">Professional Resume</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={handleShowFontSettings} className="mr-2">
            <Type className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleShowLayoutSettings} className="mr-2">
            <Settings className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={zoomOut}>
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-sm text-slate-600">{Math.round(zoom * 100)}%</span>
          <Button variant="outline" size="icon" onClick={zoomIn}>
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={resetZoom}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div
        className="w-[210mm] bg-white shadow-md origin-top transition-all duration-300 ease-linear print:shadow-none cv-preview-content"
        style={cvStyle}
      >
        <div className="p-8">
          <ProfileSection />
          <div className="grid grid-cols-12 gap-6 print-grid">
            <div className="col-span-12 md:col-span-8 print-left-column">
              {columnTitles.left && (
                <h3
                  className="text-lg font-semibold mb-4 border-b border-slate-200 pb-2"
                  style={{ color: theme.colors.titleColor }}
                >
                  {columnTitles.left}
                </h3>
              )}
              {leftSections.map(renderSection)}
            </div>
            <div className="col-span-12 md:col-span-4 print-right-column">
              {columnTitles.right && (
                <h3
                  className="text-lg font-semibold mb-4 border-b border-slate-200 pb-2"
                  style={{ color: theme.colors.titleColor }}
                >
                  {columnTitles.right}
                </h3>
              )}
              {rightSections.map(renderSection)}
            </div>
          </div>
        </div>
      </div>

      <LayoutSettingsDialog open={showLayoutSettings} onOpenChange={setShowLayoutSettings} />
      <FontSettingsDialog open={showFontSettings} onOpenChange={setShowFontSettings} />
    </div>
  )
}
