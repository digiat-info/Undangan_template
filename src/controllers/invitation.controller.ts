import {
  ClientCustomization,
  ColorPalette,
  TemplateId,
  TemplateSchema,
} from '../models/invitation.model';
import { TEMPLATE_REGISTRY, getTemplateById } from '../data/templateRegistry';
import { GuestWish } from '../data/adatSuites';
import { StorageService } from '../services/storage.service';
import { adatAudio } from '../utils/adatAudioEngine';
import { ADAT_SUITES } from '../data/adatSuites';

export class InvitationController {
  static getAllTemplates(): TemplateSchema[] {
    return TEMPLATE_REGISTRY;
  }

  static getTemplate(id: TemplateId): TemplateSchema {
    return getTemplateById(id);
  }

  static playTemplateAudio(id: TemplateId) {
    const tpl = getTemplateById(id);
    // Bridge TemplateSchema musicConfig into AdatAudioEngine
    const matchingAdat = ADAT_SUITES[0];
    adatAudio.start({
      ...matchingAdat,
      musicTrack: {
        ...tpl.musicConfig,
      },
    });
  }

  static ringTemplateGong(id: TemplateId) {
    const tpl = getTemplateById(id);
    adatAudio.playCeremonialGong(tpl.musicConfig.droneHz);
  }

  static updateColorField(
    current: ClientCustomization,
    field: keyof Omit<ColorPalette, 'id' | 'name'>,
    hexValue: string
  ): ClientCustomization {
    return {
      ...current,
      palette: {
        ...current.palette,
        id: 'custom-client',
        name: 'Warna Kustom Klien',
        [field]: hexValue,
      },
    };
  }

  static applyColorPreset(
    current: ClientCustomization,
    preset: ColorPalette
  ): ClientCustomization {
    return {
      ...current,
      palette: { ...preset },
    };
  }

  static resetTemplateDefaults(templateId: TemplateId): ClientCustomization {
    return StorageService.buildDefaultCustomization(templateId);
  }

  static createNewWish(
    existingWishes: GuestWish[],
    payload: {
      name: string;
      relation: string;
      attendance: 'Hadir' | 'Berhalangan';
      guestsCount: number;
      message: string;
      adatTag: string;
    }
  ): GuestWish[] {
    const newEntry: GuestWish = {
      id: `wish-${Date.now()}`,
      name: payload.name.trim(),
      relation: payload.relation.trim() || 'Tamu Kehormatan',
      attendance: payload.attendance,
      guestsCount: payload.attendance === 'Hadir' ? payload.guestsCount : 0,
      message: payload.message.trim(),
      timestamp: 'Baru saja',
      adatTag: payload.adatTag,
      isNew: true,
    };

    const updated = [
      newEntry,
      ...existingWishes.map((w) => ({ ...w, isNew: false })),
    ];
    StorageService.saveWishes(updated);
    return updated;
  }

  static generateWhatsAppShareText(custom: ClientCustomization): string {
    const url = `${window.location.origin}/?undangan=${encodeURIComponent(
      custom.slug
    )}&kepada=${encodeURIComponent(custom.guestRecipientName)}`;

    return [
      `Kepada Yth. *${custom.guestRecipientName}*`,
      `${custom.guestRecipientLocation}`,
      ``,
      `Tanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri pernikahan kami:`,
      ``,
      `*${custom.groomFull}*`,
      `&`,
      `*${custom.brideFull}*`,
      ``,
      `📅 ${custom.weddingDateDisplay}`,
      `📍 ${custom.city}`,
      ``,
      `Tautan Undangan Digital Resmi (DIGIAT):`,
      `${url}`,
      ``,
      `Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.`,
    ].join('\n');
  }
}
