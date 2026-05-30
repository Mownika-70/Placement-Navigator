import React, { useState } from 'react';
import { 
  INITIAL_USER_PROFILE, 
  INITIAL_JOBS, 
  INITIAL_MILESTONES, 
  INITIAL_RESOURCES 
} from './data';
import { UserProfile, JobApplication, TimelineMilestone } from './types';

// Component imports
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import DashboardView from './components/DashboardView';
import RoadmapView from './components/RoadmapView';
import ResumeView from './components/ResumeView';
import SkillsView from './components/SkillsView';
import PrepView from './components/PrepView';
import TrackerView from './components/TrackerView';
import ProfileView from './components/ProfileView';

export default function App() {
  const [user, setUser] = useState<UserProfile>(INITIAL_USER_PROFILE);
  const [jobs, setJobs] = useState<JobApplication[]>(INITIAL_JOBS);
  const [milestones, setMilestones] = useState<TimelineMilestone[]>(INITIAL_MILESTONES);
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isNavDrawerOpen, setIsNavDrawerOpen] = useState<boolean>(false);

  // Job Tracker actions
  const handleAddJob = (job: JobApplication) => {
    setJobs((prev) => [job, ...prev]);
  };

  const handleUpdateJobStatus = (id: string, status: JobApplication['status']) => {
    setJobs((prev) => 
      prev.map((job) => {
        if (job.id === id) {
          const matchedAction = 
            status === 'Interviewing' ? 'Technical Interview Scheduled' : 
            status === 'Offered' ? 'Review Offer Package' : 'Awaiting Feedback';
          const icon = 
            status === 'Interviewing' ? 'calendar_month' : 
            status === 'Offered' ? 'rate_review' : 'schedule';
          return { ...job, status, nextAction: matchedAction, nextActionIcon: icon };
        }
        return job;
      })
    );
  };

  const handleDeleteJob = (id: string) => {
    if (confirm("Are you sure you want to delete this job application? This action is irreversible.")) {
      setJobs((prev) => prev.filter((job) => job.id !== id));
    }
  };

  // Learning Roadmap action
  const handleUpdateMilestone = (id: string, progress: number) => {
    setMilestones((prev) => 
      prev.map((m) => {
        if (m.id === id) {
          const status = progress === 100 ? 'Completed' : 'In Progress';
          const badgeText = progress === 100 ? 'Completed' : 'In Progress';
          return { ...m, progress, status, badgeText, certificateEarned: progress === 100 };
        }
        return m;
      })
    );
  };

  // Profile actions
  const handleUpdateUser = (updatedUser: UserProfile) => {
    setUser(updatedUser);
  };

  // Sidebar mapping helpers
  const handleSetActiveTab = (tab: string) => {
    setActiveTab(tab);
    setIsNavDrawerOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Render view router helper
  const renderViewContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <DashboardView 
            user={user} 
            jobs={jobs} 
            milestones={milestones} 
            setActiveTab={handleSetActiveTab} 
          />
        );
      case 'roadmap':
        return (
          <RoadmapView 
            milestones={milestones} 
            resources={INITIAL_RESOURCES} 
            onUpdateMilestone={handleUpdateMilestone} 
          />
        );
      case 'resume':
        return <ResumeView />;
      case 'skills':
        return (
          <SkillsView 
            setActiveTab={handleSetActiveTab} 
          />
        );
      case 'prep':
        return <PrepView />;
      case 'tracker':
        return (
          <TrackerView 
            jobs={jobs} 
            onAddJob={handleAddJob} 
            onUpdateJobStatus={handleUpdateJobStatus} 
            onDeleteJob={handleDeleteJob} 
          />
        );
      case 'profile':
        return (
          <ProfileView 
            user={user} 
            onUpdateUser={handleUpdateUser} 
          />
        );
      default:
        return (
          <DashboardView 
            user={user} 
            jobs={jobs} 
            milestones={milestones} 
            setActiveTab={handleSetActiveTab} 
          />
        );
    }
  };

  return (
    <div id="prep-ai-container" className="min-h-screen bg-brand-surface font-sans text-brand-on-surface pb-24 lg:pb-0">
      
      {/* Sidebar Navigation */}
      <Sidebar 
        user={user} 
        activeTab={activeTab} 
        setActiveTab={handleSetActiveTab} 
      />

      {/* Mobile Top App Header Bar */}
      <Header 
        user={user} 
        toggleNavDrawer={() => setIsNavDrawerOpen(!isNavDrawerOpen)} 
        setActiveTab={handleSetActiveTab}
      />

      {/* Responsive Slide Out Overlay Drawer for Mobile Screen togglers */}
      {isNavDrawerOpen && (
        <div 
          role="dialog"
          aria-modal="true"
          className="lg:hidden fixed inset-0 z-50 flex"
        >
          {/* Backdrop screen filter tap trigger close */}
          <div 
            onClick={() => setIsNavDrawerOpen(false)}
            className="fixed inset-0 bg-[#0b1c30]/50 backdrop-blur-xs transition-opacity duration-300"
          />

          {/* Navigation Drawer Content */}
          <div className="relative flex flex-col w-72 max-w-sm h-full bg-white p-6 shadow-xl z-10 animate-slide-in">
            {/* Logo */}
            <div className="flex justify-between items-center pb-6 border-b border-slate-100">
              <span className="font-display font-black text-xl text-brand-secondary tracking-tight">PrepAI Menu</span>
              <button 
                onClick={() => setIsNavDrawerOpen(false)}
                className="p-1 hover:bg-slate-100 rounded-full text-[#767682] cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Sidebar Stats and Links copies */}
            <nav className="flex-1 space-y-2 mt-6 overflow-y-auto">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
                { id: 'roadmap', label: 'Learning Roadmap', icon: 'map' },
                { id: 'resume', label: 'Resume Analysis', icon: 'description' },
                { id: 'skills', label: 'Skill Gap Detection', icon: 'assessment' },
                { id: 'prep', label: 'AI Interview Prep', icon: 'psychology' },
                { id: 'tracker', label: 'Job Tracker', icon: 'work_history' },
                { id: 'profile', label: 'Profile & Settings', icon: 'person' },
              ].map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSetActiveTab(item.id)}
                    className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl font-sans text-xs font-bold transition-colors ${
                      isActive 
                        ? 'bg-brand-secondary text-white shadow-sm' 
                        : 'text-slate-600 hover:text-brand-on-surface hover:bg-brand-surface'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      )}

      {/* Main Dynamic Workspace Frame container */}
      <main className="lg:pl-80 pt-20 lg:pt-0 min-h-screen">
        <div className="max-w-6xl mx-auto px-6 py-6 md:py-10">
          {renderViewContent()}
        </div>
      </main>

      {/* Sticky Bottom Navigation for handheld phone views */}
      <BottomNav 
        activeTab={activeTab} 
        setActiveTab={handleSetActiveTab} 
      />

    </div>
  );
}
