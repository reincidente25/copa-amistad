// src/pages/admin/AdminCompetencias.jsx
import { useState } from 'react';
import { useStore } from '../../store/AppStore';
import { STATUS_LABEL, CAT_TITLES } from '../../data/mock';
import { Trophy, Trash } from '../../components/Icons';

const empty = { name: '', short: '', cat: 'liga', win: '', status: 'curso', color: '#13314b', c2: '#0a1826' };

export default function AdminCompetencias() {
  const { data, addCompetition, deleteCompetition } = useStore();
  const [form, setForm] = useState(empty);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    addCompetition({ ...form, short: form.short || form.name });
    setForm(empty);
  };

  return (
    <div>
      <div className="admin-head"><h1>Competencias</h1><p>Al crear una competencia se genera su fixture automáticamente con los equipos actuales.</p></div>
      <div className="admin-grid">
        <div className="admin-card">
          <div className="admin-card-head"><h2>Nueva competencia</h2></div>
          <form className="form" onSubmit={submit}>
            <label className="field"><span>Nombre</span><input value={form.name} onChange={set('name')} placeholder="Ej: Copa de Verano" required /></label>
            <label className="field"><span>Nombre corto</span><input value={form.short} onChange={set('short')} placeholder="Verano" /></label>
            <div className="field-row">
              <label className="field"><span>Tipo</span>
                <select value={form.cat} onChange={set('cat')}>
                  <option value="liga">Liga (acumulada)</option>
                  <option value="copa">Copa (grupos + playoffs)</option>
                  <option value="nacional">Liga alternativa</option>
                </select>
              </label>
              <label className="field"><span>Estado</span>
                <select value={form.status} onChange={set('status')}>
                  <option value="curso">En curso</option>
                  <option value="prox">Próxima</option>
                  <option value="fin">Finalizada</option>
                </select>
              </label>
            </div>
            <label className="field"><span>Ventana / calendario</span><input value={form.win} onChange={set('win')} placeholder="Ej: Feb – Jun" /></label>
            <div className="field-row">
              <label className="field"><span>Color 1</span><input type="color" value={form.color} onChange={set('color')} /></label>
              <label className="field"><span>Color 2</span><input type="color" value={form.c2} onChange={set('c2')} /></label>
            </div>
            <button className="btn btn-primary" type="submit">Crear competencia</button>
          </form>
        </div>

        <div className="admin-card">
          <div className="admin-card-head"><h2>Listado</h2></div>
          <div className="list">
            {data.competitions.map((c) => (
              <div className="list-row" key={c.id}>
                <span className="comp-chip" style={{ background: `linear-gradient(135deg,${c.color},${c.c2})` }}><Trophy size={18} color="#fff" /></span>
                <div className="lr-main"><div className="lr-title">{c.name}</div><div className="lr-sub">{CAT_TITLES[c.cat].split(' ·')[0]} · {c.win || 's/fecha'} · {STATUS_LABEL[c.status]}</div></div>
                <button className="icon-btn danger" title="Eliminar" onClick={() => { if (confirm(`¿Eliminar ${c.name} y sus partidos?`)) deleteCompetition(c.id); }}><Trash /></button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
