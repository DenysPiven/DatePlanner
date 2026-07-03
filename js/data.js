/** Swipe cards and location data — Ukrainian questionnaire content. */
const SWIPE_CARDS = {
  food: [
    { id: 'pizza', title: 'Піца', emoji: '🍕', desc: 'Італійська класика', gradient: 'linear-gradient(135deg, #ff6b35, #f7931e)' },
    { id: 'sushi', title: 'Суші', emoji: '🍣', desc: 'Японська кухня', gradient: 'linear-gradient(135deg, #e63946, #ff6b6b)' },
    { id: 'cafe', title: 'Кафе', emoji: '☕', desc: 'Кава та десерти', gradient: 'linear-gradient(135deg, #6f4e37, #a67c52)' },
    { id: 'burger', title: 'Бургери', emoji: '🍔', desc: 'Непримушена вечеря', gradient: 'linear-gradient(135deg, #f4a261, #e76f51)' },
    { id: 'ukrainian', title: 'Українська кухня', emoji: '🥟', desc: 'Борщ, вареники, домашнє', gradient: 'linear-gradient(135deg, #2a9d8f, #264653)' },
    { id: 'pasta', title: 'Паста', emoji: '🍝', desc: 'Романтична вечеря', gradient: 'linear-gradient(135deg, #e9c46a, #f4a261)' },
    { id: 'dessert', title: 'Десерти', emoji: '🍰', desc: 'Солодке та морозиво', gradient: 'linear-gradient(135deg, #ffafcc, #ffc8dd)' },
    { id: 'wine', title: 'Вино-бар', emoji: '🍷', desc: 'Келих і розмова', gradient: 'linear-gradient(135deg, #7209b7, #560bad)' }
  ],
  activity: [
    { id: 'cinema', title: 'Кіно', emoji: '🎬', desc: 'Новий фільм у кінотеатрі', gradient: 'linear-gradient(135deg, #1d3557, #457b9d)' },
    { id: 'walk', title: 'Прогулянка', emoji: '🌳', desc: 'Парк або набережна', gradient: 'linear-gradient(135deg, #2d6a4f, #52b788)' },
    { id: 'museum', title: 'Музей / галерея', emoji: '🖼️', desc: 'Культура та мистецтво', gradient: 'linear-gradient(135deg, #5e548e, #9f86c0)' },
    { id: 'bowling', title: 'Боулінг', emoji: '🎳', desc: 'Весело та змагання', gradient: 'linear-gradient(135deg, #bc4749, #6a040f)' },
    { id: 'karaoke', title: 'Караоке', emoji: '🎤', desc: 'Співаємо разом', gradient: 'linear-gradient(135deg, #7b2cbf, #c77dff)' },
    { id: 'games', title: 'Настільні ігри', emoji: '🎲', desc: 'Кафе з іграми', gradient: 'linear-gradient(135deg, #0077b6, #00b4d8)' },
    { id: 'concert', title: 'Концерт', emoji: '🎵', desc: 'Жива музика', gradient: 'linear-gradient(135deg, #370617, #9d0208)' },
    { id: 'photo', title: 'Фотопрогулянка', emoji: '📸', desc: 'Красиві локації міста', gradient: 'linear-gradient(135deg, #ff758f, #ff7eb3)' }
  ],
  vibe: [
    { id: 'romantic', title: 'Романтично', emoji: '💕', desc: 'Тихо, затишно, для двох', gradient: 'linear-gradient(135deg, #ff006e, #8338ec)' },
    { id: 'fun', title: 'Весело', emoji: '🎉', desc: 'Сміх, активність, енергія', gradient: 'linear-gradient(135deg, #ffbe0b, #fb5607)' },
    { id: 'cozy', title: 'Затишно', emoji: '🕯️', desc: 'Спокійний вечір без метушні', gradient: 'linear-gradient(135deg, #606c38, #283618)' },
    { id: 'surprise', title: 'Сюрприз', emoji: '✨', desc: 'Нехай буде несподіванка', gradient: 'linear-gradient(135deg, #7400b8, #5390d9)' },
    { id: 'adventure', title: 'Пригода', emoji: '🗺️', desc: 'Щось нове і незвичне', gradient: 'linear-gradient(135deg, #06d6a0, #118ab2)' },
    { id: 'talk', title: 'Поговорити', emoji: '💬', desc: 'Головне — розмова', gradient: 'linear-gradient(135deg, #495057, #868e96)' }
  ]
};

const CITIES = {
  kyiv: {
    name: 'Київ',
    center: [50.4501, 30.5234],
    zoom: 13,
    places: [
      { id: 'maidan', name: 'Майдан Незалежності', type: 'Центр міста', lat: 50.4501, lng: 30.5234, tags: ['walk', 'photo', 'cafe'] },
      { id: 'mariinsky', name: 'Маріїнський парк', type: 'Парк', lat: 50.4478, lng: 30.5367, tags: ['walk', 'romantic', 'photo'] },
      { id: 'trukhaniv', name: 'Труханів острів', type: 'Природа', lat: 50.4569, lng: 30.5512, tags: ['walk', 'adventure', 'fun'] },
      { id: 'andriyivsky', name: 'Андріївський узвіз', type: 'Історичний центр', lat: 50.4597, lng: 30.5169, tags: ['walk', 'photo', 'romantic'] },
      { id: 'globus', name: 'ТЦ Globus (площа)', type: 'Зустріч біля метро', lat: 50.4490, lng: 30.5245, tags: ['cafe', 'cinema'] },
      { id: 'arsenal', name: 'Мистецький арсенал', type: 'Музей', lat: 50.4342, lng: 30.5533, tags: ['museum', 'romantic', 'cozy'] },
      { id: 'hydropark', name: 'Гідропарк', type: 'Парк', lat: 50.4550, lng: 30.5750, tags: ['walk', 'fun', 'adventure'] },
      { id: 'besarabka', name: 'Ринок біля метро Театральна', type: 'Ринок', lat: 50.4408, lng: 30.5215, tags: ['cafe', 'ukrainian', 'surprise'] }
    ]
  },
  lviv: {
    name: 'Львів',
    center: [49.8397, 24.0297],
    zoom: 14,
    places: [
      { id: 'rynok', name: 'Площа Ринок', type: 'Центр', lat: 49.8419, lng: 24.0315, tags: ['walk', 'cafe', 'romantic'] },
      { id: 'opera', name: 'Львівська опера', type: 'Театр', lat: 49.8440, lng: 24.0261, tags: ['romantic', 'concert', 'cozy'] },
      { id: 'highcastle', name: 'Високий замок', type: 'Панорама', lat: 49.8518, lng: 24.0350, tags: ['walk', 'photo', 'romantic'] },
      { id: 'svobody', name: 'Проспект Свободи', type: 'Центр', lat: 49.8420, lng: 24.0280, tags: ['walk', 'cafe'] },
      { id: 'strysky', name: 'Стрийський парк', type: 'Парк', lat: 49.8167, lng: 24.0433, tags: ['walk', 'cozy', 'romantic'] },
      { id: 'chocolate', name: 'Площа біля Оперного', type: 'Зустріч', lat: 49.8435, lng: 24.0275, tags: ['cafe', 'dessert'] },
      { id: 'arsen', name: 'Арсен', type: 'Культурний центр', lat: 49.8425, lng: 24.0320, tags: ['museum', 'cozy'] },
      { id: 'bald', name: 'Приміський парк', type: 'Парк', lat: 49.8350, lng: 24.0180, tags: ['walk', 'fun'] }
    ]
  },
  odesa: {
    name: 'Одеса',
    center: [46.4825, 30.7233],
    zoom: 13,
    places: [
      { id: 'deribas', name: 'Дерибасівська', type: 'Центр', lat: 46.4847, lng: 30.7411, tags: ['walk', 'cafe', 'fun'] },
      { id: 'potemkin', name: 'Потьомкінські сходи', type: 'Пам\'ятка', lat: 46.4886, lng: 30.7414, tags: ['walk', 'photo', 'romantic'] },
      { id: 'arcadia', name: 'Аркадія', type: 'Набережна', lat: 46.4330, lng: 30.7620, tags: ['walk', 'adventure', 'fun'] },
      { id: 'citygarden', name: 'Міський сад', type: 'Парк', lat: 46.4860, lng: 30.7420, tags: ['walk', 'cozy', 'romantic'] },
      { id: 'opera_odesa', name: 'Одеський театр', type: 'Театр', lat: 46.4853, lng: 30.7410, tags: ['romantic', 'concert'] },
      { id: 'lanzheron', name: 'Ланжерон', type: 'Пляж', lat: 46.4720, lng: 30.7610, tags: ['walk', 'adventure'] }
    ]
  }
};

const ACTIVITY_LABELS = {
  cinema: 'Піти в кіно',
  walk: 'Прогулянка',
  museum: 'Музей або галерея',
  bowling: 'Боулінг',
  karaoke: 'Караоке',
  games: 'Настільні ігри',
  concert: 'Концерт',
  photo: 'Фотопрогулянка'
};

const FOOD_LABELS = {
  pizza: 'Піца',
  sushi: 'Суші',
  cafe: 'Кафе',
  burger: 'Бургери',
  ukrainian: 'Українська кухня',
  pasta: 'Паста',
  dessert: 'Десерти',
  wine: 'Вино-бар'
};

const VIBE_LABELS = {
  romantic: 'Романтична атмосфера',
  fun: 'Весело та активно',
  cozy: 'Затишний вечір',
  surprise: 'Елемент сюрпризу',
  adventure: 'Невелика пригода',
  talk: 'Спокійна розмова'
};

const DATE_PLAN_TEMPLATES = {
  romantic: 'Почнемо з {food} у затишному місці, потім {activity} — все в романтичному темпі.',
  fun: 'Активний вечір: {activity}, а потім {food} — головне, щоб було весело!',
  cozy: 'Неспішний вечір: {food}, прогулянка і {activity} без метушні.',
  default: 'Зустрінемось о {time}, {food} + {activity} — звучить чудово!'
};
