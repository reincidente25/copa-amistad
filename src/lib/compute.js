// src/lib/compute.js
// Cálculos derivados de los partidos: participantes, posiciones, goleadores, fixture.
import { hash } from '../data/mock';

export function matchesOf(state, compId) {
  return state.matches.filter((m) => m.compId === compId);
}

export function participantsOf(state, compId) {
  const set = new Set();
  matchesOf(state, compId).forEach((m) => { set.add(m.homeId); set.add(m.awayId); });
  return [...set];
}

export function groupsOf(state, compId) {
  const groups = {};
  matchesOf(state, compId).forEach((m) => {
    if (!m.group) return;
    groups[m.group] = groups[m.group] || new Set();
    groups[m.group].add(m.homeId);
    groups[m.group].add(m.awayId);
  });
  const out = {};
  Object.keys(groups).sort().forEach((k) => (out[k] = [...groups[k]]));
  return out;
}

function emptyRow(id) {
  return { id, pj: 0, g: 0, e: 0, p: 0, gf: 0, gc: 0, pts: 0 };
}

function tally(matchArr, ids) {
  const rows = {};
  ids.forEach((id) => (rows[id] = emptyRow(id)));
  matchArr.forEach((m) => {
    if (m.status !== 'played' || m.homeGoals == null) return;
    const h = rows[m.homeId], a = rows[m.awayId];
    if (!h || !a) return;
    h.pj++; a.pj++;
    h.gf += m.homeGoals; h.gc += m.awayGoals;
    a.gf += m.awayGoals; a.gc += m.homeGoals;
    if (m.homeGoals > m.awayGoals) { h.g++; a.p++; h.pts += 3; }
    else if (m.homeGoals < m.awayGoals) { a.g++; h.p++; a.pts += 3; }
    else { h.e++; a.e++; h.pts++; a.pts++; }
  });
  return Object.values(rows).sort((x, y) =>
    y.pts - x.pts || (y.gf - y.gc) - (x.gf - x.gc) || y.gf - x.gf);
}

// round (jornada/mes) opcional: filtra a esa jornada; si no, tabla acumulada.
export function standings(state, compId, teamIds, round) {
  let ms = matchesOf(state, compId);
  if (round) ms = ms.filter((m) => m.round === round);
  const ids = teamIds
    || (round ? [...new Set(ms.flatMap((m) => [m.homeId, m.awayId]))] : participantsOf(state, compId));
  return tally(ms, ids);
}

// Tabla anual: suma de todas las competencias del año.
export function annualStandings(state) {
  return tally(state.matches, state.teams.map((t) => t.id));
}

export function groupStandings(state, compId) {
  const groups = groupsOf(state, compId);
  const out = {};
  Object.keys(groups).forEach((gk) => (out[gk] = standings(state, compId, groups[gk])));
  return out;
}

export function scorers(state, compId, round) {
  const byPlayer = {};
  matchesOf(state, compId).forEach((m) => {
    if (m.status !== 'played') return;
    if (round && m.round !== round) return;
    (m.scorers || []).forEach((s) => { byPlayer[s.playerId] = (byPlayer[s.playerId] || 0) + s.count; });
  });
  const playerMap = {}; state.players.forEach((p) => (playerMap[p.id] = p));
  return Object.keys(byPlayer)
    .map((pid) => ({ player: playerMap[pid], goals: byPlayer[pid] }))
    .filter((x) => x.player)
    .sort((a, b) => b.goals - a.goals);
}

export function fixture(state, compId, round) {
  let ms = matchesOf(state, compId).slice().sort((a, b) => a.round - b.round || a.turno - b.turno);
  if (round) ms = ms.filter((m) => m.round === round);
  return ms;
}

export function teamMap(state) {
  const m = {}; state.teams.forEach((t) => (m[t.id] = t)); return m;
}

// Bracket de playoffs de una copa: 2 primeros de cada grupo → semis → final.
// Se resuelve (con resultados) solo cuando la copa está finalizada.
export function bracket(state, comp) {
  const groups = groupStandings(state, comp.id);
  const A = groups.A || [], B = groups.B || [];
  const pick = (arr, i) => (arr[i] ? arr[i].id : null);
  const decided = comp.status === 'fin';

  const play = (home, away, key) => {
    if (!home || !away || !decided) return { home, away, hg: null, ag: null, winner: null };
    let hg = hash(comp.id + key + home) % 4;
    let ag = hash(comp.id + key + away) % 4;
    if (hg === ag) hg += 1; // sin empates en eliminación
    return { home, away, hg, ag, winner: hg > ag ? home : away };
  };

  const sf1 = { label: 'Semifinal 1', seedH: '1.º Grupo A', seedA: '2.º Grupo B', ...play(pick(A, 0), pick(B, 1), 'SF1') };
  const sf2 = { label: 'Semifinal 2', seedH: '1.º Grupo B', seedA: '2.º Grupo A', ...play(pick(B, 0), pick(A, 1), 'SF2') };
  const final = { label: 'Final', seedH: 'Ganador SF 1', seedA: 'Ganador SF 2', ...play(sf1.winner, sf2.winner, 'FIN') };

  return { semis: [sf1, sf2], final, champion: final.winner, decided, hasSeeds: !!pick(A, 0) };
}

// Goles por jugador. compId null = todas las competencias.
export function playerGoals(state, compId = null) {
  const map = {};
  state.matches.forEach((m) => {
    if (m.status !== 'played') return;
    if (compId && m.compId !== compId) return;
    (m.scorers || []).forEach((s) => { map[s.playerId] = (map[s.playerId] || 0) + s.count; });
  });
  return map;
}

// Últimos partidos jugados de un equipo en una competencia.
export function teamForm(state, compId, teamId, n = 5) {
  return fixture(state, compId)
    .filter((m) => m.status === 'played' && (m.homeId === teamId || m.awayId === teamId))
    .slice(-n)
    .map((m) => {
      const home = m.homeId === teamId;
      const gf = home ? m.homeGoals : m.awayGoals;
      const gc = home ? m.awayGoals : m.homeGoals;
      return { opp: home ? m.awayId : m.homeId, home, gf, gc, res: gf > gc ? 'w' : gf < gc ? 'l' : 'd' };
    });
}
