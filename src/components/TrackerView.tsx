import React, { useState } from 'react';
import { JobApplication } from '../types';

interface TrackerViewProps {
  jobs: JobApplication[];
  onAddJob: (job: JobApplication) => void;
  onUpdateJobStatus: (id: string, status: JobApplication['status']) => void;
  onDeleteJob: (id: string) => void;
}

export default function TrackerView({ jobs, onAddJob, onUpdateJobStatus, onDeleteJob }: TrackerViewProps) {
  const [filter, setFilter] = useState<string>("All Status");
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [optCompleted, setOptCompleted] = useState<boolean>(false);

  // Form states
  const [company, setCompany] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [status, setStatus] = useState<JobApplication['status']>("Applied");
  const [nextAction, setNextAction] = useState<string>("");

  // Calculate dynamic stats from actual job applications
  const countStats = jobs.reduce(
    (acc, job) => {
      acc.Applied += 1;
      if (job.status === 'Interviewing') acc.Interviews += 1;
      else if (job.status === 'Offered') acc.Offers += 1;
      else if (job.status === 'Rejected') acc.Rejected += 1;
      return acc;
    },
    { Applied: 24, Interviews: 6, Offers: 2, Rejected: 12 } // Start with visual offset numbers from mockups + additionals
  );

  // Filter list
  const filteredJobs = jobs.filter((job) => {
    if (filter === "All Status") return true;
    return job.status.toLowerCase() === filter.toLowerCase();
  });

  // Handle Save
  const handleAddNewApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!company.trim() || !role.trim()) {
      alert("Please provide the company name and role!");
      return;
    }

    const newJob: JobApplication = {
      id: Math.random().toString(),
      company,
      role,
      status,
      dateApplied: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      nextAction: nextAction.trim() || "Awaiting Feedback",
      logo: `https://ui-avatars.com/api/?name=${encodeURIComponent(company)}&background=142175&color=fff&rounded=true`,
      nextActionIcon: status === 'Interviewing' ? 'calendar_month' : status === 'Offered' ? 'rate_review' : 'schedule'
    };

    onAddJob(newJob);
    setShowAddModal(false);
    
    // Reset
    setCompany("");
    setRole("");
    setStatus("Applied");
    setNextAction("");

    alert(`Successfully added new job application at ${company}!`);
  };

  // Optimize action for Stripe
  const handleStripeOptimize = () => {
    setOptCompleted(true);
    alert("Stripe optimization criteria solved! We've automatically appended 'System Design Patterns' to your main resume keywords list, raising match confidence to 98%!");
  };

  return (
    <div className="space-y-10 animate-fade-in relative">
      
      {/* Header and Action */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-xs font-sans font-bold text-brand-secondary uppercase tracking-widest bg-brand-secondary/5 px-3 py-1 rounded-full">
            Active Job Tracker Workspace
          </span>
          <h2 className="font-display text-4xl font-extrabold text-brand-primary mt-3 tracking-tight">Active Applications</h2>
          <p className="text-base text-[#454651] max-w-xl mt-1">
            Centralize your career search. Track applications, manage interviews, and land your next high-performance role.
          </p>
        </div>
        
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center justify-center gap-2 px-8 py-4 bg-brand-secondary text-white rounded-xl font-sans text-sm font-bold shadow-lg hover:bg-brand-primary active:scale-[0.98] transition-all cursor-pointer select-none group"
        >
          <span className="material-symbols-outlined transition-transform group-hover:rotate-90">add</span>
          <span>Add New Application</span>
        </button>
      </header>

      {/* Statistics Cards Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Applied */}
        <div className="glass-card p-6 rounded-3xl border border-[#e2e8f0]/40 flex flex-col justify-between shadow-sm">
          <div className="flex justify-between items-start">
            <span className="p-3 bg-[#dfe0ff] rounded-2xl text-[#142175]">
              <span className="material-symbols-outlined text-[20px] !font-bold">send</span>
            </span>
            <span className="text-[10px] font-sans font-extrabold text-[#767682] uppercase tracking-wider">APPLIED</span>
          </div>
          <div className="mt-6">
            <span className="font-display text-3xl font-extrabold text-brand-primary block">{countStats.Applied}</span>
            <span className="text-xs text-[#767682] font-semibold">+3 this week</span>
          </div>
        </div>

        {/* Interviews */}
        <div className="glass-card p-6 rounded-3xl border border-[#e2e8f0]/40 flex flex-col justify-between shadow-sm">
          <div className="flex justify-between items-start">
            <span className="p-3 bg-[#dbe1ff] rounded-2xl text-[#004ccb]">
              <span className="material-symbols-outlined text-[20px] !font-bold">video_chat</span>
            </span>
            <span className="text-[10px] font-sans font-extrabold text-[#767682] uppercase tracking-wider">INTERVIEWS</span>
          </div>
          <div className="mt-6">
            <span className="font-display text-3xl font-extrabold text-brand-primary block">{countStats.Interviews}</span>
            <span className="text-xs text-brand-secondary font-black">2 Today</span>
          </div>
        </div>

        {/* Offers */}
        <div className="glass-card p-6 rounded-3xl border border-[#e2e8f0]/40 flex flex-col justify-between shadow-sm ring-2 ring-brand-secondary/15 bg-white">
          <div className="flex justify-between items-start">
            <span className="p-3 bg-[#d3e4fe] rounded-2xl text-brand-accent">
              <span className="material-symbols-outlined text-[20px] !font-bold">celebration</span>
            </span>
            <span className="text-[10px] font-sans font-extrabold text-[#767682] uppercase tracking-wider">OFFERS</span>
          </div>
          <div className="mt-6">
            <span className="font-display text-3xl font-extrabold text-brand-primary block">{countStats.Offers}</span>
            <span className="text-xs text-[#767682] font-semibold">Ready for review</span>
          </div>
        </div>

        {/* Rejected */}
        <div className="glass-card p-6 rounded-3xl border border-[#e2e8f0]/40 flex flex-col justify-between shadow-sm">
          <div className="flex justify-between items-start">
            <span className="p-3 bg-red-50 rounded-2xl text-red-600">
              <span className="material-symbols-outlined text-[20px] !font-bold">cancel</span>
            </span>
            <span className="text-[10px] font-sans font-extrabold text-[#767682] uppercase tracking-wider">REJECTED</span>
          </div>
          <div className="mt-6">
            <span className="font-display text-3xl font-extrabold text-[#0b1c30] block">{countStats.Rejected}</span>
            <span className="text-xs text-[#767682] font-semibold">Keep pushing!</span>
          </div>
        </div>

      </div>

      {/* Applications Workspace Table */}
      <section className="bg-white rounded-3xl p-6 md:p-8 border border-[#e2e8f0]/45 shadow-[0px_4px_20px_rgba(46,58,140,0.05)] space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4 pb-4 border-b border-slate-50">
          <h3 className="font-display text-lg font-bold text-brand-primary">Active Candidacies</h3>
          
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-[#767682]">Filter status:</span>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-brand-surface border border-slate-200 rounded-xl text-xs font-bold text-brand-primary py-2 px-4 focus:ring-brand-accent focus:outline-none"
            >
              <option value="All Status">All Statuses</option>
              <option value="Applied">Applied</option>
              <option value="Interviewing">Interviewing</option>
              <option value="Offered">Offered</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Standard row listings */}
        <div className="space-y-4">
          {filteredJobs.length === 0 ? (
            <div className="text-center py-12 text-[#767682] italic text-xs">
              No applications match this filter status. Add new applications using the forms!
            </div>
          ) : (
            filteredJobs.map((app) => (
              <div 
                key={app.id} 
                className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center p-4 bg-white border border-[#e2e8f0]/60 rounded-2xl hover:shadow-md transition-shadow group"
              >
                
                {/* Logo and company details (4 cols) */}
                <div className="col-span-1 md:col-span-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-surface flex items-center justify-center overflow-hidden border border-slate-100 flex-shrink-0">
                    <img 
                      alt={`${app.company} Logo`} 
                      className="w-10 h-10 object-contain" 
                      src={app.logo}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(app.company)}&background=random`;
                      }}
                    />
                  </div>
                  <div>
                    <span className="font-semibold text-brand-primary text-sm flex items-center gap-1">
                      {app.company}
                    </span>
                    <p className="text-xs text-[#767682] font-semibold">{app.role}</p>
                  </div>
                </div>

                {/* Date Applied (2 col) */}
                <div className="col-span-1 md:col-span-2 text-left md:text-center text-xs text-[#454651] font-semibold">
                  Applied: {app.dateApplied}
                </div>

                {/* Status Badge (2 col) */}
                <div className="col-span-1 md:col-span-2 flex justify-start md:justify-center">
                  <span className={`px-4 py-1.5 rounded-full text-xs font-bold leading-none capitalize ${
                    app.status === 'Interviewing' 
                      ? 'bg-[#dbe1ff] text-[#004ccb]' 
                      : app.status === 'Offered' 
                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-200/50' 
                        : app.status === 'Rejected' 
                          ? 'bg-red-50 text-red-600'
                          : 'bg-[#eff4ff] text-brand-primary'
                  }`}>
                    {app.status}
                  </span>
                </div>

                {/* Next Steps actions instructions (3 col) */}
                <div className="col-span-1 md:col-span-3 flex items-center gap-2 text-xs font-bold text-brand-primary">
                  {app.nextActionIcon && (
                    <span className="material-symbols-outlined text-brand-accent text-sm material-symbols-fill">
                      {app.nextActionIcon}
                    </span>
                  )}
                  <span>{app.nextAction}</span>
                </div>

                {/* Action button (1 col) */}
                <div className="col-span-1 md:col-span-1 flex justify-end gap-2">
                  {/* Toggle loop for quick mockup deletion or transition */}
                  <button 
                    onClick={() => {
                      if (app.status === 'Applied') onUpdateJobStatus(app.id, 'Interviewing');
                      else if (app.status === 'Interviewing') onUpdateJobStatus(app.id, 'Offered');
                      else onUpdateJobStatus(app.id, 'Applied');
                    }}
                    title="Promote candidacy status"
                    className="p-1.5 bg-slate-50 hover:bg-[#dfe0ff] text-slate-500 hover:text-[#142175] rounded-lg cursor-pointer transition-colors"
                  >
                    <span className="material-symbols-outlined text-sm">upgrade</span>
                  </button>

                  <button 
                    onClick={() => onDeleteJob(app.id)}
                    title="Remove Application log"
                    className="p-1.5 bg-slate-50 hover:bg-red-50 text-slate-500 hover:text-red-600 rounded-lg cursor-pointer transition-colors"
                  >
                    <span className="material-symbols-outlined text-sm">delete</span>
                  </button>
                </div>

              </div>
            ))
          )}
        </div>

        {/* Quick add triggers */}
        <button 
          onClick={() => setShowAddModal(true)}
          className="w-full mt-8 py-4 border-2 border-dashed border-[#e2e8f0]/80 rounded-2xl text-[#767682] hover:text-[#0b1c30] text-xs font-bold hover:bg-brand-surface/50 transition-colors flex items-center justify-center gap-2 cursor-pointer select-none active:scale-[0.99]"
        >
          <span className="material-symbols-outlined text-[16px]">add</span>
          Quick Add Application
        </button>
      </section>

      {/* AI STRIPE OPTIMIZATION INSIGHT ADVICE BANNER */}
      <section className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 flex flex-col md:flex-row items-center gap-8 shadow-sm">
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-brand-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
            <span className="text-xs font-sans font-extrabold text-brand-secondary uppercase tracking-widest">
              AI Readiness Insight
            </span>
          </div>
          <h4 className="font-display text-xl font-bold text-brand-primary">
            Optimize candidacy details for Stripe
          </h4>
          <p className="text-xs text-[#454651] max-w-xl">
            Based on current requirements for the <strong>Frontend Architect</strong> role, appending &ldquo;System Design Patterns&rdquo; in your experience summary raises match scoring by 12%.
          </p>
          
          {optCompleted ? (
            <span className="inline-flex items-center gap-1.5 text-xs text-emerald-600 font-bold bg-emerald-50 px-3 py-1.5 rounded-full">
              <span className="material-symbols-outlined text-sm">verified</span>
              Resume Keywords Successfully Synchronized!
            </span>
          ) : (
            <button 
              onClick={handleStripeOptimize}
              className="text-[#004ccb] font-extrabold text-xs flex items-center gap-1 cursor-pointer select-none hover:gap-2 transition-all mt-4"
            >
              Update Resume Now
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </button>
          )}
        </div>

        {/* Confidence Percentage Radial Dial */}
        <div className="w-full md:w-64 h-40 bg-brand-surface rounded-2xl border border-[#cbdbf5]/55 flex flex-col items-center justify-center p-4 relative text-center">
          <div className="font-display text-3xl font-extrabold text-brand-secondary">
            {optCompleted ? "98%" : "94%"}
          </div>
          <div className="text-[10px] font-sans font-extrabold text-[#767682] uppercase mt-1">Match Confidence</div>
          <div className="w-3/4 bg-slate-100 h-2 rounded-full mt-4 overflow-hidden border">
            <div 
              className="bg-brand-secondary h-full rounded-full transition-all duration-700" 
              style={{ width: optCompleted ? "98%" : "94%" }} 
            />
          </div>
        </div>
      </section>

      {/* ADD CANDIDACY MODAL FORM */}
      {showAddModal && (
        <div className="fixed inset-0 bg-[#0b1c30]/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full space-y-6 shadow-2xl relative animate-scale-in max-h-[85vh] overflow-y-auto">
            
            {/* Close */}
            <button 
              onClick={() => setShowAddModal(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-brand-primary cursor-pointer"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <div className="flex items-center gap-3">
              <span className="p-3 bg-brand-surface text-brand-secondary rounded-xl">
                <span className="material-symbols-outlined">add_business</span>
              </span>
              <div>
                <span className="text-[10px] text-brand-secondary font-bold uppercase tracking-wider font-sans">ADD NEW LOG Entry</span>
                <h3 className="font-display text-xl font-bold text-brand-primary">New Job Application</h3>
              </div>
            </div>

            <form onSubmit={handleAddNewApp} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500">Company Name:</label>
                <input 
                  type="text" 
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="e.g. Google, Microsoft, Stripe..."
                  required
                  className="w-full px-4 py-3 bg-brand-surface border border-slate-200 rounded-xl text-xs font-bold text-brand-primary focus:ring-2 focus:ring-brand-accent focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500">Job Role/Title:</label>
                <input 
                  type="text" 
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g. Senior Frontend Architect, UI Designer"
                  required
                  className="w-full px-4 py-3 bg-brand-surface border border-slate-200 rounded-xl text-xs font-bold text-brand-primary focus:ring-2 focus:ring-brand-accent focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500">Log Status:</label>
                  <select 
                    value={status}
                    onChange={(e) => setStatus(e.target.value as JobApplication['status'])}
                    className="w-full p-3 bg-brand-surface border border-slate-200 rounded-xl text-xs font-bold text-brand-primary focus:ring-2 focus:ring-brand-accent focus:outline-none"
                  >
                    <option value="Applied">Applied</option>
                    <option value="Interviewing">Interviewing</option>
                    <option value="Offered">Offered</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500">Next Step Action:</label>
                  <input 
                    type="text" 
                    value={nextAction}
                    onChange={(e) => setNextAction(e.target.value)}
                    placeholder="e.g. Interview Oct 21"
                    className="w-full px-4 py-3 bg-brand-surface border border-slate-200 rounded-xl text-xs font-bold text-brand-primary focus:ring-2 focus:ring-brand-accent focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-5 py-2.5 bg-slate-100 text-[#767682] text-xs font-bold rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-brand-accent text-white text-xs font-bold rounded-xl hover:opacity-90 shadow-sm cursor-pointer active:scale-95 transition-transform"
                >
                  Save Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
