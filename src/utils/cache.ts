class LocalCache {
  setCache(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getCache(key: string) {
    const value = localStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
  }

  deleteCache(key: string): void {
    localStorage.removeItem(key);
  }

  cleanCache() {
    localStorage.clear();
  }
}

export default new LocalCache();
