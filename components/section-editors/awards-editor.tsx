"use client"

import type React from "react"

import { useState } from "react"
import { useStore } from "@/lib/simple-store"
import { MoveEditSection } from "@/components/move-edit-section"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Plus } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"

export function AwardsEditor() {
  const { toast } = useToast()
  const { awards, addAward, updateAwards, removeAward, moveAwardUp, moveAwardDown } = useStore((state) => ({
    awards: state.awards,
    addAward: state.addAward,
    updateAwards: state.updateAwards,
    removeAward: state.removeAward,
    moveAwardUp: state.moveAwardUp,
    moveAwardDown: state.moveAwardDown,
  }))

  const [newAward, setNewAward] = useState({
    title: "",
    date: null as Date | null,
    awarder: "",
    summary: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewAward((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddAward = () => {
    if (!newAward.title || !newAward.awarder || !newAward.date) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    addAward({
      id: `award-${Date.now()}`,
      title: newAward.title,
      date: newAward.date,
      awarder: newAward.awarder,
      summary: newAward.summary,
    })

    setNewAward({
      title: "",
      date: null,
      awarder: "",
      summary: "",
    })

    toast({
      title: "Award added",
      description: `${newAward.title} has been added`,
    })
  }

  const handleUpdateAward = (index: number, field: string, value: any) => {
    const updatedAwards = [...awards]
    updatedAwards[index] = {
      ...updatedAwards[index],
      [field]: value,
    }

    updateAwards(updatedAwards)
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg border border-slate-200">
        <h3 className="text-lg font-medium mb-4">Add New Award</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="title">Award Title*</Label>
            <Input
              id="title"
              name="title"
              value={newAward.title}
              onChange={handleInputChange}
              placeholder="Teacher of the Year"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="awarder">Awarded By*</Label>
            <Input
              id="awarder"
              name="awarder"
              value={newAward.awarder}
              onChange={handleInputChange}
              placeholder="School District"
            />
          </div>
          <div className="space-y-2">
            <Label>Date Received*</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !newAward.date && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {newAward.date ? format(newAward.date, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={newAward.date || undefined}
                  onSelect={(date) => setNewAward((prev) => ({ ...prev, date }))}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <Label htmlFor="summary">Summary</Label>
          <Textarea
            id="summary"
            name="summary"
            value={newAward.summary}
            onChange={handleInputChange}
            placeholder="Brief description of the award and why you received it..."
            className="min-h-[100px]"
          />
        </div>
        <div className="mt-6">
          <Button onClick={handleAddAward} className="flex items-center gap-2">
            <Plus className="h-4 w-4" /> Add Award
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Awards & Recognition</h3>
        {awards.length === 0 ? (
          <p className="text-slate-500 italic">No awards yet. Add your first award above.</p>
        ) : (
          awards.map((award, index) => (
            <MoveEditSection
              key={award.id}
              title={award.title}
              index={index}
              length={awards.length}
              onMoveUp={moveAwardUp}
              onMoveDown={moveAwardDown}
              onDelete={removeAward}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`title-${index}`}>Award Title</Label>
                  <Input
                    id={`title-${index}`}
                    value={award.title}
                    onChange={(e) => handleUpdateAward(index, "title", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`awarder-${index}`}>Awarded By</Label>
                  <Input
                    id={`awarder-${index}`}
                    value={award.awarder}
                    onChange={(e) => handleUpdateAward(index, "awarder", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Date Received</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {award.date ? format(new Date(award.date), "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={award.date ? new Date(award.date) : undefined}
                        onSelect={(date) => handleUpdateAward(index, "date", date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <Label htmlFor={`summary-${index}`}>Summary</Label>
                <Textarea
                  id={`summary-${index}`}
                  value={award.summary}
                  onChange={(e) => handleUpdateAward(index, "summary", e.target.value)}
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
