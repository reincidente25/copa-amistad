// src/pages/Competition.jsx
import { useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { useStore } from '../store/AppStore';
import { STATUS_LABEL } from '../data/mock';
import { teamMap, standings, groupStandings, scorers, fixture } from '../lib/compute';
import { Trophy, Back } from '../components/Icons';
import { StandingsTable, GroupTables, ScorersList, MatchList, ChampBanner } from '../components/Displays';

const TABS = [['posiciones', 'Posiciones'], ['goleadores', 'Goleadores'], ['resultados', 'Resultados']];

export default function Competition() {
  const { id } = useParams();
  const { data } = useStore();
  const [tab, setTab] = useState('posiciones');
  const c = data.competitions.find((x) => x.id === id);
  if (!c) return <Navigate to="/" replace />;
  const tm = teamMap(data);

  const kindPill = c.cat === 'copa' ? 'Grupos + playoffs' : c.cat === 'nacional' ? 'Liga flexible · sin copas' : 'Liga · acumulada';

  let content = null;
  if (tab === 'posiciones') {
    if (c.cat === 'copa') {
      const groups = groupStandings(data, c.id);
      const champTeam = c.status === 'fin' ? tm[(groups.A?.[0] || {}).id] : null;
      content = (<>
        {champTeam && <ChampBanner team={champTeam} label="Campeón 2026" />}
        <GroupTables groups={groups} teamMap={tm} />
        <div className="comp-note">Fase de grupos · clasifican los <b>2 primeros</b> de cada grupo a semifinales.</div>
      </>);
    } else {
      const rows = standings(data, c.id);
      const qCut = c.cat === 'nacional' ? 0 : 4;
      content = (<>
        {c.status === 'fin' && c.champ && rows[0] && <ChampBanner team={tm[rows[0].id]} label={'Campeón ' + c.short} />}
        <StandingsTable rows={rows} teamMap={tm} qCut={qCut} />
        {c.cat === 'liga'
          ? <div className="comp-note">Los <b>4 primeros</b> clasifican a las copas. Tabla acumulada por puntos, actualizada cada relámpago.</div>
          : <div className="comp-note">Liga alternativa y más flexible · no clasifica a ninguna copa.</div>}
      </>);
    }
  } else if (tab === 'goleadores') {
    content = <ScorersList list={scorers(data, c.id)} teamMap={tm} />;
  } else {
    content = <MatchList matches={fixture(data, c.id)} teamMap={tm} />;
  }

  return (
    <>
      <section className="comp-hero" style={{ background: `radial-gradient(120% 140% at 85% -20%,${c.color},${c.c2})` }}>
        <svg className="pitch" viewBox="0 0 1200 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <g stroke="#fff" strokeOpacity=".18" strokeWidth="2" fill="none">
            <path d="M-100 300 L420 20" /><path d="M200 300 L520 20" /><path d="M520 300 L620 20" /><path d="M860 300 L720 20" /><path d="M1200 300 L820 20" />
            <path d="M-50 130 Q600 90 1250 130" /><path d="M-80 220 Q600 160 1280 220" />
          </g>
          <ellipse cx="600" cy="170" rx="140" ry="42" stroke="#fff" strokeOpacity=".18" strokeWidth="2" fill="none" />
        </svg>
        <div className="wrap">
          <Link className="back" to="/"><Back /> Volver al inicio</Link>
          <div className="title"><Trophy size={40} color="rgba(255,255,255,.9)" /><h1>{c.name}</h1></div>
          <div className="meta">
            <span className="pill">{c.win}</span><span className="pill">{STATUS_LABEL[c.status]}</span><span className="pill">{kindPill}</span>
          </div>
        </div>
      </section>
      <section className="band">
        <div className="wrap">
          <div className="subtabs">
            {TABS.map((t) => (
              <div key={t[0]} className={`subtab ${tab === t[0] ? 'active' : ''}`} onClick={() => setTab(t[0])}>{t[1]}</div>
            ))}
          </div>
          {content}
        </div>
      </section>
    </>
  );
}
