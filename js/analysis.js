/* ═══════════════════════════════════════════════════════════════════
   SPOKEN.AI — INTELLIGENT FEEDBACK & ANALYSIS ENGINE
   Meaning-Preserving Grammar Corrections & Distinct Style Suggestions
═══════════════════════════════════════════════════════════════════ */

import { fillerWordsList, grammarRules, styleSuggestions, advancedVocabularyTokens } from './data.js';

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
        vocabComplexityRating: '—',
        originalAnswer: '',
        correctedAnswer: '',
        hasGrammarIssues: false,
        feedbackItems: [],
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

    // 2. Vocabulary complexity assessment (Experimental indicator, NOT official CEFR)
    const uniqueWords = new Set(words);
    const lexicalDiversity = words.length > 0 ? (uniqueWords.size / words.length) : 0;
    let advancedTokensFound = 0;
    for (const w of words) {
      if (advancedVocabularyTokens.has(w)) advancedTokensFound++;
    }

    let vocabComplexityRating = 'Developing (Moderate Diversity)';
    if (words.length >= 35 && lexicalDiversity > 0.60 && advancedTokensFound >= 2) {
      vocabComplexityRating = 'Advanced (High Variety & Precision)';
    } else if (words.length >= 20 && lexicalDiversity > 0.45) {
      vocabComplexityRating = 'Intermediate (Clear & Functional)';
    } else if (words.length < 15 || lexicalDiversity < 0.35) {
      vocabComplexityRating = 'Foundational (Repetitive Vocabulary)';
    }

    // 3. Fluency Score calculation (Objective 0 - 100)
    let score = 75; // baseline
    if (wpm >= 115 && wpm <= 155) score += 15;
    else if (wpm >= 90 && wpm < 115) score += 5;
    else if (wpm > 175) score -= 10;
    else if (wpm < 80) score -= 15;

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

    // 5. Tiered Linguistic Engine (Grammar Errors first, Style Suggestions separate)
    const { correctedText, feedbackItems, hasGrammarIssues } = this.evaluateLinguistics(cleanText, promptObj);

    return {
      wordCount,
      wpm,
      fillerCount,
      detectedFillers,
      fluencyScore: score,
      vocabComplexityRating,
      lexicalDiversity: Math.round(lexicalDiversity * 100),
      originalAnswer: cleanText,
      suggestedImprovement: correctedText,
      hasGrammarIssues,
      explanations: feedbackItems,
      keywordMatches
    };
  }

  evaluateLinguistics(text, promptObj) {
    let corrected = text;
    const feedbackItems = [];
    let hasGrammarIssues = false;

    // TIER 1: Correct Demonstrable Grammatical Errors
    for (const rule of grammarRules) {
      if (rule.regex.test(corrected)) {
        hasGrammarIssues = true;
        corrected = corrected.replace(rule.regex, rule.replacement);
        feedbackItems.push({
          type: 'error',
          badge: 'Grammar Correction',
          title: 'Grammar Rule',
          message: rule.explanation
        });
      }
    }

    // TIER 2: Optional Contextual Phrasing (Meaning Preserved)
    for (const style of styleSuggestions) {
      if (style.match.test(corrected)) {
        corrected = corrected.replace(style.match, style.suggested);
        feedbackItems.push({
          type: 'style',
          badge: 'Optional Polish',
          title: 'Professional Phrasing',
          message: `${style.note} Consider '${style.suggested}'.`
        });
      }
    }

    // Structural Clarity Guidance
    const sentences = corrected.split(/[.!?]+/).map(s => s.trim()).filter(Boolean);
    if (sentences.length <= 1 && corrected.split(/\s+/).length > 25) {
      feedbackItems.push({
        type: 'structure',
        badge: 'Pacing / Structure',
        title: 'Run-on Thought',
        message: 'This response is a single long sentence. Breaking it into two distinct points makes your delivery clearer in an interview.'
      });
    }

    // Interview specific note
    if (promptObj && promptObj.category === 'Interview') {
      feedbackItems.push({
        type: 'structure',
        badge: 'Interview Strategy',
        title: 'STAR Structure',
        message: 'For interview questions, state the situation briefly, highlight your actions, and end with the outcome.'
      });
    }

    // Format capitalization and end punctuation
    if (corrected.length > 0) {
      corrected = corrected.charAt(0).toUpperCase() + corrected.slice(1);
      if (!/[.!?]$/.test(corrected)) {
        corrected += '.';
      }
    }

    return {
      correctedText: corrected,
      feedbackItems: feedbackItems.slice(0, 4),
      hasGrammarIssues
    };
  }
}
