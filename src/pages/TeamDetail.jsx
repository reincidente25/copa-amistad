// src/pages/TeamDetail.jsx
import { Link, useParams, Navigate } from 'react-router-dom';
import { useStore } from '../store/AppStore';
import { HIST_TIT } from '../data/mock';
import { teamMap, standings, playerGoals, teamForm } from '../lib/compute';
import Crest from '../components/Crest';
import { Back } from '../components/Icons';

export default function TeamDetail() {
  const { id } = useParams();
  const { data } = useStore();
  const team = data.teams.find((t) => t.id === id);
  if (!team) return <Navigate to="/equipos" replace />;

  const tm = teamMap(data);
  const rows = standings(data, 'clausura');
  const row = rows.find((r) => r.id === id);
  const pos = row ? rows.indexOf(row) + 1 : null;

  const golTotal = playerGoals(data);
  const golClausura = playerGoals(data, 'clausura');
  const squad = data.players.filter((p) => p.teamId === id)
    .map((p) => ({ ...p, total: golTotal[p.id] || 0, clausura: golClausura[p.id] || 0 }))
    .sort((a, b) => b.total - a.total || a.name.localeCompare(b.name));
  const squadGoals = squad.reduce((s, p) => s + p.total, 0);
  const tt = HIST_TIT.find((t) => t.id === id);
  const titles = tt ? tt.apertura + tt.clausura + tt.copas : 0;
  const form = teamForm(data, 'clausura', id, 6);

  const stats = [
    ['Posición', pos ? pos + 'º' : '—', 'Clausura'],
    ['Puntos', row ? row.pts : 0, 'Clausura'],
    ['Partidos', row ? `${row.g}-${row.e}-${row.p}` : '0-0-0', 'G-E-P'],
    ['Dif. de gol', row ? (row.gf - row.gc > 0 ? '+' : '') + (row.gf - row.gc) : 0, `${row ? row.gf : 0} GF · ${row ? row.gc : 0} GC`],
    ['Goles del plantel', squadGoals, 'Todas las competencias'],
    ['Títulos', titles, 'Históricos'],
  ];

  return (
    <>
      <section className="comp-hero" style={{ background: `radial-gradient(120% 140% at 85% -20%,${team.c1},${team.c2})` }}>
        <svg className="pitch" viewBox="0 0 1200 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <g stroke="#fff" strokeOpacity=".18" strokeWidth="2" fill="none">
            <path d="M-100 300 L420 20" /><path d="M200 300 L520 20" /><path d="M520 300 L620 20" /><path d="M860 300 L720 20" /><path d="M1200 300 L820 20" />
            <path d="M-50 130 Q600 90 1250 130" /><path d="M-80 220 Q600 160 1280 220" />
          </g>
        </svg>
        <div className="wrap">
          <Link className="back" to="/equipos"><Back /> Volver a equipos</Link>
          <div className="td-title"><Crest team={team} size={64} /><div><h1>{team.name}</h1><div className="td-sub">{pos ? `${pos}.º en la Liga Clausura` : 'Copa Amistad 2026'}</div></div></div>
        </div>
      </section>

      <section className="band">
        <div className="wrap">
          <div className="td-stats">
            {stats.map((s) => (
              <div className="td-stat" key={s[0]}><div className="v">{s[1]}</div><div className="k">{s[0]}</div><div className="sub">{s[2]}</div></div>
            ))}
          </div>

          <div className="td-cols">
            <div>
              <div className="sec-head sm"><div><h2>Plantel</h2></div><span className="muted-note">{squad.length} jugadores</span></div>
              <div className="pos-wrap">
                <table className="stand squad">
                  <thead><tr><th style={{ width: 40 }}>#</th><th className="team">Jugador</th><th>Clausura</th><th>Total</th></tr></thead>
                  <tbody>
                    {squad.map((p, i) => (
                      <tr key={p.id}>
                        <td><span className="pos-n">{i + 1}</span></td>
                        <td className="team"><span className="nm">{p.name}</span></td>
                        <td className="tabular">{p.clausura || '—'}</td>
                        <td className="tabular"><b>{p.total || 0}</b></td>
                      </tr>
                    ))}
                    {!squad.length && <tr><td colSpan="4" className="empty" style={{ textAlign: 'center' }}>Sin jugadores cargados.</td></tr>}
                  </tbody>
                </table>
              </div>
              <div className="comp-note">Goles del jugador acumulados a partir de los resultados cargados.</div>
            </div>

            <div>
              <div className="sec-head sm"><div><h2>Campaña</h2></div><span className="muted-note">Clausura</span></div>
              <div className="pos-wrap campaign">
                {form.length ? form.slice().reverse().map((c, i) => (
                  <div className="camp-row" key={i}>
                    <span className={`rslt ${c.res}`}>{c.res.toUpperCase()}</span>
                    <div className="camp-opp"><Crest team={tm[c.opp]} size={24} /><span>{c.home ? 'vs ' : '@ '}{tm[c.opp]?.name}</span></div>
                    <span className="camp-score tabular">{c.gf}–{c.gc}</span>
                  </div>
                )) : <div className="empty" style={{ padding: 18 }}>Sin partidos jugados aún.</div>}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
