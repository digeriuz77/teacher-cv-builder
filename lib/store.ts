"use client"

import { createContainer } from "unstated-next"
import { useState, useEffect } from "react"
import { useBasicDetails } from "@/src/stores/basic"
import { useExperiences } from "@/src/stores/experience"
import { useEducations } from "@/src/stores/education"
import { useAwards } from "@/src/stores/awards"
import { useVoluteeringStore } from "@/src/stores/volunteering"
import { useActivity } from "@/src/stores/activity"
import {
  useLanguages,
  useFrameworks,
  useTechnologies,
  useLibraries,
  useDatabases,
  useTools,
  usePractices,
} from "@/src/stores/skills"
import { useTemplate } from "@/src/stores/useTemplate"
import { useZoom } from "@/src/stores/useZoom"
import { useThemes } from "@/src/stores/themes"
import { resetResumeStore } from "@/src/stores/useResumeStore"
import ResumeData from "@/src/helpers/constants/resume-data.json"

/**
 * Section configuration interface
 */
export interface SectionConfig {
  id: string
  title: string
  enabled: boolean
  order: number
}

/**
 * Main CV Store that aggregates all Zustand stores
 * Provides a single interface to access all CV data and methods
 */
export function CVStore() {
  // Basic details
  const basics = useBasicDetails((state) => state.values)
  const setBasics = useBasicDetails((state) => state.set)

  // Work experience
  const experiences = useExperiences((state) => state.experiences)
  const addExperience = useExperiences((state) => state.add)
  const updateExperience = useExperiences((state) => state.update)
  const removeExperience = useExperiences((state) => state.remove)

  // Education
  const education = useEducations((state) => state.academics)
  const addEducation = useEducations((state) => state.add)
  const updateEducation = useEducations((state) => state.update)
  const removeEducation = useEducations((state) => state.remove)

  // Skills
  const languages = useLanguages((state) => state.values)
  const frameworks = useFrameworks((state) => state.values)
  const technologies = useTechnologies((state) => state.values)
  const libraries = useLibraries((state) => state.values)
  const databases = useDatabases((state) => state.values)
  const tools = useTools((state) => state.values)
  const practices = usePractices((state) => state.values)

  const setLanguages = useLanguages((state) => state.set)
  const setFrameworks = useFrameworks((state) => state.set)
  const setTechnologies = useTechnologies((state) => state.set)
  const setLibraries = useLibraries((state) => state.set)
  const setDatabases = useDatabases((state) => state.set)
  const setTools = useTools((state) => state.set)
  const setPractices = usePractices((state) => state.set)

  // Volunteering/Certifications
  const volunteering = useVoluteeringStore((state) => state.volunteeredExps)
  const addVolunteering = useVoluteeringStore((state) => state.add)
  const updateVolunteering = useVoluteeringStore((state) => state.update)
  const removeVolunteering = useVoluteeringStore((state) => state.remove)

  // Awards/Registration
  const awards = useAwards((state) => state.awards)
  const addAward = useAwards((state) => state.add)
  const updateAward = useAwards((state) => state.update)
  const removeAward = useAwards((state) => state.remove)

  // Activities/Professional Development
  const activities = useActivity((state) => state.get())

  // Template and theme
  const template = useTemplate((state) => state.activeTemplate)
  const setTemplate = useTemplate((state) => state.setTemplate)

  const zoom = useZoom((state) => state.zoom)
  const setZoom = useZoom((state) => state.setZoom)

  const theme = useThemes((state) => state)

  /**
   * Reset all sections to default data
   */
  const resetAllSections = () => {
    resetResumeStore()
  }

  return {
    // Basic info
    basics,
    setBasics,

    // Work experience
    experiences,
    addExperience,
    updateExperience,
    removeExperience,

    // Education
    education,
    addEducation,
    updateEducation,
    removeEducation,

    // Skills (for teachers: curriculum & expertise)
    skills: {
      languages,
      frameworks,
      technologies,
      libraries,
      databases,
      tools,
      practices,
    },
    setLanguages,
    setFrameworks,
    setTechnologies,
    setLibraries,
    setDatabases,
    setTools,
    setPractices,

    // Volunteering (for teachers: certifications)
    volunteering,
    addVolunteering,
    updateVolunteering,
    removeVolunteering,

    // Awards (for teachers: registration & credentials)
    awards,
    addAward,
    updateAward,
    removeAward,

    // Activities (for teachers: professional development)
    activities,

    // Template & theme
    template,
    setTemplate,
    zoom,
    setZoom,
    theme,

    // Utilities
    resetAllSections,
  }
}

/**
 * Container for handling client-side hydration
 * Prevents server/client mismatch errors
 */
function useStoreContainer() {
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  return {
    isHydrated,
  }
}

export const StoreContainer = createContainer(useStoreContainer)
