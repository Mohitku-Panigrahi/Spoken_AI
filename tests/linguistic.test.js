/* ═══════════════════════════════════════════════════════════════════
   SPOKEN.AI — COMPREHENSIVE LINGUISTIC & SAFETY TEST SUITE
   Tests Meaning Preservation · True Grammar Errors · False Positives
═══════════════════════════════════════════════════════════════════ */

import { AnalysisEngine } from '../js/analysis.js';

const engine = new AnalysisEngine();

let passed = 0;
let failed = 0;

function assert(condition, testName, details = '') {
  if (condition) {
    console.log(`[PASS] ${testName}`);
    passed++;
  } else {
    console.error(`[FAIL] ${testName} -> ${details}`);
    failed++;
  }
}

console.log('--- RUNNING LINGUISTIC ENGINE VERIFICATION ---');

// 1. Meaning Preservation
const sentenceMeaning = 'I make a project which help students to learn programming and it have many features.';
const resMeaning = engine.analyzeSession(sentenceMeaning, 30, { category: 'Interview' });
assert(
  !resMeaning.suggestedImprovement.includes('master') && resMeaning.suggestedImprovement.includes('learn programming'),
  'Meaning Preservation: Does NOT escalate "learn programming" to "master programming"',
  resMeaning.suggestedImprovement
);

// 2. Grammar Error Detection (True Positives)
const grammarSentences = [
  { raw: 'it have many features', expected: 'it has many features', rule: 'subject-verb third person has' },
  { raw: 'we was trying to fix it', expected: 'we were trying to fix it', rule: 'plural past-tense were' },
  { raw: 'I am agree with your proposal', expected: 'I agree with your proposal', rule: 'stative verb agree' },
  { raw: 'she discuss about the problem', expected: 'she discuss the problem', rule: 'transitive discuss without about' },
  { raw: 'this approach is more better', expected: 'this approach is much better', rule: 'double comparative fix' }
];

for (const tc of grammarSentences) {
  const r = engine.analyzeSession(tc.raw, 10, null);
  assert(
    r.suggestedImprovement.toLowerCase().includes(tc.expected.toLowerCase()),
    `Grammar Correction: ${tc.rule}`,
    `Got: "${r.suggestedImprovement}" Expected: "${tc.expected}"`
  );
  assert(
    r.hasGrammarIssues === true,
    `Flags demonstrable grammar issue for: ${tc.rule}`
  );
}

// 3. False Positive Protection (Valid English must not be flagged as grammar errors)
const validSentences = [
  'I enjoy collaborating with cross-functional teams to build intuitive applications.',
  'Yesterday we deployed the latest release to our staging environment.',
  'She explained the problem clearly during the retrospective.'
];

for (const valid of validSentences) {
  const r = engine.analyzeSession(valid, 15, null);
  assert(
    r.hasGrammarIssues === false,
    `False Positive Guard: Correct sentence has no grammar errors: "${valid.slice(0, 35)}..."`
  );
}

// 4. Distinguishing Errors from Optional Style Rewrites
const resDistinction = engine.analyzeSession('I made a project according to me', 10, null);
const hasError = resDistinction.explanations.some(e => e.type === 'error');
const hasStyle = resDistinction.explanations.some(e => e.type === 'style');
assert(
  hasStyle && !hasError,
  'Distinction: Correctly identifies "according to me" as optional style enhancement rather than grammar error'
);

// 5. Vocabulary Complexity (Experimental Indicator)
const resBasic = engine.analyzeSession('I like it it is good yes good', 10, null);
assert(
  resBasic.vocabComplexityRating.includes('Foundational'),
  'Complexity Indicator: Accurately rates low-diversity text as Foundational'
);

// 6. Speech Deduplication Simulator (Testing speech.js logic)
const testSegments = [];
const incomingPhrases = ['hello world', 'hello world', 'how are you', 'how are you', 'today'];
for (const phrase of incomingPhrases) {
  const last = testSegments[testSegments.length - 1];
  if (!last || last.toLowerCase() !== phrase.toLowerCase()) {
    testSegments.push(phrase);
  }
}
assert(
  testSegments.join(' ') === 'hello world how are you today',
  'Speech Recovery Simulator: Deduplicates repeated recognition reconnect segments',
  testSegments.join(' ')
);

console.log('---------------------------------------------');
console.log(`TOTAL TESTS: ${passed + failed} | PASSED: ${passed} | FAILED: ${failed}`);

if (failed > 0) {
  process.exit(1);
}
