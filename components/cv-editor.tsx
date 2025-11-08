"use client"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { BasicDetailsEditor } from "./section-editors/basic-details-editor"
import { SkillsEditor } from "./section-editors/skills-editor"
import { EducationEditor } from "./section-editors/education-editor"
import { ExperienceEditor } from "./section-editors/experience-editor"
import { ActivitiesEditor } from "./section-editors/activities-editor"
import { VolunteeringEditor } from "./section-editors/volunteering-editor"

interface CVEditorProps {
  section: string
  onBackClick: () => void
}

export function CVEditor({ section, onBackClick }: CVEditorProps) {
  const getSectionTitle = (sectionId: string) => {
    switch (sectionId) {
      case "basic-details":
        return "Basic Details"
      case "skills":
        return "Curriculum & Teaching Expertise"
      case "education":
        return "Education"
      case "experience":
        return "Work History"
      case "activities":
        return "Professional Educator Experiences"
      case "volunteering":
        return "Professional Certifications"
      default:
        return "Section Editor"
    }
  }

  const renderEditor = () => {
    switch (section) {
      case "basic-details":
        return <BasicDetailsEditor />
      case "skills":
        return <SkillsEditor />
      case "education":
        return <EducationEditor />
      case "experience":
        return <ExperienceEditor />
      case "activities":
        return <ActivitiesEditor />
      case "volunteering":
        return <VolunteeringEditor />
      default:
        return <div>Select a section to edit</div>
    }
  }

  return (
    <div className="flex-1 p-4 md:p-8">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" onClick={onBackClick} className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-2xl font-bold text-slate-800">{getSectionTitle(section)}</h2>
      </div>
      {renderEditor()}
    </div>
  )
}
