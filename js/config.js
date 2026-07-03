/**
 * Profile settings. Applications are saved to online storage.
 * Open inbox.html to view them — no email, no setup.
 */
const PROFILE = {
  name: 'Аня',
  age: 23,
  city: 'Вінниця',
  tagline: 'Шукаю того, з ким захочеться залишитись на другу каву',
  bio: 'Люблю живі розмови і вечірні прогулянки. Без ігор і тиску. Нижче — коротко про тебе і приблизний план вечора; варіанти з міткою «мені заходить» — те, що мені ближче.',

  photos: [
    {
      src: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=900&q=80',
      caption: 'Привіт'
    },
    {
      src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=900&q=80',
      caption: 'Про мене'
    },
    {
      src: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=900&q=80',
      caption: 'Вінниця'
    }
  ]
};

/** Online storage for applications (MantleDB). Used by app.js and inbox.html */
const STORAGE = {
  url: 'https://mantledb.sh/v2/dateplanner-pivden/applications',
  key: '9db89f97badf1defda339eb1ff0efb07de086257b770d39b471071b1102bf50e'
};

/** Password for inbox.html — change anytime */
const INBOX_PASSWORD = 'vechir2026';
