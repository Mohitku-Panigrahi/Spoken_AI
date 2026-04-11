
/* ═══════════════════════════════════════════════════════════
   SPOKEN.AI — All Features Edition
   Vanilla JS · Web Speech API · AudioContext · localStorage
═══════════════════════════════════════════════════════════ */

// ── Prompts Data ─────────────────────────────────────────────
const promptsData = [
  {text:"Describe your ideal work environment in 60 seconds.",category:"Casual",level:1,keywords:["team","remote","focus"]},
  {text:"Tell me about a time you had to learn something completely new.",category:"Interview",level:1,keywords:["challenge","adapt","process"]},
  {text:"Explain a complex technical concept to a 5-year-old.",category:"Technical",level:2,keywords:["simple","imagine","analogy"]},
  {text:"What is one habit you want to break and why?",category:"Casual",level:1,keywords:["routine","improve","goal"]},
  {text:"What is the best piece of advice you've ever received?",category:"Interview",level:1,keywords:["lesson","mentor","impact"]},
  {text:"Describe your perfect weekend from morning to night.",category:"Casual",level:1,keywords:["relax","hobby","friends"]},
  {text:"Tell me about a time you failed and what you learned from it.",category:"Interview",level:2,keywords:["mistake","lesson","grow"]},
  {text:"What motivates you to get out of bed every morning?",category:"Interview",level:1,keywords:["purpose","drive","passion"]},
  {text:"Describe a challenge you overcame and how it changed you.",category:"Interview",level:2,keywords:["obstacle","overcome","change"]},
  {text:"Talk about a book, film, or show that changed your perspective.",category:"Casual",level:1,keywords:["impact","story","realize"]},
  {text:"What does success mean to you personally?",category:"Interview",level:2,keywords:["fulfillment","achieve","balance"]},
  {text:"If you could travel anywhere right now, where and why?",category:"Casual",level:1,keywords:["explore","culture","experience"]},
  {text:"Describe how you handle stress and pressure at work.",category:"Technical",level:2,keywords:["prioritize","calm","breathe"]},
  {text:"Talk about a goal you're currently working towards.",category:"Interview",level:1,keywords:["progress","plan","milestone"]},
  {text:"What is one thing you wish more people knew about you?",category:"Casual",level:1,keywords:["perspective","understand","truth"]},
  {text:"Describe a time you had to work with a difficult person.",category:"Interview",level:3,keywords:["collaborate","empathy","resolve"]},
  {text:"What leadership skills do you bring to a team?",category:"Interview",level:3,keywords:["inspire","delegate","vision"]},
  {text:"Explain the difference between machine learning and artificial intelligence.",category:"Technical",level:3,keywords:["algorithm","data","pattern"]},
];

// ── Daily Challenge Prompts ───────────────────────────────────
const dailyPrompts = [
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
  "Describe three things you want to accomplish in the next year.",
];

// ── Reading Passages ──────────────────────────────────────────
const readPassages = [
  "The human brain is an extraordinary organ. It processes millions of pieces of information every second, allowing us to think, feel, and experience the world around us.",
  "Communication is the foundation of every human relationship. When we listen carefully and speak clearly, we build trust, resolve conflicts, and strengthen the bonds between us.",
  "Success rarely happens overnight. It is usually the result of persistent effort, learning from failures, and remaining committed to a long-term vision even when the path is unclear.",
  "Every language reveals a unique way of seeing the world. Learning a new language doesn't just give you words — it gives you an entirely new lens through which to understand humanity.",
  "Technology is transforming the way we work and live. Artificial intelligence, once considered science fiction, is now being used to solve real-world problems in healthcare, education, and climate science.",
];

// ── Shadowing Sentences ───────────────────────────────────────
const shadowSentences = [
  "The weather today is absolutely beautiful and I would love to take a long walk.",
  "I believe effective communication is the most important skill in any workplace.",
  "She decided to pursue her passion for painting despite the many challenges she faced.",
  "The conference will be held at the Grand Hotel on the fifteenth of next month.",
  "Learning a new language requires daily practice, patience, and a genuine curiosity.",
  "He prepared thoroughly for the interview and impressed the entire selection panel.",
  "The new software update will significantly improve the application's performance.",
  "I am particularly interested in roles that allow me to grow and take on new challenges.",
  "The research team discovered that exercise has a profound effect on mental health.",
  "She spoke with such clarity and confidence that everyone in the room was captivated.",
];

// ── Pronunciation Tips ────────────────────────────────────────
const tips = [
  "Say <strong>'Wenz-day'</strong> not 'Wed-nes-day' — the middle syllable is silent!",
  "In <strong>'February'</strong>, the first 'r' is often silent: 'Feb-yoo-airy'.",
  "The word <strong>'comfortable'</strong> has only 3 syllables: 'Cumf-ter-bul'.",
  "Stress the second syllable in <strong>'develop'</strong>: 'de-VEL-op', not 'DEV-elop'.",
  "<strong>'Ask'</strong> ends with a soft 'sk' sound — avoid adding a vowel: 'arsk' is not standard.",
  "The word <strong>'pizza'</strong> is pronounced 'PEET-za', not 'PEET-sa'.",
  "In <strong>'literally'</strong>, there are only 4 syllables: 'LIT-er-al-ee'.",
  "<strong>'Could have'</strong> is often slurred as 'could of' — always write and say 'could have'.",
  "The 'h' in <strong>'vehicle'</strong> is silent: 'VEE-i-kul', not 'veh-HI-kul'.",
  "In <strong>'colonel'</strong>, the 'l' is silent — it sounds like 'KER-nel'.",
];

// ── Stop Words for Repetition Analysis ───────────────────────
const STOP_WORDS = new Set(['the','a','an','and','or','but','in','on','at','to','for','of','with','is','was','are','were','be','been','being','i','you','he','she','it','we','they','my','your','his','her','its','our','their','this','that','these','those','have','has','had','do','did','does','will','would','could','should','may','might','shall','can','not','no','if','then','so','as','by','from','up','about','into','through','during','before','after','above','below','between']);

// ── State ─────────────────────────────────────────────────────
let currentPrompt='', totalDuration=60, timeRemaining=60, timerInterval=null;
let isRecording=false, isPaused=false, secondsSpoken=0;
let finalTranscript='', interimTranscript='', recognition=null, tipIndex=0;
let lastAnalytics=null, chartInstance=null, pacingChartInstance=null;
let isLightMode=localStorage.getItem('spokenai_theme')==='light';
let targetKeywords=[], foundKeywords=[], pacingData=[], pacingInterval=null;
let silenceEvents=[], lastSpeechTime=0;
let audioCtx=null, analyserNode=null, micStream=null, volAnimFrame=null;
let mirrorStream=null, isMirrorOn=false;
let isDailyMode=false, userLevel=1;
// Read aloud state
let readWords=[], readRecognition=null, readWordIndex=0, readCorrect=0;
// Shadowing state
let shadowRecognition=null, currentShadowSentence='', isShadowing=false;

const CIRCUMFERENCE = 2 * Math.PI * 52;

// ── DOM Refs ──────────────────────────────────────────────────
const btnMic       = document.getElementById('btn-mic');
const micIcon      = document.getElementById('mic-icon');
const micStatus    = document.getElementById('mic-status');
const timerDisplay = document.getElementById('timer-display');
const timerProgress= document.getElementById('timer-progress');
const transcriptEl = document.getElementById('transcript-body');
const promptEl     = document.getElementById('prompt-text');
const analyticsCard= document.getElementById('analytics-card');
const noSupport    = document.getElementById('no-support');
const tipEl        = document.getElementById('tip-text');

// ── Init ──────────────────────────────────────────────────────
function init() {
  if (isLightMode) { document.body.classList.add('light-mode'); document.getElementById('theme-icon').className='fa-solid fa-sun'; }
  if (!('SpeechRecognition' in window) && !('webkitSpeechRecognition' in window)) {
    noSupport.style.display='block'; btnMic.disabled=true; btnMic.style.opacity='0.4';
  } else { setupRecognition(); }
  newTopic(); tipEl.innerHTML=tips[0]; updateStreak(); renderHistory();
  timerProgress.style.strokeDasharray=CIRCUMFERENCE;
  timerProgress.style.strokeDashoffset=0;
  document.querySelectorAll('.duration-btn').forEach(b=>{
    b.addEventListener('click',()=>{ document.querySelectorAll('.duration-btn').forEach(x=>x.classList.remove('active')); b.classList.add('active'); });
  });
  loadReadPassage(); loadShadowSentence();
}

// ── Speech Recognition Setup ──────────────────────────────────
function setupRecognition() {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  recognition = new SR();
  recognition.continuous=true; recognition.interimResults=true; recognition.lang='en-IN';

  recognition.onresult = (event) => {
    const now = performance.now();
    if (lastSpeechTime && (now - lastSpeechTime) > 2500) {
      silenceEvents.push({ gap: Math.round(now - lastSpeechTime) });
    }
    lastSpeechTime = now;
    interimTranscript='';
    for (let i=event.resultIndex; i<event.results.length; i++) {
      if (event.results[i].isFinal) finalTranscript += event.results[i][0].transcript + ' ';
      else interimTranscript += event.results[i][0].transcript;
    }
    // Live keyword detection
    const liveText=(finalTranscript+interimTranscript).toLowerCase();
    let updatedKW=false;
    targetKeywords.forEach(kw=>{ if (!foundKeywords.includes(kw) && liveText.includes(kw.toLowerCase())) { foundKeywords.push(kw); updatedKW=true; } });
    if (updatedKW) renderKeywords();
    renderTranscript(false);
  };
  recognition.onerror=(e)=>{ if (e.error==='not-allowed') showToast('Microphone access denied.'); else if (e.error!=='no-speech') showToast('Speech error: '+e.error); stopRecognition(); };
  recognition.onend=()=>{ if (isRecording) { try { recognition.start(); } catch(e){} } };
}

// ── Topic Logic ───────────────────────────────────────────────
function newTopic() {
  if (isRecording) return;
  isDailyMode=false;
  document.getElementById('daily-badge').style.display='none';
  const cat = document.getElementById('category-select').value;
  const history = JSON.parse(localStorage.getItem('spokenai_history')||'[]');
  userLevel = Math.min(3, Math.floor(history.length/3)+1);
  document.getElementById('level-badge').textContent='Level '+userLevel;
  let valid = promptsData.filter(p=>(cat==='All'||p.category===cat) && p.level<=userLevel);
  if (!valid.length) valid=promptsData.filter(p=>p.level<=userLevel);
  promptEl.style.opacity='0';
  document.getElementById('keywords-rack').innerHTML='';
  setTimeout(()=>{
    const item = valid[Math.floor(Math.random()*valid.length)];
    currentPrompt=item.text; targetKeywords=[...item.keywords]; foundKeywords=[];
    promptEl.textContent=currentPrompt; promptEl.style.opacity='1';
    renderKeywords();
  },200);
}

function loadDailyChallenge() {
  if (isRecording) return;
  isDailyMode=true;
  document.getElementById('daily-badge').style.display='inline-flex';
  const dayIndex = Math.floor(Date.now()/86400000) % dailyPrompts.length;
  currentPrompt = dailyPrompts[dayIndex];
  targetKeywords=[]; foundKeywords=[];
  promptEl.style.opacity='0';
  document.getElementById('keywords-rack').innerHTML='';
  setTimeout(()=>{ promptEl.textContent=currentPrompt; promptEl.style.opacity='1'; },200);
}

function renderKeywords() {
  const rack=document.getElementById('keywords-rack');
  if (!rack||!targetKeywords.length){if(rack)rack.innerHTML='';return;}
  rack.innerHTML=targetKeywords.map(kw=>{
    const f=foundKeywords.includes(kw);
    return `<div class="keyword-chip ${f?'found':''}"><i class="fa-solid fa-${f?'check':'bullseye'}"></i> ${kw}</div>`;
  }).join('');
}

function toggleCustomPrompt() { document.getElementById('custom-prompt-wrap').classList.toggle('active'); }
function applyCustomPrompt() {
  if (isRecording) return;
  const val=document.getElementById('custom-prompt-input').value.trim();
  if (!val) return;
  currentPrompt=val; isDailyMode=false;
  targetKeywords=[]; foundKeywords=[];
  promptEl.textContent=currentPrompt;
  document.getElementById('daily-badge').style.display='none';
  document.getElementById('keywords-rack').innerHTML='';
  document.getElementById('custom-prompt-wrap').classList.remove('active');
  document.getElementById('custom-prompt-input').value='';
}
function toggleTheme() {
  isLightMode=!isLightMode;
  document.body.classList.toggle('light-mode',isLightMode);
  document.getElementById('theme-icon').className=isLightMode?'fa-solid fa-sun':'fa-solid fa-moon';
  localStorage.setItem('spokenai_theme',isLightMode?'light':'dark');
}
function setDuration(sec) { if (isRecording) return; totalDuration=sec; timeRemaining=sec; updateTimerUI(sec); }

// ── Volume Meter ──────────────────────────────────────────────
async function startVolumeMeter() {
  try {
    micStream = await navigator.mediaDevices.getUserMedia({audio:true});
    audioCtx = new (window.AudioContext||window.webkitAudioContext)();
    const source = audioCtx.createMediaStreamSource(micStream);
    analyserNode = audioCtx.createAnalyser();
    analyserNode.fftSize=256;
    source.connect(analyserNode);
    const dataArray = new Uint8Array(analyserNode.frequencyBinCount);
    const bars = [1,2,3,4,5,6,7,8,9,10,11,12].map(n=>document.getElementById('vb'+n));
    const volMeter = document.getElementById('volume-meter');
    volMeter.classList.add('active');
    function drawVol() {
      volAnimFrame = requestAnimationFrame(drawVol);
      analyserNode.getByteFrequencyData(dataArray);
      const avg = dataArray.reduce((s,v)=>s+v,0)/dataArray.length;
      const level = avg/128;
      bars.forEach((b,i)=>{
        const h=Math.max(3,Math.round(level*(3+i*2.2)));
        b.style.height=h+'px';
        b.style.opacity=0.3+level*0.7;
      });
    }
    drawVol();
  } catch(e) { /* silently fail if permission denied */ }
}

function stopVolumeMeter() {
  if (volAnimFrame) cancelAnimationFrame(volAnimFrame);
  if (analyserNode) { analyserNode.disconnect(); analyserNode=null; }
  if (micStream) { micStream.getTracks().forEach(t=>t.stop()); micStream=null; }
  if (audioCtx) { audioCtx.close(); audioCtx=null; }
  document.getElementById('volume-meter').classList.remove('active');
  const bars=[1,2,3,4,5,6,7,8,9,10,11,12].map(n=>document.getElementById('vb'+n));
  bars.forEach(b=>{b.style.height='4px';});
}

// ── Mirror Mode ───────────────────────────────────────────────
async function toggleMirror() {
  const btn=document.getElementById('btn-mirror');
  const wrap=document.getElementById('mirror-wrap');
  const video=document.getElementById('mirror-video');
  if (isMirrorOn) {
    isMirrorOn=false;
    if (mirrorStream) { mirrorStream.getTracks().forEach(t=>t.stop()); mirrorStream=null; }
    video.srcObject=null;
    wrap.classList.remove('active');
    btn.classList.remove('active');
    localStorage.setItem('spokenai_mirror','off');
  } else {
    try {
      mirrorStream = await navigator.mediaDevices.getUserMedia({video:true});
      video.srcObject=mirrorStream;
      isMirrorOn=true;
      wrap.classList.add('active');
      btn.classList.add('active');
      localStorage.setItem('spokenai_mirror','on');
    } catch(e) { showToast('Camera access denied.'); }
  }
}

// ── Recording ─────────────────────────────────────────────────
function toggleRecording() {
  if (!recognition) return;
  if (isRecording) stopRecognition(); else startRecognition();
}

function startRecognition() {
  finalTranscript=''; interimTranscript=''; secondsSpoken=0;
  timeRemaining=totalDuration; pacingData=[]; silenceEvents=[]; lastSpeechTime=0;
  transcriptEl.classList.remove('empty');
  transcriptEl.innerHTML='<span class="interim">Listening…</span>';
  analyticsCard.classList.remove('visible');
  document.getElementById('pacing-chart-wrap').style.display='none';
  document.getElementById('ai-feedback-box').style.display='none';
  isRecording=true; isPaused=false;
  btnMic.classList.add('recording'); btnMic.classList.remove('paused');
  micIcon.className='fa-solid fa-stop';
  document.getElementById('btn-pause').classList.add('active');
  document.getElementById('btn-finish').classList.add('active');
  document.getElementById('pause-icon').className='fa-solid fa-pause';
  micStatus.textContent='● Recording…'; micStatus.classList.add('active'); micStatus.classList.remove('paused');
  document.getElementById('btn-new-topic').disabled=true;
  document.getElementById('btn-custom-topic').disabled=true;
  document.getElementById('custom-prompt-input').disabled=true;
  try { recognition.start(); } catch(e){}

  // Pacing tracker — 5s rolling WPM windows
  let lastWC=0;
  if (pacingInterval) clearInterval(pacingInterval);
  pacingInterval=setInterval(()=>{
    if (!isPaused && isRecording) {
      const wc=(finalTranscript+interimTranscript).trim().split(/\s+/).filter(w=>w.length>0).length;
      pacingData.push(Math.round((wc-lastWC)*(60/5)));
      lastWC=wc;
    }
  },5000);

  startVolumeMeter();
  updateTimerUI(timeRemaining);
  timerInterval=setInterval(()=>{
    secondsSpoken++; timeRemaining--;
    updateTimerUI(timeRemaining);
    if (timeRemaining<=0) stopRecognition();
  },1000);
}

function togglePause() {
  if (!isRecording) return;
  isPaused=!isPaused;
  const pIcon=document.getElementById('pause-icon');
  if (isPaused) {
    try { recognition.stop(); } catch(e){}
    clearInterval(timerInterval);
    btnMic.classList.remove('recording'); btnMic.classList.add('paused');
    pIcon.className='fa-solid fa-play';
    micStatus.textContent='⏸ Paused'; micStatus.classList.remove('active'); micStatus.classList.add('paused');
  } else {
    try { recognition.start(); } catch(e){}
    btnMic.classList.remove('paused'); btnMic.classList.add('recording');
    pIcon.className='fa-solid fa-pause';
    micStatus.textContent='● Recording…'; micStatus.classList.add('active'); micStatus.classList.remove('paused');
    timerInterval=setInterval(()=>{ secondsSpoken++; timeRemaining--; updateTimerUI(timeRemaining); if(timeRemaining<=0) stopRecognition(); },1000);
  }
}

function stopRecognition() {
  if (!isRecording) return;
  isRecording=false;
  clearInterval(timerInterval); timerInterval=null;
  clearInterval(pacingInterval); pacingInterval=null;
  try { recognition.stop(); } catch(e){}
  stopVolumeMeter();
  if (secondsSpoken===0) secondsSpoken=totalDuration-timeRemaining;
  if (secondsSpoken<1) secondsSpoken=1;
  btnMic.classList.remove('recording','paused');
  document.getElementById('btn-pause').classList.remove('active');
  document.getElementById('btn-finish').classList.remove('active');
  micIcon.className='fa-solid fa-microphone';
  micStatus.textContent='Click to start'; micStatus.classList.remove('active','paused');
  document.getElementById('btn-new-topic').disabled=false;
  document.getElementById('btn-custom-topic').disabled=false;
  document.getElementById('custom-prompt-input').disabled=false;
  const a=analyzeTranscript(finalTranscript.trim(), secondsSpoken);
  // Keyword bonus
  const kwBonus=foundKeywords.length*3;
  a.score=Math.min(100,a.score+kwBonus);
  if (foundKeywords.length>0) a.improvements.push(`<strong>Keywords:</strong> You used ${foundKeywords.length} target keyword(s) for a +${kwBonus} bonus!`);
  lastAnalytics=a;
  renderTranscript(true, a.highlighted);
  renderAnalytics(a);
  saveSession(a);
  updateStreak(); renderHistory();
  if (a.score>=80||getStreak()>=7) launchConfetti();
}

// ── Timer UI ──────────────────────────────────────────────────
function updateTimerUI(sec) {
  timerDisplay.textContent=Math.floor(sec/60)+':'+String(sec%60).padStart(2,'0');
  const pct=sec/totalDuration;
  timerProgress.style.strokeDashoffset=CIRCUMFERENCE*(1-pct);
  let color=sec>totalDuration*0.5?'var(--accent3)':sec>totalDuration*0.15?'var(--warn)':'var(--danger)';
  timerProgress.style.stroke=color;
  timerProgress.style.filter=`drop-shadow(0 0 6px ${color})`;
}

// ── Transcript Render ─────────────────────────────────────────
function renderTranscript(isFinal, highlighted) {
  if (isFinal) {
    transcriptEl.innerHTML=highlighted||(finalTranscript||'<em style="color:var(--text-muted)">No speech detected.</em>');
    transcriptEl.classList.remove('empty');
  } else {
    transcriptEl.innerHTML=(finalTranscript||'')+(interimTranscript?`<span class="interim">${interimTranscript}</span>`:'');
    if (!finalTranscript&&!interimTranscript) transcriptEl.innerHTML='<span class="interim">Listening…</span>';
    transcriptEl.classList.remove('empty');
  }
}

// ── Analysis Engine ───────────────────────────────────────────
function analyzeTranscript(text, spokenSeconds) {
  if (!text) return {wpm:0,fillerCount:0,uniqueRatio:'0.0',score:0,confidence:'0%',highlighted:'',words:[],improvements:[],overusedWords:[]};

  const words = text.toLowerCase().match(/\b\w+\b/g)||[];
  const wordCount=words.length;
  const wpm=Math.round(wordCount/(spokenSeconds/60));

  // Fillers
  const fillerPattern=/\b(um|uh|like|you know|basically|actually|so|right|okay|sort of|kind of|i mean|hmm|err)\b/gi;
  const fillerMatches=text.match(fillerPattern)||[];
  const fillerCount=fillerMatches.length;

  // Unique ratio
  const uniqueRatio=wordCount>0?(new Set(words).size/wordCount*100).toFixed(1):'0.0';

  // === FEATURE 5: Word Repetition Map ===
  const freq={};
  words.forEach(w=>{ if (!STOP_WORDS.has(w)&&w.length>2) freq[w]=(freq[w]||0)+1; });
  const overusedWords=Object.entries(freq).filter(([,c])=>c>=3).sort((a,b)=>b[1]-a[1]).slice(0,5);

  // === FEATURE 4: Confidence Score ===
  const sentences=text.split(/[.!?]+/).filter(s=>s.trim().length>0);
  const completeSentences=sentences.filter(s=>s.trim().split(/\s+/).length>=5).length;
  const confidencePct=sentences.length>0?Math.round((completeSentences/sentences.length)*100):0;
  const confidence=confidencePct+'%';

  // === FEATURE 3: Grammar Error Detection ===
  const grammarRules=[
    {regex:/\bhe don['']t\b/gi,fix:"he doesn't"},
    {regex:/\bshe don['']t\b/gi,fix:"she doesn't"},
    {regex:/\bit don['']t\b/gi,fix:"it doesn't"},
    {regex:/\bi has\b/gi,fix:"I have"},
    {regex:/\bi were\b/gi,fix:"I was"},
    {regex:/\bthey was\b/gi,fix:"they were"},
    {regex:/\bwe was\b/gi,fix:"we were"},
    {regex:/\bdid went\b/gi,fix:"went"},
    {regex:/\bdid came\b/gi,fix:"came"},
    {regex:/\bdid went\b/gi,fix:"went"},
    {regex:/\bmore better\b/gi,fix:"better"},
    {regex:/\bmost biggest\b/gi,fix:"biggest"},
    {regex:/\bdidn['']t went\b/gi,fix:"didn't go"},
    {regex:/\bI am know\b/gi,fix:"I know"},
    {regex:/\bdouble negative: /gi,fix:""},
    {regex:/\bain['']t got no\b/gi,fix:"don't have any"},
  ];
  let grammarErrors=[];
  let highlighted=text;
  // Apply filler highlights
  highlighted=highlighted.replace(fillerPattern,m=>`<span class="filler-word">${m}</span>`);
  // Apply grammar highlights
  grammarRules.forEach(rule=>{
    if (rule.regex.test(text)) {
      const match=text.match(rule.regex);
      if (match) {
        grammarErrors.push({found:match[0],suggestion:rule.fix});
        highlighted=highlighted.replace(rule.regex,m=>`<span class="grammar-error" title="Try: ${rule.fix}">${m}</span>`);
      }
    }
    rule.regex.lastIndex=0;
  });

  // Score
  const rawScore=(wpm*0.4)-(fillerCount*5)+(parseFloat(uniqueRatio)*0.3)+(confidencePct*0.1)-(silenceEvents.length*2);
  const score=Math.min(100,Math.max(0,Math.round(rawScore)));

  // Improvements
  const improvements=[];
  if (wpm>160) improvements.push(`<strong>Pacing:</strong> ${wpm} WPM is quite fast. Slow down to ~130 WPM for a more relaxed tone.`);
  else if (wpm<90) improvements.push(`<strong>Pacing:</strong> ${wpm} WPM is slow. Try to increase your speaking pace a little.`);
  else improvements.push(`<strong>Pacing:</strong> ${wpm} WPM — excellent natural pace! 🎯`);

  if (fillerCount>0) {
    const mf=[...new Set(fillerMatches.map(f=>f.toLowerCase()))];
    improvements.push(`<strong>Fillers:</strong> ${fillerCount} filler word(s) used (e.g., <em>${mf.join(', ')}</em>). Embrace the pause instead.`);
  } else { improvements.push(`<strong>Fillers:</strong> Zero filler words! Excellent discipline. ✅`); }

  if (silenceEvents.length>2) improvements.push(`<strong>Hesitations:</strong> ${silenceEvents.length} long pauses (>2.5s) detected. Practice keeping your thought flowing between sentences.`);
  else if (silenceEvents.length>0) improvements.push(`<strong>Hesitations:</strong> ${silenceEvents.length} pause(s) detected — mostly within acceptable range.`);
  else improvements.push(`<strong>Fluency:</strong> No significant hesitations detected! Very smooth delivery. ✨`);

  if (confidencePct<60&&sentences.length>2) improvements.push(`<strong>Confidence:</strong> ${confidencePct}% of sentences were complete (≥5 words). Aim to speak in fuller sentences.`);
  else improvements.push(`<strong>Confidence:</strong> ${confidencePct}% complete sentences — good structure!`);

  if (parseFloat(uniqueRatio)<40&&wordCount>20) improvements.push(`<strong>Vocabulary:</strong> Only ${uniqueRatio}% unique words. Try using more varied vocabulary.`);

  // Feature 5 — Word repetition
  if (overusedWords.length>0) {
    const wordList=overusedWords.map(([w,c])=>`<span class="word-chip">${w} (${c}×)</span>`).join(' ');
    improvements.push(`<strong>Word Repetition:</strong> Your most repeated words: <div class="word-rep-row">${wordList}</div>`);
  }

  // Grammar
  if (grammarErrors.length>0) {
    const ge=grammarErrors.map(e=>`"${e.found}" → "${e.suggestion}"`).join('; ');
    improvements.push(`<strong>Grammar:</strong> Possible error(s) detected: <em>${ge}</em>. Check highlighted words in orange in your transcript above.`);
  }

  // Simulated AI — weak vocabulary
  const weakWordsList=['good','bad','big','small','things','stuff','nice','very','okay','like','just','thing','really','get','got'];
  const weakUsed=words.filter(w=>weakWordsList.includes(w));
  if (weakUsed.length>3) {
    const uw=[...new Set(weakUsed)];
    improvements.push(`<strong>Lexicon:</strong> Basic words like <em>"${uw.join('", "')}"</em> were overused. Try: "significant", "crucial", "beneficial", "substantial".`);
  }

  // Simulated AI — sentence-start repetition
  const sentStarts=sentences.map(s=>s.trim().split(' ')[0].toLowerCase()).filter(Boolean);
  const startCount={};
  sentStarts.forEach(s=>startCount[s]=(startCount[s]||0)+1);
  const repeatedStart=Object.keys(startCount).find(k=>startCount[k]>2&&['and','so','but','then','because','also'].includes(k));
  if (repeatedStart) improvements.push(`<strong>Structure:</strong> You started ${startCount[repeatedStart]} sentences with "<em>${repeatedStart}</em>". Vary your transitions: "Furthermore", "However", "In addition".`);

  return {wpm,fillerCount,uniqueRatio,score,confidence,highlighted,wordCount,spokenSeconds,improvements,overusedWords};
}

// ── Render Analytics ──────────────────────────────────────────
function renderAnalytics(a) {
  document.getElementById('metric-wpm').textContent=a.wpm;
  document.getElementById('metric-filler').textContent=a.fillerCount;
  document.getElementById('metric-unique').textContent=a.uniqueRatio+'%';
  document.getElementById('metric-score').textContent=a.score+'/100';
  document.getElementById('metric-confidence').textContent=a.confidence;

  // AI Feedback box
  const aiBox=document.getElementById('ai-feedback-box');
  if (a.improvements&&a.improvements.length) {
    aiBox.innerHTML=`<h4><i class="fa-solid fa-wand-magic-sparkles"></i> AI Deep Analysis</h4>
      <div>${a.improvements.map(i=>`<div class="feedback-item">${i}</div>`).join('')}</div>`;
    aiBox.style.display='block';
  } else { aiBox.style.display='none'; }

  // Pacing chart
  const pw=document.getElementById('pacing-chart-wrap');
  if (pacingData.length>0) { pw.style.display='block'; renderPacingChart(); }
  else { pw.style.display='none'; }

  analyticsCard.classList.add('visible');
}

function renderPacingChart() {
  const ctx=document.getElementById('pacingChart').getContext('2d');
  const labels=pacingData.map((_,i)=>`${(i+1)*5}s`);
  if (pacingChartInstance) {
    pacingChartInstance.data.labels=labels;
    pacingChartInstance.data.datasets[0].data=pacingData;
    pacingChartInstance.update(); return;
  }
  const tc=getComputedStyle(document.documentElement).getPropertyValue('--text-secondary').trim()||'#8a9bc0';
  pacingChartInstance=new Chart(ctx,{
    type:'line',data:{labels,datasets:[{label:'WPM',data:pacingData,borderColor:'#4f8eff',backgroundColor:'rgba(79,142,255,0.1)',borderWidth:2,tension:0.4,fill:true,pointBackgroundColor:'#4f8eff'}]},
    options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{y:{beginAtZero:true,ticks:{color:tc,font:{family:'DM Sans'}},grid:{color:'rgba(255,255,255,0.05)'}},x:{ticks:{color:tc,font:{family:'DM Sans'}},grid:{display:false}}}}
  });
}

// ── Read Aloud Mode ───────────────────────────────────────────
function loadReadPassage() {
  currentReadPassage=readPassages[Math.floor(Math.random()*readPassages.length)];
  readWords=currentReadPassage.split(/\s+/);
  readWordIndex=0; readCorrect=0;
  const el=document.getElementById('read-aloud-text');
  el.innerHTML=readWords.map((w,i)=>`<span class="read-word" id="rw${i}">${w}</span>`).join(' ');
  document.getElementById('read-accuracy-fill').style.width='0%';
  document.getElementById('read-accuracy-pct').textContent='—';
  document.getElementById('btn-read-start').style.display='';
  document.getElementById('btn-read-stop').style.display='none';
}
let currentReadPassage='';

function startReadAloud() {
  if (isRecording) return;
  readWordIndex=0; readCorrect=0;
  readWords.forEach((_,i)=>{ const el=document.getElementById('rw'+i); if(el)el.className='read-word'; });
  if (readWordIndex<readWords.length) { const el=document.getElementById('rw0'); if(el)el.classList.add('current'); }
  document.getElementById('btn-read-start').style.display='none';
  document.getElementById('btn-read-stop').style.display='';
  const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
  readRecognition=new SR(); readRecognition.continuous=true; readRecognition.interimResults=true; readRecognition.lang='en-IN';
  readRecognition.onresult=(event)=>{
    let spoken='';
    for(let i=event.resultIndex;i<event.results.length;i++){
      if(event.results[i].isFinal) spoken+=event.results[i][0].transcript+' ';
    }
    if (!spoken.trim()) return;
    const spokenWords=spoken.trim().toLowerCase().replace(/[.,!?;:]/g,'').split(/\s+/);
    spokenWords.forEach(sw=>{
      if (readWordIndex>=readWords.length) return;
      const expected=readWords[readWordIndex].toLowerCase().replace(/[.,!?;:]/g,'');
      const el=document.getElementById('rw'+readWordIndex);
      if (sw===expected||levenshteinMatch(sw,expected)) {
        if(el){el.classList.remove('current');el.classList.add('correct');}
        readCorrect++;
      } else {
        if(el){el.classList.remove('current');el.classList.add('missed');}
      }
      readWordIndex++;
      if (readWordIndex<readWords.length){const nextEl=document.getElementById('rw'+readWordIndex);if(nextEl)nextEl.classList.add('current');}
    });
    const acc=readWords.length>0?Math.round((readCorrect/Math.min(readWordIndex,readWords.length))*100):0;
    document.getElementById('read-accuracy-fill').style.width=acc+'%';
    document.getElementById('read-accuracy-pct').textContent=acc+'%';
    if (readWordIndex>=readWords.length) stopReadAloud();
  };
  readRecognition.onerror=()=>stopReadAloud();
  readRecognition.onend=()=>{ if(readWordIndex<readWords.length) { try{readRecognition.start();}catch(e){} } };
  try{readRecognition.start();}catch(e){}
}

function stopReadAloud() {
  if (readRecognition) { try{readRecognition.stop();}catch(e){} readRecognition=null; }
  document.getElementById('btn-read-start').style.display='';
  document.getElementById('btn-read-stop').style.display='none';
  readWords.forEach((_,i)=>{ const el=document.getElementById('rw'+i); if(el)el.classList.remove('current'); });
}

function levenshteinMatch(a,b) {
  if (Math.abs(a.length-b.length)>2) return false;
  let d=0;for(let i=0;i<Math.min(a.length,b.length);i++){if(a[i]!==b[i])d++;}
  return d<=1;
}

// ── Shadowing Mode ────────────────────────────────────────────
function loadShadowSentence() {
  currentShadowSentence=shadowSentences[Math.floor(Math.random()*shadowSentences.length)];
  document.getElementById('shadow-sentence').textContent=currentShadowSentence;
  document.getElementById('shadow-score-box').style.display='none';
  document.getElementById('btn-shadow-record').className='btn-shadow';
  document.getElementById('btn-shadow-record').innerHTML='<i class="fa-solid fa-microphone"></i> Shadow';
  isShadowing=false;
}

function playShadowSentence() {
  if (!window.speechSynthesis) { showToast('Text-to-speech not supported.'); return; }
  window.speechSynthesis.cancel();
  const utt=new SpeechSynthesisUtterance(currentShadowSentence);
  utt.lang='en-US'; utt.rate=0.9; utt.pitch=1.0;
  // Prefer a natural voice
  const voices=window.speechSynthesis.getVoices();
  const preferred=voices.find(v=>v.lang.startsWith('en')&&v.localService);
  if (preferred) utt.voice=preferred;
  window.speechSynthesis.speak(utt);
}

function startShadowing() {
  if (isShadowing) { stopShadowing(); return; }
  isShadowing=true;
  const btn=document.getElementById('btn-shadow-record');
  btn.className='btn-shadow listening';
  btn.innerHTML='<i class="fa-solid fa-stop"></i> Stop';
  document.getElementById('shadow-score-box').style.display='none';
  const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
  shadowRecognition=new SR(); shadowRecognition.continuous=false; shadowRecognition.interimResults=false; shadowRecognition.lang='en-IN';
  shadowRecognition.onresult=(event)=>{
    const spoken=event.results[0][0].transcript;
    scoreShadowing(spoken);
  };
  shadowRecognition.onerror=()=>stopShadowing();
  shadowRecognition.onend=()=>{ if(isShadowing) stopShadowing(); };
  try{shadowRecognition.start();}catch(e){stopShadowing();}
}

function stopShadowing() {
  isShadowing=false;
  if (shadowRecognition){try{shadowRecognition.stop();}catch(e){}}
  const btn=document.getElementById('btn-shadow-record');
  btn.className='btn-shadow';
  btn.innerHTML='<i class="fa-solid fa-microphone"></i> Shadow';
}

function scoreShadowing(spoken) {
  stopShadowing();
  const refWords=currentShadowSentence.toLowerCase().replace(/[.,!?;:]/g,'').split(/\s+/);
  const spkWords=spoken.toLowerCase().replace(/[.,!?;:]/g,'').split(/\s+/);
  let matched=0;
  const refMapped=refWords.map((rw,i)=>{
    const spk=spkWords[i]||'';
    const isMatch=spk===rw||levenshteinMatch(spk,rw);
    if(isMatch) matched++;
    return `<span class="shadow-word ${isMatch?'match':'miss'}">${rw}</span>`;
  });
  const acc=Math.round((matched/refWords.length)*100);
  document.getElementById('shadow-score-val').textContent=acc+'%';
  document.getElementById('shadow-word-diff').innerHTML=refMapped.join(' ');
  document.getElementById('shadow-score-box').style.display='block';
}

// ── Mode Toggle (collapsible panels) ─────────────────────────
function toggleMode(id) {
  const body=document.getElementById(id+'-body');
  const toggle=document.getElementById(id+'-toggle');
  body.classList.toggle('open');
  toggle.classList.toggle('open');
}

// ── Streak ────────────────────────────────────────────────────
function getStreak(){return parseInt(localStorage.getItem('spokenai_streak')||'0');}
function updateStreak(){
  const today=new Date().toDateString(), lastDate=localStorage.getItem('spokenai_lastDate');
  let streak=getStreak();
  if(lastDate===today){}
  else if(lastDate===new Date(Date.now()-86400000).toDateString()){streak++;localStorage.setItem('spokenai_streak',streak);localStorage.setItem('spokenai_lastDate',today);}
  else{streak=1;localStorage.setItem('spokenai_streak',streak);localStorage.setItem('spokenai_lastDate',today);}
  document.getElementById('streak-count').textContent=streak;
}

// ── Session Persistence ───────────────────────────────────────
function saveSession(analysis){
  if (!finalTranscript.trim()) return;
  const history=JSON.parse(localStorage.getItem('spokenai_history')||'[]');
  history.unshift({date:new Date().toISOString(),prompt:currentPrompt,wpm:analysis.wpm,fillers:analysis.fillerCount,score:analysis.score,confidence:analysis.confidence,improvements:analysis.improvements});
  localStorage.setItem('spokenai_history',JSON.stringify(history.slice(0,10)));
}

// ── Render History ────────────────────────────────────────────
function renderHistory(){
  const history=JSON.parse(localStorage.getItem('spokenai_history')||'[]');
  const container=document.getElementById('history-items-container');
  const chartWrap=document.getElementById('history-chart-wrap');
  if(!history.length){container.innerHTML='<div class="history-empty">No sessions yet. Complete a practice to see your history.</div>';chartWrap.style.display='none';return;}
  chartWrap.style.display='block';
  renderChart(history);
  container.innerHTML=history.slice(0,3).map(s=>{
    const d=new Date(s.date);
    const ds=d.toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'});
    const ts=d.toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'});
    const imps=(s.improvements||[]).slice(0,3).map(i=>`<div class="session-improvement">${i}</div>`).join('');
    return `<div class="session-item"><div class="session-meta"><span class="session-date">${ds} · ${ts}</span><div class="session-stats"><span class="stat-chip" style="background:rgba(162,89,255,0.12);color:var(--accent2)">${s.score}/100</span>${s.confidence?`<span class="stat-chip" style="background:rgba(255,179,71,0.1);color:var(--warn)">${s.confidence} conf</span>`:''}</div></div><div class="session-prompt">"${s.prompt}"</div><div style="margin-top:0.4rem">${imps}</div></div>`;
  }).join('');
}

function renderChart(history){
  const ctx=document.getElementById('fluencyChart').getContext('2d');
  const cd=[...history].reverse().slice(-10);
  const labels=cd.map((_,i)=>`S${i+1}`);
  const scores=cd.map(s=>s.score);
  if(chartInstance){chartInstance.data.labels=labels;chartInstance.data.datasets[0].data=scores;chartInstance.update();return;}
  const tc=getComputedStyle(document.documentElement).getPropertyValue('--text-secondary').trim()||'#8a9bc0';
  chartInstance=new Chart(ctx,{type:'line',data:{labels,datasets:[{label:'Fluency Score',data:scores,borderColor:'#00e5c0',backgroundColor:'rgba(0,229,192,0.1)',borderWidth:2,tension:0.3,fill:true,pointBackgroundColor:'#00e5c0'}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{y:{min:0,max:100,ticks:{color:tc,font:{family:'DM Sans'}},grid:{color:'rgba(255,255,255,0.05)'}},x:{ticks:{color:tc,font:{family:'DM Sans'}},grid:{display:false}}}}});
}

function toggleHistory(){
  document.getElementById('history-body').classList.toggle('open');
  document.getElementById('history-toggle').classList.toggle('open');
}

// ── Tip Rotation ──────────────────────────────────────────────
function rotateTip(){ tipIndex=(tipIndex+1)%tips.length; tipEl.innerHTML=tips[tipIndex]; }

// ── Feature 9: Export / Share Progress Card ───────────────────
function exportProgressCard(){
  if (!lastAnalytics) { showToast('Complete a session first!'); return; }
  const canvas=document.createElement('canvas');
  canvas.width=640; canvas.height=340;
  const ctx=canvas.getContext('2d');

  // Background
  const grad=ctx.createLinearGradient(0,0,640,340);
  grad.addColorStop(0,'#060b18'); grad.addColorStop(1,'#0d1529');
  ctx.fillStyle=grad; ctx.fillRect(0,0,640,340);

  // Accent border
  ctx.strokeStyle='rgba(79,142,255,0.4)'; ctx.lineWidth=2;
  ctx.strokeRect(1,1,638,338);

  // Logo text
  ctx.font='bold 22px serif'; ctx.fillStyle='#f0f4ff'; ctx.fillText('Spoken',24,48);
  ctx.fillStyle='#4f8eff'; ctx.fillText('.ai',100,48);
  ctx.font='13px serif'; ctx.fillStyle='#8a9bc0'; ctx.fillText('Fluency Coach', 24,68);

  // Score big
  ctx.font='bold 80px serif'; ctx.fillStyle='#a259ff'; ctx.fillText(lastAnalytics.score, 480, 100);
  ctx.font='13px serif'; ctx.fillStyle='#8a9bc0'; ctx.fillText('/100 Score', 490, 118);

  // Metrics row
  const metrics=[
    {label:'WPM',val:lastAnalytics.wpm,color:'#4f8eff'},
    {label:'Fillers',val:lastAnalytics.fillerCount,color:'#ff5f7e'},
    {label:'Unique',val:lastAnalytics.uniqueRatio+'%',color:'#00e5c0'},
    {label:'Confidence',val:lastAnalytics.confidence,color:'#ffb347'},
  ];
  metrics.forEach((m,i)=>{
    const x=24+(i*140),y=130;
    ctx.fillStyle=m.color; ctx.font='bold 28px serif'; ctx.fillText(m.val,x,y+40);
    ctx.fillStyle='#8a9bc0'; ctx.font='12px serif'; ctx.fillText(m.label,x,y+58);
  });

  // Progress trend
  const hist=JSON.parse(localStorage.getItem('spokenai_history')||'[]').slice(0,5).reverse();
  if (hist.length>1){
    ctx.strokeStyle='#00e5c0'; ctx.lineWidth=2;
    ctx.beginPath();
    hist.forEach((s,i)=>{
      const x=24+i*66, y=240-((s.score/100)*60);
      if(i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
      ctx.fillStyle='#00e5c0'; ctx.beginPath(); ctx.arc(x,y,4,0,Math.PI*2); ctx.fill();
      ctx.beginPath();
    });
    ctx.stroke();
    ctx.font='11px serif'; ctx.fillStyle='#4a5a7a'; ctx.fillText('Score Trend (last 5 sessions)',24,210);
  }

  // Prompt snippet
  ctx.font='italic 12px serif'; ctx.fillStyle='#4a5a7a';
  const promptSnip=currentPrompt.length>80?currentPrompt.slice(0,77)+'…':currentPrompt;
  ctx.fillText('"'+promptSnip+'"',24,300);

  // Date
  ctx.font='11px serif'; ctx.fillStyle='#4a5a7a';
  ctx.fillText(new Date().toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'}),24,320);

  // Download the card
  canvas.toBlob(blob=>{
    const url=URL.createObjectURL(blob);
    const a=document.createElement('a'); a.href=url; a.download='spoken-ai-progress.png'; a.click();
    URL.revokeObjectURL(url);
    // Try Web Share API for mobile
    if (navigator.share&&navigator.canShare&&navigator.canShare({files:[new File([blob],'progress.png',{type:'image/png'})]})){
      navigator.share({title:'My Spoken.ai Progress',text:`I scored ${lastAnalytics.score}/100 on Spoken.ai!`,files:[new File([blob],'progress.png',{type:'image/png'})]}).catch(()=>{});
    }
  },'image/png');
}

// ── Download Report ───────────────────────────────────────────
function downloadReport(){
  if (!lastAnalytics) return;
  const content=[
    '# Spoken.ai — Session Report',`Date: ${new Date().toLocaleString('en-IN')}`,
    '','## Prompt',currentPrompt,
    '','## Transcript',finalTranscript.trim()||'(no speech detected)',
    '','## Analytics',
    `Words Per Minute  : ${lastAnalytics.wpm}`,
    `Filler Words      : ${lastAnalytics.fillerCount}`,
    `Unique Word Ratio : ${lastAnalytics.uniqueRatio}%`,
    `Fluency Score     : ${lastAnalytics.score}/100`,
    `Confidence Score  : ${lastAnalytics.confidence}`,
    `Hesitation Events : ${silenceEvents.length}`,
    `Duration Spoken   : ${lastAnalytics.spokenSeconds}s`,
    `Word Count        : ${lastAnalytics.wordCount}`,
    '','## Improvements',
    ...(lastAnalytics.improvements||[]).map(i=>i.replace(/<[^>]*>/g,'')),
    '','---','Generated by Spoken.ai',
  ].join('\n');
  const blob=new Blob([content],{type:'text/markdown'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a'); a.href=url;
  a.download=`spoken-ai-report-${Date.now()}.md`; a.click(); URL.revokeObjectURL(url);
}

// ── Toast ─────────────────────────────────────────────────────
function showToast(msg,type='error'){
  const t=document.getElementById('toast');
  t.textContent=msg;
  t.className='toast show'+(type==='success'?' success':'');
  setTimeout(()=>t.classList.remove('show'),3500);
}

// ── Confetti ──────────────────────────────────────────────────
function launchConfetti(){
  const canvas=document.getElementById('confetti-canvas'),ctx=canvas.getContext('2d');
  canvas.width=window.innerWidth; canvas.height=window.innerHeight;
  const colors=['#4f8eff','#a259ff','#00e5c0','#ffb347','#ff5f7e','#fff'];
  const particles=Array.from({length:120},()=>({x:Math.random()*canvas.width,y:-20,r:Math.random()*5+3,d:Math.random()*6+2,c:colors[Math.floor(Math.random()*colors.length)],tilt:Math.random()*20-10,tiltInc:(Math.random()*0.07)+0.05,angle:0}));
  let frame=0;
  function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particles.forEach(p=>{p.angle+=p.tiltInc;p.y+=p.d;p.tilt=Math.sin(p.angle)*15;ctx.beginPath();ctx.lineWidth=p.r;ctx.strokeStyle=p.c;ctx.moveTo(p.x+p.tilt+p.r/3,p.y);ctx.lineTo(p.x+p.tilt,p.y+p.tilt+p.r/5);ctx.stroke();});
    frame++;
    if(frame<180)requestAnimationFrame(draw); else ctx.clearRect(0,0,canvas.width,canvas.height);
  }
  draw();
}

// ── Boot ──────────────────────────────────────────────────────
init();
