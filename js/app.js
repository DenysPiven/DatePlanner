(function () {
  'use strict';

  const TOTAL_STEPS = 9;

  const state = {
    step: 0,
    storyIndex: 0,
    introIndex: 0,
    priorities: [],
    food: null,
    activity: null,
    place: null,
    datetime: {},
    instagram: '',
    choosers: {}
  };

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  const progressBar = $('#progressBar');
  const stepLabel = $('#stepLabel');
  const toast = $('#toast');
  let introTimer = null;

  function applyLocale() {
    $('#brand').textContent = PROFILE.name;
    $('#startBtn').textContent = UI.start;
    $('#aboutHerTitle').textContent = UI.aboutHerTitle;
    $('#aboutHerSub').textContent = UI.aboutHerSub;
    $('#storyNext').textContent = UI.next;
    $('#priorityTitle').textContent = UI.priorityTitle;
    $('#prioritySub').textContent = UI.prioritySub;
    $('#foodTitle').textContent = UI.foodTitle;
    $('#foodSub').textContent = UI.foodSub;
    $('#activityTitle').textContent = UI.activityTitle;
    $('#activitySub').textContent = UI.activitySub;
    $('#whenTitle').textContent = UI.whenTitle;
    $('#whenSub').textContent = UI.whenSub;
    $('#labelDate').textContent = UI.date;
    $('#labelTime').textContent = UI.time;
    $('#datetimeNextBtn').textContent = UI.next;
    $('#whereTitle').textContent = UI.whereTitle;
    $('#whereSub').textContent = UI.whereSub;
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

  function goToStep(n) {
    $$('.step').forEach((el) => el.classList.remove('step--active'));
    const target = document.querySelector(`[data-step="${n}"]`);
    if (target) target.classList.add('step--active');

    state.step = n;
    progressBar.style.width = `${((n + 1) / TOTAL_STEPS) * 100}%`;

    if (n === 0) {
      stepLabel.textContent = UI.welcome;
      startIntroCarousel();
    } else {
      stopIntroCarousel();
      stepLabel.textContent = UI.step(n, TOTAL_STEPS - 1);
    }

    if (n === 1) renderStory();
    if (n === 2) startPriorityChoices();
    if (n === 3) startFoodTournament();
    if (n === 4) startActivityTournament();
    if (n === 6) startPlaceTournament();
    if (n === 7) renderPreview();
  }

  function optionTitle(item) {
    return item.title || item.name || '';
  }

  function optionDesc(item) {
    return item.desc || item.type || '';
  }

  function renderChoicePair(container, left, right, onPick) {
    container.innerHTML = `
      <button type="button" class="choice__card" data-side="left">
        <div class="choice__photo" style="background-image:url('${left.photo}')"></div>
        <div class="choice__body">
          <div class="choice__title">${optionTitle(left)}</div>
          <div class="choice__desc">${optionDesc(left)}</div>
        </div>
      </button>
      <div class="choice__or">${UI.or}</div>
      <button type="button" class="choice__card" data-side="right">
        <div class="choice__photo" style="background-image:url('${right.photo}')"></div>
        <div class="choice__body">
          <div class="choice__title">${optionTitle(right)}</div>
          <div class="choice__desc">${optionDesc(right)}</div>
        </div>
      </button>
    `;

    container.querySelectorAll('.choice__card').forEach((btn) => {
      btn.addEventListener('click', () => {
        const winner = btn.dataset.side === 'left' ? left : right;
        btn.classList.add('choice__card--picked');
        container.querySelectorAll('.choice__card').forEach((c) => {
          if (c !== btn) c.classList.add('choice__card--lost');
        });
        setTimeout(() => onPick(winner), 280);
      });
    });
  }

  /** Fixed A-or-B pairs (priorities). */
  function startPriorityChoices() {
    const pairs = PRIORITY_PAIRS;
    let index = 0;
    const picks = [];
    const container = $('#priorityChoice');
    const roundEl = $('#priorityRound');

    function show() {
      if (index >= pairs.length) {
        state.priorities = picks;
        goToStep(3);
        return;
      }
      const [left, right] = pairs[index];
      roundEl.textContent = UI.round(index + 1, pairs.length);
      renderChoicePair(container, left, right, (winner) => {
        picks.push(winner.id);
        index++;
        show();
      });
    }

    show();
  }

  /** Knockout tournament — one winner. */
  function startTournament({ options, containerId, roundId, onComplete }) {
    let queue = shuffle([...options]);
    let nextRound = [];
    const totalMatches = options.length - 1;
    let played = 0;
    const container = document.getElementById(containerId);
    const roundEl = document.getElementById(roundId);

    function advance() {
      if (queue.length === 1 && nextRound.length === 0) {
        onComplete(queue[0]);
        return;
      }

      if (queue.length === 0) {
        queue = nextRound;
        nextRound = [];
      }

      if (queue.length === 1) {
        nextRound.push(queue.shift());
        advance();
        return;
      }

      const left = queue.shift();
      const right = queue.shift();
      played++;
      roundEl.textContent = UI.round(played, totalMatches);
      renderChoicePair(container, left, right, (winner) => {
        nextRound.push(winner);
        advance();
      });
    }

    advance();
  }

  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function startFoodTournament() {
    startTournament({
      options: FOOD_OPTIONS,
      containerId: 'foodChoice',
      roundId: 'foodRound',
      onComplete: (winner) => {
        state.food = winner;
        goToStep(4);
      }
    });
  }

  function startActivityTournament() {
    startTournament({
      options: ACTIVITY_OPTIONS,
      containerId: 'activityChoice',
      roundId: 'activityRound',
      onComplete: (winner) => {
        state.activity = winner;
        goToStep(5);
      }
    });
  }

  function startPlaceTournament() {
    startTournament({
      options: PLACE_OPTIONS,
      containerId: 'placeChoice',
      roundId: 'placeRound',
      onComplete: (winner) => {
        state.place = winner;
        goToStep(7);
      }
    });
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
    updateIntroCaption(0);

    $$('#introDots .intro__dot').forEach((dot) => {
      dot.addEventListener('click', () => showIntroSlide(Number(dot.dataset.intro)));
    });
  }

  function updateIntroCaption(i) {
    const photo = PROFILE.photos[i];
    $('#introText').textContent = photo ? photo.text : '';
  }

  function showIntroSlide(i) {
    state.introIndex = i;
    $$('.intro__slide').forEach((el, idx) => el.classList.toggle('intro__slide--active', idx === i));
    $$('.intro__dot').forEach((el, idx) => el.classList.toggle('intro__dot--active', idx === i));
    updateIntroCaption(i);
  }

  function startIntroCarousel() {
    stopIntroCarousel();
    introTimer = setInterval(() => {
      showIntroSlide((state.introIndex + 1) % PROFILE.photos.length);
    }, 3500);
  }

  function stopIntroCarousel() {
    if (introTimer) {
      clearInterval(introTimer);
      introTimer = null;
    }
  }

  /* —— Story —— */
  function renderStory() {
    const photos = PROFILE.photos;
    const i = state.storyIndex;
    const photo = photos[i];
    $('#storyStack').innerHTML = `
      <div class="story-card">
        <div class="story-card__photo" style="background-image:url('${photo.src}')"></div>
        <div class="story-card__body">
          <div class="story-card__caption">${photo.caption}</div>
          <p class="story-card__text">${photo.text}</p>
        </div>
      </div>
    `;
    $('#storyCounter').textContent = `${i + 1} / ${photos.length}`;
    $('#storyPrev').disabled = i === 0;
    $('#storyNext').textContent = i === photos.length - 1 ? UI.next : '→';
  }

  function storyNext() {
    if (state.storyIndex < PROFILE.photos.length - 1) {
      state.storyIndex++;
      renderStory();
    } else {
      goToStep(2);
    }
  }

  function storyPrev() {
    if (state.storyIndex > 0) {
      state.storyIndex--;
      renderStory();
    }
  }

  /* —— Application —— */
  function formatDate(dateStr) {
    const d = new Date(dateStr + 'T12:00:00');
    return d.toLocaleDateString('uk-UA', { weekday: 'long', day: 'numeric', month: 'long' });
  }

  function normalizeInstagram(value) {
    let v = (value || '').trim();
    v = v.replace(/^https?:\/\/(www\.)?instagram\.com\//i, '');
    v = v.replace(/\/.*$/, '');
    v = v.replace(/^@/, '');
    return v;
  }

  function renderPreview() {
    const priorities = state.priorities
      .map((id) => LABELS.priority[id] || id)
      .join(' · ');
    const dateFormatted = formatDate(state.datetime.date);

    $('#previewCard').innerHTML = `
      <div class="preview-place" style="background-image:url('${state.place.photo}')">
        <div class="preview-place__label">${state.place.name}</div>
      </div>
      <div class="summary__row">
        <span class="summary__row-icon">📅</span>
        <div><span class="summary__row-label">${UI.summaryWhen}</span>${dateFormatted}, ${state.datetime.time}</div>
      </div>
      <div class="summary__row">
        <span class="summary__row-icon">📍</span>
        <div><span class="summary__row-label">${UI.summaryPlace}</span>${state.place.name}</div>
      </div>
      <div class="summary__row">
        <span class="summary__row-icon">🍽</span>
        <div><span class="summary__row-label">${UI.summaryFood}</span>${state.food.title}</div>
      </div>
      <div class="summary__row">
        <span class="summary__row-icon">🎯</span>
        <div><span class="summary__row-label">${UI.summaryActivity}</span>${state.activity.title}</div>
      </div>
      <div class="summary__row">
        <span class="summary__row-icon">💗</span>
        <div><span class="summary__row-label">${UI.summaryPriorities}</span>${priorities}</div>
      </div>
    `;
  }

  function buildApplicationPayload() {
    return {
      instagram: '@' + state.instagram,
      priorities: state.priorities.map((id) => LABELS.priority[id] || id).join(', '),
      food: state.food.title,
      activity: state.activity.title,
      date: state.datetime.date,
      time: state.datetime.time,
      place: state.place.name,
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
        priorities: payload.priorities,
        food: payload.food,
        activity: payload.activity,
        when: `${payload.date} ${payload.time}`,
        place: `${payload.place} (${payload.city})`,
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
      goToStep(8);
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
    document.addEventListener('click', (e) => {
      if (e.target.closest('[data-action="next"]')) goToStep(state.step + 1);
    });

    $('#storyNext').addEventListener('click', storyNext);
    $('#storyPrev').addEventListener('click', storyPrev);

    $('#datetimeForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      state.datetime = { date: fd.get('date'), time: fd.get('time') };
      goToStep(6);
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
    goToStep(0);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
