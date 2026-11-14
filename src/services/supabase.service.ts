import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ClientCustomization } from '../models/invitation.model';
import { GuestWish } from '../data/adatSuites';

// Read Supabase environment variables configured in Vite (.env / Vercel Environment Variables)
const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL || '').trim();
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim();

export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl.startsWith('https://') &&
    supabaseAnonKey.length > 20
  );
};

export const supabase: SupabaseClient | null = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export class SupabaseService {
  /**
   * Upload an image asset (Background wallpaper, Corner motif, Hero/Groom/Bride photo, QRIS).
   * - If Supabase Storage is configured: uploads to 'wedding-assets' bucket and returns Public CDN URL.
   * - Fallback (Offline / Local Dev): reads file as Base64 Data URL so the app continues working flawlessly.
   */
  static async uploadAsset(file: File, folder = 'general'): Promise<string> {
    if (isSupabaseConfigured() && supabase) {
      try {
        const fileExt = file.name.split('.').pop() || 'png';
        const cleanName = file.name.replace(/[^a-zA-Z0-9]/g, '_');
        const fileName = `${folder}/${Date.now()}_${cleanName}.${fileExt}`;

        const { data, error } = await supabase.storage
          .from('wedding-assets')
          .upload(fileName, file, {
            cacheControl: '3600',
            upsert: true,
          });

        if (error) {
          console.warn('[Supabase Storage] Upload error, falling back to Base64:', error.message);
        } else if (data?.path) {
          const { data: publicUrlData } = supabase.storage
            .from('wedding-assets')
            .getPublicUrl(data.path);
          if (publicUrlData?.publicUrl) {
            return publicUrlData.publicUrl;
          }
        }
      } catch (err) {
        console.warn('[Supabase Storage] Exception, falling back to Base64:', err);
      }
    }

    // Fallback: Read file as Data URL (Base64) for instant zero-dependency local testing
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }

  /**
   * Save / Upsert invitation customization to Supabase 'invitations' table.
   */
  static async saveInvitation(custom: ClientCustomization): Promise<boolean> {
    if (!isSupabaseConfigured() || !supabase) return false;

    try {
      const payload = {
        slug: custom.slug,
        template_id: custom.templateId,
        palette: custom.palette,
        groom_short: custom.groomShort,
        groom_full: custom.groomFull,
        groom_parents: custom.groomParents,
        groom_instagram: custom.groomInstagram,
        bride_short: custom.brideShort,
        bride_full: custom.brideFull,
        bride_parents: custom.brideParents,
        bride_instagram: custom.brideInstagram,
        wedding_date_iso: custom.weddingDateISO,
        wedding_date_display: custom.weddingDateDisplay,
        city: custom.city,
        hero_photo: custom.heroPhoto,
        groom_photo: custom.groomPhoto,
        bride_photo: custom.bridePhoto,
        closing_photo: custom.closingPhoto,
        gallery: custom.gallery,
        love_story: custom.loveStory,
        events: custom.events,
        banks: custom.banks,
        gift_address: custom.giftAddress,
        qris_image_url: custom.qrisImageUrl,
        asset_config: custom.assetConfig,
        audio_config: custom.audioConfig,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from('invitations')
        .upsert(payload, { onConflict: 'slug' });

      if (error) {
        console.warn('[Supabase DB] Error saving invitation:', error.message);
        return false;
      }
      return true;
    } catch (err) {
      console.warn('[Supabase DB] Exception saving invitation:', err);
      return false;
    }
  }

  /**
   * Load invitation customization by slug from Supabase.
   */
  static async loadInvitation(slug: string): Promise<ClientCustomization | null> {
    if (!isSupabaseConfigured() || !supabase) return null;

    try {
      const { data, error } = await supabase
        .from('invitations')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();

      if (error || !data) return null;

      return {
        templateId: data.template_id,
        palette: data.palette,
        groomShort: data.groom_short,
        groomFull: data.groom_full,
        groomParents: data.groom_parents,
        groomInstagram: data.groom_instagram,
        brideShort: data.bride_short,
        brideFull: data.bride_full,
        brideParents: data.bride_parents,
        brideInstagram: data.bride_instagram,
        weddingDateISO: data.wedding_date_iso,
        weddingDateDisplay: data.wedding_date_display,
        city: data.city,
        heroPhoto: data.hero_photo,
        groomPhoto: data.groom_photo,
        bridePhoto: data.bride_photo,
        closingPhoto: data.closing_photo,
        gallery: data.gallery || [],
        loveStory: data.love_story || [],
        events: data.events || [],
        banks: data.banks || [],
        giftAddress: data.gift_address || '',
        qrisImageUrl: data.qris_image_url || '',
        guestRecipientName: 'Tamu Undangan',
        guestRecipientLocation: 'Di Tempat',
        slug: data.slug,
        assetConfig: data.asset_config,
        audioConfig: data.audio_config,
      };
    } catch (err) {
      console.warn('[Supabase DB] Exception loading invitation:', err);
      return null;
    }
  }

  /**
   * Submit RSVP & wedding wishes to Supabase 'guest_wishes' table.
   */
  static async submitWish(invitationSlug: string, wish: GuestWish): Promise<boolean> {
    if (!isSupabaseConfigured() || !supabase) return false;

    try {
      const { error } = await supabase.from('guest_wishes').insert({
        invitation_slug: invitationSlug,
        guest_name: wish.name,
        relation: wish.relation,
        attendance: wish.attendance,
        guests_count: wish.guestsCount,
        message: wish.message,
        adat_tag: wish.adatTag,
      });

      if (error) {
        console.warn('[Supabase DB] Error inserting wish:', error.message);
        return false;
      }
      return true;
    } catch (err) {
      console.warn('[Supabase DB] Exception inserting wish:', err);
      return false;
    }
  }

  /**
   * Fetch wishes for an invitation from Supabase.
   */
  static async fetchWishes(invitationSlug: string): Promise<GuestWish[] | null> {
    if (!isSupabaseConfigured() || !supabase) return null;

    try {
      const { data, error } = await supabase
        .from('guest_wishes')
        .select('*')
        .eq('invitation_slug', invitationSlug)
        .order('created_at', { ascending: false });

      if (error || !data) return null;

      return data.map((row) => ({
        id: row.id,
        name: row.guest_name,
        relation: row.relation,
        attendance: row.attendance as 'Hadir' | 'Berhalangan',
        guestsCount: row.guests_count || 1,
        message: row.message,
        adatTag: row.adat_tag || 'Doa Restu',
        timestamp: row.created_at,
      }));
    } catch (err) {
      console.warn('[Supabase DB] Exception fetching wishes:', err);
      return null;
    }
  }
}
