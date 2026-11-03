// src/pages/HistoricosGrid.jsx
import { HIST_PUNTOS, HIST_GOL, HIST_TIT } from '../data/mock';
import Crest from '../components/Crest';
import { Trophy } from '../components/Icons';

export default function HistoricosGrid({ tm, limit = 8 }) {
  const Card = ({ title, children }) => (
    <div className="hist"><div className="hh"><Trophy size={20} color="var(--gold)" /><h4>{title}</h4></div>{children}</div>
  );
  return (
    <div className="hist-grid">
      <Card title="Puntos histórico">
        {HIST_PUNTOS.slice(0, limit).map((r, i) => (
          <div className="hrow" key={r[0]}><span className="hn">{i + 1}</span><Crest team={tm[r[0]]} size={26} /><div className="main"><div className="l1">{tm[r[0]]?.name}</div></div><span className="val">{r[1]}</span></div>
        ))}
      </Card>
      <Card title="Goleadores histórico">
        {HIST_GOL.slice(0, limit).map((r, i) => (
          <div className="hrow" key={r[0]}><span className="hn">{i + 1}</span><Crest team={tm[r[1]]} size={26} /><div className="main"><div className="l1">{r[0]}</div><div className="l2">{tm[r[1]]?.name}</div></div><span className="val">{r[2]}</span></div>
        ))}
      </Card>
      <Card title="Títulos histórico">
        {HIST_TIT.slice(0, limit).map((r, i) => (
          <div className="hrow" key={r[0]}><span className="hn">{i + 1}</span><Crest team={tm[r[0]]} size={26} /><div className="main"><div className="l1">{tm[r[0]]?.name}</div></div><span className="val">{r[1]}</span></div>
        ))}
      </Card>
    </div>
  );
}
