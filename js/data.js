/**
 * Linear branching questionnaire (Ukrainian UI).
 * Each step is one choice: A or B (or a short list), then the next step depends on the answer.
 */

const QUESTIONS = {
  /** Cafe or restaurant */
  venue: {
    id: 'venue',
    title: 'Куди підемо?',
    sub: 'Обери одне',
    options: [
      {
        id: 'cafe',
        title: 'Кафе',
        desc: 'Легко, кава і розмова',
        photo: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=900&q=80',
        next: 'drink'
      },
      {
        id: 'restaurant',
        title: 'Ресторан',
        desc: 'Повноцінна вечеря',
        photo: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900&q=80',
        next: 'meal'
      }
    ]
  },

  /** After cafe */
  drink: {
    id: 'drink',
    title: 'Що візьмемо?',
    sub: 'Кава або чай',
    options: [
      {
        id: 'coffee',
        title: 'Кава',
        desc: 'Класика для розмови',
        photo: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900&q=80',
        next: 'walk'
      },
      {
        id: 'tea',
        title: 'Чай',
        desc: 'Спокійніше і затишніше',
        photo: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=900&q=80',
        next: 'walk'
      }
    ]
  },

  /** After restaurant */
  meal: {
    id: 'meal',
    title: 'Яка вечеря?',
    sub: 'Обери формат',
    options: [
      {
        id: 'light',
        title: 'Легка',
        desc: 'Салати, вино, без переїдання',
        photo: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=900&q=80',
        next: 'walk'
      },
      {
        id: 'hearty',
        title: 'Ситна',
        desc: 'Повноцінні страви на двох',
        photo: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=900&q=80',
        next: 'walk'
      }
    ]
  },

  /** Walk yes/no */
  walk: {
    id: 'walk',
    title: 'Прогулянка після?',
    sub: 'Так або ні',
    options: [
      {
        id: 'walk_yes',
        title: 'Так',
        desc: 'Пройдемось містом',
        photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Vinnytsia_on_the_banks_of_Southern_Bug.jpg/960px-Vinnytsia_on_the_banks_of_Southern_Bug.jpg',
        next: 'place_walk'
      },
      {
        id: 'walk_no',
        title: 'Ні',
        desc: 'Залишимось на місці',
        photo: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900&q=80',
        next: 'place_stay'
      }
    ]
  },

  /** Where — if walk */
  place_walk: {
    id: 'place_walk',
    title: 'Куди саме?',
    sub: 'Одне місце',
    options: [
      {
        id: 'roshen',
        title: 'Фонтан Roshen',
        desc: 'Набережна · вечірнє шоу',
        photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/ROSHEN_Vinnitsa_2008_G1.jpg/960px-ROSHEN_Vinnitsa_2008_G1.jpg',
        next: 'duration'
      },
      {
        id: 'naberezhna',
        title: 'Набережна Бугу',
        desc: 'Прогулянка біля води',
        photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Vinnytsia_on_the_banks_of_Southern_Bug.jpg/960px-Vinnytsia_on_the_banks_of_Southern_Bug.jpg',
        next: 'duration'
      },
      {
        id: 'soborna_night',
        title: 'Соборна ввечері',
        desc: 'Центр · вогні міста',
        photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Vinnytsia%2C_Soborna_St_at_Night_01.jpg/960px-Vinnytsia%2C_Soborna_St_at_Night_01.jpg',
        next: 'duration'
      },
      {
        id: 'tower',
        title: 'Водонапірна вежа',
        desc: 'Панорама · фото',
        photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/%D0%92%D0%BE%D0%B4%D0%BE%D0%BD%D0%B0%D0%BF%D1%96%D1%80%D0%BD%D0%B0_%D0%B2%D0%B5%D0%B6%D0%B0_%D0%92%D1%96%D0%BD%D0%BD%D0%B8%D1%86%D1%8F.jpg/960px-%D0%92%D0%BE%D0%B4%D0%BE%D0%BD%D0%B0%D0%BF%D1%96%D1%80%D0%BD%D0%B0_%D0%B2%D0%B5%D0%B6%D0%B0_%D0%92%D1%96%D0%BD%D0%BD%D0%B8%D1%86%D1%8F.jpg',
        next: 'duration'
      }
    ]
  },

  /** Where — if no walk (stay at venue area) */
  place_stay: {
    id: 'place_stay',
    title: 'В якому районі?',
    sub: 'Одне місце',
    options: [
      {
        id: 'soborna',
        title: 'Соборна',
        desc: 'Кавʼярні й ресторани в центрі',
        photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Vinnytsia%2C_Soborna_St_02.jpg/960px-Vinnytsia%2C_Soborna_St_02.jpg',
        next: 'duration'
      },
      {
        id: 'night_center',
        title: 'Вечірній центр',
        desc: 'Ближче до вогнів міста',
        photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Vinnytsia_in_Night.jpg/960px-Vinnytsia_in_Night.jpg',
        next: 'duration'
      },
      {
        id: 'fountain_park',
        title: 'Біля парку фонтанів',
        desc: 'Спокійніше',
        photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Vinnytsia_Fountain_park_1.jpg/960px-Vinnytsia_Fountain_park_1.jpg',
        next: 'duration'
      }
    ]
  },

  /** How long */
  duration: {
    id: 'duration',
    title: 'Скільки часу?',
    sub: 'Скільки триває побачення',
    options: [
      {
        id: '1h',
        title: 'Близько години',
        desc: 'Коротко і по суті',
        photo: 'https://images.unsplash.com/photo-1501139083538-0139583c060f?w=900&q=80',
        next: 'apply'
      },
      {
        id: '2h',
        title: '2–3 години',
        desc: 'Нормальний вечір',
        photo: 'https://images.unsplash.com/photo-1495364141860-b0d03eccd065?w=900&q=80',
        next: 'apply'
      },
      {
        id: 'evening',
        title: 'Увесь вечір',
        desc: 'Без поспіху',
        photo: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=900&q=80',
        next: 'apply'
      }
    ]
  }
};
