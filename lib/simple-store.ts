"use client"

import { useResumeStore } from "@/src/stores/useResumeStore"

/**
 * Simplified store hook that returns the aggregated resume data
 * Used by section editors that need access to CV data
 */
export const useStore = useResumeStore
