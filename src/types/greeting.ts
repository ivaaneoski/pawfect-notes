export type Occasion = 'birthday' | 'anniversary' | 'thankyou' | 'congratulations' | 'custom' | 'any';
export type MessageStyle = 'normal' | 'handwritten';
export type FontStyle = 'serif' | 'script' | 'handwritten' | 'minimal';
export type StickerType = 'cat-orange' | 'cat-white' | 'cat-black' | 'paw-print' | 'cat-calico' | 'cat-siamese' | 'cat-gray' | 'yarn-ball' | 'heart' | 'star';
export type Position = 'top' | 'bottom' | 'corners' | 'scattered';

export interface Sticker {
  type: StickerType;
  position: Position;
}

export interface Reply {
  id: string;
  message: string;
  senderName: string | null;
  createdAt: number;
}

export interface Greeting {
  id: string;
  occasion: Occasion;
  theme: string;
  title: string;
  recipientName: string;
  message: string;
  messageStyle: MessageStyle;
  images: string[];
  youtubeUrl: string | null;
  stickers: Sticker[];
  fontStyle: FontStyle;
  backgroundColor: string;
  createdAt: number;
  viewCount: number;
  replies: Reply[];
}

export interface Session {
  greetingIds: string[];
  lastActive: number;
}

export interface ThemeDef {
  id: string;
  name: string;
  occasion: Occasion;
  palette: string;
  vibe: string;
  backgroundColor: string;
  accentColor: string;
  primaryFont: FontStyle;
}
