// src/pages/Equipos.jsx
import { Link } from 'react-router-dom';
import { useStore } from '../store/AppStore';
import { useSeason } from '../store/Season';
import { standings, compByBase } from '../lib/compute';
import Crest from '../components/Crest';

export default function Equipos() {
  const { data } = useStore();
  const { season } = useSeason();
  const rows = standings(data, compByBase(data, 'clausura', season).id);
  const recById = {}; rows.forEach((r) => (recById[r.id] = r));
  const teams = data.teams.slice().sort((a, b) => a.name.localeCompare(b.name));

  return (
    <section className="band">
      <div className="wrap">
        <div className="sec-head"><div><div className="eyebrow">Los clubes</div><h2>Equipos</h2></div></div>
        <div className="teams-grid">
          {teams.map((t) => {
            const r = recById[t.id];
            return (
              <Link className="team-card" to={`/equipo/${t.id}`} key={t.id}>
                <Crest team={t} size={54} />
                <div className="nm">{t.name}</div>
                <div className="rec tabular">{r ? `${r.g}G · ${r.e}E · ${r.p}P` : '—'}</div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
