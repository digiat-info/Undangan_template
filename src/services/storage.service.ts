import { ClientCustomization, ParallaxAssetConfig, TemplateId } from '../models/invitation.model';
import { GuestWish, INITIAL_GUEST_WISHES } from '../data/adatSuites';
import { getTemplateById } from '../data/templateRegistry';

const STORAGE_KEYS = {
  CUSTOMIZATIONS: 'digiat_client_customizations_v6',
  WISHES: 'digiat_guest_wishes_v1',
};

export class StorageService {
  static buildDefaultAssetConfig(templateId: TemplateId): ParallaxAssetConfig {
    const assets: Record<TemplateId, ParallaxAssetConfig> = {
      'javanese-royal': {
        enableParallax: true,
        parallaxIntensity: 'medium',
        bgTextureUrl: '/assets/motif_jawa/6541342_1560.jpg',
        bgTextureOpacity: 0.12,
        bgTextureBlendMode: 'luminosity',
        cornerOrnamentUrl: '/assets/motif_jawa/motif_jawa.png',
        cornerOrnamentOpacity: 0.85,
        sideBordersUrl: '/assets/motif_jawa/spanduk-mandala-abstrak.png',
        dividerOrnamentUrl: '/assets/motif_jawa/motif_jawa.png',
        floatingMotifs: true,
      },
      'sundanese-romance': {
        enableParallax: true,
        parallaxIntensity: 'subtle',
        bgTextureUrl: '',
        bgTextureOpacity: 0.10,
        bgTextureBlendMode: 'overlay',
        cornerOrnamentUrl: '',
        cornerOrnamentOpacity: 0.80,
        sideBordersUrl: '',
        dividerOrnamentUrl: '',
        floatingMotifs: true,
      },
      'minang-heritage': {
        enableParallax: true,
        parallaxIntensity: 'medium',
        bgTextureUrl: '',
        bgTextureOpacity: 0.14,
        bgTextureBlendMode: 'multiply',
        cornerOrnamentUrl: '',
        cornerOrnamentOpacity: 0.90,
        sideBordersUrl: '',
        dividerOrnamentUrl: '',
        floatingMotifs: true,
      },
      'balinese-sacred': {
        enableParallax: true,
        parallaxIntensity: 'medium',
        bgTextureUrl: '',
        bgTextureOpacity: 0.15,
        bgTextureBlendMode: 'luminosity',
        cornerOrnamentUrl: '',
        cornerOrnamentOpacity: 0.85,
        sideBordersUrl: '',
        dividerOrnamentUrl: '',
        floatingMotifs: true,
      },
      'islamic-elegance': {
        enableParallax: true,
        parallaxIntensity: 'subtle',
        bgTextureUrl: '',
        bgTextureOpacity: 0.10,
        bgTextureBlendMode: 'overlay',
        cornerOrnamentUrl: '',
        cornerOrnamentOpacity: 0.80,
        sideBordersUrl: '',
        dividerOrnamentUrl: '',
        floatingMotifs: true,
      },
      'modern-nusantara': {
        enableParallax: true,
        parallaxIntensity: 'subtle',
        bgTextureUrl: '',
        bgTextureOpacity: 0.08,
        bgTextureBlendMode: 'overlay',
        cornerOrnamentUrl: '',
        cornerOrnamentOpacity: 0.70,
        sideBordersUrl: '',
        dividerOrnamentUrl: '',
        floatingMotifs: false,
      },
    };
    return assets[templateId] || assets['javanese-royal'];
  }

  static buildDefaultCustomization(templateId: TemplateId): ClientCustomization {
    const tpl = getTemplateById(templateId);
    const d = tpl.defaultData;
    const slug = `${d.groomShort}-${d.brideShort}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    return {
      templateId: tpl.id,
      palette: { ...tpl.defaultPalette },
      groomShort: d.groomShort,
      groomFull: d.groomFull,
      groomParents: d.groomParents,
      groomInstagram: d.groomInstagram,
      brideShort: d.brideShort,
      brideFull: d.brideFull,
      brideParents: d.brideParents,
      brideInstagram: d.brideInstagram,
      weddingDateISO: d.weddingDateISO,
      weddingDateDisplay: d.weddingDateDisplay,
      city: d.city,
      heroPhoto: d.heroPhoto,
      groomPhoto: d.groomPhoto,
      bridePhoto: d.bridePhoto,
      closingPhoto: d.closingPhoto,
      gallery: d.gallery.map((g) => ({ ...g })),
      loveStory: d.loveStory.map((ls) => ({ ...ls })),
      banks: d.banks.map((b) => ({ ...b })),
      giftAddress: d.giftAddress,
      qrisImageUrl: '',
      guestRecipientName: 'Bapak/Ibu Raden Mas Suryo & Keluarga',
      guestRecipientLocation: 'Di Tempat',
      slug,
      events: d.events.map((ev) => ({ ...ev })),
      assetConfig: this.buildDefaultAssetConfig(tpl.id),
      audioConfig: {
        sourceType: 'preset_synth',
        customMp3Url: '',
        customMp3Title: tpl.musicConfig.title,
        customMp3Artist: tpl.musicConfig.ensemble,
        autoPlay: true,
      },
    };
  }

  static loadAllCustomizations(): Record<TemplateId, ClientCustomization> {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.CUSTOMIZATIONS);
      if (raw) {
        const parsed = JSON.parse(raw);
        // Ensure all templates exist with new fields populated
        const allIds: TemplateId[] = [
          'javanese-royal', 'sundanese-romance', 'minang-heritage',
          'balinese-sacred', 'islamic-elegance', 'modern-nusantara',
        ];
        let needsSave = false;
        for (const id of allIds) {
          if (!parsed[id]) {
            parsed[id] = this.buildDefaultCustomization(id);
            needsSave = true;
          } else {
            // Migrate: fill in missing fields from defaults
            const defaults = this.buildDefaultCustomization(id);
            const keys = Object.keys(defaults) as (keyof ClientCustomization)[];
            for (const key of keys) {
              if (parsed[id][key] === undefined) {
                (parsed[id] as Record<string, unknown>)[key] = defaults[key];
                needsSave = true;
              }
            }
          }
        }
        if (needsSave) {
          this.saveAllCustomizations(parsed);
        }
        return parsed;
      }
    } catch {
      // Fallback to default
    }
    return {
      'javanese-royal': this.buildDefaultCustomization('javanese-royal'),
      'sundanese-romance': this.buildDefaultCustomization('sundanese-romance'),
      'minang-heritage': this.buildDefaultCustomization('minang-heritage'),
      'balinese-sacred': this.buildDefaultCustomization('balinese-sacred'),
      'islamic-elegance': this.buildDefaultCustomization('islamic-elegance'),
      'modern-nusantara': this.buildDefaultCustomization('modern-nusantara'),
    };
  }

  static saveAllCustomizations(map: Record<TemplateId, ClientCustomization>) {
    try {
      localStorage.setItem(STORAGE_KEYS.CUSTOMIZATIONS, JSON.stringify(map));
    } catch {
      // Ignore quota errors
    }
  }

  static loadWishes(): GuestWish[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.WISHES);
      if (raw) {
        return JSON.parse(raw);
      }
    } catch {
      // Fallback
    }
    return INITIAL_GUEST_WISHES;
  }

  static saveWishes(wishes: GuestWish[]) {
    try {
      localStorage.setItem(STORAGE_KEYS.WISHES, JSON.stringify(wishes));
    } catch {
      // Ignore quota errors
    }
  }
}
