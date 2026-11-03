// src/pages/admin/AdminEquipos.jsx
import { useState } from 'react';
import { useStore } from '../../store/AppStore';
import Crest from '../../components/Crest';
import { Trash } from '../../components/Icons';

const empty = { name: '', abbr: '', c1: '#3b82f6', c2: '#1e3a8a' };

export default function AdminEquipos() {
  const { data, addTeam, deleteTeam } = useStore();
  const [form, setForm] = useState(empty);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    addTeam({ ...form, abbr: (form.abbr || form.name.slice(0, 3)).toUpperCase().slice(0, 3) });
    setForm(empty);
  };

  return (
    <div>
      <div className="admin-head"><h1>Equipos</h1><p>{data.teams.length} equipos cargados.</p></div>
      <div className="admin-grid">
        <div className="admin-card">
          <div className="admin-card-head"><h2>Nuevo equipo</h2></div>
          <form className="form" onSubmit={submit}>
            <label className="field"><span>Nombre</span><input value={form.name} onChange={set('name')} placeholder="Ej: Sporting Oeste" required /></label>
            <label className="field"><span>Sigla (3 letras)</span><input value={form.abbr} onChange={set('abbr')} placeholder="SPO" maxLength={3} /></label>
            <div className="field-row">
              <label className="field"><span>Color 1</span><input type="color" value={form.c1} onChange={set('c1')} /></label>
              <label className="field"><span>Color 2</span><input type="color" value={form.c2} onChange={set('c2')} /></label>
              <div className="preview-crest"><Crest team={{ id: 'prev', abbr: (form.abbr || form.name.slice(0, 3) || 'EQ').toUpperCase().slice(0, 3), c1: form.c1, c2: form.c2 }} size={42} /></div>
            </div>
            <button className="btn btn-primary" type="submit">Agregar equipo</button>
          </form>
        </div>

        <div className="admin-card">
          <div className="admin-card-head"><h2>Listado</h2></div>
          <div className="list">
            {data.teams.map((t) => (
              <div className="list-row" key={t.id}>
                <Crest team={t} size={30} />
                <div className="lr-main"><div className="lr-title">{t.name}</div><div className="lr-sub">{t.abbr}</div></div>
                <button className="icon-btn danger" title="Eliminar" onClick={() => deleteTeam(t.id)}><Trash /></button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
