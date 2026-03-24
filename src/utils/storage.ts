import type { Greeting, Session } from '../types/greeting';

const SESSION_KEY = 'pawfect_session';
const GREETING_PREFIX = 'greeting_';

export const encodeDataToUrl = (data: any): string => {
  try {
    return encodeURIComponent(btoa(unescape(encodeURIComponent(JSON.stringify(data)))));
  } catch (e) {
    return '';
  }
};

export const decodeDataFromUrl = (encoded: string): any => {
  try {
    return JSON.parse(decodeURIComponent(escape(atob(decodeURIComponent(encoded)))));
  } catch (e) {
    return null;
  }
};

export const getSession = (): Session => {
  try {
    const data = localStorage.getItem(SESSION_KEY);
    if (data) return JSON.parse(data);
  } catch (e) {
    console.warn('Failed to parse session', e);
  }
  return { greetingIds: [], lastActive: Date.now() };
};

export const saveSession = (session: Session) => {
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } catch (e) {
    console.error('Failed to save session, likely quota exceeded.', e);
  }
};

export const getGreeting = (id: string): Greeting | null => {
  try {
    const data = localStorage.getItem(`${GREETING_PREFIX}${id}`);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    console.error('Failed to parse greeting', e);
    return null;
  }
};

export const saveGreeting = (greeting: Greeting) => {
  try {
    const existing = getGreeting(greeting.id);
    if (!existing) {
      const session = getSession();
      if (!session.greetingIds.includes(greeting.id)) {
        session.greetingIds.push(greeting.id);
      }
      session.lastActive = Date.now();
      saveSession(session);
    }
    localStorage.setItem(`${GREETING_PREFIX}${greeting.id}`, JSON.stringify(greeting));
  } catch (e) {
    console.error('Failed to save greeting. Quota likely exceeded due to images.', e);
  }
};

export const getAllMyGreetings = (): Greeting[] => {
  const session = getSession();
  return session.greetingIds
    .map(getGreeting)
    .filter((g): g is Greeting => g !== null)
    .sort((a, b) => b.createdAt - a.createdAt);
};

export const deleteGreeting = (id: string) => {
  try {
    localStorage.removeItem(`${GREETING_PREFIX}${id}`);
    const session = getSession();
    session.greetingIds = session.greetingIds.filter(gid => gid !== id);
    saveSession(session);
  } catch (e) {
    console.error('Failed to delete greeting', e);
  }
}

// Basic image compression utility to prevent localstorage capping out quickly (limit 5MB).
export const compressImage = (base64: string, maxWidth = 1000): Promise<string> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = base64;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let { width, height } = img;
      
      if (width > maxWidth) {
        height = Math.floor(height * (maxWidth / width));
        width = maxWidth;
      }
      
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.8));
      } else {
        resolve(base64); // Fallback
      }
    };
    img.onerror = () => resolve(base64);
  });
};
