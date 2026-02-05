import { Chapter } from './types';

// CONFIGURATION: CHANGE THIS DATE
// The date the user needs to input to unlock the experience.
// Format: DD MM YYYY
export const SPECIAL_DATE = {
  day: '17',
  month: '07',
  year: '2025' // Example year
};

export const CHAPTER_ORDER = [
  Chapter.ORIGIN,
  Chapter.MEMORY,
  Chapter.NIGHT,
  Chapter.JOURNEY,
  Chapter.QUESTION,
  Chapter.ASK,
  Chapter.GALLERY
];

// Direct CDN link extracted from Jumpshare page
// NOTE: These links are temporary. For a permanent fix, host the file in the public/ folder.
export const AUDIO_SOURCE = 'https://cdn.jumpshare.com/preview/kgxUW3tYT1EjUsP3dRSliiOpsiJi2n4iu4FxU-AVLeCZ3SXa-vhFRFpW7vS8Uv1fFUJgrhyeJ03L3xIJZIkL2OrkkCeObxa1-7t0o-uj5TjU7f5mYuaBVg-UMXXksZwYUwpBWeRwQ3DsleYNGkRlmG6yjbN-I2pg_cnoHs_AmgI.mp3'; 
