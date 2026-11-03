// src/pages/admin/Dashboard.jsx
import { Link } from 'react-router-dom';
import { useStore } from '../../store/AppStore';

export default function Dashboard() {
  const { data, resetData } = useStore();
  const played = data.matches.filter((m) => m.status === 'played').length;
  const scheduled = data.matches.filter((m) => m.status !== 'played').length;

  const stats = [
    ['Competencias', data.competitions.length, '/admin/competencias'],
    ['Equipos', data.teams.length, '/admin/equipos'],
    ['Jugadores', data.players.length, '/admin/jugadores'],
    ['Partidos jugados', played, '/admin/resultados'],
  ];

  return (
    <div>
      <div className="admin-head"><h1>Panel</h1><p>Resumen del torneo. Todos los datos son de ejemplo y se guardan en este navegador.</p></div>
      <div className="stat-grid">
        {stats.map(([k, v, to]) => (
          <Link className="stat-tile" to={to} key={k}><div className="v">{v}</div><div className="k">{k}</div></Link>
        ))}
      </div>

      <div className="admin-card" style={{ marginTop: 24 }}>
        <div className="admin-card-head"><h2>Accesos rápidos</h2></div>
        <div className="quick">
          <Link className="btn btn-primary" to="/admin/competencias">+ Nueva competencia</Link>
          <Link className="btn btn-soft" to="/admin/equipos">+ Nuevo equipo</Link>
          <Link className="btn btn-soft" to="/admin/jugadores">+ Nuevo jugador</Link>
          <Link className="btn btn-soft" to="/admin/resultados">Cargar resultado</Link>
        </div>
        <div className="admin-note">
          Hay <b>{scheduled}</b> partidos programados pendientes de resultado.
          <button className="btn-reset" onClick={() => { if (confirm('¿Restaurar todos los datos de ejemplo? Se perderán tus cambios.')) resetData(); }}>
            Restaurar datos de ejemplo
          </button>
        </div>
      </div>
    </div>
  );
}
