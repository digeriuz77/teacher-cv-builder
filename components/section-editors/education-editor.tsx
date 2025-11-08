"use client"

import type React from "react"

import { useState } from "react"
import { useStore } from "@/lib/simple-store"
import { MoveEditSection } from "@/components/move-edit-section"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Plus } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"

export function EducationEditor() {
  const { toast } = useToast()
  const {
    education,
    addEducation,
    updateEducation,
    removeEducation,
    moveEducationUp,
    moveEducationDown,
    educationDisplaySettings,
    updateEducationDisplaySettings,
  } = useStore((state) => ({
    education: state.education,
    addEducation: state.addEducation,
    updateEducation: state.updateEducation,
    removeEducation: state.removeEducation,
    moveEducationUp: state.moveEducationUp,
    moveEducationDown: state.moveEducationDown,
    educationDisplaySettings: state.educationDisplaySettings,
    updateEducationDisplaySettings: state.updateEducationDisplaySettings,
  }))

  const [newEducation, setNewEducation] = useState({
    institution: "",
    degree: "",
    field: "",
    startDate: null as Date | null,
    endDate: null as Date | null,
    current: false,
    location: "",
    description: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewEducation((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (checked: boolean) => {
    setNewEducation((prev) => ({ ...prev, current: checked, endDate: checked ? null : prev.endDate }))
  }

  const handleAddEducation = () => {
    if (!newEducation.institution || !newEducation.degree || !newEducation.startDate) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    addEducation({
      id: `education-${Date.now()}`,
      institution: newEducation.institution,
      degree: newEducation.degree,
      field: newEducation.field,
      startDate: newEducation.startDate,
      endDate: newEducation.endDate,
      current: newEducation.current,
      location: newEducation.location,
      description: newEducation.description,
      showInstitution: true,
      showField: true,
      showLocation: true,
      showDescription: true,
      showDates: true,
    })

    setNewEducation({
      institution: "",
      degree: "",
      field: "",
      startDate: null,
      endDate: null,
      current: false,
      location: "",
      description: "",
    })

    toast({
      title: "Education added",
      description: `${newEducation.degree} at ${newEducation.institution} has been added`,
    })
  }

  const handleUpdateEducation = (index: number, field: string, value: any) => {
    const updatedEducation = [...education]
    updatedEducation[index] = {
      ...updatedEducation[index],
      [field]: value,
    }

    // If current is true, clear end date
    if (field === "current" && value === true) {
      updatedEducation[index].endDate = null
    }

    updateEducation(updatedEducation)
  }

  return (
    <div className="space-y-6">
      {/* Global Display Settings */}
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h3 className="text-lg font-medium mb-4">Display Settings for All Education Entries</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium">Show Institutions</Label>
              <p className="text-sm text-gray-600">Display the institution name for each education entry</p>
            </div>
            <Switch
              checked={educationDisplaySettings.showInstitutions}
              onCheckedChange={(checked) =>
                updateEducationDisplaySettings({ ...educationDisplaySettings, showInstitutions: checked })
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium">Show Field of Study</Label>
              <p className="text-sm text-gray-600">Display the field of study or specialization</p>
            </div>
            <Switch
              checked={educationDisplaySettings.showFields}
              onCheckedChange={(checked) =>
                updateEducationDisplaySettings({ ...educationDisplaySettings, showFields: checked })
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium">Show Locations</Label>
              <p className="text-sm text-gray-600">Display the location of the institution</p>
            </div>
            <Switch
              checked={educationDisplaySettings.showLocations}
              onCheckedChange={(checked) =>
                updateEducationDisplaySettings({ ...educationDisplaySettings, showLocations: checked })
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium">Show Dates</Label>
              <p className="text-sm text-gray-600">Display start and end dates</p>
            </div>
            <Switch
              checked={educationDisplaySettings.showDates}
              onCheckedChange={(checked) =>
                updateEducationDisplaySettings({ ...educationDisplaySettings, showDates: checked })
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium">Show Additional Details</Label>
              <p className="text-sm text-gray-600">Display descriptions, achievements, or coursework</p>
            </div>
            <Switch
              checked={educationDisplaySettings.showDescriptions}
              onCheckedChange={(checked) =>
                updateEducationDisplaySettings({ ...educationDisplaySettings, showDescriptions: checked })
              }
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border border-slate-200">
        <h3 className="text-lg font-medium mb-4">Add New Education</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="institution">Institution*</Label>
            <Input
              id="institution"
              name="institution"
              value={newEducation.institution}
              onChange={handleInputChange}
              placeholder="University of Education"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              value={newEducation.location}
              onChange={handleInputChange}
              placeholder="City, State"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="degree">Degree*</Label>
            <Input
              id="degree"
              name="degree"
              value={newEducation.degree}
              onChange={handleInputChange}
              placeholder="Bachelor of Education"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="field">Field of Study</Label>
            <Input
              id="field"
              name="field"
              value={newEducation.field}
              onChange={handleInputChange}
              placeholder="Mathematics Education"
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
                    !newEducation.startDate && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {newEducation.startDate ? format(newEducation.startDate, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={newEducation.startDate || undefined}
                  onSelect={(date) => setNewEducation((prev) => ({ ...prev, startDate: date }))}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>End Date</Label>
              <div className="flex items-center space-x-2">
                <Switch checked={newEducation.current} onCheckedChange={handleSwitchChange} id="current-education" />
                <Label htmlFor="current-education" className="text-sm">
                  Currently Studying
                </Label>
              </div>
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    (!newEducation.endDate || newEducation.current) && "text-muted-foreground",
                  )}
                  disabled={newEducation.current}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {newEducation.endDate && !newEducation.current
                    ? format(newEducation.endDate, "PPP")
                    : newEducation.current
                      ? "Present"
                      : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={newEducation.endDate || undefined}
                  onSelect={(date) => setNewEducation((prev) => ({ ...prev, endDate: date }))}
                  initialFocus
                  disabled={(date) => (newEducation.startDate ? date < newEducation.startDate : false)}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            name="description"
            value={newEducation.description}
            onChange={handleInputChange}
            placeholder="Relevant coursework, achievements, etc."
          />
        </div>
        <div className="mt-6">
          <Button onClick={handleAddEducation} className="flex items-center gap-2">
            <Plus className="h-4 w-4" /> Add Education
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Education History</h3>
        {education.length === 0 ? (
          <p className="text-slate-500 italic">No education entries yet. Add your first education above.</p>
        ) : (
          education.map((edu, index) => (
            <MoveEditSection
              key={edu.id}
              title={`${edu.degree} at ${edu.institution}`}
              index={index}
              length={education.length}
              onMoveUp={moveEducationUp}
              onMoveDown={moveEducationDown}
              onDelete={removeEducation}
            >
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`institution-${index}`}>Institution</Label>
                    <Input
                      id={`institution-${index}`}
                      value={edu.institution}
                      onChange={(e) => handleUpdateEducation(index, "institution", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`location-${index}`}>Location</Label>
                    <Input
                      id={`location-${index}`}
                      value={edu.location}
                      onChange={(e) => handleUpdateEducation(index, "location", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`degree-${index}`}>Degree</Label>
                    <Input
                      id={`degree-${index}`}
                      value={edu.degree}
                      onChange={(e) => handleUpdateEducation(index, "degree", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`field-${index}`}>Field of Study</Label>
                    <Input
                      id={`field-${index}`}
                      value={edu.field}
                      onChange={(e) => handleUpdateEducation(index, "field", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {edu.startDate ? format(new Date(edu.startDate), "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={edu.startDate ? new Date(edu.startDate) : undefined}
                          onSelect={(date) => handleUpdateEducation(index, "startDate", date)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>End Date</Label>
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={edu.current}
                          onCheckedChange={(checked) => handleUpdateEducation(index, "current", checked)}
                          id={`current-education-${index}`}
                        />
                        <Label htmlFor={`current-education-${index}`} className="text-sm">
                          Currently Studying
                        </Label>
                      </div>
                    </div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            (!edu.endDate || edu.current) && "text-muted-foreground",
                          )}
                          disabled={edu.current}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {edu.endDate && !edu.current
                            ? format(new Date(edu.endDate), "PPP")
                            : edu.current
                              ? "Present"
                              : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={edu.endDate ? new Date(edu.endDate) : undefined}
                          onSelect={(date) => handleUpdateEducation(index, "endDate", date)}
                          initialFocus
                          disabled={(date) => (edu.startDate ? date < new Date(edu.startDate) : false)}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="font-medium">Individual Display Options</Label>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={edu.showInstitution !== false}
                        onCheckedChange={(checked) => handleUpdateEducation(index, "showInstitution", checked)}
                        id={`show-inst-${index}`}
                      />
                      <Label htmlFor={`show-inst-${index}`} className="text-sm">
                        Show institution for this entry
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={edu.showField !== false}
                        onCheckedChange={(checked) => handleUpdateEducation(index, "showField", checked)}
                        id={`show-field-${index}`}
                      />
                      <Label htmlFor={`show-field-${index}`} className="text-sm">
                        Show field of study
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={edu.showLocation !== false}
                        onCheckedChange={(checked) => handleUpdateEducation(index, "showLocation", checked)}
                        id={`show-loc-${index}`}
                      />
                      <Label htmlFor={`show-loc-${index}`} className="text-sm">
                        Show location
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={edu.showDates !== false}
                        onCheckedChange={(checked) => handleUpdateEducation(index, "showDates", checked)}
                        id={`show-dates-${index}`}
                      />
                      <Label htmlFor={`show-dates-${index}`} className="text-sm">
                        Show dates
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 md:col-span-2">
                      <Switch
                        checked={edu.showDescription !== false}
                        onCheckedChange={(checked) => handleUpdateEducation(index, "showDescription", checked)}
                        id={`show-desc-${index}`}
                      />
                      <Label htmlFor={`show-desc-${index}`} className="text-sm">
                        Show additional details for this entry
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`description-${index}`}>Description</Label>
                  <Input
                    id={`description-${index}`}
                    value={edu.description}
                    onChange={(e) => handleUpdateEducation(index, "description", e.target.value)}
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
