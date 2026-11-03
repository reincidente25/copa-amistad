// src/data/mock.js
// Datos de ejemplo + generador de partidos. Todo mock: en el futuro esto sale de Firestore.

export const TEAMS = [
  { id: 'pibes',   name: 'Los Pibes FC',      abbr: 'LPF', c1: '#3b82f6', c2: '#1e3a8a' },
  { id: 'central', name: 'Deportivo Central',  abbr: 'DCE', c1: '#ef4444', c2: '#7f1d1d' },
  { id: 'norte',   name: 'Atlético Norte',     abbr: 'ANO', c1: '#22c55e', c2: '#14532d' },
  { id: 'racing',  name: 'Racing Amigos',      abbr: 'RAM', c1: '#06b6d4', c2: '#0e7490' },
  { id: 'garage',  name: 'FC Garage',          abbr: 'FCG', c1: '#f97316', c2: '#9a3412' },
  { id: 'potrero', name: 'Real Potrero',       abbr: 'RPO', c1: '#a855f7', c2: '#5b21b6' },
  { id: 'halcon',  name: 'Halcón del Oeste',   abbr: 'HAL', c1: '#eab308', c2: '#854d0e' },
  { id: 'sur',     name: 'Sportivo Sur',       abbr: 'SUR', c1: '#ec4899', c2: '#9d174d' },
  { id: 'ferro',   name: 'Ferro Amigos',       abbr: 'FER', c1: '#84cc16', c2: '#4d7c0f' },
  { id: 'union',   name: 'Unión Amistad',      abbr: 'UNI', c1: '#14b8a6', c2: '#0f766e' },
];

const PLAYER_NAMES = {
  pibes:   ['M. Sosa', 'F. Díaz', 'J. Vera'],
  central: ['L. Ferreyra', 'A. Godoy', 'M. Rearte'],
  norte:   ['D. Funes', 'C. Ibáñez', 'R. Luna'],
  racing:  ['R. Aquino', 'E. Paredes', 'T. Gómez'],
  garage:  ['G. Ojeda', 'B. Ramírez', 'N. Vera'],
  potrero: ['S. Domínguez', 'L. Castro', 'J. Pérez'],
  halcon:  ['H. Rivas', 'O. Medina', 'F. Soto'],
  sur:     ['P. Molina', 'D. Ayala', 'K. Romero'],
  ferro:   ['E. Benítez', 'W. Silva', 'A. Bravo'],
  union:   ['N. Cáceres', 'V. Herrera', 'L. Mansilla'],
};

// Zonas de clasificación a copas según la posición en la tabla general (ASUNCIÓN a confirmar).
const CLASIF = [
  { from: 1, to: 4, comp: 'libertadores', label: 'Copa Libertadores', color: '#c8961f' },
  { from: 5, to: 8, comp: 'sudamericana', label: 'Copa Sudamericana', color: '#b4452f' },
];

export const COMPETITIONS = [
  { id: 'clausura',    name: 'Liga Clausura',     short: 'Clausura',     cat: 'liga',     win: 'Jul – Nov', status: 'curso', color: '#13314b', c2: '#0a1826', champ: false, played: 4, months: ['Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre'], classif: CLASIF },
  { id: 'apertura',    name: 'Liga Apertura',     short: 'Apertura',     cat: 'liga',     win: 'Feb – Jun', status: 'fin',   color: '#13314b', c2: '#0a1826', champ: true,  played: 5, months: ['Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'], classif: CLASIF },
  { id: 'argentina',   name: 'Copa Argentina',    short: 'C. Argentina', cat: 'copa',     win: 'Feb – Jun', status: 'fin',   color: '#1e4e8c', c2: '#11294d', champ: true,  played: 3 },
  { id: 'libertadores',name: 'Copa Libertadores', short: 'Libertadores', cat: 'copa',     win: 'Jul – Oct', status: 'curso', color: '#c8961f', c2: '#8a6410', champ: false, played: 2 },
  { id: 'sudamericana',name: 'Copa Sudamericana', short: 'Sudamericana', cat: 'copa',     win: 'Jul – Oct', status: 'curso', color: '#b4452f', c2: '#7a2a1c', champ: false, played: 2 },
  { id: 'mundo',       name: 'Copa del Mundo',    short: 'Mundo',        cat: 'copa',     win: 'Diciembre', status: 'prox',  color: '#5b3a8c', c2: '#3a2459', champ: false, played: 0 },
  { id: 'nacional',    name: 'Liga Nacional',     short: 'Nacional',     cat: 'nacional', win: 'Todo el año · 2.ª fecha', status: 'curso', color: '#0e6b6b', c2: '#0a4747', champ: false, played: 3, months: ['Agosto', 'Septiembre', 'Octubre', 'Noviembre'] },
];

export const NEWS = [
  { id: 'n1', feat: true, cat: 'Resumen', wm: '4-0', date: '26 oct · Clausura', title: 'Los Pibes pasaron por arriba a Real Potrero y son más líderes que nunca', excerpt: 'Con un Sosa imparable, el puntero firmó la goleada de la jornada y se acerca a la clasificación a las copas.' },
  { id: 'n2', cat: 'Previa', wm: 'F6', date: '6 nov', title: 'Relámpago del domingo: los cruces que mueven la cima', excerpt: 'Vuelve la Clausura con dos canchas en simultáneo.' },
  { id: 'n3', cat: 'Goleadores', wm: '7', date: '25 oct', title: 'Sosa manda en la tabla de goleadores del Clausura', excerpt: 'Le saca tres al escolta de la temporada.' },
  { id: 'n4', cat: 'Entrevista', wm: '10', date: '28 oct', title: '"La Liga es el camino para meternos en la Libertadores"', excerpt: 'Mano a mano con el capitán del puntero.' },
  { id: 'n5', cat: 'Disciplina', wm: '!', date: '27 oct', title: 'Dos relámpagos de suspensión para Castro', excerpt: 'Real Potrero pierde a su defensor central.' },
];

export const HIST_PUNTOS = [
  ['pibes', 412], ['norte', 388], ['racing', 356], ['central', 340],
  ['union', 318], ['garage', 291], ['sur', 270], ['halcon', 244],
];
export const HIST_GOL = [
  ['M. Sosa', 'pibes', 148], ['D. Funes', 'norte', 121], ['R. Aquino', 'racing', 109],
  ['L. Ferreyra', 'central', 97], ['G. Ojeda', 'garage', 90], ['H. Rivas', 'halcon', 76],
  ['P. Molina', 'sur', 71], ['N. Cáceres', 'union', 64],
];
export const HIST_TIT = [
  ['pibes', 7], ['norte', 5], ['racing', 3], ['central', 2], ['sur', 1], ['garage', 1],
];

export const STATUS_LABEL = { curso: 'En curso', fin: 'Finalizada', prox: 'Próxima' };
export const CAT_TITLES = { liga: 'Ligas principales', copa: 'Copas · grupos + playoffs', nacional: 'Liga alternativa' };
export const CAT_ORDER = ['liga', 'copa', 'nacional'];

// ---- helpers ----
export function hash(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}
export function uid() {
  return (crypto?.randomUUID ? crypto.randomUUID() : 'id-' + Math.random().toString(36).slice(2) + Date.now().toString(36));
}

function roundRobin(ids) {
  const a = ids.slice();
  if (a.length % 2) a.push(null);
  const n = a.length, rounds = [];
  for (let r = 0; r < n - 1; r++) {
    const pairs = [];
    for (let i = 0; i < n / 2; i++) {
      const h = a[i], g = a[n - 1 - i];
      if (h != null && g != null) pairs.push(r % 2 ? [g, h] : [h, g]);
    }
    rounds.push(pairs);
    a.splice(1, 0, a.pop());
  }
  return rounds;
}

function scorersFor(compId, round, teamId, goals, playersByTeam) {
  const pl = playersByTeam[teamId] || [];
  if (!pl.length || goals <= 0) return [];
  const tally = {};
  for (let k = 0; k < goals; k++) {
    const p = pl[hash(compId + round + teamId + k) % pl.length];
    tally[p.id] = (tally[p.id] || 0) + 1;
  }
  return Object.keys(tally).map((pid) => ({ playerId: pid, count: tally[pid] }));
}

// Genera los partidos de una competencia (reutilizado por el seed y por el admin)
export function generateMatches(comp, teams, players) {
  const playersByTeam = {};
  players.forEach((p) => { (playersByTeam[p.teamId] = playersByTeam[p.teamId] || []).push(p); });

  const ids = teams.map((t) => t.id);
  const matches = [];
  let mi = 0;

  const makeMatch = (homeId, awayId, round, group) => {
    const played = round <= comp.played;
    const hg = played ? hash(comp.id + round + homeId) % 5 : null;
    const ag = played ? hash(comp.id + round + awayId) % 4 : null;
    const idx = mi++;
    return {
      id: uid(),
      compId: comp.id,
      group: group || null,
      round,
      turno: (idx % 2) + 1,
      cancha: (idx % 2) + 1,
      homeId, awayId,
      status: played ? 'played' : 'scheduled',
      homeGoals: hg, awayGoals: ag,
      scorers: played
        ? [...scorersFor(comp.id, round, homeId, hg, playersByTeam), ...scorersFor(comp.id, round, awayId, ag, playersByTeam)]
        : [],
    };
  };

  if (comp.cat === 'copa') {
    const pool = ids.slice(0, 8);
    const groups = { A: [pool[0], pool[2], pool[4], pool[6]], B: [pool[1], pool[3], pool[5], pool[7]] };
    ['A', 'B'].forEach((gk) => {
      roundRobin(groups[gk]).forEach((pairs, r) => {
        pairs.forEach(([h, g]) => matches.push(makeMatch(h, g, r + 1, gk)));
      });
    });
  } else {
    const pool = comp.cat === 'nacional' ? ids.slice(0, 8) : ids;
    const nJornadas = comp.months ? comp.months.length : Math.max(comp.played + 2, 5);
    const rounds = roundRobin(pool).slice(0, nJornadas);
    rounds.forEach((pairs, r) => pairs.forEach(([h, g]) => matches.push(makeMatch(h, g, r + 1))));
  }
  return matches;
}

export function buildSeed() {
  const teams = TEAMS.map((t) => ({ ...t }));
  const players = [];
  TEAMS.forEach((t) => (PLAYER_NAMES[t.id] || []).forEach((name, i) =>
    players.push({ id: `${t.id}-p${i + 1}`, name, teamId: t.id })));
  const competitions = COMPETITIONS.map((c) => ({ ...c }));
  let matches = [];
  competitions.forEach((c) => { matches = matches.concat(generateMatches(c, teams, players)); });
  const news = NEWS.map((n) => ({ ...n }));
  return { teams, players, competitions, matches, news };
}
