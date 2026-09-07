/* ==========================================================================
   THE ARC — DAILY ROUTINE TRACKER & PERSONAL GROWTH
   Complete Application Logic & Data Persistence Engine
   ========================================================================== */

(async function () {
  'use strict';

  // Default Routine Tasks (Fallback if user hasn't created custom routine)
  const DEFAULT_WEEKDAY_TASKS = [
    { id: 1, time: "5:00 AM", name: "Meditation (5 min)", period: "dawn", cat: "morning", startMin: 5 * 60, icon: "🧘" },
    { id: 2, time: "5:05 AM", name: "Face yoga (5 min)", period: "dawn", cat: "morning", startMin: 5 * 60 + 5, icon: "🙆" },
    { id: 3, time: "5:10 AM", name: "Hydrate — 1 glass of water", period: "dawn", cat: "morning", startMin: 5 * 60 + 10, icon: "💧" },
    { id: 4, time: "5:15 AM", name: "Morning walk (30 min)", period: "dawn", cat: "morning", startMin: 5 * 60 + 15, icon: "🚶" },
    { id: 5, time: "5:45 AM", name: "Brush & freshen up", period: "dawn", cat: "morning", startMin: 5 * 60 + 45, icon: "🪥" },
    { id: 6, time: "6:00 – 8:00 AM", name: "Cat study session (morning)", period: "morning", cat: "cat", startMin: 6 * 60, icon: "🐱" },
    { id: 7, time: "8:00 – 9:00 AM", name: "Breakfast", period: "morning", cat: "meals", startMin: 8 * 60, icon: "🍳" },
    { id: 8, time: "9:00 AM – 12:00 PM", name: "Skill learning", period: "latemorning", cat: "skill", startMin: 9 * 60, icon: "📘" },
    { id: 9, time: "12:00 – 2:00 PM", name: "Lunch & rest", period: "afternoon", cat: "meals", startMin: 12 * 60, icon: "🍛" },
    { id: 10, time: "2:00 – 4:00 PM", name: "English improvement", period: "afternoon", cat: "english", startMin: 14 * 60, icon: "🗣️" },
    { id: 11, time: "4:00 – 7:00 PM", name: "Gym & physical workout", period: "evening", cat: "gym", startMin: 16 * 60, icon: "🏋️" },
    { id: 12, time: "7:00 – 9:00 PM", name: "Cat study session (evening)", period: "evening", cat: "cat", startMin: 19 * 60, icon: "🐾" },
    { id: 13, time: "9:00 – 9:30 PM", name: "Dinner", period: "evening", cat: "meals", startMin: 21 * 60, icon: "🍽️" },
    { id: 14, time: "9:30 – 10:00 PM", name: "Trading study", period: "night", cat: "trading", startMin: 21 * 60 + 30, icon: "📈" },
    { id: 15, time: "10:00 – 10:30 PM", name: "Daily revision & planning", period: "night", cat: "revision", startMin: 22 * 60, icon: "📝" },
  ];

  const PERIODS = [
    { key: "dawn", label: "Dawn · 5:00 – 6:00 AM", color: "var(--dawn)" },
    { key: "morning", label: "Morning · 6:00 – 9:00 AM", color: "var(--morning)" },
    { key: "latemorning", label: "Late Morning · 9:00 AM – 12:00 PM", color: "var(--latemorning)" },
    { key: "afternoon", label: "Afternoon · 12:00 – 4:00 PM", color: "var(--afternoon)" },
    { key: "evening", label: "Evening · 4:00 – 9:30 PM", color: "var(--evening)" },
    { key: "night", label: "Night · 9:30 – 10:30 PM", color: "var(--night)" },
  ];

  const CATEGORIES = [
    { key: "cat", label: "Cat Study", hex: "#16a085" },
    { key: "skill", label: "Skill Learning", hex: "#f39c12" },
    { key: "english", label: "English", hex: "#d35400" },
    { key: "gym", label: "Fitness & Gym", hex: "#8e44ad" },
    { key: "podcast", label: "Podcast & Audio", hex: "#3498db" },
    { key: "trading", label: "Trading Study", hex: "#2980b9" },
    { key: "revision", label: "Daily Revision", hex: "#f5b041" },
    { key: "morning", label: "Morning Ritual", hex: "#2ecc71" },
    { key: "meals", label: "Meals & Health", hex: "#9b59b6" },
  ];

  const TIME_ALLOCATION_WEEKDAY = [
    { label: "Morning ritual", hex: "#2ecc71", minutes: 60 },
    { label: "Cat study", hex: "#16a085", minutes: 240 },
    { label: "Meals & rest", hex: "#9b59b6", minutes: 210 },
    { label: "Skill learning", hex: "#f39c12", minutes: 180 },
    { label: "English improvement", hex: "#d35400", minutes: 120 },
    { label: "Gym & workout", hex: "#8e44ad", minutes: 180 },
    { label: "Trading study", hex: "#2980b9", minutes: 30 },
    { label: "Daily revision", hex: "#f5b041", minutes: 30 },
  ];

  const TIME_ALLOCATION_SUNDAY = [
    { label: "Morning ritual", hex: "#2ecc71", minutes: 60 },
    { label: "Cat study", hex: "#16a085", minutes: 240 },
    { label: "Meals & rest", hex: "#9b59b6", minutes: 210 },
    { label: "Skill learning", hex: "#f39c12", minutes: 180 },
    { label: "English improvement", hex: "#d35400", minutes: 120 },
    { label: "Cycling & Fitness", hex: "#8e44ad", minutes: 60 },
    { label: "Podcast & Audio", hex: "#3498db", minutes: 120 },
    { label: "Trading study", hex: "#2980b9", minutes: 30 },
    { label: "Daily revision", hex: "#f5b041", minutes: 30 },
  ];

  const MILESTONES = [3, 7, 14, 30, 60, 100, 180, 270, 365];
  const MILESTONE_ICONS = ["🌱", "🔥", "⚡", "🌙", "🌊", "⛰️", "🌟", "🏆", "👑"];
  const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  // Helper Date Functions
  function pad(n) { return n.toString().padStart(2, '0'); }
  function dateKey(d) { return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }
  function monthKey(d) { return d.getFullYear() + "-" + pad(d.getMonth() + 1); }
  function nowMinutes() { const n = new Date(); return n.getHours() * 60 + n.getMinutes(); }

  function formatClock(mins) {
    let h = Math.floor(mins / 60), m = mins % 60;
    const ampm = h >= 12 ? 'PM' : 'AM';
    let h12 = h % 12; if (h12 === 0) h12 = 12;
    return h12 + ':' + m.toString().padStart(2, '0') + ' ' + ampm;
  }

  // Audio Engine for Task Completion Chimes
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
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5 note
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5 note
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } catch (e) { /* ignore audio restrictions */ }
  }

  // Toast Notification System
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

  // Set formatted date in Today View
  const todayDateEl = document.getElementById('todayDate');
  if (todayDateEl) {
    todayDateEl.textContent = today.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });
  }

  // ==========================================================================
  // AUTHENTICATION & SESSION PERSISTENCE (FIXES LOGIN ON REFRESH BUG)
  // ==========================================================================
  function getSession() {
    try { return localStorage.getItem('arc:session'); } catch (e) { return null; }
  }
  function setSession(email) {
    try { localStorage.setItem('arc:session', email); } catch (e) { }
  }
  function clearSession() {
    try { localStorage.removeItem('arc:session'); } catch (e) { }
  }
  function getProfileRaw(email) {
    try {
      const v = localStorage.getItem('arc:profile:' + email);
      return v ? JSON.parse(v) : null;
    } catch (e) { return null; }
  }
  function saveProfileRaw(email, profile) {
    try { localStorage.setItem('arc:profile:' + email, JSON.stringify(profile)); } catch (e) { }
  }

  async function initializeAuthentication() {
    const loginScreen = document.getElementById('loginScreen');
    const existingEmail = getSession();

    // Check if session exists and has a valid user profile
    if (existingEmail && getProfileRaw(existingEmail)) {
      if (loginScreen) {
        loginScreen.classList.remove('open');
        loginScreen.style.display = 'none'; // Critical Fix: Hide overlay immediately
      }
      return existingEmail;
    }

    // If no active session, present the Login Modal
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

      // Auto-detect returning profile upon typing email
      if (emailInput) {
        emailInput.addEventListener('blur', () => {
          const key = emailInput.value.trim().toLowerCase();
          if (!key) return;
          const profile = getProfileRaw(key);
          if (profile) {
            if (nameInput) { nameInput.value = profile.name; nameInput.disabled = true; }
            if (ageInput) { ageInput.value = profile.age; ageInput.disabled = true; }
            if (welcomeNote) {
              welcomeNote.textContent = `Welcome back, ${profile.name}! Your streak & routine records are ready.`;
              welcomeNote.style.display = 'block';
            }
          } else {
            if (nameInput) { nameInput.disabled = false; nameInput.value = ''; }
            if (ageInput) { ageInput.disabled = false; ageInput.value = ''; }
            if (welcomeNote) welcomeNote.style.display = 'none';
          }
        });
      }

      if (form) {
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          const key = emailInput.value.trim().toLowerCase();
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailPattern.test(key)) {
            alert('Please enter a valid email address.');
            return;
          }

          let profile = getProfileRaw(key);
          if (!profile) {
            const name = nameInput.value.trim();
            const age = ageInput.value.trim();
            if (!name || !age) {
              alert('Please enter your name and age to create your profile.');
              return;
            }
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

  // Resolve user account key
  const userKey = await initializeAuthentication();
  const profile = getProfileRaw(userKey);
  const USER_PREFIX = 'arc:' + userKey + ':';

  // Update User Header Details
  document.getElementById('profileNameLabel').textContent = profile.name;
  document.getElementById('avatarCircle').textContent = profile.name.trim().charAt(0).toUpperCase();
  document.getElementById('heroUserName').textContent = profile.name;
  document.getElementById('heroSub').textContent = `${profile.name}’s daily arc: dawn to night, walked consistently for a full year.`;
  document.getElementById('menuUserName').textContent = profile.name;
  document.getElementById('menuUserEmail').textContent = profile.email;

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

  // Logout / Switch Account
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      clearSession();
      location.reload();
    });
  }

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
  // STORAGE HELPERS (PERSISTS ROUTINE & PROGRESS DATA IN LOCALSTORAGE)
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
        pill.innerHTML = `<i class="fa-solid fa-cloud-arrow-up"></i> <span>Saved</span>`;
        pill.style.opacity = '1';
      }
    } catch (e) {
      console.error('Storage set failed:', key, e);
    }
  }

  // Data Export & Backup Restore
  const exportBtn = document.getElementById('exportDataBtn');
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
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
  }

  const importInput = document.getElementById('importDataInput');
  if (importInput) {
    importInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const backup = JSON.parse(reader.result);
          if (!backup.data) throw new Error('Invalid format');
          Object.keys(backup.data).forEach(k => {
            localStorage.setItem(USER_PREFIX + k, backup.data[k]);
          });
          alert('Backup restored! Reloading workspace...');
          location.reload();
        } catch (err) {
          alert('Failed to restore backup: File is invalid or corrupted.');
        }
      };
      reader.readAsText(file);
    });
  }

  // Initial Meta & Custom Routine Setup
  let meta = await safeGet('meta');
  if (!meta) {
    meta = { startDate: todayKey, bestStreak: 0 };
    await safeSet('meta', meta);
  }

  let customRoutine = await safeGet('custom-routine');
  if (!customRoutine || !Array.isArray(customRoutine) || customRoutine.length === 0) {
    customRoutine = [...DEFAULT_WEEKDAY_TASKS];
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
  document.getElementById('dayNumber').textContent = dayNumberOf(todayKey);

  // ==========================================================================
  // TAB NAVIGATION SYSTEM
  // ==========================================================================
  const tabButtons = document.querySelectorAll('.nav-tab');
  const views = {
    today: document.getElementById('view-today'),
    routine: document.getElementById('view-routine'),
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

    if (viewName === 'routine') renderRoutineManager();
    if (viewName === 'journal') loadJournalForDate(dateKey(today));
    if (viewName === 'monthly') renderTargets();
    if (viewName === 'yearly') { renderHeatmap(); renderYearlyPies(); }
    if (viewName === 'rewards') { renderBadges(); renderRewards(); }
  }

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.view));
  });

  const btnGoToRoutine = document.getElementById('btnGoToRoutineBuilder');
  if (btnGoToRoutine) btnGoToRoutine.addEventListener('click', () => switchTab('routine'));

  // ==========================================================================
  // TODAY VIEW & CHECKLIST ENGINE
  // ==========================================================================
  const checklistEl = document.getElementById('checklist');

  function getActiveTasks() {
    return customRoutine;
  }

  function renderChecklist() {
    if (!checklistEl) return;
    checklistEl.innerHTML = '';
    const tasks = getActiveTasks();

    PERIODS.forEach(p => {
      const periodTasks = tasks.filter(t => t.period === p.key);
      if (periodTasks.length === 0) return;

      const group = document.createElement('div');
      group.className = 'period-group';
      group.innerHTML = `<div class="period-title"><span class="period-dot" style="background:${p.color}"></span>${p.label}</div>`;

      periodTasks.forEach(t => {
        const isDone = todayDone.has(t.id);
        const isLocked = !isDone && t.startMin > nowMinutes();

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
            <div class="task-time">${t.time}</div>
            <div class="task-name">${t.name}</div>
            ${isLocked ? `<div class="task-lock-note">Unlocks at ${formatClock(t.startMin)}</div>` : ''}
          </div>`;

        if (!isLocked) {
          row.addEventListener('click', () => toggleTask(t.id));
        }

        group.appendChild(row);
      });

      checklistEl.appendChild(group);
    });
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
  // HERO METRICS & STREAKS CALCULATOR
  // ==========================================================================
  function computeStreaks() {
    let current = 0;
    let d = new Date(today);
    const tasks = getActiveTasks();

    while (true) {
      const k = dateKey(d);
      const done = yearSummary[k] || [];
      if (done.length >= tasks.length && tasks.length > 0) {
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
      const full = done.length >= tasks.length && tasks.length > 0;
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
    const activeTasks = getActiveTasks();
    const doneCount = todayDone.size;
    const totalToday = activeTasks.length;
    const pct = totalToday > 0 ? Math.round((doneCount / totalToday) * 100) : 0;

    document.getElementById('todayPct').textContent = pct + '%';
    document.getElementById('doneTodaySub').textContent = `${doneCount} of ${totalToday} tasks finished`;

    // Calculate total lifetime tasks checked
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

  // Quotes Database
  const QUOTES = [
    "The line only stays straight if you walk it today.",
    "Small hours, kept honestly, become a whole life.",
    "Discipline is just love for who you're becoming.",
    "Nobody sees 5 AM but you — that's exactly the point.",
    "One more done today is one less to regret tonight.",
    "The arc bends toward whoever keeps showing up.",
    "Consistency is boring in the moment, unforgettable in a year."
  ];
  const quoteEl = document.getElementById('quoteLine');
  if (quoteEl) {
    const idx = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);
    quoteEl.textContent = `"${QUOTES[idx % QUOTES.length]}"`;
  }

  // ==========================================================================
  // ROUTINE BUILDER / TASK MANAGER
  // ==========================================================================
  const routineListEl = document.getElementById('routineManagerList');
  const taskModal = document.getElementById('taskModal');
  const taskForm = document.getElementById('taskForm');

  function renderRoutineManager() {
    if (!routineListEl) return;
    routineListEl.innerHTML = '';

    customRoutine.forEach(t => {
      const item = document.createElement('div');
      item.className = 'routine-manager-item';
      item.innerHTML = `
        <div class="routine-item-left">
          <span style="font-size:24px">${t.icon}</span>
          <div>
            <div style="font-weight:700; font-size:15px">${t.name}</div>
            <div style="font-size:12.5px; color:var(--text-muted)">
              <span class="task-time">${t.time}</span> · Unlock Hour: ${formatClock(t.startMin)}
            </div>
          </div>
        </div>
        <div class="routine-item-actions">
          <button class="btn btn-secondary btn-sm edit-task-btn" data-id="${t.id}"><i class="fa-solid fa-pen"></i></button>
          <button class="btn btn-danger btn-sm delete-task-btn" data-id="${t.id}"><i class="fa-solid fa-trash"></i></button>
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
          showToast('Task deleted from routine');
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
        document.getElementById('taskTimeInput').value = t.time;
        document.getElementById('taskStartMinInput').value = Math.floor(t.startMin / 60);
        document.getElementById('taskPeriodInput').value = t.period;
        document.getElementById('taskCatInput').value = t.cat;
        document.getElementById('taskIconInput').value = t.icon;
      }
    } else {
      taskForm.reset();
    }

    taskModal.classList.add('open');
  }

  function closeTaskModal() {
    if (taskModal) taskModal.classList.remove('open');
  }

  document.getElementById('btnOpenAddTaskModal')?.addEventListener('click', () => openTaskModal());
  document.getElementById('taskModalClose')?.addEventListener('click', closeTaskModal);
  document.getElementById('btnCancelTaskModal')?.addEventListener('click', closeTaskModal);

  if (taskForm) {
    taskForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const editId = document.getElementById('editTaskId').value;
      const name = document.getElementById('taskNameInput').value.trim();
      const time = document.getElementById('taskTimeInput').value.trim();
      const hour = parseInt(document.getElementById('taskStartMinInput').value) || 0;
      const period = document.getElementById('taskPeriodInput').value;
      const cat = document.getElementById('taskCatInput').value;
      const icon = document.getElementById('taskIconInput').value.trim() || '📌';

      if (editId) {
        const idx = customRoutine.findIndex(x => x.id === parseInt(editId));
        if (idx !== -1) {
          customRoutine[idx] = { id: parseInt(editId), name, time, startMin: hour * 60, period, cat, icon };
        }
      } else {
        const newId = Date.now();
        customRoutine.push({ id: newId, name, time, startMin: hour * 60, period, cat, icon });
      }

      await safeSet('custom-routine', customRoutine);
      closeTaskModal();
      renderRoutineManager();
      renderChecklist();
      updateHeroMetrics();
      showToast(editId ? 'Task updated!' : 'New task added to routine!');
    });
  }

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
  // MONTHLY & YEARLY PIE CHARTS
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
      el.innerHTML = '<div style="font-size:13px; color:var(--text-faint); text-align:center; padding:16px;">No data recorded yet for this timeframe.</div>';
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

  // Monthly Target Tracker
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
        <td><input class="target-input" data-cat="${c.key}" placeholder="e.g. Complete 20 study sessions" value="${(targets[c.key] || '').replace(/"/g, '&quot;')}"></td>
        <td style="text-align:right"><span class="days-count">15<span> / 30d</span></span></td>
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
      });
    });
  }

  document.getElementById('prevMonth')?.addEventListener('click', () => { viewMonth.setMonth(viewMonth.getMonth() - 1); renderTargets(); });
  document.getElementById('nextMonth')?.addEventListener('click', () => { viewMonth.setMonth(viewMonth.getMonth() + 1); renderTargets(); });

  function renderYearlyPies() {
    const weekdaySegs = TIME_ALLOCATION_WEEKDAY.map(t => ({ label: t.label, hex: t.hex, value: t.minutes }));
    renderPie('timeManagementPieWeekday', weekdaySegs, '17.5h', 'awake day');

    const sundaySegs = TIME_ALLOCATION_SUNDAY.map(t => ({ label: t.label, hex: t.hex, value: t.minutes }));
    renderPie('timeManagementPieSunday', sundaySegs, '17.5h', 'awake day');
  }

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
      const total = getActiveTasks().length;
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
    const tasks = getActiveTasks();

    document.getElementById('dayModalTitle').textContent = dObj.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
    const pct = tasks.length > 0 ? Math.round((done.size / tasks.length) * 100) : 0;

    let rows = `<div style="font-family:var(--font-serif); color:var(--gold); font-size:16px; margin-bottom:12px;">${done.size} of ${tasks.length} tasks finished (${pct}%)</div>`;
    tasks.forEach(t => {
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
