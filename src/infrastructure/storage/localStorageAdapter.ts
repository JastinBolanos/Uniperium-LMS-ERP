const PREFIX = 'uniperium_lms_';

export const storageAdapter = {
  get<T>(key: string, defaultValue: T): T {
    try {
      const fullKey = `${PREFIX}${key}`;
      const item = localStorage.getItem(fullKey);
      if (item === null) return defaultValue;
      return JSON.parse(item) as T;
    } catch (e) {
      console.warn(`[StorageAdapter] Failed to load key: ${key}`, e);
      return defaultValue;
    }
  },

  set<T>(key: string, value: T): void {
    try {
      const fullKey = `${PREFIX}${key}`;
      localStorage.setItem(fullKey, JSON.stringify(value));
    } catch (e) {
      console.warn(`[StorageAdapter] Failed to save key: ${key}`, e);
    }
  },

  remove(key: string): void {
    try {
      const fullKey = `${PREFIX}${key}`;
      localStorage.removeItem(fullKey);
    } catch (e) {
      console.warn(`[StorageAdapter] Failed to remove key: ${key}`, e);
    }
  },

  clearAll(): void {
    try {
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(PREFIX)) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach((k) => localStorage.removeItem(k));
    } catch (e) {
      console.warn('[StorageAdapter] Failed to clear items', e);
    }
  },
};
