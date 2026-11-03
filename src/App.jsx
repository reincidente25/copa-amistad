// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppStoreProvider } from './store/AppStore';
import { MockAuthProvider } from './store/MockAuth';

import SiteLayout from './components/SiteLayout';
import Home from './pages/Home';
import Competition from './pages/Competition';
import Historicos from './pages/Historicos';
import Equipos from './pages/Equipos';
import TeamDetail from './pages/TeamDetail';

import AdminLayout, { RequireAdmin } from './pages/admin/AdminLayout';
import AdminLogin from './pages/admin/AdminLogin';
import Dashboard from './pages/admin/Dashboard';
import AdminCompetencias from './pages/admin/AdminCompetencias';
import AdminEquipos from './pages/admin/AdminEquipos';
import AdminJugadores from './pages/admin/AdminJugadores';
import AdminResultados from './pages/admin/AdminResultados';
import AdminNotas from './pages/admin/AdminNotas';

export default function App() {
  return (
    <AppStoreProvider>
      <MockAuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Sitio público */}
            <Route element={<SiteLayout />}>
              <Route index element={<Home />} />
              <Route path="competencia/:id" element={<Competition />} />
              <Route path="historicos" element={<Historicos />} />
              <Route path="equipos" element={<Equipos />} />
              <Route path="equipo/:id" element={<TeamDetail />} />
            </Route>

            {/* Administración */}
            <Route path="admin/login" element={<AdminLogin />} />
            <Route path="admin" element={<RequireAdmin><AdminLayout /></RequireAdmin>}>
              <Route index element={<Dashboard />} />
              <Route path="competencias" element={<AdminCompetencias />} />
              <Route path="equipos" element={<AdminEquipos />} />
              <Route path="jugadores" element={<AdminJugadores />} />
              <Route path="resultados" element={<AdminResultados />} />
              <Route path="notas" element={<AdminNotas />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </MockAuthProvider>
    </AppStoreProvider>
  );
}
