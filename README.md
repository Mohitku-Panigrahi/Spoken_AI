# Spoken.ai 🎙️
> **AI-Assisted Spoken English Fluency & Communication Coach**

[![Deploy static content to Pages](https://github.com/Mohitku-Panigrahi/Spoken_AI/actions/workflows/static.yml/badge.svg)](https://github.com/Mohitku-Panigrahi/Spoken_AI/actions/workflows/static.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Spoken.ai is a high-performance, browser-native spoken English fluency coach designed to prepare candidates and students for job interviews, placements, and technical presentations. 

Unlike basic recording widgets that merely transcribe words, Spoken.ai implements a complete **Learn → Retry → Improve** educational loop with actionable linguistic feedback, voice playback, and pacing analytics.

---

## ✨ Key Capabilities

* 🗣️ **Resilient Speech-to-Text**: Continuous browser speech recognition with silence auto-reconnect fallback.
* 🎙️ **True Voice Playback**: Integrated `MediaRecorder` audio capture so learners can listen back to their pacing, tone, and pronunciation.
* 🧠 **Intelligent Language Engine**:
  * **Original vs. Polished Comparison**: Displays raw draft alongside an articulate, professional alternative.
  * **Grammar & Lexicon Explanations**: Categorized rule-based feedback (Subject-Verb agreement, high-impact action verbs, sentence structure).
  * **CEFR Level Estimation**: Rates response sophistication from A2 to C1 based on lexical diversity.
* 🔁 **The Practice-Again Loop**: Direct retry mechanism allowing users to immediately rehearse and lock in the suggested improvements.
* 🎨 **Neo Lux Futurism Interface**: Glassmorphism with deep dark tones (`#060a14`), electric cyan/purple accents, and real-time audio waveform canvas.
* 📚 **Multi-Mode Training**:
  * **Impromptu Prompts**: Categorized into Casual, Interview (STAR method), and Technical Explanations.
  * **Read Aloud**: Real-time word-matching accuracy tracker.
  * **Sentence Shadowing**: Native TTS model reference audio for intonation drilling.
  * **Mirror Mode (Webcam PiP)**: Self-monitoring for facial confidence and body language.

---

## 🏗️ Architecture

Zero dependencies, zero build steps, and 100% compatible with GitHub Pages:

```
Spoken_AI/
├── index.html                           # Semantic HTML5 root
├── thick-forest-misty-5120x3413-26360.jpg # HD Background
├── css/
│   └── style.css                        # Glassmorphism & typography
├── js/
│   ├── app.js                           # Master controller & event bus
│   ├── analysis.js                      # Language & feedback engine
│   ├── audio.js                         # MediaRecorder & Canvas visualizer
│   ├── data.js                          # Prompts & linguistic rules
│   ├── speech.js                        # SpeechRecognition manager
│   └── storage.js                       # LocalStorage & streak persistence
├── tests/
│   └── test-runner.html                 # In-browser test runner
└── .github/workflows/static.yml         # GitHub Actions automatic deployment
```

---

## 🚀 Live Demo & Local Setup

### Live GitHub Pages
Visit: [https://mohitku-panigrahi.github.io/Spoken_AI/](https://mohitku-panigrahi.github.io/Spoken_AI/)

### Run Locally
Simply open `index.html` in Google Chrome or Microsoft Edge:
```bash
# Clone the repository
git clone https://github.com/Mohitku-Panigrahi/Spoken_AI.git
cd Spoken_AI

# Open with any static web server (e.g., VS Code Live Server or Python)
python -m http.server 8000
```
Open `http://localhost:8000` in Chrome or Edge to enable the Web Speech API and microphone.

---

## 🧪 Testing

To verify the analytical engine and linguistic rules, open `tests/test-runner.html` in your browser. All tests run in-memory and validate:
* Empty transcript safety
* Filler word regex detection
* Subject-verb agreement grammar rules
* Professional vocabulary transformations
* Daily streak and session persistence
