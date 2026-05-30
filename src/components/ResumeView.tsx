import React, { useState } from 'react';
import { generateResumeAnalysis } from '../aiEngine';

export default function ResumeView() {
  const [atsScore, setAtsScore] = useState<number>(85);
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanningProgress, setScanningProgress] = useState<number>(0);
  const [solvedGaps, setSolvedGaps] = useState<string[]>([]);
  const [showGuideModal, setShowGuideModal] = useState<boolean>(false);

  // List of initial missing keywords
  const initialGaps = [
    { name: 'Cloud Computing', code: 'aws / azure' },
    { name: 'Docker', code: 'containerization' },
    { name: 'CI/CD Pipelines', code: 'github actions' }
  ];

  const currentGaps = initialGaps.filter(g => !solvedGaps.includes(g.name));

  // Handle Drag & Drop events
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // Safe scanner update simulation
  const simulateScan = (filename: string) => {
    setIsScanning(true);
    setScanningProgress(0);
    
    const interval = setInterval(() => {
      setScanningProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsScanning(false);
            // Dynamic generate score shift with mock filename
            const resultScore = generateResumeAnalysis(filename);
            setAtsScore(resultScore.score);
            setSolvedGaps([]);
            alert(`Resume Scan complete! File "${filename}" was successfully matched. ATS Score evaluated at ${resultScore.score}/100.`);
          }, 300);
          return 100;
        }
        return prev + 10;
      });
    }, 120);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      simulateScan(e.dataTransfer.files[0].name);
    }
  };

  const handleManualUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      simulateScan(e.target.files[0].name);
    }
  };

  // Solve dynamic keyword gap
  const solveKeyword = (keyword: string) => {
    if (!solvedGaps.includes(keyword)) {
      setSolvedGaps([...solvedGaps, keyword]);
      setAtsScore((prev) => Math.min(prev + 4, 100));
      alert(`Awesome! You marked "${keyword}" as added to your resume. Score increased!`);
    }
  };

  // Calculations for custom SVG radial ring
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (atsScore / 100) * circumference;

  return (
    <div className="space-y-10 animate-fade-in">
      {/* Header Section */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-xs font-sans font-bold text-brand-secondary uppercase tracking-widest bg-brand-secondary/5 px-3 py-1 rounded-full">
            Parser Optimization Console
          </span>
          <h2 className="font-display text-4xl font-extrabold text-[#0b1c30] mt-3 tracking-tight">
            Resume Scanned Analysis
          </h2>
          <p className="text-base font-sans text-brand-on-surface-variant mt-1">
            We've analyzed your resume formatting and content indexing against current fintech and software engineering standards.
          </p>
        </div>
        
        {/* Upload Button Triggers browse */}
        <div className="relative shrink-0">
          <input 
            type="file" 
            id="manual-res-upload" 
            className="hidden" 
            accept=".pdf,.doc,.docx,.txt"
            onChange={handleManualUpload}
          />
          <label 
            htmlFor="manual-res-upload"
            className="flex items-center justify-center gap-2 px-6 py-3.5 bg-brand-secondary text-white rounded-xl font-sans text-sm font-bold shadow-md hover:bg-brand-primary active:scale-[0.98] transition-all cursor-pointer select-none"
          >
            <span className="material-symbols-outlined text-[18px]">upload</span>
            Upload New Resume
          </label>
        </div>
      </section>

      {/* DRAG AND DROP / CAROUSEL SCANNER */}
      {isScanning ? (
        <div className="p-8 rounded-3xl bg-brand-surface border border-brand-accent/30 text-center space-y-4 shadow-sm animate-pulse">
          <span className="material-symbols-outlined text-[48px] text-brand-accent active-glow">document_scanner</span>
          <h3 className="font-display text-lg font-bold text-brand-primary">AI Node Parsing in progress...</h3>
          <div className="max-w-md mx-auto bg-slate-100 h-2.5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-brand-accent rounded-full transition-all duration-150" 
              style={{ width: `${scanningProgress}%` }}
            />
          </div>
          <p className="text-xs text-[#767682] font-semibold">Reading keyword indices & alignment parameters: {scanningProgress}%</p>
        </div>
      ) : (
        <div 
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          className={`p-6 rounded-3xl border-2 border-dashed text-center transition-all ${
            dragActive 
              ? 'border-brand-accent bg-brand-accent/5' 
              : 'border-slate-200 hover:border-brand-secondary bg-brand-surface/40'
          }`}
        >
          <span className="material-symbols-outlined text-slate-400 text-[36px]">cloud_upload</span>
          <p className="text-sm font-bold text-brand-primary mt-2">Drag and drop your updated PDF/TXT file here to re-scan</p>
          <p className="text-xs text-[#767682] mt-1">Accepts standard PDF, DOCX, TXT formats up to 4MB</p>
        </div>
      )}

      {/* Bento Grid Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* ATS Score Card */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-[#e2e8f0]/40 p-6 shadow-[0px_4px_20px_rgba(46,58,140,0.05)] flex flex-col items-center justify-center text-center relative group">
          <div className="absolute top-6 right-6">
            <span className="material-symbols-outlined text-slate-400 text-[18px]">info</span>
          </div>
          <span className="text-xs font-bold text-[#767682] uppercase tracking-wider mb-6">Overall ATS Score</span>
          
          <div className="relative w-40 h-40 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle 
                className="text-brand-surface" 
                cx="80" 
                cy="80" 
                fill="none" 
                r={radius} 
                stroke="currentColor" 
                strokeWidth="11" 
              />
              <circle 
                className="text-brand-secondary transition-all duration-700" 
                cx="80" 
                cy="80" 
                fill="none" 
                r={radius} 
                stroke="currentColor" 
                strokeDasharray={circumference} 
                strokeDashoffset={strokeDashoffset} 
                strokeLinecap="round" 
                strokeWidth="11" 
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-display text-4xl font-extrabold text-brand-primary">{atsScore}</span>
              <span className="text-[10px] text-slate-400 font-extrabold uppercase mt-0.5">/ 100</span>
            </div>
          </div>
          
          <p className="mt-6 text-sm text-[#454651] max-w-xs font-medium">
            Great job! Your resume score places you in the <span className="text-brand-secondary font-black">top 15%</span> of design and engineering applicants in your area.
          </p>
        </div>

        {/* Strengths & Gaps double list */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Strengths */}
          <div className="bg-white rounded-3xl border border-[#e2e8f0]/40 p-6 shadow-[0px_4px_20px_rgba(46,58,140,0.05)] space-y-4">
            <div className="flex items-center gap-2 text-brand-primary pb-2 border-b border-slate-50">
              <span className="material-symbols-outlined text-emerald-500 text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              <h3 className="font-display text-base font-extrabold">Key Strengths Detected</h3>
            </div>
            
            <ul className="space-y-4 list-none pl-0">
              <li className="p-3.5 bg-brand-surface rounded-2xl flex items-start gap-3">
                <span className="material-symbols-outlined text-emerald-500 text-sm mt-0.5">check</span>
                <div>
                  <p className="text-xs font-bold text-brand-primary">Document Formatting</p>
                  <p className="text-[11.5px] text-[#767682] mt-0.5 font-medium">Clean single-column standard. Zero parsing errors detected.</p>
                </div>
              </li>
              <li className="p-3.5 bg-brand-surface rounded-2xl flex items-start gap-3">
                <span className="material-symbols-outlined text-emerald-500 text-sm mt-0.5">check</span>
                <div>
                  <p className="text-xs font-bold text-brand-primary">Quantitative Impact</p>
                  <p className="text-[11.5px] text-[#767682] mt-0.5 font-medium">Excellent usage of explicit ratio figures and metrics under role history logs.</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Gaps */}
          <div className="bg-white rounded-3xl border border-[#e2e8f0]/40 p-6 shadow-[0px_4px_20px_rgba(46,58,140,0.05)] space-y-4">
            <div className="flex items-center gap-2 text-[#ba1a1a] pb-2 border-b border-slate-50">
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
              <h3 className="font-display text-base font-extrabold text-brand-primary">Critical Keywords Missing</h3>
            </div>
            <p className="text-xs text-[#454651] font-semibold">Missing High-Impact Industry Keywords:</p>
            
            <div className="flex flex-wrap gap-2 pt-1">
              {currentGaps.length === 0 ? (
                <div className="w-full text-center py-6">
                  <span className="material-symbols-outlined text-emerald-600 block text-2xl">verified</span>
                  <p className="text-xs text-brand-secondary font-bold mt-1">All keyword gaps successfully closed!</p>
                </div>
              ) : (
                currentGaps.map((gap) => (
                  <button
                    key={gap.name}
                    onClick={() => solveKeyword(gap.name)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#ffdad6] text-[#93000a] text-xs font-bold rounded-full hover:bg-red-200 transition-colors cursor-pointer group select-none active:scale-95"
                  >
                    <span>'{gap.name}'</span>
                    <span className="material-symbols-outlined text-[13px] group-hover:rotate-45 transition-transform !font-bold">add</span>
                  </button>
                ))
              )}
            </div>

            <p className="text-[10px] text-slate-400 font-medium italic mt-4 pt-4 border-t border-slate-50">
              * Calculated using analysis thresholds index mapping similar descriptions.
            </p>
          </div>

        </div>

      </div>

      {/* AI SUGGESTIONS SECTION */}
      <div className="bg-gradient-to-br from-white to-[#cbd5e1]/30 rounded-3xl border border-[#e2e8f0]/40 p-6 md:p-8 shadow-sm space-y-6 relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-brand-accent/5 rounded-full blur-2xl" />
        
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#2e3a8c] text-white flex items-center justify-center rounded-2xl shadow-sm">
            <span className="material-symbols-outlined material-symbols-fill">auto_awesome</span>
          </div>
          <div>
            <h3 className="font-display text-xl font-extrabold text-[#142175]">AI Recasting Suggestions</h3>
            <p className="text-xs text-[#454651] font-medium">Personalized structural advice to immediately raise interview callback rates.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          
          <div className="flex gap-4 items-start">
            <div className="w-8 h-8 rounded-full bg-brand-accent text-white flex items-center justify-center shrink-0 text-xs font-bold">1</div>
            <div>
              <p className="text-sm font-bold text-brand-primary mb-1">Highlight Orchestration Skills</p>
              <p className="text-xs text-[#454651] leading-relaxed">
                Add standard docker-compose metrics. Mention containerization workloads deployed beneath staging networks.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="w-8 h-8 rounded-full bg-brand-accent text-white flex items-center justify-center shrink-0 text-xs font-bold">2</div>
            <div>
              <p className="text-sm font-bold text-brand-primary mb-1">Use Metric-Driven Bullet Items</p>
              <p className="text-xs text-[#454651] leading-relaxed">
                Detail page rendering stats under previous architecture roles: restructure &ldquo;Improved web indexer latency&rdquo; into &ldquo;Decreased load-time indices by 42%&rdquo;.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="w-8 h-8 rounded-full bg-brand-accent text-white flex items-center justify-center shrink-0 text-xs font-bold">3</div>
            <div>
              <p className="text-sm font-bold text-brand-primary mb-1">Professional Summary Pivot</p>
              <p className="text-xs text-[#454651] leading-relaxed">
                Lead with target industry preferences. Define your background as &ldquo;Full-Stack Architect with remote SaaS telemetry experience&rdquo; directly in opening parameters.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="w-8 h-8 rounded-full bg-brand-accent text-white flex items-center justify-center shrink-0 text-xs font-bold">4</div>
            <div>
              <p className="text-sm font-bold text-brand-primary mb-1">Clean Categorization Maps</p>
              <p className="text-xs text-[#454651] leading-relaxed">
                Classify software stacks cleanly: keep query indices under 'Databases' and node files split under 'Infrastructure & Deployments'.
              </p>
            </div>
          </div>

        </div>

        {/* View detailed guide button */}
        <div className="pt-6 border-t border-slate-100 flex justify-center">
          <button 
            onClick={() => setShowGuideModal(true)}
            className="flex items-center gap-1.5 text-brand-secondary font-bold text-xs hover:gap-2.5 transition-all cursor-pointer select-none"
          >
            Consult Comprehensive AI Resume Guide
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* DETAILED GUIDE MODAL */}
      {showGuideModal && (
        <div className="fixed inset-0 bg-[#0b1c30]/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-xl w-full text-[#454651] space-y-6 max-h-[85vh] overflow-y-auto shadow-2xl relative animate-scale-in">
            <button 
              onClick={() => setShowGuideModal(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-brand-primary cursor-pointer"
            >
              <span className="material-symbols-outlined flex">close</span>
            </button>

            <div className="flex items-center gap-4">
              <span className="p-3 bg-brand-surface text-brand-accent rounded-xl">
                <span className="material-symbols-outlined">menu_book</span>
              </span>
              <div>
                <span className="text-[10px] text-brand-accent font-bold uppercase tracking-wider">PREPAI LEARNING HANDBOOK</span>
                <h3 className="font-display text-2xl font-bold text-brand-primary">Comprehensive ATS Playbook</h3>
              </div>
            </div>

            <p className="text-xs leading-relaxed">
              To guarantee your document sails past automated parsing engines and secures maximum callback frequencies for senior fintech or remote environments:
            </p>

            <div className="space-y-4 text-xs font-medium">
              <div className="p-4 bg-brand-surface rounded-2xl border border-slate-100/60">
                <span className="font-extrabold text-brand-primary block mb-1">1. Keep Formatting Single Column</span>
                Avoid parallel sidebar segments, visual chart dials, or inline images, which break simple text parsers.
              </div>

              <div className="p-4 bg-brand-surface rounded-2xl border border-slate-100/60">
                <span className="font-extrabold text-brand-primary block mb-1">2. Use Standard Chronological History</span>
                Structure roles starting from most recent, mapping dates accurately. Standardize headlines using 'Experience' or 'Education'.
              </div>

              <div className="p-4 bg-brand-surface rounded-2xl border border-slate-100/60">
                <span className="font-extrabold text-brand-primary block mb-1">3. Maximize Contextually Related Keywords</span>
                Integrate target parameters (like 'Load Balancing', 'Microservices', 'GraphQL') directly into action sentences rather than standalone lists.
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <button
                onClick={() => setShowGuideModal(false)}
                className="px-5 py-2.5 bg-[#cbdbf5]/50 text-brand-primary font-bold text-xs rounded-xl cursor-pointer"
              >
                Dismiss Handbook
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
