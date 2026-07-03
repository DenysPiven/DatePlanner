/**
 * Ukrainian questionnaire copy (user-facing UI only).
 */
const UI = {
  welcome: 'Знайомство',
  step: (n, total) => `${n} / ${total}`,
  progress: (pct, left) => {
    if (left <= 0) return `${pct}%`;
    const word =
      left === 1 ? 'крок' : left >= 2 && left <= 4 ? 'кроки' : 'кроків';
    return `${pct}% · ще ${left} ${word}`;
  },
  progressDone: 'Готово',

  start: 'Далі',
  continue: 'Продовжити',
  next: 'Далі',
  or: 'або',
  recommended: 'мені заходить',
  pickAtLeastOne: 'Обери хоча б один варіант',

  whenTitle: 'Коли зручно?',
  whenSub: 'Обери день і час — план уже є',
  date: 'Дата',
  time: 'Час',

  applyTitle: 'Залишити заявку',
  applySub: 'Лише Instagram. Відповім протягом 48 годин, якщо підійдеш',
  instagram: 'Твій Instagram',
  instagramPlaceholder: '@username',
  whyMe: 'Чому хочеш піти саме зі мною?',
  whyMePlaceholder: 'Кілька чесних слів…',
  whyMeRequired: 'Напиши кілька слів',
  submit: 'Надіслати заявку',
  submitting: 'Надсилаю…',

  doneTitle: 'Заявку надіслано',
  doneText: 'Я подивлюсь і сама вирішу. Якщо підійдеш — напишу в Instagram протягом 48 годин.',
  doneHint: 'Можеш закрити сторінку',

  summaryWhen: 'Коли',
  summaryPlan: 'План',
  summaryAbout: 'Про тебе',
  summaryFilters: 'Фільтри',
  summaryWhy: 'Чому я',

  toastSent: '✅ Заявку надіслано',
  toastError: 'Не вдалось надіслати. Спробуй ще раз або напиши в Instagram',
  toastInstagram: 'Вкажи Instagram',
  ageCity: (age, city) => `${age} · ${city}`
};
