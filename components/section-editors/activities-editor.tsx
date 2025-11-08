"use client"

import { useState } from "react"
import { useStore } from "@/lib/simple-store"
import { MoveEditSection } from "@/components/move-edit-section"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

const PROFESSIONAL_EXPERIENCES = [
  "Model United Nations (MUN) Advisor",
  "Debate Team Coach",
  "World Scholar's Cup Coordinator",
  "Academic Decathlon Coach",
  "Quiz Bowl Moderator",
  "Duke of Edinburgh Award Leader",
  "Student Government Advisor",
  "Habitat for Humanity Coordinator",
  "Interact Club Advisor",
  "Key Club Advisor",
  "School Play Director",
  "Musical Director",
  "Yearbook Advisor",
  "School Newspaper Editor",
  "Literary Magazine Advisor",
  "Robotics Club Mentor",
  "Coding Club Instructor",
  "Makerspace Coordinator",
  "Outdoor Education Leader",
  "Ski & Snowboard Club Advisor",
  "Drama Club Director",
  "Art Club Coordinator",
  "Science Fair Coordinator",
  "Math Olympiad Coach",
  "Language Club Advisor",
  "Environmental Club Leader",
  "Photography Club Mentor",
  "Chess Club Instructor",
  "Community Service Coordinator",
  "Peer Tutoring Program Manager",
  "International Exchange Coordinator",
  "Cultural Awareness Program Leader",
  "Anti-Bullying Initiative Coordinator",
  "Mental Health Awareness Advocate",
  "Technology Integration Specialist",
  "Curriculum Development Committee Member",
  "School Improvement Team Member",
  "Parent-Teacher Association Liaison",
  "New Teacher Mentor",
  "Professional Learning Community Leader",
]

export function ActivitiesEditor() {
  const { toast } = useToast()
  const { activities, addActivity, updateActivities, removeActivity, moveActivityUp, moveActivityDown } = useStore(
    (state) => ({
      activities: state.activities,
      addActivity: state.addActivity,
      updateActivities: state.updateActivities,
      removeActivity: state.removeActivity,
      moveActivityUp: state.moveActivityUp,
      moveActivityDown: state.moveActivityDown,
    }),
  )

  const [selectedExperiences, setSelectedExperiences] = useState<string[]>([])
  const [customActivity, setCustomActivity] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredExperiences = PROFESSIONAL_EXPERIENCES.filter((exp) =>
    exp.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleExperienceToggle = (experience: string) => {
    const newSelected = selectedExperiences.includes(experience)
      ? selectedExperiences.filter((item) => item !== experience)
      : [...selectedExperiences, experience]

    setSelectedExperiences(newSelected)
  }

  const handleAddSelectedExperiences = () => {
    selectedExperiences.forEach((experience) => {
      addActivity({
        id: `activity-${Date.now()}-${Math.random()}`,
        title: experience,
        organization: "", // Not needed for professional experiences
        startDate: null,
        endDate: null,
        current: false,
        description: "",
      })
    })

    setSelectedExperiences([])
    toast({
      title: "Professional experiences added",
      description: `${selectedExperiences.length} experience(s) have been added`,
    })
  }

  const handleAddCustomActivity = () => {
    if (!customActivity.trim()) return

    addActivity({
      id: `activity-${Date.now()}`,
      title: customActivity,
      organization: "",
      startDate: null,
      endDate: null,
      current: false,
      description: "",
    })

    setCustomActivity("")
    toast({
      title: "Professional experience added",
      description: `${customActivity} has been added`,
    })
  }

  const handleUpdateActivity = (index: number, field: string, value: any) => {
    const updatedActivities = [...activities]
    updatedActivities[index] = {
      ...updatedActivities[index],
      [field]: value,
    }
    updateActivities(updatedActivities)
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg border border-slate-200">
        <h3 className="text-lg font-medium mb-4">Add Professional Educator Experiences</h3>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="search">Search Experiences</Label>
            <Input
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for professional experiences..."
            />
          </div>

          <div className="max-h-60 overflow-y-auto border rounded-md p-4 space-y-2">
            {filteredExperiences.map((experience) => (
              <div key={experience} className="flex items-center space-x-2">
                <Checkbox
                  id={experience}
                  checked={selectedExperiences.includes(experience)}
                  onCheckedChange={() => handleExperienceToggle(experience)}
                />
                <Label htmlFor={experience} className="text-sm cursor-pointer">
                  {experience}
                </Label>
              </div>
            ))}
          </div>

          {selectedExperiences.length > 0 && (
            <Button onClick={handleAddSelectedExperiences} className="w-full">
              Add {selectedExperiences.length} Selected Experience(s)
            </Button>
          )}

          <div className="border-t pt-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div className="md:col-span-3 space-y-2">
                <Label htmlFor="custom-activity">Add Custom Experience</Label>
                <Input
                  id="custom-activity"
                  value={customActivity}
                  onChange={(e) => setCustomActivity(e.target.value)}
                  placeholder="e.g., Special program coordinator"
                  onKeyPress={(e) => e.key === "Enter" && handleAddCustomActivity()}
                />
              </div>
              <Button onClick={handleAddCustomActivity} className="flex items-center gap-2">
                <Plus className="h-4 w-4" /> Add Custom
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Professional Educator Experiences</h3>
        {activities.length === 0 ? (
          <p className="text-slate-500 italic">No professional experiences yet. Add from the list above.</p>
        ) : (
          activities.map((activity, index) => (
            <MoveEditSection
              key={activity.id}
              title={activity.title}
              index={index}
              length={activities.length}
              onMoveUp={moveActivityUp}
              onMoveDown={moveActivityDown}
              onDelete={removeActivity}
            >
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor={`title-${index}`}>Experience Title</Label>
                  <Input
                    id={`title-${index}`}
                    value={activity.title}
                    onChange={(e) => handleUpdateActivity(index, "title", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`description-${index}`}>Description (Optional)</Label>
                  <Textarea
                    id={`description-${index}`}
                    value={activity.description}
                    onChange={(e) => handleUpdateActivity(index, "description", e.target.value)}
                    placeholder="Brief description of your role and achievements..."
                    className="min-h-[80px]"
                  />
                </div>
              </div>
            </MoveEditSection>
          ))
        )}
      </div>
    </div>
  )
}
