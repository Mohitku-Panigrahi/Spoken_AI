/* ═══════════════════════════════════════════════════════════════════
   SPOKEN.AI — SPEECH RECOGNITION MANAGER
   Resilient Web Speech API with Clean Pause Recovery & Duplicate Guard
═══════════════════════════════════════════════════════════════════ */

export class SpeechManager {
  constructor() {
    this.recognition = null;
    this.isRecording = false;
    this.isPaused = false;
    this.finalSegments = [];
    this.interimTranscript = '';
    this.onTranscriptUpdate = null;
    this.onError = null;
    this.onStatusChange = null;
    this.autoRestart = true;
    this.restartAttempts = 0;
    
    this.initRecognition();
  }

  isSupported() {
    return 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
  }

  initRecognition() {
    if (!this.isSupported()) return;

    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.recognition = new SpeechRec();
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = 'en-US';

    this.recognition.onstart = () => {
      this.restartAttempts = 0;
      if (this.onStatusChange) this.onStatusChange('listening');
    };

    this.recognition.onresult = (event) => {
      this.interimTranscript = '';
      
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const item = event.results[i];
        const text = item[0].transcript.trim();
        if (!text) continue;

        if (item.isFinal) {
          // Guard against duplicate consecutive final phrases across auto-reconnects
          const lastSegment = this.finalSegments[this.finalSegments.length - 1];
          if (!lastSegment || lastSegment.toLowerCase() !== text.toLowerCase()) {
            this.finalSegments.push(text);
          }
        } else {
          this.interimTranscript += (this.interimTranscript ? ' ' : '') + text;
        }
      }

      if (this.onTranscriptUpdate) {
        this.onTranscriptUpdate(this.getFullTranscript(), this.interimTranscript);
      }
    };

    this.recognition.onerror = (event) => {
      if (event.error === 'no-speech') {
        // Natural silence between sentences; handled cleanly by onend
        return;
      }
      if (event.error === 'aborted') {
        // Intentional abort or stop
        return;
      }
      if (this.onError) {
        this.onError(event.error);
      }
    };

    this.recognition.onend = () => {
      // Auto-reconnect if user is still actively recording and not paused
      if (this.isRecording && !this.isPaused && this.autoRestart) {
        this.restartAttempts++;
        if (this.restartAttempts < 15) {
          try {
            this.recognition.start();
          } catch {
            // Already restarted
          }
        } else {
          if (this.onError) this.onError('Speech connection timed out after prolonged silence.');
          this.stop();
        }
      } else if (!this.isRecording) {
        if (this.onStatusChange) this.onStatusChange('idle');
      }
    };
  }

  getFullTranscript() {
    return this.finalSegments.join(' ').trim();
  }

  start() {
    if (!this.recognition || this.isRecording) return;
    this.isRecording = true;
    this.isPaused = false;
    this.autoRestart = true;
    this.finalSegments = [];
    this.interimTranscript = '';
    this.restartAttempts = 0;

    try {
      this.recognition.start();
    } catch {
      // Ignore if already active
    }
  }

  pause() {
    if (!this.isRecording || this.isPaused) return;
    this.isPaused = true;
    this.autoRestart = false;
    if (this.recognition) {
      try { this.recognition.stop(); } catch {}
    }
    if (this.onStatusChange) this.onStatusChange('paused');
  }

  resume() {
    if (!this.isRecording || !this.isPaused) return;
    this.isPaused = false;
    this.autoRestart = true;
    if (this.recognition) {
      try { this.recognition.start(); } catch {}
    }
    if (this.onStatusChange) this.onStatusChange('listening');
  }

  stop() {
    if (!this.isRecording) return this.getFullTranscript();
    this.isRecording = false;
    this.isPaused = false;
    this.autoRestart = false;

    // Critical fix: commit any in-flight interim words so the user's final words are not discarded
    if (this.interimTranscript && this.interimTranscript.trim()) {
      const pending = this.interimTranscript.trim();
      const last = this.finalSegments[this.finalSegments.length - 1];
      if (!last || !last.toLowerCase().endsWith(pending.toLowerCase())) {
        this.finalSegments.push(pending);
      }
      this.interimTranscript = '';
    }

    if (this.recognition) {
      try { this.recognition.stop(); } catch {}
    }

    if (this.onStatusChange) this.onStatusChange('idle');
    return this.getFullTranscript();
  }

  reset() {
    this.finalSegments = [];
    this.interimTranscript = '';
  }
}
