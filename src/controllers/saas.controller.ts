/**
 * SaaS Controller
 * Handles application business logic, user session state transformations,
 * guest link formatting, and role dashboard routing following the MVC pattern.
 */

import { UserRole, SubscriptionTier, ClientSubscription, UserProfile } from '../models/saas.model';
import { SaasAuthService } from '../services/saasAuth.service';
import { buildWhatsAppUrl, WA_TEMPLATES } from '../config/business.config';

export interface SubscriptionAlert {
  type: 'active' | 'warning' | 'expired';
  text: string;
  action?: string;
  color: string;
  actionUrl?: string;
}

export class SaasController {
  /**
   * Switch the current active user role and tier.
   */
  static switchUserRole(role: UserRole, targetTier?: SubscriptionTier): { user: UserProfile; sub: ClientSubscription } {
    return SaasAuthService.switchRole(role, targetTier);
  }

  /**
   * Determine subscription status alert for display in views.
   */
  static getSubscriptionAlert(sub: ClientSubscription, role: UserRole): SubscriptionAlert | null {
    if (role !== 'user') return null;
    if (sub.tier === 'free') return null;

    if (sub.status === 'expired') {
      return {
        type: 'expired',
        text: 'Masa aktif paket telah habis. Editing terkunci, namun tamu tetap bisa membuka undangan.',
        action: 'Hubungi Admin untuk Perpanjangan',
        color: 'bg-red-600',
        actionUrl: buildWhatsAppUrl(WA_TEMPLATES.renewalOrUpgrade),
      };
    }

    if (sub.daysRemaining <= 7) {
      return {
        type: 'warning',
        text: `Sisa ${sub.daysRemaining} hari masa aktif paket ${sub.tier === 'vip_agency' ? 'VIP' : 'Pro'}.`,
        action: 'Hubungi Admin untuk Perpanjangan',
        color: 'bg-amber-600',
        actionUrl: buildWhatsAppUrl(WA_TEMPLATES.renewalOrUpgrade),
      };
    }

    return {
      type: 'active',
      text: `Sisa ${sub.daysRemaining} Hari`,
      color: 'bg-emerald-600',
    };
  }

  /**
   * Generates a fully qualified guest link for invitations.
   */
  static generateGuestUrl(baseUrl: string, templateId: string, guestName: string): string {
    return `${baseUrl}/?template=${encodeURIComponent(templateId)}&to=${encodeURIComponent(guestName)}&demo=true`;
  }

  /**
   * Generates WhatsApp message text for inviting a specific guest.
   */
  static generateGuestWhatsAppText(params: {
    guestName: string;
    groomShort: string;
    brideShort: string;
    guestUrl: string;
  }): string {
    return [
      `Kepada Yth. Bapak/Ibu/Saudara/i`,
      `*${params.guestName}*`,
      ``,
      `Tanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan putra-putri kami:`,
      ``,
      `*${params.groomShort} & ${params.brideShort}*`,
      ``,
      `Berikut tautan undangan digital resmi untuk membuka sampul & rincian acara:`,
      params.guestUrl,
      ``,
      `Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila berkenan hadir dan memberikan doa restu.`,
      ``,
      `Terima kasih.`,
    ].join('\n');
  }

  /**
   * Helper to build a WhatsApp direct link to order a specific package
   */
  static getOrderWhatsAppUrl(planName: string, formattedPrice: string): string {
    return buildWhatsAppUrl(WA_TEMPLATES.orderPlan(planName, formattedPrice));
  }
}
