import { atom } from "recoil";

const DARKMODE_LS = "darkMode";

const loadDarkMode = (): boolean | null => {
  const loadedDarkMode = localStorage.getItem(DARKMODE_LS);
  if (!loadedDarkMode) return null;

  return JSON.parse(loadedDarkMode);
};

export const saveDarkMode = (isDarkMode: boolean) => {
  localStorage.setItem(DARKMODE_LS, JSON.stringify(isDarkMode));
};

export const isDarkModeAtom = atom<boolean>({
  key: "isDarkMode",
  default: loadDarkMode() ?? true,
});

export const HOME_TITLE = "Coins";

export const siteTitleAtom = atom<string>({
  key: "siteTitle",
  default: HOME_TITLE,
});
