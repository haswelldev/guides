// Per-visitor preferences shared by every page. Storage can be unavailable (private mode,
// blocked site data), so every access is guarded and pages must work without it.
const THEME_KEY = 'l2guides-theme-v1';
const CHRONICLE_KEY = 'l2guides-chronicle-v1';
const CHRONICLE_EVENT = 'l2guides:chronicle';

export type Theme = 'auto' | 'light' | 'dark';

function read(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function write(key: string, value: string | null) {
  try {
    if (value === null) localStorage.removeItem(key);
    else localStorage.setItem(key, value);
  } catch {}
}

export function getTheme(): Theme {
  const t = read(THEME_KEY);
  return t === 'light' || t === 'dark' ? t : 'auto';
}

export function setTheme(theme: Theme) {
  write(THEME_KEY, theme === 'auto' ? null : theme);
  if (theme === 'auto') delete document.documentElement.dataset.theme;
  else document.documentElement.dataset.theme = theme;
}

export function getChronicle(): string | null {
  return read(CHRONICLE_KEY);
}

export function setChronicle(id: string | null) {
  write(CHRONICLE_KEY, id);
  document.dispatchEvent(new CustomEvent(CHRONICLE_EVENT, { detail: id }));
}

/** Calls `fn` now and whenever the visitor picks another chronicle. */
export function onChronicle(fn: (id: string | null) => void) {
  fn(getChronicle());
  document.addEventListener(CHRONICLE_EVENT, (e) => fn((e as CustomEvent<string | null>).detail));
}

/** Elements carry the chronicles they apply to as `data-chronicles="c5 interlude …"`. */
export function covers(el: HTMLElement, id: string): boolean {
  return (el.dataset.chronicles ?? '').split(' ').includes(id);
}

export function readProgress(key: string): Record<string, 1> {
  try {
    return JSON.parse(read(key) ?? '{}') ?? {};
  } catch {
    return {};
  }
}

export function writeProgress(key: string, state: Record<string, 1>) {
  write(key, JSON.stringify(state));
}
