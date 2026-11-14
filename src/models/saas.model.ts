import { TemplateId } from './invitation.model';

export type UserRole = 'user' | 'admin' | 'designer' | 'finance';

export type SubscriptionTier = 'free' | 'pro' | 'vip_agency';

export type SubscriptionStatus = 'active' | 'expiring' | 'expired';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatarUrl?: string;
}

export interface ClientSubscription {
  id: string;
  tier: SubscriptionTier;
  status: SubscriptionStatus;
  startDate: string; // ISO String
  expiresAt: string; // ISO String
  daysRemaining: number;
  allowCustomAssets: boolean;
  allowPersonalizedGuests: boolean;
  allowWaBroadcast: boolean;
  maxGuests: number;
  weddingSlug: string;
  templateId: TemplateId;
}

export interface ClientAccountSummary {
  id: string;
  groomBrideNames: string;
  email: string;
  phone: string;
  weddingDate: string;
  templateId: TemplateId;
  slug: string;
  subscription: ClientSubscription;
  wishesCount: number;
  confirmedGuests: number;
  assignedDesigner?: string;
  vipOrderStatus?: 'pending' | 'in_progress' | 'review' | 'completed';
}

export interface AgencyOrder {
  id: string;
  clientAccountId: string;
  groomBrideNames: string;
  templateId: TemplateId;
  assignedDesigner: string;
  status: 'pending' | 'in_progress' | 'review' | 'completed';
  notes: string;
  createdAt: string;
  deadline: string;
}

export interface PricingPlanConfig {
  id: SubscriptionTier;
  name: string;
  priceIdr: number;
  formattedPrice: string;
  durationLabel: string;
  description: string;
  badge: string;
  features: string[];
  recommended?: boolean;
}

export interface PaymentTransaction {
  id: string;
  clientName: string;
  email: string;
  tier: SubscriptionTier;
  amountIdr: number;
  paymentMethod: string;
  status: 'verified' | 'pending';
  proofImageUrl?: string;
  createdAt: string;
}
