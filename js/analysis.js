/* ═══════════════════════════════════════════════════════════════════
   SPOKEN.AI — INTELLIGENT FEEDBACK & ANALYSIS ENGINE
   Deterministic Metrics + Linguistic Grammar & Lexicon Suggestions
═══════════════════════════════════════════════════════════════════ */

import { fillerWordsList, grammarRules, vocabularyEnhancements, advancedVocabularyTokens } from './data.js';

export class AnalysisEngine {
  constructor() {
    this.fillerWords = new Set(fillerWordsList);
  }

  analyzeSession(transcript, durationSeconds, promptObj) {
    const cleanText = (transcript || '').trim();
    if (!cleanText) {
      return {
        wordCount: 0,
        wpm: 0,
        fillerCount: 0,
        fluencyScore: 0,
        cefrLevel: '—',
        originalAnswer: '',
        suggestedImprovement: 'No speech was detected. Please verify your microphone and speak clearly.',
        explanations: [],
        keywordMatches: []
      };
    }

    const words = cleanText.toLowerCase().replace(/[^\w\s']/g, '').split(/\s+/).filter(Boolean);
    const wordCount = words.length;
    const durationMinutes = Math.max(durationSeconds / 60, 0.1);
    const wpm = Math.round(wordCount / durationMinutes);

    // 1. Filler words analysis
    let fillerCount = 0;
    const detectedFillers = [];
    const textLower = cleanText.toLowerCase();

    for (const filler of fillerWordsList) {
      const regex = new RegExp(`\\b${filler}\\b`, 'gi');
      const matches = textLower.match(regex);
      if (matches) {
        fillerCount += matches.length;
        detectedFillers.push({ word: filler, count: matches.length });
      }
    }

    // 2. Vocabulary & CEFR estimation
    const uniqueWords = new Set(words);
    const lexicalDiversity = words.length > 0 ? (uniqueWords.size / words.length) : 0;
    let advancedTokensFound = 0;
    for (const w of words) {
      if (advancedVocabularyTokens.has(w)) advancedTokensFound++;
    }

    let cefrLevel = 'B1';
    if (words.length > 50 && lexicalDiversity > 0.65 && advancedTokensFound >= 2) {
      cefrLevel = 'C1';
    } else if (words.length > 30 && lexicalDiversity > 0.5) {
      cefrLevel = 'B2';
    } else if (words.length < 15 || lexicalDiversity < 0.35) {
      cefrLevel = 'A2';
    }

    // 3. Fluency Score (0 - 100)
    let score = 75; // baseline
    // Pacing reward / penalty
    if (wpm >= 115 && wpm <= 155) score += 15;
    else if (wpm >= 90 && wpm < 115) score += 5;
    else if (wpm > 175) score -= 10; // Too rushed
    else if (wpm < 80) score -= 15;  // Too halting

    // Filler penalty
    const fillerRatio = wordCount > 0 ? (fillerCount / wordCount) : 0;
    if (fillerRatio > 0.08) score -= 20;
    else if (fillerRatio > 0.04) score -= 10;
    else if (fillerCount === 0 && wordCount > 20) score += 10;

    score = Math.max(10, Math.min(98, score));

    // 4. Keyword verification
    const keywordMatches = [];
    if (promptObj && promptObj.keywords) {
      for (const kw of promptObj.keywords) {
        const found = textLower.includes(kw.toLowerCase());
        keywordMatches.push({ keyword: kw, found });
      }
    }

    // 5. Intelligent Linguistic Feedback Engine
    const { suggestedText, explanations } = this.generateFeedback(cleanText, promptObj);

    return {
      wordCount,
      wpm,
      fillerCount,
      detectedFillers,
      fluencyScore: score,
      cefrLevel,
      lexicalDiversity: Math.round(lexicalDiversity * 100),
      originalAnswer: cleanText,
      suggestedImprovement: suggestedText,
      explanations,
      keywordMatches
    };
  }

  generateFeedback(text, promptObj) {
    let polished = text;
    const explanations = [];

    // Check Grammatical Rules
    for (const rule of grammarRules) {
      if (rule.regex.test(polished)) {
        polished = polished.replace(rule.regex, rule.replacement);
        explanations.push({
          type: 'grammar',
          title: 'Grammar Alignment',
          message: rule.explanation
        });
      }
    }

    // Check Vocabulary Enhancements
    for (const vocab of vocabularyEnhancements) {
      if (vocab.match.test(polished)) {
        polished = polished.replace(vocab.match, vocab.better);
        explanations.push({
          type: 'vocab',
          title: 'Professional Lexicon',
          message: `${vocab.reason} Replaced with "${vocab.better}".`
        });
      }
    }

    // Structural and clarity feedback
    const sentences = polished.split(/[.!?]+/).map(s => s.trim()).filter(Boolean);
    if (sentences.length <= 1 && polished.split(/\s+/).length > 25) {
      explanations.push({
        type: 'structure',
        title: 'Run-on Sentence',
        message: 'Consider breaking your continuous sentence into two structured thoughts to allow listeners to absorb your points.'
      });
    }

    // Domain-specific Interview Advice
    if (promptObj && promptObj.category === 'Interview') {
      explanations.push({
        type: 'structure',
        title: 'Interview Technique (STAR)',
        message: 'Ensure your response briefly sets the Context (Situation/Task), describes your specific Action, and concludes with a measurable Result.'
      });
    }

    // Ensure first letter capitalized and trailing punctuation
    if (polished.length > 0) {
      polished = polished.charAt(0).toUpperCase() + polished.slice(1);
      if (!/[.!?]$/.test(polished)) {
        polished += '.';
      }
    }

    return {
      suggestedText: polished,
      explanations: explanations.slice(0, 3) // Return top 3 high-impact actionable points
    };
  }
}
