import React from 'react';
import { UserProfile } from '../types';

interface HeaderProps {
  user: UserProfile;
  toggleNavDrawer?: () => void;
  setActiveTab: (tab: string) => void;
}

export default function Header({ user, toggleNavDrawer, setActiveTab }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 w-full z-50 flex lg:hidden justify-between items-center px-6 h-16 bg-white border-b border-[#e2e8f0]/40 shadow-sm">
      <div className="flex items-center gap-3">
        <button 
          onClick={toggleNavDrawer}
          className="hover:bg-brand-surface rounded-full p-2 text-brand-secondary cursor-pointer transition-colors"
        >
          <span className="material-symbols-outlined text-2xl">menu</span>
        </button>
        <button 
          onClick={() => setActiveTab('dashboard')} 
          className="font-display text-xl font-extrabold text-brand-secondary tracking-tight cursor-pointer"
        >
          PrepAI
        </button>
      </div>

      <div className="flex items-center gap-3">
        <span className="hidden sm:inline-block text-xs font-bold text-brand-secondary uppercase tracking-wider bg-brand-secondary/10 px-3 py-1 rounded-full">
          Pro Member
        </span>
        <button 
          onClick={() => setActiveTab('profile')}
          className="w-9 h-9 rounded-full border-2 border-brand-accent/20 overflow-hidden cursor-pointer active:scale-95 transition-transform"
        >
          <img 
            alt="User Avatar" 
            className="w-full h-full object-cover" 
            src={user.avatar}
          />
        </button>
      </div>
    </header>
  );
}
