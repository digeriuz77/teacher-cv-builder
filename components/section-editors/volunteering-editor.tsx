"use client"

import { useState } from "react"
import { useStore } from "@/lib/simple-store"
import { MoveEditSection } from "@/components/move-edit-section"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Plus } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

const EDUCATION_CERTIFICATIONS = [
  { name: "Post Graduate Certificate of Education", post_nominal: "PGCE", agency: "Various Universities" },
  {
    name: "Certificate in English Language Teaching to Adults",
    post_nominal: "CELTA",
    agency: "Cambridge Assessment English",
  },
  {
    name: "Diploma in English Language Teaching to Adults",
    post_nominal: "DELTA",
    agency: "Cambridge Assessment English",
  },
  {
    name: "National Board Certified Teacher",
    post_nominal: "NBCT",
    agency: "National Board for Professional Teaching Standards",
  },
  { name: "Chartered Education Assessor", post_nominal: "CEA", agency: "Chartered Institute of Educational Assessors" },
  { name: "Specific Learning Difficulties", post_nominal: "SpLD", agency: "Various Institutions" },
  { name: "Education Training and Assessment Accreditation Council", post_nominal: "ETAAC", agency: "ETAAC" },
  { name: "Certificate in Counselling Practice and Assessment", post_nominal: "C3PA", agency: "Various Institutions" },
  { name: "Special Education Endorsement", post_nominal: "SPED", agency: "State Education Departments" },
  { name: "English as Second Language Certification", post_nominal: "ESL", agency: "Various Institutions" },
  {
    name: "Teaching English to Speakers of Other Languages",
    post_nominal: "TESOL",
    agency: "TESOL International Association",
  },
  { name: "Gifted and Talented Endorsement", post_nominal: "G&T", agency: "State Education Departments" },
  { name: "Reading Specialist Certification", post_nominal: "RS", agency: "International Literacy Association" },
  { name: "Google Certified Educator Level 1", post_nominal: "GCE L1", agency: "Google for Education" },
  { name: "Google Certified Educator Level 2", post_nominal: "GCE L2", agency: "Google for Education" },
  { name: "Apple Teacher", post_nominal: "AT", agency: "Apple Inc." },
  { name: "Microsoft Innovative Educator Expert", post_nominal: "MIEE", agency: "Microsoft Education" },
  { name: "ISTE Certification", post_nominal: "ISTE", agency: "International Society for Technology in Education" },
  { name: "Advanced Placement Training", post_nominal: "AP", agency: "College Board" },
  {
    name: "International Baccalaureate Educator Certificate",
    post_nominal: "IB",
    agency: "International Baccalaureate Organization",
  },
  { name: "STEM Education Certification", post_nominal: "STEM", agency: "National Institute for STEM Education" },
  { name: "Principal License", post_nominal: "PL", agency: "State Education Departments" },
  { name: "Instructional Coach Certification", post_nominal: "ICC", agency: "Various Institutions" },
  { name: "Social-Emotional Learning Specialist", post_nominal: "SEL", agency: "CASEL" },
  { name: "Project-Based Learning Certification", post_nominal: "PBL", agency: "Buck Institute for Education" },
  { name: "Orton-Gillingham Training", post_nominal: "OG", agency: "Academy of Orton-Gillingham Practitioners" },
  { name: "Montessori Teaching Credential", post_nominal: "MTC", agency: "American Montessori Society" },
  { name: "Waldorf Teacher Training", post_nominal: "WTT", agency: "Association of Waldorf Schools" },
  { name: "Trauma-Informed Teaching Certificate", post_nominal: "TIT", agency: "Various Institutions" },
  { name: "Culturally Responsive Teaching Certificate", post_nominal: "CRT", agency: "Various Universities" },
]

export function VolunteeringEditor() {
  const { toast } = useToast()
  const {
    volunteering,
    addVolunteering,
    updateVolunteering,
    removeVolunteering,
    moveVolunteeringUp,
    moveVolunteeringDown,
    certificationDisplaySettings,
    updateCertificationDisplaySettings,
  } = useStore((state) => ({
    volunteering: state.volunteering,
    addVolunteering: state.addVolunteering,
    updateVolunteering: state.updateVolunteering,
    removeVolunteering: state.removeVolunteering,
    moveVolunteeringUp: state.moveVolunteeringUp,
    moveVolunteeringDown: state.moveVolunteeringDown,
    certificationDisplaySettings: state.certificationDisplaySettings,
    updateCertificationDisplaySettings: state.updateCertificationDisplaySettings,
  }))

  const [selectedCertifications, setSelectedCertifications] = useState<typeof EDUCATION_CERTIFICATIONS>([])
  const [customCert, setCustomCert] = useState({ name: "", post_nominal: "", agency: "" })
  const [searchTerm, setSearchTerm] = useState("")

  const filteredCertifications = EDUCATION_CERTIFICATIONS.filter(
    (cert) =>
      cert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.post_nominal.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleCertificationToggle = (certification: (typeof EDUCATION_CERTIFICATIONS)[0]) => {
    const isSelected = selectedCertifications.some((cert) => cert.name === certification.name)
    const newSelected = isSelected
      ? selectedCertifications.filter((cert) => cert.name !== certification.name)
      : [...selectedCertifications, certification]

    setSelectedCertifications(newSelected)
  }

  const handleAddSelectedCertifications = () => {
    selectedCertifications.forEach((cert) => {
      addVolunteering({
        id: `cert-${Date.now()}-${Math.random()}`,
        organization: cert.agency,
        position: `${cert.name} (${cert.post_nominal})`,
        startDate: null,
        endDate: null,
        current: false,
        description: "",
        showOrganization: true,
        showDescription: true,
      })
    })

    setSelectedCertifications([])
    toast({
      title: "Certifications added",
      description: `${selectedCertifications.length} certification(s) have been added`,
    })
  }

  const handleAddCustomCertification = () => {
    if (!customCert.name.trim()) return

    const certName = customCert.post_nominal ? `${customCert.name} (${customCert.post_nominal})` : customCert.name

    addVolunteering({
      id: `cert-${Date.now()}`,
      organization: customCert.agency || "Self-Reported",
      position: certName,
      startDate: null,
      endDate: null,
      current: false,
      description: "",
      showOrganization: true,
      showDescription: true,
    })

    setCustomCert({ name: "", post_nominal: "", agency: "" })
    toast({
      title: "Certification added",
      description: `${certName} has been added`,
    })
  }

  const handleUpdateCertification = (index: number, field: string, value: any) => {
    const updatedCertifications = [...volunteering]
    updatedCertifications[index] = {
      ...updatedCertifications[index],
      [field]: value,
    }
    updateVolunteering(updatedCertifications)
  }

  return (
    <div className="space-y-6">
      {/* Global Display Settings */}
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h3 className="text-lg font-medium mb-4">Display Settings for All Certifications</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium">Show Issuing Organizations</Label>
              <p className="text-sm text-gray-600">Display the organization that issued each certification</p>
            </div>
            <Switch
              checked={certificationDisplaySettings.showOrganizations}
              onCheckedChange={(checked) =>
                updateCertificationDisplaySettings({ ...certificationDisplaySettings, showOrganizations: checked })
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium">Show Additional Details</Label>
              <p className="text-sm text-gray-600">Display grades, verification details, or other notes</p>
            </div>
            <Switch
              checked={certificationDisplaySettings.showDescriptions}
              onCheckedChange={(checked) =>
                updateCertificationDisplaySettings({ ...certificationDisplaySettings, showDescriptions: checked })
              }
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border border-slate-200">
        <h3 className="text-lg font-medium mb-4">Add Professional Certifications</h3>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="search">Search Certifications</Label>
            <Input
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for certifications..."
            />
          </div>

          <div className="max-h-60 overflow-y-auto border rounded-md p-4 space-y-2">
            {filteredCertifications.map((cert) => (
              <div key={cert.name} className="flex items-start space-x-2">
                <Checkbox
                  id={cert.name}
                  checked={selectedCertifications.some((selected) => selected.name === cert.name)}
                  onCheckedChange={() => handleCertificationToggle(cert)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <Label htmlFor={cert.name} className="text-sm cursor-pointer font-medium">
                    {cert.name} ({cert.post_nominal})
                  </Label>
                  <p className="text-xs text-slate-500">{cert.agency}</p>
                </div>
              </div>
            ))}
          </div>

          {selectedCertifications.length > 0 && (
            <Button onClick={handleAddSelectedCertifications} className="w-full">
              Add {selectedCertifications.length} Selected Certification(s)
            </Button>
          )}

          <div className="border-t pt-4">
            <h4 className="font-medium mb-3">Add Custom Certification</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cert-name">Certification Name</Label>
                <Input
                  id="cert-name"
                  value={customCert.name}
                  onChange={(e) => setCustomCert((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., Master of Education"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cert-acronym">Acronym/Post-nominal</Label>
                <Input
                  id="cert-acronym"
                  value={customCert.post_nominal}
                  onChange={(e) => setCustomCert((prev) => ({ ...prev, post_nominal: e.target.value }))}
                  placeholder="e.g., M.Ed."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cert-agency">Issuing Organization</Label>
                <Input
                  id="cert-agency"
                  value={customCert.agency}
                  onChange={(e) => setCustomCert((prev) => ({ ...prev, agency: e.target.value }))}
                  placeholder="e.g., University of Leeds"
                />
              </div>
            </div>
            <Button onClick={handleAddCustomCertification} className="mt-4 flex items-center gap-2">
              <Plus className="h-4 w-4" /> Add Custom Certification
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Professional Certifications</h3>
        {volunteering.length === 0 ? (
          <p className="text-slate-500 italic">No certifications yet. Add from the list above.</p>
        ) : (
          volunteering.map((cert, index) => (
            <MoveEditSection
              key={cert.id}
              title={cert.position}
              index={index}
              length={volunteering.length}
              onMoveUp={moveVolunteeringUp}
              onMoveDown={moveVolunteeringDown}
              onDelete={removeVolunteering}
            >
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`cert-title-${index}`}>Certification Title</Label>
                    <Input
                      id={`cert-title-${index}`}
                      value={cert.position}
                      onChange={(e) => handleUpdateCertification(index, "position", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`cert-org-${index}`}>Issuing Organization</Label>
                    <Input
                      id={`cert-org-${index}`}
                      value={cert.organization}
                      onChange={(e) => handleUpdateCertification(index, "organization", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="font-medium">Individual Display Options</Label>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={cert.showOrganization !== false}
                        onCheckedChange={(checked) => handleUpdateCertification(index, "showOrganization", checked)}
                        id={`show-org-${index}`}
                      />
                      <Label htmlFor={`show-org-${index}`} className="text-sm">
                        Show organization for this certification
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={cert.showDescription !== false}
                        onCheckedChange={(checked) => handleUpdateCertification(index, "showDescription", checked)}
                        id={`show-desc-${index}`}
                      />
                      <Label htmlFor={`show-desc-${index}`} className="text-sm">
                        Show additional details for this certification
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`cert-desc-${index}`}>Additional Details (Optional)</Label>
                  <Textarea
                    id={`cert-desc-${index}`}
                    value={cert.description}
                    onChange={(e) => handleUpdateCertification(index, "description", e.target.value)}
                    placeholder="Add verification details, grades, state, or additional information..."
                    className="min-h-[80px]"
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
