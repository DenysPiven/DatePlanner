/**
 * Questionnaire content — Ukrainian UI.
 * Choices are always A or B (can't pick everything).
 */

/** Value dilemmas — one pick per pair. */
const PRIORITY_PAIRS = [
  [
    {
      id: 'serious',
      title: 'Реальні зустрічі',
      desc: 'Хочу знайомитись офлайн, не лише переписуватись',
      photo: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=900&q=80'
    },
    {
      id: 'chat_only',
      title: 'Спочатку онлайн',
      desc: 'Довго переписуємось, зустріч — якщо зайде',
      photo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900&q=80'
    }
  ],
  [
    {
      id: 'plans',
      title: 'Я планую',
      desc: 'Сам пропоную ідею і місце — не «ну куди хочеш?»',
      photo: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=900&q=80'
    },
    {
      id: 'together',
      title: 'Разом вирішимо',
      desc: 'Обираємо план удвох, без сюрпризів',
      photo: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=900&q=80'
    }
  ],
  [
    {
      id: 'talk',
      title: 'Довга розмова',
      desc: 'Головне — поговорити і пізнати одне одного',
      photo: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=900&q=80'
    },
    {
      id: 'active',
      title: 'Активний вечір',
      desc: 'Кіно, прогулянка, щось робити разом',
      photo: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=900&q=80'
    }
  ],
  [
    {
      id: 'present',
      title: 'Без телефону',
      desc: 'На побаченні дивимось одне на одного',
      photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=900&q=80'
    },
    {
      id: 'chill',
      title: 'Легкий вайб',
      desc: 'Можна і фото, і сторіс — без напруги',
      photo: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=900&q=80'
    }
  ],
  [
    {
      id: 'respect',
      title: 'Повага і спокій',
      desc: 'Без тиску, ревнощів і ігор з першого дня',
      photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=900&q=80'
    },
    {
      id: 'spark',
      title: 'Іскра і драйв',
      desc: 'Хочу вайб, флірт і трохи адреналіну',
      photo: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=900&q=80'
    }
  ]
];

/** Food options — tournament until one winner. */
const FOOD_OPTIONS = [
  {
    id: 'cafe',
    title: 'Кавʼярня',
    desc: 'Кава, десерт і спокійна розмова',
    photo: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=900&q=80'
  },
  {
    id: 'restaurant',
    title: 'Ресторан',
    desc: 'Повноцінна вечеря',
    photo: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900&q=80'
  },
  {
    id: 'sushi',
    title: 'Суші',
    desc: 'Японська кухня на двох',
    photo: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=900&q=80'
  },
  {
    id: 'pizza',
    title: 'Піца / стрітфуд',
    desc: 'Невимушено і смачно',
    photo: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=900&q=80'
  },
  {
    id: 'ukrainian',
    title: 'Українська кухня',
    desc: 'Домашнє і ситне',
    photo: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=900&q=80'
  },
  {
    id: 'wine',
    title: 'Вино / коктейлі',
    desc: 'Келих і довга розмова',
    photo: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=900&q=80'
  },
  {
    id: 'dessert',
    title: 'Солодке',
    desc: 'Тортик, морозиво, вафлі',
    photo: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=900&q=80'
  },
  {
    id: 'burger',
    title: 'Бургери',
    desc: 'Ситно і без пафосу',
    photo: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=900&q=80'
  }
];

/** Activity options — tournament until one winner. */
const ACTIVITY_OPTIONS = [
  {
    id: 'walk',
    title: 'Прогулянка',
    desc: 'Набережна, парк, центр',
    photo: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=900&q=80'
  },
  {
    id: 'cinema',
    title: 'Кіно',
    desc: 'Фільм і обговорення після',
    photo: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=900&q=80'
  },
  {
    id: 'photo',
    title: 'Фотолокації',
    desc: 'Красиві місця міста',
    photo: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=900&q=80'
  },
  {
    id: 'museum',
    title: 'Музей / виставка',
    desc: 'Культура без нудьги',
    photo: 'https://images.unsplash.com/photo-1554907984-15263bfd63bd?w=900&q=80'
  },
  {
    id: 'games',
    title: 'Настільні ігри',
    desc: 'Кафе з іграми',
    photo: 'https://images.unsplash.com/photo-1611195974226-ef063636b101?w=900&q=80'
  },
  {
    id: 'live',
    title: 'Жива музика',
    desc: 'Концерт або бар',
    photo: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=900&q=80'
  },
  {
    id: 'fountain',
    title: 'Фонтан Roshen',
    desc: 'Класика вечірньої Вінниці',
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/ROSHEN_Vinnitsa_2008_G1.jpg/960px-ROSHEN_Vinnitsa_2008_G1.jpg'
  },
  {
    id: 'dessert_walk',
    title: 'Десерт + прогулянка',
    desc: 'Солодке і трохи міста',
    photo: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=900&q=80'
  }
];

/** Vinnytsia places — tournament until one winner. */
const PLACE_OPTIONS = [
  {
    id: 'roshen',
    name: 'Фонтан Roshen',
    title: 'Фонтан Roshen',
    type: 'Набережна · вечірнє шоу',
    desc: 'Набережна · вечірнє шоу',
    lat: 49.2328,
    lng: 28.4594,
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/ROSHEN_Vinnitsa_2008_G1.jpg/960px-ROSHEN_Vinnitsa_2008_G1.jpg'
  },
  {
    id: 'naberezhna',
    name: 'Набережна Південного Бугу',
    title: 'Набережна Бугу',
    type: 'Прогулянка біля води',
    desc: 'Прогулянка біля води',
    lat: 49.2315,
    lng: 28.4620,
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Vinnytsia_on_the_banks_of_Southern_Bug.jpg/960px-Vinnytsia_on_the_banks_of_Southern_Bug.jpg'
  },
  {
    id: 'fountain_park',
    name: 'Парк фонтанів',
    title: 'Парк фонтанів',
    type: 'Парк · вечір',
    desc: 'Парк · вечір',
    lat: 49.2320,
    lng: 28.4605,
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Vinnytsia_Fountain_park_1.jpg/960px-Vinnytsia_Fountain_park_1.jpg'
  },
  {
    id: 'night_center',
    name: 'Вечірній центр',
    title: 'Вечірній центр',
    type: 'Прогулянка · вогні',
    desc: 'Прогулянка · вогні міста',
    lat: 49.2326,
    lng: 28.4679,
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Vinnytsia_in_Night.jpg/960px-Vinnytsia_in_Night.jpg'
  },
  {
    id: 'soborna',
    name: 'Вулиця Соборна',
    title: 'Вулиця Соборна',
    type: 'Кавʼярні · центр',
    desc: 'Кавʼярні · центр',
    lat: 49.2335,
    lng: 28.4710,
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Vinnytsia%2C_Soborna_St_02.jpg/960px-Vinnytsia%2C_Soborna_St_02.jpg'
  },
  {
    id: 'soborna_night',
    name: 'Соборна ввечері',
    title: 'Соборна ввечері',
    type: 'Вечірня прогулянка',
    desc: 'Вечірня прогулянка',
    lat: 49.2332,
    lng: 28.4705,
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Vinnytsia%2C_Soborna_St_at_Night_01.jpg/960px-Vinnytsia%2C_Soborna_St_at_Night_01.jpg'
  },
  {
    id: 'bridge',
    name: 'Міст на Соборній',
    title: 'Міст на Соборній',
    type: 'Фотолокація',
    desc: 'Фотолокація',
    lat: 49.2325,
    lng: 28.4650,
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Vinnytsia%2C_Soborna_.st_Bridge.jpg/960px-Vinnytsia%2C_Soborna_.st_Bridge.jpg'
  },
  {
    id: 'tower',
    name: 'Водонапірна вежа',
    title: 'Водонапірна вежа',
    type: 'Панорама · фото',
    desc: 'Панорама · фото',
    lat: 49.2348,
    lng: 28.4655,
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/%D0%92%D0%BE%D0%B4%D0%BE%D0%BD%D0%B0%D0%BF%D1%96%D1%80%D0%BD%D0%B0_%D0%B2%D0%B5%D0%B6%D0%B0_%D0%92%D1%96%D0%BD%D0%BD%D0%B8%D1%86%D1%8F.jpg/960px-%D0%92%D0%BE%D0%B4%D0%BE%D0%BD%D0%B0%D0%BF%D1%96%D1%80%D0%BD%D0%B0_%D0%B2%D0%B5%D0%B6%D0%B0_%D0%92%D1%96%D0%BD%D0%BD%D0%B8%D1%86%D1%8F.jpg'
  }
];

const LABELS = {
  priority: {
    serious: 'Реальні зустрічі',
    chat_only: 'Спочатку онлайн',
    plans: 'Сам планує',
    together: 'Разом вирішуємо',
    talk: 'Довга розмова',
    active: 'Активний вечір',
    present: 'Без телефону',
    chill: 'Легкий вайб',
    respect: 'Повага і спокій',
    spark: 'Іскра і драйв'
  },
  food: {
    cafe: 'Кавʼярня',
    restaurant: 'Ресторан',
    sushi: 'Суші',
    pizza: 'Піца / стрітфуд',
    ukrainian: 'Українська кухня',
    wine: 'Вино / коктейлі',
    dessert: 'Солодке',
    burger: 'Бургери'
  },
  activity: {
    walk: 'Прогулянка',
    cinema: 'Кіно',
    photo: 'Фотолокації',
    museum: 'Музей / виставка',
    games: 'Настільні ігри',
    live: 'Жива музика',
    fountain: 'Фонтан Roshen',
    dessert_walk: 'Десерт + прогулянка'
  }
};
