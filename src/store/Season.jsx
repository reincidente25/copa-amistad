// src/store/Season.jsx — temporada seleccionada (año)
import { createContext, useContext, useState } from 'react';
import { CURRENT_SEASON, SEASONS } from '../data/mock';

const KEY = 'copa-amistad:season:v1';
const Ctx = createContext(null);

function load() {
  try {
    const v = Number(localStorage.getItem(KEY));
    if (SEASONS.includes(v)) return v;
  } catch { /* ignora */ }
  return CURRENT_SEASON;
}

export function SeasonProvider({ children }) {
  const [season, setSeasonState] = useState(load);
  const setSeason = (y) => {
    setSeasonState(y);
    try { localStorage.setItem(KEY, String(y)); } catch { /* ignora */ }
  };
  return <Ctx.Provider value={{ season, setSeason, seasons: SEASONS, current: CURRENT_SEASON }}>{children}</Ctx.Provider>;
}

export function useSeason() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useSeason debe usarse dentro de SeasonProvider');
  return ctx;
}
