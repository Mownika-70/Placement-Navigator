import React from 'react';
import { UserProfile, JobApplication, TimelineMilestone } from '../types';

interface DashboardViewProps {
  user: UserProfile;
  jobs: JobApplication[];
  milestones: TimelineMilestone[];
  setActiveTab: (tab: string) => void;
}

export default function DashboardView({ user, jobs, milestones, setActiveTab }: DashboardViewProps) {
  const activeRoadmap = milestones.find((m) => m.status === 'In Progress') || milestones[1];
  
  // Calculate job counts
  const appliedCount = jobs.length;
  const interviewingCount = jobs.filter((j) => j.status === 'Interviewing').length;
  const offerCount = jobs.filter((j) => j.status === 'Offered').length;

  return (
    <div className="space-y-10 animate-fade-in">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-sans font-bold text-brand-accent uppercase tracking-widest bg-brand-accent/5 px-3.5 py-1.5 rounded-full">
            Autonomous Career Co-Pilot
          </span>
          <h2 className="font-display text-4xl font-extrabold text-brand-on-surface mt-3 tracking-tight">
            Welcome back, {user.name.split(' ')[0]}!
          </h2>
          <p className="font-sans text-base text-[#454651] max-w-xl mt-1">
            Track metrics, prep smarter with AI interview simulation, scanned resume feedback, and personalized targets.
          </p>
        </div>
        <div className="flex bg-white/70 backdrop-blur-md p-4 rounded-2xl border border-[#e2e8f0]/40 shadow-sm items-center gap-3">
          <div className="bg-emerald-500/10 text-emerald-600 p-2.5 rounded-xl">
            <span className="material-symbols-outlined material-symbols-fill text-[20px]">verified_user</span>
          </div>
          <div>
            <span className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-wide block">System Status</span>
            <span className="text-xs font-bold text-emerald-600">Secure Cloud Synced</span>
          </div>
        </div>
      </div>

      {/* Main Bento Grid Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Readiness Score */}
        <div className="glass-card p-6 rounded-3xl flex flex-col justify-between shadow-[0px_4px_20px_rgba(46,58,140,0.05)] border-l-4 border-brand-accent">
          <div className="flex justify-between items-start">
            <span className="p-3 bg-brand-surface text-brand-accent rounded-2xl">
              <span className="material-symbols-outlined text-[20px] !font-semibold">assessment</span>
            </span>
            <span className="text-[10px] font-sans font-extrabold text-[#767682] uppercase tracking-wider">ATS SCORE</span>
          </div>
          <div className="mt-8">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-4xl font-extrabold">85</span>
              <span className="text-sm font-semibold text-brand-secondary">/100</span>
            </div>
            <p className="text-xs text-brand-secondary font-semibold mt-1 flex items-center gap-1">
              <span className="material-symbols-outlined text-[12px] material-symbols-fill">trending_up</span>
              Top 15% in SaaS Industry
            </p>
          </div>
        </div>

        {/* Learning Milestones */}
        <div className="glass-card p-6 rounded-3xl flex flex-col justify-between shadow-[0px_4px_20px_rgba(46,58,140,0.05)] border-l-4 border-brand-secondary">
          <div className="flex justify-between items-start">
            <span className="p-3 bg-brand-surface text-brand-secondary rounded-2xl">
              <span className="material-symbols-outlined text-[20px] !font-semibold">route</span>
            </span>
            <span className="text-[10px] font-sans font-extrabold text-[#767682] uppercase tracking-wider">ROADMAP</span>
          </div>
          <div className="mt-8">
            <span className="font-display text-3xl font-extrabold block">2 of 3</span>
            <p className="text-xs text-[#454651] font-semibold mt-1">
              Active: {activeRoadmap.title}
            </p>
          </div>
        </div>

        {/* Interviews Prepped */}
        <div className="glass-card p-6 rounded-3xl flex flex-col justify-between shadow-[0px_4px_20px_rgba(46,58,140,0.05)] border-l-4 border-indigo-600">
          <div className="flex justify-between items-start">
            <span className="p-3 bg-brand-surface text-indigo-600 rounded-2xl">
              <span className="material-symbols-outlined text-[20px] !font-semibold">psychology</span>
            </span>
            <span className="text-[10px] font-sans font-extrabold text-[#767682] uppercase tracking-wider">PREPARATION</span>
          </div>
          <div className="mt-8">
            <span className="font-display text-3xl font-extrabold block">{user.readinessScore}%</span>
            <p className="text-xs text-emerald-600 font-bold mt-1 flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">checklist</span>
              12 Sessions Completed
            </p>
          </div>
        </div>

        {/* Active Applications */}
        <div className="glass-card p-6 rounded-3xl flex flex-col justify-between shadow-[0px_4px_20px_rgba(46,58,140,0.05)] border-l-4 border-amber-500">
          <div className="flex justify-between items-start">
            <span className="p-3 bg-brand-surface text-amber-500 rounded-2xl">
              <span className="material-symbols-outlined text-[20px] !font-semibold">schedule</span>
            </span>
            <span className="text-[10px] font-sans font-extrabold text-[#767682] uppercase tracking-wider">JOBS</span>
          </div>
          <div className="mt-8">
            <span className="font-display text-3xl font-extrabold block">{appliedCount} Total</span>
            <span className="text-xs text-[#454651] font-semibold mt-1 block">
              {interviewingCount} Interviewing · {offerCount} Offered
            </span>
          </div>
        </div>
      </div>

      {/* Main Actions Checklist Dashboard Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Daily Recommendations & Tasks Checkout */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 md:p-8 border border-[#e2e8f0]/40 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#e2e8f0]/30">
            <div>
              <h3 className="font-display text-xl font-bold text-brand-on-surface">Your Career Acceleration Plan</h3>
              <p className="text-sm text-[#454651]">Recommended priorities generated based on your key targets and gaps.</p>
            </div>
            <span className="text-xs bg-brand-accent/10 text-brand-accent font-bold px-3 py-1 rounded-full text-center">
              AI Priority
            </span>
          </div>

          <div className="space-y-4">
            {/* Task 1 */}
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-brand-surface border border-brand-container/10 hover:border-brand-accent/20 cursor-pointer transition-all group" onClick={() => setActiveTab('resume')}>
              <div className="w-10 h-10 rounded-xl bg-brand-accent/15 text-brand-accent flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px] material-symbols-fill">description</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-brand-on-surface group-hover:text-brand-accent transition-colors">
                    Fulfill missing keywords in your formatting
                  </h4>
                  <span className="material-symbols-outlined text-slate-400 group-hover:translate-x-1 transition-transform text-sm">arrow_forward</span>
                </div>
                <p className="text-xs text-[#454651] mt-1">
                  Cloud computing, Docker, and CI/CD pipelines are missing on your parser indices. Review ATS improvements.
                </p>
              </div>
            </div>

            {/* Task 2 */}
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-brand-surface border border-brand-container/10 hover:border-brand-accent/20 cursor-pointer transition-all group" onClick={() => setActiveTab('prep')}>
              <div className="w-10 h-10 rounded-xl bg-indigo-50/80 text-brand-secondary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px] material-symbols-fill">psychology</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-brand-on-surface group-hover:text-brand-accent transition-colors">
                    Rehearsal Frontend System Design query
                  </h4>
                  <span className="material-symbols-outlined text-slate-400 group-hover:translate-x-1 transition-transform text-sm">arrow_forward</span>
                </div>
                <p className="text-xs text-[#454651] mt-1">
                  Start an interactive mock session regarding state management hooks & caching performance indices.
                </p>
              </div>
            </div>

            {/* Task 3 */}
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-brand-surface border border-brand-container/10 hover:border-brand-accent/20 cursor-pointer transition-all group" onClick={() => setActiveTab('skills')}>
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px] material-symbols-fill">target</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-brand-on-surface group-hover:text-brand-accent transition-colors">
                    Close the 40% System Design gap
                  </h4>
                  <span className="material-symbols-outlined text-slate-400 group-hover:translate-x-1 transition-transform text-sm">arrow_forward</span>
                </div>
                <p className="text-xs text-[#454651] mt-1">
                  Your core skill radar chart shows deficit in load balancing & microservices layout diagrams. Browse curated materials.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Core Career preferences & quick links */}
        <div className="lg:col-span-4 flex flex-col gap-8">
          {/* Target Profile Card */}
          <div className="bg-gradient-to-br from-[#142175] to-[#2e3a8c] text-white rounded-3xl p-6 shadow-xl relative overflow-hidden flex flex-col justify-between min-h-[300px]">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-brand-accent/25 rounded-full blur-2xl" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] bg-white/10 border border-white/20 text-white font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Target Profile
                </span>
                <button 
                  onClick={() => setActiveTab('profile')}
                  className="p-1 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-white text-[18px]">edit</span>
                </button>
              </div>
              <h4 className="font-display text-lg font-bold">{user.role}</h4>
              <p className="text-xs text-white/70 mt-1">Ready for next high-performance roles</p>
              
              <div className="mt-6 space-y-3.5 border-t border-white/10 pt-4 text-xs">
                <div className="flex justify-between">
                  <span className="text-white/60 font-semibold">Target Industry</span>
                  <span className="font-bold">{user.targetIndustry}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60 font-semibold">Salary Expectation</span>
                  <span className="font-bold">{user.salaryExpectation}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60 font-semibold">Job Type</span>
                  <span className="font-bold">{user.jobType}</span>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setActiveTab('tracker')}
              className="relative z-10 mt-6 w-full py-3 bg-white text-brand-primary text-xs font-bold font-sans rounded-xl text-center shadow-lg hover:bg-brand-surface duration-150 active:scale-[0.98] cursor-pointer"
            >
              Consult Tracker Workspace
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
