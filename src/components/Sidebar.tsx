import React from 'react';
import { UserProfile } from '../types';

interface SidebarProps {
  user: UserProfile;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Sidebar({ user, activeTab, setActiveTab }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'roadmap', label: 'Learning Roadmap', icon: 'map' },
    { id: 'resume', label: 'Resume Analysis', icon: 'description' },
    { id: 'skills', label: 'Skill Gap Detection', icon: 'assessment' },
    { id: 'prep', label: 'AI Interview Prep', icon: 'psychology' },
    { id: 'tracker', label: 'Job Tracker', icon: 'work_history' },
  ];

  return (
    <aside className="fixed left-0 top-0 z-40 hidden lg:flex flex-col h-screen w-80 bg-white border-r border-[#e2e8f0]/40 shadow-sm transition-all">
      {/* Brand Header */}
      <div className="p-8 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-brand-secondary flex items-center justify-center text-white shadow-lg shadow-brand-secondary/20">
          <span className="material-symbols-outlined text-[20px] !font-bold">auto_awesome</span>
        </div>
        <div>
          <span className="font-display text-2xl font-extrabold tracking-tight text-brand-primary">PrepAI Pro</span>
        </div>
      </div>

      {/* User Stats Summary */}
      <div className="px-4 mb-6">
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-brand-surface border border-brand-container/20">
          <img 
            alt="User Profile Avatar" 
            className="w-12 h-12 rounded-full border-2 border-brand-accent/20 object-cover bg-brand-accent/10" 
            src={user.avatar}
          />
          <div>
            <p className="font-sans text-sm font-semibold text-brand-on-surface">Career Readiness: {user.careerReadiness}%</p>
            <p className="text-xs text-brand-secondary font-bold flex items-center gap-1 mt-0.5">
              <span className="material-symbols-outlined text-[12px] material-symbols-fill">workspace_premium</span>
              Premium Member
            </p>
          </div>
        </div>
      </div>

      {/* Nav Menu */}
      <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-xl font-sans text-sm font-semibold transition-all duration-200 group ${
                isActive 
                  ? 'bg-brand-accent text-white shadow-md shadow-brand-accent/10 scale-[0.98]' 
                  : 'text-[#454651] hover:text-brand-on-surface hover:bg-brand-surface'
              }`}
            >
              <span className={`material-symbols-outlined ${isActive ? 'material-symbols-fill text-white' : 'text-[#767682] group-hover:text-brand-accent'}`}>
                {item.icon}
              </span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Pro Indicator Account Card */}
      <div className="p-4 mt-auto border-t border-[#e2e8f0]/40 bg-brand-surface/40">
        <div className="bg-brand-secondary/5 p-4 rounded-2xl border border-brand-secondary/10">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-secondary">Pro Account Status</span>
          <p className="font-sans text-sm text-[#454651] mt-1 font-medium">Unlimited AI feedback loops active</p>
        </div>
      </div>
    </aside>
  );
}
