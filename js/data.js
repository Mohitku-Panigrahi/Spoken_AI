/* ═══════════════════════════════════════════════════════════════════
   SPOKEN.AI — DATA BANK & LINGUISTIC RULES
   Strict Grammar Rules · Optional Contextual Style Enhancements
═══════════════════════════════════════════════════════════════════ */

export const promptsData = [
  { text: "Describe your ideal work environment in 60 seconds.", category: "Casual", level: 1, keywords: ["team", "remote", "focus"] },
  { text: "Tell me about a time you had to learn something completely new.", category: "Interview", level: 1, keywords: ["challenge", "adapt", "process"] },
  { text: "Explain a complex technical concept to a 5-year-old.", category: "Technical", level: 2, keywords: ["simple", "imagine", "analogy"] },
  { text: "What is one habit you want to break and why?", category: "Casual", level: 1, keywords: ["routine", "improve", "goal"] },
  { text: "What is the best piece of advice you've ever received?", category: "Interview", level: 1, keywords: ["lesson", "mentor", "impact"] },
  { text: "Describe your perfect weekend from morning to night.", category: "Casual", level: 1, keywords: ["relax", "hobby", "friends"] },
  { text: "Tell me about a time you failed and what you learned from it.", category: "Interview", level: 2, keywords: ["mistake", "lesson", "grow"] },
  { text: "What motivates you to get out of bed every morning?", category: "Interview", level: 1, keywords: ["purpose", "drive", "passion"] },
  { text: "Describe a challenge you overcame and how it changed you.", category: "Interview", level: 2, keywords: ["obstacle", "overcome", "change"] },
  { text: "Talk about a book, film, or show that changed your perspective.", category: "Casual", level: 1, keywords: ["impact", "story", "realize"] },
  { text: "What does success mean to you personally?", category: "Interview", level: 2, keywords: ["fulfillment", "achieve", "balance"] },
  { text: "If you could travel anywhere right now, where and why?", category: "Casual", level: 1, keywords: ["explore", "culture", "experience"] },
  { text: "Describe how you handle stress and pressure at work.", category: "Technical", level: 2, keywords: ["prioritize", "calm", "breathe"] },
  { text: "Talk about a goal you're currently working towards.", category: "Interview", level: 1, keywords: ["progress", "plan", "milestone"] },
  { text: "What is one thing you wish more people knew about you?", category: "Casual", level: 1, keywords: ["perspective", "understand", "truth"] },
  { text: "Describe a time you had to work with a difficult person.", category: "Interview", level: 3, keywords: ["collaborate", "empathy", "resolve"] },
  { text: "What leadership skills do you bring to a team?", category: "Interview", level: 3, keywords: ["inspire", "delegate", "vision"] },
  { text: "Explain the difference between machine learning and artificial intelligence.", category: "Technical", level: 3, keywords: ["algorithm", "data", "pattern"] },
  { text: "Walk me through a software project you built and the architectural trade-offs you made.", category: "Technical", level: 3, keywords: ["architecture", "performance", "scalable"] },
  { text: "Why should a company hire you over other qualified candidates?", category: "Interview", level: 3, keywords: ["value", "dedication", "results"] }
];

export const dailyPrompts = [
  "Talk about one thing you are genuinely grateful for today and why.",
  "Describe your morning routine and how you could improve it.",
  "What is your biggest professional strength and give an example of using it?",
  "Tell a short story about the most adventurous thing you've ever done.",
  "Describe your hometown to someone who has never been there.",
  "Talk about a technology trend that excites or concerns you.",
  "What does work-life balance mean to you and how do you maintain it?",
  "Describe a mentor or role model and what you've learned from them.",
  "Talk about a skill you are currently learning and your progress.",
  "What is your proudest achievement and why does it matter to you?",
  "Briefly explain what you do for work as if to a curious child.",
  "Describe your ideal vacation — where, how long, and with whom?",
  "Talk about a current event or news story that caught your attention.",
  "What habit has had the biggest positive impact on your daily life?",
  "Describe what a perfect productive day looks like for you.",
  "Talk about a time you changed your mind about something important.",
  "What values guide the decisions you make in your personal life?",
  "Describe someone in your life who deserves more appreciation.",
  "What is an unpopular opinion you hold and why do you believe it?",
  "Talk about your relationship with social media — is it healthy?",
  "Describe your dream career and the steps you're taking toward it.",
  "Talk about a mistake you made and how you turned it into a lesson.",
  "What cultural practice from another country fascinates you?",
  "Describe a moment when you had to make a very difficult decision.",
  "What advice would you give to your 18-year-old self?",
  "Talk about a book you've read recently and its key takeaway.",
  "Describe your biggest fear and how you're learning to face it.",
  "What does your ideal community look like?",
  "Talk about a time teamwork helped you achieve something greater.",
  "Describe three things you want to accomplish in the next year."
];

export const readPassages = [
  "The human brain is an extraordinary organ. It processes millions of pieces of information every second, allowing us to think, feel, and experience the world around us.",
  "Communication is the foundation of every human relationship. When we listen carefully and speak clearly, we build trust, resolve conflicts, and strengthen the bonds between us.",
  "Success rarely happens overnight. It is usually the result of persistent effort, learning from failures, and remaining committed to a long-term vision even when the path is unclear.",
  "Every language reveals a unique way of seeing the world. Learning a new language doesn't just give you words — it gives you an entirely new lens through which to understand humanity.",
  "Technology is transforming the way we work and live. Artificial intelligence, once considered science fiction, is now being used to solve real-world problems in healthcare, education, and climate science."
];

export const shadowSentences = [
  "The weather today is absolutely beautiful and I would love to take a long walk.",
  "I believe effective communication is the most important skill in any workplace.",
  "She decided to pursue her passion for painting despite the many challenges she faced.",
  "The conference will be held at the Grand Hotel on the fifteenth of next month.",
  "Learning a new language requires daily practice, patience, and a genuine curiosity.",
  "He prepared thoroughly for the interview and impressed the entire selection panel.",
  "The new software update will significantly improve the application's performance.",
  "I am particularly interested in roles that allow me to grow and take on new challenges.",
  "The research team discovered that exercise has a profound effect on mental health.",
  "She spoke with such clarity and confidence that everyone in the room was captivated."
];

export const pronunciationTips = [
  "Say <strong>'Wenz-day'</strong> not 'Wed-nes-day' — the middle syllable is silent!",
  "In <strong>'February'</strong>, the first 'r' is often silent: 'Feb-yoo-airy'.",
  "The word <strong>'comfortable'</strong> has only 3 syllables: 'Cumf-ter-bul'.",
  "Stress the second syllable in <strong>'develop'</strong>: 'de-VEL-op', not 'DEV-elop'.",
  "<strong>'Ask'</strong> ends with a soft 'sk' sound — avoid adding an extra vowel.",
  "The word <strong>'pizza'</strong> is pronounced 'PEET-za', not 'PEET-sa'.",
  "In <strong>'literally'</strong>, standard pronunciation has 4 syllables: 'LIT-er-al-ee'.",
  "<strong>'Could have'</strong> sounds like 'could-uv' — never write or say 'could of'.",
  "The 'h' in <strong>'vehicle'</strong> is silent: 'VEE-i-kul', not 'veh-HI-kul'.",
  "In <strong>'colonel'</strong>, the 'l' is silent — it sounds like 'KER-nel'."
];

export const fillerWordsList = [
  "um", "uh", "er", "ah", "like", "basically", "actually", "literally",
  "you know", "i mean", "sort of", "kind of"
];

/* ── TIER 1: Demonstrable Grammatical Errors (Must Fix) ── */
export const grammarRules = [
  {
    id: "subj-verb-singular-has",
    regex: /\b(it|he|she)\s+have\b/gi,
    replacement: "$1 has",
    category: "Grammar Error",
    explanation: "Singular third-person subjects ('it', 'he', 'she') take 'has', not 'have'."
  },
  {
    id: "relative-clause-subject-verb",
    regex: /\b(which|that)\s+help\s+(students|people|users)\b/gi,
    replacement: "$1 helps $2",
    category: "Grammar Error",
    explanation: "When referring to a singular antecedent project or tool, the verb in the relative clause takes singular form ('helps')."
  },
  {
    id: "plural-subj-have",
    regex: /\b(we|they)\s+has\b/gi,
    replacement: "$1 have",
    category: "Grammar Error",
    explanation: "Plural subjects ('we', 'they') require 'have'."
  },
  {
    id: "plural-past-were",
    regex: /\b(we|they|you)\s+was\b/gi,
    replacement: "$1 were",
    category: "Grammar Error",
    explanation: "Plural past-tense indicative requires 'were' instead of 'was'."
  },
  {
    id: "singular-past-was",
    regex: /\b(he|she|it)\s+were\b/gi,
    replacement: "$1 was",
    category: "Grammar Error",
    explanation: "Singular third-person indicative takes 'was'."
  },
  {
    id: "stative-agree",
    regex: /\bi\s+am\s+agree\b/gi,
    replacement: "I agree",
    category: "Grammar Error",
    explanation: "'Agree' is a full verb. Say 'I agree', not 'I am agree'."
  },
  {
    id: "redundant-prep-discuss",
    regex: /\bdiscuss\s+about\b/gi,
    replacement: "discuss",
    category: "Grammar Error",
    explanation: "'Discuss' directly governs its object; 'about' is redundant."
  },
  {
    id: "redundant-prep-explain",
    regex: /\bexplain\s+about\b/gi,
    replacement: "explain",
    category: "Grammar Error",
    explanation: "'Explain' directly takes an object. Use 'explain the concept' rather than 'explain about'."
  },
  {
    id: "singular-negation-doesnt",
    regex: /\b(he|she|it)\s+don't\b/gi,
    replacement: "$1 doesn't",
    category: "Grammar Error",
    explanation: "Third-person singular uses 'doesn't' (does not) instead of 'don't'."
  },
  {
    id: "double-comparative-better",
    regex: /\bmore\s+better\b/gi,
    replacement: "much better",
    category: "Grammar Error",
    explanation: "'Better' is already comparative. Use 'much better' or simply 'better'."
  }
];

/* ── TIER 2: Optional Professional Tone Enhancements (Meaning Preserved) ── */
export const styleSuggestions = [
  {
    id: "collocation-project-action",
    match: /\bmake\s+a\s+project\b/gi,
    suggested: "build a project",
    category: "Style Enhancement (Optional)",
    note: "Valid informally, but 'build a project' or 'develop a project' is standard in technical contexts."
  },
  {
    id: "opinion-intro",
    match: /\baccording\s+to\s+me\b/gi,
    suggested: "in my view",
    category: "Style Enhancement (Optional)",
    note: "'According to' usually cites outside authority. For your personal standpoint, 'in my opinion' or 'in my view' is more natural."
  },
  {
    id: "vague-quantity-lot-of",
    match: /\ba\s+lot\s+of\b/gi,
    suggested: "several",
    category: "Style Enhancement (Optional)",
    note: "In formal presentations, 'several' or 'multiple' sounds more precise than 'a lot of'."
  }
];

export const advancedVocabularyTokens = new Set([
  "substantial", "exceptional", "architect", "synthesize", "articulate",
  "scalable", "comprehensive", "methodology", "leverage", "fundamental", "nuance",
  "perspective", "collaborate", "resilience", "optimize", "initiative", "endeavor",
  "framework", "strategic", "proficient", "deliberate", "subsequent", "consequently"
]);
