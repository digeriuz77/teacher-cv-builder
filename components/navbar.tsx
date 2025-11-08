"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ThemeSelect } from "./theme-select"
import { TemplateSelect } from "./template-select"
import { Download, MoreHorizontal, Palette, Layout } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface NavbarProps {
  onDownloadPDF: () => void
}

export function Navbar({ onDownloadPDF }: NavbarProps) {
  const [templateMenuOpen, setTemplateMenuOpen] = useState(false)
  const [colorMenuOpen, setColorMenuOpen] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const handleBeforePrint = () => {
      // Set a clean document title without timestamp for the PDF
      document.title = "Professional_Resume"
    }

    const handleAfterPrint = () => {
      document.title = "Educator CV Builder"
    }

    window.addEventListener("beforeprint", handleBeforePrint)
    window.addEventListener("afterprint", handleAfterPrint)

    return () => {
      window.removeEventListener("beforeprint", handleBeforePrint)
      window.removeEventListener("afterprint", handleAfterPrint)
    }
  }, [])

  const handleDownloadPDF = () => {
    toast({
      title: "Generating PDF",
      description:
        "Your CV is being prepared. IMPORTANT: In the print dialog, click 'More settings' and turn OFF 'Headers and footers' for a clean resume without dates/filenames.",
      duration: 8000,
    })

    // Use browser's native print functionality
    setTimeout(() => {
      window.print()
    }, 100)
  }

  return (
    <nav className="h-14 w-full bg-slate-800 flex py-2.5 px-4 items-center shadow-md z-20 print:hidden">
      <div className="flex items-center">
        <div className="text-white font-bold text-xl mr-4">TeacherCV</div>
      </div>

      <div className="flex-auto flex justify-between items-center">
        <div className="hidden md:flex space-x-2">
          <Button variant="ghost" className="text-white" onClick={() => setTemplateMenuOpen(true)}>
            <Layout className="w-4 h-4 mr-2" />
            Templates
          </Button>
          <Button variant="ghost" className="text-white" onClick={() => setColorMenuOpen(true)}>
            <Palette className="w-4 h-4 mr-2" />
            Colors
          </Button>
        </div>

        <div className="hidden md:flex space-x-2">
          <Button
            variant="outline"
            onClick={handleDownloadPDF}
            className="text-blue-900 border-blue-900 hover:bg-black hover:text-white hover:border-black"
          >
            <Download className="w-4 h-4 mr-2" />
            Download as PDF
          </Button>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="text-white">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTemplateMenuOpen(true)}>Templates</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setColorMenuOpen(true)}>Colors</DropdownMenuItem>
            <DropdownMenuItem onClick={handleDownloadPDF}>Download as PDF</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <TemplateSelect open={templateMenuOpen} onOpenChange={setTemplateMenuOpen} />

      <ThemeSelect open={colorMenuOpen} onOpenChange={setColorMenuOpen} />
    </nav>
  )
}
