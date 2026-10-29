/* ═══════════════════════════════════════════════════════════════════
   SPOKEN.AI — DATA BANK & LINGUISTIC RULES
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
  "you know", "i mean", "sort of", "kind of", "right", "okay so", "honestly"
];

/* ── Grammatical Correction & Professional Lexicon Enhancement Engine ── */
export const grammarRules = [
  {
    regex: /\b(it|he|she)\s+(have)\b/gi,
    replacement: "$1 has",
    type: "grammar",
    explanation: "Singular third-person subjects ('it', 'he', 'she') pair with 'has', not 'have'."
  },
  {
    regex: /\b(i|we|they|you)\s+(has)\b/gi,
    replacement: "$1 have",
    type: "grammar",
    explanation: "First-person and plural pronouns ('I', 'we', 'they', 'you') take 'have'."
  },
  {
    regex: /\b(we|they|you)\s+(was)\b/gi,
    replacement: "$1 were",
    type: "grammar",
    explanation: "Plural past-tense requires 'were' instead of 'was'."
  },
  {
    regex: /\b(i|he|she|it)\s+(were)\b/gi,
    replacement: "$1 was",
    type: "grammar",
    explanation: "Singular past-tense indicative takes 'was'."
  },
  {
    regex: /\bi\s+am\s+agree\b/gi,
    replacement: "I agree",
    type: "grammar",
    explanation: "'Agree' is a verb on its own. Say 'I agree', not 'I am agree'."
  },
  {
    regex: /\bdiscuss\s+about\b/gi,
    replacement: "discuss",
    type: "grammar",
    explanation: "'Discuss' is transitive and directly takes the object without 'about'."
  },
  {
    regex: /\bexplain\s+about\b/gi,
    replacement: "explain",
    type: "grammar",
    explanation: "'Explain' directly takes an object. Use 'explain the concept' instead of 'explain about'."
  },
  {
    regex: /\b(he|she|it)\s+don't\b/gi,
    replacement: "$1 doesn't",
    type: "grammar",
    explanation: "Third-person singular takes 'doesn't' (does not) instead of 'don't'."
  },
  {
    regex: /\bmore\s+better\b/gi,
    replacement: "much better",
    type: "grammar",
    explanation: "'Better' is already a comparative adjective. Say 'much better' or simply 'better'."
  },
  {
    regex: /\baccording\s+to\s+me\b/gi,
    replacement: "in my view",
    type: "grammar",
    explanation: "'According to' is used for external sources. For your own perspective, use 'in my opinion' or 'in my view'."
  }
];

export const vocabularyEnhancements = [
  { match: /\bmake\s+a\s+project\b/gi, better: "developed a project", reason: "More professional engineering phrasing than 'make'." },
  { match: /\bvery\s+good\b/gi, better: "exceptional", reason: "Elevates conversational tone to articulate English." },
  { match: /\bvery\s+big\b/gi, better: "substantial", reason: "More precise and impactful vocabulary." },
  { match: /\bhelp\s+students\s+to\s+learn\b/gi, better: "empowers students to master", reason: "Stronger active verb formulation." },
  { match: /\ba\s+lot\s+of\b/gi, better: "numerous", reason: "Formal, clean business vocabulary." },
  { match: /\bgood\s+thing\b/gi, better: "key advantage", reason: "More persuasive and analytical." },
  { match: /\bgot\s+better\b/gi, better: "improved significantly", reason: "Clearer qualitative progress indicator." },
  { match: /\bbig\s+problem\b/gi, better: "critical challenge", reason: "Standard professional interview phrasing." },
  { match: /\btalk\s+about\b/gi, better: "highlight", reason: "Stronger, more direct communicative verb." }
];

export const advancedVocabularyTokens = new Set([
  "substantial", "exceptional", "empower", "architect", "synthesize", "articulate",
  "scalable", "comprehensive", "methodology", "leverage", "fundamental", "nuance",
  "perspective", "collaborate", "resilience", "optimize", "initiative", "endeavor",
  "framework", "strategic", "proficient", "deliberate", "subsequent", "consequently"
]);
