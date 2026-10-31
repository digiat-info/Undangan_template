export type TemplateId =
  | 'javanese-royal'
  | 'sundanese-romance'
  | 'minang-heritage'
  | 'balinese-sacred'
  | 'islamic-elegance'
  | 'modern-nusantara';

export type WorkflowStage =
  | '01-catalog'
  | '02-selection'
  | '03-customization'
  | '04-publishing'
  | '05-guest-experience';

export interface ColorPalette {
  id: string;
  name: string;
  canvas: string;       // Main background color
  surface: string;      // Elevated card/panel surface
  primaryText: string;  // Main typography color
  mutedText: string;    // Secondary / auxiliary text
  accent: string;       // Foil / metallic / primary CTA accent
  border: string;       // Hairline rules & frames
  ceremonialDark: string; // High-contrast dark section backdrop
}

export interface TypographyConfig {
  displayFont: string;
  bodyFont: string;
  headingTracking: string;
  vibeDescription: string;
}

export interface ProcessionEventModel {
  id: string;
  stageCode: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  philosophy: string;
  mapQuery: string;
}

export interface LoveStoryMilestone {
  year: string;
  phase: string;
  title: string;
  story: string;
}

export interface BankAccountModel {
  bankName: string;
  accountNumber: string;
  accountHolder: string;
}

export interface TemplateSchema {
  id: TemplateId;
  code: string;
  name: string;
  characterTagline: string;
  category: 'Adat Klasik' | 'Religi & Kaligrafi' | 'Editorial Kontemporer';
  cultureOrigin: string;
  religionContext: string;
  priceDisplay: string;
  artDirectionNotes: string;
  layoutArchetype:
    | 'kraton-pendopo'
    | 'priangan-botanical'
    | 'gonjong-geometric'
    | 'bali-paduraksa'
    | 'medina-arch'
    | 'kinfolk-editorial';
  typography: TypographyConfig;
  defaultPalette: ColorPalette;
  colorPresets: ColorPalette[];
  musicConfig: {
    title: string;
    ensemble: string;
    scaleName: string;
    bpm: number;
    notesHz: number[];
    droneHz: number;
    timbre: 'gamelan' | 'talempong' | 'rindik' | 'kacapi' | 'hasapi' | 'kecapi_bugis';
  };
  greetingHeader: string;
  openingScriptureOrPepatah: {
    quote: string;
    translation: string;
    source: string;
  };
  closingStatement: {
    honorificClosing: string;
    familySignature: string;
  };
  defaultData: {
    groomShort: string;
    groomFull: string;
    groomParents: string;
    groomInstagram: string;
    brideShort: string;
    brideFull: string;
    brideParents: string;
    brideInstagram: string;
    weddingDateISO: string;
    weddingDateDisplay: string;
    city: string;
    heroPhoto: string;
    groomPhoto: string;
    bridePhoto: string;
    closingPhoto: string;
    gallery: { url: string; caption: string }[];
    events: ProcessionEventModel[];
    loveStory: LoveStoryMilestone[];
    banks: BankAccountModel[];
    giftAddress: string;
  };
}

export interface ClientCustomization {
  templateId: TemplateId;
  palette: ColorPalette;
  groomShort: string;
  groomFull: string;
  groomParents: string;
  groomInstagram: string;
  brideShort: string;
  brideFull: string;
  brideParents: string;
  brideInstagram: string;
  weddingDateISO: string;
  weddingDateDisplay: string;
  city: string;
  heroPhoto: string;
  groomPhoto: string;
  bridePhoto: string;
  closingPhoto: string;
  gallery: { url: string; caption: string }[];
  loveStory: LoveStoryMilestone[];
  banks: BankAccountModel[];
  giftAddress: string;
  qrisImageUrl: string;
  guestRecipientName: string;
  guestRecipientLocation: string;
  slug: string;
  events: ProcessionEventModel[];
}
