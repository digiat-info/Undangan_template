export type AdatRegion = 'jawa' | 'minang' | 'bali' | 'sunda' | 'batak' | 'bugis';

export interface ProcessionItem {
  id: string;
  stage: string;
  title: string;
  time: string;
  date: string;
  venue: string;
  address: string;
  philosophy: string;
}

export interface LoveStoryItem {
  year: string;
  title: string;
  narrative: string;
}

export interface GuestWish {
  id: string;
  name: string;
  relation: string;
  attendance: 'Hadir' | 'Berhalangan';
  guestsCount: number;
  message: string;
  timestamp: string;
  adatTag: string;
  isNew?: boolean;
}

export interface AdatSuite {
  id: AdatRegion;
  code: string;
  regionLabel: string;
  suiteName: string;
  subtitle: string;
  price: string;
  priceNumeric: number;
  editionTag: string;
  greeting: string;
  openingHonorific: string;
  proverbNative: string;
  proverbTranslation: string;
  musicTrack: {
    title: string;
    ensemble: string;
    scaleName: string;
    bpm: number;
    notesHz: number[];
    droneHz: number;
    timbre: 'gamelan' | 'talempong' | 'rindik' | 'kacapi' | 'hasapi' | 'kecapi_bugis';
  };
  couple: {
    groomShort: string;
    groomFull: string;
    groomParents: string;
    brideShort: string;
    brideFull: string;
    brideParents: string;
  };
  weddingDateISO: string;
  weddingDateDisplay: string;
  primaryCity: string;
  heroImage: string;
  couplePortraitGroom: string;
  couplePortraitBride: string;
  galleryImages: { url: string; caption: string }[];
  processions: ProcessionItem[];
  loveStory: LoveStoryItem[];
  bankAccounts: {
    bankName: string;
    accountNumber: string;
    accountHolder: string;
  }[];
  shippingAddress: string;
}

export const ADAT_SUITES: AdatSuite[] = [
  {
    id: 'jawa',
    code: 'RJ-01',
    regionLabel: 'ADAT JAWA',
    suiteName: 'Surakarta Royal',
    subtitle: 'Paes Ageng Kasunanan & Sekar Jagad',
    price: 'Rp 680.000',
    priceNumeric: 680000,
    editionTag: 'Koleksi Keraton',
    greeting: 'Assalamu’alaikum Warahmatullahi Wabarakatuh',
    openingHonorific: 'Rahayu Sagung Dumadi · Dengan memohon ridho Gusti Kang Maha Agung',
    proverbNative: '“Witing tresna jalaran saka kulina, nyawiji ing janji suci salawase.”',
    proverbTranslation: 'Cinta kasih bersemi dari ketulusan hati, menyatu dalam ikatan janji suci yang abadi sepanjang masa.',
    musicTrack: {
      title: 'Ladrang Wilujeng',
      ensemble: 'Gamelan Ageng Laras Pelog Barang',
      scaleName: 'Pelog Barang (Surakarta)',
      bpm: 66,
      // Authentic Javanese Pelog Barang approximations in Hz
      notesHz: [293.66, 329.63, 392.00, 440.00, 493.88, 587.33, 659.25],
      droneHz: 146.83,
      timbre: 'gamelan',
    },
    couple: {
      groomShort: 'Bagaskara',
      groomFull: 'R.M. Bagaskara Adinegoro, S.Ars.',
      groomParents: 'Putra pertama Bapak K.R.T. Hendro Adinegoro & Ibu R.Ay. Retno Wulandari',
      brideShort: 'Sekar Arum',
      brideFull: 'R.R. Sekar Arum Kusumawardhani, M.Ds.',
      brideParents: 'Putri kedua Bapak Drs. Bambang Kusumawardhana & Ibu Sri Maharani',
    },
    weddingDateISO: '2026-11-28T08:00:00+07:00',
    weddingDateDisplay: 'Sabtu Wage, 28 November 2026',
    primaryCity: 'Surakarta, Jawa Tengah',
    heroImage: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=85',
    couplePortraitGroom: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    couplePortraitBride: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      {
        url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80',
        caption: 'Sesi Pranikah di Pendopo Agung Surakarta',
      },
      {
        url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=80',
        caption: 'Kain Batik Tulis Sido Mukti Warisan Keluarga',
      },
      {
        url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=900&q=80',
        caption: 'Rangkaian Melati Keraton & Cincin Kawin',
      },
    ],
    processions: [
      {
        id: 'siraman',
        stage: 'BABAK I · SIRAMAN & MIDODARENI',
        title: 'Upacara Siraman & Malam Midodareni',
        time: '09.00 – 20.30 WIB',
        date: 'Jumat Kliwon, 27 November 2026',
        venue: 'Ndalem Kusumawardhani',
        address: 'Jl. Slamet Riyadi No. 214, Kemlayan, Surakarta',
        philosophy: 'Pembersihan jiwa dan raga dengan air tujuh sumber mata air (Tirta Perwitasari), dilanjutkan malam hening menanti turunnya berkah bidadari.',
      },
      {
        id: 'akad',
        stage: 'BABAK II · IJAB QABUL',
        title: 'Prosesi Akad Nikah Suci',
        time: '08.00 – 10.00 WIB',
        date: 'Sabtu Wage, 28 November 2026',
        venue: 'Masjid Agung Surakarta',
        address: 'Jl. Masjid Besar No. 1, Kauman, Pasar Kliwon, Surakarta',
        philosophy: 'Pengucapan janji suci pernikahan di hadapan penghulu, orang tua, dan saksi sebagai ikatan lahir batin yang kokoh.',
      },
      {
        id: 'panggih',
        stage: 'BABAK III · PANGGIH & PAHARGYAN AGENG',
        title: 'Upacara Adat Panggih & Resepsi',
        time: '11.00 – 14.00 WIB',
        date: 'Sabtu Wage, 28 November 2026',
        venue: 'Pendopo Agung Royal Heritage Solo',
        address: 'Jl. Brigjen Slamet Riyadi No. 6, Surakarta',
        philosophy: 'Balangan gantal, ngidak tigan, sinduran, hingga kacar-kucur yang melambangkan kesetiaan, pengabdian, dan kemakmuran rumah tangga.',
      },
    ],
    loveStory: [
      {
        year: '2022',
        title: 'Pertemuan Pertama di Pameran Arsip Batik',
        narrative: 'Berawal dari diskusi mengenai motif batik Parang Kusumo di Museum Danar Hadi Solo, percakapan sederhana tumbuh menjadi kekaguman.',
      },
      {
        year: '2024',
        title: 'Menapak Jejak Bersama',
        narrative: 'Dua tahun saling mendukung karya dan perjalanan karier di Yogyakarta dan Jakarta, menguatkan keyakinan untuk melangkah lebih jauh.',
      },
      {
        year: '2026',
        title: 'Peningsetan & Lamaran Keluarga',
        narrative: 'Kedua keluarga besar bertemu dalam suasana hangat adat Jawa untuk mengikat janji menuju pelaminan suci.',
      },
    ],
    bankAccounts: [
      {
        bankName: 'Bank Central Asia (BCA)',
        accountNumber: '0154 8892 10',
        accountHolder: 'a.n. Bagaskara Adinegoro',
      },
      {
        bankName: 'Bank Mandiri',
        accountNumber: '1380 0219 4851 2',
        accountHolder: 'a.n. Sekar Arum Kusumawardhani',
      },
    ],
    shippingAddress: 'Ndalem Kusumawardhani, Jl. Slamet Riyadi No. 214, Kemlayan, Serengan, Kota Surakarta 57151',
  },
  {
    id: 'minang',
    code: 'RJ-02',
    regionLabel: 'ADAT MINANG',
    suiteName: 'Suntiang Gadang',
    subtitle: 'Songket Pandai Sikek & Mahkota Koto Gadang',
    price: 'Rp 720.000',
    priceNumeric: 720000,
    editionTag: 'Ranah Minang',
    greeting: 'Assalamu’alaikum Warahmatullahi Wabarakatuh',
    openingHonorific: 'Jo Bismillah kami mulai · Manjapuik Marapulai ka Rumah Gadang',
    proverbNative: '“Bak aur jo tebing, sanda-menyanda kaduonyo; ka bukik samo mandaki, ka lurah samo manurun.”',
    proverbTranslation: 'Bagaikan rumpun bambu dan tebing sungai yang saling menguatkan; ke bukit sama mendaki, ke lembah sama menurun.',
    musicTrack: {
      title: 'Talempong Pacik & Saluang',
      ensemble: 'Ansambel Talempong Minangkabau',
      scaleName: 'Pentatonik Saluang Darek',
      bpm: 84,
      notesHz: [329.63, 369.99, 440.00, 493.88, 554.37, 659.25],
      droneHz: 164.81,
      timbre: 'talempong',
    },
    couple: {
      groomShort: 'Rajo Langik',
      groomFull: 'Sutan Rajo Langik Caniago, S.T.',
      groomParents: 'Putra Bapak H. Anwar Datuk Rajo Penghulu & Ibu Hj. Nurhayati',
      brideShort: 'Andam Dewi',
      brideFull: 'Puti Andam Dewi Koto, S.E., M.B.A.',
      brideParents: 'Putri Bapak Ir. H. Syahrul Koto & Ibu Dra. Hj. Rosmaida',
    },
    weddingDateISO: '2026-12-05T08:30:00+07:00',
    weddingDateDisplay: 'Sabtu, 5 Desember 2026',
    primaryCity: 'Bukittinggi & Padang, Sumatera Barat',
    heroImage: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=85',
    couplePortraitGroom: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    couplePortraitBride: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      {
        url: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=900&q=80',
        caption: 'Kemilau Tenun Songket Pandai Sikek Benang Emas',
      },
      {
        url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80',
        caption: 'Siluet Ngarai Sianok di Pagi Hari',
      },
      {
        url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=900&q=80',
        caption: 'Carano Sirih Pinang Pertanda Restu Ninik Mamak',
      },
    ],
    processions: [
      {
        id: 'bainai',
        stage: 'BABAK I · MALAM BAINAI',
        title: 'Prosesi Malam Bainai Anak Daro',
        time: '19.00 – 21.30 WIB',
        date: 'Jumat, 4 Desember 2026',
        venue: 'Kediaman Keluarga Besar Koto',
        address: 'Jl. Panorama No. 42, Guguk Panjang, Bukittinggi',
        philosophy: 'Pemberian daun inai merah pada ujung jari Anak Daro sebagai tanda kasih sayang terakhir masa lajang dan doa keselamatan.',
      },
      {
        id: 'akad_minang',
        stage: 'BABAK II · AKAD NIKAH',
        title: 'Manjapuik Marapulai & Ijab Qabul',
        time: '08.30 – 10.30 WIB',
        date: 'Sabtu, 5 Desember 2026',
        venue: 'Masjid Raya Sumatera Barat',
        address: 'Jl. Khatib Sulaiman, Alai Parak Kopi, Padang',
        philosophy: 'Penjemputan Marapulai secara adat dengan payung kuning dan carano lengkap menuju pengucapan ijab qabul.',
      },
      {
        id: 'baralek',
        stage: 'BABAK III · BARALEK GADANG',
        title: 'Resepsi Baralek Gadang & Tari Gelombang',
        time: '11.30 – 15.00 WIB',
        date: 'Sabtu, 5 Desember 2026',
        venue: 'Pangeran Beach Convention Hall',
        address: 'Jl. Ir. H. Juanda No. 79, Kota Padang',
        philosophy: 'Perjamuan agung diiringi Tari Piring dan Tari Pasambahan sebagai penghormatan tertinggi kepada seluruh tamu undangan.',
      },
    ],
    loveStory: [
      {
        year: '2021',
        title: 'Perjumpaan di Tanah Rantau',
        narrative: 'Pertemuan tak sengaja dalam acara silaturahmi perantau Minang di Jakarta membuka lembaran cerita kami.',
      },
      {
        year: '2025',
        title: 'Maresek & Batimbang Tando',
        narrative: 'Utusan keluarga datang membawa carano dan menukar tanda mata pusaka sebagai ikatan kesepakatan dua keluarga.',
      },
      {
        year: '2026',
        title: 'Menuju Pelaminan Bagonjong',
        narrative: 'Kini dengan restu Ayah, Bundo Kanduang, serta Ninik Mamak, kami menyatukan langkah dalam Baralek Gadang.',
      },
    ],
    bankAccounts: [
      {
        bankName: 'Bank Nagari / BCA',
        accountNumber: '8820 4419 02',
        accountHolder: 'a.n. Puti Andam Dewi Koto',
      },
      {
        bankName: 'Bank Mandiri',
        accountNumber: '1110 0982 3410 5',
        accountHolder: 'a.n. Sutan Rajo Langik',
      },
    ],
    shippingAddress: 'Jl. Panorama No. 42, Kel. Bukit Cangang Kayu Ramang, Kec. Guguk Panjang, Kota Bukittinggi 26136',
  },
  {
    id: 'bali',
    code: 'RJ-03',
    regionLabel: 'ADAT BALI',
    suiteName: 'Puri Ubud Majapahit',
    subtitle: 'Payas Agung Badung & Ukiran Patra Sari',
    price: 'Rp 750.000',
    priceNumeric: 750000,
    editionTag: 'Edisi Lontar',
    greeting: 'Om Swastiastu',
    openingHonorific: 'Atas Asung Kertha Wara Nugraha Ida Sang Hyang Widhi Wasa',
    proverbNative: '“Grbhnāmi te saubhagatvāya hastam, mayā patyā jaradastir yathāsah.”',
    proverbTranslation: 'Kugenggam tanganmu demi kebahagiaan bersama, semoga kita hidup rukun berdampingan hingga usia senja.',
    musicTrack: {
      title: 'Rindik & Semar Pegulingan',
      ensemble: 'Gamelan Bambu Rindik Ubud',
      scaleName: 'Selisir Lima Nada (Bali)',
      bpm: 76,
      notesHz: [277.18, 311.13, 369.99, 415.30, 493.88, 554.37, 622.25],
      droneHz: 138.59,
      timbre: 'rindik',
    },
    couple: {
      groomShort: 'Gde Mahardika',
      groomFull: 'A.A. Gde Mahardika Putra, S.Ked.',
      groomParents: 'Putra pertama pasangan A.A. Ngurah Rai Suryawan & Jero Puspa Wati',
      brideShort: 'Ratih Prameswari',
      brideFull: 'Cokorda Istri Ratih Prameswari, S.Ars.',
      brideParents: 'Putri bungsu pasangan Cokorda Gde Agung Sukawati & Anak Agung Istri Dewi',
    },
    weddingDateISO: '2026-12-12T09:00:00+08:00',
    weddingDateDisplay: 'Sabtu, 12 Desember 2026',
    primaryCity: 'Ubud, Gianyar — Bali',
    heroImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=85',
    couplePortraitGroom: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
    couplePortraitBride: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      {
        url: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=80',
        caption: 'Pelataran Candi Bentar Puri Agung saat Senja',
      },
      {
        url: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=900&q=80',
        caption: 'Mahkota Petitis Emas & Kain Songket Beratan',
      },
      {
        url: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=900&q=80',
        caption: 'Janur Penjor Agung & Bunga Jepun Bali',
      },
    ],
    processions: [
      {
        id: 'ngekeb',
        stage: 'BABAK I · NGEKEB & NGUNGKAB LAWANG',
        title: 'Upacara Ngekeb & Penjemputan Mempelai',
        time: '08.00 – 10.00 WITA',
        date: 'Jumat, 11 Desember 2026',
        venue: 'Puri Saren Kauh Ubud',
        address: 'Jl. Raya Ubud No. 18, Gianyar, Bali',
        philosophy: 'Lulur bunga kenanga dan doa restu sebelum mempelai pria mengetuk pintu kamar pengantin wanita tiga kali.',
      },
      {
        id: 'pawiwahan',
        stage: 'BABAK II · PAWIWAHAN SUCI',
        title: 'Upacara الميدان Mekala-kalaan & Widhi Widhana',
        time: '09.00 – 12.00 WITA',
        date: 'Sabtu, 12 Desember 2026',
        venue: 'Pemerajan Agung Puri Ubud',
        address: 'Jl. Suweta No. 8, Ubud, Gianyar, Bali',
        philosophy: 'Penyucian saksi Tri Hita Karana di hadapan Ida Pedanda, mengikat benang Tridatu sebagai lambang kesatuan Grhasta Asrama.',
      },
      {
        id: 'resepsi_bali',
        stage: 'BABAK III · DHARMA SUAKA & RESEPSI',
        title: 'Jamuan Petang di Taman Puri',
        time: '17.00 – 21.00 WITA',
        date: 'Sabtu, 12 Desember 2026',
        venue: 'Taman Dedari Royal Courtyard',
        address: 'Kedewatan, Ubud, Kabupaten Gianyar, Bali',
        philosophy: 'Perayaan hangat di bawah teduhnya pepohonan kamboja dan alunan rindik bambu menyambut sanak keluarga.',
      },
    ],
    loveStory: [
      {
        year: '2021',
        title: 'Senja di Campuhan Ubud',
        narrative: 'Pertemuan saat kegiatan konservasi arsitektur tradisional Bali mempertemukan visi dan hati kami.',
      },
      {
        year: '2025',
        title: 'Memadik (Pinangan Adat)',
        narrative: 'Keluarga Puri datang membawa canang sari dan kata hati yang tulus untuk meminang di hadapan leluhur.',
      },
      {
        year: '2026',
        title: 'Pawiwahan Agung',
        narrative: 'Melangkah memasuki masa Grhasta dengan doa semesta alam Bali.',
      },
    ],
    bankAccounts: [
      {
        bankName: 'Bank Central Asia (BCA)',
        accountNumber: '7725 1904 88',
        accountHolder: 'a.n. A.A. Gde Mahardika Putra',
      },
    ],
    shippingAddress: 'Puri Saren Kauh, Jl. Raya Ubud No. 18, Kec. Ubud, Kabupaten Gianyar, Bali 80571',
  },
  {
    id: 'sunda',
    code: 'RJ-04',
    regionLabel: 'ADAT SUNDA',
    suiteName: 'Siger Priangan',
    subtitle: 'Mahkota Siger Kencana & Melati Mangle',
    price: 'Rp 640.000',
    priceNumeric: 640000,
    editionTag: 'Tatar Pasundan',
    greeting: 'Sampurasun · Assalamu’alaikum Wr. Wb.',
    openingHonorific: 'Kalayan nyebat asma Allah Nu Maha Welas tur Maha Asih',
    proverbNative: '“Silih asah, silih asih, silih asuh; ka cai jadi saleuwi, ka darat jadi salogak.”',
    proverbTranslation: 'Saling mencerdaskan, saling mengasihi, dan saling menjaga; seia sekata dalam setiap langkah kehidupan.',
    musicTrack: {
      title: 'Kacapi Suling Parahyangan',
      ensemble: 'Degung Klasik Pasundan',
      scaleName: 'Laras Degung (1-2-3-4-5)',
      bpm: 64,
      notesHz: [261.63, 293.66, 329.63, 392.00, 493.88, 523.25, 587.33],
      droneHz: 130.81,
      timbre: 'kacapi',
    },
    couple: {
      groomShort: 'Raka Pradipta',
      groomFull: 'Raka Pradipta Natakusumah, S.H.',
      groomParents: 'Putra Bapak Drs. H. Deden Natakusumah & Ibu Hj. Lilis Suryani',
      brideShort: 'Nenden Kirana',
      brideFull: 'Nenden Kirana Permatasari, S.Psi.',
      brideParents: 'Putri Bapak Ir. H. Asep Permana & Ibu Hj. Euis Kartika',
    },
    weddingDateISO: '2026-11-22T08:00:00+07:00',
    weddingDateDisplay: 'Minggu, 22 November 2026',
    primaryCity: 'Bandung, Jawa Barat',
    heroImage: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=85',
    couplePortraitGroom: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80',
    couplePortraitBride: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      {
        url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=900&q=80',
        caption: 'Ronce Melati Siger Sunda & Kebaya Beludru',
      },
      {
        url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80',
        caption: 'Kabut Pagi di Perkebunan Teh Rancabali',
      },
    ],
    processions: [
      {
        id: 'ngeuyeuk',
        stage: 'BABAK I · NGEUYEUK SEUREUH',
        title: 'Ngeuyeuk Seureuh & Siraman Priangan',
        time: '15.30 – 18.00 WIB',
        date: 'Sabtu, 21 November 2026',
        venue: 'Bumi Sangkuriang Ciumbuleuit',
        address: 'Jl. Kiputih No. 12, Ciumbuleuit, Bandung',
        philosophy: 'Wejangan petuah rumah tangga melalui simbol daun sirih, pinang, dan benang kanteh.',
      },
      {
        id: 'sawer',
        stage: 'BABAK II · AKAD & SAWER PANGANTEN',
        title: 'Ijab Qabul, Sungkeman & Upacara Sawer',
        time: '08.00 – 13.30 WIB',
        date: 'Minggu, 22 November 2026',
        venue: 'Gedung Sate Heritage Hall / Bale Asri Pusdai',
        address: 'Jl. Diponegoro No. 63, Cibeunying Kaler, Bandung',
        philosophy: 'Lantunan kidung sawer berisi doa kemakmuran, nincak endog, dan huap lingkung sebagai tanda kasih sayang.',
      },
    ],
    loveStory: [
      {
        year: '2023',
        title: 'Hujan Sore di Jalan Braga',
        narrative: 'Secangkir kopi hangat di sudut kota Bandung menjadi saksi awal cerita panjang kami berdua.',
      },
      {
        year: '2026',
        title: 'Neundeun Omong & Narosan',
        narrative: 'Silaturahmi kedua keluarga besar mengukuhkan niat suci menuju pelaminan Sunda.',
      },
    ],
    bankAccounts: [
      {
        bankName: 'Bank BJB / BCA',
        accountNumber: '4371 0092 81',
        accountHolder: 'a.n. Raka Pradipta Natakusumah',
      },
    ],
    shippingAddress: 'Jl. Kiputih No. 12, Ciumbuleuit, Kec. Cidadap, Kota Bandung 40142',
  },
  {
    id: 'batak',
    code: 'RJ-05',
    regionLabel: 'ADAT BATAK',
    suiteName: 'Ulos Toba Raja',
    subtitle: 'Ukiran Gorga Simeon & Sortali Emas',
    price: 'Rp 710.000',
    priceNumeric: 710000,
    editionTag: 'Bona Pasogit',
    greeting: 'Horas! Syalom & Salam Sejahtera',
    openingHonorific: 'Tumpak ni Tuhan Debata pardenggan basa i',
    proverbNative: '“Bintang na rumiris, ombun na sumorop; anak pe riris, boru pe torop.”',
    proverbTranslation: 'Bintang bertaburan di langit, embun menyejukkan bumi; kiranya rumah tangga diberkati keturunan dan kebahagiaan berlimpah.',
    musicTrack: {
      title: 'Gondang Hasapi & Garantang',
      ensemble: 'Uning-uningan Toba Klasik',
      scaleName: 'Lima Nada Gondang Toba',
      bpm: 88,
      notesHz: [293.66, 329.63, 392.00, 440.00, 523.25, 587.33],
      droneHz: 146.83,
      timbre: 'hasapi',
    },
    couple: {
      groomShort: 'Togar Sinaga',
      groomFull: 'Togar Parlindungan Sinaga, M.Sc.',
      groomParents: 'Putra Bapak St. Mangatas Sinaga, S.H. & Ibu Rosmawati br. Situmorang',
      brideShort: 'Tiara Tobing',
      brideFull: 'Tiara Bulan br. Lumbantobing, B.A.',
      brideParents: 'Putri Bapak Ir. Poltak Lumbantobing & Ibu Berliana br. Hutapea',
    },
    weddingDateISO: '2026-12-19T09:00:00+07:00',
    weddingDateDisplay: 'Sabtu, 19 Desember 2026',
    primaryCity: 'Balige, Danau Toba & Medan',
    heroImage: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=85',
    couplePortraitGroom: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    couplePortraitBride: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      {
        url: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=900&q=80',
        caption: 'Tenun Ulos Ragidup & Sortali Mahkota Batak',
      },
      {
        url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=900&q=80',
        caption: 'Tepian Kaldera Danau Toba di Pagi Hari',
      },
    ],
    processions: [
      {
        id: 'pamasu',
        stage: 'BABAK I · PAMASU-MASUON',
        title: 'Ibadah Pemberkatan Nikah Kudus',
        time: '09.00 – 11.00 WIB',
        date: 'Sabtu, 19 Desember 2026',
        venue: 'Gereja HKBP Balige / Sudirman',
        address: 'Jl. Gereja No. 14, Balige, Toba',
        philosophy: 'Peneguhan janji pernikahan kudus di hadapan Tuhan dan jemaat gereja.',
      },
      {
        id: 'mangulosi',
        stage: 'BABAK II · PESTA ADAT & MANGULOSI',
        title: 'Pesta Unjuk Dalihan Na Tolu & Tortor',
        time: '12.00 – 17.30 WIB',
        date: 'Sabtu, 19 Desember 2026',
        venue: 'Sopo Godang Raya Convention',
        address: 'Jl. Sisingamangaraja No. 108, Balige',
        philosophy: 'Penyematan Ulos Hela oleh Hula-hula sebagai selimut berkat, kehangatan jiwa, dan restu Dalihan Na Tolu.',
      },
    ],
    loveStory: [
      {
        year: '2022',
        title: 'Pertemuan di Tepian Danau Toba',
        narrative: 'Senyum hangat dan sapaan Horas memulai persahabatan yang tulus.',
      },
      {
        year: '2026',
        title: 'Marhusip & Martumpol',
        narrative: 'Ikrar janji kedua keluarga besar di hadapan penatua adat dan gereja.',
      },
    ],
    bankAccounts: [
      {
        bankName: 'Bank Mandiri',
        accountNumber: '1050 0192 8834 0',
        accountHolder: 'a.n. Togar Parlindungan Sinaga',
      },
    ],
    shippingAddress: 'Jl. Sisingamangaraja No. 108, Balige, Kabupaten Toba, Sumatera Utara 22312',
  },
  {
    id: 'bugis',
    code: 'RJ-06',
    regionLabel: 'ADAT BUGIS',
    suiteName: 'Lontara Makassar',
    subtitle: 'Sutra Lipa Sabbe & Malam Mappacci',
    price: 'Rp 690.000',
    priceNumeric: 690000,
    editionTag: 'Tanah Ugi',
    greeting: 'Tabe’ · Assalamu’alaikum Warahmatullahi Wabarakatuh',
    openingHonorific: 'Mappoji ri Puang Allahu Ta’ala · Tudang Sipulung',
    proverbNative: '“Sipakatau, sipakainge, sipakalebbi ri lalempola.”',
    proverbTranslation: 'Saling memanusiakan, saling mengingatkan dalam kebaikan, dan saling memuliakan di dalam bahtera rumah tangga.',
    musicTrack: {
      title: 'Kecapi Makassar & Gong',
      ensemble: 'Petikan Kecapi Anging Mammiri',
      scaleName: 'Pentatonik Lontara Ugi',
      bpm: 72,
      notesHz: [261.63, 311.13, 349.23, 392.00, 466.16, 523.25],
      droneHz: 130.81,
      timbre: 'kecapi_bugis',
    },
    couple: {
      groomShort: 'Andi Pallawa',
      groomFull: 'Andi Pallawa Gau Petta Lolo, S.IP.',
      groomParents: 'Putra Bapak Dr. H. Andi Mappanyukki & Ibu Hj. Besse Tenriawaru',
      brideShort: 'Andi Tenri',
      brideFull: 'Andi Tenri Pada Daeng Bau, M.M.',
      brideParents: 'Putri Bapak H. Andi Паtettengi, S.E. & Ibu Hj. Andi We Cudai',
    },
    weddingDateISO: '2026-12-26T09:00:00+08:00',
    weddingDateDisplay: 'Sabtu, 26 Desember 2026',
    primaryCity: 'Makassar, Sulawesi Selatan',
    heroImage: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=85',
    couplePortraitGroom: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    couplePortraitBride: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      {
        url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=80',
        caption: 'Kemilau Baju Bodo Sutra & Saloko Pinang Goyang',
      },
      {
        url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=900&q=80',
        caption: 'Daun Pacci di Atas Bantal Sutra Tujuh Lapis',
      },
    ],
    processions: [
      {
        id: 'mappacci',
        stage: 'BABAK I · MALAM MAPPACCI',
        title: 'Upacara Tudang Penni & Mappacci',
        time: '19.30 – 22.00 WITA',
        date: 'Jumat, 25 Desember 2026',
        venue: 'Balla Lompoa Heritage Residence',
        address: 'Jl. Sultan Hasanuddin No. 88, Makassar',
        philosophy: 'Penyucian hati dengan daun pacci di atas sembilan simbol kehidupan (bantal, sarung sutra tujuh lapis, daun pisang, nangka, dan lilin).',
      },
      {
        id: 'mapparola',
        stage: 'BABAK II · AKAD & MAPPASIKARAWA',
        title: 'Akad Nikah & Sentuhan Pertama Mappasikarawa',
        time: '09.00 – 14.00 WITA',
        date: 'Sabtu, 26 Desember 2026',
        venue: 'UpperHills Grand Ballroom Makassar',
        address: 'Jl. Metro Tanjung Bunga, Makassar',
        philosophy: 'Penyatuan kedua mempelai dalam balutan Lipa Sabbe sebagai simbol rezeki yang tak terputus.',
      },
    ],
    loveStory: [
      {
        year: '2023',
        title: 'Senja Pantai Losari',
        narrative: 'Pertemuan penuh kesantunan yang tumbuh menjadi niat tulus membangun keluarga.',
      },
      {
        year: '2026',
        title: 'Mappaenre Doi & Lamaran Adat',
        narrative: 'Utusan keluarga mengantarkan seserahan adat Erang-erang dengan penuh kehormatan.',
      },
    ],
    bankAccounts: [
      {
        bankName: 'Bank Sulselbar / BCA',
        accountNumber: '7890 3312 90',
        accountHolder: 'a.n. Andi Pallawa Gau',
      },
    ],
    shippingAddress: 'Jl. Sultan Hasanuddin No. 88, Kec. Ujung Pandang, Kota Makassar 90111',
  },
];

export const INITIAL_GUEST_WISHES: GuestWish[] = [
  {
    id: 'w-1',
    name: 'K.R.T. Wuryanto Hadiningrat',
    relation: 'Kerabat Keraton Surakarta',
    attendance: 'Hadir',
    guestsCount: 2,
    message: 'Nderek mangayubagya atas pernikahan ananda berdua. Semoga menjadi keluarga sakinah, mawaddah, warahmah, lestari ingkang tresna.',
    timestamp: '12 menit yang lalu',
    adatTag: 'ADAT JAWA',
  },
  {
    id: 'w-2',
    name: 'Datuk Rajo Endah & Keluarga',
    relation: 'Keluarga Besar Bukittinggi',
    attendance: 'Hadir',
    guestsCount: 3,
    message: 'Selamat menempuh hidup baru Anak Daro & Marapulai. Kokoh bak aur jo tebing, diberkahi rezeki dan keturunan yang saleh.',
    timestamp: '38 menit yang lalu',
    adatTag: 'ADAT MINANG',
  },
  {
    id: 'w-3',
    name: 'Tjokorda Gde Kerthyasa',
    relation: 'Sahabat Puri Ubud',
    attendance: 'Hadir',
    guestsCount: 2,
    message: 'Selamat berbahagia dalam ikatan Grhasta Asrama. Dumogi langgeng riwekasan lan rahayu sareng sami.',
    timestamp: '1 jam yang lalu',
    adatTag: 'ADAT BALI',
  },
  {
    id: 'w-4',
    name: 'Dr. Clara Prameswari, M.Arch.',
    relation: 'Rekan Arsitek Jakarta',
    attendance: 'Berhalangan',
    guestsCount: 1,
    message: 'Mohon maaf belum dapat hadir langsung di Surakarta. Doa terbaik kami kirimkan untuk kebahagiaan abadi kalian berdua.',
    timestamp: '3 jam yang lalu',
    adatTag: 'ADAT JAWA',
  },
];
