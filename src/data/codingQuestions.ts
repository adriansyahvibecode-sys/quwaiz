import { Question } from '../types';

// Extend Question interface locally if needed, but we keep it compatible.
// We added 'optionsText?: string[]' to the questions.
export const CODING_QUESTIONS: (Question & { optionsText?: string[] })[] = [
  {
    "id": "q_coding_a",
    "category": "coding_algoritma",
    "title": "Budi ingin mencuci tangan sebelum makan. Langkah mana yang urutannya benar?",
    "visualType": "shapes",
    "visualItem": "📋",
    "operandA": 0,
    "operator": "=",
    "correctAnswer": 2,
    "timerSeconds": 25,
    "optionsText": [
      "Makan → Pakai sabun → Cuci air",
      "Basahi tangan dengan air → Pakai sabun & bilas → Keringkan dengan lap",
      "Keringkan dengan lap → Pakai sabun → Basahi air"
    ],
    "explanation": "Jawaban pilihan [2] adalah yang paling tepat!"
  },
  {
    "id": "q_coding_b",
    "category": "coding_algoritma",
    "title": "Siti ingin menyikat gigi. Urutan yang paling tepat adalah...",
    "visualType": "shapes",
    "visualItem": "📋",
    "operandA": 0,
    "operator": "=",
    "correctAnswer": 1,
    "timerSeconds": 25,
    "optionsText": [
      "Oleskan pasta gigi → Sikat gigi → Kumur-kumur air bersih",
      "Kumur-kumur → Tidur → Oleskan pasta gigi",
      "Sikat gigi → Simpan sikat → Oleskan pasta gigi"
    ],
    "explanation": "Jawaban pilihan [1] adalah yang paling tepat!"
  },
  {
    "id": "q_coding_c",
    "category": "coding_algoritma",
    "title": "Langkah menanam biji bunga yang benar adalah...",
    "visualType": "shapes",
    "visualItem": "📋",
    "operandA": 0,
    "operator": "=",
    "correctAnswer": 2,
    "timerSeconds": 25,
    "optionsText": [
      "Petik bunga → Tanam biji → Siram",
      "Gali tanah & tanam biji → Siram air → Tunggu tumbuh bunga",
      "Siram air → Petik bunga → Gali tanah"
    ],
    "explanation": "Jawaban pilihan [2] adalah yang paling tepat!"
  },
  {
    "id": "q_coding_d",
    "category": "coding_algoritma",
    "title": "Bagaimana urutan memakai sepatu sekolah?",
    "visualType": "shapes",
    "visualItem": "📋",
    "operandA": 0,
    "operator": "=",
    "correctAnswer": 2,
    "timerSeconds": 25,
    "optionsText": [
      "Pakai sepatu dulu → Pakai kaus kaki → Ikat tali sepatu",
      "Pakai kaus kaki → Pakai sepatu → Ikat tali sepatu",
      "Ikat tali sepatu → Pakai kaus kaki → Pakai sepatu"
    ],
    "explanation": "Jawaban pilihan [2] adalah yang paling tepat!"
  },
  {
    "id": "q_coding_e",
    "category": "coding_algoritma",
    "title": "Ibu ingin membuat es teh manis. Urutan yang benar adalah...",
    "visualType": "shapes",
    "visualItem": "📋",
    "operandA": 0,
    "operator": "=",
    "correctAnswer": 1,
    "timerSeconds": 25,
    "optionsText": [
      "Seduh teh hangat → Tambah gula & es batu → Aduk rata",
      "Masukkan es batu → Minum habis → Seduh teh",
      "Tambah gula → Minum habis → Seduh teh"
    ],
    "explanation": "Jawaban pilihan [1] adalah yang paling tepat!"
  },
  {
    "id": "q_coding_f",
    "category": "coding_algoritma",
    "title": "Rani ingin melukis gambar. Urutan yang tepat adalah...",
    "visualType": "shapes",
    "visualItem": "📋",
    "operandA": 0,
    "operator": "=",
    "correctAnswer": 2,
    "timerSeconds": 25,
    "optionsText": [
      "Warnai gambar → Gambar sketsa dengan pensil → Pajang lukisan",
      "Gambar sketsa dengan pensil → Mewarnai gambar → Pajang lukisan",
      "Pajang lukisan → Mewarnai → Gambar sketsa"
    ],
    "explanation": "Jawaban pilihan [2] adalah yang paling tepat!"
  },
  {
    "id": "q_coding_g",
    "category": "coding_algoritma",
    "title": "Urutan mandi yang bersih adalah...",
    "visualType": "shapes",
    "visualItem": "📋",
    "operandA": 0,
    "operator": "=",
    "correctAnswer": 2,
    "timerSeconds": 25,
    "optionsText": [
      "Pakai baju bersih → Basahi badan & pakai sabun → Bilas air bersih",
      "Basahi badan & pakai sabun → Bilas air bersih → Keringkan dengan handuk",
      "Keringkan dengan handuk → Basahi badan → Pakai baju"
    ],
    "explanation": "Jawaban pilihan [2] adalah yang paling tepat!"
  },
  {
    "id": "q_coding_h",
    "category": "coding_algoritma",
    "title": "Langkah sebelum tidur malam adalah...",
    "visualType": "shapes",
    "visualItem": "📋",
    "operandA": 0,
    "operator": "=",
    "correctAnswer": 2,
    "timerSeconds": 25,
    "optionsText": [
      "Mimpi indah → Gosok gigi & cuci kaki → Naik ke tempat tidur",
      "Gosok gigi & cuci kaki → Naik ke tempat tidur → Berdoa & tidur",
      "Tidur nyenyak → Gosok gigi → Naik ke tempat tidur"
    ],
    "explanation": "Jawaban pilihan [2] adalah yang paling tepat!"
  },
  {
    "id": "q_coding_i",
    "category": "coding_algoritma",
    "title": "Bagaimana cara membuat roti tawar oles mentega?",
    "visualType": "shapes",
    "visualItem": "📋",
    "operandA": 0,
    "operator": "=",
    "correctAnswer": 1,
    "timerSeconds": 25,
    "optionsText": [
      "Ambil selembar roti → Oleskan mentega dengan sendok/pisau roti → Roti siap dimakan",
      "Makan roti → Oleskan mentega → Ambil roti",
      "Oleskan mentega di piring → Makan piring → Ambil roti"
    ],
    "explanation": "Jawaban pilihan [1] adalah yang paling tepat!"
  },
  {
    "id": "q_coding_j",
    "category": "coding_algoritma",
    "title": "Urutan merapikan tempat tidur setelah bangun tidur:",
    "visualType": "shapes",
    "visualItem": "📋",
    "operandA": 0,
    "operator": "=",
    "correctAnswer": 2,
    "timerSeconds": 25,
    "optionsText": [
      "Mandi dulu → Lipat selimut → Merapikan bantal",
      "Merapikan bantal → Melipat selimut → Mendorong kasur rapi",
      "Tidur lagi → Lipat selimut → Buang bantal"
    ],
    "explanation": "Jawaban pilihan [2] adalah yang paling tepat!"
  },
  {
    "id": "q_coding_k",
    "category": "coding_pola",
    "title": "Perhatikan pola warna balon berikut: 🔴 Merah - 🔵 Biru - 🔴 Merah - 🔵 Biru - 🔴 Merah - [...]. Balon berikutnya berwarna?",
    "visualType": "shapes",
    "visualItem": "🎨",
    "operandA": 0,
    "operator": "=",
    "correctAnswer": 2,
    "timerSeconds": 25,
    "optionsText": [
      "🔴 Merah",
      "🔵 Biru",
      "🟡 Kuning"
    ],
    "explanation": "Jawaban pilihan [2] adalah yang paling tepat!"
  },
  {
    "id": "q_coding_l",
    "category": "coding_pola",
    "title": "Perhatikan pola bentuk berikut: 🟦 Persegi - 🟡 Lingkaran - 🟦 Persegi - 🟡 Lingkaran - [...]. Bentuk selanjutnya adalah?",
    "visualType": "shapes",
    "visualItem": "🎨",
    "operandA": 0,
    "operator": "=",
    "correctAnswer": 1,
    "timerSeconds": 25,
    "optionsText": [
      "🟦 Persegi",
      "🟡 Lingkaran",
      "🔺 Segitiga"
    ],
    "explanation": "Jawaban pilihan [1] adalah yang paling tepat!"
  },
  {
    "id": "q_coding_m",
    "category": "coding_pola",
    "title": "Perhatikan pola buah berikut: 🍎 Apel - 🍌 Pisang - 🍎 Apel - 🍌 Pisang - [...]. Buah selanjutnya adalah?",
    "visualType": "shapes",
    "visualItem": "🎨",
    "operandA": 0,
    "operator": "=",
    "correctAnswer": 2,
    "timerSeconds": 25,
    "optionsText": [
      "🍊 Jeruk",
      "🍎 Apel",
      "🍌 Pisang"
    ],
    "explanation": "Jawaban pilihan [2] adalah yang paling tepat!"
  },
  {
    "id": "q_coding_n",
    "category": "coding_pola",
    "title": "Perhatikan pola hewan: 🐱 Kucing - 🐶 Anjing - 🐱 Kucing - 🐶 Anjing - [...]. Hewan berikutnya adalah?",
    "visualType": "shapes",
    "visualItem": "🎨",
    "operandA": 0,
    "operator": "=",
    "correctAnswer": 1,
    "timerSeconds": 25,
    "optionsText": [
      "🐱 Kucing",
      "🐶 Anjing",
      "🐰 Kelinci"
    ],
    "explanation": "Jawaban pilihan [1] adalah yang paling tepat!"
  },
  {
    "id": "q_coding_o",
    "category": "coding_pola",
    "title": "Perhatikan pola angka: 1 - 2 - 1 - 2 - 1 - [...]. Angka berikutnya adalah?",
    "visualType": "shapes",
    "visualItem": "🎨",
    "operandA": 0,
    "operator": "=",
    "correctAnswer": 2,
    "timerSeconds": 25,
    "optionsText": [
      "1",
      "2",
      "3"
    ],
    "explanation": "Jawaban pilihan [2] adalah yang paling tepat!"
  },
  {
    "id": "q_coding_p",
    "category": "coding_pola",
    "title": "Perhatikan pola ukuran bola: ⚽ Besar - ⚽ Kecil - ⚽ Besar - ⚽ Kecil - [...]. Ukuran bola berikutnya adalah?",
    "visualType": "shapes",
    "visualItem": "🎨",
    "operandA": 0,
    "operator": "=",
    "correctAnswer": 2,
    "timerSeconds": 25,
    "optionsText": [
      "⚽ Sedang",
      "⚽ Besar",
      "⚽ Kecil"
    ],
    "explanation": "Jawaban pilihan [2] adalah yang paling tepat!"
  },
  {
    "id": "q_coding_q",
    "category": "coding_pola",
    "title": "Perhatikan pola emosi emoji: 😀 Senyum - 😢 Sedih - 😀 Senyum - 😢 Sedih - [...]. Gambar selanjutnya adalah?",
    "visualType": "shapes",
    "visualItem": "🎨",
    "operandA": 0,
    "operator": "=",
    "correctAnswer": 1,
    "timerSeconds": 25,
    "optionsText": [
      "😀 Senyum",
      "😢 Sedih",
      "😡 Marah"
    ],
    "explanation": "Jawaban pilihan [1] adalah yang paling tepat!"
  },
  {
    "id": "q_coding_r",
    "category": "coding_pola",
    "title": "Perhatikan pola tepukan: 👏 Tepuk 1x - 👏 Tepuk 2x - 👏 Tepuk 1x - 👏 Tepuk 2x - [...]. Tepukan berikutnya adalah?",
    "visualType": "shapes",
    "visualItem": "🎨",
    "operandA": 0,
    "operator": "=",
    "correctAnswer": 1,
    "timerSeconds": 25,
    "optionsText": [
      "Tepuk 1x",
      "Tepuk 2x",
      "Tepuk 3x"
    ],
    "explanation": "Jawaban pilihan [1] adalah yang paling tepat!"
  },
  {
    "id": "q_coding_s",
    "category": "coding_pola",
    "title": "Perhatikan pola warna baju: ⚪ Putih - ⬛ Hitam - ⚪ Putih - ⬛ Hitam - [...]. Warna berikutnya adalah?",
    "visualType": "shapes",
    "visualItem": "🎨",
    "operandA": 0,
    "operator": "=",
    "correctAnswer": 1,
    "timerSeconds": 25,
    "optionsText": [
      "⚪ Putih",
      "⬛ Hitam",
      "🟥 Merah"
    ],
    "explanation": "Jawaban pilihan [1] adalah yang paling tepat!"
  },
  {
    "id": "q_coding_t",
    "category": "coding_pola",
    "title": "Perhatikan pola bunga: 🌸 Pink - 🌼 Kuning - 🌸 Pink - 🌼 Kuning - 🌸 Pink - [...]. Bunga berikutnya berwarna?",
    "visualType": "shapes",
    "visualItem": "🎨",
    "operandA": 0,
    "operator": "=",
    "correctAnswer": 2,
    "timerSeconds": 25,
    "optionsText": [
      "🌸 Pink",
      "🌼 Kuning",
      "🌺 Merah"
    ],
    "explanation": "Jawaban pilihan [2] adalah yang paling tepat!"
  },
  {
    "id": "q_coding_u",
    "category": "coding_navigasi",
    "title": "Kucing berada di kotak [1]. Ikan berada di kotak [3] di sebelah kanan. Perintah agar kucing mendapatkan ikan adalah...",
    "visualType": "shapes",
    "visualItem": "🧭",
    "operandA": 0,
    "operator": "=",
    "correctAnswer": 1,
    "timerSeconds": 25,
    "optionsText": [
      "Maju 2 langkah ke kanan",
      "Mundur 2 langkah ke belakang",
      "Lompat ke kiri"
    ],
    "explanation": "Jawaban pilihan [1] adalah yang paling tepat!"
  },
  {
    "id": "q_coding_v",
    "category": "coding_navigasi",
    "title": "Mobil mainan menghadap ke depan. Jika ingin berbelok ke tempat parkir di sebelah kiri, perintahnya adalah...",
    "visualType": "shapes",
    "visualItem": "🧭",
    "operandA": 0,
    "operator": "=",
    "correctAnswer": 2,
    "timerSeconds": 25,
    "optionsText": [
      "Belok kanan",
      "Belok kiri",
      "Mundur ke belakang"
    ],
    "explanation": "Jawaban pilihan [2] adalah yang paling tepat!"
  },
  {
    "id": "q_coding_w",
    "category": "coding_navigasi",
    "title": "Semut ingin naik ke atas meja. Arah langkah yang benar adalah...",
    "visualType": "shapes",
    "visualItem": "🧭",
    "operandA": 0,
    "operator": "=",
    "correctAnswer": 2,
    "timerSeconds": 25,
    "optionsText": [
      "Barjalan turun ke bawah",
      "Berjalan naik ke atas",
      "Mundur ke samping"
    ],
    "explanation": "Jawaban pilihan [2] adalah yang paling tepat!"
  },
  {
    "id": "q_coding_x",
    "category": "coding_navigasi",
    "title": "Robot berjalan ke depan 3 langkah, lalu belok kanan 1 langkah. Apa yang dilakukan robot pertama kali?",
    "visualType": "shapes",
    "visualItem": "🧭",
    "operandA": 0,
    "operator": "=",
    "correctAnswer": 2,
    "timerSeconds": 25,
    "optionsText": [
      "Belok kanan 1 langkah",
      "Maju ke depan 3 langkah",
      "Berhenti di tempat"
    ],
    "explanation": "Jawaban pilihan [2] adalah yang paling tepat!"
  },
  {
    "id": "q_coding_y",
    "category": "coding_navigasi",
    "title": "Kelinci ingin melompati rintangan di depannya. Gerakan yang tepat adalah...",
    "visualType": "shapes",
    "visualItem": "🧭",
    "operandA": 0,
    "operator": "=",
    "correctAnswer": 1,
    "timerSeconds": 25,
    "optionsText": [
      "Lompat ke atas melewati rintangan",
      "Mundur dan duduk",
      "Mendorong rintangan sampai roboh"
    ],
    "explanation": "Jawaban pilihan [1] adalah yang paling tepat!"
  },
  {
    "id": "q_coding_z",
    "category": "coding_navigasi",
    "title": "Burung terbang di udara menuju sarang di sebelah kanan. Arah burung adalah...",
    "visualType": "shapes",
    "visualItem": "🧭",
    "operandA": 0,
    "operator": "=",
    "correctAnswer": 2,
    "timerSeconds": 25,
    "optionsText": [
      "Ke kiri",
      "Ke kanan",
      "Ke bawah tanah"
    ],
    "explanation": "Jawaban pilihan [2] adalah yang paling tepat!"
  },
  {
    "id": "q_coding_aa",
    "category": "coding_navigasi",
    "title": "Anak panah menunjuk ke atas (⬆️). Itu artinya perintah untuk bergerak ke...",
    "visualType": "shapes",
    "visualItem": "🧭",
    "operandA": 0,
    "operator": "=",
    "correctAnswer": 1,
    "timerSeconds": 25,
    "optionsText": [
      "Atas / Depan",
      "Bawah / Belakang",
      "Samping Kiri"
    ],
    "explanation": "Jawaban pilihan [1] adalah yang paling tepat!"
  },
  {
    "id": "q_coding_ab",
    "category": "coding_navigasi",
    "title": "Anak panah menunjuk ke bawah (⬇️). Artinya kita harus bergerak ke...",
    "visualType": "shapes",
    "visualItem": "🧭",
    "operandA": 0,
    "operator": "=",
    "correctAnswer": 2,
    "timerSeconds": 25,
    "optionsText": [
      "Atas",
      "Bawah / Mundur",
      "Kanan"
    ],
    "explanation": "Jawaban pilihan [2] adalah yang paling tepat!"
  },
  {
    "id": "q_coding_ac",
    "category": "coding_navigasi",
    "title": "Jika ada tembok di depan Robot, apa yang harus dilakukan Robot agar tidak menabrak?",
    "visualType": "shapes",
    "visualItem": "🧭",
    "operandA": 0,
    "operator": "=",
    "correctAnswer": 2,
    "timerSeconds": 25,
    "optionsText": [
      "Terus jalan menerobos tembok",
      "Belok ke kiri atau ke kanan",
      "Tidur di tempat"
    ],
    "explanation": "Jawaban pilihan [2] adalah yang paling tepat!"
  },
  {
    "id": "q_coding_ad",
    "category": "coding_navigasi",
    "title": "Lebah 🐝 ingin menghampiri bunga 🌺 yang ada di belakangnya. Lebah harus...",
    "visualType": "shapes",
    "visualItem": "🧭",
    "operandA": 0,
    "operator": "=",
    "correctAnswer": 2,
    "timerSeconds": 25,
    "optionsText": [
      "Maju lurus ke depan",
      "Putar balik / mundur ke belakang",
      "Lompat ke langit"
    ],
    "explanation": "Jawaban pilihan [2] adalah yang paling tepat!"
  },
  {
    "id": "q_coding_ae",
    "category": "coding_kondisional",
    "title": "JIKA lampu lalu lintas berwarna MERAH, MAKA kendaraan harus...",
    "visualType": "shapes",
    "visualItem": "💡",
    "operandA": 0,
    "operator": "=",
    "correctAnswer": 2,
    "timerSeconds": 25,
    "optionsText": [
      "Maju kencang",
      "Berhenti",
      "Klakson terus"
    ],
    "explanation": "Jawaban pilihan [2] adalah yang paling tepat!"
  },
  {
    "id": "q_coding_af",
    "category": "coding_kondisional",
    "title": "JIKA lampu lalu lintas berwarna HIJAU, MAKA kendaraan boleh...",
    "visualType": "shapes",
    "visualItem": "💡",
    "operandA": 0,
    "operator": "=",
    "correctAnswer": 1,
    "timerSeconds": 25,
    "optionsText": [
      "Berjalan / Maju",
      "Berhenti",
      "Mundur"
    ],
    "explanation": "Jawaban pilihan [1] adalah yang paling tepat!"
  },
  {
    "id": "q_coding_ag",
    "category": "coding_kondisional",
    "title": "JIKA hari hujan deras, MAKA Budi harus menggunakan...",
    "visualType": "shapes",
    "visualItem": "💡",
    "operandA": 0,
    "operator": "=",
    "correctAnswer": 2,
    "timerSeconds": 25,
    "optionsText": [
      "Kacamata hitam",
      "Payung atau jas hujan",
      "Kipas angin"
    ],
    "explanation": "Jawaban pilihan [2] adalah yang paling tepat!"
  },
  {
    "id": "q_coding_ah",
    "category": "coding_kondisional",
    "title": "JIKA perut merasa lapar, MAKA tindakan yang benar adalah...",
    "visualType": "shapes",
    "visualItem": "💡",
    "operandA": 0,
    "operator": "=",
    "correctAnswer": 1,
    "timerSeconds": 25,
    "optionsText": [
      "Makan makanan yang sehat",
      "Mandi air dingin",
      "Membaca buku"
    ],
    "explanation": "Jawaban pilihan [1] adalah yang paling tepat!"
  },
  {
    "id": "q_coding_ai",
    "category": "coding_kondisional",
    "title": "JIKA tangan kotor setelah bermain pasir, MAKA kita harus...",
    "visualType": "shapes",
    "visualItem": "💡",
    "operandA": 0,
    "operator": "=",
    "correctAnswer": 2,
    "timerSeconds": 25,
    "optionsText": [
      "Langsung makan kue",
      "Mencuci tangan dengan sabun",
      "Mengusap tangan ke baju"
    ],
    "explanation": "Jawaban pilihan [2] adalah yang paling tepat!"
  },
  {
    "id": "q_coding_aj",
    "category": "coding_kondisional",
    "title": "JIKA merasa mengantuk di malam hari, MAKA kita sebaiknya...",
    "visualType": "shapes",
    "visualItem": "💡",
    "operandA": 0,
    "operator": "=",
    "correctAnswer": 1,
    "timerSeconds": 25,
    "optionsText": [
      "Tidur istirahat",
      "Bermain sepeda",
      "Lari-lari di halaman"
    ],
    "explanation": "Jawaban pilihan [1] adalah yang paling tepat!"
  },
  {
    "id": "q_coding_ak",
    "category": "coding_kondisional",
    "title": "JIKA lampu kamar dimatikan, MAKA suasana kamar menjadi...",
    "visualType": "shapes",
    "visualItem": "💡",
    "operandA": 0,
    "operator": "=",
    "correctAnswer": 2,
    "timerSeconds": 25,
    "optionsText": [
      "Terang benderang",
      "Gelap",
      "Silau"
    ],
    "explanation": "Jawaban pilihan [2] adalah yang paling tepat!"
  },
  {
    "id": "q_coding_al",
    "category": "coding_kondisional",
    "title": "JIKA es batu dibiarkan di tempat panas, MAKA es akan...",
    "visualType": "shapes",
    "visualItem": "💡",
    "operandA": 0,
    "operator": "=",
    "correctAnswer": 1,
    "timerSeconds": 25,
    "optionsText": [
      "Mencair menjadi air",
      "Membeku jadi batu",
      "Berubah jadi balon"
    ],
    "explanation": "Jawaban pilihan [1] adalah yang paling tepat!"
  },
  {
    "id": "q_coding_am",
    "category": "coding_kondisional",
    "title": "JIKA kita tersenyum pada teman, MAKA teman akan merasa...",
    "visualType": "shapes",
    "visualItem": "💡",
    "operandA": 0,
    "operator": "=",
    "correctAnswer": 1,
    "timerSeconds": 25,
    "optionsText": [
      "Senang dan gembira",
      "Marah dan takut",
      "Sedih menangis"
    ],
    "explanation": "Jawaban pilihan [1] adalah yang paling tepat!"
  },
  {
    "id": "q_coding_an",
    "category": "coding_kondisional",
    "title": "JIKA tanaman tidak pernah disiram air, MAKA tanaman akan...",
    "visualType": "shapes",
    "visualItem": "💡",
    "operandA": 0,
    "operator": "=",
    "correctAnswer": 2,
    "timerSeconds": 25,
    "optionsText": [
      "Tumbuh makin besar",
      "Layu dan kering",
      "Berbuah banyak"
    ],
    "explanation": "Jawaban pilihan [2] adalah yang paling tepat!"
  },
  {
    "id": "q_coding_ao",
    "category": "coding_debugging",
    "title": "Robot bertugas menyeduh susu hangat: (1) Tuang air hangat (2) Masukkan bubuk susu (3) Masukkan kecap asin. Langkah mana yang salah?",
    "visualType": "shapes",
    "visualItem": "🐞",
    "operandA": 0,
    "operator": "=",
    "correctAnswer": 3,
    "timerSeconds": 25,
    "optionsText": [
      "Langkah 1 (Air hangat)",
      "Langkah 2 (Bubuk susu)",
      "Langkah 3 (Kecap asin)"
    ],
    "explanation": "Jawaban pilihan [3] adalah yang paling tepat!"
  },
  {
    "id": "q_coding_ap",
    "category": "coding_debugging",
    "title": "Andi memakai pakaian sekolah: (1) Pakai celana (2) Pakai baju (3) Pakai sepatu di kepala. Apa yang salah?",
    "visualType": "shapes",
    "visualItem": "🐞",
    "operandA": 0,
    "operator": "=",
    "correctAnswer": 2,
    "timerSeconds": 25,
    "optionsText": [
      "Memakai celana",
      "Memakai sepatu di kepala",
      "Memakai baju"
    ],
    "explanation": "Jawaban pilihan [2] adalah yang paling tepat!"
  },
  {
    "id": "q_coding_aq",
    "category": "coding_debugging",
    "title": "Dino membuat sereal: (1) Tuang sereal ke mangkuk (2) Tuang susu (3) Pakai sisir untuk makan sereal. Mana yang salah?",
    "visualType": "shapes",
    "visualItem": "🐞",
    "operandA": 0,
    "operator": "=",
    "correctAnswer": 1,
    "timerSeconds": 25,
    "optionsText": [
      "Menggunakan sisir untuk makan",
      "Mentuangkan sereal",
      "Mentuangkan susu"
    ],
    "explanation": "Jawaban pilihan [1] adalah yang paling tepat!"
  },
  {
    "id": "q_coding_ar",
    "category": "coding_debugging",
    "title": "Petunjuk menuju dapur: 'Maju 2 langkah, lalu melompat ke genteng rumah'. Mana petunjuk yang aneh?",
    "visualType": "shapes",
    "visualItem": "🐞",
    "operandA": 0,
    "operator": "=",
    "correctAnswer": 2,
    "timerSeconds": 25,
    "optionsText": [
      "Maju 2 langkah",
      "Melompat ke genteng rumah",
      "Menuju dapur"
    ],
    "explanation": "Jawaban pilihan [2] adalah yang paling tepat!"
  },
  {
    "id": "q_coding_as",
    "category": "coding_debugging",
    "title": "Ibu menggambar buah apel warna merah. Budi mewarnai daunnya dengan warna cokelat tua gelap sekali seperti tanah. Agar lebih segar, warna daun yang benar adalah...",
    "visualType": "shapes",
    "visualItem": "🐞",
    "operandA": 0,
    "operator": "=",
    "correctAnswer": 1,
    "timerSeconds": 25,
    "optionsText": [
      "Hijau",
      "Hitam",
      "Ungu"
    ],
    "explanation": "Jawaban pilihan [1] adalah yang paling tepat!"
  },
  {
    "id": "q_coding_at",
    "category": "coding_debugging",
    "title": "Mobil mainan tidak bisa berjalan karena rodanya lepas. Cara memperbaiki (debugging) mobil tersebut adalah...",
    "visualType": "shapes",
    "visualItem": "🐞",
    "operandA": 0,
    "operator": "=",
    "correctAnswer": 1,
    "timerSeconds": 25,
    "optionsText": [
      "Memasang kembali rodanya",
      "Mencuci kaca mobil",
      "Mengecat mobil"
    ],
    "explanation": "Jawaban pilihan [1] adalah yang paling tepat!"
  },
  {
    "id": "q_coding_au",
    "category": "coding_debugging",
    "title": "Senter tidak menyala saat ditekan tombolnya. Apa yang perlu diperiksa terlebih dahulu?",
    "visualType": "shapes",
    "visualItem": "🐞",
    "operandA": 0,
    "operator": "=",
    "correctAnswer": 1,
    "timerSeconds": 25,
    "optionsText": [
      "Baterai di dalam senter",
      "Warna wadah senter",
      "Tali senter"
    ],
    "explanation": "Jawaban pilihan [1] adalah yang paling tepat!"
  },
  {
    "id": "q_coding_av",
    "category": "coding_debugging",
    "title": "Langkah mewarnai gambar: (1) Buka kotak krayon (2) Ambil krayon (3) Mewarnai dengan mata dipejamkan rapat. Mana yang keliru?",
    "visualType": "shapes",
    "visualItem": "🐞",
    "operandA": 0,
    "operator": "=",
    "correctAnswer": 1,
    "timerSeconds": 25,
    "optionsText": [
      "Mewarnai dengan mata dipejamkan",
      "Buka kotak krayon",
      "Ambil krayon"
    ],
    "explanation": "Jawaban pilihan [1] adalah yang paling tepat!"
  },
  {
    "id": "q_coding_aw",
    "category": "coding_debugging",
    "title": "Robot hendak menyiram bunga, tetapi malah menyiram sepatu Ayah. Kesalahan robot adalah...",
    "visualType": "shapes",
    "visualItem": "🐞",
    "operandA": 0,
    "operator": "=",
    "correctAnswer": 1,
    "timerSeconds": 25,
    "optionsText": [
      "Menyiram sasaran yang salah (sepatu)",
      "Menyiram air",
      "Menggunakan wadah siram"
    ],
    "explanation": "Jawaban pilihan [1] adalah yang paling tepat!"
  },
  {
    "id": "q_coding_ax",
    "category": "coding_debugging",
    "title": "Perintah memasak nasi: (1) Cuci beras (2) Masukkan ke rice cooker (3) Colokkan ke listrik (4) Masukkan mainan plastik. Langkah mana yang salah?",
    "visualType": "shapes",
    "visualItem": "🐞",
    "operandA": 0,
    "operator": "=",
    "correctAnswer": 3,
    "timerSeconds": 25,
    "optionsText": [
      "Langkah 1 (Cuci beras)",
      "Langkah 3 (Colok listrik)",
      "Langkah 4 (Masukkan mainan)"
    ],
    "explanation": "Jawaban pilihan [3] adalah yang paling tepat!"
  },
  {
    "id": "q_coding_ay",
    "category": "coding_pengulangan",
    "title": "Ibu berkata: 'Lakukan tepuk tangan sebanyak 3 kali!' Berapa kali kamu menepuk tangan?",
    "visualType": "shapes",
    "visualItem": "🔁",
    "operandA": 0,
    "operator": "=",
    "correctAnswer": 2,
    "timerSeconds": 25,
    "optionsText": [
      "1 kali",
      "3 kali",
      "10 kali"
    ],
    "explanation": "Jawaban pilihan [2] adalah yang paling tepat!"
  },
  {
    "id": "q_coding_az",
    "category": "coding_pengulangan",
    "title": "Perintah: 'Lompat kecil 2 kali, lalu berhenti'. Berapa kali kamu melompat?",
    "visualType": "shapes",
    "visualItem": "🔁",
    "operandA": 0,
    "operator": "=",
    "correctAnswer": 1,
    "timerSeconds": 25,
    "optionsText": [
      "2 kali",
      "5 kali",
      "Tidak melompat"
    ],
    "explanation": "Jawaban pilihan [1] adalah yang paling tepat!"
  },
  {
    "id": "q_coding_ba",
    "category": "coding_pengulangan",
    "title": "Petunjuk lagu: 'Buka tutup pintu (ulangi 4 kali)'. Berapa kali pintu dibuka-tutup?",
    "visualType": "shapes",
    "visualItem": "🔁",
    "operandA": 0,
    "operator": "=",
    "correctAnswer": 2,
    "timerSeconds": 25,
    "optionsText": [
      "2 kali",
      "4 kali",
      "1 kali"
    ],
    "explanation": "Jawaban pilihan [2] adalah yang paling tepat!"
  },
  {
    "id": "q_coding_bb",
    "category": "coding_pengulangan",
    "title": "Siti memindahkan 5 buah apel satu per satu ke dalam keranjang. Kegiatan memindahkan apel dilakukan berulang sebanyak...",
    "visualType": "shapes",
    "visualItem": "🔁",
    "operandA": 0,
    "operator": "=",
    "correctAnswer": 2,
    "timerSeconds": 25,
    "optionsText": [
      "1 kali saja",
      "5 kali",
      "100 kali"
    ],
    "explanation": "Jawaban pilihan [2] adalah yang paling tepat!"
  },
  {
    "id": "q_coding_bc",
    "category": "coding_pengulangan",
    "title": "Jika ada perintah 'Putar badan 2 kali', gerakan yang dilakukan adalah...",
    "visualType": "shapes",
    "visualItem": "🔁",
    "operandA": 0,
    "operator": "=",
    "correctAnswer": 1,
    "timerSeconds": 25,
    "optionsText": [
      "Berputar 2 kali",
      "Berlari 2 meter",
      "Duduk 2 jam"
    ],
    "explanation": "Jawaban pilihan [1] adalah yang paling tepat!"
  },
  {
    "id": "q_coding_bd",
    "category": "coding_pengulangan",
    "title": "Lagu 'Lingkaran Kecil': 'Bikin lingkaran kecil, bikin lingkaran kecil (ulangi terus)'. Konsep ini dinamakan...",
    "visualType": "shapes",
    "visualItem": "🔁",
    "operandA": 0,
    "operator": "=",
    "correctAnswer": 1,
    "timerSeconds": 25,
    "optionsText": [
      "Pengulangan (Looping)",
      "Mencuci tangan",
      "Mewarnai"
    ],
    "explanation": "Jawaban pilihan [1] adalah yang paling tepat!"
  },
  {
    "id": "q_coding_be",
    "category": "coding_pengulangan",
    "title": "Ibu meminta Tono memasukkan 3 sendok gula ke cangkir. Tono harus mengulang gerakan mengambil gula sebanyak...",
    "visualType": "shapes",
    "visualItem": "🔁",
    "operandA": 0,
    "operator": "=",
    "correctAnswer": 2,
    "timerSeconds": 25,
    "optionsText": [
      "1 kali",
      "3 kali",
      "5 kali"
    ],
    "explanation": "Jawaban pilihan [2] adalah yang paling tepat!"
  },
  {
    "id": "q_coding_bf",
    "category": "coding_pengulangan",
    "title": "Langkah menaruh balok: 'Ambil 1 balok, tumpuk di atas. Ulangi sampai ada 4 balok'. Berapa total balok yang tertumpuk?",
    "visualType": "shapes",
    "visualItem": "🔁",
    "operandA": 0,
    "operator": "=",
    "correctAnswer": 2,
    "timerSeconds": 25,
    "optionsText": [
      "2 balok",
      "4 balok",
      "10 balok"
    ],
    "explanation": "Jawaban pilihan [2] adalah yang paling tepat!"
  },
  {
    "id": "q_coding_bg",
    "category": "coding_pengulangan",
    "title": "Perintah dansa: 'Goyangkan pinggul ke kiri dan kanan (ulangi 3 kali)'. Apa yang diulangi?",
    "visualType": "shapes",
    "visualItem": "🔁",
    "operandA": 0,
    "operator": "=",
    "correctAnswer": 1,
    "timerSeconds": 25,
    "optionsText": [
      "Gerakan menggoyangkan pinggul",
      "Mata berkedip",
      "Makan nasi"
    ],
    "explanation": "Jawaban pilihan [1] adalah yang paling tepat!"
  },
  {
    "id": "q_coding_bh",
    "category": "coding_pengulangan",
    "title": "Tini mengayuh sepeda dari rumah ke taman. Kaki Tini mengayuh pedal secara...",
    "visualType": "shapes",
    "visualItem": "🔁",
    "operandA": 0,
    "operator": "=",
    "correctAnswer": 1,
    "timerSeconds": 25,
    "optionsText": [
      "Berulang-ulang sampai tiba",
      "Cuma 1 kali lalu berhenti",
      "Tidak pernah mengayuh"
    ],
    "explanation": "Jawaban pilihan [1] adalah yang paling tepat!"
  },
  {
    "id": "q_coding_bi",
    "category": "coding_klasifikasi",
    "title": "Di meja ada buah dan mainan. Kelompokkan mana yang termasuk BUAH:",
    "visualType": "shapes",
    "visualItem": "🗂️",
    "operandA": 0,
    "operator": "=",
    "correctAnswer": 1,
    "timerSeconds": 25,
    "optionsText": [
      "Apel, Pisang, Jeruk",
      "Mobil-mobilan, Boneka, Bola",
      "Pensil, Penghapus, Penggaris"
    ],
    "explanation": "Jawaban pilihan [1] adalah yang paling tepat!"
  },
  {
    "id": "q_coding_bj",
    "category": "coding_klasifikasi",
    "title": "Manakah kelompok benda yang berwarna MERAH?",
    "visualType": "shapes",
    "visualItem": "🗂️",
    "operandA": 0,
    "operator": "=",
    "correctAnswer": 2,
    "timerSeconds": 25,
    "optionsText": [
      "Daun rumput, Pohon, Melon",
      "Stroberi, Cabai matang, Tomat matang",
      "Awan, Garam, Susu murni"
    ],
    "explanation": "Jawaban pilihan [2] adalah yang paling tepat!"
  },
  {
    "id": "q_coding_bk",
    "category": "coding_klasifikasi",
    "title": "Bantu Robot memilah benda yang berbentuk LINGKARAN:",
    "visualType": "shapes",
    "visualItem": "🗂️",
    "operandA": 0,
    "operator": "=",
    "correctAnswer": 2,
    "timerSeconds": 25,
    "optionsText": [
      "Buku cerita, Kotak pensil, Pintu",
      "Uang koin, Roda sepeda, Piring bulat",
      "Atap rumah, Penggaris segitiga, Potongan pizza"
    ],
    "explanation": "Jawaban pilihan [2] adalah yang paling tepat!"
  },
  {
    "id": "q_coding_bl",
    "category": "coding_klasifikasi",
    "title": "Kelompokkan hewan yang bisa TERBANG di udara:",
    "visualType": "shapes",
    "visualItem": "🗂️",
    "operandA": 0,
    "operator": "=",
    "correctAnswer": 1,
    "timerSeconds": 25,
    "optionsText": [
      "Burung, Kupu-kupu, Lebah",
      "Ikan, Kepiting, Udang",
      "Kucing, Anjing, Sapi"
    ],
    "explanation": "Jawaban pilihan [1] adalah yang paling tepat!"
  },
  {
    "id": "q_coding_bm",
    "category": "coding_klasifikasi",
    "title": "Manakah benda yang bertekstur HALUS dan LEMBUT?",
    "visualType": "shapes",
    "visualItem": "🗂️",
    "operandA": 0,
    "operator": "=",
    "correctAnswer": 2,
    "timerSeconds": 25,
    "optionsText": [
      "Batu jalanan",
      "Boneka bulu halus",
      "Batang pohon"
    ],
    "explanation": "Jawaban pilihan [2] adalah yang paling tepat!"
  },
  {
    "id": "q_coding_bn",
    "category": "coding_algoritma",
    "title": "Langkah-langkah mewarnai gambar dengan rapi adalah...",
    "visualType": "shapes",
    "visualItem": "📋",
    "operandA": 0,
    "operator": "=",
    "correctAnswer": 1,
    "timerSeconds": 25,
    "optionsText": [
      "Pilih warna krayon → Mewarnai di dalam garis → Simpan kembali krayon",
      "Coret-coret tembok → Buang krayon → Ambil gambar",
      "Mewarnai luar garis → Patahkan krayon → Simpan"
    ],
    "explanation": "Jawaban pilihan [1] adalah yang paling tepat!"
  },
  {
    "id": "q_coding_bo",
    "category": "coding_algoritma",
    "title": "Urutan membuat jus buah yang benar adalah...",
    "visualType": "shapes",
    "visualItem": "📋",
    "operandA": 0,
    "operator": "=",
    "correctAnswer": 1,
    "timerSeconds": 25,
    "optionsText": [
      "Kupas & potong buah → Masukkan blender & air → Nyalakan blender",
      "Minum jus → Nyalakan blender → Kupas buah",
      "Nyalakan blender → Minum jus → Potong buah"
    ],
    "explanation": "Jawaban pilihan [1] adalah yang paling tepat!"
  },
  {
    "id": "q_coding_bp",
    "category": "coding_algoritma",
    "title": "Urutan menyeberang jalan raya yang aman adalah...",
    "visualType": "shapes",
    "visualItem": "📋",
    "operandA": 0,
    "operator": "=",
    "correctAnswer": 2,
    "timerSeconds": 25,
    "optionsText": [
      "Langsung lari tanpa melihat → Tengok kanan kiri → Tengok lagi",
      "Berdiri di pinggir → Tengok kanan dan kiri → Jalan menyeberang saat aman",
      "Mata dipejamkan → Berlari cepat → Berhenti di tengah jalan"
    ],
    "explanation": "Jawaban pilihan [2] adalah yang paling tepat!"
  },
  {
    "id": "q_coding_bq",
    "category": "coding_pola",
    "title": "Perhatikan pola bentuk: 🔺 Segitiga - 🟩 Persegi - 🔺 Segitiga - 🟩 Persegi - [...]. Bentuk selanjutnya adalah?",
    "visualType": "shapes",
    "visualItem": "🎨",
    "operandA": 0,
    "operator": "=",
    "correctAnswer": 1,
    "timerSeconds": 25,
    "optionsText": [
      "🔺 Segitiga",
      "🟩 Persegi",
      "⚪ Lingkaran"
    ],
    "explanation": "Jawaban pilihan [1] adalah yang paling tepat!"
  },
  {
    "id": "q_coding_br",
    "category": "coding_pola",
    "title": "Perhatikan pola suara hewan: 'Mbeee' - 'Guk guk' - 'Mbeee' - 'Guk guk' - [...]. Suara berikutnya adalah?",
    "visualType": "shapes",
    "visualItem": "🎨",
    "operandA": 0,
    "operator": "=",
    "correctAnswer": 1,
    "timerSeconds": 25,
    "optionsText": [
      "'Mbeee' (Kambing)",
      "'Guk guk' (Anjing)",
      "'Meong' (Kucing)"
    ],
    "explanation": "Jawaban pilihan [1] adalah yang paling tepat!"
  },
  {
    "id": "q_coding_bs",
    "category": "coding_pola",
    "title": "Perhatikan pola ukuran: Short (Pendek) - Tall (Tinggi) - Short - Tall - [...]. Selanjutnya adalah?",
    "visualType": "shapes",
    "visualItem": "🎨",
    "operandA": 0,
    "operator": "=",
    "correctAnswer": 1,
    "timerSeconds": 25,
    "optionsText": [
      "Short (Pendek)",
      "Tall (Tinggi)",
      "Sangat Tinggi"
    ],
    "explanation": "Jawaban pilihan [1] adalah yang paling tepat!"
  },
  {
    "id": "q_coding_bt",
    "category": "coding_pola",
    "title": "Perhatikan pola emoji: 🌞 Matahari - 🌙 Bulan - 🌞 Matahari - 🌙 Bulan - [...]. Gambar selanjutnya adalah?",
    "visualType": "shapes",
    "visualItem": "🎨",
    "operandA": 0,
    "operator": "=",
    "correctAnswer": 1,
    "timerSeconds": 25,
    "optionsText": [
      "🌞 Matahari",
      "🌙 Bulan",
      "⭐ Bintang"
    ],
    "explanation": "Jawaban pilihan [1] adalah yang paling tepat!"
  },
  {
    "id": "q_coding_bu",
    "category": "coding_navigasi",
    "title": "Semut berjalan 1 langkah ke depan, lalu 1 langkah ke kanan. Ke mana semut bergerak terakhir?",
    "visualType": "shapes",
    "visualItem": "🧭",
    "operandA": 0,
    "operator": "=",
    "correctAnswer": 2,
    "timerSeconds": 25,
    "optionsText": [
      "Ke depan",
      "Ke kanan",
      "Ke belakang"
    ],
    "explanation": "Jawaban pilihan [2] adalah yang paling tepat!"
  },
  {
    "id": "q_coding_bv",
    "category": "coding_navigasi",
    "title": "Robot ada di titik A. Untuk ke titik B yang ada di depan, Robot harus bergerak...",
    "visualType": "shapes",
    "visualItem": "🧭",
    "operandA": 0,
    "operator": "=",
    "correctAnswer": 1,
    "timerSeconds": 25,
    "optionsText": [
      "Maju lurus",
      "Putar balik",
      "Duduk manis"
    ],
    "explanation": "Jawaban pilihan [1] adalah yang paling tepat!"
  },
  {
    "id": "q_coding_bw",
    "category": "coding_navigasi",
    "title": "Perintah panah (⬅️) menunjukkan gerakan ke arah...",
    "visualType": "shapes",
    "visualItem": "🧭",
    "operandA": 0,
    "operator": "=",
    "correctAnswer": 2,
    "timerSeconds": 25,
    "optionsText": [
      "Kanan",
      "Kiri",
      "Bawah"
    ],
    "explanation": "Jawaban pilihan [2] adalah yang paling tepat!"
  },
  {
    "id": "q_coding_bx",
    "category": "coding_navigasi",
    "title": "Perintah panah (➡️) menunjukkan gerakan ke arah...",
    "visualType": "shapes",
    "visualItem": "🧭",
    "operandA": 0,
    "operator": "=",
    "correctAnswer": 1,
    "timerSeconds": 25,
    "optionsText": [
      "Kanan",
      "Kiri",
      "Atas"
    ],
    "explanation": "Jawaban pilihan [1] adalah yang paling tepat!"
  },
  {
    "id": "q_coding_by",
    "category": "coding_kondisional",
    "title": "JIKA kita rajin menggosok gigi, MAKA gigi kita akan...",
    "visualType": "shapes",
    "visualItem": "💡",
    "operandA": 0,
    "operator": "=",
    "correctAnswer": 1,
    "timerSeconds": 25,
    "optionsText": [
      "Sehat dan bersih",
      "Berlubang dan sakit",
      "Patah semua"
    ],
    "explanation": "Jawaban pilihan [1] adalah yang paling tepat!"
  },
  {
    "id": "q_coding_bz",
    "category": "coding_kondisional",
    "title": "JIKA balon ditiup terlalu besar terus-menerus, MAKA balon akan...",
    "visualType": "shapes",
    "visualItem": "💡",
    "operandA": 0,
    "operator": "=",
    "correctAnswer": 1,
    "timerSeconds": 25,
    "optionsText": [
      "Meletus 'POP!'",
      "Mengecil sendiri",
      "Berubah jadi batu"
    ],
    "explanation": "Jawaban pilihan [1] adalah yang paling tepat!"
  },
  {
    "id": "q_coding_ca",
    "category": "coding_kondisional",
    "title": "JIKA baju terkena tumpahan cokelat, MAKA baju menjadi...",
    "visualType": "shapes",
    "visualItem": "💡",
    "operandA": 0,
    "operator": "=",
    "correctAnswer": 1,
    "timerSeconds": 25,
    "optionsText": [
      "Kotor dan berbercak",
      "Harum bunga",
      "Makin baru"
    ],
    "explanation": "Jawaban pilihan [1] adalah yang paling tepat!"
  },
  {
    "id": "q_coding_cb",
    "category": "coding_kondisional",
    "title": "JIKA tanaman rajin disiram dan diberi sinar matahari, MAKA tanaman akan...",
    "visualType": "shapes",
    "visualItem": "💡",
    "operandA": 0,
    "operator": "=",
    "correctAnswer": 1,
    "timerSeconds": 25,
    "optionsText": [
      "Tumbuh subur dan segar",
      "Mati dan kering",
      "Hilang sendiri"
    ],
    "explanation": "Jawaban pilihan [1] adalah yang paling tepat!"
  },
  {
    "id": "q_coding_cc",
    "category": "coding_debugging",
    "title": "Siti memakai baju hangat tebal saat udara di pantai sangat panas terik. Pakaian Siti...",
    "visualType": "shapes",
    "visualItem": "🐞",
    "operandA": 0,
    "operator": "=",
    "correctAnswer": 2,
    "timerSeconds": 25,
    "optionsText": [
      "Sudah sangat cocok",
      "Kurang tepat/salah kostum",
      "Sangat keren untuk berenang"
    ],
    "explanation": "Jawaban pilihan [2] adalah yang paling tepat!"
  },
  {
    "id": "q_coding_cd",
    "category": "coding_debugging",
    "title": "Robot berjalan lalu menabrak kursi karena tidak melihat ke depan. Apa yang harus diperbaiki dari Robot?",
    "visualType": "shapes",
    "visualItem": "🐞",
    "operandA": 0,
    "operator": "=",
    "correctAnswer": 1,
    "timerSeconds": 25,
    "optionsText": [
      "Tambahkan sensor/mata untuk melihat halangan",
      "Beri robot makanan",
      "Mengecat baju robot"
    ],
    "explanation": "Jawaban pilihan [1] adalah yang paling tepat!"
  },
  {
    "id": "q_coding_ce",
    "category": "coding_debugging",
    "title": "Perintah mewarnai laut: 'Warnai air laut dengan krayon warna MERAH TUA'. Agar gambar laut terlihat normal, warna krayon yang benar adalah...",
    "visualType": "shapes",
    "visualItem": "🐞",
    "operandA": 0,
    "operator": "=",
    "correctAnswer": 1,
    "timerSeconds": 25,
    "optionsText": [
      "Biru",
      "Kuning",
      "Hitam"
    ],
    "explanation": "Jawaban pilihan [1] adalah yang paling tepat!"
  },
  {
    "id": "q_coding_cf",
    "category": "coding_pengulangan",
    "title": "GURU berkata: 'Tepuk paha 2 kali (ulangi 2 kali)'. Berapa total tepuk paha?",
    "visualType": "shapes",
    "visualItem": "🔁",
    "operandA": 0,
    "operator": "=",
    "correctAnswer": 2,
    "timerSeconds": 25,
    "optionsText": [
      "2 kali",
      "4 kali",
      "10 kali"
    ],
    "explanation": "Jawaban pilihan [2] adalah yang paling tepat!"
  },
  {
    "id": "q_coding_cg",
    "category": "coding_pengulangan",
    "title": "Burung mengepakkan sayapnya terus-menerus agar tetap terbang. Gerakan mengepakkan sayap adalah bentuk...",
    "visualType": "shapes",
    "visualItem": "🔁",
    "operandA": 0,
    "operator": "=",
    "correctAnswer": 1,
    "timerSeconds": 25,
    "optionsText": [
      "Pengulangan (Looping)",
      "Mencuci piring",
      "Menulis angka"
    ],
    "explanation": "Jawaban pilihan [1] adalah yang paling tepat!"
  },
  {
    "id": "q_coding_ch",
    "category": "coding_klasifikasi",
    "title": "Bantu Robot mengelompokkan benda-benda yang terasa PANAS:",
    "visualType": "shapes",
    "visualItem": "🗂️",
    "operandA": 0,
    "operator": "=",
    "correctAnswer": 1,
    "timerSeconds": 25,
    "optionsText": [
      "Api unggun, Air mendidih, Sup hangat",
      "Es krim, Es batu, Air dingin",
      "Mainan plastik, Kertas, Pensil"
    ],
    "explanation": "Jawaban pilihan [1] adalah yang paling tepat!"
  },
  {
    "id": "q_coding_ci",
    "category": "coding_klasifikasi",
    "title": "Kelompokkan benda-benda yang bisa DILIPAT:",
    "visualType": "shapes",
    "visualItem": "🗂️",
    "operandA": 0,
    "operator": "=",
    "correctAnswer": 1,
    "timerSeconds": 25,
    "optionsText": [
      "Baju, Celana, Handuk",
      "Sendok, Garpu, Piring kaca",
      "Batu, Kayu, Besi"
    ],
    "explanation": "Jawaban pilihan [1] adalah yang paling tepat!"
  },
  {
    "id": "q_coding_cj",
    "category": "coding_klasifikasi",
    "title": "Pilih kelompok kendaraan yang berjalan di AIR / LAUT:",
    "visualType": "shapes",
    "visualItem": "🗂️",
    "operandA": 0,
    "operator": "=",
    "correctAnswer": 1,
    "timerSeconds": 25,
    "optionsText": [
      "Kapal laut, Perahu, Perahu karet",
      "Mobil, Sepeda motor, Bus",
      "Pesawat terbang, Helikopter, Balon udara"
    ],
    "explanation": "Jawaban pilihan [1] adalah yang paling tepat!"
  },
  {
    "id": "q_coding_ck",
    "category": "coding_algoritma",
    "title": "Urutan memakai kaos kaki dan sepatu yang benar:",
    "visualType": "shapes",
    "visualItem": "📋",
    "operandA": 0,
    "operator": "=",
    "correctAnswer": 1,
    "timerSeconds": 25,
    "optionsText": [
      "Kaus kaki kanan & kiri → Sepatu kanan & kiri → Ikat tali",
      "Sepatu dulu → Baru kaus kaki di luar sepatu → Lepas sepatu",
      "Ikat tali → Kaus kaki → Sepatu"
    ],
    "explanation": "Jawaban pilihan [1] adalah yang paling tepat!"
  },
  {
    "id": "q_coding_cl",
    "category": "coding_algoritma",
    "title": "Langkah-langkah membuang sampah yang benar:",
    "visualType": "shapes",
    "visualItem": "📋",
    "operandA": 0,
    "operator": "=",
    "correctAnswer": 1,
    "timerSeconds": 25,
    "optionsText": [
      "Lihat sampah di lantai → Ambil sampah → Masukkan ke tempat sampah",
      "Buang sampah di jalan → Biarkan saja → Sapu",
      "Ambil tempat sampah → Lempar ke atap → Makan"
    ],
    "explanation": "Jawaban pilihan [1] adalah yang paling tepat!"
  },
  {
    "id": "q_coding_cm",
    "category": "coding_pola",
    "title": "Perhatikan pola: 1 Bintang ⭐ - 2 Bintang ⭐⭐ - 1 Bintang ⭐ - 2 Bintang ⭐⭐ - [...]. Selanjutnya berapa bintang?",
    "visualType": "shapes",
    "visualItem": "🎨",
    "operandA": 0,
    "operator": "=",
    "correctAnswer": 1,
    "timerSeconds": 25,
    "optionsText": [
      "1 Bintang ⭐",
      "2 Bintang ⭐⭐",
      "3 Bintang ⭐⭐⭐"
    ],
    "explanation": "Jawaban pilihan [1] adalah yang paling tepat!"
  },
  {
    "id": "q_coding_cn",
    "category": "coding_pola",
    "title": "Perhatikan pola: Besar - Besar - Kecil - Besar - Besar - [...]. Selanjutnya ukuran apa?",
    "visualType": "shapes",
    "visualItem": "🎨",
    "operandA": 0,
    "operator": "=",
    "correctAnswer": 2,
    "timerSeconds": 25,
    "optionsText": [
      "Sedang",
      "Kecil",
      "Besar"
    ],
    "explanation": "Jawaban pilihan [2] adalah yang paling tepat!"
  },
  {
    "id": "q_coding_co",
    "category": "coding_navigasi",
    "title": "Jika kamu berdiri menghadap ke Utara, lalu kamu berputar penuh ke belakang, kamu sekarang menghadap ke...",
    "visualType": "shapes",
    "visualItem": "🧭",
    "operandA": 0,
    "operator": "=",
    "correctAnswer": 2,
    "timerSeconds": 25,
    "optionsText": [
      "Depan",
      "Belakang / Selatan",
      "Atas langit"
    ],
    "explanation": "Jawaban pilihan [2] adalah yang paling tepat!"
  },
  {
    "id": "q_coding_cp",
    "category": "coding_kondisional",
    "title": "JIKA mainan dirapikan kembali ke kotaknya setelah bermain, MAKA rumah akan...",
    "visualType": "shapes",
    "visualItem": "💡",
    "operandA": 0,
    "operator": "=",
    "correctAnswer": 1,
    "timerSeconds": 25,
    "optionsText": [
      "Rapi dan bersih",
      "Sangat berantakan",
      "Banyak debu"
    ],
    "explanation": "Jawaban pilihan [1] adalah yang paling tepat!"
  },
  {
    "id": "q_coding_cq",
    "category": "coding_debugging",
    "title": "Urutan membuat es jus: (1) Potong buah (2) Masukkan batu bata (3) Nyalakan blender. Mana bahan yang salah?",
    "visualType": "shapes",
    "visualItem": "🐞",
    "operandA": 0,
    "operator": "=",
    "correctAnswer": 2,
    "timerSeconds": 25,
    "optionsText": [
      "Buah",
      "Batu bata",
      "Air"
    ],
    "explanation": "Jawaban pilihan [2] adalah yang paling tepat!"
  },
  {
    "id": "q_coding_cr",
    "category": "coding_pengulangan",
    "title": "Lagu 'Naik-Naik ke Puncak Gunung': 'Kiri kanan kulehat saja, banyak pohon cemara'. Mengulang lirik lagu disebut...",
    "visualType": "shapes",
    "visualItem": "🔁",
    "operandA": 0,
    "operator": "=",
    "correctAnswer": 1,
    "timerSeconds": 25,
    "optionsText": [
      "Pengulangan (Looping)",
      "Melompat",
      "Tidur"
    ],
    "explanation": "Jawaban pilihan [1] adalah yang paling tepat!"
  },
  {
    "id": "q_coding_cs",
    "category": "coding_klasifikasi",
    "title": "Kelompokkan hewan yang hidup di AIR:",
    "visualType": "shapes",
    "visualItem": "🗂️",
    "operandA": 0,
    "operator": "=",
    "correctAnswer": 1,
    "timerSeconds": 25,
    "optionsText": [
      "Ikan mas, Lumba-lumba, Cumi-cumi",
      "Kelinci, Burung hantu, Kucing",
      "Sapi, Kambing, Ayam"
    ],
    "explanation": "Jawaban pilihan [1] adalah yang paling tepat!"
  },
  {
    "id": "q_coding_ct",
    "category": "coding_algoritma",
    "title": "Urutan membuka pintu rumah yang terkunci:",
    "visualType": "shapes",
    "visualItem": "📋",
    "operandA": 0,
    "operator": "=",
    "correctAnswer": 1,
    "timerSeconds": 25,
    "optionsText": [
      "Masukkan kunci → Putar kunci → Tarik gagang pintu",
      "Tarik gagang pintu → Buang kunci → Pukul pintu",
      "Putar gagang → Lepas pintu → Masukkan kunci"
    ],
    "explanation": "Jawaban pilihan [1] adalah yang paling tepat!"
  },
  {
    "id": "q_coding_cu",
    "category": "coding_pola",
    "title": "Pola nada suara: Tinggi - Rendah - Tinggi - Rendah - [...]. Nada berikutnya adalah?",
    "visualType": "shapes",
    "visualItem": "🎨",
    "operandA": 0,
    "operator": "=",
    "correctAnswer": 1,
    "timerSeconds": 25,
    "optionsText": [
      "Tinggi",
      "Rendah",
      "Sangat Rendah"
    ],
    "explanation": "Jawaban pilihan [1] adalah yang paling tepat!"
  },
  {
    "id": "q_coding_cv",
    "category": "coding_kondisional",
    "title": "JIKA adik bayi menangis karena haus, MAKA ibu akan memberi...",
    "visualType": "shapes",
    "visualItem": "💡",
    "operandA": 0,
    "operator": "=",
    "correctAnswer": 1,
    "timerSeconds": 25,
    "optionsText": [
      "Susu",
      "Batu",
      "Mainan rusak"
    ],
    "explanation": "Jawaban pilihan [1] adalah yang paling tepat!"
  }
];
