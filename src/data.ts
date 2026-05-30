import { JobApplication, TimelineMilestone, Resource, SkillGap, FeedbackItem, UserProfile } from './types';

export const INITIAL_USER_PROFILE: UserProfile = {
  name: "Alex Rivera",
  role: "Senior Product Designer",
  careerReadiness: 85,
  isPremium: true,
  avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCD7Ngn-awRRcx74W7F5qDXVIIneQxN0A6Ech2oIyDKmnWWNkY4hk1K6i1ZCDLhpXWkG92cz4eHxjHAOE4_hZpkT3zrbQcnizS9wBNLUq_uqdoTjHTu-axmzYz16r1LKF7lrKZBYTinf6frgXrdQkz2xlr3gnZP3hWQjYczY7ApIG6oPIvmDk2t9pojvVBtNCTIV2aJWMqNmVgq16MnMhBry1QDzYD0wDe6lBRYBSkfqgb7PzuzvYS4QFT9g2D3AhYqEZRfnnkTtzs",
  targetIndustry: "Fintech & SaaS",
  salaryExpectation: "$140k - $180k",
  jobType: "Full-time Remote",
  desiredSeniority: "Senior / Lead",
  interviewsCompleted: 12,
  readinessScore: 82
};

export const INITIAL_JOBS: JobApplication[] = [
  {
    id: "google-1",
    company: "Google",
    role: "Senior Product Designer",
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuDBo6dyAQkfrQcLHCzPa-GGrzFpfYpvryEPN9EHe4YSHrJTrw6jlZpxMKXhmNSkqO0OkneGc6KOij-KLagl118pI-VPdRgyqVVZQNBtucmAqB1M1NyjztpyShSqyddWG_4vOof78Gqjqe-Mb9zXUPIDFHfDyTthx6_tEcuxUfowUbDQvF4gLiavoRaka4IA8gUkeuqBA05lJpMZJ0fRBK0UJLFee3yfqnHxC9xb5gmVijFLCU_Jg4YPHcBZEa6k_YVxaVnU1KleHyM",
    dateApplied: "Oct 12, 2023",
    status: "Interviewing",
    nextAction: "Technical Interview (Oct 24)",
    nextActionIcon: "calendar_month",
    salaryExpectation: "$160k - $190k",
    notes: "Review mobile UI/UX and motion design guidelines. Expecting system architecture discussions."
  },
  {
    id: "stripe-1",
    company: "Stripe",
    role: "Frontend Architect",
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuD-e5qCGSHkgiSLZ3O2FYl8l2OjotGUFW_WrwJOaYNDcIqKaAW3butigSLNqKEzb56fRruz2RXDG4WyRoHdRPRPUlhlstwm1wVVsApwgJwh5wdcAxBIOJg2FYHSWAkEpKnSTL-YIxLOWd4LqMylw8BtZ7M5lXfKdZso2NMiAFtL3obF2wkcHDm4GffKELAjVIz1XfiJmjxD7gKgp03upswoi5gbK_ef94_SUma3G0mRFfQS5HUURkQ1_d3YunAqG4P77qjizbaZfVo",
    dateApplied: "Oct 10, 2023",
    status: "Applied",
    nextAction: "Awaiting Feedback",
    nextActionIcon: "schedule",
    salaryExpectation: "$170k - $210k",
    notes: "Applied with standard referral. High interest in dashboard core engineering systems."
  },
  {
    id: "airbnb-1",
    company: "Airbnb",
    role: "UX Researcher",
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuC--7U6zL0VxUR1ydnpCKqUEXVAB7Qd0kWwHEIEDNQRk5Om-PaekVktVWolEpIkfnjESY1W-5Pu37SmIsjg_xkpzTnuEzgMzQNPy6BQQN0J11NR7Ri5OsHctxqr-1gN8K-pJK3n5f1MXBYvmHCRmKkc8aFIOR6oyn4T6WxocOfjZI_n1Aw5t59O8WGC3-6xS0bDYAcGy4AmfbAsBpW18eW-uOYtuPzn6wxlZdUxT0ksqFjq5rgEMOYLUjaQv8xg1eu1WZHBG40RsAc",
    dateApplied: "Oct 08, 2023",
    status: "Offered",
    nextAction: "Review Offer Package",
    nextActionIcon: "rate_review",
    salaryExpectation: "$150k - $185k",
    notes: "Sellers and host platform group. Offer letter received with stock/option packages."
  }
];

export const INITIAL_MILESTONES: TimelineMilestone[] = [
  {
    id: "m1",
    title: "Complete SQL Advanced",
    description: "Master window functions, CTEs, and query optimization for high-scale data operations.",
    status: "Completed",
    badgeText: "Completed",
    certificateEarned: true
  },
  {
    id: "m2",
    title: "Build a Portfolio Project",
    description: "Develop a full-stack AI-integrated task manager using modern architectures.",
    status: "In Progress",
    badgeText: "In Progress",
    progress: 75
  },
  {
    id: "m3",
    title: "2 Mock Interviews",
    description: "Live technical assessments with AI-driven feedback and performance scoring.",
    status: "Upcoming",
    badgeText: "Upcoming"
  }
];

export const INITIAL_GAPS: SkillGap[] = [
  {
    id: "g1",
    name: "System Design",
    matchChange: -40,
    description: "Key concepts like Scalability, Load Balancing, and Microservices need attention.",
    matchPercentage: 45,
    category: "technical"
  },
  {
    id: "g2",
    name: "React Architecture",
    matchChange: -25,
    description: "Missing deep understanding of React Server Components and performance hooks.",
    matchPercentage: 60,
    category: "technical"
  }
];

export const INITIAL_MISSING_SKILLS = [
  "Redis Caching",
  "Kafka/RabbitMQ",
  "Docker Swarm",
  "CI/CD Pipelines",
  "GraphQL",
  "Terraform"
];

export const INITIAL_SOFT_SKILLS = [
  { name: "Tech Leadership", icon: "record_voice_over" },
  { name: "Stakeholder Mgmt", icon: "groups" },
  { name: "RFC Writing", icon: "edit_note" },
  { name: "Strategic Thinking", icon: "lightbulb" }
];

export const INITIAL_FEEDBACK: FeedbackItem[] = [
  {
    id: "fb1",
    category: "Communication",
    score: 4,
    comment: "Excellent clarity on your STAR responses. Try to reduce filler words when explaining complex architectural decisions.",
    reviewer: "Senior Coach AI",
    date: "A day ago"
  },
  {
    id: "fb2",
    category: "Technical",
    score: 3,
    comment: "Key Improvement Area: Big O notation analysis was slightly off for the sorting algorithm. Revisit Merge Sort space complexity.",
    reviewer: "Systems Evaluator AI",
    date: "2 days ago",
    keyImprovement: "Merge Sort space complexity explanation"
  }
];

export const INITIAL_RESOURCES: Resource[] = [
  {
    id: "r1",
    title: "System Design Primer",
    duration: "45 min read",
    type: "Article",
    icon: "book",
    category: "Architecture"
  },
  {
    id: "r2",
    title: "Advanced SQL Patterns",
    duration: "12 min video",
    type: "Tutorial",
    icon: "video_library",
    category: "Database"
  },
  {
    id: "r3",
    title: "Interview Whiteboard Kit",
    duration: "Interactive",
    type: "Sandbox",
    icon: "code",
    category: "Coding"
  }
];
