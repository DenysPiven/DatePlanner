/**
 * Profile settings. Applications are saved encrypted.
 * Inbox password is NOT stored in plaintext — only a hash + wrapped key.
 * Change password: regenerate INBOX_AUTH (ask the agent / run keygen).
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

/** Online storage — holds encrypted blobs only (useless without inbox password). */
const STORAGE = {
  url: 'https://mantledb.sh/v2/dateplanner-pivden/applications',
  key: '9db89f97badf1defda339eb1ff0efb07de086257b770d39b471071b1102bf50e'
};

/**
 * Inbox auth material (no plaintext password).
 * passwordHash = SHA-256("dateplanner-inbox-v1:" + password)
 * Private key is AES-GCM wrapped with PBKDF2(password).
 */
const INBOX_AUTH = {
  passwordHash: '6b0ad522866f8b92f393326baa8bfc98125f557d36eb445892cfd66f84cd37f0',
  salt: 'ECVD/NfZR9IrTd29QRDkmA==',
  iv: 'uV0GfQXRXsqQe8Ya',
  tag: 'Fm3u/UInuhy+UqqA7lN9aw==',
  wrappedPrivateKey: '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',
  publicKey: {
    kty: 'RSA',
    n: 'o0CfI-kUuZpeO8oBT7492ef-pI6ulvjD-OJUS474kyPX-s_zjJgdWiKl6cRMvi-FgqjGN29Y2iafWx7VHKKw0ddpNZrzCVepc_1qz6CzYrve3urC7rLEABKKxoIm3N_NvQuhW-aIHdon1rHPUb02lIyy7F7_fXzpJlcD0HXqsbm1orOwRIe7USXzbAsWfx_OkYa_z6feD-Hve3gfDQQAPEFqX45Da1DgtJMsRn6n4PnEjY3D0NapVa-x62q1jHTZkRBbMhgW-K8TfGN2G5g5tw1BovsifpHHnPCL2hjPqvjXSSFwIW4ZtqEu3PKS9x1ntX_rG1FwLf0DFAWDEAeokw',
    e: 'AQAB'
  }
};
