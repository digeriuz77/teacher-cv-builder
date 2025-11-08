"use client"

import { useState } from "react"
import { useStore } from "@/lib/simple-store"
import { EditSectionContainer } from "@/components/edit-section-container"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, X } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

const CURRICULUM_OPTIONS = [
  "International Baccalaureate (IB)",
  "Advanced Placement (AP)",
  "Cambridge International",
  "Common Core State Standards",
  "Next Generation Science Standards (NGSS)",
  "British National Curriculum",
  "Australian Curriculum",
  "Ontario Curriculum",
  "Singapore Math",
  "Montessori Method",
  "Waldorf/Steiner Education",
  "Reggio Emilia Approach",
  "Project-Based Learning (PBL)",
  "STEAM/STEM Integration",
  "Inquiry-Based Learning",
  "Differentiated Instruction",
  "Universal Design for Learning (UDL)",
  "Social-Emotional Learning (SEL)",
  "Restorative Justice Practices",
  "Trauma-Informed Teaching",
  "Culturally Responsive Teaching",
  "English as a Second Language (ESL)",
  "Special Education (SPED)",
  "Gifted and Talented Education",
  "Early Years Foundation Stage (EYFS)",
  "Primary Years Programme (PYP)",
  "Middle Years Programme (MYP)",
  "Diploma Programme (DP)",
  "Career-related Programme (CP)",
  "A-Levels",
  "GCSE",
  "IGCSE",
  "SAT Preparation",
  "ACT Preparation",
  "TOEFL/IELTS Preparation",
]

export function SkillsEditor() {
  const { toast } = useToast()
  const { skills, updateSkills } = useStore((state) => ({
    skills: state.skills,
    updateSkills: state.updateSkills,
  }))

  const [selectedCurricula, setSelectedCurricula] = useState<string[]>(skills.map((skill) => skill.name) || [])
  const [customSkill, setCustomSkill] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredOptions = CURRICULUM_OPTIONS.filter((option) => option.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleCurriculumToggle = (curriculum: string) => {
    const newSelected = selectedCurricula.includes(curriculum)
      ? selectedCurricula.filter((item) => item !== curriculum)
      : [...selectedCurricula, curriculum]

    setSelectedCurricula(newSelected)

    const updatedSkills = newSelected.map((name, index) => ({
      id: `skill-${index + 1}`,
      name,
      level: 5, // Not used in display anymore
    }))

    updateSkills(updatedSkills)
  }

  const handleAddCustomSkill = () => {
    if (!customSkill.trim()) return

    const newSelected = [...selectedCurricula, customSkill]
    setSelectedCurricula(newSelected)

    const updatedSkills = newSelected.map((name, index) => ({
      id: `skill-${index + 1}`,
      name,
      level: 5,
    }))

    updateSkills(updatedSkills)
    setCustomSkill("")

    toast({
      title: "Curriculum added",
      description: `${customSkill} has been added to your expertise`,
    })
  }

  const handleRemoveSkill = (skillToRemove: string) => {
    const newSelected = selectedCurricula.filter((skill) => skill !== skillToRemove)
    setSelectedCurricula(newSelected)

    const updatedSkills = newSelected.map((name, index) => ({
      id: `skill-${index + 1}`,
      name,
      level: 5,
    }))

    updateSkills(updatedSkills)

    toast({
      title: "Curriculum removed",
      description: "The curriculum has been removed from your list",
    })
  }

  return (
    <div className="space-y-6">
      <EditSectionContainer title="Curriculum & Teaching Expertise" isEnabled={true} setIsEnabled={() => {}}>
        <div className="space-y-6">
          <div className="space-y-4">
            <Label htmlFor="search">Search Curricula</Label>
            <Input
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for curricula or teaching methods..."
            />
          </div>

          <div className="max-h-60 overflow-y-auto border rounded-md p-4 space-y-2">
            {filteredOptions.map((curriculum) => (
              <div key={curriculum} className="flex items-center space-x-2">
                <Checkbox
                  id={curriculum}
                  checked={selectedCurricula.includes(curriculum)}
                  onCheckedChange={() => handleCurriculumToggle(curriculum)}
                />
                <Label htmlFor={curriculum} className="text-sm cursor-pointer">
                  {curriculum}
                </Label>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div className="md:col-span-3 space-y-2">
              <Label htmlFor="custom-skill">Add Custom Expertise</Label>
              <Input
                id="custom-skill"
                value={customSkill}
                onChange={(e) => setCustomSkill(e.target.value)}
                placeholder="e.g., Specific teaching methodology"
                onKeyPress={(e) => e.key === "Enter" && handleAddCustomSkill()}
              />
            </div>
            <Button onClick={handleAddCustomSkill} className="flex items-center gap-2">
              <Plus className="h-4 w-4" /> Add
            </Button>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-medium mb-2">Selected Expertise ({selectedCurricula.length})</h3>
            {selectedCurricula.length === 0 ? (
              <p className="text-slate-500 italic">No curricula selected yet. Choose from the list above.</p>
            ) : (
              <div className="space-y-2">
                {selectedCurricula.map((skill) => (
                  <div key={skill} className="flex items-center justify-between bg-slate-50 p-3 rounded-md">
                    <span className="font-medium">{skill}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveSkill(skill)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </EditSectionContainer>
    </div>
  )
}
