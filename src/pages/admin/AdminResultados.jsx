// src/pages/admin/AdminResultados.jsx
import { useState } from 'react';
import { useStore } from '../../store/AppStore';
import { teamMap, fixture } from '../../lib/compute';
import Crest from '../../components/Crest';
import { Plus, Trash } from '../../components/Icons';

function MatchEditor({ match, tm, players, onSave }) {
  const [hg, setHg] = useState('');
  const [ag, setAg] = useState('');
  const [scorers, setScorers] = useState([]);
  const squad = players.filter((p) => p.teamId === match.homeId || p.teamId === match.awayId);

  const addScorer = () => setScorers((s) => [...s, { playerId: squad[0]?.id || '', count: 1 }]);
  const updScorer = (i, k, v) => setScorers((s) => s.map((x, j) => (j === i ? { ...x, [k]: v } : x)));
  const delScorer = (i) => setScorers((s) => s.filter((_, j) => j !== i));

  const save = () => {
    if (hg === '' || ag === '') { alert('Ingresá el marcador de ambos equipos.'); return; }
    const clean = scorers.filter((x) => x.playerId).map((x) => ({ playerId: x.playerId, count: Number(x.count) || 1 }));
    onSave(match.id, hg, ag, clean);
  };

  return (
    <div className="res-card">
      <div className="res-score">
        <div className="rs-team"><Crest team={tm[match.homeId]} size={30} /><span>{tm[match.homeId]?.name}</span></div>
        <input className="goal-in" type="number" min="0" value={hg} onChange={(e) => setHg(e.target.value)} placeholder="0" />
        <span className="rs-dash">–</span>
        <input className="goal-in" type="number" min="0" value={ag} onChange={(e) => setAg(e.target.value)} placeholder="0" />
        <div className="rs-team r"><span>{tm[match.awayId]?.name}</span><Crest team={tm[match.awayId]} size={30} /></div>
      </div>
      <div className="res-scorers">
        {scorers.map((s, i) => (
          <div className="scorer-row" key={i}>
            <select value={s.playerId} onChange={(e) => updScorer(i, 'playerId', e.target.value)}>
              {squad.map((p) => <option key={p.id} value={p.id}>{p.name} ({tm[p.teamId]?.abbr})</option>)}
            </select>
            <input type="number" min="1" value={s.count} onChange={(e) => updScorer(i, 'count', e.target.value)} className="goal-in sm" />
            <button className="icon-btn danger" onClick={() => delScorer(i)}><Trash size={14} /></button>
          </div>
        ))}
        <button className="btn-add" type="button" onClick={addScorer} disabled={!squad.length}><Plus size={14} /> Agregar goleador</button>
      </div>
      <div className="res-actions">
        <span className="res-meta">Fecha {match.round} · Turno {match.turno} · Cancha {match.cancha}</span>
        <button className="btn btn-primary" onClick={save}>Guardar resultado</button>
      </div>
    </div>
  );
}

export default function AdminResultados() {
  const { data, saveResult } = useStore();
  const [compId, setCompId] = useState(data.competitions[0]?.id || '');
  const tm = teamMap(data);
  const all = fixture(data, compId);
  const pending = all.filter((m) => m.status !== 'played');
  const played = all.filter((m) => m.status === 'played');

  return (
    <div>
      <div className="admin-head"><h1>Cargar resultados</h1><p>Elegí la competencia y cargá el marcador de cada partido. Las tablas y goleadores se actualizan solos.</p></div>

      <div className="admin-card" style={{ marginBottom: 20 }}>
        <div className="admin-card-head"><h2>Competencia</h2>
          <select className="mini-select" value={compId} onChange={(e) => setCompId(e.target.value)}>
            {data.competitions.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
      </div>

      <div className="admin-head sub"><h2>Pendientes <span className="count">{pending.length}</span></h2></div>
      {pending.length
        ? pending.map((m) => <MatchEditor key={m.id} match={m} tm={tm} players={data.players} onSave={saveResult} />)
        : <div className="empty-card">No quedan partidos pendientes en esta competencia.</div>}

      {played.length > 0 && (
        <>
          <div className="admin-head sub" style={{ marginTop: 28 }}><h2>Jugados <span className="count">{played.length}</span></h2></div>
          <div className="played-list">
            {played.slice(-10).reverse().map((m) => (
              <div className="played-row" key={m.id}>
                <div className="pr-team h"><span>{tm[m.homeId]?.name}</span><Crest team={tm[m.homeId]} size={24} /></div>
                <div className="pr-score">{m.homeGoals}–{m.awayGoals}</div>
                <div className="pr-team"><Crest team={tm[m.awayId]} size={24} /><span>{tm[m.awayId]?.name}</span></div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
