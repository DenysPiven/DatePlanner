/**
 * Ukrainian questionnaire copy (user-facing UI only).
 */
const UI = {
  welcome: 'Знайомство',
  step: (n, total) => `${n} / ${total}`,

  start: 'Далі',
  next: 'Далі',
  or: 'або',
  recommended: 'мені заходить',
  pickAtLeastOne: 'Обери хоча б один варіант',

  whenTitle: 'Коли зручно?',
  whenSub: 'Обери день і час — план уже є',
  date: 'Дата',
  time: 'Час',

  applyTitle: 'Залишити заявку',
  applySub: 'Лише Instagram — решта вже там',
  instagram: 'Твій Instagram',
  instagramPlaceholder: '@username',
  submit: 'Надіслати заявку',
  submitting: 'Надсилаю…',

  doneTitle: 'Заявку надіслано',
  doneText: 'Я подивлюсь і сама вирішу. Якщо підійдеш — напишу в Instagram.',
  doneHint: 'Можеш закрити сторінку',

  summaryWhen: 'Коли',
  summaryPlan: 'План',
  summaryAbout: 'Про тебе',

  toastSent: '✅ Заявку надіслано',
  toastError: 'Не вдалось надіслати. Спробуй ще раз або напиши в Instagram',
  toastInstagram: 'Вкажи Instagram',
  ageCity: (age, city) => `${age} · ${city}`
};
