import { Mascot } from '../types';

export const MASCOTS: Mascot[] = [
  {
    id: 'kiki',
    name: 'Kiki si Monyet',
    animal: 'Monyet Cerdik',
    emoji: '🐒',
    color: 'from-amber-400 to-orange-500',
    bgLight: 'bg-amber-100 border-amber-300 text-amber-900',
    accentColor: '#f59e0b',
    catchphrase: 'Yuk kita hitung bersama!',
    greeting: 'Halo teman-teman! Aku Kiki! Siap bermain angka denganku?',
    correctReactions: [
      'Horeee! Jawabanmu Tepat Sekali! 🎉',
      'Hebat! Kamu pintar sekali! ⭐',
      'Luar biasa! Lanjutkan ya! 🍌',
      'Aaaa senangnya! Kamu betul lagi! 🥳'
    ],
    wrongReactions: [
      'Tetap semangat! Coba hitung lagi yuk! 💪',
      'Tidak apa-apa, ayo pelan-pelan kita coba lagi! 💖',
      'Hampir betul! Jangan menyerah ya! 🎈'
    ]
  },
  {
    id: 'bella',
    name: 'Bella si Beruang',
    animal: 'Beruang Ramah',
    emoji: '🐻',
    color: 'from-amber-600 to-yellow-600',
    bgLight: 'bg-orange-100 border-orange-300 text-amber-950',
    accentColor: '#d97706',
    catchphrase: 'Pintar dan selalu ceria!',
    greeting: 'Halo! Aku Bella! Ayo kita belajar matematika sambil bergembira!',
    correctReactions: [
      'Waaah hebat banget! Teuudap!! 🐻✨',
      'Pintaaar! Kamu cerdas sekali! 🌟',
      'Mantap! Jawabanmu 100% benar! 🍯',
      'Superstar! Bintang untukmu! ⭐'
    ],
    wrongReactions: [
      'Oops! Belum tepat, yuk latihan lagi! 😊',
      'Jangan sedih ya, mari kita pelajari bersama! 🌸',
      'Ayo semangat, pasti bisa di soal berikutnya! 🧸'
    ]
  },
  {
    id: 'leo',
    name: 'Leo si Singa',
    animal: 'Singa Pemberani',
    emoji: '🦁',
    color: 'from-yellow-400 to-amber-500',
    bgLight: 'bg-yellow-100 border-yellow-300 text-yellow-950',
    accentColor: '#eab308',
    catchphrase: 'Pemberani dan pantang menyerah!',
    greeting: 'Roaaar! Aku Leo si Singa Pemberani! Mari taklukkan angka-angka ini!',
    correctReactions: [
      'ROAARR! Jawaban yang sangat tangguh! 🦁🔥',
      'Luar biasa perkasa! Benar sekali! 👑',
      'Kamuuu juara matematika sejati! 🏆',
      'Bagus sekali! Tembakan tepat! 🎯'
    ],
    wrongReactions: [
      'Singa tak pernah menyerah! Coba lagi! 🚀',
      'Fokuskan matamu, kamu pasti bisa! 🦁',
      'Ayo bangkit dan hitung ulang bersama! ⚡'
    ]
  },
  {
    id: 'pippo',
    name: 'Pippo si Penguin',
    animal: 'Penguin Lucu',
    emoji: '🐧',
    color: 'from-cyan-400 to-blue-500',
    bgLight: 'bg-cyan-100 border-cyan-300 text-cyan-950',
    accentColor: '#06b6d4',
    catchphrase: 'Belajar dingin, hasil hangat!',
    greeting: 'Kwek kwek! Aku Pippo! Ayo menari dan berhitung bersama!',
    correctReactions: [
      'Kwek kwek! Benarrr! Asyik sekali! 🐧❄️',
      'MANTUL! Kamu keren banget! 🍦',
      'Wajahku gembira! Jawabanmu betul! 🎉',
      'Ice cream untuk jawaban benarmu! 🍨'
    ],
    wrongReactions: [
      'Brrr, masih dingin! Yuk hangatkan dengan hitungan baru! ❄️',
      'Santai saja teman, mari kita coba lagi! 🧊',
      'Pippo percaya kamu pasti bisa! 💙'
    ]
  }
];
