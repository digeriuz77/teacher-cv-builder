"use client"

import { Button } from "@/components/ui/button"
import { ChevronRight, Coffee, Shield } from "lucide-react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface SidebarProps {
  onSectionClick: (section: string) => void
}

export function Sidebar({ onSectionClick }: SidebarProps) {
  const [dataSafetyOpen, setDataSafetyOpen] = useState(false)

  const sections = [
    { id: "basic-details", name: "Basic details" },
    { id: "skills", name: "Curriculum & expertise" },
    { id: "education", name: "Education" },
    { id: "experience", name: "Work history" },
    { id: "activities", name: "Professional experiences" },
    { id: "volunteering", name: "Certifications" },
  ]

  return (
    <div className="w-full md:w-80 bg-white p-4 border-r border-gray-200 print:hidden">
      {/* Buy Me a Coffee Button */}
      <div className="mb-6">
        <a
          href="https://buymeacoffee.com/garystanyard"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-semibold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2 group"
        >
          <Coffee className="h-5 w-5 group-hover:animate-bounce" />
          <span>Buy me a coffee! ☕</span>
        </a>
        <p className="text-xs text-gray-500 text-center mt-2">Support the development of this free CV builder</p>
      </div>

      <div className="space-y-1">
        {sections.map((section) => (
          <Button
            key={section.id}
            variant="ghost"
            className="w-full justify-between text-slate-800 hover:bg-slate-100"
            onClick={() => onSectionClick(section.id)}
          >
            {section.name}
            <ChevronRight className="h-4 w-4" />
          </Button>
        ))}
      </div>
      <div className="mt-8">
        <Button variant="outline" className="w-full text-slate-800" onClick={() => setDataSafetyOpen(true)}>
          <Shield className="h-4 w-4 mr-2" />
          Data Safety
        </Button>
      </div>

      {/* Data Safety Dialog */}
      <Dialog open={dataSafetyOpen} onOpenChange={setDataSafetyOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Data Safety Information</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-gray-700 leading-relaxed">
              Your CV data is stored locally in your browser and never sent to our servers. This is one of the simplest
              and safest types of web applications - it's essentially a fancy calculator that happens to format resumes
              - Clear your browser data to remove all information. Or leave it there to come back another time.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
