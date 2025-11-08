"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { getCachedDemo } from "@/lib/demo/cached-demo"
import { Building2, FileText, Brain, Target, ArrowRight, Lock, Sparkles, CheckCircle2, AlertCircle } from "lucide-react"

interface TailorDemoDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TailorDemoDialog({ open, onOpenChange }: TailorDemoDialogProps) {
  const demo = getCachedDemo()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-blue-600" />
            <DialogTitle className="text-2xl">AI-Powered CV Tailoring Demo</DialogTitle>
          </div>
          <DialogDescription>
            See how our AI analyzes schools and tailors your CV for maximum impact. This is a demonstration using a
            fictional teacher profile.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="overview" className="flex-1 flex flex-col">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="school">School Research</TabsTrigger>
            <TabsTrigger value="analysis">Job Analysis</TabsTrigger>
            <TabsTrigger value="recommendations">AI Suggestions</TabsTrigger>
            <TabsTrigger value="before-after">Before/After</TabsTrigger>
          </TabsList>

          <ScrollArea className="flex-1 mt-4">
            <TabsContent value="overview" className="space-y-6 m-0">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-blue-600" />
                  Demo Scenario
                </h3>
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <h4 className="font-medium mb-2">Teacher Profile</h4>
                    <ul className="space-y-1 text-sm">
                      <li>
                        <strong>Name:</strong> {demo.teacher.name}
                      </li>
                      <li>
                        <strong>Role:</strong> {demo.teacher.role}
                      </li>
                      <li>
                        <strong>Experience:</strong> {demo.teacher.experience}
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Target School</h4>
                    <ul className="space-y-1 text-sm">
                      <li>
                        <strong>School:</strong> {demo.targetSchool.name}
                      </li>
                      <li>
                        <strong>Type:</strong> {demo.targetSchool.type}
                      </li>
                      <li>
                        <strong>Location:</strong> {demo.targetSchool.location}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <Target className="h-5 w-5 text-green-600" />
                  Culture Fit Score: {demo.cultureFit.overallMatch}%
                </h3>
                <Badge className="mb-4 bg-green-600">{demo.cultureFit.matchLevel}</Badge>

                <div className="grid md:grid-cols-2 gap-6 mt-4">
                  <div>
                    <h4 className="font-medium mb-3 flex items-center gap-1">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      Strengths
                    </h4>
                    <ul className="space-y-2">
                      {demo.cultureFit.strengths.slice(0, 3).map((strength, idx) => (
                        <li key={idx} className="text-sm">
                          <div className="font-medium">{strength.area}</div>
                          <div className="text-gray-600 text-xs">{strength.evidence}</div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-3 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4 text-amber-600" />
                      Gaps to Address
                    </h4>
                    <ul className="space-y-2">
                      {demo.cultureFit.gaps.map((gap, idx) => (
                        <li key={idx} className="text-sm">
                          <div className="font-medium">{gap.area}</div>
                          <div className="text-gray-600 text-xs">{gap.mitigation}</div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                <h3 className="font-semibold mb-3">What You'll Get with Pro Access:</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                    <span>Deep school research including mission, values, culture, and recent developments</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                    <span>Detailed job description analysis with keyword frequency and hidden priorities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                    <span>AI-powered recommendations for rewriting your summary and highlighting experience</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                    <span>Before/after CV comparison with specific changes highlighted</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                    <span>Cover letter guidance and interview preparation tips</span>
                  </li>
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="school" className="space-y-4 m-0">
              <div className="bg-white border rounded-lg p-6">
                <h3 className="font-semibold mb-2">School Mission</h3>
                <p className="text-sm text-gray-700 italic">&ldquo;{demo.schoolResearch.mission}&rdquo;</p>
              </div>

              <div className="bg-white border rounded-lg p-6">
                <h3 className="font-semibold mb-3">Core Values</h3>
                <div className="flex flex-wrap gap-2">
                  {demo.schoolResearch.values.map((value, idx) => (
                    <Badge key={idx} variant="secondary">
                      {value}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="bg-white border rounded-lg p-6">
                <h3 className="font-semibold mb-3">School Culture</h3>
                <dl className="space-y-2 text-sm">
                  <div>
                    <dt className="font-medium">Type:</dt>
                    <dd className="text-gray-700">{demo.schoolResearch.culture.type}</dd>
                  </div>
                  <div>
                    <dt className="font-medium">Teaching Approach:</dt>
                    <dd className="text-gray-700">{demo.schoolResearch.culture.teachingApproach}</dd>
                  </div>
                  <div>
                    <dt className="font-medium">Emphasis:</dt>
                    <dd className="text-gray-700">{demo.schoolResearch.culture.emphasis}</dd>
                  </div>
                </dl>
              </div>

              <div className="bg-white border rounded-lg p-6">
                <h3 className="font-semibold mb-3">Key Phrases to Use</h3>
                <div className="flex flex-wrap gap-2">
                  {demo.schoolResearch.keyPhrases.map((phrase, idx) => (
                    <Badge key={idx} className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                      {phrase}
                    </Badge>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="analysis" className="space-y-4 m-0">
              <div className="bg-white border rounded-lg p-6">
                <h3 className="font-semibold mb-4">Required Qualifications</h3>
                <div className="space-y-3">
                  {demo.jobAnalysis.required.map((req, idx) => (
                    <div key={idx} className="flex items-start gap-3 pb-3 border-b last:border-0">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="font-medium text-sm">{req.item}</div>
                        <div className="text-xs text-gray-600">
                          {req.priority} • {req.yourStatus}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border rounded-lg p-6">
                <h3 className="font-semibold mb-4">Preferred Qualifications</h3>
                <div className="space-y-3">
                  {demo.jobAnalysis.preferred.map((pref, idx) => (
                    <div key={idx} className="flex items-start gap-3 pb-3 border-b last:border-0">
                      {pref.yourStatus.includes("✓") ? (
                        <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                      )}
                      <div className="flex-1">
                        <div className="font-medium text-sm">{pref.item}</div>
                        <div className="text-xs text-gray-600">
                          {pref.priority} • {pref.yourStatus}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                <h3 className="font-semibold mb-2">AI Insight</h3>
                <p className="text-sm text-gray-700">{demo.jobAnalysis.hiddenPriorities}</p>
              </div>
            </TabsContent>

            <TabsContent value="recommendations" className="space-y-4 m-0">
              <div className="bg-white border rounded-lg p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Brain className="h-5 w-5 text-purple-600" />
                  Summary Rewrite
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-xs font-medium text-gray-500 mb-1">BEFORE</div>
                    <p className="text-sm bg-red-50 p-3 rounded border border-red-200">
                      {demo.aiRecommendations.summary.before}
                    </p>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-gray-500 mb-1">AFTER</div>
                    <p className="text-sm bg-green-50 p-3 rounded border border-green-200">
                      {demo.aiRecommendations.summary.after}
                    </p>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-gray-500 mb-2">CHANGES MADE</div>
                    <ul className="space-y-1">
                      {demo.aiRecommendations.summary.changes.map((change, idx) => (
                        <li key={idx} className="text-xs text-gray-700 flex items-start gap-2">
                          <ArrowRight className="h-3 w-3 text-blue-600 mt-0.5 flex-shrink-0" />
                          <span>{change}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white border rounded-lg p-6">
                <h3 className="font-semibold mb-4">Keywords to Add</h3>
                <div className="space-y-3">
                  {demo.aiRecommendations.keywordsToAdd.slice(0, 4).map((item, idx) => (
                    <div key={idx} className="border-b pb-3 last:border-0">
                      <div className="font-medium text-sm mb-1">{item.keyword}</div>
                      <div className="text-xs text-gray-600">
                        <strong>Where:</strong> {item.where}
                      </div>
                      <div className="text-xs text-gray-600">
                        <strong>How:</strong> {item.howToUse}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="before-after" className="space-y-4 m-0">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white border rounded-lg p-6">
                  <div className="text-xs font-medium text-red-600 mb-3">BEFORE</div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-sm mb-2">Summary</h4>
                      <p className="text-xs text-gray-700 bg-red-50 p-2 rounded">{demo.beforeAfter.before.summary}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm mb-2">Skills</h4>
                      <div className="flex flex-wrap gap-1">
                        {demo.beforeAfter.before.skills.map((skill, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white border rounded-lg p-6">
                  <div className="text-xs font-medium text-green-600 mb-3">AFTER</div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-sm mb-2">Summary</h4>
                      <p className="text-xs text-gray-700 bg-green-50 p-2 rounded">{demo.beforeAfter.after.summary}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm mb-2">Skills</h4>
                      <div className="flex flex-wrap gap-1">
                        {demo.beforeAfter.after.skills.map((skill, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs bg-green-50">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="font-semibold mb-3">Key Changes Made</h3>
                {demo.beforeAfter.highlightedChanges.map((change, idx) => (
                  <div key={idx} className="mb-3 last:mb-0">
                    <div className="font-medium text-sm mb-1">{change.type}</div>
                    <ul className="space-y-1">
                      {change.examples.map((example, exIdx) => (
                        <li key={exIdx} className="text-xs text-gray-700 ml-4">
                          • {example}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>

        <div className="border-t pt-4 mt-4 bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg">
          <div className="flex items-start gap-4">
            <Lock className="h-10 w-10 text-purple-600 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-2">Unlock This for YOUR School & YOUR CV</h3>
              <p className="text-sm text-gray-700 mb-4">
                Get AI-powered tailoring for any school you're applying to. Paste a job description and school URL, and
                our AI will research the school and customize your CV in minutes.
              </p>
              <div className="flex gap-3">
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Unlock Pro - $29.99 (90 days)
                </Button>
                <Button variant="outline">Learn More About Pro</Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
