"use client"

import { useState } from "react"
import { CVStore } from "@/lib/store"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"

interface LayoutSettingsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function LayoutSettingsDialog({ open, onOpenChange }: LayoutSettingsDialogProps) {
  const { toast } = useToast()
  const {
    sectionConfig,
    columnTitles,
    toggleSectionVisibility,
    updateColumnTitles,
    updateSectionColumn,
    updateSectionTitle,
  } = CVStore()

  const [leftTitle, setLeftTitle] = useState(columnTitles.left)
  const [rightTitle, setRightTitle] = useState(columnTitles.right)
  const [sectionTitles, setSectionTitles] = useState(() => {
    const titles: Record<string, string> = {}
    sectionConfig.forEach((section) => {
      titles[section.id] = section.title
    })
    return titles
  })

  const handleSave = () => {
    // Update column titles
    updateColumnTitles({
      left: leftTitle,
      right: rightTitle,
    })

    // Update section titles
    Object.entries(sectionTitles).forEach(([sectionId, title]) => {
      updateSectionTitle(sectionId as any, title)
    })

    toast({
      title: "Layout settings saved",
      description: "Your layout preferences have been updated",
    })

    onOpenChange(false)
  }

  const getSectionDisplayName = (sectionId: string) => {
    switch (sectionId) {
      case "skills":
        return "Curriculum & Teaching Expertise"
      case "education":
        return "Education"
      case "experience":
        return "Work Experience"
      case "activities":
        return "Professional Educator Experiences"
      case "volunteering":
        return "Professional Certifications"
      default:
        return sectionId
    }
  }

  const handleColumnChange = (sectionId: string, newColumn: "left" | "right") => {
    updateSectionColumn(sectionId, newColumn)
  }

  const handleSectionTitleChange = (sectionId: string, newTitle: string) => {
    setSectionTitles((prev) => ({
      ...prev,
      [sectionId]: newTitle,
    }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Layout Settings</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Column Titles */}
          <div className="space-y-4">
            <h4 className="font-medium">Column Headings</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="left-title">Left Column Title</Label>
                <Input
                  id="left-title"
                  value={leftTitle}
                  onChange={(e) => setLeftTitle(e.target.value)}
                  placeholder="e.g., Experience & Activities"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="right-title">Right Column Title</Label>
                <Input
                  id="right-title"
                  value={rightTitle}
                  onChange={(e) => setRightTitle(e.target.value)}
                  placeholder="e.g., Skills & Education"
                />
              </div>
            </div>
          </div>

          {/* Section Configuration */}
          <div className="space-y-4">
            <h4 className="font-medium">Section Configuration</h4>
            <div className="space-y-4">
              {sectionConfig
                .filter((section) => section.id !== "profile")
                .map((section) => (
                  <div key={section.id} className="p-4 border rounded-lg space-y-3">
                    {/* Section visibility and column */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Switch
                          id={`section-${section.id}`}
                          checked={section.visible}
                          onCheckedChange={() => toggleSectionVisibility(section.id)}
                        />
                        <Label htmlFor={`section-${section.id}`} className="font-medium">
                          {getSectionDisplayName(section.id)}
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Label className="text-sm text-gray-600">Column:</Label>
                        <Select
                          value={section.column}
                          onValueChange={(value: "left" | "right") => handleColumnChange(section.id, value)}
                          disabled={!section.visible}
                        >
                          <SelectTrigger className="w-24">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="left">Left</SelectItem>
                            <SelectItem value="right">Right</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Section title editing */}
                    <div className="space-y-2">
                      <Label htmlFor={`title-${section.id}`} className="text-sm text-gray-600">
                        Section Title:
                      </Label>
                      <Input
                        id={`title-${section.id}`}
                        value={sectionTitles[section.id] || section.title}
                        onChange={(e) => handleSectionTitleChange(section.id, e.target.value)}
                        placeholder={getSectionDisplayName(section.id)}
                        disabled={!section.visible}
                        className="text-sm"
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
            <p className="font-medium mb-1">How to use:</p>
            <p>• Toggle switches to show/hide sections</p>
            <p>• Use dropdowns to assign sections to left or right column</p>
            <p>• Edit section titles in the text fields below each section</p>
            <p>• Set column headings that appear above each column</p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
