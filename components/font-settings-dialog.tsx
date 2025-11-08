"use client"

import { useState } from "react"
import { CVStore } from "@/lib/store"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { useToast } from "@/components/ui/use-toast"

interface FontSettingsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const FONT_OPTIONS = [
  { value: "Arial, sans-serif", label: "Arial" },
  { value: "Helvetica, Arial, sans-serif", label: "Helvetica" },
  { value: "Times New Roman, serif", label: "Times New Roman" },
  { value: "Georgia, serif", label: "Georgia" },
  { value: "Calibri, sans-serif", label: "Calibri" },
  { value: "Verdana, sans-serif", label: "Verdana" },
  { value: "Trebuchet MS, sans-serif", label: "Trebuchet MS" },
  { value: "Palatino, serif", label: "Palatino" },
  { value: "Garamond, serif", label: "Garamond" },
  { value: "Book Antiqua, serif", label: "Book Antiqua" },
  { value: "Tahoma, sans-serif", label: "Tahoma" },
  { value: "Lucida Grande, sans-serif", label: "Lucida Grande" },
]

export function FontSettingsDialog({ open, onOpenChange }: FontSettingsDialogProps) {
  const { toast } = useToast()
  const { fontSettings, updateFontSettings } = CVStore()

  const [selectedFont, setSelectedFont] = useState(fontSettings.fontFamily)
  const [fontSize, setFontSize] = useState([fontSettings.fontSize])

  const handleSave = () => {
    updateFontSettings({
      fontFamily: selectedFont,
      fontSize: fontSize[0],
    })

    toast({
      title: "Font settings saved",
      description: `Font changed to ${FONT_OPTIONS.find((f) => f.value === selectedFont)?.label} at ${fontSize[0]}px`,
    })

    onOpenChange(false)
  }

  const handleReset = () => {
    setSelectedFont("Arial, sans-serif")
    setFontSize([12])
  }

  const previewStyle = {
    fontFamily: selectedFont,
    fontSize: `${fontSize[0]}px`,
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Font Settings</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Font Family Selection */}
          <div className="space-y-3">
            <Label>Font Family</Label>
            <Select value={selectedFont} onValueChange={setSelectedFont}>
              <SelectTrigger>
                <SelectValue placeholder="Select a font" />
              </SelectTrigger>
              <SelectContent>
                {FONT_OPTIONS.map((font) => (
                  <SelectItem key={font.value} value={font.value}>
                    <span style={{ fontFamily: font.value }}>{font.label}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Font Size Selection */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Font Size</Label>
              <span className="text-sm text-gray-500">{fontSize[0]}px</span>
            </div>
            <Slider value={fontSize} onValueChange={setFontSize} max={18} min={8} step={1} className="w-full" />
            <div className="flex justify-between text-xs text-gray-400">
              <span>8px</span>
              <span>13px</span>
              <span>18px</span>
            </div>
          </div>

          {/* Preview */}
          <div className="space-y-3">
            <Label>Preview</Label>
            <div className="border rounded-lg p-4 bg-gray-50" style={previewStyle}>
              <h3 className="font-semibold mb-2">Teaching Experience</h3>
              <h4 className="font-medium">Senior English Teacher</h4>
              <p className="text-gray-600">International School</p>
              <p className="text-sm mt-1">
                Led English department and coordinated IB Diploma Programme for international school serving 800+
                students.
              </p>
              <ul className="text-sm mt-2 list-disc list-inside">
                <li>Increased IB English pass rates from 78% to 96% over 4 years</li>
                <li>Developed comprehensive ESL support programme</li>
              </ul>
            </div>
          </div>

          <div className="text-sm text-gray-500 bg-blue-50 p-3 rounded-lg">
            <p className="font-medium mb-1">Font Guidelines:</p>
            <p>
              • <strong>Professional fonts:</strong> Arial, Calibri, Times New Roman
            </p>
            <p>
              • <strong>Recommended size:</strong> 10-12px for body text
            </p>
            <p>
              • <strong>ATS-friendly:</strong> Avoid decorative fonts for better parsing
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleReset}>
            Reset to Default
          </Button>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
