// src/pages/Historicos.jsx
import { useStore } from '../store/AppStore';
import { teamMap, annualStandings } from '../lib/compute';
import { StandingsTable } from '../components/Displays';
import HistoricosGrid from './HistoricosGrid';

export default function Historicos() {
  const { data } = useStore();
  const tm = teamMap(data);

  return (
    <>
      <section className="band">
        <div className="wrap">
          <div className="sec-head">
            <div><div className="eyebrow">Temporada 2026</div><h2>Tabla anual</h2>
              <p>Puntos acumulados en todas las competencias del año (ligas y copas).</p></div>
          </div>
          <StandingsTable rows={annualStandings(data)} teamMap={tm} />
        </div>
      </section>

      <section className="band alt">
        <div className="wrap">
          <div className="sec-head"><div><div className="eyebrow">Para la historia</div><h2>Tablas históricas</h2><p>El acumulado de todas las temporadas de la Copa Amistad.</p></div></div>
          <HistoricosGrid tm={tm} limit={8} />
        </div>
      </section>
    </>
  );
}
