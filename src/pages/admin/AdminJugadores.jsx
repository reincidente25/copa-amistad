// src/pages/admin/AdminJugadores.jsx
import { useState } from 'react';
import { useStore } from '../../store/AppStore';
import Crest from '../../components/Crest';
import { Trash } from '../../components/Icons';

export default function AdminJugadores() {
  const { data, addPlayer, deletePlayer } = useStore();
  const [name, setName] = useState('');
  const [teamId, setTeamId] = useState(data.teams[0]?.id || '');
  const [filter, setFilter] = useState('all');
  const tm = {}; data.teams.forEach((t) => (tm[t.id] = t));

  const submit = (e) => {
    e.preventDefault();
    if (!name.trim() || !teamId) return;
    addPlayer({ name: name.trim(), teamId });
    setName('');
  };

  const list = data.players.filter((p) => filter === 'all' || p.teamId === filter);

  return (
    <div>
      <div className="admin-head"><h1>Jugadores</h1><p>{data.players.length} jugadores en {data.teams.length} equipos.</p></div>
      <div className="admin-grid">
        <div className="admin-card">
          <div className="admin-card-head"><h2>Nuevo jugador</h2></div>
          <form className="form" onSubmit={submit}>
            <label className="field"><span>Nombre</span><input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ej: M. Gómez" required /></label>
            <label className="field"><span>Equipo</span>
              <select value={teamId} onChange={(e) => setTeamId(e.target.value)}>
                {data.teams.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
            </label>
            <button className="btn btn-primary" type="submit">Agregar jugador</button>
          </form>
        </div>

        <div className="admin-card">
          <div className="admin-card-head">
            <h2>Listado</h2>
            <select className="mini-select" value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="all">Todos los equipos</option>
              {data.teams.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
          </div>
          <div className="list">
            {list.map((p) => (
              <div className="list-row" key={p.id}>
                <Crest team={tm[p.teamId]} size={26} />
                <div className="lr-main"><div className="lr-title">{p.name}</div><div className="lr-sub">{tm[p.teamId]?.name}</div></div>
                <button className="icon-btn danger" title="Eliminar" onClick={() => deletePlayer(p.id)}><Trash /></button>
              </div>
            ))}
            {!list.length && <div className="empty">Sin jugadores para este filtro.</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
