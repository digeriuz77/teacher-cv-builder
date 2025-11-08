"use client"

import { useState, useRef } from "react"
import { Navbar } from "./navbar"
import { Sidebar } from "./sidebar"
import { CVPreview } from "./cv-preview"
import { CVEditor } from "./cv-editor"
import { useToast } from "@/components/ui/use-toast"
import { CVStore } from "@/lib/store"

export default function CVBuilder() {
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const previewRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()
  const { resetAllSections } = CVStore()

  const handleSectionClick = (section: string) => {
    setActiveSection(section)
  }

  const handleBackClick = () => {
    setActiveSection(null)
    // Force a re-render of the preview when returning from editing
    setTimeout(() => {
      const previewElement = document.querySelector(".cv-preview-content")
      if (previewElement) {
        // Trigger a DOM update by toggling a class
        previewElement.classList.add("refreshed")
        setTimeout(() => previewElement.classList.remove("refreshed"), 10)
      }
    }, 50)
  }

  const scrollToPreview = () => {
    previewRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }

  const handleDownloadPDF = () => {
    toast({
      title: "Downloading PDF",
      description: "Your CV is being prepared for download",
    })
    // In a real implementation, we would generate and download the PDF here
    setTimeout(() => {
      toast({
        title: "PDF Ready",
        description: "Your CV has been downloaded",
      })
    }, 1500)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onDownloadPDF={handleDownloadPDF} />
      <div className="flex flex-col md:flex-row flex-1">
        {!activeSection ? (
          <>
            <Sidebar onSectionClick={handleSectionClick} />
            <div className="flex-1 p-4 md:p-8" ref={previewRef}>
              <CVPreview />
            </div>
          </>
        ) : (
          <CVEditor section={activeSection} onBackClick={handleBackClick} />
        )}
      </div>
    </div>
  )
}
