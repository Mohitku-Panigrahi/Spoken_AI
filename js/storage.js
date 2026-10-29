/* ═══════════════════════════════════════════════════════════════════
   SPOKEN.AI — STORAGE & PERSISTENCE
   LocalStorage Manager · Streak Tracker · Safe Data Recovery
═══════════════════════════════════════════════════════════════════ */

const SESSIONS_KEY = 'spoken_ai_sessions';
const STREAK_KEY = 'spoken_ai_streak';
const LAST_DATE_KEY = 'spoken_ai_last_practice_date';

export class StorageManager {
  static getSessions() {
    try {
      const data = localStorage.getItem(SESSIONS_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  static saveSession(session) {
    try {
      const sessions = this.getSessions();
      sessions.unshift(session);
      // Keep most recent 50 sessions
      if (sessions.length > 50) sessions.length = 50;
      localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
      this.updateStreak();
    } catch (e) {
      console.warn('Storage failed to write session:', e);
    }
  }

  static updateStreak() {
    try {
      const today = new Date().toISOString().slice(0, 10);
      const lastDate = localStorage.getItem(LAST_DATE_KEY);
      let currentStreak = parseInt(localStorage.getItem(STREAK_KEY) || '0', 10);

      if (lastDate === today) {
        return currentStreak;
      }

      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().slice(0, 10);

      if (lastDate === yesterdayStr) {
        currentStreak += 1;
      } else {
        currentStreak = 1;
      }

      localStorage.setItem(STREAK_KEY, currentStreak.toString());
      localStorage.setItem(LAST_DATE_KEY, today);
      return currentStreak;
    } catch {
      return 1;
    }
  }

  static getStreak() {
    try {
      return parseInt(localStorage.getItem(STREAK_KEY) || '0', 10);
    } catch {
      return 0;
    }
  }

  static clearAll() {
    try {
      localStorage.removeItem(SESSIONS_KEY);
      localStorage.removeItem(STREAK_KEY);
      localStorage.removeItem(LAST_DATE_KEY);
    } catch {}
  }
}
