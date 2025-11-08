"use client"

import type React from "react"

import { useState } from "react"
import { useStore } from "@/lib/simple-store"
import { MoveEditSection } from "@/components/move-edit-section"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Plus, X } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"

export function ExperienceEditor() {
  const { toast } = useToast()
  const { experience, addExperience, updateExperience, removeExperience, moveExperienceUp, moveExperienceDown } =
    useStore((state) => ({
      experience: state.experience,
      addExperience: state.addExperience,
      updateExperience: state.updateExperience,
      removeExperience: state.removeExperience,
      moveExperienceUp: state.moveExperienceUp,
      moveExperienceDown: state.moveExperienceDown,
    }))

  const [newExperience, setNewExperience] = useState({
    company: "",
    position: "",
    startDate: null as Date | null,
    endDate: null as Date | null,
    current: false,
    location: "",
    description: "",
    highlights: [] as string[],
  })

  const [newHighlight, setNewHighlight] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewExperience((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (checked: boolean) => {
    setNewExperience((prev) => ({ ...prev, current: checked, endDate: checked ? null : prev.endDate }))
  }

  const handleAddHighlight = () => {
    if (!newHighlight.trim()) return
    setNewExperience((prev) => ({
      ...prev,
      highlights: [...prev.highlights, newHighlight],
    }))
    setNewHighlight("")
  }

  const handleRemoveHighlight = (index: number) => {
    setNewExperience((prev) => ({
      ...prev,
      highlights: prev.highlights.filter((_, i) => i !== index),
    }))
  }

  const handleAddExperience = () => {
    if (!newExperience.company || !newExperience.position || !newExperience.startDate) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    addExperience({
      id: `experience-${Date.now()}`,
      company: newExperience.company,
      position: newExperience.position,
      startDate: newExperience.startDate,
      endDate: newExperience.endDate,
      current: newExperience.current,
      location: newExperience.location,
      description: newExperience.description,
      highlights: newExperience.highlights,
    })

    setNewExperience({
      company: "",
      position: "",
      startDate: null,
      endDate: null,
      current: false,
      location: "",
      description: "",
      highlights: [],
    })

    toast({
      title: "Experience added",
      description: `${newExperience.position} at ${newExperience.company} has been added`,
    })
  }

  const handleUpdateExperience = (index: number, field: string, value: any) => {
    const updatedExperience = [...experience]
    updatedExperience[index] = {
      ...updatedExperience[index],
      [field]: value,
    }

    if (field === "current" && value === true) {
      updatedExperience[index].endDate = null
    }

    updateExperience(updatedExperience)
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg border border-slate-200">
        <h3 className="text-lg font-medium mb-4">Add New Experience</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="company">Company*</Label>
            <Input
              id="company"
              name="company"
              value={newExperience.company}
              onChange={handleInputChange}
              placeholder="Lincoln High School"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="position">Position*</Label>
            <Input
              id="position"
              name="position"
              value={newExperience.position}
              onChange={handleInputChange}
              placeholder="Science Teacher"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              value={newExperience.location}
              onChange={handleInputChange}
              placeholder="City, State"
            />
          </div>
          <div className="space-y-2">
            <Label>Start Date*</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !newExperience.startDate && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {newExperience.startDate ? format(newExperience.startDate, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={newExperience.startDate || undefined}
                  onSelect={(date) => setNewExperience((prev) => ({ ...prev, startDate: date }))}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>End Date</Label>
              <div className="flex items-center space-x-2">
                <Switch checked={newExperience.current} onCheckedChange={handleSwitchChange} id="current-experience" />
                <Label htmlFor="current-experience" className="text-sm">
                  Currently Working
                </Label>
              </div>
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    (!newExperience.endDate || newExperience.current) && "text-muted-foreground",
                  )}
                  disabled={newExperience.current}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {newExperience.endDate && !newExperience.current
                    ? format(newExperience.endDate, "PPP")
                    : newExperience.current
                      ? "Present"
                      : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={newExperience.endDate || undefined}
                  onSelect={(date) => setNewExperience((prev) => ({ ...prev, endDate: date }))}
                  initialFocus
                  disabled={(date) => (newExperience.startDate ? date < newExperience.startDate : false)}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={newExperience.description}
            onChange={handleInputChange}
            placeholder="Brief description of your role and responsibilities..."
            className="min-h-[100px]"
          />
        </div>
        <div className="mt-4 space-y-2">
          <Label>Key Achievements</Label>
          <div className="flex gap-2">
            <Input
              value={newHighlight}
              onChange={(e) => setNewHighlight(e.target.value)}
              placeholder="Add a key achievement or responsibility..."
              onKeyPress={(e) => e.key === "Enter" && handleAddHighlight()}
            />
            <Button onClick={handleAddHighlight} type="button">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          {newExperience.highlights.length > 0 && (
            <div className="space-y-2">
              {newExperience.highlights.map((highlight, index) => (
                <div key={index} className="flex items-center gap-2 bg-slate-50 p-2 rounded">
                  <span className="flex-1 text-sm">{highlight}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveHighlight(index)}
                    className="h-6 w-6 text-red-500 hover:text-red-700"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="mt-6">
          <Button onClick={handleAddExperience} className="flex items-center gap-2">
            <Plus className="h-4 w-4" /> Add Experience
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Teaching Experience</h3>
        {experience.length === 0 ? (
          <p className="text-slate-500 italic">No experience entries yet. Add your first experience above.</p>
        ) : (
          experience.map((exp, index) => (
            <MoveEditSection
              key={exp.id}
              title={`${exp.position} at ${exp.company}`}
              index={index}
              length={experience.length}
              onMoveUp={moveExperienceUp}
              onMoveDown={moveExperienceDown}
              onDelete={removeExperience}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`company-${index}`}>Company</Label>
                  <Input
                    id={`company-${index}`}
                    value={exp.company}
                    onChange={(e) => handleUpdateExperience(index, "company", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`position-${index}`}>Position</Label>
                  <Input
                    id={`position-${index}`}
                    value={exp.position}
                    onChange={(e) => handleUpdateExperience(index, "position", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`location-${index}`}>Location</Label>
                  <Input
                    id={`location-${index}`}
                    value={exp.location}
                    onChange={(e) => handleUpdateExperience(index, "location", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Currently Working</Label>
                    <Switch
                      checked={exp.current}
                      onCheckedChange={(checked) => handleUpdateExperience(index, "current", checked)}
                      id={`current-experience-${index}`}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <Label htmlFor={`description-${index}`}>Description</Label>
                <Textarea
                  id={`description-${index}`}
                  value={exp.description}
                  onChange={(e) => handleUpdateExperience(index, "description", e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
            </MoveEditSection>
          ))
        )}
      </div>
    </div>
  )
}
