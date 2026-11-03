// src/pages/admin/AdminLogin.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMockAuth } from '../../store/MockAuth';

export default function AdminLogin() {
  const { login } = useMockAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@copaamistad.com');
  const [pass, setPass] = useState('demo');

  const submit = (e) => {
    e.preventDefault();
    login(email);
    navigate('/admin');
  };

  return (
    <div className="login-screen">
      <form className="login-card" onSubmit={submit}>
        <img src="/logo.png" alt="Copa Amistad" className="login-logo" />
        <h1>Administración</h1>
        <p className="login-sub">Panel de organización de la Copa Amistad</p>
        <label className="field"><span>Email</span>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label className="field"><span>Contraseña</span>
          <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} required />
        </label>
        <button className="btn btn-primary" type="submit" style={{ width: '100%', justifyContent: 'center' }}>Ingresar</button>
        <p className="login-note">Demo: cualquier email y contraseña funcionan. Más adelante esto usa Firebase Auth.</p>
        <Link to="/" className="login-back">← Volver al sitio</Link>
      </form>
    </div>
  );
}
