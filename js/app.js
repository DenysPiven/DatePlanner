(function () {
  'use strict';

  /** Fixed path length for progress: intro → when → 5 questions → apply → done */
  const TOTAL_SCREENS = 8;

  const state = {
    screenIndex: 0,
    datetime: {},
    answers: {},
    questionId: 'venue',
    instagram: ''
  };

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  const progressBar = $('#progressBar');
  const stepLabel = $('#stepLabel');
  const toast = $('#toast');
  let introTimer = null;
  let introIndex = 0;

  function applyLocale() {
    $('#brand').textContent = PROFILE.name;
    $('#startBtn').textContent = UI.start;
    $('#whenTitle').textContent = UI.whenTitle;
    $('#whenSub').textContent = UI.whenSub;
    $('#labelDate').textContent = UI.date;
    $('#labelTime').textContent = UI.time;
    $('#datetimeNextBtn').textContent = UI.next;
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
      startIntroCarousel();
    } else {
      stopIntroCarousel();
      stepLabel.textContent = UI.step(state.screenIndex, TOTAL_SCREENS - 1);
    }
  }

  /* —— Intro —— */
  function renderIntro() {
    const photos = PROFILE.photos;
    $('#introGallery').innerHTML = photos.map((p, i) => `
      <div class="intro__slide${i === 0 ? ' intro__slide--active' : ''}" style="background-image:url('${p.src}')"></div>
    `).join('');

    $('#introDots').innerHTML = photos.map((_, i) =>
      `<button type="button" class="intro__dot${i === 0 ? ' intro__dot--active' : ''}" data-intro="${i}"></button>`
    ).join('');

    $('#introMeta').textContent = UI.ageCity(PROFILE.age, PROFILE.city);
    $('#introTitle').textContent = PROFILE.name;
    $('#introTagline').textContent = PROFILE.tagline;
    $('#introText').textContent = PROFILE.bio;

    $$('#introDots .intro__dot').forEach((dot) => {
      dot.addEventListener('click', () => showIntroSlide(Number(dot.dataset.intro)));
    });
  }

  function showIntroSlide(i) {
    introIndex = i;
    $$('.intro__slide').forEach((el, idx) => el.classList.toggle('intro__slide--active', idx === i));
    $$('.intro__dot').forEach((el, idx) => el.classList.toggle('intro__dot--active', idx === i));
  }

  function startIntroCarousel() {
    stopIntroCarousel();
    introTimer = setInterval(() => {
      showIntroSlide((introIndex + 1) % PROFILE.photos.length);
    }, 3500);
  }

  function stopIntroCarousel() {
    if (introTimer) {
      clearInterval(introTimer);
      introTimer = null;
    }
  }

  /* —— Branching questions —— */
  function startQuestions() {
    state.answers = {};
    state.questionId = 'venue';
    state.screenIndex = 2;
    renderQuestion('venue');
  }

  function renderQuestion(id) {
    if (id === 'apply') {
      state.screenIndex = TOTAL_SCREENS - 2;
      renderPreview();
      showScreen('apply');
      return;
    }

    const q = QUESTIONS[id];
    if (!q) return;

    state.questionId = id;
    $('#questionTitle').textContent = q.title;
    $('#questionSub').textContent = q.sub;

    const list = $('#choiceList');
    const isPair = q.options.length === 2;

    list.innerHTML = '';
    list.className = isPair ? 'choice choice--pair' : 'choice choice--grid';

    q.options.forEach((opt, i) => {
      if (isPair && i === 1) {
        const or = document.createElement('div');
        or.className = 'choice__or';
        or.textContent = UI.or;
        list.appendChild(or);
      }

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'choice__card';
      btn.innerHTML = `
        <div class="choice__photo" style="background-image:url('${opt.photo}')"></div>
        <div class="choice__body">
          <div class="choice__title">${opt.title}</div>
          <div class="choice__desc">${opt.desc}</div>
        </div>
      `;
      btn.addEventListener('click', () => pickOption(q, opt, btn));
      list.appendChild(btn);
    });

    showScreen('question');
  }

  function pickOption(question, option, btnEl) {
    state.answers[question.id] = option;

    $$('#choiceList .choice__card').forEach((c) => {
      if (c === btnEl) c.classList.add('choice__card--picked');
      else c.classList.add('choice__card--lost');
    });

    state.screenIndex++;
    setTimeout(() => renderQuestion(option.next), 280);
  }

  /* —— Summary & apply —— */
  function formatDate(dateStr) {
    const d = new Date(dateStr + 'T12:00:00');
    return d.toLocaleDateString('uk-UA', { weekday: 'long', day: 'numeric', month: 'long' });
  }

  function buildPlanLines() {
    const a = state.answers;
    const lines = [];

    if (a.venue) lines.push(a.venue.title);
    if (a.drink) lines.push(a.drink.title);
    if (a.meal) lines.push(a.meal.title);
    if (a.walk) lines.push(a.walk.id === 'walk_yes' ? 'Прогулянка: так' : 'Прогулянка: ні');
    if (a.place_walk) lines.push(a.place_walk.title);
    if (a.place_stay) lines.push(a.place_stay.title);
    if (a.duration) lines.push(a.duration.title);

    return lines;
  }

  function placePhoto() {
    const a = state.answers;
    const place = a.place_walk || a.place_stay || a.venue;
    return place ? place.photo : '';
  }

  function placeTitle() {
    const a = state.answers;
    const place = a.place_walk || a.place_stay;
    return place ? place.title : (a.venue ? a.venue.title : '');
  }

  function renderPreview() {
    const dateFormatted = formatDate(state.datetime.date);
    const lines = buildPlanLines();

    $('#previewCard').innerHTML = `
      <div class="preview-place" style="background-image:url('${placePhoto()}')">
        <div class="preview-place__label">${placeTitle()}</div>
      </div>
      <div class="summary__row">
        <span class="summary__row-icon">📅</span>
        <div><span class="summary__row-label">${UI.summaryWhen}</span>${dateFormatted}, ${state.datetime.time}</div>
      </div>
      <div class="summary__row">
        <span class="summary__row-icon">💫</span>
        <div><span class="summary__row-label">${UI.summaryPlan}</span>${lines.join(' → ')}</div>
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
    const lines = buildPlanLines();
    return {
      instagram: '@' + state.instagram,
      when: `${state.datetime.date} ${state.datetime.time}`,
      plan: lines.join(' → '),
      venue: state.answers.venue ? state.answers.venue.title : '',
      drinkOrMeal: (state.answers.drink || state.answers.meal || {}).title || '',
      walk: state.answers.walk ? state.answers.walk.title : '',
      place: placeTitle(),
      duration: state.answers.duration ? state.answers.duration.title : '',
      city: PROFILE.city,
      submittedAt: new Date().toISOString()
    };
  }

  function saveLocal(payload) {
    const key = 'vechir_applications';
    const list = JSON.parse(localStorage.getItem(key) || '[]');
    list.unshift(payload);
    localStorage.setItem(key, JSON.stringify(list.slice(0, 50)));
  }

  async function sendApplication(payload) {
    saveLocal(payload);

    const email = (PROFILE.applicationEmail || '').trim();
    if (!email) return true;

    const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(email)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        _subject: `Заявка: ${payload.instagram}`,
        instagram: payload.instagram,
        when: payload.when,
        plan: payload.plan,
        venue: payload.venue,
        drinkOrMeal: payload.drinkOrMeal,
        walk: payload.walk,
        place: payload.place,
        duration: payload.duration,
        city: payload.city,
        submittedAt: payload.submittedAt
      })
    });

    return res.ok;
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
      state.screenIndex = 1;
      showScreen('when');
    });

    $('#datetimeForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      state.datetime = { date: fd.get('date'), time: fd.get('time') };
      startQuestions();
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
