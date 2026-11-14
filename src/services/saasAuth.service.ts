import {
  UserRole,
  SubscriptionTier,
  UserProfile,
  ClientSubscription,
  ClientAccountSummary,
  AgencyOrder,
  PricingPlanConfig,
  PaymentTransaction,
} from '../models/saas.model';

const STORAGE_KEYS = {
  CURRENT_USER: 'digiat_saas_current_user_v2',
  CURRENT_SUB: 'digiat_saas_current_sub_v2',
  CLIENTS_LIST: 'digiat_saas_clients_list_v2',
  AGENCY_ORDERS: 'digiat_saas_agency_orders_v2',
  PRICING_PLANS: 'digiat_saas_pricing_plans_v2',
  TRANSACTIONS: 'digiat_saas_transactions_v2',
};

// Preset Demo Profiles
export const DEMO_PROFILES: Record<UserRole, UserProfile> = {
  user: {
    id: 'user-01',
    name: 'Raden Arya & Sekar Ayu',
    email: 'klien.arya@gmail.com',
    phone: '0812-3456-7890',
    role: 'user',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
  },
  admin: {
    id: 'admin-01',
    name: 'Bagas Pratama (Owner)',
    email: 'superadmin@digiat.id',
    phone: '0811-9988-7766',
    role: 'admin',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
  },
  designer: {
    id: 'designer-01',
    name: 'Maya Danastri, S.Ds.',
    email: 'creative.maya@digiat.id',
    phone: '0857-1234-5678',
    role: 'designer',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
  },
  finance: {
    id: 'finance-01',
    name: 'Rian Hidayat, S.E. (Billing)',
    email: 'finance@digiat.id',
    phone: '0813-5566-7788',
    role: 'finance',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
  },
};

export const INITIAL_PRICING_PLANS: PricingPlanConfig[] = [
  {
    id: 'free',
    name: 'Paket Starter (Hemat)',
    priceIdr: 39000,
    formattedPrice: 'Rp 39.000',
    durationLabel: 'Sekali Bayar, Aktif Selamanya',
    badge: 'Hemat',
    description: 'Undangan digital premium lengkap dengan audio adat dan RSVP online.',
    features: [
      'Pilihan 1 Template Adat / Modern',
      'Kustomisasi Teks, Nama Mempelai & Acara',
      'Nama Tamu Personal Unlimited (?to=Nama)',
      'Buku Tamu Doa Restu & RSVP Real-time',
      'Navigasi Peta Google Maps Lokasi Acara',
      'Audio Musik Adat & Lagu Pilihan',
      'Amplop Digital Rekening Bank Transfer',
      'Masa Aktif Selamanya Tanpa Batas Waktu',
    ],
    recommended: false,
  },
  {
    id: 'pro',
    name: 'Paket Premium Self-Service',
    priceIdr: 99000,
    formattedPrice: 'Rp 99.000',
    durationLabel: 'Sekali Bayar, Aktif Selamanya',
    badge: 'Paling Populer ⭐',
    description: 'Bebas ganti 6 tema adat, upload foto prewedding unlimited & QRIS cashless.',
    features: [
      'Semua Fitur Paket Starter',
      'Bebas Pilih & Ganti Antar 6 Template Adat/Modern',
      'Generator Draf Pesan Kirim WhatsApp Otomatis',
      'Upload Foto Prewedding, Galeri Cinta & Cerita Kasih',
      'Efek Animasi Parallax & Ornamen Budaya Mewah',
      'Amplop Digital QRIS Dinamis & Multi-Rekening',
      'Hitung Mundur (Countdown Timer) Menuju Hari H',
      'Bebas Watermark DIGIAT Studio',
    ],
    recommended: true,
  },
  {
    id: 'vip_agency',
    name: 'Paket VIP Terima Beres',
    priceIdr: 299000,
    formattedPrice: 'Rp 299.000',
    durationLabel: 'Dikerjakan Tim + Aktif Selamanya',
    badge: 'Layanan Eksklusif',
    description: 'Terima beres, seluruh desain, foto, dan format nama tamu dikerjakan desainer DIGIAT.',
    features: [
      'Semua Fitur Paket Premium Self-Service',
      'Dikerjakan Langsung oleh Desainer Senior DIGIAT',
      'Cukup Kirim Foto & Data Acara via WhatsApp',
      'Bantuan Format & Input Ribuan Tamu dari Excel/WA',
      'Finishing Ornamen AI Khusus & Monogram Elegan',
      'Prioritas Pengerjaan Kilat 24 Jam Selesai',
      'Garansi Revisi Desain Hingga Puas',
      'Konsultasi Langsung via WhatsApp Desainer',
    ],
    recommended: false,
  },
];

export const INITIAL_CLIENTS: ClientAccountSummary[] = [
  {
    id: 'cli-01',
    groomBrideNames: 'Raden Arya & Sekar Ayu',
    email: 'klien.arya@gmail.com',
    phone: '0812-3456-7890',
    weddingDate: '28 November 2026',
    templateId: 'javanese-royal',
    slug: 'arya-sekar',
    subscription: {
      id: 'sub-01',
      tier: 'pro',
      status: 'active',
      startDate: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 9999 * 24 * 60 * 60 * 1000).toISOString(),
      daysRemaining: 9999,
      allowCustomAssets: true,
      allowPersonalizedGuests: true,
      allowWaBroadcast: true,
      maxGuests: 5000,
      weddingSlug: 'arya-sekar',
      templateId: 'javanese-royal',
    },
    wishesCount: 38,
    confirmedGuests: 284,
  },
  {
    id: 'cli-02',
    groomBrideNames: 'Dimas Wicaksono & Annisa Larasati',
    email: 'dimas.annisa@gmail.com',
    phone: '0813-9876-5432',
    weddingDate: '12 Desember 2026',
    templateId: 'sundanese-romance',
    slug: 'dimas-annisa',
    subscription: {
      id: 'sub-02',
      tier: 'free',
      status: 'active',
      startDate: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 9999 * 24 * 60 * 60 * 1000).toISOString(),
      daysRemaining: 9999,
      allowCustomAssets: false,
      allowPersonalizedGuests: false,
      allowWaBroadcast: false,
      maxGuests: 1,
      weddingSlug: 'dimas-annisa',
      templateId: 'sundanese-romance',
    },
    wishesCount: 5,
    confirmedGuests: 14,
  },
  {
    id: 'cli-03',
    groomBrideNames: 'Rendy Syahputra & Citra Kirana',
    email: 'rendy.citra@gmail.com',
    phone: '0852-7788-9900',
    weddingDate: '05 Januari 2027',
    templateId: 'minang-heritage',
    slug: 'rendy-citra',
    subscription: {
      id: 'sub-03',
      tier: 'vip_agency',
      status: 'active',
      startDate: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 9999 * 24 * 60 * 60 * 1000).toISOString(),
      daysRemaining: 9999,
      allowCustomAssets: true,
      allowPersonalizedGuests: true,
      allowWaBroadcast: true,
      maxGuests: 10000,
      weddingSlug: 'rendy-citra',
      templateId: 'minang-heritage',
    },
    wishesCount: 0,
    confirmedGuests: 0,
    assignedDesigner: 'Maya Danastri, S.Ds.',
    vipOrderStatus: 'in_progress',
  },
  {
    id: 'cli-04',
    groomBrideNames: 'Farhan Maulana & Nabila Zahra',
    email: 'farhan.nabila@gmail.com',
    phone: '0818-4433-2211',
    weddingDate: '15 Oktober 2026',
    templateId: 'islamic-elegance',
    slug: 'farhan-nabila',
    subscription: {
      id: 'sub-04',
      tier: 'pro',
      status: 'active',
      startDate: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 9999 * 24 * 60 * 60 * 1000).toISOString(),
      daysRemaining: 9999,
      allowCustomAssets: true,
      allowPersonalizedGuests: true,
      allowWaBroadcast: true,
      maxGuests: 5000,
      weddingSlug: 'farhan-nabila',
      templateId: 'islamic-elegance',
    },
    wishesCount: 72,
    confirmedGuests: 410,
  },
];

export const INITIAL_TRANSACTIONS: PaymentTransaction[] = [
  {
    id: 'TRX-9821',
    clientName: 'Raden Arya & Sekar Ayu',
    email: 'klien.arya@gmail.com',
    tier: 'pro',
    amountIdr: 99000,
    paymentMethod: 'BCA Transfer / QRIS',
    status: 'verified',
    createdAt: '28 Okt 2026, 14:20 WIB',
  },
  {
    id: 'TRX-9822',
    clientName: 'Rendy Syahputra & Citra Kirana',
    email: 'rendy.citra@gmail.com',
    tier: 'vip_agency',
    amountIdr: 299000,
    paymentMethod: 'Mandiri Transfer',
    status: 'verified',
    createdAt: '30 Okt 2026, 09:15 WIB',
  },
  {
    id: 'TRX-9823',
    clientName: 'Gilang Ramadhan & Putri Maharani',
    email: 'gilang.putri@gmail.com',
    tier: 'pro',
    amountIdr: 99000,
    paymentMethod: 'QRIS Gopay/OVO',
    status: 'pending',
    createdAt: 'Hari ini, 10:45 WIB',
  },
];

export class SaasAuthService {
  static getCurrentUser(): UserProfile {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      if (raw) return JSON.parse(raw);
    } catch {
      // Fallback
    }
    return DEMO_PROFILES.user;
  }

  static setCurrentUser(user: UserProfile) {
    try {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    } catch {}
  }

  static getCurrentSubscription(): ClientSubscription {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.CURRENT_SUB);
      if (raw) return JSON.parse(raw);
    } catch {}
    return INITIAL_CLIENTS[0].subscription;
  }

  static setCurrentSubscription(sub: ClientSubscription) {
    try {
      localStorage.setItem(STORAGE_KEYS.CURRENT_SUB, JSON.stringify(sub));
    } catch {}
  }

  static getClients(): ClientAccountSummary[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.CLIENTS_LIST);
      if (raw) return JSON.parse(raw);
    } catch {}
    return INITIAL_CLIENTS;
  }

  static saveClients(clients: ClientAccountSummary[]) {
    try {
      localStorage.setItem(STORAGE_KEYS.CLIENTS_LIST, JSON.stringify(clients));
    } catch {}
  }

  static getPricingPlans(): PricingPlanConfig[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.PRICING_PLANS);
      if (raw) return JSON.parse(raw);
    } catch {}
    return INITIAL_PRICING_PLANS;
  }

  static savePricingPlans(plans: PricingPlanConfig[]) {
    try {
      localStorage.setItem(STORAGE_KEYS.PRICING_PLANS, JSON.stringify(plans));
    } catch {}
  }

  static getTransactions(): PaymentTransaction[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
      if (raw) return JSON.parse(raw);
    } catch {}
    return INITIAL_TRANSACTIONS;
  }

  static saveTransactions(txs: PaymentTransaction[]) {
    try {
      localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(txs));
    } catch {}
  }

  /**
   * 1-Click Role Switcher for seamless live presentation.
   * "Sekali Bayar, Aktif Selamanya" — no expiry logic for paid tiers.
   */
  static switchRole(role: UserRole, targetTier?: SubscriptionTier): { user: UserProfile; sub: ClientSubscription } {
    const user = { ...DEMO_PROFILES[role] };
    this.setCurrentUser(user);

    let sub = this.getCurrentSubscription();
    if (role === 'user') {
      const tier = targetTier || sub.tier || 'pro';
      sub = {
        ...sub,
        tier,
        status: 'active',
        daysRemaining: 9999,
        allowCustomAssets: tier !== 'free',
        allowPersonalizedGuests: tier !== 'free',
        allowWaBroadcast: tier !== 'free',
      };
      this.setCurrentSubscription(sub);
    }

    return { user, sub };
  }

  /**
   * Action: Extend subscription (+30 days) by Admin or Finance
   */
  static extendClientSubscription(clientId: string, additionalDays = 30): ClientAccountSummary[] {
    const clients = this.getClients();
    const updated = clients.map((c) => {
      if (c.id === clientId) {
        const currentExp = new Date(c.subscription.expiresAt).getTime();
        const base = currentExp > Date.now() ? currentExp : Date.now();
        const newExpiry = new Date(base + additionalDays * 24 * 60 * 60 * 1000).toISOString();
        const daysRemaining = Math.max(1, Math.round((new Date(newExpiry).getTime() - Date.now()) / (1000 * 60 * 60 * 24)));

        return {
          ...c,
          subscription: {
            ...c.subscription,
            status: 'active' as const,
            expiresAt: newExpiry,
            daysRemaining,
            allowCustomAssets: true,
            allowPersonalizedGuests: true,
            allowWaBroadcast: true,
          },
        };
      }
      return c;
    });

    this.saveClients(updated);

    // If active user is the modified client, sync current sub
    const currentSub = this.getCurrentSubscription();
    const matched = updated.find((c) => c.id === clientId);
    if (matched && matched.slug === currentSub.weddingSlug) {
      this.setCurrentSubscription(matched.subscription);
    }

    return updated;
  }

  /**
   * Action: Change client tier (e.g. Free -> Pro -> VIP)
   */
  static changeClientTier(clientId: string, newTier: SubscriptionTier): ClientAccountSummary[] {
    const clients = this.getClients();
    const updated = clients.map((c) => {
      if (c.id === clientId) {
        return {
          ...c,
          subscription: {
            ...c.subscription,
            tier: newTier,
            status: 'active' as const,
            allowCustomAssets: newTier !== 'free',
            allowPersonalizedGuests: newTier !== 'free',
            allowWaBroadcast: newTier !== 'free',
          },
        };
      }
      return c;
    });

    this.saveClients(updated);
    return updated;
  }

  /**
   * Action: Verify transaction by Finance
   */
  static verifyTransaction(txId: string): PaymentTransaction[] {
    const txs = this.getTransactions();
    const updated = txs.map((tx) => {
      if (tx.id === txId) {
        return { ...tx, status: 'verified' as const };
      }
      return tx;
    });
    this.saveTransactions(updated);
    return updated;
  }
}
