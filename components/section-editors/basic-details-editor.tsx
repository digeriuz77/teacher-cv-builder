"use client"

import type React from "react"

import { useState } from "react"
import { CVStore } from "@/lib/store"
import { EditSectionContainer } from "@/components/edit-section-container"
import { ProfileImage } from "@/components/profile-image"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Linkedin, Globe, ImageIcon } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export function BasicDetailsEditor() {
  const { toast } = useToast()
  const { basicDetails, updateBasicDetails } = CVStore()

  const [formData, setFormData] = useState({
    name: basicDetails.name,
    label: basicDetails.label,
    email: basicDetails.email,
    phone: basicDetails.phone,
    location: basicDetails.location.city,
    url: basicDetails.url,
    summary: basicDetails.summary,
    objective: basicDetails.objective,
    image: basicDetails.image,
    showImage: basicDetails.showImage,
    linkedinUrl: basicDetails.profiles.find((p) => p.network === "LinkedIn")?.url || "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, showImage: checked }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Create the updated profiles array
    const profiles = formData.linkedinUrl ? [{ network: "LinkedIn", username: "", url: formData.linkedinUrl }] : []

    // Create the complete updated object
    const updatedDetails = {
      ...basicDetails,
      name: formData.name,
      label: formData.label,
      email: formData.email,
      phone: formData.phone,
      location: {
        ...basicDetails.location,
        city: formData.location,
      },
      url: formData.url,
      summary: formData.summary,
      objective: formData.objective,
      image: formData.image,
      showImage: formData.showImage,
      profiles,
    }

    // Update the store
    updateBasicDetails(updatedDetails)

    toast({
      title: "Basic details updated",
      description: "Your basic details have been updated successfully",
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <EditSectionContainer title="Personal Information" isEnabled={true} setIsEnabled={() => {}}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center">
            {/* Profile Image Toggle */}
            <div className="mb-4 flex items-center space-x-2">
              <Switch id="show-image" checked={formData.showImage} onCheckedChange={handleSwitchChange} />
              <Label htmlFor="show-image" className="text-sm font-medium">
                Show profile picture
              </Label>
            </div>

            {/* Profile Image Preview */}
            {formData.showImage && formData.image && <ProfileImage src={formData.image} />}

            {/* Image URL Input */}
            {formData.showImage && (
              <div className="mt-4 w-full space-y-3">
                <div>
                  <Label htmlFor="image" className="text-sm">
                    Profile Picture URL
                  </Label>
                  <div className="relative mt-1">
                    <ImageIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="image"
                      name="image"
                      value={formData.image}
                      onChange={handleChange}
                      placeholder="https://media.licdn.com/dms/image/..."
                      className="pl-10 text-xs"
                    />
                  </div>
                </div>
                <div className="text-xs text-gray-500 bg-blue-50 p-2 rounded">
                  <p className="font-medium mb-1">💡 How to get LinkedIn image URL:</p>
                  <ol className="list-decimal list-inside space-y-1">
                    <li>Go to your LinkedIn profile</li>
                    <li>Right-click on your profile picture</li>
                    <li>Select "Copy image address"</li>
                    <li>Paste the URL above</li>
                  </ol>
                </div>
              </div>
            )}
          </div>
          <div className="md:col-span-2 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="label">Job Title</Label>
                <Input
                  id="label"
                  name="label"
                  value={formData.label}
                  onChange={handleChange}
                  placeholder="English Teacher"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john.doe@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(123) 456-7890"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="New York, NY"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="url">Portfolio URL</Label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="url"
                    name="url"
                    value={formData.url}
                    onChange={handleChange}
                    placeholder="https://yourportfolio.com"
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="linkedinUrl">LinkedIn Profile</Label>
              <div className="relative">
                <Linkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-600 h-4 w-4" />
                <Input
                  id="linkedinUrl"
                  name="linkedinUrl"
                  value={formData.linkedinUrl}
                  onChange={handleChange}
                  placeholder="https://linkedin.com/in/yourprofile"
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </div>
      </EditSectionContainer>

      <EditSectionContainer title="Professional Summary" isEnabled={true} setIsEnabled={() =>\
