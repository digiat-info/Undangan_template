/**
 * Business Configuration & Brand Constants
 * Centralized configuration following Clean Code principles (DRY & Single Source of Truth).
 */

export const BUSINESS_CONFIG = {
  brand: {
    name: 'DIGIAT',
    fullName: 'DIGIAT Studio',
    tagline: 'STUDIO UNDANGAN ADAT & MODERN',
    subtagline: 'Platform & Studio Desain Undangan Digital Pernikahan Premium Indonesia',
    logoUrl: 'https://digiatgroup.com/img/digiat.png',
    domain: 'undangan.digiatgroup.com',
  },
  contact: {
    waNumber: '6285211326143',
    waDisplay: '0852-1132-6143',
    email: 'support@digiatgroup.com',
  },
  defaults: {
    currency: 'IDR',
    currencyPrefix: 'Rp ',
    defaultGuestRecipient: 'Tamu Undangan',
    defaultSlug: 'arya-sekar',
    defaultTemplateId: 'javanese-royal',
  },
} as const;

/**
 * Helper to construct WhatsApp click-to-chat URL with pre-filled message
 */
export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${BUSINESS_CONFIG.contact.waNumber}?text=${encodeURIComponent(message)}`;
}

/**
 * Pre-defined WhatsApp message templates for high-conversion CTAs
 */
export const WA_TEMPLATES = {
  generalInquiry: 'Halo Admin DIGIAT Studio, saya mau tanya & konsultasi undangan digital pernikahan. Bisa info selengkapnya?',
  orderPlan: (planName: string, price: string) =>
    `Halo Admin DIGIAT Studio, saya tertarik memesan *${planName}* (${price} sekali bayar). Mohon info langkah pemesanan dan pengiriman data pengantinnya ya. Terima kasih!`,
  consultDesigner: 'Halo Tim Desainer DIGIAT Studio, saya ingin konsultasi tema adat kustom dan paket VIP Terima Beres untuk pernikahan saya.',
  renewalOrUpgrade: 'Halo Admin DIGIAT, saya ingin konsultasi perpanjangan / upgrade paket undangan pernikahan saya.',
};
