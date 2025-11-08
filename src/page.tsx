"use client"

import { StoreContainer } from "@/lib/store"
import CVBuilder from "@/components/cv-builder"

function AppContent() {
  const { isHydrated } = StoreContainer.useContainer()

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4 mx-auto"></div>
          <p className="text-gray-600 text-lg">Loading your CV builder...</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <CVBuilder />
    </main>
  )
}

export default function HomePage() {
  return (
    <StoreContainer.Provider>
      <AppContent />
    </StoreContainer.Provider>
  )
}
