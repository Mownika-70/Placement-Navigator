export interface JobApplication {
  id: string;
  company: string;
  role: string;
  logo: string;
  dateApplied: string;
  status: 'Applied' | 'Interviewing' | 'Offered' | 'Rejected';
  nextAction: string;
  nextActionIcon?: string;
  notes?: string;
  salaryExpectation?: string;
}

export interface TimelineMilestone {
  id: string;
  title: string;
  description: string;
  status: 'Completed' | 'In Progress' | 'Upcoming';
  badgeText: string;
  progress?: number;
  certificateEarned?: boolean;
}

export interface Resource {
  id: string;
  title: string;
  duration: string;
  type: string;
  icon: string;
  category: string;
}

export interface SkillGap {
  id: string;
  name: string;
  matchChange: number; // e.g. -40 or -25
  description: string;
  matchPercentage: number; // e.g. 45 or 60
  category: 'technical' | 'soft';
}

export interface FeedbackItem {
  id: string;
  category: 'Communication' | 'Technical' | 'Behavioral';
  score: number; // out of 5
  comment: string;
  reviewer: string;
  reviewerAvatar?: string;
  date: string;
  keyImprovement?: string;
}

export interface UserProfile {
  name: string;
  role: string;
  careerReadiness: number;
  isPremium: boolean;
  avatar: string;
  targetIndustry: string;
  salaryExpectation: string;
  jobType: string;
  desiredSeniority: string;
  interviewsCompleted: number;
  readinessScore: number;
}
