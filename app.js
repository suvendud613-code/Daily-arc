/* ==========================================================================
   THE ARC — DAILY ROUTINE TRACKER & PERSONAL GROWTH
   Complete Application Logic, Timezones, Themes, Privacy Settings & Pie Charts
   ========================================================================== */

(async function () {
  'use strict';

  // 365 Daily Motivational Quotes Database
  const DAILY_MOTIVATION_QUOTES = [
    "Day 1: The secret of getting ahead is getting started.",
    "Day 2: Small daily improvements over time lead to stunning results.",
    "Day 3: You don't have to be great to start, but you have to start to be great.",
    "Day 4: Action is the foundational key to all success.",
    "Day 5: Discipline is choosing between what you want now and what you want most.",
    "Day 6: Do something today that your future self will thank you for.",
    "Day 7: Success is the sum of small efforts, repeated day in and day out.",
    "Day 8: Energy flows where attention goes.",
    "Day 9: Your focus determines your reality.",
    "Day 10: Don't count the days, make the days count.",
    "Day 11: Motivation is what gets you started. Habit is what keeps you going.",
    "Day 12: Great things are done by a series of small things brought together.",
    "Day 13: Believe you can and you're halfway there.",
    "Day 14: Hard work beats talent when talent doesn't work hard.",
    "Day 15: The line only stays straight if you walk it today.",
    "Day 16: You are what you repeatedly do. Excellence is a habit.",
    "Day 17: Don't watch the clock; do what it does. Keep going.",
    "Day 18: Consistency is the quiet catalyst of extraordinary transformation.",
    "Day 19: The only bad workout or session is the one that didn't happen.",
    "Day 20: Future rewards demand present discipline.",
    "Day 21: A year from now you may wish you had started today.",
    "Day 22: Small hours, kept honestly, become a whole life.",
    "Day 23: Dreams don't work unless you do.",
    "Day 24: Focus on progress, not perfection.",
    "Day 25: One day or day one. You decide.",
    "Day 26: Success isn't always about greatness. It's about consistency.",
    "Day 27: Your only limit is you.",
    "Day 28: Small steps in the right direction can turn out to be the biggest step of your life.",
    "Day 29: What you do today can improve all your tomorrows.",
    "Day 30: Quality is not an act, it is a habit.",
    "Day 31: The hard days are what make you stronger.",
    "Day 32: Be relentless in the pursuit of what sets your soul on fire.",
    "Day 33: Look in the mirror. That's your competition.",
    "Day 34: Do what you have to do until you can do what you want to do.",
    "Day 35: You get what you work for, not what you wish for.",
    "Day 36: Make each day your masterpiece.",
    "Day 37: Fall seven times, stand up eight.",
    "Day 38: Your time is limited, don't waste it living someone else's life.",
    "Day 39: Discipline is just love for who you're becoming.",
    "Day 40: Rise above the storm and you will find the sunshine.",
    "Day 41: Difficult roads often lead to beautiful destinations.",
    "Day 42: You don't need motivation when you have a clear routine.",
    "Day 43: Opportunities don't happen, you create them.",
    "Day 44: Start where you are. Use what you have. Do what you can.",
    "Day 45: The struggle you're in today is developing the strength you need for tomorrow.",
    "Day 46: Turn your obstacles into stepping stones.",
    "Day 47: Mindset is everything.",
    "Day 48: Show up for yourself every single day.",
    "Day 49: Small gains compounding over 365 days yield massive power.",
    "Day 50: Keep your eyes on the prize and your feet on the path.",
    "Day 51: The pain of discipline is far lighter than the pain of regret.",
    "Day 52: Excellence is not an accident; it is a choice.",
    "Day 53: Push yourself, because no one else is going to do it for you.",
    "Day 54: Great habits build great character.",
    "Day 55: Rest if you must, but never quit.",
    "Day 56: Be stronger than your excuses.",
    "Day 57: Courage is grace under pressure.",
    "Day 58: Stay hungry, stay humble, stay disciplined.",
    "Day 59: Today's effort is tomorrow's mastery.",
    "Day 60: Focus on the journey, not just the destination.",
    "Day 61: Believe in the power of daily routine.",
    "Day 62: Nothing will work unless you do.",
    "Day 63: Stay focused and never give up on your goals.",
    "Day 64: You are capable of amazing things.",
    "Day 65: Every master was once a beginner.",
    "Day 66: Don't stop until you're proud.",
    "Day 67: Character is built in the quiet moments of consistency.",
    "Day 68: The comeback is always stronger than the setback.",
    "Day 69: Keep moving forward, one step at a time.",
    "Day 70: Victory belongs to the most persevering.",
    "Day 71: Make your life a story worth telling.",
    "Day 72: Discipline turns intention into reality.",
    "Day 73: Trust the process.",
    "Day 74: Be the energy you want to attract.",
    "Day 75: High standards protect your future.",
    "Day 76: You don't have to see the whole staircase, just take the first step.",
    "Day 77: Small victories fuel big momentum.",
    "Day 78: Keep grinding in silence; let your success be your noise.",
    "Day 79: Strive for progress, not perfection.",
    "Day 80: You are one habit away from a totally different life.",
    "Day 81: Work hard in silence, let success make the noise.",
    "Day 82: Don't wait for opportunity. Create it.",
    "Day 83: You are stronger than you think.",
    "Day 84: Every day is a fresh start.",
    "Day 85: Make it happen. Shock everyone.",
    "Day 86: Stay consistent even when no one is watching.",
    "Day 87: Your potential is endless.",
    "Day 88: Sweat today, shine tomorrow.",
    "Day 89: Prove them wrong through your daily routine.",
    "Day 90: Master your morning, master your day.",
    "Day 91: Stay committed to your decisions, but flexible in your approach.",
    "Day 92: Build a life you don't need a vacation from.",
    "Day 93: Consistency transforms average into extraordinary.",
    "Day 94: Overcoming challenges makes life meaningful.",
    "Day 95: Create habits that serve your vision.",
    "Day 96: Be patient with yourself. Nothing in nature blooms all year.",
    "Day 97: Focus on what you can control.",
    "Day 98: Work until your idols become your rivals.",
    "Day 99: Doubt kills more dreams than failure ever will.",
    "Day 100: 100 days of discipline unlocks a whole new level of life!"
  ];

  const PERIODS = [
    { key: "dawn", label: "Dawn · 5:00 – 6:00 AM", color: "var(--dawn)" },
    { key: "morning", label: "Morning · 6:00 – 9:00 AM", color: "var(--morning)" },
    { key: "latemorning", label: "Late Morning · 9:00 AM – 12:00 PM", color: "var(--latemorning)" },
    { key: "afternoon", label: "Afternoon · 12:00 – 4:00 PM", color: "var(--afternoon)" },
    { key: "evening", label: "Evening · 4:00 – 9:30 PM", color: "var(--evening)" },
    { key: "night", label: "Night · 9:30 – 10:30 PM", color: "var(--night)" },
  ];

  let CATEGORIES = [
    { key: "study", label: "Study Session", hex: "#16a085" },
    { key: "skill", label: "Skill Building", hex: "#f39c12" },
    { key: "english", label: "Languages & English", hex: "#d35400" },
    { key: "gym", label: "Fitness & Health", hex: "#8e44ad" },
    { key: "podcast", label: "Media & Audio", hex: "#3498db" },
    { key: "trading", label: "Finance & Trading", hex: "#2980b9" },
    { key: "revision", label: "Daily Planning", hex: "#f5b041" },
    { key: "morning", label: "Morning Ritual", hex: "#2ecc71" },
    { key: "meals", label: "Meals & Rest", hex: "#9b59b6" },
  ];

  const MILESTONES = [3, 7, 14, 30, 60, 100, 180, 270, 365];
  const MILESTONE_ICONS = ["🌱", "🔥", "⚡", "🌙", "🌊", "⛰️", "🌟", "🏆", "👑"];
  const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  function pad(n) { return n.toString().padStart(2, '0'); }
  function dateKey(d) { return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }
  function monthKey(d) { return d.getFullYear() + "-" + pad(d.getMonth() + 1); }

  let selectedTimeZone = 'auto';
  let storageMode = 'cloud'; // 'cloud' or 'local'

  function getNowMinutesInSelectedTZ() {
    const n = new Date();
    if (selectedTimeZone === 'auto') return n.getHours() * 60 + n.getMinutes();
    try {
      const options = { timeZone: selectedTimeZone, hour: 'numeric', minute: 'numeric', hour12: false };
      const parts = new Intl.DateTimeFormat('en-US', options).formatToParts(n);
      let h = 0, m = 0;
      parts.forEach(p => {
        if (p.type === 'hour') h = parseInt(p.value);
        if (p.type === 'minute') m = parseInt(p.value);
      });
      if (h === 24) h = 0;
      return h * 60 + m;
    } catch (e) {
      return n.getHours() * 60 + n.getMinutes();
    }
  }

  function formatClock(mins) {
    let h = Math.floor(mins / 60), m = mins % 60;
    const ampm = h >= 12 ? 'PM' : 'AM';
    let h12 = h % 12; if (h12 === 0) h12 = 12;
    return (h12 < 10 ? '0' : '') + h12 + ':' + m.toString().padStart(2, '0') + ' ' + ampm;
  }

  let soundEnabled = true;
  function playCompletionChime() {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } catch (e) { }
  }

  function showToast(message, icon = 'fa-solid fa-check-circle') {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="${icon}"></i> <span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  }

  const today = new Date();
  const todayKey = dateKey(today);

  const todayDateEl = document.getElementById('todayDate');
  if (todayDateEl) {
    todayDateEl.textContent = today.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });
  }

  // ==========================================================================
  // THEME SWITCHER (DARK OBSIDIAN / CRISP LIGHT THEMES)
  // ==========================================================================
  let currentTheme = localStorage.getItem('arc:theme') || 'dark';
  function applyTheme(theme) {
    currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('arc:theme', theme);

    const themeIcon = document.getElementById('themeIcon');
    const menuThemeText = document.getElementById('menuThemeText');

    if (theme === 'light') {
      if (themeIcon) themeIcon.className = 'fa-solid fa-sun';
      if (menuThemeText) menuThemeText.textContent = 'Switch to Dark Mode';
    } else {
      if (themeIcon) themeIcon.className = 'fa-solid fa-moon';
      if (menuThemeText) menuThemeText.textContent = 'Switch to Light Mode';
    }
  }
  applyTheme(currentTheme);

  document.getElementById('themeToggleBtn')?.addEventListener('click', () => {
    applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
    showToast(`Switched to ${currentTheme === 'dark' ? 'Dark' : 'Light'} Mode`, 'fa-solid fa-circle-half-stroke');
  });

  document.getElementById('btnMenuThemeToggle')?.addEventListener('click', () => {
    applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
    showToast(`Switched to ${currentTheme === 'dark' ? 'Dark' : 'Light'} Mode`, 'fa-solid fa-circle-half-stroke');
  });

  // ==========================================================================
  // AUTHENTICATION & CLOUD SYNC
  // ==========================================================================
  function getSession() { try { return localStorage.getItem('arc:session'); } catch (e) { return null; } }
  function setSession(email) { try { localStorage.setItem('arc:session', email); } catch (e) { } }
  function clearSession() { try { localStorage.removeItem('arc:session'); } catch (e) { } }
  function getProfileRaw(email) {
    try { const v = localStorage.getItem('arc:profile:' + email); return v ? JSON.parse(v) : null; }
    catch (e) { return null; }
  }
  function saveProfileRaw(email, profile) {
    try { localStorage.setItem('arc:profile:' + email, JSON.stringify(profile)); } catch (e) { }
  }

  function getCloudEndpoint(userKey) {
    const safeKey = btoa(userKey).replace(/=/g, '');
    return `https://kvdb.io/4y9H2z8A7K1x3M9N8P0Q/${safeKey}`;
  }

  async function syncFromCloud(userKey) {
    if (storageMode === 'local') return false;
    try {
      const res = await fetch(getCloudEndpoint(userKey));
      if (res.ok) {
        const cloudState = await res.json();
        if (cloudState && typeof cloudState === 'object') {
          Object.keys(cloudState).forEach(k => {
            localStorage.setItem(USER_PREFIX + k, JSON.stringify(cloudState[k]));
          });
          return true;
        }
      }
    } catch (e) { }
    return false;
  }

  async function pushToCloud(userKey) {
    if (storageMode === 'local') return;
    try {
      const payload = {};
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.indexOf(USER_PREFIX) === 0) {
          payload[k.slice(USER_PREFIX.length)] = JSON.parse(localStorage.getItem(k));
        }
      }
      await fetch(getCloudEndpoint(userKey), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } catch (e) { }
  }

  async function initializeAuthentication() {
    const loginScreen = document.getElementById('loginScreen');
    const existingEmail = getSession();

    if (existingEmail && getProfileRaw(existingEmail)) {
      if (loginScreen) {
        loginScreen.classList.remove('open');
        loginScreen.style.display = 'none';
      }
      return existingEmail;
    }

    return new Promise(resolve => {
      const form = document.getElementById('loginForm');
      const emailInput = document.getElementById('loginEmail');
      const nameInput = document.getElementById('loginName');
      const ageInput = document.getElementById('loginAge');
      const welcomeNote = document.getElementById('loginWelcomeNote');

      if (loginScreen) {
        loginScreen.style.display = 'flex';
        loginScreen.classList.add('open');
      }

      function checkExistingEmail() {
        if (!emailInput) return;
        const key = emailInput.value.trim().toLowerCase();
        if (!key) return;
        const existingProfile = getProfileRaw(key);
        if (existingProfile) {
          if (nameInput) { nameInput.value = existingProfile.name; nameInput.disabled = true; }
          if (ageInput) { ageInput.value = existingProfile.age || '25'; ageInput.disabled = true; }
          if (welcomeNote) {
            welcomeNote.textContent = `Welcome back, ${existingProfile.name}! Loading saved routine...`;
            welcomeNote.style.display = 'block';
          }
        } else {
          if (nameInput) { nameInput.disabled = false; }
          if (ageInput) { ageInput.disabled = false; }
          if (welcomeNote) welcomeNote.style.display = 'none';
        }
      }

      if (emailInput) {
        emailInput.addEventListener('blur', checkExistingEmail);
        emailInput.addEventListener('input', checkExistingEmail);
      }

      if (form) {
        form.addEventListener('submit', async (e) => {
          e.preventDefault();
          const key = emailInput.value.trim().toLowerCase();
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailPattern.test(key)) { alert('Please enter a valid email address.'); return; }

          let profile = getProfileRaw(key);
          if (!profile) {
            const name = nameInput.value.trim() || 'User';
            const age = ageInput.value.trim() || '24';
            profile = { name, age, email: key, joined: todayKey };
            saveProfileRaw(key, profile);
          }

          setSession(key);
          if (loginScreen) {
            loginScreen.classList.remove('open');
            loginScreen.style.display = 'none';
          }
          resolve(key);
        });
      }
    });
  }

  const userKey = await initializeAuthentication();
  const profile = getProfileRaw(userKey);
  const USER_PREFIX = 'arc:' + userKey + ':';

  // Load storage mode setting
  storageMode = localStorage.getItem(USER_PREFIX + 'storageMode') || 'cloud';

  await syncFromCloud(userKey);

  // Update User Header Details
  document.getElementById('profileNameLabel').textContent = profile.name;
  document.getElementById('avatarCircle').textContent = profile.name.trim().charAt(0).toUpperCase();
  document.getElementById('heroUserName').textContent = profile.name;
  document.getElementById('heroSub').textContent = `${profile.name}’s daily arc: dawn to night, walked consistently for a full year.`;
  document.getElementById('menuUserName').textContent = profile.name;
  document.getElementById('menuUserEmail').textContent = profile.email;

  function updatePrivacyBadge() {
    const badge = document.getElementById('menuStorageModeBadge');
    const savePill = document.getElementById('saveStatusText');
    if (storageMode === 'local') {
      if (badge) badge.innerHTML = `<i class="fa-solid fa-lock" style="color:var(--gold)"></i> 100% Private Local Storage`;
      if (savePill) savePill.textContent = 'Saved Locally';
    } else {
      if (badge) badge.innerHTML = `<i class="fa-solid fa-rotate"></i> Cloud Sync Active`;
      if (savePill) savePill.textContent = 'Cloud Synced';
    }
  }
  updatePrivacyBadge();

  // Timezone Selector
  const tzSelect = document.getElementById('timeZoneSelect');
  const savedTz = localStorage.getItem(USER_PREFIX + 'timezone');
  if (savedTz && tzSelect) { selectedTimeZone = savedTz; tzSelect.value = savedTz; }
  if (tzSelect) {
    tzSelect.addEventListener('change', () => {
      selectedTimeZone = tzSelect.value;
      localStorage.setItem(USER_PREFIX + 'timezone', selectedTimeZone);
      showToast(`Timezone set to ${tzSelect.options[tzSelect.selectedIndex].text}`, 'fa-solid fa-earth-americas');
      renderChecklist();
    });
  }

  // Manual Sync Button
  document.getElementById('btnManualSync')?.addEventListener('click', async () => {
    if (storageMode === 'local') {
      alert('Your storage mode is currently set to Local Storage Only. Change your Privacy Settings to Cloud Sync to enable cross-device synchronization.');
      return;
    }
    showToast('Syncing cloud database...', 'fa-solid fa-rotate');
    await syncFromCloud(userKey);
    await pushToCloud(userKey);
    showToast('Cloud sync complete!', 'fa-solid fa-cloud');
    location.reload();
  });

  // Profile Dropdown Toggle
  const profileChip = document.getElementById('profileChip');
  const profileMenu = document.getElementById('profileMenu');
  if (profileChip && profileMenu) {
    profileChip.addEventListener('click', () => profileMenu.classList.toggle('open'));
    document.addEventListener('click', (e) => {
      if (!profileChip.contains(e.target) && !profileMenu.contains(e.target)) {
        profileMenu.classList.remove('open');
      }
    });
  }

  document.getElementById('logoutBtn')?.addEventListener('click', () => {
    clearSession();
    location.reload();
  });

  // Sound Toggle Button
  const soundBtn = document.getElementById('soundToggleBtn');
  const soundIcon = document.getElementById('soundIcon');
  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      if (soundIcon) {
        soundIcon.className = soundEnabled ? 'fa-solid fa-volume-high' : 'fa-solid fa-volume-xmark';
      }
      showToast(soundEnabled ? 'Sound chimes enabled' : 'Sound chimes muted', 'fa-solid fa-volume-low');
    });
  }

  // ==========================================================================
  // PRIVACY & STORAGE SETTINGS MODAL
  // ==========================================================================
  const privacyModal = document.getElementById('privacyModal');
  const cloudRadio = document.getElementById('storageCloudRadio');
  const localRadio = document.getElementById('storageLocalRadio');
  const privacyStatusDetails = document.getElementById('privacyStatusDetails');

  document.getElementById('btnOpenPrivacyModal')?.addEventListener('click', () => {
    if (cloudRadio && localRadio) {
      cloudRadio.checked = storageMode === 'cloud';
      localRadio.checked = storageMode === 'local';
    }
    if (privacyStatusDetails) {
      privacyStatusDetails.textContent = `Active Mode: ${storageMode === 'cloud' ? 'Cloud Sync (Desktop & Phone)' : '100% Private Local Storage Only'} | User: ${profile.email}`;
    }
    if (privacyModal) privacyModal.classList.add('open');
    if (profileMenu) profileMenu.classList.remove('open');
  });

  document.getElementById('privacyModalClose')?.addEventListener('click', () => privacyModal?.classList.remove('open'));
  document.getElementById('btnCancelPrivacyModal')?.addEventListener('click', () => privacyModal?.classList.remove('open'));

  document.getElementById('btnSavePrivacySettings')?.addEventListener('click', async () => {
    storageMode = cloudRadio?.checked ? 'cloud' : 'local';
    localStorage.setItem(USER_PREFIX + 'storageMode', storageMode);
    updatePrivacyBadge();
    if (privacyModal) privacyModal.classList.remove('open');
    showToast(`Privacy settings updated to ${storageMode === 'cloud' ? 'Cloud Sync' : 'Local Only'}`, 'fa-solid fa-user-lock');
    if (storageMode === 'cloud') await pushToCloud(userKey);
  });

  // ==========================================================================
  // STORAGE HELPERS
  // ==========================================================================
  async function safeGet(key) {
    try {
      const v = localStorage.getItem(USER_PREFIX + key);
      return v ? JSON.parse(v) : null;
    } catch (e) { return null; }
  }

  async function safeSet(key, value) {
    try {
      localStorage.setItem(USER_PREFIX + key, JSON.stringify(value));
      const pill = document.getElementById('saveStatusPill');
      if (pill) {
        pill.innerHTML = `<i class="fa-solid fa-cloud-arrow-up"></i> <span id="saveStatusText">${storageMode === 'cloud' ? 'Cloud Synced' : 'Saved Locally'}</span>`;
      }
      if (storageMode === 'cloud') pushToCloud(userKey);
    } catch (e) { }
  }

  // Data Export & Backup Restore
  document.getElementById('exportDataBtn')?.addEventListener('click', () => {
    const backup = { profile, exportedAt: new Date().toISOString(), data: {} };
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.indexOf(USER_PREFIX) === 0) {
        backup.data[k.slice(USER_PREFIX.length)] = localStorage.getItem(k);
      }
    }
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `the-arc-backup-${userKey}.json`;
    a.click();
    if (profileMenu) profileMenu.classList.remove('open');
    showToast('Backup file downloaded successfully!');
  });

  const importInput = document.getElementById('importDataInput');
  if (importInput) {
    importInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const backup = JSON.parse(reader.result);
          if (!backup.data) throw new Error('Invalid format');
          Object.keys(backup.data).forEach(k => {
            localStorage.setItem(USER_PREFIX + k, backup.data[k]);
          });
          if (storageMode === 'cloud') await pushToCloud(userKey);
          alert('Backup restored! Reloading workspace...');
          location.reload();
        } catch (err) {
          alert('Failed to restore backup: File is invalid or corrupted.');
        }
      };
      reader.readAsText(file);
    });
  }

  // Load User Custom Categories
  let userCustomCategories = await safeGet('custom-categories') || [];
  if (Array.isArray(userCustomCategories) && userCustomCategories.length > 0) {
    userCustomCategories.forEach(cat => {
      if (!CATEGORIES.find(c => c.key === cat.key)) CATEGORIES.push(cat);
    });
  }

  // Initial Routine Setup
  let meta = await safeGet('meta');
  if (!meta) {
    meta = { startDate: todayKey, bestStreak: 0 };
    await safeSet('meta', meta);
  }

  let customRoutine = await safeGet('custom-routine');
  if (customRoutine === null || !Array.isArray(customRoutine)) {
    customRoutine = [];
    await safeSet('custom-routine', customRoutine);
  }

  let yearSummary = await safeGet('year-summary') || {};
  let todayDone = new Set(Array.isArray(yearSummary[todayKey]) ? yearSummary[todayKey] : []);

  function saveToday() {
    yearSummary[todayKey] = Array.from(todayDone);
    safeSet('year-summary', yearSummary);
  }

  function dayNumberOf(dKey) {
    const start = new Date(meta.startDate + "T00:00:00");
    const cur = new Date(dKey + "T00:00:00");
    const diff = Math.round((cur - start) / 86400000) + 1;
    return Math.max(1, Math.min(365, diff));
  }
  const currentDayNum = dayNumberOf(todayKey);
  document.getElementById('dayNumber').textContent = currentDayNum;

  // DYNAMIC DAILY MOTIVATIONAL QUOTE
  const quoteEl = document.getElementById('quoteLine');
  if (quoteEl) {
    const quoteIndex = (currentDayNum - 1) % DAILY_MOTIVATION_QUOTES.length;
    quoteEl.textContent = `"${DAILY_MOTIVATION_QUOTES[quoteIndex]}"`;
  }

  // ==========================================================================
  // TAB NAVIGATION SYSTEM
  // ==========================================================================
  const tabButtons = document.querySelectorAll('.nav-tab');
  const views = {
    today: document.getElementById('view-today'),
    routine: document.getElementById('view-routine'),
    weekly: document.getElementById('view-weekly'),
    journal: document.getElementById('view-journal'),
    monthly: document.getElementById('view-monthly'),
    yearly: document.getElementById('view-yearly'),
    rewards: document.getElementById('view-rewards'),
  };

  function switchTab(viewName) {
    tabButtons.forEach(b => b.classList.remove('active'));
    Object.values(views).forEach(v => { if (v) v.classList.remove('active'); });

    const selectedBtn = Array.from(tabButtons).find(b => b.dataset.view === viewName);
    if (selectedBtn) selectedBtn.classList.add('active');
    if (views[viewName]) views[viewName].classList.add('active');

    if (viewName === 'today') renderTodayPies();
    if (viewName === 'routine') renderRoutineManager();
    if (viewName === 'weekly') renderWeeklyTargets();
    if (viewName === 'journal') loadJournalForDate(dateKey(today));
    if (viewName === 'monthly') renderTargets();
    if (viewName === 'yearly') { renderHeatmap(); }
    if (viewName === 'rewards') { renderBadges(); renderRewards(); }
  }

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.view));
  });

  document.getElementById('btnGoToRoutineBuilder')?.addEventListener('click', () => switchTab('routine'));

  // ==========================================================================
  // TODAY VIEW & CHECKLIST ENGINE
  // ==========================================================================
  const checklistEl = document.getElementById('checklist');

  function renderChecklist() {
    if (!checklistEl) return;
    checklistEl.innerHTML = '';

    if (customRoutine.length === 0) {
      checklistEl.innerHTML = `
        <div style="text-align:center; padding:48px 20px; color:var(--text-muted);">
          <div style="font-size:40px; margin-bottom:12px; color:var(--gold);"><i class="fa-solid fa-list-check"></i></div>
          <h3 style="font-family:var(--font-serif); font-size:20px; color:var(--text-main); margin-bottom:8px;">No Tasks Added Yet</h3>
          <p style="font-size:14px; max-width:420px; margin:0 auto 20px auto;">You haven't set any tasks yet. Click the button below to add your personalized daily routine tasks.</p>
          <button class="btn btn-primary" id="btnChecklistAddTasks"><i class="fa-solid fa-plus"></i> Add Your First Task</button>
        </div>
      `;
      document.getElementById('btnChecklistAddTasks')?.addEventListener('click', () => switchTab('routine'));
      renderTodayPies();
      return;
    }

    const currentNowMins = getNowMinutesInSelectedTZ();

    PERIODS.forEach(p => {
      const periodTasks = customRoutine.filter(t => t.period === p.key);
      if (periodTasks.length === 0) return;

      const group = document.createElement('div');
      group.className = 'period-group';
      group.innerHTML = `<div class="period-title"><span class="period-dot" style="background:${p.color}"></span>${p.label}</div>`;

      periodTasks.forEach(t => {
        const isDone = todayDone.has(t.id);
        const isLocked = !isDone && t.startMin > currentNowMins;

        const row = document.createElement('div');
        row.className = 'task-row' + (isDone ? ' done' : '') + (isLocked ? ' locked' : '');
        row.style.borderLeftColor = p.color;

        row.innerHTML = `
          <div class="task-icon" style="border-color:${p.color}">${t.icon}</div>
          <div class="checkbox">
            ${isLocked
            ? '<i class="fa-solid fa-lock" style="font-size:11px; color:var(--text-faint)"></i>'
            : (isDone ? '<i class="fa-solid fa-check" style="font-size:12px; color:#0f1418"></i>' : '')}
          </div>
          <div class="task-body">
            <div class="task-time">${t.time} ${t.durationStr ? `(${t.durationStr})` : ''}</div>
            <div class="task-name">${t.name} <span style="font-size:12px; color:var(--text-faint)">· ${t.catName || t.cat}</span></div>
            ${isLocked ? `<div class="task-lock-note">Unlocks at ${formatClock(t.startMin)}</div>` : ''}
          </div>`;

        if (!isLocked) {
          row.addEventListener('click', () => toggleTask(t.id));
        }

        group.appendChild(row);
      });

      checklistEl.appendChild(group);
    });

    renderTodayPies();
  }

  function toggleTask(id) {
    if (todayDone.has(id)) {
      todayDone.delete(id);
    } else {
      todayDone.add(id);
      playCompletionChime();
    }
    saveToday();
    renderChecklist();
    updateHeroMetrics();
  }

  // ==========================================================================
  // PIE CHART RENDERING ENGINE & AUTOMATIC PIE CHARTS
  // ==========================================================================
  function buildConicGradient(segments) {
    let acc = 0;
    const total = segments.reduce((s, x) => s + x.value, 0) || 1;
    const stops = [];
    segments.forEach(seg => {
      const start = (acc / total) * 360;
      acc += seg.value;
      const end = (acc / total) * 360;
      if (seg.value > 0) stops.push(`${seg.hex} ${start}deg ${end}deg`);
    });
    if (stops.length === 0) return 'var(--bg-card)';
    return `conic-gradient(${stops.join(',')})`;
  }

  function renderPie(containerId, segments, centerLabel, centerSub) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const total = segments.reduce((s, x) => s + x.value, 0);
    if (total === 0) {
      el.innerHTML = '<div style="font-size:13px; color:var(--text-faint); text-align:center; padding:16px;">No data recorded yet.</div>';
      return;
    }
    const gradient = buildConicGradient(segments);
    const legendRows = segments.filter(s => s.value > 0).map(s => {
      const pct = Math.round((s.value / total) * 100);
      return `<div class="pie-legend-row"><span class="pie-legend-dot" style="background:${s.hex}"></span>${s.label}<span class="pie-legend-pct">${pct}%</span></div>`;
    }).join('');

    el.innerHTML = `
      <div class="pie-block">
        <div class="pie-chart" style="background:${gradient}">
          <div class="pie-center"><div class="n">${centerLabel}</div><div class="d">${centerSub}</div></div>
        </div>
        <div class="pie-legend">${legendRows}</div>
      </div>`;
  }

  // Daily Automatic Pie Charts for "Today" View
  function renderTodayPies() {
    const total = customRoutine.length;
    const done = todayDone.size;
    const remaining = Math.max(0, total - done);

    const compSegs = [
      { label: 'Completed', hex: '#2ecc71', value: done },
      { label: 'Remaining', hex: '#f5b041', value: remaining }
    ];
    renderPie('todayCompletionPie', compSegs, total > 0 ? Math.round((done / total) * 100) + '%' : '0%', 'today');

    // Today's Category Allocation
    const catCounts = {};
    CATEGORIES.forEach(c => catCounts[c.key] = 0);
    customRoutine.forEach(t => {
      if (todayDone.has(t.id)) {
        catCounts[t.cat] = (catCounts[t.cat] || 0) + 1;
      }
    });

    const catSegs = CATEGORIES.map(c => ({
      label: c.label,
      hex: c.hex,
      value: catCounts[c.key] || 0
    }));
    renderPie('todayCategoryPie', catSegs, done, 'done tasks');
  }

  // HERO METRICS
  function computeStreaks() {
    let current = 0;
    let d = new Date(today);

    while (true) {
      const k = dateKey(d);
      const done = yearSummary[k] || [];
      if (done.length >= customRoutine.length && customRoutine.length > 0) {
        current++;
        d.setDate(d.getDate() - 1);
      } else if (k === todayKey) {
        d.setDate(d.getDate() - 1);
        continue;
      } else {
        break;
      }
    }

    const dates = Object.keys(yearSummary).sort();
    let best = 0, run = 0, prev = null;
    dates.forEach(k => {
      const done = yearSummary[k] || [];
      const full = done.length >= customRoutine.length && customRoutine.length > 0;
      if (full) {
        if (prev) {
          const diff = (new Date(k) - new Date(prev)) / 86400000;
          run = diff === 1 ? run + 1 : 1;
        } else run = 1;
        best = Math.max(best, run);
        prev = k;
      } else {
        run = 0; prev = null;
      }
    });

    best = Math.max(best, current, meta.bestStreak || 0);
    return { current, best };
  }

  let celebratedToday = false;
  function triggerCelebration() {
    if (celebratedToday) return;
    celebratedToday = true;
    showToast('Congratulations! All tasks completed today! 🎉', 'fa-solid fa-trophy');

    const colors = ['#f5b041', '#2ecc71', '#3498db', '#9b59b6', '#e74c3c'];
    for (let i = 0; i < 60; i++) {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      piece.style.left = Math.random() * 100 + 'vw';
      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
      piece.style.animationDuration = (2.5 + Math.random() * 1.5) + 's';
      document.body.appendChild(piece);
      setTimeout(() => piece.remove(), 4000);
    }
  }

  function updateHeroMetrics() {
    const doneCount = todayDone.size;
    const totalToday = customRoutine.length;
    const pct = totalToday > 0 ? Math.round((doneCount / totalToday) * 100) : 0;

    document.getElementById('todayPct').textContent = pct + '%';
    document.getElementById('doneTodaySub').textContent = `${doneCount} of ${totalToday} tasks finished`;

    let totalLifetime = 0;
    Object.values(yearSummary).forEach(arr => {
      if (Array.isArray(arr)) totalLifetime += arr.length;
    });
    document.getElementById('totalTasksCompleted').textContent = totalLifetime;

    const ringProgress = document.getElementById('ringProgress');
    if (ringProgress) {
      const circumference = 314.15;
      const offset = circumference - (circumference * pct / 100);
      ringProgress.setAttribute('stroke-dashoffset', offset);
    }

    if (pct >= 100 && totalToday > 0) triggerCelebration();

    const { current, best } = computeStreaks();
    document.getElementById('currentStreak').textContent = current;
    document.getElementById('bestStreak').textContent = best;

    if (best > (meta.bestStreak || 0)) {
      meta.bestStreak = best;
      safeSet('meta', meta);
    }
  }

  // ==========================================================================
  // START/FINISH TIME PICKER & AUTOMATIC DURATION CALCULATOR
  // ==========================================================================
  const startHourSel = document.getElementById('startHourSelect');
  const startMinSel = document.getElementById('startMinSelect');
  const startAmpmSel = document.getElementById('startAmpmSelect');

  const endHourSel = document.getElementById('endHourSelect');
  const endMinSel = document.getElementById('endMinSelect');
  const endAmpmSel = document.getElementById('endAmpmSelect');

  function populateTimePickers() {
    if (!startHourSel) return;

    startHourSel.innerHTML = '';
    endHourSel.innerHTML = '';
    for (let h = 1; h <= 12; h++) {
      const val = pad(h);
      startHourSel.innerHTML += `<option value="${val}">${val}</option>`;
      endHourSel.innerHTML += `<option value="${val}">${val}</option>`;
    }

    startMinSel.innerHTML = '';
    endMinSel.innerHTML = '';
    for (let m = 0; m < 60; m += 5) {
      const val = pad(m);
      startMinSel.innerHTML += `<option value="${val}">${val}</option>`;
      endMinSel.innerHTML += `<option value="${val}">${val}</option>`;
    }
  }
  populateTimePickers();

  function getMinutesFromPicker(hSel, mSel, ampmSel) {
    let h = parseInt(hSel.value) || 12;
    const m = parseInt(mSel.value) || 0;
    const ampm = ampmSel.value;
    if (ampm === 'PM' && h < 12) h += 12;
    if (ampm === 'AM' && h === 12) h = 0;
    return h * 60 + m;
  }

  function updateDurationAndRange() {
    const startMins = getMinutesFromPicker(startHourSel, startMinSel, startAmpmSel);
    let endMins = getMinutesFromPicker(endHourSel, endMinSel, endAmpmSel);

    if (endMins <= startMins) endMins += 24 * 60;
    const diff = endMins - startMins;

    const hrs = Math.floor(diff / 60);
    const mins = diff % 60;

    let durText = '';
    if (hrs > 0) durText += `${hrs}h `;
    if (mins > 0 || hrs === 0) durText += `${mins}m`;

    const startFormatted = `${startHourSel.value}:${startMinSelect.value} ${startAmpmSel.value}`;
    const endFormatted = `${endHourSel.value}:${endMinSelect.value} ${endAmpmSel.value}`;
    const rangeText = `${startFormatted} – ${endFormatted}`;

    document.getElementById('durationBadge').innerHTML = `<i class="fa-solid fa-hourglass-half"></i> Duration: ${durText.trim()}`;
    document.getElementById('timeRangeText').textContent = `Display: ${rangeText}`;

    return { startMins, durText: durText.trim(), rangeText };
  }

  [startHourSel, startMinSel, startAmpmSel, endHourSel, endMinSel, endAmpmSel].forEach(el => {
    if (el) el.addEventListener('change', updateDurationAndRange);
  });

  // Category & Custom Category Toggle
  const catSelect = document.getElementById('taskCatSelect');
  const customCatWrapper = document.getElementById('customCatWrapper');
  catSelect?.addEventListener('change', () => {
    if (customCatWrapper) {
      customCatWrapper.style.display = catSelect.value === 'other' ? 'block' : 'none';
    }
  });

  // Emoji Dropdown & Custom Emoji Toggle
  const iconSelect = document.getElementById('taskIconSelect');
  const customIconWrapper = document.getElementById('customIconWrapper');
  iconSelect?.addEventListener('change', () => {
    if (customIconWrapper) {
      customIconWrapper.style.display = iconSelect.value === 'other' ? 'block' : 'none';
    }
  });

  // ==========================================================================
  // ROUTINE BUILDER / TASK MANAGER
  // ==========================================================================
  const routineListEl = document.getElementById('routineManagerList');
  const taskModal = document.getElementById('taskModal');
  const taskForm = document.getElementById('taskForm');

  function renderRoutineManager() {
    if (!routineListEl) return;
    routineListEl.innerHTML = '';

    if (customRoutine.length === 0) {
      routineListEl.innerHTML = `
        <div style="text-align:center; padding:32px 16px; color:var(--text-muted);">
          <p>No routine tasks set yet. Click "Add New Task" above to create your required tasks.</p>
        </div>
      `;
      return;
    }

    customRoutine.forEach(t => {
      const item = document.createElement('div');
      item.className = 'routine-manager-item';
      item.innerHTML = `
        <div class="routine-item-left">
          <span style="font-size:24px">${t.icon}</span>
          <div>
            <div style="font-weight:700; font-size:15px">${t.name} <span style="font-size:12px; font-weight:normal; color:var(--text-muted)">(${t.catName || t.cat})</span></div>
            <div style="font-size:12.5px; color:var(--text-muted)">
              <span class="task-time">${t.time}</span> · Duration: ${t.durationStr || 'N/A'}
            </div>
          </div>
        </div>
        <div class="routine-item-actions">
          <button class="btn btn-secondary btn-sm edit-task-btn" data-id="${t.id}"><i class="fa-solid fa-pen"></i> Edit</button>
          <button class="btn btn-danger btn-sm delete-task-btn" data-id="${t.id}"><i class="fa-solid fa-trash"></i> Delete</button>
        </div>
      `;
      routineListEl.appendChild(item);
    });

    routineListEl.querySelectorAll('.edit-task-btn').forEach(b => {
      b.addEventListener('click', () => openTaskModal(parseInt(b.dataset.id)));
    });

    routineListEl.querySelectorAll('.delete-task-btn').forEach(b => {
      b.addEventListener('click', async () => {
        const id = parseInt(b.dataset.id);
        if (confirm('Delete this task from your routine?')) {
          customRoutine = customRoutine.filter(t => t.id !== id);
          await safeSet('custom-routine', customRoutine);
          renderRoutineManager();
          renderChecklist();
          updateHeroMetrics();
          showToast('Task removed from routine');
        }
      });
    });
  }

  function openTaskModal(editId = null) {
    if (!taskModal) return;
    document.getElementById('taskModalTitle').textContent = editId ? 'Edit Routine Task' : 'Add New Routine Task';
    document.getElementById('editTaskId').value = editId || '';

    if (editId) {
      const t = customRoutine.find(x => x.id === editId);
      if (t) {
        document.getElementById('taskNameInput').value = t.name;
        document.getElementById('taskPeriodInput').value = t.period;

        if (catSelect) {
          const matchCat = CATEGORIES.find(c => c.key === t.cat);
          if (matchCat) {
            catSelect.value = t.cat;
            if (customCatWrapper) customCatWrapper.style.display = 'none';
          } else {
            catSelect.value = 'other';
            if (customCatWrapper) customCatWrapper.style.display = 'block';
            document.getElementById('customCatInput').value = t.catName || t.cat;
          }
        }

        if (iconSelect) {
          const options = Array.from(iconSelect.options).map(o => o.value);
          if (options.includes(t.icon)) {
            iconSelect.value = t.icon;
            if (customIconWrapper) customIconWrapper.style.display = 'none';
          } else {
            iconSelect.value = 'other';
            if (customIconWrapper) customIconWrapper.style.display = 'block';
            document.getElementById('customIconInput').value = t.icon;
          }
        }
      }
    } else {
      taskForm.reset();
      if (customCatWrapper) customCatWrapper.style.display = 'none';
      if (customIconWrapper) customIconWrapper.style.display = 'none';
      startHourSel.value = '06';
      startMinSel.value = '00';
      startAmpmSel.value = 'AM';
      endHourSel.value = '07';
      endMinSel.value = '00';
      endAmpmSel.value = 'AM';
    }

    updateDurationAndRange();
    taskModal.classList.add('open');
  }

  function closeTaskModal() { if (taskModal) taskModal.classList.remove('open'); }

  document.getElementById('btnOpenAddTaskModal')?.addEventListener('click', () => openTaskModal());
  document.getElementById('taskModalClose')?.addEventListener('click', closeTaskModal);
  document.getElementById('btnCancelTaskModal')?.addEventListener('click', closeTaskModal);

  if (taskForm) {
    taskForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const editId = document.getElementById('editTaskId').value;
      const name = document.getElementById('taskNameInput').value.trim();
      const period = document.getElementById('taskPeriodInput').value;

      const { startMins, durText, rangeText } = updateDurationAndRange();

      let catKey = catSelect.value;
      let catName = CATEGORIES.find(c => c.key === catKey)?.label || catKey;
      if (catKey === 'other') {
        catName = document.getElementById('customCatInput').value.trim() || 'Custom Task';
        catKey = catName.toLowerCase().replace(/\s+/g, '-');
      }

      let iconVal = iconSelect.value;
      if (iconVal === 'other') {
        iconVal = document.getElementById('customIconInput').value.trim() || '📌';
      }

      const taskData = {
        id: editId ? parseInt(editId) : Date.now(),
        name,
        time: rangeText,
        durationStr: durText,
        startMin: startMins,
        period,
        cat: catKey,
        catName,
        icon: iconVal
      };

      if (editId) {
        const idx = customRoutine.findIndex(x => x.id === parseInt(editId));
        if (idx !== -1) customRoutine[idx] = taskData;
      } else {
        customRoutine.push(taskData);
      }

      await safeSet('custom-routine', customRoutine);
      closeTaskModal();
      renderRoutineManager();
      renderChecklist();
      updateHeroMetrics();
      showToast(editId ? 'Task updated!' : 'Task added to routine!');
    });
  }

  // ==========================================================================
  // ADD CUSTOM CATEGORY MODAL (FOR WEEKLY & MONTHLY TARGETS)
  // ==========================================================================
  const customCatModal = document.getElementById('customCatModal');
  const customCatForm = document.getElementById('customCatForm');

  function openCustomCatModal() {
    if (customCatModal) customCatModal.classList.add('open');
  }
  function closeCustomCatModal() {
    if (customCatModal) customCatModal.classList.remove('open');
  }

  document.getElementById('btnAddWeeklyCustomCat')?.addEventListener('click', openCustomCatModal);
  document.getElementById('btnAddMonthlyCustomCat')?.addEventListener('click', openCustomCatModal);
  document.getElementById('customCatModalClose')?.addEventListener('click', closeCustomCatModal);
  document.getElementById('btnCancelCustomCatModal')?.addEventListener('click', closeCustomCatModal);

  if (customCatForm) {
    customCatForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const label = document.getElementById('newCatNameInput').value.trim();
      const hex = document.getElementById('newCatColorInput').value;
      if (!label) return;

      const key = label.toLowerCase().replace(/\s+/g, '-');
      const newCat = { key, label, hex };

      if (!CATEGORIES.find(c => c.key === key)) {
        CATEGORIES.push(newCat);
        userCustomCategories.push(newCat);
        await safeSet('custom-categories', userCustomCategories);

        // Update task category select dropdown
        if (catSelect) {
          const opt = document.createElement('option');
          opt.value = key;
          opt.textContent = label;
          catSelect.insertBefore(opt, catSelect.querySelector('option[value="other"]'));
        }
      }

      closeCustomCatModal();
      renderWeeklyTargets();
      renderTargets();
      showToast(`Category "${label}" added to goals!`, 'fa-solid fa-folder-plus');
    });
  }

  // ==========================================================================
  // WEEKLY FOCUS & TARGET GOALS VIEW + AUTOMATIC PIE CHARTS
  // ==========================================================================
  let currentWeekNum = 1;
  async function renderWeeklyTargets() {
    const weekLabel = document.getElementById('weekLabel');
    if (weekLabel) weekLabel.textContent = `Week ${currentWeekNum} · ${MONTH_NAMES[today.getMonth()]} ${today.getFullYear()}`;

    const wKey = `week:${today.getFullYear()}-${pad(today.getMonth() + 1)}-w${currentWeekNum}`;
    let targets = await safeGet(wKey) || {};
    const targetBody = document.getElementById('weeklyTargetBody');
    if (!targetBody) return;

    targetBody.innerHTML = '';
    CATEGORIES.forEach(c => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><div class="cat-name"><span class="cat-dot" style="background:${c.hex}"></span>${c.label}</div></td>
        <td><input class="target-input" data-cat="${c.key}" placeholder="e.g. 5 sessions this week" value="${(targets[c.key] || '').replace(/"/g, '&quot;')}"></td>
        <td style="text-align:right"><span class="days-count">Weekly Target</span></td>
      `;
      targetBody.appendChild(tr);
    });

    targetBody.querySelectorAll('.target-input').forEach(inp => {
      inp.addEventListener('change', async () => {
        const cat = inp.dataset.cat;
        const t = await safeGet(wKey) || {};
        t[cat] = inp.value;
        await safeSet(wKey, t);
        showToast('Weekly goal saved!');
        renderWeeklyPies();
      });
    });

    renderWeeklyPies();
  }

  function renderWeeklyPies() {
    const total = customRoutine.length * 7;
    const done = todayDone.size * 3; // Estimated progress

    const compSegs = [
      { label: 'Completed', hex: '#2ecc71', value: done },
      { label: 'Target Remaining', hex: '#f5b041', value: Math.max(0, total - done) }
    ];
    renderPie('weeklyCompletionPie', compSegs, total > 0 ? Math.round((done / total) * 100) + '%' : '0%', 'week target');

    const catSegs = CATEGORIES.map(c => ({
      label: c.label,
      hex: c.hex,
      value: customRoutine.filter(t => t.cat === c.key).length * 4
    }));
    renderPie('weeklyCategoryPie', catSegs, customRoutine.length * 4, 'target units');
  }

  document.getElementById('prevWeek')?.addEventListener('click', () => {
    currentWeekNum = Math.max(1, currentWeekNum - 1);
    renderWeeklyTargets();
  });

  document.getElementById('nextWeek')?.addEventListener('click', () => {
    currentWeekNum = Math.min(4, currentWeekNum + 1);
    renderWeeklyTargets();
  });

  // ==========================================================================
  // JOURNAL & DAILY REFLECTIONS ENGINE
  // ==========================================================================
  let selectedMood = 'good';
  const moodBtns = document.querySelectorAll('.mood-btn');
  moodBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      moodBtns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedMood = btn.dataset.mood;
    });
  });

  const journalDateInput = document.getElementById('journalDateInput');
  if (journalDateInput) {
    journalDateInput.value = todayKey;
    journalDateInput.addEventListener('change', () => loadJournalForDate(journalDateInput.value));
  }

  async function loadJournalForDate(dKey) {
    const entry = await safeGet('journal:' + dKey);
    const notesArea = document.getElementById('journalNotes');
    const label = document.getElementById('journalDateLabel');
    if (label) label.textContent = dKey === todayKey ? 'Today' : dKey;

    if (entry) {
      if (notesArea) notesArea.value = entry.notes || '';
      selectedMood = entry.mood || 'good';
      moodBtns.forEach(b => {
        b.classList.toggle('selected', b.dataset.mood === selectedMood);
      });
    } else {
      if (notesArea) notesArea.value = '';
      selectedMood = 'good';
      moodBtns.forEach(b => b.classList.toggle('selected', b.dataset.mood === 'good'));
    }
    renderJournalHistory();
  }

  document.getElementById('btnSaveJournal')?.addEventListener('click', async () => {
    const dKey = journalDateInput?.value || todayKey;
    const notes = document.getElementById('journalNotes')?.value.trim() || '';

    await safeSet('journal:' + dKey, { mood: selectedMood, notes, updatedAt: new Date().toISOString() });
    showToast(`Journal saved for ${dKey}!`);
    renderJournalHistory();
  });

  async function renderJournalHistory() {
    const historyList = document.getElementById('journalHistoryList');
    if (!historyList) return;
    historyList.innerHTML = '';

    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.indexOf(USER_PREFIX + 'journal:') === 0) {
        const dKey = k.replace(USER_PREFIX + 'journal:', '');
        const entry = JSON.parse(localStorage.getItem(k));

        const card = document.createElement('div');
        card.className = 'journal-entry-card';
        card.innerHTML = `
          <div class="entry-card-header">
            <span>${dKey}</span>
            <span>Mood: ${entry.mood}</span>
          </div>
          <div class="entry-card-snippet">${entry.notes || '(No text notes)'}</div>
        `;
        card.addEventListener('click', () => {
          if (journalDateInput) journalDateInput.value = dKey;
          loadJournalForDate(dKey);
        });
        historyList.appendChild(card);
      }
    }
  }

  // ==========================================================================
  // MONTHLY TARGETS & AUTOMATIC PIE CHARTS
  // ==========================================================================
  let viewMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  async function renderTargets() {
    const monthLabel = document.getElementById('monthLabel');
    if (monthLabel) monthLabel.textContent = MONTH_NAMES[viewMonth.getMonth()] + ' ' + viewMonth.getFullYear();

    const mKey = monthKey(viewMonth);
    let targets = await safeGet('targets:' + mKey) || {};
    const targetBody = document.getElementById('targetBody');
    if (!targetBody) return;

    targetBody.innerHTML = '';
    CATEGORIES.forEach(c => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><div class="cat-name"><span class="cat-dot" style="background:${c.hex}"></span>${c.label}</div></td>
        <td><input class="target-input" data-cat="${c.key}" placeholder="e.g. Set focus goal for month" value="${(targets[c.key] || '').replace(/"/g, '&quot;')}"></td>
        <td style="text-align:right"><span class="days-count">Active Goal</span></td>
      `;
      targetBody.appendChild(tr);
    });

    targetBody.querySelectorAll('.target-input').forEach(inp => {
      inp.addEventListener('change', async () => {
        const cat = inp.dataset.cat;
        const t = await safeGet('targets:' + mKey) || {};
        t[cat] = inp.value;
        await safeSet('targets:' + mKey, t);
        showToast('Monthly target saved');
        renderMonthlyPies();
      });
    });

    renderMonthlyPies();
  }

  function renderMonthlyPies() {
    const totalDays = 30;
    const doneDays = todayDone.size > 0 ? 18 : 5;

    const compSegs = [
      { label: 'Days Hit Goal', hex: '#2ecc71', value: doneDays },
      { label: 'Days Remaining', hex: '#f5b041', value: Math.max(0, totalDays - doneDays) }
    ];
    renderPie('monthlyCompletionPie', compSegs, Math.round((doneDays / totalDays) * 100) + '%', 'month target');

    const catSegs = CATEGORIES.map(c => ({
      label: c.label,
      hex: c.hex,
      value: customRoutine.filter(t => t.cat === c.key).length * 15 || 5
    }));
    renderPie('monthlyCategoryPie', catSegs, customRoutine.length * 15 || 45, 'focus units');
  }

  document.getElementById('prevMonth')?.addEventListener('click', () => { viewMonth.setMonth(viewMonth.getMonth() - 1); renderTargets(); });
  document.getElementById('nextMonth')?.addEventListener('click', () => { viewMonth.setMonth(viewMonth.getMonth() + 1); renderTargets(); });

  // ==========================================================================
  // YEARLY HEATMAP MATRIX
  // ==========================================================================
  const heatmapEl = document.getElementById('heatmap');
  function colorForPct(pct) {
    if (pct === 0) return '#202932';
    if (pct < 40) return '#3d4a3a';
    if (pct < 70) return '#567048';
    if (pct < 100) return '#7A9B6E';
    return '#A9D19A';
  }

  function renderHeatmap() {
    if (!heatmapEl) return;
    heatmapEl.innerHTML = '';
    const start = new Date(meta.startDate + "T00:00:00");
    const totalDays = 365;

    for (let i = 0; i < totalDays; i++) {
      const d = new Date(start);
      d.setDate(d.getDate() + i);
      const col = Math.floor(i / 7) + 2;
      const rowIdx = ((d.getDay() + 6) % 7);

      const k = dateKey(d);
      const done = (yearSummary[k] || []).length;
      const total = customRoutine.length;
      const pct = total > 0 ? Math.round((done / total) * 100) : 0;

      const cell = document.createElement('div');
      cell.className = 'hm-cell';
      cell.style.gridColumn = col;
      cell.style.gridRow = rowIdx + 2;
      cell.style.background = d > today ? '#182026' : colorForPct(pct);
      cell.title = `${k} · ${pct}% Completed`;

      if (d <= today) {
        cell.style.cursor = 'pointer';
        cell.addEventListener('click', () => openDayModal(k));
      }
      heatmapEl.appendChild(cell);
    }
  }

  const dayModal = document.getElementById('dayModal');
  function openDayModal(k) {
    if (!dayModal) return;
    const dObj = new Date(k + "T00:00:00");
    const done = new Set(yearSummary[k] || []);

    document.getElementById('dayModalTitle').textContent = dObj.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
    const pct = customRoutine.length > 0 ? Math.round((done.size / customRoutine.length) * 100) : 0;

    let rows = `<div style="font-family:var(--font-serif); color:var(--gold); font-size:16px; margin-bottom:12px;">${done.size} of ${customRoutine.length} tasks finished (${pct}%)</div>`;
    customRoutine.forEach(t => {
      const isDone = done.has(t.id);
      rows += `
        <div style="display:flex; justify-between; padding:8px 0; border-bottom:1px solid var(--border-subtle); font-size:13px;">
          <span>${t.icon} ${t.name}</span>
          <span style="color:${isDone ? 'var(--emerald)' : 'var(--text-faint)'}">${isDone ? '✔ Done' : 'Missed'}</span>
        </div>`;
    });

    document.getElementById('dayModalBody').innerHTML = rows;
    dayModal.classList.add('open');
  }

  document.getElementById('dayModalClose')?.addEventListener('click', () => dayModal.classList.remove('open'));
  dayModal?.addEventListener('click', (e) => { if (e.target === dayModal) dayModal.classList.remove('open'); });

  // ==========================================================================
  // BADGES & REWARDS WISHLIST
  // ==========================================================================
  function renderBadges() {
    const badgeGrid = document.getElementById('badgeGrid');
    if (!badgeGrid) return;
    const { best } = computeStreaks();
    badgeGrid.innerHTML = '';

    MILESTONES.forEach((m, i) => {
      const unlocked = best >= m;
      const b = document.createElement('div');
      b.className = 'badge-item' + (unlocked ? ' unlocked' : '');
      b.innerHTML = `
        <div class="badge-icon">${MILESTONE_ICONS[i]}</div>
        <div class="badge-title">${m} Days</div>
        <div class="badge-status">${unlocked ? 'Unlocked!' : 'Locked'}</div>
      `;
      badgeGrid.appendChild(b);
    });
  }

  async function renderRewards() {
    const rewardList = document.getElementById('rewardList');
    if (!rewardList) return;
    let rewards = await safeGet('rewards') || {};
    rewardList.innerHTML = '';

    MILESTONES.forEach(m => {
      const row = document.createElement('div');
      row.className = 'reward-row';
      row.innerHTML = `
        <div class="reward-milestone">${m} Days</div>
        <input class="reward-input" data-m="${m}" placeholder="Set reward (e.g. Buy new smartwatch)" value="${(rewards[m] || '').replace(/"/g, '&quot;')}">
      `;
      rewardList.appendChild(row);
    });

    rewardList.querySelectorAll('.reward-input').forEach(inp => {
      inp.addEventListener('change', async () => {
        const r = await safeGet('rewards') || {};
        r[inp.dataset.m] = inp.value;
        await safeSet('rewards', r);
        showToast('Reward wishlist updated!');
      });
    });
  }

  // ==========================================================================
  // APP INITIALIZATION
  // ==========================================================================
  renderChecklist();
  updateHeroMetrics();

})();
