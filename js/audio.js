/* ═══════════════════════════════════════════════════════════════════
   SPOKEN.AI — AUDIO ENGINE
   MediaRecorder Voice Playback · AudioContext Waveform · Resource Safety
═══════════════════════════════════════════════════════════════════ */

export class AudioEngine {
  constructor() {
    this.audioContext = null;
    this.analyser = null;
    this.microphone = null;
    this.mediaStream = null;
    this.mediaRecorder = null;
    this.audioChunks = [];
    this.recordedAudioUrl = null;
    this.animationFrameId = null;
    this.canvas = null;
    this.canvasCtx = null;
    this.audioElement = new Audio();
    this.recordingMimeType = 'audio/webm';
  }

  async initMicStream() {
    // Only request microphone stream when user clicks record
    if (this.mediaStream && this.mediaStream.active) {
      return this.mediaStream;
    }
    this.mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
    return this.mediaStream;
  }

  setupVisualizer(canvasElement) {
    this.canvas = canvasElement;
    if (!this.canvas) return;
    this.canvasCtx = this.canvas.getContext('2d');
    
    const rect = this.canvas.getBoundingClientRect();
    this.canvas.width = (rect.width || 480) * window.devicePixelRatio;
    this.canvas.height = (rect.height || 34) * window.devicePixelRatio;
  }

  async startRecording() {
    // Clean up previous recorded audio blob URL to prevent memory leaks
    if (this.recordedAudioUrl) {
      URL.revokeObjectURL(this.recordedAudioUrl);
      this.recordedAudioUrl = null;
    }

    const stream = await this.initMicStream();
    
    // AudioContext setup
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!this.audioContext || this.audioContext.state === 'closed') {
      this.audioContext = new AudioCtx();
    }
    if (this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
    }

    this.analyser = this.audioContext.createAnalyser();
    this.analyser.fftSize = 256;
    this.microphone = this.audioContext.createMediaStreamSource(stream);
    this.microphone.connect(this.analyser);

    // MediaRecorder setup
    this.audioChunks = [];
    const mimeTypes = ['audio/webm;codecs=opus', 'audio/webm', 'audio/ogg;codecs=opus', 'audio/mp4'];
    this.recordingMimeType = '';
    for (const m of mimeTypes) {
      if (typeof MediaRecorder !== 'undefined' && MediaRecorder.isTypeSupported(m)) {
        this.recordingMimeType = m;
        break;
      }
    }

    try {
      this.mediaRecorder = this.recordingMimeType 
        ? new MediaRecorder(stream, { mimeType: this.recordingMimeType })
        : new MediaRecorder(stream);
    } catch {
      this.mediaRecorder = new MediaRecorder(stream);
    }

    this.mediaRecorder.ondataavailable = (e) => {
      if (e.data && e.data.size > 0) {
        this.audioChunks.push(e.data);
      }
    };

    this.mediaRecorder.start(200); // 200ms slice
    this.drawWaveform();
  }

  drawWaveform() {
    if (!this.analyser || !this.canvas || !this.canvasCtx) return;

    const bufferLength = this.analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    
    const draw = () => {
      this.animationFrameId = requestAnimationFrame(draw);
      this.analyser.getByteFrequencyData(dataArray);

      const ctx = this.canvasCtx;
      const width = this.canvas.width;
      const height = this.canvas.height;

      ctx.clearRect(0, 0, width, height);

      const barCount = 48;
      const step = Math.floor(bufferLength / barCount);
      const barWidth = (width / barCount) - 2;

      let sum = 0;
      for (let i = 0; i < bufferLength; i++) sum += dataArray[i];
      const avg = sum / bufferLength;
      const isSpeaking = avg > 12;

      ctx.shadowBlur = isSpeaking ? 10 : 0;
      ctx.shadowColor = isSpeaking ? '#00f0ff' : 'transparent';

      for (let i = 0; i < barCount; i++) {
        const val = dataArray[i * step] || 0;
        const percent = val / 255;
        const barHeight = Math.max(3, percent * height);

        const gradient = ctx.createLinearGradient(0, height, 0, 0);
        gradient.addColorStop(0, '#00f0ff');
        gradient.addColorStop(1, isSpeaking ? '#ec4899' : '#a855f7');

        ctx.fillStyle = gradient;
        ctx.fillRect(i * (barWidth + 2), (height - barHeight) / 2, barWidth, barHeight);
      }
    };

    draw();
  }

  async stopRecording() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }

    if (this.canvasCtx && this.canvas) {
      this.canvasCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    return new Promise((resolve) => {
      if (!this.mediaRecorder || this.mediaRecorder.state === 'inactive') {
        this.releaseMic();
        resolve(null);
        return;
      }

      this.mediaRecorder.onstop = () => {
        this.releaseMic();
        if (this.audioChunks.length > 0) {
          const mime = this.mediaRecorder.mimeType || this.recordingMimeType || 'audio/webm';
          const blob = new Blob(this.audioChunks, { type: mime });
          this.recordedAudioUrl = URL.createObjectURL(blob);
          this.audioElement.src = this.recordedAudioUrl;
          resolve({ blob, url: this.recordedAudioUrl, mime });
        } else {
          resolve(null);
        }
      };

      try {
        this.mediaRecorder.stop();
      } catch {
        this.releaseMic();
        resolve(null);
      }
    });
  }

  releaseMic() {
    // Release active microphone tracks immediately when session terminates
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach(track => track.stop());
      this.mediaStream = null;
    }
  }

  setupAudioPlayerUI(elements) {
    const { container, playBtn, scrubber, timeDisplay, downloadBtn, formatBadge } = elements;
    if (!container || !playBtn || !scrubber || !timeDisplay) return;

    playBtn.onclick = () => {
      if (this.audioElement.paused) {
        this.audioElement.play();
        playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
      } else {
        this.audioElement.pause();
        playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
      }
    };

    this.audioElement.ontimeupdate = () => {
      if (!isNaN(this.audioElement.duration) && this.audioElement.duration > 0) {
        scrubber.value = (this.audioElement.currentTime / this.audioElement.duration) * 100;
        const curM = Math.floor(this.audioElement.currentTime / 60);
        const curS = Math.floor(this.audioElement.currentTime % 60).toString().padStart(2, '0');
        const durM = Math.floor(this.audioElement.duration / 60);
        const durS = Math.floor(this.audioElement.duration % 60).toString().padStart(2, '0');
        timeDisplay.textContent = `${curM}:${curS} / ${durM}:${durS}`;
      }
    };

    scrubber.oninput = (e) => {
      if (!isNaN(this.audioElement.duration) && this.audioElement.duration > 0) {
        this.audioElement.currentTime = (e.target.value / 100) * this.audioElement.duration;
      }
    };

    this.audioElement.onended = () => {
      playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
      scrubber.value = 0;
    };

    if (downloadBtn) {
      downloadBtn.onclick = () => {
        if (!this.recordedAudioUrl) return;
        const a = document.createElement('a');
        a.href = this.recordedAudioUrl;
        a.download = `spoken-ai-practice-${Date.now()}.webm`;
        a.click();
      };
    }
  }

  cleanup() {
    this.releaseMic();
    if (this.recordedAudioUrl) {
      URL.revokeObjectURL(this.recordedAudioUrl);
      this.recordedAudioUrl = null;
    }
    if (this.audioContext && this.audioContext.state !== 'closed') {
      this.audioContext.close();
      this.audioContext = null;
    }
  }
}
