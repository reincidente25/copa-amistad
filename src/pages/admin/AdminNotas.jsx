// src/pages/admin/AdminNotas.jsx
import { useState } from 'react';
import { useStore } from '../../store/AppStore';
import { Trash } from '../../components/Icons';

const CATS = ['Resumen', 'Previa', 'Entrevista', 'Disciplina', 'Goleadores'];
const empty = { title: '', cat: 'Resumen', date: '', excerpt: '', feat: false };

export default function AdminNotas() {
  const { data, addNote, updateNote, deleteNote } = useStore();
  const [form, setForm] = useState(empty);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    addNote({ ...form, date: form.date || 'Hoy', wm: form.cat[0] });
    setForm(empty);
  };

  const setFeatured = (id) => {
    data.news.forEach((n) => updateNote(n.id, { feat: n.id === id }));
  };

  return (
    <div>
      <div className="admin-head"><h1>Notas</h1><p>Las noticias que se muestran en la portada del sitio. Marcá una como destacada para el bloque grande del home.</p></div>
      <div className="admin-grid">
        <div className="admin-card">
          <div className="admin-card-head"><h2>Nueva nota</h2></div>
          <form className="form" onSubmit={submit}>
            <label className="field"><span>Título</span><input value={form.title} onChange={set('title')} placeholder="Ej: Goleada y liderazgo en el relámpago" required /></label>
            <div className="field-row">
              <label className="field"><span>Categoría</span>
                <select value={form.cat} onChange={set('cat')}>{CATS.map((c) => <option key={c} value={c}>{c}</option>)}</select>
              </label>
              <label className="field"><span>Fecha</span><input value={form.date} onChange={set('date')} placeholder="Ej: 26 oct · Clausura" /></label>
            </div>
            <label className="field"><span>Bajada / resumen</span><textarea rows="3" value={form.excerpt} onChange={set('excerpt')} placeholder="Un párrafo breve con el contenido de la nota." /></label>
            <label className="check"><input type="checkbox" checked={form.feat} onChange={(e) => setForm((f) => ({ ...f, feat: e.target.checked }))} /><span>Destacar en portada</span></label>
            <button className="btn btn-primary" type="submit">Publicar nota</button>
          </form>
        </div>

        <div className="admin-card">
          <div className="admin-card-head"><h2>Publicadas <span className="count">{data.news.length}</span></h2></div>
          <div className="list">
            {data.news.map((n) => (
              <div className="list-row note-row" key={n.id}>
                <span className="note-cat">{n.cat}</span>
                <div className="lr-main">
                  <div className="lr-title">{n.title}</div>
                  <div className="lr-sub">{n.date}{n.feat && <span className="feat-tag">★ Destacada</span>}</div>
                </div>
                {!n.feat && <button className="btn-mini" onClick={() => setFeatured(n.id)}>Destacar</button>}
                <button className="icon-btn danger" title="Eliminar" onClick={() => deleteNote(n.id)}><Trash /></button>
              </div>
            ))}
            {!data.news.length && <div className="empty">No hay notas publicadas.</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
