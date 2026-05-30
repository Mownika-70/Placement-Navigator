import React from 'react';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function BottomNav({ activeTab, setActiveTab }: BottomNavProps) {
  const tabs = [
    { id: 'dashboard', label: 'Home', icon: 'home' },
    { id: 'roadmap', label: 'Roadmap', icon: 'route' },
    { id: 'prep', label: 'Prep', icon: 'psychology_alt' },
    { id: 'tracker', label: 'Tracker', icon: 'list_alt' },
    { id: 'profile', label: 'Profile', icon: 'person' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex lg:hidden justify-around items-center px-2 py-3.5 bg-white border-t border-[#e2e8f0]/40 shadow-[0px_-4px_20px_rgba(46,58,140,0.05)] rounded-t-2xl">
      {tabs.map((tab) => {
        // Handle variations of sub-tabs mapping (tracker or dashboard)
        const isCurrent = activeTab === tab.id;
        
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center justify-center transition-all ${
              isCurrent 
                ? 'bg-brand-secondary/10 text-brand-secondary rounded-2xl px-5 py-1.5 font-bold scale-[0.96] shadow-sm'
                : 'text-[#767682] hover:text-brand-secondary px-3 py-1.5'
            }`}
          >
            <span className={`material-symbols-outlined text-[22px] ${isCurrent ? 'material-symbols-fill' : ''}`}>
              {tab.icon}
            </span>
            <span className="text-[10px] font-sans font-bold tracking-wide mt-1">
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
