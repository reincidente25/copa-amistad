// src/pages/admin/AdminLayout.jsx
import { useState } from 'react';
import { Link, NavLink, Outlet, Navigate, useNavigate } from 'react-router-dom';
import { useMockAuth } from '../../store/MockAuth';
import { icons, Menu } from '../../components/Icons';

const NAV = [
  ['', 'Panel', 'grid'],
  ['competencias', 'Competencias', 'cup'],
  ['equipos', 'Equipos', 'shield'],
  ['jugadores', 'Jugadores', 'user'],
  ['resultados', 'Resultados', 'ball'],
  ['notas', 'Notas', 'news'],
];

export function RequireAdmin({ children }) {
  const { user } = useMockAuth();
  if (!user) return <Navigate to="/admin/login" replace />;
  return children;
}

export default function AdminLayout() {
  const { user, logout } = useMockAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <div className="admin-shell">
      <aside className={`admin-side ${open ? 'open' : ''}`}>
        <Link to="/" className="admin-brand"><img src="/logo.png" alt="" /><div><b>Copa Amistad</b><small>Administración</small></div></Link>
        <nav>
          {NAV.map(([path, label, ic]) => (
            <NavLink key={path} to={`/admin/${path}`} end={path === ''}
              className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`} onClick={() => setOpen(false)}>
              {icons[ic](19)}<span>{label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="admin-side-foot">
          <Link to="/" className="admin-link-site">← Ver el sitio</Link>
          <div className="admin-user"><span className="au-name">{user?.name}</span><span className="au-mail">{user?.email}</span></div>
          <button className="btn btn-ghost-d" onClick={handleLogout}>Cerrar sesión</button>
        </div>
      </aside>

      <div className="admin-main">
        <header className="admin-top">
          <button className="burger-d" onClick={() => setOpen((v) => !v)}><Menu /></button>
          <span className="admin-mode">Modo administración · datos mock</span>
        </header>
        <div className="admin-content"><Outlet /></div>
      </div>
      {open && <div className="admin-overlay" onClick={() => setOpen(false)} />}
    </div>
  );
}
