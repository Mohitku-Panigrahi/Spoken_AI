/* ═══════════════════════════════════════════════════════════════════
   SPOKEN.AI — MASTER APPLICATION CONTROLLER
   Event Wiring · Mode Coordination · UI State Management
═══════════════════════════════════════════════════════════════════ */

import { promptsData, dailyPrompts, readPassages, shadowSentences, pronunciationTips } from './data.js';
import { SpeechManager } from './speech.js';
import { AudioEngine } from './audio.js';
import { AnalysisEngine } from './analysis.js';
import { StorageManager } from './storage.js';

class SpokenApp {
  constructor() {
    this.speechManager = new SpeechManager();
    this.audioEngine = new AudioEngine();
    this.analysisEngine = new AnalysisEngine();

    this.currentPrompt = null;
    this.selectedDuration = 60;
    this.timeRemaining = 60;
    this.timerInterval = null;
    this.isSessionActive = false;
    this.currentMode = 'prompts'; // 'prompts' | 'read' | 'shadow'
    this.readPassageIndex = 0;
    this.shadowIndex = 0;
    this.tipIndex = 0;
    this.webcamStream = null;

    this.cacheDOMElements();
    this.init();
  }

  cacheDOMElements() {
    this.dom = {
      themeToggle: document.getElementById('theme-toggle'),
      streakVal: document.getElementById('streak-val'),
      tipBanner: document.getElementById('tip-banner'),
      mirrorBtn: document.getElementById('mirror-btn'),
      mirrorWrap: document.getElementById('mirror-wrap'),
      mirrorVideo: document.getElementById('mirror-video'),
      
      // Tabs
      tabPrompts: document.getElementById('tab-prompts'),
      tabRead: document.getElementById('tab-read'),
      tabShadow: document.getElementById('tab-shadow'),
      
      // Cards
      mainCard: document.getElementById('main-card'),
      readCard: document.getElementById('read-card'),
      shadowCard: document.getElementById('shadow-card'),
      
      // Prompt Section
      promptText: document.getElementById('prompt-text'),
      levelBadge: document.getElementById('level-badge'),
      keywordsRack: document.getElementById('keywords-rack'),
      categorySelect: document.getElementById('category-select'),
      btnNewTopic: document.getElementById('btn-new-topic'),
      btnDailyTopic: document.getElementById('btn-daily-topic'),
      btnCustomTopic: document.getElementById('btn-custom-topic'),
      customPromptWrap: document.getElementById('custom-prompt-wrap'),
      customPromptInput: document.getElementById('custom-prompt-input'),
      btnApplyCustom: document.getElementById('btn-apply-custom'),
      
      // Timer & Controls
      durationBtns: document.querySelectorAll('.duration-btn'),
      timerSvgFill: document.getElementById('timer-svg-fill'),
      timerDisplay: document.getElementById('timer-display'),
      btnMic: document.getElementById('btn-mic'),
      btnPause: document.getElementById('btn-pause'),
      btnFinish: document.getElementById('btn-finish'),
      micStatus: document.getElementById('mic-status'),
      waveformCanvasWrap: document.getElementById('waveform-canvas-wrap'),
      waveformCanvas: document.getElementById('waveform-canvas'),
      
      // Audio Playback
      audioPlaybackBar: document.getElementById('audio-playback-bar'),
      playbackPlayBtn: document.getElementById('playback-play-btn'),
      playbackScrubber: document.getElementById('playback-scrubber'),
      playbackTime: document.getElementById('playback-time'),
      playbackDownloadBtn: document.getElementById('playback-download-btn'),
      
      // Transcript & Analytics
      transcriptBody: document.getElementById('transcript-body'),
      analyticsCard: document.getElementById('analytics-card'),
      metricWpm: document.getElementById('metric-wpm'),
      metricFillers: document.getElementById('metric-fillers'),
      metricScore: document.getElementById('metric-score'),
      metricCefr: document.getElementById('metric-cefr'),
      
      // Intelligent Feedback
      feedbackOriginal: document.getElementById('feedback-original'),
      feedbackSuggested: document.getElementById('feedback-suggested'),
      feedbackReasons: document.getElementById('feedback-reasons'),
      btnPracticeAgain: document.getElementById('btn-practice-again'),
      
      // Secondary Modes
      readPassageBox: document.getElementById('read-passage-box'),
      readProgressFill: document.getElementById('read-progress-fill'),
      readAccuracyVal: document.getElementById('read-accuracy-val'),
      btnNextPassage: document.getElementById('btn-next-passage'),
      
      shadowSentenceText: document.getElementById('shadow-sentence-text'),
      btnListenModel: document.getElementById('btn-listen-model'),
      btnNextShadow: document.getElementById('btn-next-shadow'),
      shadowScoreVal: document.getElementById('shadow-score-val'),
      
      // History
      historyList: document.getElementById('history-list'),
      btnClearHistory: document.getElementById('btn-clear-history'),
      
      // Toast
      toast: document.getElementById('toast')
    };
  }

  init() {
    this.bindEvents();
    this.audioEngine.setupVisualizer(this.dom.waveformCanvas);
    this.audioEngine.setupAudioPlayerUI({
      container: this.dom.audioPlaybackBar,
      playBtn: this.dom.playbackPlayBtn,
      scrubber: this.dom.playbackScrubber,
      timeDisplay: this.dom.playbackTime,
      downloadBtn: this.dom.playbackDownloadBtn
    });

    this.speechManager.onTranscriptUpdate = (finalText, interimText) => {
      this.handleTranscriptUpdate(finalText, interimText);
    };

    this.speechManager.onError = (err) => {
      this.showToast(`Microphone notice: ${err}`);
    };

    this.loadNewPrompt();
    this.rotateTip();
    this.updateStreakDisplay();
    this.renderHistory();
  }

  bindEvents() {
    // Theme toggle
    if (this.dom.themeToggle) {
      this.dom.themeToggle.onclick = () => {
        document.body.classList.toggle('light-mode');
        const isLight = document.body.classList.contains('light-mode');
        this.dom.themeToggle.innerHTML = isLight ? '<i class="fa-solid fa-moon"></i>' : '<i class="fa-solid fa-sun"></i>';
      };
    }

    // Mirror toggle
    if (this.dom.mirrorBtn) {
      this.dom.mirrorBtn.onclick = () => this.toggleMirrorMode();
    }

    // Tab Navigation
    if (this.dom.tabPrompts) this.dom.tabPrompts.onclick = () => this.switchMode('prompts');
    if (this.dom.tabRead) this.dom.tabRead.onclick = () => this.switchMode('read');
    if (this.dom.tabShadow) this.dom.tabShadow.onclick = () => this.switchMode('shadow');

    // Prompts controls
    if (this.dom.btnNewTopic) this.dom.btnNewTopic.onclick = () => this.loadNewPrompt();
    if (this.dom.btnDailyTopic) this.dom.btnDailyTopic.onclick = () => this.loadDailyPrompt();
    if (this.dom.categorySelect) this.dom.categorySelect.onchange = () => this.loadNewPrompt();

    if (this.dom.btnCustomTopic) {
      this.dom.btnCustomTopic.onclick = () => {
        this.dom.customPromptWrap.classList.toggle('active');
        if (this.dom.customPromptWrap.classList.contains('active')) {
          this.dom.customPromptInput.focus();
        }
      };
    }

    if (this.dom.btnApplyCustom) {
      this.dom.btnApplyCustom.onclick = () => {
        const val = this.dom.customPromptInput.value.trim();
        if (val) {
          this.currentPrompt = { text: val, category: 'Custom', level: 2, keywords: [] };
          this.renderPrompt();
          this.dom.customPromptWrap.classList.remove('active');
          this.dom.customPromptInput.value = '';
          this.showToast('Custom prompt applied!');
        }
      };
    }

    // Tip rotation
    if (this.dom.tipBanner) {
      this.dom.tipBanner.onclick = () => this.rotateTip();
    }

    // Duration buttons
    this.dom.durationBtns.forEach(btn => {
      btn.onclick = () => {
        if (this.isSessionActive) return;
        this.dom.durationBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.selectedDuration = parseInt(btn.dataset.sec, 10);
        this.timeRemaining = this.selectedDuration;
        this.updateTimerDisplay();
      };
    });

    // Recording controls
    if (this.dom.btnMic) this.dom.btnMic.onclick = () => this.toggleRecording();
    if (this.dom.btnPause) this.dom.btnPause.onclick = () => this.pauseSession();
    if (this.dom.btnFinish) this.dom.btnFinish.onclick = () => this.finishSession();

    // Practice Again / Retry loop
    if (this.dom.btnPracticeAgain) {
      this.dom.btnPracticeAgain.onclick = () => {
        this.dom.analyticsCard.classList.remove('visible');
        this.dom.audioPlaybackBar.classList.remove('visible');
        this.resetTimer();
        this.toggleRecording();
        this.showToast('Re-speaking prompt — apply the suggested improvements!');
      };
    }

    // Read Aloud mode controls
    if (this.dom.btnNextPassage) {
      this.dom.btnNextPassage.onclick = () => {
        this.readPassageIndex = (this.readPassageIndex + 1) % readPassages.length;
        this.renderReadPassage();
      };
    }

    // Shadowing mode controls
    if (this.dom.btnListenModel) {
      this.dom.btnListenModel.onclick = () => this.speakModelShadowSentence();
    }
    if (this.dom.btnNextShadow) {
      this.dom.btnNextShadow.onclick = () => {
        this.shadowIndex = (this.shadowIndex + 1) % shadowSentences.length;
        this.renderShadowSentence();
      };
    }

    // History controls
    if (this.dom.btnClearHistory) {
      this.dom.btnClearHistory.onclick = () => {
        StorageManager.clearAll();
        this.renderHistory();
        this.updateStreakDisplay();
        this.showToast('Session history reset.');
      };
    }
  }

  switchMode(mode) {
    if (this.isSessionActive) this.finishSession();
    this.currentMode = mode;

    [this.dom.tabPrompts, this.dom.tabRead, this.dom.tabShadow].forEach(t => t && t.classList.remove('active'));
    [this.dom.mainCard, this.dom.readCard, this.dom.shadowCard].forEach(c => c && c.classList.remove('visible'));

    if (mode === 'prompts') {
      this.dom.tabPrompts.classList.add('active');
      this.dom.mainCard.classList.add('visible');
    } else if (mode === 'read') {
      this.dom.tabRead.classList.add('active');
      this.dom.readCard.classList.add('visible');
      this.renderReadPassage();
    } else if (mode === 'shadow') {
      this.dom.tabShadow.classList.add('active');
      this.dom.shadowCard.classList.add('visible');
      this.renderShadowSentence();
    }
  }

  loadNewPrompt() {
    const selectedCat = this.dom.categorySelect ? this.dom.categorySelect.value : 'All';
    let filtered = promptsData;
    if (selectedCat !== 'All') {
      filtered = promptsData.filter(p => p.category === selectedCat);
    }
    if (!filtered.length) filtered = promptsData;
    this.currentPrompt = filtered[Math.floor(Math.random() * filtered.length)];
    this.renderPrompt();
  }

  loadDailyPrompt() {
    const day = new Date().getDate();
    const promptText = dailyPrompts[day % dailyPrompts.length];
    this.currentPrompt = { text: promptText, category: 'Daily', level: 2, keywords: [] };
    this.renderPrompt();
    this.showToast("Today's Daily Challenge Loaded!");
  }

  renderPrompt() {
    if (!this.currentPrompt) return;
    this.dom.promptText.textContent = this.currentPrompt.text;
    if (this.dom.levelBadge) this.dom.levelBadge.textContent = `Lvl ${this.currentPrompt.level || 1} · ${this.currentPrompt.category}`;

    if (this.dom.keywordsRack) {
      this.dom.keywordsRack.innerHTML = '';
      (this.currentPrompt.keywords || []).forEach(kw => {
        const chip = document.createElement('div');
        chip.className = 'keyword-chip';
        chip.id = `kw-${kw.toLowerCase()}`;
        chip.innerHTML = `<i class="fa-solid fa-bullseye"></i> ${kw}`;
        this.dom.keywordsRack.appendChild(chip);
      });
    }
  }

  rotateTip() {
    if (!this.dom.tipBanner) return;
    this.tipIndex = (this.tipIndex + 1) % pronunciationTips.length;
    this.dom.tipBanner.innerHTML = `<i class="fa-solid fa-lightbulb" style="color:var(--warn)"></i> <span>${pronunciationTips[this.tipIndex]}</span>`;
  }

  async toggleMirrorMode() {
    if (!this.webcamStream) {
      try {
        this.webcamStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        this.dom.mirrorVideo.srcObject = this.webcamStream;
        this.dom.mirrorWrap.classList.add('active');
        this.dom.mirrorBtn.classList.add('active');
        this.showToast('Mirror Mode Active (Webcam PiP)');
      } catch {
        this.showToast('Camera access denied or unavailable.');
      }
    } else {
      this.webcamStream.getTracks().forEach(t => t.stop());
      this.webcamStream = null;
      this.dom.mirrorWrap.classList.remove('active');
      this.dom.mirrorBtn.classList.remove('active');
      this.showToast('Mirror Mode Off');
    }
  }

  async toggleRecording() {
    if (!this.speechManager.isSupported()) {
      this.showToast('Web Speech API is not supported in this browser. Please use Chrome or Edge.');
      return;
    }

    if (!this.isSessionActive) {
      // Start Session
      this.isSessionActive = true;
      this.timeRemaining = this.selectedDuration;
      this.updateTimerDisplay();

      this.dom.btnMic.classList.add('recording');
      this.dom.btnMic.innerHTML = '<i class="fa-solid fa-microphone-lines"></i>';
      this.dom.btnPause.classList.add('active');
      this.dom.btnFinish.classList.add('active');
      this.dom.micStatus.textContent = 'Listening… speak clearly into your mic';
      this.dom.micStatus.className = 'mic-status active';
      this.dom.waveformCanvasWrap.classList.add('active');
      this.dom.transcriptBody.className = 'transcript-body';
      this.dom.transcriptBody.textContent = '…';
      this.dom.analyticsCard.classList.remove('visible');
      this.dom.audioPlaybackBar.classList.remove('visible');

      this.speechManager.start();
      await this.audioEngine.startRecording();
      this.startTimer();
    } else {
      // Toggle Finish
      this.finishSession();
    }
  }

  pauseSession() {
    if (!this.isSessionActive) return;
    if (this.speechManager.isPaused) {
      this.speechManager.resume();
      this.startTimer();
      this.dom.btnMic.classList.remove('paused');
      this.dom.btnMic.classList.add('recording');
      this.dom.btnPause.innerHTML = '<i class="fa-solid fa-pause"></i>';
      this.dom.micStatus.textContent = 'Listening…';
      this.dom.micStatus.className = 'mic-status active';
    } else {
      this.speechManager.pause();
      clearInterval(this.timerInterval);
      this.dom.btnMic.classList.remove('recording');
      this.dom.btnMic.classList.add('paused');
      this.dom.btnPause.innerHTML = '<i class="fa-solid fa-play"></i>';
      this.dom.micStatus.textContent = 'Paused';
      this.dom.micStatus.className = 'mic-status paused';
    }
  }

  startTimer() {
    clearInterval(this.timerInterval);
    const total = this.selectedDuration;
    const circumference = 2 * Math.PI * 45; // r=45

    this.timerInterval = setInterval(() => {
      this.timeRemaining--;
      this.updateTimerDisplay();

      // Stroke dashoffset
      const fraction = this.timeRemaining / total;
      const offset = circumference * (1 - fraction);
      if (this.dom.timerSvgFill) {
        this.dom.timerSvgFill.style.strokeDashoffset = offset;
        // Shift color
        if (fraction < 0.25) {
          this.dom.timerSvgFill.style.stroke = 'var(--danger)';
        } else if (fraction < 0.5) {
          this.dom.timerSvgFill.style.stroke = 'var(--warn)';
        } else {
          this.dom.timerSvgFill.style.stroke = 'var(--accent3)';
        }
      }

      if (this.timeRemaining <= 0) {
        this.finishSession();
      }
    }, 1000);
  }

  updateTimerDisplay() {
    const m = Math.floor(this.timeRemaining / 60);
    const s = (this.timeRemaining % 60).toString().padStart(2, '0');
    if (this.dom.timerDisplay) this.dom.timerDisplay.textContent = `${m}:${s}`;
  }

  resetTimer() {
    clearInterval(this.timerInterval);
    this.timeRemaining = this.selectedDuration;
    this.updateTimerDisplay();
    if (this.dom.timerSvgFill) {
      this.dom.timerSvgFill.style.strokeDashoffset = 0;
      this.dom.timerSvgFill.style.stroke = 'var(--accent3)';
    }
  }

  handleTranscriptUpdate(finalText, interimText) {
    const fullText = (finalText + ' ' + interimText).trim();
    if (!fullText) return;

    // Render highlighted transcript
    this.dom.transcriptBody.innerHTML = fullText;

    // Check Keywords in real-time
    if (this.currentPrompt && this.currentPrompt.keywords) {
      const lower = fullText.toLowerCase();
      this.currentPrompt.keywords.forEach(kw => {
        const el = document.getElementById(`kw-${kw.toLowerCase()}`);
        if (el) {
          if (lower.includes(kw.toLowerCase())) {
            el.className = 'keyword-chip found';
            el.innerHTML = `<i class="fa-solid fa-check"></i> ${kw}`;
          }
        }
      });
    }

    // If in Read Aloud mode, track word matching
    if (this.currentMode === 'read') {
      this.evaluateReadAloudProgress(fullText);
    }
  }

  async finishSession() {
    if (!this.isSessionActive) return;
    this.isSessionActive = false;
    clearInterval(this.timerInterval);

    // Stop Speech & Audio
    const transcript = this.speechManager.stop();
    const recordedAudio = await this.audioEngine.stopRecording();

    // Reset Controls UI
    this.dom.btnMic.classList.remove('recording', 'paused');
    this.dom.btnMic.innerHTML = '<i class="fa-solid fa-microphone"></i>';
    this.dom.btnPause.classList.remove('active');
    this.dom.btnFinish.classList.remove('active');
    this.dom.micStatus.textContent = 'Session complete';
    this.dom.micStatus.className = 'mic-status';
    this.dom.waveformCanvasWrap.classList.remove('active');

    // Show recorded audio player
    if (recordedAudio && recordedAudio.url) {
      this.dom.audioPlaybackBar.classList.add('visible');
    }

    // Run Analysis
    const elapsedSeconds = this.selectedDuration - this.timeRemaining;
    const analysis = this.analysisEngine.analyzeSession(transcript, Math.max(elapsedSeconds, 5), this.currentPrompt);

    // Render Metrics
    this.dom.metricWpm.textContent = analysis.wpm || '—';
    this.dom.metricFillers.textContent = analysis.fillerCount;
    this.dom.metricScore.textContent = `${analysis.fluencyScore}/100`;
    this.dom.metricCefr.textContent = analysis.vocabComplexityRating;

    // Render Intelligent Feedback
    this.dom.feedbackOriginal.textContent = analysis.originalAnswer || 'No words detected.';
    this.dom.feedbackSuggested.textContent = analysis.suggestedImprovement;

    this.dom.feedbackReasons.innerHTML = '';
    analysis.explanations.forEach(exp => {
      const row = document.createElement('div');
      row.className = 'feedback-reason-item';
      const badgeClass = exp.type === 'error' ? 'badge-error' : exp.type === 'style' ? 'badge-style' : 'badge-structure';
      row.innerHTML = `<span class="feedback-badge ${badgeClass}">${exp.badge || exp.type}</span> <span>${exp.message}</span>`;
      this.dom.feedbackReasons.appendChild(row);
    });

    this.dom.analyticsCard.classList.add('visible');

    // Save to Storage
    if (analysis.wordCount > 3) {
      StorageManager.saveSession({
        date: new Date().toISOString(),
        prompt: this.currentPrompt ? this.currentPrompt.text : 'Practice',
        score: analysis.fluencyScore,
        wpm: analysis.wpm,
        fillers: analysis.fillerCount,
        cefr: analysis.cefrLevel
      });
      this.renderHistory();
      this.updateStreakDisplay();
    }
  }

  renderReadPassage() {
    const text = readPassages[this.readPassageIndex];
    const words = text.split(/\s+/);
    this.dom.readPassageBox.innerHTML = words.map((w, idx) => `<span class="word-target" id="read-w-${idx}">${w}</span>`).join(' ');
    this.dom.readProgressFill.style.width = '0%';
    this.dom.readAccuracyVal.textContent = '0%';
  }

  evaluateReadAloudProgress(transcriptText) {
    const targetWords = readPassages[this.readPassageIndex].toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/);
    const spokenWords = new Set(transcriptText.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/));
    
    let matchedCount = 0;
    targetWords.forEach((tw, idx) => {
      const el = document.getElementById(`read-w-${idx}`);
      if (el) {
        if (spokenWords.has(tw)) {
          el.className = 'word-target matched';
          matchedCount++;
        }
      }
    });

    const percent = Math.round((matchedCount / targetWords.length) * 100);
    this.dom.readProgressFill.style.width = `${percent}%`;
    this.dom.readAccuracyVal.textContent = `${percent}%`;
  }

  renderShadowSentence() {
    const sentence = shadowSentences[this.shadowIndex];
    this.dom.shadowSentenceText.textContent = `"${sentence}"`;
    this.dom.shadowScoreVal.textContent = '—';
  }

  speakModelShadowSentence() {
    const sentence = shadowSentences[this.shadowIndex];
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(sentence);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    } else {
      this.showToast('Speech synthesis not supported in this browser.');
    }
  }

  updateStreakDisplay() {
    const streak = StorageManager.getStreak();
    if (this.dom.streakVal) this.dom.streakVal.textContent = streak;
  }

  renderHistory() {
    const sessions = StorageManager.getSessions();
    if (!this.dom.historyList) return;

    if (!sessions.length) {
      this.dom.historyList.innerHTML = '<div style="font-size:0.8rem;color:var(--text-muted);text-align:center;padding:1rem;">No practice sessions recorded yet.</div>';
      return;
    }

    this.dom.historyList.innerHTML = sessions.slice(0, 5).map(s => {
      const dt = new Date(s.date);
      const timeStr = dt.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) + ' · ' + dt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const chipColor = s.score >= 80 ? 'rgba(0, 240, 255, 0.15);color:var(--accent3)' : 'rgba(251, 191, 36, 0.15);color:var(--warn)';

      return `
        <div class="history-item">
          <div class="history-meta">
            <span style="font-weight:500">${s.prompt}</span>
            <span class="history-date">${timeStr} · ${s.wpm} WPM · ${s.cefr || 'B1'}</span>
          </div>
          <span class="history-score-chip" style="background:${chipColor}">${s.score}/100</span>
        </div>
      `;
    }).join('');
  }

  showToast(message) {
    if (!this.dom.toast) return;
    this.dom.toast.textContent = message;
    this.dom.toast.classList.add('show');
    clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      this.dom.toast.classList.remove('show');
    }, 3200);
  }
}

// Boot application
window.addEventListener('DOMContentLoaded', () => {
  window.spokenApp = new SpokenApp();
});
