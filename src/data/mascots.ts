import { Mascot } from '../types';

export const MASCOTS: Mascot[] = [
  {
    id: 'alex',
    name: 'Alex',
    animal: 'Singa Bintang',
    emoji: '🦁',
    color: 'from-yellow-500 to-amber-600',
    bgLight: 'bg-amber-100 border-amber-300 text-amber-900',
    accentColor: '#d97706',
    catchphrase: 'Tunjukkan aksi terbaikmu!',
    greeting: 'Roaaar! Aku Alex si Singa Bintang dari New York! Mari taklukkan angka-angka ini!',
    correctReactions: [
      'Roaaar! Jawabanmu sangat hebat! 🥩',
      'Bintang panggung sejati! Benar! 🌟',
      'Tarian kemenangan untukmu! 🕺',
      'Luar biasa! Aksi yang sempurna! ⭐'
    ],
    wrongReactions: [
      'Tidak apa-apa, singa New York pantang menyerah! Coba lagi! 💪',
      'Fokus, kita pasti bisa melakukan aksi berikutnya! 🦁',
      'Hampir tepat! Ayo tunjukkan taringmu sekali lagi! 🍖'
    ]
  },
  {
    id: 'julien',
    name: 'Raja Julien',
    animal: 'Lemur Ekor Cincin',
    emoji: '🦝',
    color: 'from-slate-400 to-slate-600',
    bgLight: 'bg-slate-100 border-slate-300 text-slate-900',
    accentColor: '#64748b',
    catchphrase: 'Suka menari dan memimpin!',
    greeting: 'Halo rakyatku! Aku Raja Julien! Mari menari dan berhitung bersama!',
    correctReactions: [
      'Hore! Raja Julien bangga padamu! 👑',
      'Luar biasa manis! Goyang terus! 🕺',
      'Benar sekali! Raja menyukainya! 🥭',
      'Hebat! Kamu layak mendapat mahkota! 👑'
    ],
    wrongReactions: [
      'Oh tidak, bukan begitu! Coba goyang kepalamu dan hitung lagi! 🌴',
      'Rakyatku harus tetap semangat, mari coba lagi! 👑',
      'Jangan sedih, ayo kita berdansa dan hitung ulang! 💃'
    ]
  },
  {
    id: 'marty',
    name: 'Marty',
    animal: 'Zebra Ceria',
    emoji: '🦓',
    color: 'from-zinc-300 to-zinc-500',
    bgLight: 'bg-zinc-100 border-zinc-300 text-zinc-900',
    accentColor: '#27272a',
    catchphrase: 'Sangat liar dan bebas!',
    greeting: 'Yee-haw! Aku Marty si Zebra! Ayo lari cepat dan berhitung bersamaku!',
    correctReactions: [
      'Crack-a-lackin! Jawabanmu super tepat! 🦓✨',
      'Luar biasa cepat! Kamu benar! 🍏',
      'Yee-haw! Lompatan yang bagus! 🏃‍♂️',
      'Mantap! Itu baru namanya gaya zebra! ⭐'
    ],
    wrongReactions: [
      'Ayo coba lagi, jangan biarkan harimu kurang liar! 🌿',
      'Pelan-pelan temanku, kita coba lari sekali lagi! 🦓',
      'Tidak masalah! Ayo lari lagi ke lintasan berikutnya! 🌾'
    ]
  },
  {
    id: 'gloria',
    name: 'Gloria',
    animal: 'Kuda Nil Anggun',
    emoji: '🦛',
    color: 'from-pink-400 to-purple-500',
    bgLight: 'bg-pink-100 border-pink-300 text-pink-950',
    accentColor: '#ec4899',
    catchphrase: 'Selalu anggun dan berani!',
    greeting: 'Halo sayang! Aku Gloria si Kuda Nil manis! Ayo kita berhitung sambil bersenang-senang!',
    correctReactions: [
      'Oh sayang, itu sangat luar biasa! Benar! 💖',
      'Hebat sekali! Gaya berhitung yang anggun! 🌸',
      'Tepat sekali! Ibu menyukainya! 🍉',
      'Cantik sekali jawabanmu! Bintang untukmu! ⭐'
    ],
    wrongReactions: [
      'Jangan menyerah sayang, coba hitung perlahan sekali lagi! 💕',
      'Oops! Sedikit lagi tepat, yuk semangat! 🧸',
      'Santai saja manis, ayo kita coba hitung ulang! 🍃'
    ]
  },
  {
    id: 'skipper',
    name: 'Skipper',
    animal: 'Penguin Pemimpin',
    emoji: '🐧',
    color: 'from-blue-600 to-cyan-700',
    bgLight: 'bg-sky-100 border-sky-300 text-sky-950',
    accentColor: '#0284c7',
    catchphrase: 'Kowalski, analisis!',
    greeting: 'Dengar prajurit! Aku Skipper! Siapkan strategimu dan mari kita selesaikan kuis ini!',
    correctReactions: [
      'Analisis tepat! Misi berhasil, prajurit! 🐧🎖️',
      'Hebat! Taktik yang sangat jitu! 🐟',
      'Kerja bagus! Lanjutkan operasi ini! 🚀',
      'Tepat sasaran! Kamu memang andalan! 🎯'
    ],
    wrongReactions: [
      'Strategi meleset! Atur ulang rencana dan coba lagi! 🗺️',
      'Jangan panik prajurit, tetap fokus pada target! 🎯',
      'Kowalski mendeteksi sedikit kesalahan, mari koreksi! 🔍'
    ]
  }
];
