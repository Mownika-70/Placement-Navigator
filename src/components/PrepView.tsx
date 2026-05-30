import React, { useState, useRef } from 'react';
import { generateInterviewFeedback } from '../aiEngine';

export default function PrepView() {
  const [topic, setTopic] = useState<string>("System Design");
  const [showSimulator, setShowSimulator] = useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] = useState<string>("");
  const [userAnswerInput, setUserAnswerInput] = useState<string>("");
  const [aiFeedback, setAiFeedback] = useState<{
    score: number;
    feedback: string;
    keyStrengths: string[];
    keyGaps: string[];
  } | null>(null);

  // Track simple carousel shift offset
  const carouselRef = useRef<HTMLDivElement>(null);

  const topicsList = [
    { id: 'ds', label: 'Data Structures', detail: 'Arrays, Trees, Heaps', challenges: '42 Challenges', icon: 'account_tree', tag: 'Data Structures' },
    { id: 'beh', label: 'Behavioral Prep', detail: 'STAR Method, Conflict', challenges: '15 Scenarios', icon: 'groups', tag: 'Behavioral' },
    { id: 'sys', label: 'System Design', detail: 'Scalability, Caching, DB', challenges: '28 Blueprints', icon: 'layers', tag: 'System Design' },
    { id: 'al', label: 'Algorithm Logic', detail: 'DP, Recursion, Sorting', challenges: '60 Problems', icon: 'code', tag: 'Algorithms' }
  ];

  const questionsList: Record<string, string[]> = {
    'System Design': [
      "In a high-scale environment with over 10M active daily users, how would you design a caching strategy to reduce database reads for user profiles, and what criteria would you use for key eviction?",
      "Explain how load balancers split traffic, and how do you handle sticky session failover across availability zones?"
    ],
    'Behavioral': [
      "Tell me about a time when you had a major architectural disagreement with a senior engineer. How did you resolve it and what was the trade-off?",
      "Describe a challenging project where you had to scope deliverables beneath tight deadlines. What did you prioritize?"
    ],
    'Algorithms': [
      "Explain the key algorithmic difference between recursive depth-first search and iterative breadth-first search regarding space complexity.",
      "Tell me how you would design a binary search algorithm to scan a massive logs list in latency under logarithmic O(log N) limits."
    ],
    'Data Structures': [
      "Explain the trade-off between using a hash table versus a binary search tree regarding worst-case retrieval speed and key sorting.",
      "How does a min-heap structure help implement a highly responsive query priority queue?"
    ]
  };

  const handleOpenSim = (topicName: string) => {
    setTopic(topicName);
    const questions = questionsList[topicName] || questionsList['System Design'];
    setCurrentQuestion(questions[Math.floor(Math.random() * questions.length)]);
    setUserAnswerInput("");
    setAiFeedback(null);
    setShowSimulator(true);
  };

  const handleSubmitAnswer = () => {
    if (!userAnswerInput.trim()) {
      alert("Please provide an answer before submitting for evaluation!");
      return;
    }
    const evaluation = generateInterviewFeedback(currentQuestion, userAnswerInput, topic);
    setAiFeedback(evaluation);
  };

  const handleAutoPopulateExpert = () => {
    if (topic === "System Design") {
      setUserAnswerInput(
        "To scale user profiles cache, I would implement Redis with a cache-aside pattern. Profile keys are eviction-capped using a Least Recently Used (LRU) policy. To prevent stampedes, I'd initialize keys with random TTL variations between 2 to 4 hours, backing the setup with a primary-replica master layout and consistent hashing."
      );
    } else if (topic === "Behavioral") {
      setUserAnswerInput(
        "When refactoring a database client, a lead wanted a full rewrite. Since time was limited, I scoped real data and showed that nesting indexes was more cost-effective. We compromised by modularizing the API layer, lowering deployment times from 4 months to 3 weeks while satisfying our immediate technical SLA limits."
      );
    } else {
      setUserAnswerInput(
        "I would implement standard state consolidation by utilizing memoization hooks like useCallback and useMemo. This keeps reference identity consistent across re-renders, protecting underlying nodes from executing unneeded computation passes unless primitive dependency properties change."
      );
    }
  };

  // Carousel slide helpers
  const slideCarousel = (direction: 'prev' | 'next') => {
    if (carouselRef.current) {
      const scrollAmt = direction === 'prev' ? -260 : 260;
      carouselRef.current.scrollBy({ left: scrollAmt, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-10 animate-fade-in relative">
      
      {/* Hero Module Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Main CTA Hero Panel */}
        <div className="lg:col-span-8 p-6 md:p-8 rounded-3xl bg-white border border-[#e2e8f0]/30 shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[300px]">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <span className="material-symbols-outlined text-[140px] select-none">terminal</span>
          </div>

          <div className="relative z-10">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="bg-[#eff4ff] text-brand-secondary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Active Mock Coach
              </span>
              <div className="flex items-center gap-1.5 text-xs text-[#ba1a1a] font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ba1a1a] active-glow" />
                Live AI Assessment Enabled
              </div>
            </div>

            <h1 className="font-display text-2xl md:text-3xl font-extrabold text-brand-primary leading-tight">
              Frontend &amp; System Design Mock Interview
            </h1>
            <p className="text-sm font-sans text-[#454651] max-w-lg mt-2 leading-relaxed">
              Your mock assessment workspace is compiled. We'll target state synchronization, memory boundaries, and CDN caching topologies today.
            </p>
          </div>

          <div className="relative z-10 flex flex-wrap gap-4 items-center mt-6">
            <button
              onClick={() => handleOpenSim("System Design")}
              className="flex items-center gap-2 px-8 py-3.5 bg-brand-secondary text-white rounded-xl font-sans text-sm font-bold shadow-lg hover:bg-brand-primary active:scale-[0.98] duration-150 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">play_arrow</span>
              Start Live AI Assessment
            </button>
            <button 
              onClick={() => alert("Mock Interview session has been rescheduled! Review your profile log dates.")}
              className="px-6 py-3.5 border border-slate-300 hover:bg-brand-surface rounded-xl font-sans text-xs font-bold text-brand-primary cursor-pointer"
            >
              Reschedule
            </button>
          </div>
        </div>

        {/* Readiness Score Panel */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-[#142175] text-white shadow-xl flex flex-col justify-center gap-6 relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
          
          <div>
            <span className="text-sky-300 text-[10px] font-sans font-extrabold uppercase tracking-widest block mb-1">READINESS SCORE</span>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-4xl font-extrabold">82%</span>
              <span className="text-xs text-sky-200 font-bold">+5% Progress</span>
            </div>
            <div className="w-full bg-white/20 h-2 rounded-full mt-3 overflow-hidden">
              <div className="bg-brand-accent h-full rounded-full" style={{ width: "82%" }} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 p-3 rounded-xl border border-white/15">
              <span className="text-[10px] text-slate-300 block font-semibold">Completed</span>
              <span className="font-display text-xl font-extrabold mt-0.5 block">12 Runs</span>
            </div>
            <div className="bg-white/10 p-3 rounded-xl border border-white/15">
              <span className="text-[10px] text-slate-300 block font-semibold">Time Spent</span>
              <span className="font-display text-xl font-extrabold mt-0.5 block">8.4 Hours</span>
            </div>
          </div>
        </div>

      </div>

      {/* Carousel of Practice Topics */}
      <section className="space-y-4">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-display text-xl font-bold text-brand-primary">Practice by Domain</h2>
            <p className="text-xs text-[#767682] mt-0.5">Click any domain to target specific mock assessments with AI evaluations</p>
          </div>
          
          {/* Slide Arrow controllers */}
          <div className="flex gap-2 shrink-0">
            <button 
              onClick={() => slideCarousel('prev')}
              className="w-10 h-10 rounded-full border border-[#e2e8f0]/60 flex items-center justify-center hover:bg-white transition-colors cursor-pointer select-none active:scale-95"
            >
              <span className="material-symbols-outlined text-[18px]">chevron_left</span>
            </button>
            <button 
              onClick={() => slideCarousel('next')}
              className="w-10 h-10 rounded-full border border-[#e2e8f0]/60 flex items-center justify-center hover:bg-white transition-colors cursor-pointer select-none active:scale-95"
            >
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </div>
        </div>

        {/* Carousel Tracks */}
        <div 
          ref={carouselRef}
          className="flex gap-6 overflow-x-auto hide-scrollbar pb-2"
        >
          {topicsList.map((top) => (
            <div
              key={top.id}
              onClick={() => handleOpenSim(top.tag)}
              className="min-w-[260px] max-w-[260px] p-5 bg-white rounded-2xl border border-[#e2e8f0]/40 shadow-sm hover:shadow-md transition-all duration-200 group cursor-pointer shrink-0"
            >
              <div className="w-11 h-11 rounded-xl bg-brand-surface flex items-center justify-center text-brand-secondary mb-4 group-hover:scale-110 group-hover:bg-brand-accent group-hover:text-white transition-all">
                <span className="material-symbols-outlined">{top.icon}</span>
              </div>
              <h3 className="font-display text-sm font-bold text-brand-primary">{top.label}</h3>
              <p className="text-[11px] text-[#767682] mt-0.5">{top.detail}</p>
              
              <div className="flex justify-between items-center mt-5 pt-3 border-t border-slate-50 text-[11px] font-bold">
                <span className="text-brand-accent">{top.challenges}</span>
                <span className="material-symbols-outlined text-slate-300 group-hover:translate-x-1 transition-transform text-sm">arrow_forward</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEEDBACK LIBRARY & HISTORY MODULE */}
      <section className="space-y-4">
        <div>
          <h2 className="font-display text-xl font-bold text-brand-primary">Feedback Library</h2>
          <p className="text-xs text-[#767682] mt-0.5">Performance analytical suggestions from your previous mock tests</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Comm Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-100 flex flex-col justify-between shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <span className="bg-[#eff4ff] text-brand-secondary text-[11px] font-extrabold px-3 py-1 rounded-full uppercase">Communication</span>
              <div className="flex items-center text-xs font-bold text-brand-secondary">
                <span className="text-base font-extrabold">4</span>/5
              </div>
            </div>
            <p className="text-xs font-medium text-[#454651] italic leading-relaxed mb-6">
              &ldquo;Excellent clarity on your STAR responses. Try to reduce filler words when explaining complex architectural decisions.&rdquo;
            </p>
            <div className="pt-4 border-t border-slate-50 flex items-center gap-3 text-xs font-bold text-slate-400">
              <div className="w-7 h-7 rounded-full bg-brand-accent/10 text-brand-accent flex items-center justify-center font-display text-[10px]">AI</div>
              <span>Session: Junior Backend Role</span>
            </div>
          </div>

          {/* Tech Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-100 flex flex-col justify-between shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <span className="bg-amber-50 text-amber-700 text-[11px] font-extrabold px-3 py-1 rounded-full uppercase">Technical</span>
              <div className="flex items-center text-xs font-bold text-[#ba1a1a]">
                <span className="text-base font-extrabold">3</span>/5
              </div>
            </div>
            <div className="mb-6">
              <span className="text-[11px] font-bold text-brand-primary block mb-1">Key Improvement Area:</span>
              <div className="p-3 bg-[#ffdad6]/30 text-[#93000a] text-xs font-medium rounded-xl leading-relaxed">
                &ldquo;Big O notation analysis was slightly off for sorting algorithms. Revisit Merge Sort space complexity.&rdquo;
              </div>
            </div>
            <div className="pt-4 border-t border-slate-50 flex justify-between items-center text-xs font-bold text-[#767682]">
              <span>2 days ago</span>
              <button onClick={() => alert("Revising SQL & Merge Sort analytical diagrams...")} className="text-brand-secondary hover:underline cursor-pointer">View Logs</button>
            </div>
          </div>

          {/* AI Coach illustration */}
          <div className="bg-gradient-to-br from-white to-[#cbd5e1]/20 p-5 rounded-2xl border border-slate-200 flex flex-col shadow-sm">
            <div className="flex items-center gap-2 mb-3 text-brand-primary">
              <span className="material-symbols-outlined text-sm">auto_awesome</span>
              <h3 className="text-xs font-sans font-extrabold uppercase tracking-wide">AI Coach Tip</h3>
            </div>
            <h4 className="font-display text-sm font-bold text-brand-primary mb-2">Confidence CADENCE</h4>
            <p className="text-xs text-[#454651] leading-relaxed mb-4">
              Microphone indexers suggest slight stress patterns under &ldquo;Weakness&rdquo; answers. Master breathing pauses.
            </p>
            <div className="mt-auto h-24 rounded-xl overflow-hidden border border-slate-100">
              <img 
                alt="Voice Waveform" 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvBlJ26s9M8UmhdlzWddk1NJa-YxU3T39Lrx525PdFCzo-zrBr2_S2_ooUIdJ3OEBIQi1l-QIREe2RfFpIc1pX1V9igJpLdXPURytPUvKcIlLnQGDJ_SUIvjPytXQuGz7a9sCtFnv_e0qbpmyQ653hKRIbiL0-AxgS8O_VLbMUqqC907-bO28EL-n9QzTR_u_s2ikVzwEmkb7kqpqVutxwkoii6LLNa9M9V2eEsX-a6skwFbQZvRGo1lhuL5yDIs8E-BnFtvVzfFk"
              />
            </div>
          </div>
        </div>
      </section>

      {/* LIVE INTERVIEW MODAL SIMULATOR */}
      {showSimulator && (
        <div className="fixed inset-0 bg-[#0b1c30]/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl p-6 md:p-8 space-y-6 shadow-2xl relative animate-scale-in max-h-[90vh] overflow-y-auto">
            
            {/* Close */}
            <button 
              onClick={() => setShowSimulator(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-brand-primary cursor-pointer"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            {/* Header info */}
            <div className="flex items-center gap-3 font-sans">
              <span className="p-2 bg-brand-surface text-brand-accent rounded-xl">
                <span className="material-symbols-outlined">psychology</span>
              </span>
              <div>
                <span className="text-[10px] text-brand-secondary font-bold uppercase tracking-wider">PREPAI live simulator</span>
                <h3 className="font-display text-xl font-extrabold text-brand-primary">{topic} Mock Interview</h3>
              </div>
            </div>

            {/* AI Interviewer prompt */}
            <div className="p-5 rounded-2xl bg-brand-surface border border-brand-container/20 space-y-2 relative">
              <div className="flex items-center gap-2 text-xs font-bold text-brand-accent">
                <span className="material-symbols-outlined text-[16px] active-glow">record_voice_over</span>
                AI Interviewer:
              </div>
              <p className="text-sm text-brand-primary font-bold leading-relaxed pr-8">
                &ldquo;{currentQuestion}&rdquo;
              </p>
            </div>

            {/* Answer Text field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-semibold">
                <label className="text-[#454651]">Type your answer here (Min 15 chars for AI scoring):</label>
                <div className="flex gap-2">
                  <button 
                    onClick={handleAutoPopulateExpert}
                    className="text-brand-accent hover:underline text-xs font-bold cursor-pointer"
                  >
                    Draft Expert Answer
                  </button>
                </div>
              </div>
              <textarea
                value={userAnswerInput}
                onChange={(e) => setUserAnswerInput(e.target.value)}
                placeholder="Structure your answer following the STAR framework: Situation, Task, Action, Measurable Result..."
                rows={4}
                className="w-full p-4 bg-brand-surface rounded-2xl border border-[#e2e8f0] focus:ring-2 focus:ring-brand-accent font-sans text-sm focus:outline-none"
              />
            </div>

            {/* Evaluation Response from Engine */}
            {aiFeedback && (
              <div className="p-5 rounded-2xl bg-[#eff4ff] border border-brand-accent/20 space-y-4 animate-fade-in">
                <div className="flex justify-between items-center pb-2 border-b border-brand-accent/10">
                  <span className="text-xs font-bold text-brand-secondary uppercase tracking-widest flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">stars</span>
                    AI Analytical Score
                  </span>
                  <div className="px-3 py-1 bg-brand-accent text-white rounded-full text-xs font-extrabold">
                    {aiFeedback.score} / 5 Score
                  </div>
                </div>

                <p className="text-xs font-medium text-brand-primary leading-relaxed">
                  {aiFeedback.feedback}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold pt-1">
                  <div>
                    <span className="text-emerald-600 block mb-1">✓ Technical Strengths</span>
                    <ul className="list-disc leading-relaxed pl-4 space-y-1 text-emerald-800">
                      {aiFeedback.keyStrengths.map((str, i) => (
                        <li key={i}>{str}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <span className="text-[#ba1a1a] block mb-1">⚠ Recommended Enhancements</span>
                    <ul className="list-disc leading-relaxed pl-4 space-y-1 text-red-800">
                      {aiFeedback.keyGaps.map((gp, i) => (
                        <li key={i}>{gp}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Controls */}
            <div className="flex justify-between items-center pt-4 border-t border-slate-100 flex-wrap gap-3">
              <button
                onClick={() => {
                  const questions = questionsList[topic] || questionsList['System Design'];
                  setCurrentQuestion(questions[Math.floor(Math.random() * questions.length)]);
                  setUserAnswerInput("");
                  setAiFeedback(null);
                }}
                className="px-4 py-2 hover:bg-slate-50 text-[#767682] hover:text-brand-primary text-xs font-bold rounded-xl cursor-pointer"
              >
                Change Question
              </button>
              
              <div className="flex gap-2">
                <button
                  onClick={() => setShowSimulator(false)}
                  className="px-5 py-2.5 hover:bg-[#e2e8f0]/40 text-[#767682] text-xs font-bold rounded-xl cursor-pointer"
                >
                  Exit Simulator
                </button>
                <button
                  onClick={handleSubmitAnswer}
                  className="px-6 py-2.5 bg-brand-secondary text-white font-bold text-xs rounded-xl hover:bg-brand-primary shadow-sm active:scale-95 transition-transform cursor-pointer"
                >
                  Submit for Evaluation
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
