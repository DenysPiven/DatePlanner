(function () {
  'use strict';

  const DRAFT_KEY = 'dateplanner_draft';

  /** Progress map: current step → weight (out of PROGRESS_TOTAL). */
  const PROGRESS = {
    intro: 0,
    lifestyle: 1,
    energy: 2,
    smoking: 3,
    alcohol: 4,
    duration: 5,
    topics: 6,
    venue: 7,
    drink: 8,
    meal_style: 8,
    after: 9,
    place: 10,
    when: 11,
    apply: 12,
    done: 13
  };
  const PROGRESS_TOTAL = 13;

  const state = {
    screen: 'intro',
    screenIndex: 0,
    datetime: {},
    answers: {},
    questionId: 'lifestyle',
    instagram: '',
    whyMe: ''
  };

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  const progressBar = $('#progressBar');
  const stepLabel = $('#stepLabel');
  const toast = $('#toast');
  let introIndex = 0;

  function applyLocale() {
    $('#brand').textContent = PROFILE.name;
    $('#startBtn').textContent = UI.start;
    $('#whenTitle').textContent = UI.whenTitle;
    $('#whenSub').textContent = UI.whenSub;
    $('#labelDate').textContent = UI.date;
    $('#labelTime').textContent = UI.time;
    $('#datetimeNextBtn').textContent = UI.next;
    $('#multiNextBtn').textContent = UI.next;
    $('#applyTitle').textContent = UI.applyTitle;
    $('#applySub').textContent = UI.applySub;
    $('#labelInstagram').textContent = UI.instagram;
    $('#instagramInput').placeholder = UI.instagramPlaceholder;
    $('#labelWhyMe').textContent = UI.whyMe;
    $('#whyMeInput').placeholder = UI.whyMePlaceholder;
    $('#submitBtn').textContent = UI.submit;
    $('#doneTitle').textContent = UI.doneTitle;
    $('#doneText').textContent = UI.doneText;
    $('#doneHint').textContent = UI.doneHint;
  }

  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('toast--visible');
    setTimeout(() => toast.classList.remove('toast--visible'), 2500);
  }

  function updateProgress(key) {
    const current = PROGRESS[key] != null ? PROGRESS[key] : 0;
    const pct = Math.round((current / PROGRESS_TOTAL) * 100);
    const left = Math.max(0, PROGRESS_TOTAL - current);
    progressBar.style.width = `${Math.max(pct, key === 'intro' ? 4 : pct)}%`;

    if (key === 'intro') {
      stepLabel.textContent = UI.welcome;
    } else if (key === 'done') {
      stepLabel.textContent = UI.progressDone;
      progressBar.style.width = '100%';
    } else {
      stepLabel.textContent = UI.progress(pct, left);
    }
  }

  function showScreen(name) {
    state.screen = name;
    $$('.step').forEach((el) => el.classList.remove('step--active'));
    const target = document.querySelector(`[data-screen="${name}"]`);
    if (target) target.classList.add('step--active');

    const progressKey =
      name === 'question' ? state.questionId : name;
    updateProgress(progressKey);
    saveDraft();
  }

  /* —— Draft (sessionStorage) —— */
  function saveDraft() {
    if (state.screen === 'done' || state.screen === 'intro') return;
    try {
      const draft = {
        screen: state.screen,
        questionId: state.questionId,
        screenIndex: state.screenIndex,
        answers: state.answers,
        datetime: state.datetime,
        instagram: state.instagram,
        whyMe: state.whyMe,
        introIndex
      };
      sessionStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    } catch {
      /* ignore */
    }
  }

  function clearDraft() {
    try {
      sessionStorage.removeItem(DRAFT_KEY);
    } catch {
      /* ignore */
    }
  }

  function hydrateAnswers(saved) {
    const out = {};
    if (!saved || typeof saved !== 'object') return out;

    Object.keys(saved).forEach((key) => {
      const q = QUESTIONS[key];
      const val = saved[key];
      if (!q || !val) return;

      if (Array.isArray(val)) {
        out[key] = val
          .map((v) => {
            const id = v && v.id ? v.id : v;
            return q.options.find((o) => o.id === id);
          })
          .filter(Boolean);
      } else {
        const id = val.id || val;
        out[key] = q.options.find((o) => o.id === id) || val;
      }
    });

    return out;
  }

  function hasDraft() {
    try {
      const raw = sessionStorage.getItem(DRAFT_KEY);
      if (!raw) return false;
      const draft = JSON.parse(raw);
      return draft && draft.screen && draft.screen !== 'intro' && draft.screen !== 'done';
    } catch {
      return false;
    }
  }

  function restoreDraft() {
    try {
      const raw = sessionStorage.getItem(DRAFT_KEY);
      if (!raw) return false;
      const draft = JSON.parse(raw);
      if (!draft || !draft.screen || draft.screen === 'intro' || draft.screen === 'done') {
        return false;
      }

      state.answers = hydrateAnswers(draft.answers);
      state.datetime = draft.datetime || {};
      state.questionId = draft.questionId || 'lifestyle';
      state.screenIndex = draft.screenIndex || 1;
      state.instagram = draft.instagram || '';
      state.whyMe = draft.whyMe || '';

      if (draft.datetime && draft.datetime.date) {
        $('#dateInput').value = draft.datetime.date;
      }
      if (draft.datetime && draft.datetime.time) {
        $('#timeInput').value = draft.datetime.time;
        $$('#timeChips .chip').forEach((c) => {
          c.classList.toggle('chip--active', c.dataset.time === draft.datetime.time);
        });
      }
      if (state.instagram) $('#instagramInput').value = state.instagram;
      if (state.whyMe) $('#whyMeInput').value = state.whyMe;

      if (draft.screen === 'question') {
        renderQuestion(state.questionId);
      } else if (draft.screen === 'when') {
        showScreen('when');
      } else if (draft.screen === 'apply') {
        renderPreview();
        showScreen('apply');
      } else {
        return false;
      }

      return true;
    } catch {
      return false;
    }
  }

  function updateStartButton() {
    const btn = $('#startBtn');
    if (hasDraft()) {
      btn.textContent = UI.continue;
      btn.dataset.resume = '1';
    } else {
      btn.textContent = UI.start;
      delete btn.dataset.resume;
    }
  }

  /* —— Intro album (manual only) —— */
  function renderIntro() {
    const photos = PROFILE.photos;
    $('#introSlides').innerHTML = photos.map((p, i) => `
      <div class="intro__slide${i === 0 ? ' intro__slide--active' : ''}" style="background-image:url('${p.src}')"></div>
    `).join('');

    $('#introDots').innerHTML = photos.map((_, i) =>
      `<button type="button" class="intro__dot${i === 0 ? ' intro__dot--active' : ''}" data-intro="${i}" aria-label="Photo ${i + 1}"></button>`
    ).join('');

    $('#introMeta').textContent = UI.ageCity(PROFILE.age, PROFILE.city);
    $('#introTitle').textContent = PROFILE.name;
    $('#introTagline').textContent = PROFILE.tagline;
    $('#introText').textContent = PROFILE.bio;

    showIntroSlide(0);

    $$('#introDots .intro__dot').forEach((dot) => {
      dot.addEventListener('click', () => showIntroSlide(Number(dot.dataset.intro)));
    });

    $('#introPrev').addEventListener('click', (e) => {
      e.stopPropagation();
      showIntroSlide(introIndex - 1);
    });
    $('#introNext').addEventListener('click', (e) => {
      e.stopPropagation();
      showIntroSlide(introIndex + 1);
    });

    bindIntroSwipe($('#introGallery'));
  }

  function showIntroSlide(i) {
    const total = PROFILE.photos.length;
    if (i < 0 || i >= total) return;

    introIndex = i;
    $$('.intro__slide').forEach((el, idx) => el.classList.toggle('intro__slide--active', idx === i));
    $$('.intro__dot').forEach((el, idx) => el.classList.toggle('intro__dot--active', idx === i));
    $('#introCounter').textContent = `${i + 1} / ${total}`;
    $('#introPrev').hidden = i === 0;
    $('#introNext').hidden = i === total - 1;
  }

  function bindIntroSwipe(gallery) {
    let startX = 0;
    let startY = 0;

    gallery.addEventListener('touchstart', (e) => {
      const t = e.touches[0];
      startX = t.clientX;
      startY = t.clientY;
    }, { passive: true });

    gallery.addEventListener('touchend', (e) => {
      const t = e.changedTouches[0];
      const dx = t.clientX - startX;
      const dy = t.clientY - startY;
      if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return;
      if (dx < 0) showIntroSlide(introIndex + 1);
      else showIntroSlide(introIndex - 1);
    }, { passive: true });
  }

  /* —— Branching questions —— */
  function startQuestions() {
    state.answers = {};
    state.questionId = 'lifestyle';
    state.screenIndex = 1;
    state.datetime = {};
    state.instagram = '';
    state.whyMe = '';
    renderQuestion('lifestyle');
  }

  function goNext(nextId) {
    state.screenIndex++;

    if (nextId === 'when') {
      showScreen('when');
      return;
    }

    if (nextId === 'apply') {
      renderPreview();
      showScreen('apply');
      return;
    }

    renderQuestion(nextId);
  }

  function pulseCard(el) {
    el.classList.remove('choice__card--pulse');
    void el.offsetWidth;
    el.classList.add('choice__card--pulse');
  }

  function renderQuestion(id) {
    const q = QUESTIONS[id];
    if (!q) return;

    state.questionId = id;
    $('#questionTitle').textContent = q.title;
    $('#questionSub').textContent = q.sub;

    const list = $('#choiceList');
    const nextBtn = $('#multiNextBtn');
    const isMulti = !!q.multi;
    const isPair = !isMulti && q.options.length === 2;

    list.innerHTML = '';
    list.className = isPair ? 'choice choice--pair' : 'choice choice--grid';
    if (isMulti) list.classList.add('choice--multi');

    const selected = new Set();
    const existing = state.answers[id];
    if (isMulti && Array.isArray(existing)) {
      existing.forEach((o) => selected.add(o.id));
    }

    q.options.forEach((opt, i) => {
      if (isPair && i === 1) {
        const or = document.createElement('div');
        or.className = 'choice__or';
        or.textContent = UI.or;
        list.appendChild(or);
      }

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'choice__card' + (opt.recommended ? ' choice__card--recommended' : '');
      if (isMulti && selected.has(opt.id)) btn.classList.add('choice__card--checked');
      btn.dataset.id = opt.id;
      btn.style.animationDelay = `${i * 40}ms`;
      btn.classList.add('choice__card--enter');
      btn.innerHTML = `
        ${opt.recommended ? `<span class="choice__badge">${UI.recommended}</span>` : ''}
        ${isMulti ? '<span class="choice__check" aria-hidden="true"></span>' : ''}
        <div class="choice__photo" style="background-image:url('${opt.photo}')"></div>
        <div class="choice__body">
          <div class="choice__title">${opt.title}</div>
          <div class="choice__desc">${opt.desc}</div>
        </div>
      `;

      if (isMulti) {
        btn.addEventListener('click', () => {
          pulseCard(btn);
          if (selected.has(opt.id)) {
            selected.delete(opt.id);
            btn.classList.remove('choice__card--checked');
          } else {
            selected.add(opt.id);
            btn.classList.add('choice__card--checked');
          }
          nextBtn.disabled = selected.size === 0;
        });
      } else {
        btn.addEventListener('click', () => pickSingle(q, opt, btn));
      }

      list.appendChild(btn);
    });

    if (isMulti) {
      nextBtn.hidden = false;
      nextBtn.disabled = selected.size === 0;
      nextBtn.onclick = () => {
        if (!selected.size) {
          showToast(UI.pickAtLeastOne);
          return;
        }
        const picks = q.options.filter((o) => selected.has(o.id));
        state.answers[q.id] = picks;
        goNext(q.next);
      };
    } else {
      nextBtn.hidden = true;
      nextBtn.onclick = null;
    }

    showScreen('question');
  }

  function pickSingle(question, option, btnEl) {
    state.answers[question.id] = option;
    pulseCard(btnEl);

    $$('#choiceList .choice__card').forEach((c) => {
      if (c === btnEl) c.classList.add('choice__card--picked');
      else c.classList.add('choice__card--lost');
    });

    setTimeout(() => goNext(option.next), 320);
  }

  /* —— Summary & apply —— */
  function formatDate(dateStr) {
    const d = new Date(dateStr + 'T12:00:00');
    return d.toLocaleDateString('uk-UA', { weekday: 'long', day: 'numeric', month: 'long' });
  }

  const PLAN_KEYS = ['duration', 'venue', 'drink', 'meal_style', 'after', 'place'];
  const ABOUT_KEYS = ['lifestyle', 'energy', 'topics'];
  const FILTER_KEYS = ['smoking', 'alcohol'];

  function answerTitle(value) {
    if (!value) return '';
    if (Array.isArray(value)) return value.map((o) => o.title).join(', ');
    return value.title || '';
  }

  function linesFromKeys(keys) {
    return keys.map((k) => answerTitle(state.answers[k])).filter(Boolean);
  }

  function planPhoto() {
    const a = state.answers;
    const item = a.place || a.after || a.venue;
    return item ? item.photo : PROFILE.photos[0].src;
  }

  function renderPreview() {
    const dateFormatted = formatDate(state.datetime.date);
    const about = linesFromKeys(ABOUT_KEYS).join(' · ');
    const filters = linesFromKeys(FILTER_KEYS).join(' · ');
    const plan = linesFromKeys(PLAN_KEYS).join(' → ');

    $('#previewCard').innerHTML = `
      <div class="preview-place" style="background-image:url('${planPhoto()}')">
        <div class="preview-place__label">${answerTitle(state.answers.place || state.answers.venue)}</div>
      </div>
      <div class="summary__row">
        <span class="summary__row-icon">📅</span>
        <div><span class="summary__row-label">${UI.summaryWhen}</span>${dateFormatted}, ${state.datetime.time}</div>
      </div>
      <div class="summary__row">
        <span class="summary__row-icon">👤</span>
        <div><span class="summary__row-label">${UI.summaryAbout}</span>${about}</div>
      </div>
      <div class="summary__row">
        <span class="summary__row-icon">🚫</span>
        <div><span class="summary__row-label">${UI.summaryFilters}</span>${filters}</div>
      </div>
      <div class="summary__row">
        <span class="summary__row-icon">💫</span>
        <div><span class="summary__row-label">${UI.summaryPlan}</span>${plan}</div>
      </div>
    `;
  }

  function normalizeInstagram(value) {
    let v = (value || '').trim();
    v = v.replace(/^https?:\/\/(www\.)?instagram\.com\//i, '');
    v = v.replace(/\/.*$/, '');
    v = v.replace(/^@/, '');
    return v;
  }

  /** Passive device/browser signals — no permission prompts. */
  function collectDeviceInfo() {
    const nav = navigator;
    const screenObj = window.screen || {};
    const conn = nav.connection || nav.mozConnection || nav.webkitConnection;
    const tz = (() => {
      try {
        return Intl.DateTimeFormat().resolvedOptions().timeZone || '';
      } catch {
        return '';
      }
    })();

    const uaData = nav.userAgentData
      ? {
          brands: (nav.userAgentData.brands || []).map((b) => `${b.brand} ${b.version}`).join(', '),
          mobile: !!nav.userAgentData.mobile,
          platform: nav.userAgentData.platform || ''
        }
      : null;

    return {
      platform: nav.platform || '',
      language: nav.language || '',
      languages: Array.isArray(nav.languages) ? nav.languages.join(', ') : '',
      timezone: tz,
      timezoneOffsetMin: new Date().getTimezoneOffset(),
      screen: `${screenObj.width || 0}×${screenObj.height || 0}`,
      availScreen: `${screenObj.availWidth || 0}×${screenObj.availHeight || 0}`,
      colorDepth: screenObj.colorDepth || 0,
      pixelRatio: window.devicePixelRatio || 1,
      viewport: `${window.innerWidth || 0}×${window.innerHeight || 0}`,
      touchPoints: nav.maxTouchPoints || 0,
      hardwareConcurrency: nav.hardwareConcurrency || 0,
      deviceMemoryGb: nav.deviceMemory || null,
      cookieEnabled: !!nav.cookieEnabled,
      online: !!nav.onLine,
      pdfViewer: !!nav.pdfViewerEnabled,
      webdriver: !!nav.webdriver,
      vendor: nav.vendor || '',
      darkMode: !!(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches),
      reducedMotion: !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches),
      connection: conn
        ? {
            type: conn.effectiveType || conn.type || '',
            downlink: conn.downlink != null ? conn.downlink : null,
            rtt: conn.rtt != null ? conn.rtt : null,
            saveData: !!conn.saveData
          }
        : null,
      uaData,
      collectedAt: new Date().toISOString()
    };
  }

  function buildApplicationPayload() {
    return {
      instagram: '@' + state.instagram,
      whyMe: state.whyMe,
      when: `${state.datetime.date} ${state.datetime.time}`,
      about: linesFromKeys(ABOUT_KEYS).join(' · '),
      filters: linesFromKeys(FILTER_KEYS).join(' · '),
      plan: linesFromKeys(PLAN_KEYS).join(' → '),
      lifestyle: answerTitle(state.answers.lifestyle),
      energy: answerTitle(state.answers.energy),
      smoking: answerTitle(state.answers.smoking),
      alcohol: answerTitle(state.answers.alcohol),
      duration: answerTitle(state.answers.duration),
      topics: answerTitle(state.answers.topics),
      venue: answerTitle(state.answers.venue),
      drinkOrMeal: answerTitle(state.answers.drink || state.answers.meal_style),
      after: answerTitle(state.answers.after),
      place: answerTitle(state.answers.place),
      city: PROFILE.city,
      device: collectDeviceInfo(),
      submittedAt: new Date().toISOString()
    };
  }

  async function sendApplication(payload) {
    const encrypted = await AppCrypto.encryptApplication(payload);
    await AppStorage.addSealed(encrypted);
    return true;
  }

  async function handleApply(e) {
    e.preventDefault();
    const handle = normalizeInstagram($('#instagramInput').value);
    const whyMe = ($('#whyMeInput').value || '').trim();

    if (!handle) {
      showToast(UI.toastInstagram);
      return;
    }
    if (!whyMe) {
      showToast(UI.whyMeRequired);
      $('#whyMeInput').focus();
      return;
    }

    state.instagram = handle;
    state.whyMe = whyMe;
    saveDraft();

    const btn = $('#submitBtn');
    btn.disabled = true;
    btn.textContent = UI.submitting;

    try {
      const ok = await sendApplication(buildApplicationPayload());
      if (!ok) throw new Error('send failed');
      clearDraft();
      showToast(UI.toastSent);
      state.screenIndex = PROGRESS_TOTAL;
      showScreen('done');
    } catch {
      showToast(UI.toastError);
      btn.disabled = false;
      btn.textContent = UI.submit;
    }
  }

  function initDateDefaults() {
    const dateInput = $('#dateInput');
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateInput.min = new Date().toISOString().split('T')[0];
    if (!dateInput.value) {
      dateInput.value = tomorrow.toISOString().split('T')[0];
    }
  }

  function bindEvents() {
    $('#startBtn').addEventListener('click', () => {
      if ($('#startBtn').dataset.resume === '1') {
        if (restoreDraft()) return;
      }
      clearDraft();
      startQuestions();
    });

    $('#datetimeForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      state.datetime = { date: fd.get('date'), time: fd.get('time') };
      state.screenIndex++;
      renderPreview();
      showScreen('apply');
    });

    $$('#timeChips .chip').forEach((chip) => {
      chip.addEventListener('click', () => {
        $$('#timeChips .chip').forEach((c) => c.classList.remove('chip--active'));
        chip.classList.add('chip--active');
        $('#timeInput').value = chip.dataset.time;
      });
    });

    $('#instagramInput').addEventListener('input', () => {
      state.instagram = normalizeInstagram($('#instagramInput').value);
      saveDraft();
    });

    $('#whyMeInput').addEventListener('input', () => {
      state.whyMe = ($('#whyMeInput').value || '').trim();
      saveDraft();
    });

    $('#applyForm').addEventListener('submit', handleApply);
  }

  function init() {
    console.log(
      '%cСюди не дивись 👀\nТут тільки для адміна.\nЗа цікавість ніс відірвуть.\nВсе одно нічого тут не знайдеш.',
      'color:#ff6b9d;font-size:14px;font-weight:700;line-height:1.5'
    );

    document.title = `${PROFILE.name} · ${PROFILE.city}`;
    applyLocale();
    renderIntro();
    initDateDefaults();
    bindEvents();
    updateStartButton();
    state.screenIndex = 0;
    showScreen('intro');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
