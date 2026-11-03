// src/store/MockAuth.jsx
// Autenticación simulada para el panel de administración.
// Mock: acepta cualquier email/clave y guarda la sesión en localStorage.
// En producción se reemplaza por Firebase Auth (el template ya trae AuthContext).
import { createContext, useContext, useState } from 'react';

const KEY = 'copa-amistad:admin:v1';
const AuthCtx = createContext(null);

function load() {
  try { return JSON.parse(localStorage.getItem(KEY)) || null; } catch { return null; }
}

export function MockAuthProvider({ children }) {
  const [user, setUser] = useState(load);

  const login = (email) => {
    const u = { email: email || 'admin@copaamistad.com', name: 'Organizador' };
    setUser(u);
    try { localStorage.setItem(KEY, JSON.stringify(u)); } catch { /* ignora */ }
    return u;
  };
  const logout = () => {
    setUser(null);
    try { localStorage.removeItem(KEY); } catch { /* ignora */ }
  };

  return <AuthCtx.Provider value={{ user, login, logout }}>{children}</AuthCtx.Provider>;
}

export function useMockAuth() {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error('useMockAuth debe usarse dentro de MockAuthProvider');
  return ctx;
}
