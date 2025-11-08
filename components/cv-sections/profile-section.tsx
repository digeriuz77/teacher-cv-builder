"use client"

import { CVStore } from "@/lib/store"
import { ProfileImage } from "@/components/profile-image"
import { Mail, Phone, MapPin, Globe, Linkedin } from "lucide-react"
import { useHasMounted } from "@/lib/hooks/useHasMounted"

export function ProfileSection() {
  const hasMounted = useHasMounted()
  const { basicDetails, theme } = CVStore()

  // Don't render anything during server-side rendering to prevent hydration mismatch
  if (!hasMounted) {
    return (
      <div className="mb-8">
        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className="flex-1">
            <div className="h-8 bg-gray-200 w-48 mb-2 animate-pulse rounded"></div>
            <div className="h-6 bg-gray-200 w-36 mb-4 animate-pulse rounded"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="h-4 bg-gray-200 w-32 animate-pulse rounded"></div>
              <div className="h-4 bg-gray-200 w-32 animate-pulse rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row items-start gap-6">
        {/* Only show profile image if enabled and URL exists */}
        {basicDetails.showImage && basicDetails.image && (
          <div className="print:relative">
            <ProfileImage src={basicDetails.image} height="120px" width="120px" />
          </div>
        )}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2" style={{ color: theme.colors.titleColor }}>
            {basicDetails.name}
          </h1>
          <h2 className="text-xl mb-4" style={{ color: theme.colors.titleColor }}>
            {basicDetails.label}
          </h2>
          <div className="contact-info grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            {basicDetails.email && (
              <div className="contact-item flex items-center gap-2">
                <Mail className="h-3 w-3 flex-shrink-0" style={{ color: theme.colors.fontColor }} />
                <span style={{ color: theme.colors.fontColor }}>{basicDetails.email}</span>
              </div>
            )}
            {basicDetails.phone && (
              <div className="contact-item flex items-center gap-2">
                <Phone className="h-3 w-3 flex-shrink-0" style={{ color: theme.colors.fontColor }} />
                <span style={{ color: theme.colors.fontColor }}>{basicDetails.phone}</span>
              </div>
            )}
            {basicDetails.location.city && (
              <div className="contact-item flex items-center gap-2">
                <MapPin className="h-3 w-3 flex-shrink-0" style={{ color: theme.colors.fontColor }} />
                <span style={{ color: theme.colors.fontColor }}>{basicDetails.location.city}</span>
              </div>
            )}
            {basicDetails.url && (
              <div className="contact-item flex items-center gap-2">
                <Globe className="h-3 w-3 flex-shrink-0" style={{ color: theme.colors.fontColor }} />
                <span style={{ color: theme.colors.fontColor }}>{basicDetails.url}</span>
              </div>
            )}
            {basicDetails.profiles.map((profile, index) => (
              <div key={index} className="contact-item flex items-center gap-2">
                <Linkedin className="h-3 w-3 flex-shrink-0 text-blue-600" />
                <span style={{ color: theme.colors.fontColor }}>{profile.url}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {basicDetails.summary && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2" style={{ color: theme.colors.titleColor }}>
            Professional Summary
          </h3>
          <p className="leading-relaxed" style={{ color: theme.colors.fontColor }}>
            {basicDetails.summary}
          </p>
        </div>
      )}
    </div>
  )
}
