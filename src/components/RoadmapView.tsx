import React, { useState } from 'react';
import { TimelineMilestone, Resource } from '../types';

interface RoadmapViewProps {
  milestones: TimelineMilestone[];
  resources: Resource[];
  onUpdateMilestone: (id: string, progress: number) => void;
}

export default function RoadmapView({ milestones, resources, onUpdateMilestone }: RoadmapViewProps) {
  // Set reading modal state
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [certificateEarned, setCertificateEarned] = useState<string | null>(null);

  // Active milestone
  const activeMilestone = milestones.find((m) => m.status === 'In Progress') || milestones[1];

  // Recalculate roadmap overall progress
  // Milestones: m1 (Completed = 100), m2 (In Progress = progress), m3 (Upcoming = 0)
  const totalMilestonesProgress = milestones.reduce((acc, m) => {
    if (m.status === 'Completed') return acc + 100;
    if (m.status === 'In Progress') return acc + (m.progress || 0);
    return acc;
  }, 0);
  const overallRoadmapProgress = Math.round(totalMilestonesProgress / milestones.length);

  // Handle slider adjustment
  const handleProgressSlider = (id: string, value: number) => {
    onUpdateMilestone(id, value);
    if (value === 100) {
      setCertificateEarned(id === 'm2' ? "Advanced Portfolio architecture" : "Custom Roadmap Mastery");
    }
  };

  const resourceContents: Record<string, { summary: string; points: string[]; code?: string }> = {
    r1: {
      summary: "System Design Guide for High-Performance Distributed Workspaces.",
      points: [
        "Horizontal vs Vertical Scaling: Scaling out adds generic server nodes, whereas scaling up increases memory/CPU specifications.",
        "Load balancing algorithms (Round Robin, Least Connection, IP Hash) evenly distribute query loads across backend server pools.",
        "Database Sharding partitions wide tables horizontally across independent databases.",
        "CDNs (Content Delivery Networks) cache static assets at edges close to geopolitical clusters, drastically lowering latencies."
      ],
      code: `// Multi-tier server layout concept
class LoadBalancer {
  private servers: string[] = ["10.0.0.1", "10.0.0.2", "10.0.0.3"];
  private index = 0;

  public getNextServer(): string {
    const server = this.servers[this.index];
    this.index = (this.index + 1) % this.servers.length;
    return server;
  }
}`
    },
    r2: {
      summary: "Advanced SQL Analytical Patterns, Window Functions, and Schema Indices.",
      points: [
        "Window Functions: DENSE_RANK(), ROW_NUMBER() and LEAD() compute sets dynamically without heavy GROUP BY joins.",
        "CTEs (Common Table Expressions) isolate complex query logics into clean virtual namespaces.",
        "Database Indexing (B-Tree, Hash Index) accelerates lookup speeds but increments disk I/O write latencies.",
        "Explain query execution plans to identify problematic nested loops or full-table index scans."
      ],
      code: `-- Partition records by department salary indices
SELECT 
  employee_id, 
  department_id, 
  salary,
  DENSE_RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) as salary_rank
FROM corporate_payroll;`
    },
    r3: {
      summary: "Architecting interactive whiteboard frameworks for coding interviews.",
      points: [
        "Whiteboard diagrams represent systemic microservice models or algorithm workflows cleanly.",
        "Utilize a canvas or stage size observer to handle window resizing dynamically.",
        "Store visual nodes as state maps and perform declarative renders to prevent memory leaks."
      ]
    }
  };

  return (
    <div className="space-y-10 animate-fade-in relative">
      {/* Hero Header */}
      <section className="mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-sans font-bold text-brand-secondary uppercase tracking-widest bg-brand-secondary/5 px-3 py-1 rounded-full">
              Interactive Academic Timeline
            </span>
            <h1 className="text-3xl md:text-4xl font-display font-extrabold text-[#142175]">
              Bridge the Software Engineering Gap
            </h1>
            <p className="text-base font-sans text-[#454651] max-w-2xl">
              A personalized journey designed to transition your academic knowledge into production-ready software engineering skills.
            </p>
          </div>

          {/* Radial progress badge */}
          <div className="bg-white p-5 rounded-2xl border border-[#e2e8f0]/40 flex items-center gap-4 shadow-sm min-w-[240px]">
            <div className="relative w-16 h-16">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <path 
                  className="text-slate-100 stroke-current" 
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                  fill="none" 
                  strokeWidth="3"
                />
                <path 
                  className="text-brand-accent stroke-current" 
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                  fill="none" 
                  strokeDasharray={`${overallRoadmapProgress}, 100`} 
                  strokeLinecap="round" 
                  strokeWidth="3"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-brand-primary">
                {overallRoadmapProgress}%
              </span>
            </div>
            <div>
              <p className="text-xs text-[#767682] font-semibold">Overall Progress</p>
              <p className="text-[#142175] font-sans text-sm font-bold">
                {milestones.filter(m => m.status === 'Completed').length} of {milestones.length} Milestones
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid: timeline on left, interactive coaching panel on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Vertical Timeline */}
        <div className="lg:col-span-8">
          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-[0px_4px_20px_rgba(46,58,140,0.05)] border border-[#e2e8f0]/40 relative">
            {/* Center connector line */}
            <div className="absolute left-[31px] md:left-[47px] top-[48px] bottom-[48px] w-1 bg-gradient-to-b from-brand-accent via-brand-secondary to-[#d3e4fe] opacity-30 hidden md:block" />

            <div className="space-y-12 relative">
              {milestones.map((m) => {
                const isCompleted = m.status === 'Completed';
                const isInProgress = m.status === 'In Progress';
                const isUpcoming = m.status === 'Upcoming';

                return (
                  <div key={m.id} className={`flex gap-4 md:gap-8 group transition-opacity duration-300 ${isUpcoming ? 'opacity-65' : ''}`}>
                    
                    {/* Circle icon marker */}
                    <div className="relative z-10 hidden md:block">
                      {isCompleted && (
                        <div className="w-10 h-10 rounded-full bg-brand-accent text-white flex items-center justify-center shadow-lg shadow-brand-accent/20">
                          <span className="material-symbols-outlined text-[20px] material-symbols-fill">check_circle</span>
                        </div>
                      )}
                      {isInProgress && (
                        <div className="w-10 h-10 rounded-full bg-white border-4 border-brand-accent text-brand-accent flex items-center justify-center active-glow">
                          <span className="material-symbols-outlined text-[20px] material-symbols-fill">pending</span>
                        </div>
                      )}
                      {isUpcoming && (
                        <div className="w-10 h-10 rounded-full bg-[#eff4ff] border border-slate-200 text-slate-400 flex items-center justify-center">
                          <span className="material-symbols-outlined text-[20px]">lock</span>
                        </div>
                      )}
                    </div>

                    {/* Milestone Card Content */}
                    <div className="flex-1">
                      <div className={`bg-brand-surface/40 hover:bg-brand-surface p-6 rounded-2xl border transition-all duration-200 ${
                        isInProgress 
                          ? 'border-brand-accent/50 bg-white ring-2 ring-brand-accent/5 shadow-sm' 
                          : 'border-slate-100'
                      }`}>
                        <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
                          <h3 className="font-display text-lg font-extrabold text-brand-primary">{m.title}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold font-sans ${
                            isCompleted 
                              ? 'bg-emerald-500/10 text-emerald-600' 
                              : isInProgress 
                                ? 'bg-brand-accent text-white' 
                                : 'bg-[#e2e8f0] text-[#767682]'
                          }`}>
                            {m.badgeText}
                          </span>
                        </div>
                        <p className="text-sm font-sans text-[#454651] leading-relaxed mb-4">{m.description}</p>

                        {/* Interactive items inside Milestone cards */}
                        {isCompleted && m.certificateEarned && (
                          <span className="inline-flex items-center gap-1.5 text-xs text-brand-accent font-bold bg-brand-accent/5 px-2.5 py-1 rounded-lg">
                            <span className="material-symbols-outlined text-[14px]">verified</span>
                            Certificate Earned
                          </span>
                        )}

                        {isInProgress && (
                          <div className="mt-4 p-4 rounded-xl bg-white border border-[#e2e8f0]/40 space-y-3">
                            <div className="flex justify-between items-center text-xs">
                              <span className="text-[#454651] font-semibold">Component Development</span>
                              <span className="font-bold text-brand-accent">{m.progress}%</span>
                            </div>
                            
                            {/* LIVE Interactive Slider to update the progress */}
                            <div className="flex items-center gap-4">
                              <input 
                                type="range" 
                                min="0" 
                                max="100" 
                                value={m.progress || 0}
                                onChange={(e) => handleProgressSlider(m.id, parseInt(e.target.value))}
                                className="flex-1 h-2 bg-[#eff4ff] rounded-lg appearance-none cursor-pointer accent-brand-accent"
                              />
                            </div>
                            <p className="text-[10px] text-slate-400 font-semibold italic">Drag slider to adjust and unlock the milestone certificate!</p>
                          </div>
                        )}
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sidebar: AI Coach & Resource lists */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* AI Coaching card */}
          <div className="bg-gradient-to-br from-[#ffffff] to-[#e5eeff] p-6 border border-[#e2e8f0]/40 rounded-3xl shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-brand-accent" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
              <h4 className="text-xs font-sans font-extrabold text-brand-primary uppercase tracking-wide">
                AI Coaching Insight
              </h4>
            </div>
            <p className="text-sm font-sans text-brand-primary leading-relaxed italic font-medium mb-4">
              &ldquo;You've shown strong aptitude in Backend Logic. To excel in your Portfolio Project, focus on implementing robust Error Boundaries.&rdquo;
            </p>
            <div className="text-xs text-[#454651] font-semibold mb-2">Confidence Level Indicator</div>
            <div className="w-full bg-[#cbdbf5] h-2 rounded-full overflow-hidden mb-4">
              <div className="h-full bg-brand-accent rounded-full" style={{ width: '85%' }}></div>
            </div>
          </div>

          {/* Curated Resources */}
          <div className="bg-white p-6 rounded-3xl border border-[#e2e8f0]/40 shadow-sm">
            <h4 className="font-display text-lg font-bold text-brand-primary mb-4">Curated Resources</h4>
            <div className="space-y-4">
              {resources.map((res) => (
                <button
                  key={res.id}
                  onClick={() => setSelectedResource(res)}
                  className="w-full text-left flex items-center gap-4 p-3.5 rounded-2xl bg-brand-surface/40 hover:bg-brand-surface border border-slate-100/60 hover:border-brand-accent/30 transition-all duration-200 group cursor-pointer"
                >
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-brand-secondary border border-slate-100 group-hover:bg-brand-accent group-hover:text-white transition-colors">
                    <span className="material-symbols-outlined">{res.icon}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-[#0b1c30] group-hover:text-brand-secondary transition-colors">{res.title}</p>
                    <p className="text-xs text-[#767682] mt-0.5">{res.duration} · {res.type}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* READING MODAL FOR RESOURCES */}
      {selectedResource && (
        <div className="fixed inset-0 bg-[#0b1c30]/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 md:p-8 space-y-6 max-h-[85vh] overflow-y-auto shadow-2xl relative animate-scale-in">
            {/* Close */}
            <button 
              onClick={() => setSelectedResource(null)}
              className="absolute top-6 right-6 text-slate-400 hover:text-brand-primary transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <div className="flex items-center gap-3">
              <span className="p-3 bg-brand-surface text-brand-secondary rounded-xl">
                <span className="material-symbols-outlined">{selectedResource.icon}</span>
              </span>
              <div>
                <span className="text-[10px] font-bold text-brand-accent uppercase tracking-wider">{selectedResource.category} Tutorial</span>
                <h3 className="font-display text-2xl font-bold text-brand-primary mt-0.5">{selectedResource.title}</h3>
              </div>
            </div>

            <div className="space-y-4 text-sm leading-relaxed text-[#454651]">
              <p className="font-semibold text-[#0b1c30]">
                {resourceContents[selectedResource.id]?.summary || "Learn professional techniques regarding advanced software patterns."}
              </p>
              
              <ul className="space-y-3 list-none pl-0">
                {(resourceContents[selectedResource.id]?.points || [
                  "Acquire high reliability systems architecture setups.",
                  "Master standard interview concepts dynamically."
                ]).map((pt, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-emerald-500 text-sm mt-0.5">check_circle</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>

              {resourceContents[selectedResource.id]?.code && (
                <div className="mt-4">
                  <span className="text-xs font-bold text-slate-400 block mb-1">PROTOTYPE CODE REFERENCE</span>
                  <pre className="p-4 bg-[#252c3e] text-emerald-300 rounded-xl overflow-x-auto font-mono text-xs leading-5">
                    {resourceContents[selectedResource.id].code}
                  </pre>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <button 
                onClick={() => setSelectedResource(null)}
                className="px-5 py-2.5 text-xs text-brand-primary font-bold hover:bg-slate-50 rounded-xl cursor-pointer"
              >
                Close Reader
              </button>
              <button 
                onClick={() => {
                  alert("Awesome! You completed reading this masterclass resource.");
                  setSelectedResource(null);
                }}
                className="px-5 py-2.5 bg-brand-accent text-white text-xs font-bold rounded-xl hover:opacity-90 cursor-pointer"
              >
                Mark as Completed
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CERTIFICATE CELEBRATION MODAL */}
      {certificateEarned && (
        <div className="fixed inset-0 bg-[#0b1c30]/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 text-center space-y-6 shadow-2xl relative border-2 border-brand-accent/20 animate-scale-in">
            <span className="material-symbols-outlined text-[60px] text-amber-500 material-symbols-fill block">celebration</span>
            <div>
              <h3 className="font-display text-2xl font-black text-brand-primary">Congratulations, Alex Rivera!</h3>
              <p className="text-sm text-[#454651] mt-2 leading-relaxed">
                You have successfully executed 100% of the active milestone project: <strong>{certificateEarned}</strong>.
              </p>
            </div>
            
            <div className="p-4 bg-brand-surface rounded-2xl border border-[#cbdbf5]/50 flex items-center gap-3">
              <span className="p-3 bg-brand-accent/10 text-brand-accent rounded-xl">
                <span className="material-symbols-outlined">stars</span>
              </span>
              <div className="text-left">
                <span className="text-[10px] text-brand-secondary font-bold block">ROADMAP BADGE ISSUED</span>
                <span className="text-xs font-bold text-brand-primary">{certificateEarned} Certificate</span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <button 
                onClick={() => setCertificateEarned(null)}
                className="w-full py-3 bg-brand-accent text-white font-bold text-xs rounded-xl cursor-pointer active:scale-95 transition-transform"
              >
                Download Credentials File
              </button>
              <button 
                onClick={() => setCertificateEarned(null)}
                className="w-full py-3 text-[#767682] hover:text-[#0b1c30] text-xs font-bold cursor-pointer"
              >
                Dismiss Celebration Panel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
