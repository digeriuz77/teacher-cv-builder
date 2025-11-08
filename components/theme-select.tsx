"use client"
import { CVStore } from "@/lib/store"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Check } from "lucide-react"
import { useCallback } from "react"

interface ThemeSelectProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ThemeSelect({ open, onOpenChange }: ThemeSelectProps) {
  const { theme, setTheme } = CVStore()

  const themes = [
    {
      id: "blue",
      name: "Professional Blue",
      colors: {
        backgroundColor: "#E7EEFA",
        fontColor: "#2E4052",
        titleColor: "#59748F",
        highlightColor: "#A8B9CC",
      },
    },
    {
      id: "green",
      name: "Educational Green",
      colors: {
        backgroundColor: "#E6F4EA",
        fontColor: "#2D3B2D",
        titleColor: "#4C7553",
        highlightColor: "#9BBEA9",
      },
    },
    {
      id: "purple",
      name: "Academic Purple",
      colors: {
        backgroundColor: "#F3E8FD",
        fontColor: "#3C2E58",
        titleColor: "#6750A4",
        highlightColor: "#B69DF8",
      },
    },
    {
      id: "red",
      name: "Bold Red",
      colors: {
        backgroundColor: "#FDEDED",
        fontColor: "#5C2B29",
        titleColor: "#B3261E",
        highlightColor: "#F2B8B5",
      },
    },
  ]

  const handleThemeSelect = useCallback(
    (themeOption: (typeof themes)[0]) => {
      setTheme(themeOption)
    },
    [setTheme],
  )

  // Use default theme for server rendering and initial client render
  const currentTheme = theme

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[475px]">
        <DialogHeader>
          <DialogTitle>Choose a resume color scheme</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-2">
          {themes.map((themeOption) => (
            <div
              key={themeOption.id}
              className={`flex border rounded p-4 justify-between items-center cursor-pointer ${
                currentTheme.id === themeOption.id
                  ? "bg-slate-50 border-slate-500"
                  : "border-gray-300 hover:border-slate-400"
              }`}
              onClick={() => handleThemeSelect(themeOption)}
            >
              <div className="flex gap-2">
                {Object.entries(themeOption.colors).map(([key, color]) => (
                  <div
                    key={key}
                    className="w-6 h-6 rounded-full border border-gray-300"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <div className="font-medium">{themeOption.name}</div>
              {currentTheme.id === themeOption.id && <Check className="h-5 w-5 text-green-600" />}
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
