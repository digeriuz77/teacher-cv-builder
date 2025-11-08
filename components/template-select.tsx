"use client"
import { CVStore } from "@/lib/store"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Check, Github } from "lucide-react"
import { useCallback } from "react"

interface TemplateSelectProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TemplateSelect({ open, onOpenChange }: TemplateSelectProps) {
  const { template, setTemplate } = CVStore()

  const templates = [
    {
      id: "modern",
      name: "Modern",
      thumbnail: "/placeholder.svg?height=255&width=180",
    },
    {
      id: "professional",
      name: "Professional",
      thumbnail: "/placeholder.svg?height=255&width=180",
    },
    {
      id: "academic",
      name: "Academic",
      thumbnail: "/placeholder.svg?height=255&width=180",
    },
    {
      id: "creative",
      name: "Creative",
      thumbnail: "/placeholder.svg?height=255&width=180",
    },
  ]

  const handleTemplateSelect = useCallback(
    (templateOption: (typeof templates)[0]) => {
      setTemplate(templateOption)
    },
    [setTemplate],
  )

  const handleGithubClick = useCallback(() => {
    window.open("https://github.com", "_blank")
  }, [])

  // Use default template for server rendering and initial client render
  const currentTemplate = template

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Choose a resume template</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4">
          {templates.map((templateOption) => (
            <div
              key={templateOption.id}
              className={`relative cursor-pointer rounded-md overflow-hidden border-2 ${
                currentTemplate.id === templateOption.id ? "border-slate-800" : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => handleTemplateSelect(templateOption)}
            >
              <div className="w-full h-auto">
                <img
                  src={templateOption.thumbnail || "/placeholder.svg"}
                  alt={templateOption.name}
                  className="w-full h-auto"
                />
              </div>
              <div className="p-2 text-center font-medium">{templateOption.name}</div>
              {currentTemplate.id === templateOption.id && (
                <div className="absolute top-2 right-2 bg-white rounded-full p-1">
                  <Check className="h-4 w-4 text-green-600" />
                </div>
              )}
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleGithubClick}>
            <Github className="mr-2 h-4 w-4" />
            Contribute on GitHub
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
