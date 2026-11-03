// src/pages/HistoricosGrid.jsx — versión compacta (home)
import { Link } from 'react-router-dom';
import { HIST_PUNTOS, HIST_GOL, HIST_TIT } from '../data/mock';
import Crest from '../components/Crest';
import { Trophy, Arrow } from '../components/Icons';

const pts = (r) => r.g * 3 + r.e;
const titTotal = (r) => r.apertura + r.clausura + r.copas;

export default function HistoricosGrid({ tm, limit = 3 }) {
  const Card = ({ title, children }) => (
    <div className="hist"><div className="hh"><Trophy size={20} color="var(--gold)" /><h4>{title}</h4></div>{children}</div>
  );
  const puntos = [...HIST_PUNTOS].sort((a, b) => pts(b) - pts(a)).slice(0, limit);
  const gol = [...HIST_GOL].sort((a, b) => b.goles - a.goles).slice(0, limit);
  const tit = [...HIST_TIT].sort((a, b) => titTotal(b) - titTotal(a)).slice(0, limit);

  return (
    <>
      <div className="hist-grid">
        <Card title="Puntos histórico">
          {puntos.map((r, i) => (
            <div className="hrow" key={r.id}><span className="hn">{i + 1}</span><Crest team={tm[r.id]} size={26} /><div className="main"><div className="l1">{tm[r.id]?.name}</div></div><span className="val">{pts(r)}</span></div>
          ))}
        </Card>
        <Card title="Goleadores histórico">
          {gol.map((r, i) => (
            <div className="hrow" key={r.name}><span className="hn">{i + 1}</span><Crest team={tm[r.team]} size={26} /><div className="main"><div className="l1">{r.name}</div><div className="l2">{tm[r.team]?.name}</div></div><span className="val">{r.goles}</span></div>
          ))}
        </Card>
        <Card title="Títulos histórico">
          {tit.map((r, i) => (
            <div className="hrow" key={r.id}><span className="hn">{i + 1}</span><Crest team={tm[r.id]} size={26} /><div className="main"><div className="l1">{tm[r.id]?.name}</div></div><span className="val">{titTotal(r)}</span></div>
          ))}
        </Card>
      </div>
      <div style={{ marginTop: 18, textAlign: 'center' }}>
        <Link className="link" to="/historicos" style={{ justifyContent: 'center' }}>Ver estadísticas completas <Arrow /></Link>
      </div>
    </>
  );
}
