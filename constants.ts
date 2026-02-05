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

// Direct CDN link extracted from Jumpshare
export const AUDIO_SOURCE = 'https://cdn.jumpshare.com/preview/Lh5fwV8iKPLGzjlBXz7q3kYx6wVQ9Iev1aogTTUg6NQCeGpMViVEK2Ck222qpNTu-mEavFg-a06lkdABlo2RiOrkkCeObxa1-7t0o-uj5TjU7f5mYuaBVg-UMXXksZwYa52JONih4p55VytZ7qJ5n26yjbN-I2pg_cnoHs_AmgI.mp3'; 
