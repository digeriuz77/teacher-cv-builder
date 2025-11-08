"use client"

import { useState, useCallback } from "react"
import { useToast } from "@/components/ui/use-toast"

interface ProfileImageProps {
  src: string
  height?: string
  width?: string
  imageWrapperClassName?: string
  onImageChange?: (url: string) => void
  tooltipText?: string
}

export function ProfileImage({
  src,
  height = "108px",
  width = "108px",
  imageWrapperClassName = "",
  onImageChange,
  tooltipText = "Click to upload a profile picture",
}: ProfileImageProps) {
  const [isUploading, setIsUploading] = useState(false)
  const { toast } = useToast()

  const handleImageUpload = useCallback(async () => {
    if (isUploading) return

    // Create a file input element
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/*"
    input.style.display = "none"

    input.onchange = async (event) => {
      const file = (event.target as HTMLInputElement).files?.[0]
      if (!file) return

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image smaller than 5MB",
          variant: "destructive",
        })
        return
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Invalid file type",
          description: "Please select an image file",
          variant: "destructive",
        })
        return
      }

      setIsUploading(true)

      try {
        // Create FormData for the upload
        const formData = new FormData()
        formData.append("file", file)

        // Upload to Vercel Blob
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        })

        if (!response.ok) {
          throw new Error("Upload failed")
        }

        const { url } = await response.json()

        if (onImageChange) {
          onImageChange(url)
        }

        toast({
          title: "Image uploaded successfully",
          description: "Your profile picture has been updated",
        })
      } catch (error) {
        console.error("Upload error:", error)
        toast({
          title: "Upload failed",
          description: "There was an error uploading your image. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsUploading(false)
      }
    }

    // Trigger the file picker
    document.body.appendChild(input)
    input.click()
    document.body.removeChild(input)
  }, [isUploading, onImageChange, toast])

  const linkedInTooltipContent = (
    <div className="max-w-xs space-y-2">
      <p className="font-semibold text-sm">Two ways to add your photo:</p>
      <div className="text-xs space-y-2">
        <div>
          <p className="font-medium">Option 1: Upload directly</p>
          <p>Click the upload button to select an image from your device</p>
        </div>
        <div>
          <p className="font-medium">Option 2: Use LinkedIn URL</p>
          <ol className="list-decimal list-inside space-y-1">
            <li>Go to your LinkedIn profile page</li>
            <li>Right-click on your profile picture</li>
            <li>Select "Copy image address"</li>
            <li>Paste the URL in the "Profile Picture URL" field</li>
          </ol>
        </div>
      </div>
      <p className="text-xs text-gray-400 mt-2">💡 Uploaded images are stored securely</p>
    </div>
  )

  if (!src) {
    return null // Don't show anything if no image URL provided
  }

  return (
    <div className={`relative ${imageWrapperClassName}`}>
      <div
        style={{
          borderRadius: "50%",
          height,
          width,
          overflow: "hidden",
          border: "0.5px solid #ccc",
        }}
      >
        <img
          alt="Profile"
          src={src || "/placeholder.svg"}
          style={{
            height: "100%",
            width: "100%",
            objectFit: "cover",
          }}
          onError={(e) => {
            // Hide the image if it fails to load
            e.currentTarget.style.display = "none"
          }}
        />
      </div>
    </div>
  )
}
