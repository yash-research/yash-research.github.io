(function () {
  const storageKey = 'theme';
  const root = document.documentElement;

  function getStoredTheme() {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored === 'light' || stored === 'dark') return stored;
    } catch (error) {
      return null;
    }
    return null;
  }

  function getPreferredTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    root.dataset.theme = theme;

    document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
      const nextTheme = theme === 'dark' ? 'light' : 'dark';
      button.dataset.nextTheme = nextTheme;
      button.setAttribute('aria-pressed', String(theme === 'dark'));
      button.setAttribute('aria-label', `Switch to ${nextTheme} mode`);
      button.setAttribute('title', `Switch to ${nextTheme} mode`);
    });
  }

  function saveTheme(theme) {
    try {
      localStorage.setItem(storageKey, theme);
    } catch (error) {
      return;
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    const initialTheme = getStoredTheme() || root.dataset.theme || getPreferredTheme();
    applyTheme(initialTheme);

    document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
      button.addEventListener('click', function () {
        const currentTheme = root.dataset.theme === 'dark' ? 'dark' : 'light';
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
        saveTheme(nextTheme);
        applyTheme(nextTheme);
      });
    });
  });
})();
