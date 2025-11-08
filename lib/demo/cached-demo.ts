/**
 * Cached AI Demo Data
 * This is a pre-generated example of the AI CV tailoring feature
 * Used to demonstrate the value proposition without giving away the product
 */

export const DEMO_TEACHER_PROFILE = {
  name: "Michael Chen",
  role: "Secondary Mathematics Teacher",
  experience: "6 years",
  currentSchool: "Washington High School",
}

export const DEMO_TARGET_SCHOOL = {
  name: "Riverside International Academy",
  type: "Private International School (K-12)",
  location: "Singapore",
  url: "https://www.riversideacademy.edu.sg",
  curriculum: ["International Baccalaureate (IB)", "Middle Years Programme (MYP)", "Diploma Programme (DP)"],
}

export const DEMO_JOB_DESCRIPTION = `
IB Mathematics Teacher (Grades 10-12)

Riverside International Academy is seeking a passionate and innovative Mathematics teacher to join our growing IB program.

**About Riverside International Academy:**
We are a student-centered international school committed to developing globally-minded learners through the IB curriculum. Our community values inquiry-based learning, intercultural understanding, and academic excellence.

**Key Responsibilities:**
- Teach IB Mathematics: Analysis and Approaches (SL/HL) and Applications and Interpretations (SL)
- Develop engaging, inquiry-based lessons that promote conceptual understanding
- Implement differentiated instruction to meet diverse learner needs
- Facilitate student-led investigations and mathematical modeling projects
- Collaborate with colleagues in the Mathematics and TOK departments
- Assess student learning through both formative and summative methods aligned with IB standards

**Required Qualifications:**
- Bachelor's degree in Mathematics or Mathematics Education
- Teaching certification/license
- Minimum 3 years of secondary mathematics teaching experience
- Experience with IB MYP or DP Mathematics (preferred)
- Demonstrated commitment to inquiry-based, student-centered pedagogy

**Desired Qualities:**
- Passion for making mathematics accessible and engaging for all students
- Strong interpersonal and communication skills
- Collaborative mindset and willingness to contribute to school community
- Experience with technology integration in mathematics instruction
- Multilingual abilities (advantage)

**What We Offer:**
- Competitive international salary package
- Professional development opportunities including IB training
- Supportive, collegial work environment
- Housing and relocation assistance
`.trim()

export const DEMO_SCHOOL_RESEARCH = {
  mission: "To develop internationally-minded individuals who use inquiry and critical thinking to become active, compassionate lifelong learners",
  values: [
    "Student-centered learning",
    "Inquiry-based pedagogy",
    "Intercultural understanding",
    "Global citizenship",
    "Academic excellence",
  ],
  culture: {
    type: "Progressive, collaborative",
    emphasis: "Student agency, conceptual understanding, real-world connections",
    teachingApproach: "Inquiry-based, differentiated, technology-enhanced",
  },
  keyPhrases: [
    "learner profile",
    "approaches to learning (ATL)",
    "conceptual understanding",
    "student-led inquiry",
    "international mindedness",
    "theory of knowledge",
    "mathematical modeling",
  ],
  recentNews: [
    "Recently expanded IB DP program to include both Math AA and Math AI pathways",
    "Strong emphasis on STEM and technology integration",
    "Active mathematics competition team (international awards)",
    "Partnership with local university for advanced mathematics students",
  ],
  studentDemographics: "Highly diverse, 45+ nationalities, English as primary language of instruction",
}

export const DEMO_JOB_ANALYSIS = {
  required: [
    {
      item: "Bachelor's in Mathematics/Education",
      priority: "Essential",
      yourStatus: "✓ Met",
    },
    {
      item: "Teaching certification",
      priority: "Essential",
      yourStatus: "✓ Met",
    },
    {
      item: "3+ years secondary math experience",
      priority: "Essential",
      yourStatus: "✓ Met (6 years)",
    },
  ],
  preferred: [
    {
      item: "IB MYP/DP Mathematics experience",
      priority: "Highly valued",
      yourStatus: "⚠ Gap - address in cover letter",
    },
    {
      item: "Inquiry-based pedagogy",
      priority: "Central to role",
      yourStatus: "✓ Strong match",
    },
    {
      item: "Technology integration",
      priority: "Important",
      yourStatus: "✓ Strong match",
    },
  ],
  keywordFrequency: [
    { keyword: "inquiry-based", count: 4, importance: "Critical" },
    { keyword: "IB", count: 6, importance: "Critical" },
    { keyword: "student-centered", count: 3, importance: "High" },
    { keyword: "differentiated", count: 2, importance: "High" },
    { keyword: "conceptual understanding", count: 2, importance: "High" },
    { keyword: "collaborative", count: 2, importance: "Medium" },
  ],
  hiddenPriorities:
    "The job description mentions 'inquiry-based' and 'student-centered' repeatedly while mentioning content knowledge only once. They prioritize pedagogy and teaching philosophy over pure mathematics expertise.",
}

export const DEMO_AI_RECOMMENDATIONS = {
  summary: {
    before:
      "Dedicated mathematics educator with 6 years of experience teaching Algebra, Geometry, and Calculus. Strong track record of improving student performance and engagement through technology integration and real-world applications.",
    after:
      "Passionate mathematics educator with 6 years of experience fostering conceptual understanding through inquiry-based, student-centered pedagogy. Proven ability to make mathematics accessible and engaging for diverse learners by connecting mathematical concepts to real-world contexts and promoting student-led investigations.",
    changes: [
      "✓ Added 'inquiry-based, student-centered' (matches school values)",
      "✓ Emphasized 'conceptual understanding' (key job requirement)",
      "✓ Changed 'improving performance' to 'fostering understanding' (pedagogy focus)",
      "✓ Added 'student-led investigations' (IB methodology)",
      "✓ Used 'accessible for diverse learners' (addresses differentiation)",
    ],
  },
  experienceHighlighting: [
    {
      section: "Current Position",
      recommendation: "Move to top",
      reason: "Your work with project-based learning and technology integration",
      changes: [
        "Reframe: 'Implemented PBL units' → 'Facilitated student-led mathematical investigations'",
        "Add: Specific mention of 'conceptual understanding' and 'inquiry cycles'",
        "Emphasize: Differentiation for diverse learners (IB value)",
      ],
    },
    {
      section: "Technology Integration",
      recommendation: "Highlight prominently",
      reason: "School emphasizes tech integration and virtual labs",
      changes: [
        "Specify: Desmos, GeoGebra, Python for mathematical modeling",
        "Frame: As tools for student inquiry, not just instruction",
      ],
    },
    {
      section: "Professional Development",
      recommendation: "Add IB learning",
      reason: "Address the experience gap",
      changes: [
        "Add: 'Completed self-directed study of IB Mathematics curriculum frameworks'",
        "Add: 'Attended IB webinar series on ATL skills in mathematics'",
        "Show: Proactive interest in IB pedagogy",
      ],
    },
  ],
  keywordsToAdd: [
    {
      keyword: "Inquiry-based learning",
      where: "Summary, Teaching Experience",
      howToUse: "Replace 'project-based' or 'hands-on' in existing text",
    },
    {
      keyword: "IB learner profile",
      where: "Professional Development section",
      howToUse: "Mention aligning teaching with learner profile attributes",
    },
    {
      keyword: "Approaches to Learning (ATL)",
      where: "Teaching methods",
      howToUse: "Describe how you develop thinking and communication skills",
    },
    {
      keyword: "Conceptual understanding",
      where: "Throughout CV",
      howToUse: "Emphasize depth over breadth in your teaching",
    },
    {
      keyword: "International mindedness",
      where: "Summary or cover letter",
      howToUse: "Connect math to global contexts and diverse perspectives",
    },
  ],
  sectionsToAdjust: [
    {
      section: "Skills/Expertise",
      current: ["Algebra", "Calculus", "Statistics", "AP Calculus"],
      suggested: [
        "IB Mathematics (AA & AI pathways)",
        "Inquiry-based pedagogy",
        "Mathematical modeling & investigations",
        "Differentiated instruction",
        "Formative assessment strategies",
        "ATL skills development",
      ],
      reason: "Shift from content areas to pedagogical approaches (what they care about)",
    },
  ],
  coverLetterGuidance: [
    "Open with: Your passion for making mathematics accessible through inquiry",
    "Address: Your excitement to join an IB school (even without direct experience)",
    "Highlight: Specific examples of student-led mathematical investigations you've facilitated",
    "Connect: Your PBL experience to IB's inquiry-based approach",
    "Show: You understand IB philosophy (mention learner profile, ATL, etc.)",
    "Close: Your commitment to international education and diverse learning communities",
  ],
}

export const DEMO_CULTURE_FIT = {
  overallMatch: 87,
  matchLevel: "Excellent Match",
  strengths: [
    {
      area: "Inquiry-Based Pedagogy",
      score: 95,
      evidence: "Your extensive PBL and student-led investigation experience directly aligns",
    },
    {
      area: "Technology Integration",
      score: 90,
      evidence: "Your Desmos, GeoGebra, and coding experience matches their STEM emphasis",
    },
    {
      area: "Differentiated Instruction",
      score: 85,
      evidence: "Your work with diverse learners and accommodations is well-documented",
    },
    {
      area: "Student-Centered Approach",
      score: 90,
      evidence: "Your teaching philosophy emphasizes student agency and engagement",
    },
  ],
  gaps: [
    {
      area: "IB Experience",
      concern: "No direct IB MYP/DP experience",
      mitigation:
        "Emphasize transferable skills from PBL, inquiry-based methods. Take IB online course before interview. Show genuine interest in IB philosophy.",
    },
    {
      area: "International School Experience",
      concern: "No previous international school teaching",
      mitigation:
        "Highlight work with diverse student populations, multicultural classrooms. Express enthusiasm for international education.",
    },
  ],
  interviewTips: [
    "Be ready to discuss: A specific inquiry-based lesson you've designed",
    "Prepare examples: How you've fostered conceptual understanding vs. procedural fluency",
    "Research: IB Mathematics curriculum changes (AA vs AI pathways)",
    "Ask questions: About their approach to ATL skills, TOK integration in Math",
    "Demonstrate: You've reflected on IB learner profile and how it aligns with your values",
  ],
}

export const DEMO_BEFORE_AFTER = {
  before: {
    summary:
      "Dedicated mathematics educator with 6 years of experience teaching Algebra, Geometry, and Calculus. Strong track record of improving student performance and engagement through technology integration and real-world applications.",
    skills: ["Algebra", "Calculus", "Statistics", "AP Calculus AB", "Classroom Management", "Google Classroom"],
    experience: [
      {
        school: "Washington High School",
        highlights: [
          "Improved AP Calculus pass rate from 72% to 89%",
          "Implemented project-based learning units",
          "Integrated technology tools like Desmos and GeoGebra",
        ],
      },
    ],
  },
  after: {
    summary:
      "Passionate mathematics educator with 6 years of experience fostering conceptual understanding through inquiry-based, student-centered pedagogy. Proven ability to make mathematics accessible and engaging for diverse learners by connecting mathematical concepts to real-world contexts and promoting student-led investigations.",
    skills: [
      "Inquiry-Based Mathematics Pedagogy",
      "IB Mathematics (self-studied AA & AI pathways)",
      "Mathematical Modeling & Investigations",
      "Differentiated Instruction for Diverse Learners",
      "Formative Assessment & ATL Skills Development",
      "Technology Integration (Desmos, GeoGebra, Python)",
    ],
    experience: [
      {
        school: "Washington High School",
        highlights: [
          "Facilitated student-led mathematical investigations using inquiry-based approach, resulting in 23% increase in student engagement and improved conceptual understanding",
          "Designed differentiated project-based units connecting mathematics to real-world contexts, successfully reaching diverse learners including ELL and students with IEPs",
          "Integrated technology tools (Desmos, GeoGebra, Python) to enhance student inquiry and mathematical modeling capabilities",
          "Improved AP Calculus outcomes through emphasis on conceptual understanding rather than procedural fluency (pass rate: 72% → 89%)",
        ],
      },
    ],
  },
  highlightedChanges: [
    {
      type: "Language Alignment",
      examples: [
        '"improved performance" → "fostered conceptual understanding"',
        '"implemented PBL" → "facilitated student-led investigations"',
        '"Classroom Management" → "Differentiated Instruction for Diverse Learners"',
      ],
    },
    {
      type: "Keyword Integration",
      examples: [
        "Added: inquiry-based, student-centered, conceptual understanding",
        "Added: IB Mathematics, ATL skills, mathematical modeling",
        "Added: diverse learners, student-led investigations",
      ],
    },
    {
      type: "Value Alignment",
      examples: [
        "Emphasized pedagogy over content expertise",
        "Showed commitment to student agency",
        "Demonstrated understanding of IB philosophy",
      ],
    },
  ],
}

/**
 * Get the complete cached demo
 */
export function getCachedDemo() {
  return {
    teacher: DEMO_TEACHER_PROFILE,
    targetSchool: DEMO_TARGET_SCHOOL,
    jobDescription: DEMO_JOB_DESCRIPTION,
    schoolResearch: DEMO_SCHOOL_RESEARCH,
    jobAnalysis: DEMO_JOB_ANALYSIS,
    aiRecommendations: DEMO_AI_RECOMMENDATIONS,
    cultureFit: DEMO_CULTURE_FIT,
    beforeAfter: DEMO_BEFORE_AFTER,
  }
}
