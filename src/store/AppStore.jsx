// src/store/AppStore.jsx
// Estado global mock (equipos, jugadores, competencias, partidos) con persistencia en localStorage.
// En producción esto se reemplaza por servicios de Firestore.
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { buildSeed, generateMatches, uid, NEWS } from '../data/mock';

const KEY = 'copa-amistad:data:v2';
const AppCtx = createContext(null);

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.teams && parsed.competitions) {
        if (!parsed.news) parsed.news = NEWS.map((n) => ({ ...n }));
        return parsed;
      }
    }
  } catch { /* ignora */ }
  return buildSeed();
}

export function AppStoreProvider({ children }) {
  const [data, setData] = useState(load);

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(data)); } catch { /* ignora */ }
  }, [data]);

  const api = useMemo(() => ({
    data,
    resetData: () => setData(buildSeed()),

    // Equipos
    addTeam: (t) => setData((d) => ({
      ...d,
      teams: [...d.teams, { id: uid(), c1: '#3b82f6', c2: '#1e3a8a', ...t }],
    })),
    deleteTeam: (id) => setData((d) => ({
      ...d,
      teams: d.teams.filter((t) => t.id !== id),
      players: d.players.filter((p) => p.teamId !== id),
      matches: d.matches.filter((m) => m.homeId !== id && m.awayId !== id),
    })),

    // Jugadores
    addPlayer: (p) => setData((d) => ({ ...d, players: [...d.players, { id: uid(), ...p }] })),
    deletePlayer: (id) => setData((d) => ({ ...d, players: d.players.filter((p) => p.id !== id) })),

    // Competencias
    addCompetition: (c) => setData((d) => {
      const comp = { id: uid(), played: 0, champ: false, ...c };
      const matches = generateMatches(comp, d.teams, d.players);
      return { ...d, competitions: [...d.competitions, comp], matches: [...d.matches, ...matches] };
    }),
    deleteCompetition: (id) => setData((d) => ({
      ...d,
      competitions: d.competitions.filter((c) => c.id !== id),
      matches: d.matches.filter((m) => m.compId !== id),
    })),

    // Notas / noticias
    addNote: (n) => setData((d) => ({
      ...d,
      news: [{ id: uid(), wm: (n.cat || 'N')[0].toUpperCase(), feat: false, ...n }, ...d.news],
    })),
    updateNote: (id, patch) => setData((d) => ({
      ...d,
      news: d.news.map((n) => (n.id === id ? { ...n, ...patch } : n)),
    })),
    deleteNote: (id) => setData((d) => ({ ...d, news: d.news.filter((n) => n.id !== id) })),

    // Resultados
    saveResult: (matchId, homeGoals, awayGoals, scorers) => setData((d) => ({
      ...d,
      matches: d.matches.map((m) => m.id === matchId
        ? { ...m, status: 'played', homeGoals: Number(homeGoals), awayGoals: Number(awayGoals), scorers: scorers || [] }
        : m),
    })),
  }), [data]);

  return <AppCtx.Provider value={api}>{children}</AppCtx.Provider>;
}

export function useStore() {
  const ctx = useContext(AppCtx);
  if (!ctx) throw new Error('useStore debe usarse dentro de AppStoreProvider');
  return ctx;
}
