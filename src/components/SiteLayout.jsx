// src/components/SiteLayout.jsx
import { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useStore } from '../store/AppStore';
import { useSeason } from '../store/Season';
import { CAT_ORDER, CAT_TITLES } from '../data/mock';
import { compByBase } from '../lib/compute';
import { Gear, Menu } from './Icons';

export default function SiteLayout() {
  const { data } = useStore();
  const { season, setSeason, seasons, current } = useSeason();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const close = () => setOpen(false);

  const go = (path) => { navigate(path); close(); };
  const seasonComps = data.competitions.filter((c) => c.season === season);
  const clausura = compByBase(data, 'clausura', season);

  return (
    <>
      <header className="topbar">
        <div className="wrap">
          <Link to="/" className="logo" onClick={close} aria-label="Copa Amistad, inicio">
            <img src="/logo.png" alt="" className="logo-img" />
            <span className="word"><b>COPA AMISTAD</b><small>FÚTBOL · 2026</small></span>
          </Link>

          <nav className={`nav ${open ? 'open' : ''}`}>
            <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''} onClick={close}>Inicio</NavLink>
            <div className="dd">
              <span className="dd-trigger">Competencias ▾</span>
              <div className="dd-menu">
                <div className="dd-group">Temporada {season}</div>
                {CAT_ORDER.map((cat) => (
                  <div key={cat}>
                    {seasonComps.filter((c) => c.cat === cat).map((c) => (
                      <div key={c.id} className="dd-item" onClick={() => go(`/competencia/${c.id}`)}>
                        <span className="dotc" style={{ background: c.color }} />{c.name}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <NavLink to="/historicos" className={({ isActive }) => isActive ? 'active' : ''} onClick={close}>Históricos</NavLink>
            <NavLink to="/equipos" className={({ isActive }) => isActive ? 'active' : ''} onClick={close}>Equipos</NavLink>
          </nav>

          <label className="season-select" title="Elegí la temporada">
            <select value={season} onChange={(e) => setSeason(Number(e.target.value))} aria-label="Temporada">
              {seasons.map((y) => <option key={y} value={y}>{y}{y === current ? ' · actual' : ''}</option>)}
            </select>
          </label>
          <Link to="/admin" className="admin-btn" title="Administración" aria-label="Administración" onClick={close}>
            <Gear size={20} />
          </Link>
          <button className="burger" aria-label="Menú" onClick={() => setOpen((v) => !v)}><Menu /></button>
        </div>
      </header>

      <main><Outlet /></main>

      <footer>
        <div className="wrap">
          <div className="foot-top">
            <div style={{ maxWidth: 320 }}>
              <Link to="/" className="logo" style={{ marginBottom: 14 }}>
                <img src="/logo.png" alt="" className="logo-img" />
                <span className="word"><b style={{ color: '#fff' }}>COPA AMISTAD</b><small>FÚTBOL · 2026</small></span>
              </Link>
              <p style={{ fontSize: 14, color: '#aeb9c7', margin: '0 0 14px' }}>
                La liga de los amigos: Apertura, Clausura, las copas y la Liga Nacional, con su estadística histórica.
              </p>
              <span className="mockup-ribbon">◆ Mockup · datos de ejemplo</span>
            </div>
            <div className="foot-cols">
              <div>
                <h5>Competencias</h5>
                {data.competitions.filter((c) => c.cat !== 'nacional').slice(0, 4).map((c) => (
                  <Link key={c.id} to={`/competencia/${c.id}`}>{c.name}</Link>
                ))}
              </div>
              <div>
                <h5>Torneo</h5>
                <Link to="/historicos">Históricos</Link>
                <Link to="/equipos">Equipos</Link>
                <Link to="/admin">Administración</Link>
              </div>
            </div>
          </div>
          <div className="foot-bottom">
            <span>© 2026 Copa Amistad. Hecho para la comunidad.</span>
            <span>Temporada 2026 · Clausura en curso</span>
          </div>
        </div>
      </footer>
    </>
  );
}
