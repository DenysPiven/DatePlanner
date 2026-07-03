/**
 * Ukrainian questionnaire copy (user-facing UI only).
 */
const UI = {
  welcome: 'Знайомство',
  step: (n, total) => `${n} / ${total}`,

  start: 'Далі',
  next: 'Далі',
  or: 'або',

  whenTitle: 'Коли зустрінемось?',
  whenSub: 'Обери день і час',
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

  toastSent: '✅ Заявку надіслано',
  toastError: 'Не вдалось надіслати. Спробуй ще раз',
  toastInstagram: 'Вкажи Instagram',
  ageCity: (age, city) => `${age} · ${city}`
};
