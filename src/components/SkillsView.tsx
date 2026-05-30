import React, { useState } from 'react';
import { SkillGap } from '../types';

interface SkillsViewProps {
  onSuggestRoadmap?: () => void;
  setActiveTab: (tab: string) => void;
}

export default function SkillsView({ onSuggestRoadmap, setActiveTab }: SkillsViewProps) {
  // Track acquired skills state
  const [missingSkills, setMissingSkills] = useState<string[]>([
    "Redis Caching",
    "Kafka/RabbitMQ",
    "Docker Swarm",
    "CI/CD Pipelines",
    "GraphQL",
    "Terraform"
  ]);

  const [acquiredSkills, setAcquiredSkills] = useState<string[]>([]);
  const [systemDesignMatch, setSystemDesignMatch] = useState<number>(45);
  const [reactArchitectureMatch, setReactArchitectureMatch] = useState<number>(60);

  // Mark competency as acquired simulation
  const handleAcquireSkill = (skill: string) => {
    setMissingSkills((prev) => prev.filter((s) => s !== skill));
    setAcquiredSkills((prev) => [...prev, skill]);

    // Increase match metrics dynamically depending on the skill
    if (["Redis Caching", "Kafka/RabbitMQ", "GraphQL"].includes(skill)) {
      setSystemDesignMatch((prev) => Math.min(prev + 12, 100));
    } else {
      setReactArchitectureMatch((prev) => Math.min(prev + 15, 100));
    }

    alert(`Dynamic skill sync: Added "${skill}" to your professional stack! Updating competence polygons.`);
  };

  const handleResetSkills = () => {
    setMissingSkills([
      "Redis Caching",
      "Kafka/RabbitMQ",
      "Docker Swarm",
      "CI/CD Pipelines",
      "GraphQL",
      "Terraform"
    ]);
    setAcquiredSkills([]);
    setSystemDesignMatch(45);
    setReactArchitectureMatch(60);
  };

  // Coordinates for radar chart polygons dynamically generated depending on skill matches
  // Center is at 200, 150.
  // Axis 1: System Design (Up: x=200, y increases/decreases. Max height y=30, center y=150. Radius up to 120)
  // Axis 2: Backend (Right: y=150, x increases. Max width x=320, center x=200. Radius up to 120)
  // Axis 3: Frontend (React) (Down: x=200, y increases. Max height y=270, center y=150. Radius up to 120)
  // Axis 4: Problem Solving (Left: y=150, x decreases. Max width x=80, center x=200. Radius up to 120)
  const systemDesignRadius = (systemDesignMatch / 100) * 120;
  const backendRadius = 0.8 * 120; // Static strong skill
  const frontendRadius = (reactArchitectureMatch / 100) * 120;
  const problemSolvingRadius = 0.75 * 120; // Static strong skill

  const userPoints = [
    `200,${150 - systemDesignRadius}`, // Top
    `${200 + backendRadius},150`,       // Right
    `200,${150 + frontendRadius}`,      // Bottom
    `${200 - problemSolvingRadius},150` // Left
  ].join(" ");

  // Target Role static shape points (100% outer bounds basically)
  const targetPoints = "200,30 320,150 200,270 80,150";

  return (
    <div className="space-y-10 animate-fade-in">
      {/* Hero Header */}
      <section className="mb-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-xs font-sans font-bold text-brand-secondary uppercase tracking-widest bg-brand-secondary/5 px-3 py-1 rounded-full">
              SaaS Skill Matching Index
            </span>
            <h1 className="text-3xl md:text-4xl font-display font-extrabold text-[#142175] mt-2">
              Staff Software Engineer
            </h1>
            <p className="text-base text-[#454651] max-w-2xl mt-1">
              We've compared your verified resume profile against target requirements for Lead & Senior-level engineering roles. Here is your gap map:
            </p>
          </div>
          <button 
            onClick={() => setActiveTab('roadmap')}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-brand-accent text-white rounded-xl font-sans text-xs font-bold hover:brightness-110 shadow-md active:scale-95 duration-100 cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">bolt</span>
            Bridge Gaps on Roadmap
          </button>
        </div>
      </section>

      {/* Main Analysis Bento Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Radar Chart Visual */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-[#e2e8f0]/40 p-6 flex flex-col justify-between shadow-[0px_4px_20px_rgba(46,58,140,0.05)] min-h-[400px]">
          <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
            <div>
              <h3 className="font-display text-lg font-bold text-brand-primary">Core Skill Analysis</h3>
              <p className="text-xs text-[#767682]">Interactive vector map showing your skills vs staff targets</p>
            </div>
            
            <div className="flex gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-brand-primary" />
                <span className="font-semibold text-[#454651]">Your Skills</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#cbd5e1]" />
                <span className="font-semibold text-[#454651]">Target Role</span>
              </div>
            </div>
          </div>

          {/* SVG representation of the Radar Graph */}
          <div className="relative flex-1 flex items-center justify-center min-h-[300px]">
            <svg className="w-full max-w-[400px] h-full max-h-[300px]" viewBox="0 0 400 300">
              {/* Radar Grid Circles */}
              <circle cx="200" cy="150" r="120" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4" fill="none" className="opacity-40" />
              <circle cx="200" cy="150" r="80" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4" fill="none" className="opacity-40" />
              <circle cx="200" cy="150" r="40" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4" fill="none" className="opacity-40" />
              
              {/* Target Outline Shape (Gray) */}
              <polygon points={targetPoints} stroke="#cbd5e1" strokeWidth="1.5" fill="rgba(203, 213, 225, 0.2)" />
              
              {/* User Dynamic Outline Shape (Electric Blue) */}
              <polygon points={userPoints} stroke="#142175" strokeWidth="3" fill="rgba(20, 33, 117, 0.12)" className="transition-all duration-500" />
              
              {/* Variable Coordinates Labels */}
              <text x="200" y="22" textAnchor="middle" className="text-[10px] font-sans font-bold fill-brand-primary">System Design ({systemDesignMatch}%)</text>
              <text x="340" y="153" textAnchor="start" className="text-[10px] font-sans font-bold fill-[#454651]">Backend</text>
              <text x="200" y="286" textAnchor="middle" className="text-[10px] font-sans font-bold fill-[#454651]">React ({reactArchitectureMatch}%)</text>
              <text x="50" y="153" textAnchor="end" className="text-[10px] font-sans font-bold fill-[#454651]">Logic</text>
            </svg>

            {/* Gap Detected Alert Floating Badge */}
            {systemDesignMatch < 75 && (
              <div className="absolute top-4 right-4 bg-[#ffdad6] text-[#ba1a1a] p-3 rounded-xl border border-red-200/50 flex items-center gap-1.5 text-xs font-bold leading-none animate-bounce">
                <span className="material-symbols-outlined text-[16px] material-symbols-fill text-amber-600">warning</span>
                Gap Detected: System Design
              </div>
            )}
          </div>
        </div>

        {/* Priority Gaps Details List */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-6">
          <div className="bg-gradient-to-br from-white to-[#eff4ff] rounded-3xl border border-[#e2e8f0]/40 p-6 shadow-sm flex-1 space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-brand-accent">psychology_alt</span>
              <h3 className="font-display text-lg font-bold text-brand-primary">Priority Deficits</h3>
            </div>

            <div className="space-y-4">
              {/* Deficit item 1 */}
              <div className="p-4 bg-white rounded-2xl border-l-4 border-[#ba1a1a] shadow-sm space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-brand-primary">System Design Requirements</span>
                  <span className="text-[#ba1a1a]">-{100 - systemDesignMatch}% Deficit</span>
                </div>
                <div className="w-full bg-[#eff4ff] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#ba1a1a] h-full rounded-full transition-all duration-500" style={{ width: `${systemDesignMatch}%` }} />
                </div>
                <p className="text-[11.5px] text-[#454651]">
                  Master load balancers, caching partitions (Redis), and message routing indices.
                </p>
              </div>

              {/* Deficit item 2 */}
              <div className="p-4 bg-white rounded-2xl border-l-4 border-amber-500 shadow-sm space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-brand-primary">React Advanced Architecture</span>
                  <span className="text-amber-600">-{100 - reactArchitectureMatch}% Deficit</span>
                </div>
                <div className="w-full bg-[#eff4ff] h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full transition-all duration-500" style={{ width: `${reactArchitectureMatch}%` }} />
                </div>
                <p className="text-[11.5px] text-[#454651]">
                  Review server-side component streaming actions and custom state memory memo-hooks.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Skills Categories and chips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
        
        {/* Missing stacks chips lists */}
        <div className="bg-white rounded-3xl border border-[#e2e8f0]/40 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-50">
            <h3 className="text-xs font-sans font-extrabold text-brand-primary uppercase tracking-wider">
              Missing Competencies
            </h3>
            {acquiredSkills.length > 0 && (
              <button 
                onClick={handleResetSkills}
                className="text-xs text-[#767682] hover:text-brand-primary font-bold transition-colors cursor-pointer"
              >
                Reset Default
              </button>
            )}
          </div>
          <p className="text-xs text-[#454651] mb-4">Click any missing tech parameter chip to simulate learning it and expanding your radar polygon!</p>
          
          <div className="flex flex-wrap gap-2.5">
            {missingSkills.length === 0 ? (
              <p className="text-sm text-[#767682] italic">None! You have acquired all missing competencies listed.</p>
            ) : (
              missingSkills.map((skill) => (
                <button
                  key={skill}
                  onClick={() => handleAcquireSkill(skill)}
                  className="px-4 py-2 bg-[#ffdad6] text-[#93000a] text-xs font-bold rounded-full flex items-center gap-1.5 hover:bg-red-200 transition-colors cursor-pointer select-none border border-red-200/50"
                >
                  <span className="material-symbols-outlined text-[13px] !font-bold">close</span>
                  {skill}
                </button>
              ))
            )}
          </div>
        </div>

        {/* Soft Skills chip guidelines */}
        <div className="bg-white rounded-3xl border border-[#e2e8f0]/40 p-6 shadow-sm">
          <h3 className="text-xs font-sans font-extrabold text-brand-primary uppercase tracking-wider mb-4 pb-2 border-b border-slate-50">
            Soft Skill Refinements
          </h3>
          <p className="text-xs text-[#454651] mb-4">Leadership standards verified under current mock behavioral responses:</p>
          
          <div className="flex flex-wrap gap-2.5">
            <span className="px-4 py-2 bg-[#dbe2fa] text-[#141b2c] text-xs font-bold rounded-full flex items-center gap-1.5 border border-[#e2e8f0]/50">
              <span className="material-symbols-outlined text-[13px] material-symbols-fill">record_voice_over</span>
              Tech Leadership
            </span>
            <span className="px-4 py-2 bg-[#dbe2fa] text-[#141b2c] text-xs font-bold rounded-full flex items-center gap-1.5 border border-[#e2e8f0]/50">
              <span className="material-symbols-outlined text-[13px] material-symbols-fill">groups</span>
              Stakeholder Mgmt
            </span>
            <span className="px-4 py-2 bg-[#dbe2fa] text-[#141b2c] text-xs font-bold rounded-full flex items-center gap-1.5 border border-[#e2e8f0]/50">
              <span className="material-symbols-outlined text-[13px] material-symbols-fill">edit_note</span>
              RFC Writing
            </span>
            <span className="px-4 py-2 bg-[#dbe2fa] text-[#141b2c] text-xs font-bold rounded-full flex items-center gap-1.5 border border-[#e2e8f0]/50">
              <span className="material-symbols-outlined text-[13px] material-symbols-fill">lightbulb</span>
              Strategic Thinking
            </span>
          </div>

          {acquiredSkills.length > 0 && (
            <div className="mt-6 pt-4 border-t border-slate-100/60">
              <span className="text-xs font-extrabold text-emerald-600 block mb-2">Acquired Tech Modules:</span>
              <div className="flex flex-wrap gap-2">
                {acquiredSkills.map((s) => (
                  <span key={s} className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold rounded-full flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px] material-symbols-fill">check_circle</span>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>

      {/* BOTTOM ACTION CTA BANNER */}
      <section className="bg-gradient-to-r from-brand-primary to-brand-secondary text-white rounded-3xl p-8 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative z-10 max-w-xl text-center md:text-left space-y-2">
          <div className="flex items-center gap-2 justify-center md:justify-start text-[#cbdbf5]">
            <span className="material-symbols-outlined text-sm">auto_awesome</span>
            <span className="text-[10px] font-sans font-extrabold uppercase tracking-widest text-[#cbdbf5]">AI Roadmap Generator</span>
          </div>
          <h2 className="text-xl md:text-2xl font-display font-black">Turn your gaps into your strengths.</h2>
          <p className="text-xs text-white/70 leading-relaxed">
            We have generated a personalized 4-week fast-track layout focusing strictly on dynamic load routing and progressive caching configurations.
          </p>
        </div>

        <div className="relative z-10 flex flex-wrap gap-3 shrink-0">
          <button 
            onClick={() => setActiveTab('roadmap')}
            className="px-6 py-3 bg-white text-brand-primary text-xs font-extrabold rounded-xl hover:bg-slate-50 cursor-pointer active:scale-95 transition-transform"
          >
            Launch Program Roadmap
          </button>
          <button 
            onClick={() => alert("Resume Skill Gap Analysis PDF has been prepared and starting offline download!")}
            className="px-6 py-3 border border-white/20 text-white hover:bg-white/10 text-xs font-extrabold rounded-xl cursor-pointer"
          >
            Download Analysis PDF
          </button>
        </div>
      </section>
    </div>
  );
}
