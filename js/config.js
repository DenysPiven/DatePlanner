/**
 * Profile settings. Applications are saved encrypted.
 * Inbox password is NOT stored in plaintext — only a hash + wrapped key.
 */
const PROFILE = {
  name: 'Денис',
  age: null,
  city: 'Вінниця',
  tagline: 'Шукаю ту, з ким захочеться залишитись на другу каву',
  bio: 'Люблю живі розмови і вечірні прогулянки. Без ігор і тиску. Нижче — коротко про тебе і приблизний план вечора; варіанти з міткою «мені заходить» — те, що мені ближче.',

  photos: [
    {
      src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=900&q=80',
      caption: 'Привіт'
    },
    {
      src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=80',
      caption: 'Про мене'
    },
    {
      src: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=900&q=80',
      caption: 'Вінниця'
    }
  ]
};

/** Online storage — holds encrypted blobs only (useless without inbox password). */
const STORAGE = {
  url: 'https://mantledb.sh/v2/dateplanner-pivden/applications',
  key: '9db89f97badf1defda339eb1ff0efb07de086257b770d39b471071b1102bf50e'
};

/**
 * Inbox auth material (no plaintext password).
 * Regenerated — previous password is invalid.
 */
const INBOX_AUTH = {
  passwordHash: "860cda7e9ec76910c708077a852ccf07c36b56301f826af7e820ed16243689f5",
  salt: "QDWoqwRmgmFJwNtNvU1YPg==",
  iv: "S+/arW0wwJDfQ2s3",
  tag: "D9Bmn6GXOpiFd9f7qkItVQ==",
  wrappedPrivateKey: "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",
  publicKey: {
      "kty": "RSA",
      "n": "3ftFikvGYCuSkLQm41SDIPMfQ6UDCKUJspyiMsYa3J0cLLp7wnE4DZl9CTViMu4Ix1WXw4VF08Jkopu5U8W4OX9PWxjLFSYEM7l3YIB2MMO-JsAnvXt60EHV8OD9Eh4JrBH7IKcGL69_HifI6Z4tCQjYoeL8_LIbh0EHZMPwNcH38fmNe6e9jX3z4kOGH0omJ2pfBcCpv8jHksN1TR0g4_KwW1zmaXPcSylPaL7zpPeQS7RYI2t9C8qunVKkvtCCQo7_jKMRuQMUMA_wLPDEIeJEBgrxrZDQweWe02Uiylpg201EUMfHG_JScsDAYptQqd67Lp84Vhlw2i_dqXLPcw",
      "e": "AQAB"
  }
};
