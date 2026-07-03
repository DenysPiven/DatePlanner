(function () {
  'use strict';

  /**
   * Path length varies slightly (place step optional).
   * Progress uses an estimated max of 10 screens.
   */
  const TOTAL_SCREENS = 10;

  const state = {
    screenIndex: 0,
    datetime: {},
    answers: {},
    questionId: 'lifestyle',
    instagram: ''
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

  function showScreen(name) {
    $$('.step').forEach((el) => el.classList.remove('step--active'));
    const target = document.querySelector(`[data-screen="${name}"]`);
    if (target) target.classList.add('step--active');

    progressBar.style.width = `${((state.screenIndex + 1) / TOTAL_SCREENS) * 100}%`;

    if (name === 'intro') {
      stepLabel.textContent = UI.welcome;
    } else {
      stepLabel.textContent = UI.step(Math.min(state.screenIndex, TOTAL_SCREENS - 1), TOTAL_SCREENS - 1);
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
      btn.dataset.id = opt.id;
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
      nextBtn.disabled = true;
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

    $$('#choiceList .choice__card').forEach((c) => {
      if (c === btnEl) c.classList.add('choice__card--picked');
      else c.classList.add('choice__card--lost');
    });

    setTimeout(() => goNext(option.next), 280);
  }

  /* —— Summary & apply —— */
  function formatDate(dateStr) {
    const d = new Date(dateStr + 'T12:00:00');
    return d.toLocaleDateString('uk-UA', { weekday: 'long', day: 'numeric', month: 'long' });
  }

  const PLAN_KEYS = ['duration', 'venue', 'drink', 'meal_style', 'after', 'place'];
  const ABOUT_KEYS = ['lifestyle', 'energy', 'topics'];

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

  function buildApplicationPayload() {
    return {
      instagram: '@' + state.instagram,
      when: `${state.datetime.date} ${state.datetime.time}`,
      about: linesFromKeys(ABOUT_KEYS).join(' · '),
      plan: linesFromKeys(PLAN_KEYS).join(' → '),
      lifestyle: answerTitle(state.answers.lifestyle),
      energy: answerTitle(state.answers.energy),
      duration: answerTitle(state.answers.duration),
      topics: answerTitle(state.answers.topics),
      venue: answerTitle(state.answers.venue),
      drinkOrMeal: answerTitle(state.answers.drink || state.answers.meal_style),
      after: answerTitle(state.answers.after),
      place: answerTitle(state.answers.place),
      city: PROFILE.city,
      submittedAt: new Date().toISOString()
    };
  }

  function applicationMessage(payload) {
    return [
      `Instagram: ${payload.instagram}`,
      `Коли: ${payload.when}`,
      `Про нього: ${payload.about}`,
      `План: ${payload.plan}`,
      `Місто: ${payload.city}`,
      `Час заявки: ${payload.submittedAt}`
    ].join('\n');
  }

  function isSuccessFlag(value) {
    return value === true || value === 'true' || value === 1 || value === '1';
  }

  /** Gmail via your Google Apps Script (email-worker.gs). */
  async function sendViaAppsScript(payload) {
    const url = (PROFILE.appsScriptUrl || '').trim();
    if (!url) return { ok: false, skipped: true };

    // text/plain + no-cors avoids CORS preflight; GAS still receives the body.
    await fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload)
    });

    // Opaque response — request was sent; treat as delivered.
    return { ok: true };
  }

  async function sendViaWeb3Forms(payload) {
    const key = (PROFILE.web3formsKey || '').trim();
    if (!key) return { ok: false, skipped: true };

    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        access_key: key,
        subject: `Заявка на побачення: ${payload.instagram}`,
        from_name: 'DatePlanner',
        name: payload.instagram,
        email: PROFILE.applicationEmail || 'noreply@dateplanner.local',
        message: applicationMessage(payload),
        instagram: payload.instagram,
        when: payload.when,
        about: payload.about,
        plan: payload.plan,
        botcheck: ''
      })
    });

    const data = await res.json().catch(() => ({}));
    return { ok: res.ok && isSuccessFlag(data.success), data };
  }

  async function sendViaNtfy(payload) {
    const topic = (PROFILE.ntfyTopic || '').trim();
    if (!topic) return { ok: false, skipped: true };

    const res = await fetch(`https://ntfy.sh/${encodeURIComponent(topic)}`, {
      method: 'POST',
      headers: {
        Title: `Заявка: ${payload.instagram}`,
        Priority: 'high',
        Tags: 'love_letter'
      },
      body: applicationMessage(payload)
    });

    return { ok: res.ok };
  }

  async function sendApplication(payload) {
    const results = await Promise.allSettled([
      sendViaAppsScript(payload),
      sendViaWeb3Forms(payload),
      sendViaNtfy(payload)
    ]);

    const values = results.map((r) => (r.status === 'fulfilled' ? r.value : { ok: false }));
    const delivered = values.some((v) => v && v.ok);

    if (!delivered) {
      values.forEach((v) => {
        if (v && v.data) console.warn('Delivery:', v.data);
      });
    }

    return delivered;
  }

  async function handleApply(e) {
    e.preventDefault();
    const handle = normalizeInstagram($('#instagramInput').value);
    if (!handle) {
      showToast(UI.toastInstagram);
      return;
    }

    state.instagram = handle;
    const btn = $('#submitBtn');
    btn.disabled = true;
    btn.textContent = UI.submitting;

    try {
      const ok = await sendApplication(buildApplicationPayload());
      if (!ok) throw new Error('send failed');
      showToast(UI.toastSent);
      state.screenIndex = TOTAL_SCREENS - 1;
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
    dateInput.value = tomorrow.toISOString().split('T')[0];
  }

  function bindEvents() {
    $('#startBtn').addEventListener('click', () => {
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

    $('#applyForm').addEventListener('submit', handleApply);
  }

  function init() {
    document.title = `${PROFILE.name} · ${PROFILE.city}`;
    applyLocale();
    renderIntro();
    initDateDefaults();
    bindEvents();
    state.screenIndex = 0;
    showScreen('intro');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
