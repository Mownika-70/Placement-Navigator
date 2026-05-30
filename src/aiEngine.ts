/**
 * Client-side mock AI intelligence engine for PrepAI.
 * Generates custom, robust contextual feedback on resume revisions,
 * custom mock interview answers, and skill level increases.
 */

export function generateInterviewFeedback(
  question: string, 
  userAnswer: string,
  topic: string
): { score: number; feedback: string; keyStrengths: string[]; keyGaps: string[] } {
  const ansL = userAnswer.trim().toLowerCase();
  
  if (ansL.length < 15) {
    return {
      score: 2,
      feedback: "Your answer appears too brief. To structure high-impact answers, strive for the STAR method: describe a specific Situation, Task, Action, and Measurable Result.",
      keyStrengths: ["Fast response time"],
      keyGaps: ["Missing specific technical details", "Lacks metric-driven results", "Omitted key design choices"]
    };
  }

  // Generate context-aware suggestions
  let score = 4;
  const keyStrengths: string[] = ["Structured delivery", "Adept domain terminology"];
  const keyGaps: string[] = [];

  if (topic === "System Design") {
    if (ansL.includes("scale") || ansL.includes("load") || ansL.includes("distribute") || ansL.includes("cache")) {
      score = 5;
      keyStrengths.push("Good grasp of scaling systems & data caching");
    } else {
      score = 3;
      keyGaps.push("Incorporate load balancing mechanisms or custom CDN layers");
    }
    
    if (!ansL.includes("database") && !ansL.includes("db") && !ansL.includes("sql")) {
      keyGaps.push("Clarify persistent data schemas & storage topology");
    }
  } else if (topic === "Behavioral") {
    if (ansL.includes("i") && (ansL.includes("team") || ansL.includes("collaborate") || ansL.includes("resolve"))) {
      score = 5;
      keyStrengths.push("Strong evidence of collaborative problem solving");
    } else {
      score = 3.5;
      keyGaps.push("Elaborate on the conflict resolution mechanism used with stakeholders");
    }
  } else {
    // Frontend / algorithms
    if (ansL.includes("state") || ansL.includes("render") || ansL.includes("effect") || ansL.includes("hook")) {
      score = 5;
      keyStrengths.push("Accurate usage of hooks and component lifecycle hooks");
    } else {
      score = 3;
      keyGaps.push("Explain complex state management strategies or memoization (useMemo/useCallback)");
    }
  }

  const feedbackTemplates = [
    `Impressive demonstration of core skills in ${topic}. Your phrasing reflects excellent senior-level awareness, especially your emphasis on architectural patterns. Consider refining details around high-scale query volumes.`,
    `Good baseline answer. You cleanly explained how elements connect. For a stronger impact, quantify your achievements (e.g., 'reduced load times by 30%'), which immediately attracts top tech recruiters.`,
    `Strong technical vocabulary! Your explanation of code parameters is very clear. To achieve further mastery, review edge case validation scenarios and robust fallback boundaries.`
  ];

  const feedback = feedbackTemplates[Math.floor(Math.random() * feedbackTemplates.length)];

  return {
    score,
    feedback,
    keyStrengths,
    keyGaps: keyGaps.length > 0 ? keyGaps : ["Detailing operational limits or microservices edge cases"]
  };
}

export function generateResumeAnalysis(resumeText: string): {
  score: number;
  formatting: string;
  missingKeywords: string[];
  suggestions: string[];
} {
  const textL = resumeText.toLowerCase();
  let score = 78;
  const missingKeywords: string[] = [];
  const suggestions: string[] = [];

  if (!textL.includes("aws") && !textL.includes("cloud") && !textL.includes("azure")) {
    missingKeywords.push("Cloud Computing (AWS/GCP)");
    suggestions.push("Express cloud experience: Frame your work with scalable container nodes or cloud-hosted databases.");
    score -= 4;
  }
  if (!textL.includes("docker") && !textL.includes("kubernetes") && !textL.includes("container")) {
    missingKeywords.push("Docker & Orchestration");
    suggestions.push("Orchestration upgrade: List Docker orchestration setups to fulfill modern infrastructure filters.");
    score -= 5;
  }
  if (!textL.includes("ci") && !textL.includes("cd") && !textL.includes("pipeline") && !textL.includes("github actions")) {
    missingKeywords.push("CI/CD Pipelines");
    suggestions.push("CI/CD pipelines: Show continuous integration workflows deployed directly to live systems.");
    score -= 4;
  }
  if (!textL.includes("performance") && !textL.includes("optimize")) {
    suggestions.push("Quantified performance: Append percentage metrics detailing how you optimized file bundles, query speeds or render indexes.");
  }

  // Adjust score to be high quality
  score = Math.max(72, Math.min(score + Math.floor(Math.random() * 8) + 12, 98));

  return {
    score,
    formatting: "No parse errors. Layout standard, responsive with clean margins.",
    missingKeywords: missingKeywords.length > 0 ? missingKeywords : ["CI/CD workflows", "Serverless paradigms"],
    suggestions: suggestions.length > 0 ? suggestions : [
      "Improve bullet phrasing: Introduce strong action verbs such as 'Spearheaded', 'Architected' or 'Pioneered' at the offset.",
      "Detail microservice strategies: Elaborate on query-layer pagination and caching."
    ]
  };
}
