// src/pages/Historicos.jsx
import { useState } from 'react';
import { useStore } from '../store/AppStore';
import { teamMap } from '../lib/compute';
import { HIST_PUNTOS, HIST_GOL, HIST_TIT } from '../data/mock';
import Crest from '../components/Crest';
import { Trophy } from '../components/Icons';

const pts = (r) => r.g * 3 + r.e;
const titTotal = (r) => r.apertura + r.clausura + r.copas;
const SUBTABS = [['puntos', 'Puntos'], ['goleadores', 'Goleadores'], ['titulos', 'Títulos']];

function Leader({ children }) { return <div className="hist-leader">{children}</div>; }

export default function Historicos() {
  const { data } = useStore();
  const tm = teamMap(data);
  const [sub, setSub] = useState('puntos');

  const puntos = [...HIST_PUNTOS].sort((a, b) => pts(b) - pts(a) || (b.gf - b.gc) - (a.gf - a.gc));
  const gol = [...HIST_GOL].sort((a, b) => b.goles - a.goles);
  const tit = [...HIST_TIT].sort((a, b) => titTotal(b) - titTotal(a));

  return (
      <section className="band">
        <div className="wrap">
          <div className="sec-head"><div><div className="eyebrow">Para la historia</div><h2>Tablas históricas</h2>
            <p>El acumulado de todas las temporadas de la Copa Amistad.</p></div></div>

          <div className="subtabs">
            {SUBTABS.map((t) => (
              <div key={t[0]} className={`subtab ${sub === t[0] ? 'active' : ''}`} onClick={() => setSub(t[0])}>{t[1]}</div>
            ))}
          </div>

          {sub === 'puntos' && (() => {
            const top = puntos[0];
            return (<>
              <Leader>
                <Trophy size={26} color="var(--gold)" /><Crest team={tm[top.id]} size={34} />
                <div className="hl-main"><div className="hl-name">{tm[top.id]?.name}</div><div className="hl-sub">Máximo puntaje histórico</div></div>
                <div className="hl-val">{pts(top)}<small>pts</small></div>
              </Leader>
              <div className="pos-wrap">
                <table className="stand">
                  <thead><tr><th style={{ width: 44 }}>#</th><th className="team">Equipo</th><th>Temp.</th><th>PJ</th>
                    <th className="hide-sm">G</th><th className="hide-sm">E</th><th className="hide-sm">P</th>
                    <th className="hide-sm">GF</th><th className="hide-sm">GC</th><th>DIF</th><th>Títulos</th><th>Pts</th></tr></thead>
                  <tbody>
                    {puntos.map((r, i) => (
                      <tr key={r.id}>
                        <td><span className="pos-n">{i + 1}</span></td>
                        <td className="team"><div className="team-cell"><Crest team={tm[r.id]} size={26} /><span className="nm">{tm[r.id]?.name}</span></div></td>
                        <td className="tabular">{r.temp}</td><td className="tabular">{r.g + r.e + r.p}</td>
                        <td className="tabular hide-sm">{r.g}</td><td className="tabular hide-sm">{r.e}</td><td className="tabular hide-sm">{r.p}</td>
                        <td className="tabular hide-sm">{r.gf}</td><td className="tabular hide-sm">{r.gc}</td>
                        <td className="tabular">{r.gf - r.gc > 0 ? '+' : ''}{r.gf - r.gc}</td>
                        <td className="tabular">{r.tit || '—'}</td><td><span className="pts">{pts(r)}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>);
          })()}

          {sub === 'goleadores' && (() => {
            const top = gol[0];
            return (<>
              <Leader>
                <Trophy size={26} color="var(--gold)" /><Crest team={tm[top.team]} size={34} />
                <div className="hl-main"><div className="hl-name">{top.name}</div><div className="hl-sub">Goleador histórico · {tm[top.team]?.name}</div></div>
                <div className="hl-val">{top.goles}<small>goles</small></div>
              </Leader>
              <div className="pos-wrap">
                <table className="stand">
                  <thead><tr><th style={{ width: 44 }}>#</th><th className="team">Jugador</th><th className="team">Equipo</th>
                    <th className="hide-sm">Temp.</th><th>PJ</th><th>Prom.</th><th>Goles</th></tr></thead>
                  <tbody>
                    {gol.map((r, i) => (
                      <tr key={r.name + r.team}>
                        <td><span className="pos-n">{i + 1}</span></td>
                        <td className="team"><span className="nm" style={{ fontFamily: 'var(--font-cond)', fontWeight: 600 }}>{r.name}</span></td>
                        <td className="team"><div className="team-cell"><Crest team={tm[r.team]} size={24} /><span className="nm">{tm[r.team]?.name}</span></div></td>
                        <td className="tabular hide-sm">{r.temp}</td><td className="tabular">{r.pj}</td>
                        <td className="tabular">{(r.goles / r.pj).toFixed(2)}</td><td><span className="pts">{r.goles}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="comp-note">Prom. = goles por partido.</div>
            </>);
          })()}

          {sub === 'titulos' && (() => {
            const top = tit[0];
            return (<>
              <Leader>
                <Trophy size={26} color="var(--gold)" /><Crest team={tm[top.id]} size={34} />
                <div className="hl-main"><div className="hl-name">{tm[top.id]?.name}</div><div className="hl-sub">Más campeón de la historia</div></div>
                <div className="hl-val">{titTotal(top)}<small>títulos</small></div>
              </Leader>
              <div className="pos-wrap">
                <table className="stand">
                  <thead><tr><th style={{ width: 44 }}>#</th><th className="team">Equipo</th>
                    <th>Apertura</th><th>Clausura</th><th>Copas</th><th>Total</th></tr></thead>
                  <tbody>
                    {tit.map((r, i) => (
                      <tr key={r.id}>
                        <td><span className="pos-n">{i + 1}</span></td>
                        <td className="team"><div className="team-cell"><Crest team={tm[r.id]} size={26} /><span className="nm">{tm[r.id]?.name}</span></div></td>
                        <td className="tabular">{r.apertura || '—'}</td><td className="tabular">{r.clausura || '—'}</td>
                        <td className="tabular">{r.copas || '—'}</td><td><span className="pts">{titTotal(r) || '—'}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="comp-note">Ligas = Apertura + Clausura · Copas = Argentina, Libertadores, Sudamericana y Mundo.</div>
            </>);
          })()}
        </div>
      </section>
  );
}
