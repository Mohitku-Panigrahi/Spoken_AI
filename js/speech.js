/* ═══════════════════════════════════════════════════════════════════
   SPOKEN.AI — SPEECH RECOGNITION MANAGER
   Resilient Web Speech API with Auto-Reconnect on Silence
═══════════════════════════════════════════════════════════════════ */

export class SpeechManager {
  constructor() {
    this.recognition = null;
    this.isRecording = false;
    this.isPaused = false;
    this.finalTranscript = '';
    this.interimTranscript = '';
    this.onTranscriptUpdate = null;
    this.onError = null;
    this.onStatusChange = null;
    this.autoRestart = true;
    
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
      if (this.onStatusChange) this.onStatusChange('listening');
    };

    this.recognition.onresult = (event) => {
      this.interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcriptPart = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          this.finalTranscript += (this.finalTranscript ? ' ' : '') + transcriptPart.trim();
        } else {
          this.interimTranscript += transcriptPart;
        }
      }

      if (this.onTranscriptUpdate) {
        this.onTranscriptUpdate(this.finalTranscript, this.interimTranscript);
      }
    };

    this.recognition.onerror = (event) => {
      if (event.error === 'no-speech') {
        // Normal silence timeout; if still recording, auto-recovery will handle it onend
        return;
      }
      if (this.onError) {
        this.onError(event.error);
      }
    };

    this.recognition.onend = () => {
      // Auto-reconnect if user is still actively recording and hasn't paused/finished
      if (this.isRecording && !this.isPaused && this.autoRestart) {
        try {
          this.recognition.start();
        } catch {
          // Ignore if already active
        }
      } else if (!this.isRecording) {
        if (this.onStatusChange) this.onStatusChange('idle');
      }
    };
  }

  start() {
    if (!this.recognition) return;
    this.isRecording = true;
    this.isPaused = false;
    this.finalTranscript = '';
    this.interimTranscript = '';
    try {
      this.recognition.start();
    } catch {
      // If already started, ignore error
    }
  }

  pause() {
    this.isPaused = true;
    if (this.recognition) {
      try { this.recognition.stop(); } catch {}
    }
    if (this.onStatusChange) this.onStatusChange('paused');
  }

  resume() {
    this.isPaused = false;
    if (this.recognition) {
      try { this.recognition.start(); } catch {}
    }
    if (this.onStatusChange) this.onStatusChange('listening');
  }

  stop() {
    this.isRecording = false;
    this.isPaused = false;
    if (this.recognition) {
      try { this.recognition.stop(); } catch {}
    }
    if (this.onStatusChange) this.onStatusChange('idle');
    return this.finalTranscript;
  }

  reset() {
    this.finalTranscript = '';
    this.interimTranscript = '';
  }
}
