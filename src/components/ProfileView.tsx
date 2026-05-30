import React, { useState } from 'react';
import { UserProfile } from '../types';

interface ProfileViewProps {
  user: UserProfile;
  onUpdateUser: (updatedUser: UserProfile) => void;
}

export default function ProfileView({ user, onUpdateUser }: ProfileViewProps) {
  const [name, setName] = useState<string>(user.name);
  const [role, setRole] = useState<string>(user.role);
  const [industry, setIndustry] = useState<string>(user.targetIndustry);
  const [jobType, setJobType] = useState<string>(user.jobType);
  const [seniority, setSeniority] = useState<string>(user.desiredSeniority);
  const [salaryExp, setSalaryExp] = useState<string>(user.salaryExpectation);
  const [notify, setNotify] = useState<boolean>(true);
  const [sound, setSound] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({
      ...user,
      name,
      role,
      targetIndustry: industry,
      jobType,
      desiredSeniority: seniority,
      salaryExpectation: salaryExp
    });
    alert("Profile settings successfully updated and stored in active session state!");
  };

  return (
    <div className="space-y-10 animate-fade-in">
      {/* Header */}
      <section>
        <span className="text-xs font-sans font-bold text-brand-secondary uppercase tracking-widest bg-brand-secondary/5 px-3 py-1 rounded-full">
          Control Panel
        </span>
        <h2 className="font-display text-4xl font-extrabold text-[#0b1c30] mt-3 tracking-tight">Profile &amp; Settings</h2>
        <p className="text-base text-[#454651] mt-1">Configure your personal criteria, targets, and workspace preferences.</p>
      </section>

      {/* Main double column */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Core details editable form */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 md:p-8 border border-[#e2e8f0]/45 shadow-sm space-y-6">
          <h3 className="font-display text-lg font-bold text-brand-primary pb-3 border-b border-slate-50">Target Demographics</h3>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500">Full Name</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3.5 bg-brand-surface border border-slate-200 rounded-xl text-xs font-bold text-brand-primary focus:ring-2 focus:ring-brand-accent focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500">Target Role Title</label>
                <input 
                  type="text" 
                  value={role} 
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-4 py-3.5 bg-brand-surface border border-slate-200 rounded-xl text-xs font-bold text-brand-primary focus:ring-2 focus:ring-brand-accent focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500">Target Industry Segment</label>
                <select 
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full p-3 bg-brand-surface border border-slate-200 rounded-xl text-xs font-bold text-brand-primary focus:ring-2 focus:ring-brand-accent focus:outline-none"
                >
                  <option value="Fintech & SaaS">Fintech &amp; SaaS</option>
                  <option value="Consumer Web & E-Commerce">Consumer Web &amp; E-Commerce</option>
                  <option value="AI / Deep Learning Systems">AI / Deep Learning Systems</option>
                  <option value="Automotive & Robotics">Automotive &amp; Robotics</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500">Desired Seniority Level</label>
                <select 
                  value={seniority}
                  onChange={(e) => setSeniority(e.target.value)}
                  className="w-full p-3 bg-brand-surface border border-slate-200 rounded-xl text-xs font-bold text-brand-primary focus:ring-2 focus:ring-brand-accent focus:outline-none"
                >
                  <option value="Senior / Lead">Senior / Lead</option>
                  <option value="Staff / Principal Developer">Staff / Principal Developer</option>
                  <option value="Engineering Manager">Engineering Manager</option>
                </select>
              </div>

              <div className="space-y-1 md:col-span-2">
                <div className="flex justify-between text-xs font-bold text-slate-500 mb-1">
                  <span>Salary Range Preference</span>
                  <span className="text-brand-secondary font-black">{salaryExp}</span>
                </div>
                <input 
                  type="text" 
                  value={salaryExp}
                  onChange={(e) => setSalaryExp(e.target.value)}
                  placeholder="e.g. $140k - $180k"
                  className="w-full px-4 py-3.5 bg-brand-surface border border-slate-200 rounded-xl text-xs font-bold text-brand-primary focus:ring-2 focus:ring-brand-accent"
                />
              </div>

            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="submit"
                className="px-8 py-3 bg-brand-secondary text-white text-xs font-bold rounded-xl hover:bg-brand-primary active:scale-[0.98] duration-150 cursor-pointer"
              >
                Save Settings Updated
              </button>
            </div>
          </form>
        </div>

        {/* Sidebar: preferences toggle panel */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Settings controls */}
          <div className="bg-white rounded-3xl border border-[#e2e8f0]/45 p-6 shadow-sm space-y-6">
            <h3 className="font-display text-base font-bold text-brand-primary pb-3 border-b border-slate-50">General Preferences</h3>
            
            <div className="space-y-4 text-xs font-semibold">
              {/* Toggle 1 */}
              <label className="flex items-center justify-between p-3.5 bg-brand-surface rounded-2xl border cursor-pointer">
                <div>
                  <span className="text-brand-primary block">Weekly Email Summary</span>
                  <span className="text-[10px] text-slate-400 font-medium">Receive latest priority deficit updates</span>
                </div>
                <input 
                  type="checkbox" 
                  checked={notify} 
                  onChange={(e) => setNotify(e.target.checked)}
                  className="w-4 h-4 rounded text-brand-accent cursor-pointer accent-brand-accent"
                />
              </label>

              {/* Toggle 2 */}
              <label className="flex items-center justify-between p-3.5 bg-brand-surface rounded-2xl border cursor-pointer">
                <div>
                  <span className="text-brand-primary block">Live Sound Guidance</span>
                  <span className="text-[10px] text-slate-400 font-medium font-sans">Audio feedback during mock interview assessments</span>
                </div>
                <input 
                  type="checkbox" 
                  checked={sound}
                  onChange={(e) => {
                    const val = e.target.checked;
                    setSound(val);
                    if (val) {
                      try {
                        const sfx = new Audio("https://actions.google.com/sounds/v1/alarms/digital_watch_alarm_long.ogg");
                        sfx.volume = 0.2;
                        sfx.play();
                      } catch {
                        // safe fallback for iframe blocker
                      }
                    }
                  }}
                  className="w-4 h-4 rounded text-brand-accent cursor-pointer accent-brand-accent"
                />
              </label>
            </div>
          </div>

          {/* Metadata system specifications */}
          <div className="bg-brand-surface/40 p-5 rounded-2xl border border-[#cbdbf5]/40 space-y-2">
            <span className="text-[10px] font-sans font-extrabold text-[#767682] uppercase tracking-wider block">PREPAI WORKSPACE PRO</span>
            <div className="text-xs space-y-1.5 text-slate-500 font-sans">
              <div className="flex justify-between">
                <span>Account Tier</span>
                <span className="font-bold text-brand-secondary">Premium Cloud</span>
              </div>
              <div className="flex justify-between">
                <span>Token Limits</span>
                <span className="font-bold text-emerald-600">Unlimited API Query Loops</span>
              </div>
              <div className="flex justify-between">
                <span>Client Engine Version</span>
                <span className="font-bold font-mono text-[10px]">v3.2.4-stable</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
