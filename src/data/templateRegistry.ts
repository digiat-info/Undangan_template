import { TemplateSchema, TemplateId } from '../models/invitation.model';

export const TEMPLATE_REGISTRY: TemplateSchema[] = [
  // =========================================================================
  // 1. JAVANESE ROYAL — Mewah, klasik, keraton
  // =========================================================================
  {
    id: 'javanese-royal',
    code: 'DG-01',
    name: 'Javanese Royal',
    characterTagline: 'Mewah, Klasik, Keraton Surakarta',
    category: 'Adat Klasik',
    cultureOrigin: 'Jawa Tengah & DI Yogyakarta',
    religionContext: 'Islam Keraton / Umum',
    priceDisplay: 'Rp 850.000',
    artDirectionNotes:
      'Terinspirasi dari kemegahan Pendopo Agung Kasunanan Surakarta, batik tulis Soga, dan pahatan emas Gunungan Kayon. Menggunakan bingkai simetris berlapis ganda dengan kontras beludru gelap dan gading.',
    layoutArchetype: 'kraton-pendopo',
    typography: {
      displayFont: "'Cormorant Garamond', Georgia, serif",
      bodyFont: "'Plus Jakarta Sans', sans-serif",
      headingTracking: '0.02em',
      vibeDescription: 'Serif bangsawan klasik dengan aksen italic puitis',
    },
    defaultPalette: {
      id: 'paes-hitam-emas',
      name: 'Malam Midodareni (Velvet Hitam & Emas Keraton)',
      canvas: '#0C0A09',
      surface: '#181512',
      primaryText: '#FAF8F5',
      mutedText: '#A8A29E',
      accent: '#E5B842',
      border: '#2E2722',
      ceremonialDark: '#080605',
    },
    colorPresets: [
      {
        id: 'paes-hitam-emas',
        name: 'Malam Midodareni (Velvet Hitam & Emas)',
        canvas: '#0C0A09',
        surface: '#181512',
        primaryText: '#FAF8F5',
        mutedText: '#A8A29E',
        accent: '#E5B842',
        border: '#2E2722',
        ceremonialDark: '#080605',
      },
      {
        id: 'kraton-gading-putih',
        name: 'Gading Bersih & Emas Keraton',
        canvas: '#FFFFFF',
        surface: '#F8FAFC',
        primaryText: '#0F172A',
        mutedText: '#475569',
        accent: '#B4882C',
        border: '#E2E8F0',
        ceremonialDark: '#0C0A09',
      },
      {
        id: 'velvet-bludru-hijau',
        name: 'Bludru Hijau Kasunanan',
        canvas: '#062318',
        surface: '#0B3324',
        primaryText: '#F0FDF4',
        mutedText: '#86EFAC',
        accent: '#F59E0B',
        border: '#14532D',
        ceremonialDark: '#04160F',
      },
    ],
    musicConfig: {
      title: 'Ladrang Wilujeng',
      ensemble: 'Gamelan Ageng Laras Pelog Barang',
      scaleName: 'Pelog Barang (Surakarta)',
      bpm: 64,
      notesHz: [293.66, 329.63, 392.0, 440.0, 493.88, 587.33, 659.25],
      droneHz: 146.83,
      timbre: 'gamelan',
    },
    greetingHeader: 'Assalamu’alaikum Warahmatullahi Wabarakatuh · Rahayu Sagung Dumadi',
    openingScriptureOrPepatah: {
      quote: '“Witing tresna jalaran saka kulina, nyawiji ing janji suci salawase.”',
      translation:
        'Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan hidup dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya.',
      source: 'Falsafah Jawa & QS. Ar-Rum: 21',
    },
    closingStatement: {
      honorificClosing:
        'Merupakan suatu kehormatan dan kebahagiaan mendalam bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu pada upacara Panggih putra-putri kami.',
      familySignature: 'Keluarga Besar K.R.T. Hendro Adinegoro & Drs. Bambang Kusumawardhana',
    },
    defaultData: {
      groomShort: 'Bagaskara',
      groomFull: 'R.M. Bagaskara Adinegoro, S.Ars.',
      groomParents: 'Putra sulung Bapak K.R.T. Hendro Adinegoro & Ibu R.Ay. Retno Wulandari',
      groomInstagram: '@bagaskara.ars',
      brideShort: 'Sekar Arum',
      brideFull: 'R.R. Sekar Arum Kusumawardhani, M.Ds.',
      brideParents: 'Putri kedua Bapak Drs. Bambang Kusumawardhana & Ibu Sri Maharani',
      brideInstagram: '@sekararum.ds',
      weddingDateISO: '2026-11-28T08:00:00+07:00',
      weddingDateDisplay: 'Sabtu Wage, 28 November 2026',
      city: 'Surakarta, Jawa Tengah',
      heroPhoto:
        'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=85',
      groomPhoto:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
      bridePhoto:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      closingPhoto:
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        {
          url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80',
          caption: 'Pranikah di Pendopo Ageng Pura Mangkunegaran',
        },
        {
          url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=80',
          caption: 'Wastra Batik Tulis Sido Asih & Keris Pusaka',
        },
        {
          url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=900&q=80',
          caption: 'Rangkaian Roncean Melati Paes Ageng',
        },
      ],
      events: [
        {
          id: 'jv-1',
          stageCode: 'PROSESI I · SIRAMAN & MIDODARENI',
          title: 'Upacara Siraman Tirta Perwitasari',
          date: 'Jumat Kliwon, 27 November 2026',
          time: '09.00 – 20.30 WIB',
          venue: 'Ndalem Kusumawardhani',
          address: 'Jl. Slamet Riyadi No. 214, Kemlayan, Surakarta',
          philosophy:
            'Pembersihan jiwa dan raga dengan air tujuh mata air suci, dilanjutkan malam hening menanti berkah bidadari.',
          mapQuery: 'Jl. Slamet Riyadi Surakarta',
        },
        {
          id: 'jv-2',
          stageCode: 'PROSESI II · IJAB QABUL',
          title: 'Akad Nikah Keraton',
          date: 'Sabtu Wage, 28 November 2026',
          time: '08.00 – 10.00 WIB',
          venue: 'Masjid Agung Surakarta',
          address: 'Jl. Masjid Besar No. 1, Kauman, Surakarta',
          philosophy:
            'Ikrar janji suci pernikahan di hadapan penghulu, orang tua, dan para saksi sebagai ikatan lahir batin.',
          mapQuery: 'Masjid Agung Surakarta',
        },
        {
          id: 'jv-3',
          stageCode: 'PROSESI III · UPACARA PANGGIH & PAHARGYAN',
          title: 'Temu Panggih, Sinduran & Resepsi Agung',
          date: 'Sabtu Wage, 28 November 2026',
          time: '11.00 – 14.00 WIB',
          venue: 'Pendopo Royal Heritage Solo',
          address: 'Jl. Brigjen Slamet Riyadi No. 6, Surakarta',
          philosophy:
            'Balangan gantal, ngidak tigan, sinduran, dan kacar-kucur yang melambangkan kesetiaan serta kemakmuran.',
          mapQuery: 'Royal Heritage Solo',
        },
      ],
      loveStory: [
        {
          year: '2022',
          phase: 'BABAK AWAL',
          title: 'Pertemuan di Pameran Wastra Kuno',
          story:
            'Berawal dari ketertarikan yang sama terhadap arsip batik tulis klasik di Surakarta, percakapan hangat tumbuh menjadi rasa kagum.',
        },
        {
          year: '2025',
          phase: 'PENINGSETAN',
          title: 'Lamaran & Tukar Cincin Keluarga',
          story:
            'Kedua keluarga besar bertemu membawa ubarampe peningset sebagai tanda pengikat niat suci.',
        },
        {
          year: '2026',
          phase: 'JANJI SUCI',
          title: 'Menuju Pelaminan Agung',
          story:
            'Melangkah bersama dalam restu orang tua untuk membangun keluarga sakinah, mawaddah, warahmah.',
        },
      ],
      banks: [
        {
          bankName: 'Bank Central Asia (BCA)',
          accountNumber: '0154 8892 10',
          accountHolder: 'a.n. R.M. Bagaskara Adinegoro',
        },
        {
          bankName: 'Bank Mandiri',
          accountNumber: '1380 0219 4851 2',
          accountHolder: 'a.n. R.R. Sekar Arum',
        },
      ],
      giftAddress: 'Ndalem Kusumawardhani, Jl. Slamet Riyadi No. 214, Kemlayan, Kota Surakarta 57151',
    },
  },

  // =========================================================================
  // 2. SUNDANESE ROMANCE — Lembut, floral, elegan
  // =========================================================================
  {
    id: 'sundanese-romance',
    code: 'DG-02',
    name: 'Sundanese Romance',
    characterTagline: 'Lembut, Floral, Elegan Priangan',
    category: 'Adat Klasik',
    cultureOrigin: 'Bandung & Tatar Pasundan, Jawa Barat',
    religionContext: 'Islam Pasundan',
    priceDisplay: 'Rp 790.000',
    artDirectionNotes:
      'Menghadirkan kesejukan kebun teh Priangan di pagi hari, untaian ronce melati Siger Sunda, dan palet warna hijau sage lembut berpadu rose-champagne. Komposisi organik mengalir seperti kelopak bunga.',
    layoutArchetype: 'priangan-botanical',
    typography: {
      displayFont: "'Playfair Display', Georgia, serif",
      bodyFont: "'Plus Jakarta Sans', sans-serif",
      headingTracking: '0em',
      vibeDescription: 'Serif romantis lembut dengan lekuk floral organik',
    },
    defaultPalette: {
      id: 'priangan-sage',
      name: 'Priangan Emerald & Melati Putih',
      canvas: '#FFFFFF',
      surface: '#F0FDF4',
      primaryText: '#064E3B',
      mutedText: '#047857',
      accent: '#D97706',
      border: '#DCFCE7',
      ceremonialDark: '#022C22',
    },
    colorPresets: [
      {
        id: 'priangan-sage',
        name: 'Priangan Emerald & Melati Putih',
        canvas: '#FFFFFF',
        surface: '#F0FDF4',
        primaryText: '#064E3B',
        mutedText: '#047857',
        accent: '#D97706',
        border: '#DCFCE7',
        ceremonialDark: '#022C22',
      },
      {
        id: 'priangan-emerald-night',
        name: 'Malam Romansa Priangan (Deep Emerald)',
        canvas: '#022C22',
        surface: '#064E3B',
        primaryText: '#F8FAFC',
        mutedText: '#A7F3D0',
        accent: '#FBBF24',
        border: '#065F46',
        ceremonialDark: '#011C15',
      },
      {
        id: 'rose-melati-putih',
        name: 'Rose Melati & Champagne Gold',
        canvas: '#FFFFFF',
        surface: '#FDF2F8',
        primaryText: '#831843',
        mutedText: '#BE185D',
        accent: '#D97706',
        border: '#FCE7F3',
        ceremonialDark: '#500724',
      },
    ],
    musicConfig: {
      title: 'Kacapi Suling Parahyangan',
      ensemble: 'Ansambel Degung Klasik Pasundan',
      scaleName: 'Laras Degung (1-2-3-4-5)',
      bpm: 62,
      notesHz: [261.63, 293.66, 329.63, 392.0, 493.88, 523.25, 587.33],
      droneHz: 130.81,
      timbre: 'kacapi',
    },
    greetingHeader: 'Sampurasun · Assalamu’alaikum Warahmatullahi Wabarakatuh',
    openingScriptureOrPepatah: {
      quote: '“Silih asah, silih asih, silih asuh; ka cai jadi saleuwi, ka darat jadi salogak.”',
      translation:
        'Saling mencerdaskan, saling mengasihi, dan saling menjaga; seia sekata dalam setiap langkah mengarungi bahtera rumah tangga.',
      source: 'Pepatah Luhur Tatar Pasundan',
    },
    closingStatement: {
      honorificClosing:
        'Hatur nuhun kana kasumpingan sareng pidu’a ti Bapak/Ibu/Saderek sadayana. Mugia kabagjaan salawasna nyarengan urang sadaya.',
      familySignature: 'Keluarga Besar Drs. H. Deden Natakusumah & Ir. H. Asep Permana',
    },
    defaultData: {
      groomShort: 'Raka Pradipta',
      groomFull: 'Raka Pradipta Natakusumah, S.H.',
      groomParents: 'Putra Bapak Drs. H. Deden Natakusumah & Ibu Hj. Lilis Suryani',
      groomInstagram: '@rakapradipta',
      brideShort: 'Nenden Kirana',
      brideFull: 'Nenden Kirana Permatasari, S.Psi.',
      brideParents: 'Putri Bapak Ir. H. Asep Permana & Ibu Hj. Euis Kartika',
      brideInstagram: '@nendenkirana',
      weddingDateISO: '2026-12-06T08:00:00+07:00',
      weddingDateDisplay: 'Minggu, 6 Desember 2026',
      city: 'Bandung, Jawa Barat',
      heroPhoto:
        'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=85',
      groomPhoto:
        'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80',
      bridePhoto:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
      closingPhoto:
        'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        {
          url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=900&q=80',
          caption: 'Mahkota Siger Sunda & Untaian Melati Mangle',
        },
        {
          url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80',
          caption: 'Kabut Pagi di Lembah Ciwidey Bandung',
        },
        {
          url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=900&q=80',
          caption: 'Prosesi Ngeuyeuk Seureuh Keluarga',
        },
      ],
      events: [
        {
          id: 'sd-1',
          stageCode: 'BABAK I · NGEUYEUK SEUREUH',
          title: 'Pengajian & Ngeuyeuk Seureuh',
          date: 'Sabtu, 5 Desember 2026',
          time: '15.00 – 18.00 WIB',
          venue: 'Bumi Sangkuriang Ciumbuleuit',
          address: 'Jl. Kiputih No. 12, Ciumbuleuit, Kota Bandung',
          philosophy:
            'Petuah rumah tangga melalui simbol tujuh lembar daun sirih, pinang, dan benang kanteh.',
          mapQuery: 'Bumi Sangkuriang Bandung',
        },
        {
          id: 'sd-2',
          stageCode: 'BABAK II · AKAD & SAWER PANGANTEN',
          title: 'Ijab Qabul, Sungkeman & Upacara Sawer',
          date: 'Minggu, 6 Desember 2026',
          time: '08.00 – 14.00 WIB',
          venue: 'Gedung Sate Heritage Courtyard / Bale Asri',
          address: 'Jl. Diponegoro No. 63, Cibeunying Kaler, Bandung',
          philosophy:
            'Kidung sawer berisi doa kemakmuran, meuleum harupat, nincak endog, dan huap lingkung.',
          mapQuery: 'Bale Asri Pusdai Bandung',
        },
      ],
      loveStory: [
        {
          year: '2023',
          phase: 'AWAL CERITA',
          title: 'Hujan Sore di Jalan Braga',
          story:
            'Pertemuan hangat ditemani alunan musik akustik dan kopi hangat di sudut bersejarah kota Bandung.',
        },
        {
          year: '2025',
          phase: 'NEUNDEUN OMONG',
          title: 'Silaturahmi & Narosan',
          story:
            'Kedua keluarga saling berkunjung dalam suasana penuh kekeluargaan khas Pasundan.',
        },
        {
          year: '2026',
          phase: 'AKAD SUCI',
          title: 'Menyatu dalam Sawer Panganten',
          story: 'Mengikat janji sehidup semati di bawah payung kuning kebesaran Sunda.',
        },
      ],
      banks: [
        {
          bankName: 'Bank BJB / BCA',
          accountNumber: '4371 0092 81',
          accountHolder: 'a.n. Raka Pradipta Natakusumah',
        },
      ],
      giftAddress: 'Jl. Kiputih No. 12, Ciumbuleuit, Kec. Cidadap, Kota Bandung 40142',
    },
  },

  // =========================================================================
  // 3. MINANG HERITAGE — Geometris, bold, tradisional
  // =========================================================================
  {
    id: 'minang-heritage',
    code: 'DG-03',
    name: 'Minang Heritage',
    characterTagline: 'Geometris, Bold, Songket Ranah Minang',
    category: 'Adat Klasik',
    cultureOrigin: 'Bukittinggi & Padang, Sumatera Barat',
    religionContext: 'Adat Basandi Syarak, Syarak Basandi Kitabullah',
    priceDisplay: 'Rp 880.000',
    artDirectionNotes:
      'Menonjolkan ketegasan struktur atap Bagonjong Rumah Gadang, geometri tenun Songket Pandai Sikek benang emas, dan warna merah marun tua berpadu emas murni.',
    layoutArchetype: 'gonjong-geometric',
    typography: {
      displayFont: "'Cinzel', Georgia, serif",
      bodyFont: "'Plus Jakarta Sans', sans-serif",
      headingTracking: '0.05em',
      vibeDescription: 'Tipografi kapital geometris tegas berlapis tenun emas',
    },
    defaultPalette: {
      id: 'songket-maroon',
      name: 'Marapulai Royal Crimson & Brass Gold',
      canvas: '#FFFFFF',
      surface: '#FFF1F2',
      primaryText: '#881337',
      mutedText: '#9F1239',
      accent: '#D97706',
      border: '#FFE4E6',
      ceremonialDark: '#4C0519',
    },
    colorPresets: [
      {
        id: 'songket-maroon',
        name: 'Marapulai Royal Crimson & Brass Gold',
        canvas: '#FFFFFF',
        surface: '#FFF1F2',
        primaryText: '#881337',
        mutedText: '#9F1239',
        accent: '#D97706',
        border: '#FFE4E6',
        ceremonialDark: '#4C0519',
      },
      {
        id: 'suntiang-royal-night',
        name: 'Malam Bainai (Marun Gelap & Emas)',
        canvas: '#1A060C',
        surface: '#2B0B14',
        primaryText: '#FFF1F2',
        mutedText: '#FDA4AF',
        accent: '#F59E0B',
        border: '#4C0519',
        ceremonialDark: '#0F0206',
      },
      {
        id: 'bagonjong-sapphire-gold',
        name: 'Bagonjong Sapphire & Royal Gold',
        canvas: '#0F172A',
        surface: '#1E293B',
        primaryText: '#F8FAFC',
        mutedText: '#94A3B8',
        accent: '#F59E0B',
        border: '#334155',
        ceremonialDark: '#020617',
      },
    ],
    musicConfig: {
      title: 'Talempong Pacik & Saluang',
      ensemble: 'Ansambel Talempong Darek Minangkabau',
      scaleName: 'Pentatonik Saluang Darek',
      bpm: 84,
      notesHz: [329.63, 369.99, 440.0, 493.88, 554.37, 659.25],
      droneHz: 164.81,
      timbre: 'talempong',
    },
    greetingHeader: 'Assalamu’alaikum Warahmatullahi Wabarakatuh · Jo Bismillah Kami Mulai',
    openingScriptureOrPepatah: {
      quote: '“Bak aur jo tebing, sanda-menyanda kaduonyo; ka bukik samo mandaki, ka lurah samo manurun.”',
      translation:
        'Bagaikan rumpun bambu dan tebing sungai yang saling menopang; ke bukit sama mendaki, ke lembah sama menurun dalam ridho Allah SWT.',
      source: 'Pepatah Petitih Adat Minangkabau',
    },
    closingStatement: {
      honorificClosing:
        'Kehadiran Bapak, Ibu, Ninik Mamak, Alim Ulama, Cadiak Pandai, serta Bundo Kanduang merupakan kemuliaan besar bagi Baralek Gadang keluarga kami.',
      familySignature: 'Keluarga Besar H. Anwar Datuk Rajo Penghulu & Ir. H. Syahrul Koto',
    },
    defaultData: {
      groomShort: 'Rajo Langik',
      groomFull: 'Sutan Rajo Langik Caniago, S.T.',
      groomParents: 'Putra Bapak H. Anwar Datuk Rajo Penghulu & Ibu Hj. Nurhayati',
      groomInstagram: '@rajolangik.st',
      brideShort: 'Andam Dewi',
      brideFull: 'Puti Andam Dewi Koto, S.E., M.B.A.',
      brideParents: 'Putri Bapak Ir. H. Syahrul Koto & Ibu Dra. Hj. Rosmaida',
      brideInstagram: '@putiandamdewi',
      weddingDateISO: '2026-12-12T08:30:00+07:00',
      weddingDateDisplay: 'Sabtu, 12 Desember 2026',
      city: 'Bukittinggi & Padang, Sumatera Barat',
      heroPhoto:
        'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=85',
      groomPhoto:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
      bridePhoto:
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
      closingPhoto:
        'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        {
          url: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=900&q=80',
          caption: 'Tenun Songket Pandai Sikek & Suntiang Gadang',
        },
        {
          url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=900&q=80',
          caption: 'Pelaminan Bagonjong di Ranah Minang',
        },
        {
          url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=900&q=80',
          caption: 'Prosesi Batimbang Tando Salingka Ninik Mamak',
        },
      ],
      events: [
        {
          id: 'mn-1',
          stageCode: 'PROSESI I · MALAM BAINAI',
          title: 'Malam Bainai Anak Daro',
          date: 'Jumat, 11 Desember 2026',
          time: '19.30 – 22.00 WIB',
          venue: 'Rumah Gadang Keluarga Besar Koto',
          address: 'Jl. Panorama No. 42, Guguk Panjang, Bukittinggi',
          philosophy:
            'Pemberian inai merah pada kuku Anak Daro sebagai ungkapan kasih sayang keluarga sebelum memasuki gerbang pernikahan.',
          mapQuery: 'Panorama Bukittinggi',
        },
        {
          id: 'mn-2',
          stageCode: 'PROSESI II · MANJAPUIK MARAPULAI & AKAD',
          title: 'Penjemputan Adat & Ijab Qabul',
          date: 'Sabtu, 12 Desember 2026',
          time: '08.30 – 10.30 WIB',
          venue: 'Masjid Raya Sumatera Barat',
          address: 'Jl. Khatib Sulaiman, Kota Padang',
          philosophy:
            'Penjemputan Marapulai dengan carano sirih lengkap menuju pengucapan ijab qabul.',
          mapQuery: 'Masjid Raya Sumatera Barat',
        },
        {
          id: 'mn-3',
          stageCode: 'PROSESI III · BARALEK GADANG',
          title: 'Jamuan Agung & Tari Pasambahan',
          date: 'Sabtu, 12 Desember 2026',
          time: '11.30 – 15.30 WIB',
          venue: 'Pangeran Beach Grand Ballroom',
          address: 'Jl. Ir. H. Juanda No. 79, Padang',
          philosophy:
            'Perjamuan adat yang diiringi denting Talempong dan Tari Piring menyambut kerabat.',
          mapQuery: 'Pangeran Beach Hotel Padang',
        },
      ],
      loveStory: [
        {
          year: '2021',
          phase: 'TANAH RANTAU',
          title: 'Perjumpaan di Acara Ikatan Keluarga Minang',
          story:
            'Sapaan hangat dalam bahasa ibu di perantauan mempertemukan langkah kami.',
        },
        {
          year: '2025',
          phase: 'BATIMBANG TANDO',
          title: 'Maresek & Pertukaran Tanda Pusaka',
          story:
            'Ninik mamak kedua belah pihak bertukar keris dan kain songket sebagai ikatan janji.',
        },
      ],
      banks: [
        {
          bankName: 'Bank Nagari / BCA',
          accountNumber: '8820 4419 02',
          accountHolder: 'a.n. Puti Andam Dewi Koto',
        },
      ],
      giftAddress: 'Jl. Panorama No. 42, Guguk Panjang, Kota Bukittinggi, Sumatera Barat 26136',
    },
  },

  // =========================================================================
  // 4. BALINESE SACRED — Artistik, ornamen Bali
  // =========================================================================
  {
    id: 'balinese-sacred',
    code: 'DG-04',
    name: 'Balinese Sacred',
    characterTagline: 'Artistik, Sakral, Ukiran Puri Ubud',
    category: 'Adat Klasik',
    cultureOrigin: 'Ubud & Badung, Bali',
    religionContext: 'Hindu Dharma — Grhasta Asrama',
    priceDisplay: 'Rp 860.000',
    artDirectionNotes:
      'Mengangkat tekstur batu paras Ubud, terakota bata merah Majapahit, ukiran sulur Patra Sari, dan gerbang belah Candi Bentar. Dilengkapi alunan gamelan bambu Rindik berombak halus.',
    layoutArchetype: 'bali-paduraksa',
    typography: {
      displayFont: "'EB Garamond', Georgia, serif",
      bodyFont: "'Plus Jakarta Sans', sans-serif",
      headingTracking: '0.01em',
      vibeDescription: 'Tipografi naskah lontar klasik dengan ukiran terakota emas',
    },
    defaultPalette: {
      id: 'puri-ubud-black',
      name: 'Puri Ubud Sacred Black & Bali Gold',
      canvas: '#09090B',
      surface: '#18181B',
      primaryText: '#FAFAFA',
      mutedText: '#D4D4D8',
      accent: '#F59E0B',
      border: '#27272A',
      ceremonialDark: '#000000',
    },
    colorPresets: [
      {
        id: 'puri-ubud-black',
        name: 'Puri Ubud Sacred Black & Bali Gold',
        canvas: '#09090B',
        surface: '#18181B',
        primaryText: '#FAFAFA',
        mutedText: '#D4D4D8',
        accent: '#F59E0B',
        border: '#27272A',
        ceremonialDark: '#000000',
      },
      {
        id: 'candi-bentar-white',
        name: 'Candi Bentar Terakota & Putih Suci',
        canvas: '#FFFFFF',
        surface: '#FFF7ED',
        primaryText: '#7C2D12',
        mutedText: '#9A3412',
        accent: '#D97706',
        border: '#FFEDD5',
        ceremonialDark: '#431407',
      },
      {
        id: 'tridatu-sacred',
        name: 'Tridatu Senja Jimbaran',
        canvas: '#1C0A04',
        surface: '#2E1208',
        primaryText: '#FFEDD5',
        mutedText: '#FDBA74',
        accent: '#F59E0B',
        border: '#431407',
        ceremonialDark: '#120502',
      },
    ],
    musicConfig: {
      title: 'Rindik & Semar Pegulingan',
      ensemble: 'Gamelan Bambu Rindik Ubud',
      scaleName: 'Selisir Lima Nada (Bali)',
      bpm: 76,
      notesHz: [277.18, 311.13, 369.99, 415.3, 493.88, 554.37, 622.25],
      droneHz: 138.59,
      timbre: 'rindik',
    },
    greetingHeader: 'Om Swastiastu · Atas Asung Kertha Wara Nugraha Ida Sang Hyang Widhi Wasa',
    openingScriptureOrPepatah: {
      quote: '“Grbhnāmi te saubhagatvāya hastam, mayā patyā jaradastir yathāsah.”',
      translation:
        'Kugenggam tanganmu demi kebahagiaan bersama, semoga kita hidup rukun berdampingan sebagai suami istri hingga usia senja.',
      source: 'Rgveda X.85.36 — Sloka Pawiwahan',
    },
    closingStatement: {
      honorificClosing:
        'Om Santih, Santih, Santih Om. Kehadiran Bapak/Ibu/Saudara/i pada upacara Dharma Suaka kami merupakan anugerah yang sangat berarti.',
      familySignature: 'Keluarga Besar Puri Saren Ubud & Puri Agung Sukawati',
    },
    defaultData: {
      groomShort: 'Gde Mahardika',
      groomFull: 'A.A. Gde Mahardika Putra, S.Ked.',
      groomParents: 'Putra pertama pasangan A.A. Ngurah Rai Suryawan & Jero Puspa Wati',
      groomInstagram: '@gdemahardika',
      brideShort: 'Ratih Prameswari',
      brideFull: 'Cokorda Istri Ratih Prameswari, S.Ars.',
      brideParents: 'Putri bungsu pasangan Cokorda Gde Agung Sukawati & A.A. Istri Dewi',
      brideInstagram: '@cokratih.ars',
      weddingDateISO: '2026-12-18T09:00:00+08:00',
      weddingDateDisplay: 'Jumat, 18 Desember 2026',
      city: 'Ubud, Gianyar — Bali',
      heroPhoto:
        'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=85',
      groomPhoto:
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
      bridePhoto:
        'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
      closingPhoto:
        'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        {
          url: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=80',
          caption: 'Candi Bentar Puri Ubud di Kala Senja',
        },
        {
          url: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=900&q=80',
          caption: 'Busana Payas Agung & Songket Beratan',
        },
        {
          url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=80',
          caption: 'Sesari Bunga Canang Sari & Tirta Suci',
        },
      ],
      events: [
        {
          id: 'bl-1',
          stageCode: 'UPACARA I · NGEKEB & MAPANDES',
          title: 'Prosesi Ngekeb & Ngungkab Lawang',
          date: 'Kamis, 17 Desember 2026',
          time: '08.30 – 11.30 WITA',
          venue: 'Puri Saren Kauh Ubud',
          address: 'Jl. Raya Ubud No. 18, Gianyar, Bali',
          philosophy:
            'Penyucian diri pengantin wanita sebelum dijemput secara adat oleh mempelai pria.',
          mapQuery: 'Ubud Palace Bali',
        },
        {
          id: 'bl-2',
          stageCode: 'UPACARA II · PAWIWAHAN & DHARMA SUAKA',
          title: 'Upacara Mekala-kalaan & Resepsi Taman Puri',
          date: 'Jumat, 18 Desember 2026',
          time: '16.00 – 21.00 WITA',
          venue: 'Taman Dedari Royal Courtyard',
          address: 'Kedewatan, Ubud, Kabupaten Gianyar, Bali',
          philosophy:
            'Penyatuan saksi Tri Hita Karana dilanjutkan jamuan petang di bawah teduhnya pohon kamboja.',
          mapQuery: 'Taman Dedari Ubud',
        },
      ],
      loveStory: [
        {
          year: '2022',
          phase: 'CAMPUHAN UBUD',
          title: 'Pertemuan di Konservasi Lontar',
          story:
            'Kecintaan pada seni arsitektur dan sastra Bali mempertemukan perjalanan hidup kami.',
        },
        {
          year: '2026',
          phase: 'MEMADIK',
          title: 'Pinangan Adat Keluarga Puri',
          story:
            'Keluarga datang membawa canang sari dan ikrar suci menuju masa Grhasta Asrama.',
        },
      ],
      banks: [
        {
          bankName: 'Bank Central Asia (BCA)',
          accountNumber: '7725 1904 88',
          accountHolder: 'a.n. A.A. Gde Mahardika Putra',
        },
      ],
      giftAddress: 'Puri Saren Kauh, Jl. Raya Ubud No. 18, Kec. Ubud, Kabupaten Gianyar, Bali 80571',
    },
  },

  // =========================================================================
  // 5. ISLAMIC ELEGANCE — Kaligrafi, geometris, minimalis
  // =========================================================================
  {
    id: 'islamic-elegance',
    code: 'DG-05',
    name: 'Islamic Elegance',
    characterTagline: 'Kaligrafi, Geometris, Minimalis Sakral',
    category: 'Religi & Kaligrafi',
    cultureOrigin: 'Islami Kontemporer & Geometri Rub el Hizb',
    religionContext: 'Walimatul ’Ursy Islami',
    priceDisplay: 'Rp 760.000',
    artDirectionNotes:
      'Mengusung keheningan arsitektur lengkung mihrab, geometri bintang delapan Rub el Hizb, kaligrafi Bismillah yang bersih, serta palet Alabaster putih gading dan hijau zamrud zaitun.',
    layoutArchetype: 'medina-arch',
    typography: {
      displayFont: "'Cormorant Garamond', Georgia, serif",
      bodyFont: "'Plus Jakarta Sans', sans-serif",
      headingTracking: '0.015em',
      vibeDescription: 'Proporsi bersih minimalis dengan lengkung kubah geometri Islam',
    },
    defaultPalette: {
      id: 'medina-sapphire-white',
      name: 'Medina Royal Sapphire & Antique Gold',
      canvas: '#FFFFFF',
      surface: '#F8FAFC',
      primaryText: '#0F172A',
      mutedText: '#334155',
      accent: '#D97706',
      border: '#E2E8F0',
      ceremonialDark: '#0A0F1D',
    },
    colorPresets: [
      {
        id: 'medina-sapphire-white',
        name: 'Medina Royal Sapphire & Antique Gold',
        canvas: '#FFFFFF',
        surface: '#F8FAFC',
        primaryText: '#0F172A',
        mutedText: '#334155',
        accent: '#D97706',
        border: '#E2E8F0',
        ceremonialDark: '#0A0F1D',
      },
      {
        id: 'midnight-qamar',
        name: 'Malam Lailatul (Biru Navy & Emas)',
        canvas: '#0B1120',
        surface: '#111827',
        primaryText: '#F8FAFC',
        mutedText: '#94A3B8',
        accent: '#F59E0B',
        border: '#1E293B',
        ceremonialDark: '#030712',
      },
      {
        id: 'al-rawda-emerald',
        name: 'Kubah Zamrud & Emas Arabesque',
        canvas: '#064E3B',
        surface: '#022C22',
        primaryText: '#F0FDF4',
        mutedText: '#A7F3D0',
        accent: '#FBBF24',
        border: '#065F46',
        ceremonialDark: '#011C15',
      },
    ],
    musicConfig: {
      title: 'Harmoni Petikan Gambus & Harpa Akustik',
      ensemble: 'Instrumental Akustik Sakinah',
      scaleName: 'Maqam Hijaz Lembut',
      bpm: 60,
      notesHz: [293.66, 311.13, 369.99, 392.0, 440.0, 466.16, 554.37],
      droneHz: 146.83,
      timbre: 'kecapi_bugis',
    },
    greetingHeader: 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ · Assalamu’alaikum Warahmatullahi Wabarakatuh',
    openingScriptureOrPepatah: {
      quote: '“بَارَكَ اللهُ لَكَ وَبَارَكَ عَلَيْكَ وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ”',
      translation:
        'Semoga Allah memberkahimu di waktu bahagia dan memberkahimu di waktu sulit, serta menyatukan kalian berdua dalam kebaikan.',
      source: 'HR. Abu Dawud & At-Tirmidzi',
    },
    closingStatement: {
      honorificClosing:
        'Jazakumullahu Khairan Katsiran atas kehadiran serta untaian doa tulus Bapak/Ibu/Saudara/i bagi keberkahan pernikahan putra-putri kami.',
      familySignature: 'Keluarga Besar Prof. Dr. H. Ahmad Fauzi & dr. H. Lukman Hakim, Sp.PD',
    },
    defaultData: {
      groomShort: 'Zaidan Alfarizi',
      groomFull: 'Muhammad Zaidan Alfarizi, B.Eng., M.Sc.',
      groomParents: 'Putra pertama Prof. Dr. H. Ahmad Fauzi & Ibu Dra. Hj. Khadijah Rahma',
      groomInstagram: '@zaidan.alfarizi',
      brideShort: 'Aisyah Humaira',
      brideFull: 'dr. Aisyah Humaira Zahra',
      brideParents: 'Putri pertama dr. H. Lukman Hakim, Sp.PD & Ibu Hj. Sofia Nabila',
      brideInstagram: '@aisyah.humaira',
      weddingDateISO: '2026-12-20T08:00:00+07:00',
      weddingDateDisplay: 'Ahad, 20 Desember 2026 / 10 Rajab 1448 H',
      city: 'Jakarta Selatan',
      heroPhoto:
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85',
      groomPhoto:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
      bridePhoto:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      closingPhoto:
        'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        {
          url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80',
          caption: 'Momen Khitbah Keluarga Besar di Jakarta',
        },
        {
          url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=900&q=80',
          caption: 'Detail Mahar & Mushaf Al-Qur’an Pernikahan',
        },
        {
          url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=900&q=80',
          caption: 'Ijab Qabul Khidmat di Hadapan Wali & Saksi',
        },
      ],
      events: [
        {
          id: 'is-1',
          stageCode: 'SESI I · AKAD NIKAH',
          title: 'Majelis Ijab Qabul & Khutbah Nikah',
          date: 'Ahad, 20 Desember 2026',
          time: '08.00 – 10.00 WIB',
          venue: 'Masjid Agung Al-Azhar Kebayoran Baru',
          address: 'Jl. Sisingamangaraja, Kebayoran Baru, Jakarta Selatan',
          philosophy:
            'Mitsaqan Ghalizha — perjanjian yang kokoh di hadapan Allah SWT, wali, dan para saksi.',
          mapQuery: 'Masjid Agung Al Azhar Jakarta',
        },
        {
          id: 'is-2',
          stageCode: 'SESI II · WALIMATUL ’URSY',
          title: 'Tasyakuran & Walimatul ’Ursy',
          date: 'Ahad, 20 Desember 2026',
          time: '11.00 – 14.00 WIB',
          venue: 'The Dharmawangsa Grand Ballroom',
          address: 'Jl. Brawijaya Raya No. 26, Kebayoran Baru, Jakarta Selatan',
          philosophy:
            'Menyebarkan kabar gembira pernikahan dan menjamu kerabat sesuai sunnah Rasulullah SAW.',
          mapQuery: 'The Dharmawangsa Jakarta',
        },
      ],
      loveStory: [
        {
          year: '2025',
          phase: 'TA’ARUF',
          title: 'Pertemuan Melalui Perantara Keluarga',
          story:
            'Berawal dari pertukaran biodata dan visi membangun keluarga yang diridhoi Allah SWT.',
        },
        {
          year: '2026',
          phase: 'KHITBAH',
          title: 'Pinangan Resmi & Penentuan Hari Akad',
          story:
            'Keluarga besar hadir menguatkan niat suci menuju ibadah terpanjang pernikahan.',
        },
      ],
      banks: [
        {
          bankName: 'Bank Syariah Indonesia (BSI)',
          accountNumber: '7192 8834 19',
          accountHolder: 'a.n. Muhammad Zaidan Alfarizi',
        },
      ],
      giftAddress: 'Jl. Brawijaya VIII No. 14, Kebayoran Baru, Jakarta Selatan 12160',
    },
  },

  // =========================================================================
  // 6. MODERN NUSANTARA — Tradisional bertemu modern
  // =========================================================================
  {
    id: 'modern-nusantara',
    code: 'DG-06',
    name: 'Modern Nusantara',
    characterTagline: 'Tradisional Bertemu Editorial Modern',
    category: 'Editorial Kontemporer',
    cultureOrigin: 'Kontemporer Lintas Budaya Nusantara',
    religionContext: 'Universal / Multi-Adat Modern',
    priceDisplay: 'Rp 920.000',
    artDirectionNotes:
      'Gaya majalah arsitektur & Kinfolk dengan fotografi skala besar (70% bidang pandang), tipografi asimetris kontras tinggi, garis tenun ikat minimalis, dan ruang kosong (negative space) yang berani.',
    layoutArchetype: 'kinfolk-editorial',
    typography: {
      displayFont: "'Playfair Display', Georgia, serif",
      bodyFont: "'Plus Jakarta Sans', sans-serif",
      headingTracking: '-0.02em',
      vibeDescription: 'Editorial majalah kontemporer dengan kontras skala besar',
    },
    defaultPalette: {
      id: 'kinfolk-monochrome',
      name: 'Kinfolk Stark Monokrom & Terracotta',
      canvas: '#FFFFFF',
      surface: '#F8FAFC',
      primaryText: '#09090B',
      mutedText: '#64748B',
      accent: '#EA580C',
      border: '#E2E8F0',
      ceremonialDark: '#09090B',
    },
    colorPresets: [
      {
        id: 'kinfolk-monochrome',
        name: 'Kinfolk Stark Monokrom & Terracotta',
        canvas: '#FFFFFF',
        surface: '#F8FAFC',
        primaryText: '#09090B',
        mutedText: '#64748B',
        accent: '#EA580C',
        border: '#E2E8F0',
        ceremonialDark: '#09090B',
      },
      {
        id: 'editorial-jet-black',
        name: 'Editorial Jet Black & Vivid Amber',
        canvas: '#09090B',
        surface: '#18181B',
        primaryText: '#F8FAFC',
        mutedText: '#A1A1AA',
        accent: '#F97316',
        border: '#27272A',
        ceremonialDark: '#000000',
      },
      {
        id: 'slate-champagne',
        name: 'Minimalist Slate & Champagne Gold',
        canvas: '#F1F5F9',
        surface: '#FFFFFF',
        primaryText: '#0F172A',
        mutedText: '#475569',
        accent: '#D97706',
        border: '#CBD5E1',
        ceremonialDark: '#0F172A',
      },
    ],
    musicConfig: {
      title: 'Ensemble Kontemporer Nusantara',
      ensemble: 'Paduan Saron Akustik & String Quartet',
      scaleName: 'Pelog Kontemporer',
      bpm: 72,
      notesHz: [261.63, 329.63, 392.0, 493.88, 523.25, 659.25],
      droneHz: 130.81,
      timbre: 'hasapi',
    },
    greetingHeader: 'Undangan Pernikahan · Perayaan Cinta & Warisan Budaya',
    openingScriptureOrPepatah: {
      quote: '“Dua akar budaya yang bertumbuh bersama dalam satu ruang janji masa depan.”',
      translation:
        'Merayakan pertemuan dua keluarga dan warisan leluhur Nusantara dalam perayaan yang intim, hangat, dan penuh makna.',
      source: 'Catatan Pernikahan Adri & Laras',
    },
    closingStatement: {
      honorificClosing:
        'Terima kasih telah menjadi bagian dari perjalanan hidup kami. Kehadiran Anda melengkapi kebahagiaan perayaan intim ini.',
      familySignature: 'Adri Prakoso & Larasati Maheswari beserta Keluarga',
    },
    defaultData: {
      groomShort: 'Adri Prakoso',
      groomFull: 'Adrianto Prakoso, M.Arch.',
      groomParents: 'Putra Bapak Ir. Gunawan Prakoso & Ibu Maya Kusuma',
      groomInstagram: '@adri.arch',
      brideShort: 'Laras Maheswari',
      brideFull: 'Larasati Maheswari, B.A. (Hons)',
      brideParents: 'Putri Bapak Wisnu Maheswara & Ibu Dian Anggraini',
      brideInstagram: '@larasmaheswari',
      weddingDateISO: '2026-12-27T16:00:00+07:00',
      weddingDateDisplay: 'Minggu, 27 Desember 2026',
      city: 'Plataran Hutan Kota, Jakarta & Magelang',
      heroPhoto:
        'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=85',
      groomPhoto:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
      bridePhoto:
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
      closingPhoto:
        'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        {
          url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=900&q=80',
          caption: 'Editorial Potret di Galeri Nasional',
        },
        {
          url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=900&q=80',
          caption: 'Tenun Ikat Kontemporer & Beskap Modern',
        },
        {
          url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=80',
          caption: 'Momen Hangat Menjelang Resepsi Intim',
        },
      ],
      events: [
        {
          id: 'mn-e1',
          stageCode: '01 · HOLY MATRIMONY / AKAD',
          title: 'Intimate Vows & Pemberkatan',
          date: 'Minggu, 27 Desember 2026',
          time: '15.30 – 17.00 WIB',
          venue: 'Rumah kaca Plataran Senayan',
          address: 'Jl. Jenderal Sudirman Kav. 54-55, Jakarta Pusat',
          philosophy:
            'Upacara pengucapan janji pernikahan intim yang dihadiri keluarga inti dan sahabat terdekat.',
          mapQuery: 'Hutan Kota by Plataran Jakarta',
        },
        {
          id: 'mn-e2',
          stageCode: '02 · EVENING SOIRÉE & DINNER',
          title: 'Jamuan Makan Malam Nusantara Modern',
          date: 'Minggu, 27 Desember 2026',
          time: '18.30 – 21.30 WIB',
          venue: 'Pidari Lounge & Taman Plataran',
          address: 'Jl. Jenderal Sudirman Kav. 54-55, Jakarta Pusat',
          philosophy:
            'Perayaan hangat di bawah cahaya lampu taman dengan sajian kuliner warisan Nusantara.',
          mapQuery: 'Hutan Kota by Plataran Jakarta',
        },
      ],
      loveStory: [
        {
          year: '2021',
          phase: 'CHAPTER 01',
          title: 'Pameran Arsitektur di Singapura',
          story:
            'Diskusi tentang desain ruang tropis Indonesia membawa kami pada kolaborasi karya dan kehidupan.',
        },
        {
          year: '2026',
          phase: 'CHAPTER 02',
          title: 'Lamaran di Bukit Menoreh Borobudur',
          story:
            'Di bawah kabut pagi Candi Borobudur, sebuah janji masa depan terucap.',
        },
      ],
      banks: [
        {
          bankName: 'Bank Central Asia (BCA)',
          accountNumber: '5240 9918 23',
          accountHolder: 'a.n. Adrianto Prakoso',
        },
      ],
      giftAddress: 'Apartemen Senopati Suites Tower 2, Kebayoran Baru, Jakarta Selatan 12190',
    },
  },
];

export const getTemplateById = (id: TemplateId): TemplateSchema => {
  return TEMPLATE_REGISTRY.find((t) => t.id === id) || TEMPLATE_REGISTRY[0];
};
