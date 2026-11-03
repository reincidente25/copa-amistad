// src/pages/Anual.jsx — Tabla anual de la temporada seleccionada
import { useStore } from '../store/AppStore';
import { useSeason } from '../store/Season';
import { teamMap, annualStandings, playerSeasonGoals } from '../lib/compute';
import { StandingsTable } from '../components/Displays';
import Crest from '../components/Crest';
import { Trophy } from '../components/Icons';

export default function Anual() {
  const { data } = useStore();
  const { season } = useSeason();
  const tm = teamMap(data);

  const rows = annualStandings(data, season);
  const leader = rows[0];

  const goals = playerSeasonGoals(data, season);
  const topEntry = Object.entries(goals).sort((a, b) => b[1] - a[1])[0];
  const topScorer = topEntry ? data.players.find((p) => p.id === topEntry[0]) : null;

  return (
    <section className="band">
      <div className="wrap">
        <div className="sec-head">
          <div><div className="eyebrow">Temporada {season}</div><h2>Tabla anual {season}</h2>
            <p>Puntos acumulados en todas las competencias del año (ligas y copas). Cambiá el año desde el selector del menú.</p></div>
        </div>

        <div className="anual-leaders">
          {leader && (
            <div className="hist-leader">
              <Trophy size={26} color="var(--gold)" /><Crest team={tm[leader.id]} size={34} />
              <div className="hl-main"><div className="hl-name">{tm[leader.id]?.name}</div><div className="hl-sub">Líder anual</div></div>
              <div className="hl-val">{leader.pts}<small>pts</small></div>
            </div>
          )}
          {topScorer && (
            <div className="hist-leader">
              <Trophy size={26} color="var(--gold)" /><Crest team={tm[topScorer.teamId]} size={34} />
              <div className="hl-main"><div className="hl-name">{topScorer.name}</div><div className="hl-sub">Goleador del año · {tm[topScorer.teamId]?.name}</div></div>
              <div className="hl-val">{topEntry[1]}<small>goles</small></div>
            </div>
          )}
        </div>

        <StandingsTable rows={rows} teamMap={tm} />
      </div>
    </section>
  );
}
