/**
 * Ukrainian questionnaire copy (user-facing UI only).
 */
const UI = {
  welcome: 'Знайомство',
  step: (n, total) => `${n} / ${total}`,

  start: 'Хочу на побачення',
  next: 'Далі',
  or: 'або',

  aboutHerTitle: 'Трохи про мене',
  aboutHerSub: 'Гортай фото — так зрозумієш, чи ми на одній хвилі',

  priorityTitle: 'Що тобі ближче?',
  prioritySub: 'Обери одне з двох — не можна все одразу',

  foodTitle: 'Що поїсти?',
  foodSub: 'Обери одне. Переможець іде далі',
  activityTitle: 'Чим зайнятись?',
  activitySub: 'Знову вибір: це або це',

  whenTitle: 'Коли зручно?',
  whenSub: 'Обери день і час — я подивлюсь, чи підходить',
  date: 'Дата',
  time: 'Час',

  whereTitle: 'Куди підемо?',
  whereSub: 'Одне місце на вечір. Обери між двома',

  applyTitle: 'Залишити заявку',
  applySub: 'Лише Instagram — решта вже там. Якщо підійдеш, напишу тобі',
  instagram: 'Твій Instagram',
  instagramPlaceholder: '@username',
  submit: 'Надіслати заявку',
  submitting: 'Надсилаю…',

  doneTitle: 'Заявку надіслано',
  doneText: 'Я подивлюсь відповіді і сама вирішу, з ким піти. Якщо відгукнусь — напишу в Instagram.',
  doneHint: 'Можеш закрити сторінку',

  summaryPriorities: 'Твої вибори',
  summaryFood: 'Їжа',
  summaryActivity: 'Активність',
  summaryWhen: 'Коли',
  summaryPlace: 'Місце',

  round: (n, total) => `Раунд ${n} з ${total}`,
  pickOne: 'Обери одне',

  toastSent: '✅ Заявку надіслано',
  toastError: 'Не вдалось надіслати. Спробуй ще раз',
  toastInstagram: 'Вкажи Instagram',
  ageCity: (age, city) => `${age} · ${city}`
};
