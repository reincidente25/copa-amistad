// src/components/Displays.jsx
import { Link } from 'react-router-dom';
import Crest from './Crest';
import { Trophy } from './Icons';
import { hash } from '../data/mock';

const dif = (r) => r.gf - r.gc;
const fmtDif = (d) => (d > 0 ? '+' + d : d);

export function ChampBanner({ team, label }) {
  if (!team) return null;
  return (
    <div className="champ">
      <Trophy size={24} color="var(--gold)" />
      <div><div className="lbl">{label}</div><div className="nm">{team.name}</div></div>
    </div>
  );
}

export function StandingsTable({ rows, teamMap, qCut = 0, classif = null }) {
  const zoneOf = (pos) => classif && classif.find((z) => pos >= z.from && pos <= z.to);
  return (
    <>
      <div className="pos-wrap">
        <table className="stand">
          <thead><tr>
            <th style={{ width: 48 }}>#</th><th className="team">Equipo</th><th>PJ</th>
            <th className="hide-sm">G</th><th className="hide-sm">E</th><th className="hide-sm">P</th>
            <th className="hide-sm">GF</th><th className="hide-sm">GC</th><th>DIF</th><th>Pts</th>
          </tr></thead>
          <tbody>
            {rows.map((r, i) => {
              const z = zoneOf(i + 1);
              const cls = classif ? '' : (i < qCut ? (i === 0 ? 'pos-q2' : 'pos-q') : '');
              return (
                <tr key={r.id} className={cls} style={z ? { boxShadow: `inset 4px 0 0 ${z.color}` } : undefined}>
                  <td><span className="pos-n" style={z ? { color: z.color } : undefined}>{i + 1}</span></td>
                  <td className="team"><Link className="team-cell team-link" to={`/equipo/${r.id}`}><Crest team={teamMap[r.id]} size={26} /><span className="nm">{teamMap[r.id]?.name}</span></Link></td>
                  <td className="tabular">{r.pj}</td>
                  <td className="tabular hide-sm">{r.g}</td><td className="tabular hide-sm">{r.e}</td><td className="tabular hide-sm">{r.p}</td>
                  <td className="tabular hide-sm">{r.gf}</td><td className="tabular hide-sm">{r.gc}</td>
                  <td className="tabular">{fmtDif(dif(r))}</td><td><span className="pts">{r.pts}</span></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {classif && (
        <div className="clasif-legend">
          {classif.map((z) => (
            <span className="cl-item" key={z.comp}><i style={{ background: z.color }} />{z.from}.º–{z.to}.º · {z.label}</span>
          ))}
        </div>
      )}
    </>
  );
}

export function MatchRow({ m, teamMap }) {
  return (
    <div className="match-row">
      <div className="s h"><span className="nm">{teamMap[m.homeId]?.name}</span><Crest team={teamMap[m.homeId]} size={26} /></div>
      {m.status === 'played'
        ? <div className="sc">{m.homeGoals}–{m.awayGoals}</div>
        : <div className="sc vs">VS<span className="time">{String(9 + (m.turno || 1)).padStart(2, '0')}:00</span></div>}
      <div className="s"><Crest team={teamMap[m.awayId]} size={26} /><span className="nm">{teamMap[m.awayId]?.name}</span></div>
    </div>
  );
}

export function JornadaResults({ month, round, played, matches, teamMap }) {
  return (
    <div className="jornada-block">
      <div className="jornada-head">
        <h4>Jornada {round} · {month}</h4>
        <span className={`chip ${played ? 'played' : 'next'}`}>{played ? 'Jugada' : 'Pendiente'}</span>
      </div>
      {matches.map((m) => <MatchRow key={m.id} m={m} teamMap={teamMap} />)}
    </div>
  );
}

export function GroupTables({ groups, teamMap }) {
  return (
    <div className="groups">
      {Object.keys(groups).map((gk) => (
        <div className="group" key={gk}>
          <h4>Grupo {gk}</h4>
          <div className="pos-wrap">
            <table className="stand">
              <thead><tr><th style={{ width: 40 }}>#</th><th className="team">Equipo</th><th>PJ</th><th>DIF</th><th>Pts</th></tr></thead>
              <tbody>
                {groups[gk].map((r, i) => (
                  <tr key={r.id} className={i < 2 ? 'pos-q' : ''}>
                    <td><span className="pos-n">{i + 1}</span></td>
                    <td className="team"><Link className="team-cell team-link" to={`/equipo/${r.id}`}><Crest team={teamMap[r.id]} size={24} /><span className="nm">{teamMap[r.id]?.name}</span></Link></td>
                    <td className="tabular">{r.pj}</td><td className="tabular">{fmtDif(dif(r))}</td><td><span className="pts">{r.pts}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}

export function ScorersList({ list, teamMap }) {
  if (!list.length) return <div className="comp-note">Todavía no hay goles cargados en esta competencia.</div>;
  return (
    <div className="scorers">
      {list.slice(0, 12).map((x, i) => (
        <div className="scorer" key={x.player.id}>
          <span className="rk">{i + 1}</span>
          <Crest team={teamMap[x.player.teamId]} size={30} />
          <div className="main"><div className="l1">{x.player.name}</div><div className="l2">{teamMap[x.player.teamId]?.name}</div></div>
          <span className="g">{x.goals}<small>{x.goals === 1 ? 'gol' : 'goles'}</small></span>
        </div>
      ))}
    </div>
  );
}

export function MatchList({ matches, teamMap }) {
  const played = matches.filter((m) => m.status === 'played');
  const next = matches.filter((m) => m.status !== 'played');
  return (
    <div>
      {played.length > 0 && <><div className="fecha-label">Jugados</div>{played.slice(-8).map((m) => <MatchRow key={m.id} m={m} teamMap={teamMap} />)}</>}
      {next.length > 0 && <><div className="fecha-label">Próximos</div>{next.slice(0, 6).map((m) => <MatchRow key={m.id} m={m} teamMap={teamMap} />)}</>}
      {matches.length === 0 && <div className="comp-note">No hay partidos cargados para esta competencia.</div>}
    </div>
  );
}

const CAT_COLORS = { Resumen: ['#13314b', '#0a1826'], Previa: ['#c8961f', '#8a6410'], Entrevista: ['#5b3a8c', '#3a2459'], Disciplina: ['#b4452f', '#7a2a1c'], Goleadores: ['#1e4e8c', '#11294d'] };
function Media({ cat, wm }) {
  const cc = CAT_COLORS[cat] || ['#334155', '#0f172a'];
  const id = 'm' + hash(wm + cat).toString(36);
  return (
    <svg viewBox="0 0 400 225" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs><linearGradient id={id} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={cc[0]} /><stop offset="1" stopColor={cc[1]} /></linearGradient></defs>
      <rect width="400" height="225" fill={`url(#${id})`} />
      <g stroke="rgba(255,255,255,.16)" strokeWidth="2" fill="none">
        <path d="M-40 225 L150 40" /><path d="M120 225 L210 40" /><path d="M300 225 L270 40" /><path d="M460 225 L330 40" />
        <path d="M-20 120 Q200 90 420 120" /><path d="M-20 175 Q200 135 420 175" />
      </g>
      <ellipse cx="200" cy="150" rx="78" ry="26" stroke="rgba(255,255,255,.18)" strokeWidth="2" fill="none" />
      <text x="372" y="60" textAnchor="end" fontFamily="Anton, sans-serif" fontSize="70" fill="rgba(255,255,255,.14)">{wm}</text>
    </svg>
  );
}
export function NewsCard({ n }) {
  const cc = CAT_COLORS[n.cat] || ['#334155', '#0f172a'];
  return (
    <article className={`card ${n.feat ? 'feat' : ''}`}>
      <div className="media"><Media cat={n.cat} wm={n.wm} /><span className="tag" style={{ background: cc[1] + 'cc' }}>{n.cat}</span></div>
      <div className="body"><span className="date">{n.date}</span><h3>{n.title}</h3>{n.excerpt && <p>{n.excerpt}</p>}</div>
    </article>
  );
}
