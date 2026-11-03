// src/pages/Historicos.jsx
import { useStore } from '../store/AppStore';
import { teamMap } from '../lib/compute';
import HistoricosGrid from './HistoricosGrid';

export default function Historicos() {
  const { data } = useStore();
  return (
    <section className="band">
      <div className="wrap">
        <div className="sec-head"><div><div className="eyebrow">Para la historia</div><h2>Tablas históricas</h2><p>El acumulado de todas las temporadas de la Copa Amistad.</p></div></div>
        <HistoricosGrid tm={teamMap(data)} limit={8} />
      </div>
    </section>
  );
}
