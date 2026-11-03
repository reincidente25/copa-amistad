// src/pages/Competition.jsx
import { useState, useEffect } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { useStore } from '../store/AppStore';
import { STATUS_LABEL } from '../data/mock';
import { teamMap, standings, groupStandings, scorers, fixture, bracket } from '../lib/compute';
import { Trophy, Back } from '../components/Icons';
import { StandingsTable, GroupTables, ScorersList, MatchList, JornadaResults, ChampBanner, Bracket } from '../components/Displays';

const TABS_LIGA = [['posiciones', 'Posiciones'], ['goleadores', 'Goleadores'], ['resultados', 'Resultados']];
const TABS_COPA = [['posiciones', 'Fase de grupos'], ['llaves', 'Llaves'], ['goleadores', 'Goleadores'], ['resultados', 'Resultados']];

export default function Competition() {
  const { id } = useParams();
  const { data } = useStore();
  const [tab, setTab] = useState('posiciones');
  const [jornada, setJornada] = useState(null); // null = general; o número de jornada

  useEffect(() => { setTab('posiciones'); setJornada(null); }, [id]);

  const c = data.competitions.find((x) => x.id === id);
  if (!c) return <Navigate to="/" replace />;
  const tm = teamMap(data);
  const isCopa = c.cat === 'copa';
  const hasJornadas = !isCopa && Array.isArray(c.months) && c.months.length > 0;
  const kindPill = isCopa ? 'Grupos + playoffs' : c.cat === 'nacional' ? 'Liga flexible · sin copas' : 'Liga · acumulada';
  const TABS = isCopa ? TABS_COPA : TABS_LIGA;
  const bk = isCopa ? bracket(data, c) : null;

  let content = null;
  if (tab === 'llaves') {
    content = <Bracket data={bk} teamMap={tm} comp={c} />;
  } else if (tab === 'posiciones') {
    if (isCopa) {
      const groups = groupStandings(data, c.id);
      content = (<>
        <GroupTables groups={groups} teamMap={tm} />
        <div className="comp-note">Fase de grupos · clasifican los <b>2 primeros</b> de cada grupo a semifinales. Mirá el cruce en <b>Llaves</b>.</div>
      </>);
    } else if (jornada) {
      content = (<>
        <StandingsTable rows={standings(data, c.id, null, jornada)} teamMap={tm} />
        <div className="comp-note">Tabla de la jornada de <b>{c.months[jornada - 1]}</b>. La clasificación a copas se define por la tabla general.</div>
      </>);
    } else {
      const rows = standings(data, c.id);
      content = (<>
        {c.status === 'fin' && c.champ && rows[0] && <ChampBanner team={tm[rows[0].id]} label={'Campeón ' + c.short} />}
        <StandingsTable rows={rows} teamMap={tm} qCut={c.cat === 'nacional' ? 0 : 4} classif={c.classif || null} />
        {c.classif
          ? <div className="comp-note">Tabla general acumulada. La <b>posición final</b> define la clasificación a cada copa (ver referencias). <em>Zonas de ejemplo — a confirmar.</em></div>
          : <div className="comp-note">Liga alternativa y más flexible · no clasifica a ninguna copa.</div>}
      </>);
    }
  } else if (tab === 'goleadores') {
    content = <ScorersList list={scorers(data, c.id, jornada || undefined)} teamMap={tm} />;
  } else {
    // resultados
    if (hasJornadas && !jornada) {
      content = (
        <div>
          {c.months.map((mon, idx) => (
            <JornadaResults key={mon} month={mon} round={idx + 1} played={idx + 1 <= c.played}
              matches={fixture(data, c.id, idx + 1)} teamMap={tm} />
          ))}
        </div>
      );
    } else {
      content = <MatchList matches={fixture(data, c.id, jornada || undefined)} teamMap={tm} />;
    }
  }

  return (
    <>
      <section className="comp-hero" style={{ background: `radial-gradient(120% 140% at 85% -20%,${c.color},${c.c2})` }}>
        <svg className="pitch" viewBox="0 0 1200 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <g stroke="#fff" strokeOpacity=".18" strokeWidth="2" fill="none">
            <path d="M-100 300 L420 20" /><path d="M200 300 L520 20" /><path d="M520 300 L620 20" /><path d="M860 300 L720 20" /><path d="M1200 300 L820 20" />
            <path d="M-50 130 Q600 90 1250 130" /><path d="M-80 220 Q600 160 1280 220" />
          </g>
        </svg>
        <div className="wrap">
          <Link className="back" to="/"><Back /> Volver al inicio</Link>
          <div className="title"><Trophy size={40} color="rgba(255,255,255,.9)" /><h1>{c.name}</h1></div>
          <div className="meta">
            <span className="pill">{c.win}</span><span className="pill">{STATUS_LABEL[c.status]}</span><span className="pill">{kindPill}</span>
            {hasJornadas && <span className="pill">{c.months.length} jornadas</span>}
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

          {hasJornadas && (
            <div className="jornada-bar">
              <span className="jb-label">Jornada:</span>
              <button className={`jpill ${!jornada ? 'active' : ''}`} onClick={() => setJornada(null)}>General</button>
              {c.months.map((mon, idx) => (
                <button key={mon} className={`jpill ${jornada === idx + 1 ? 'active' : ''} ${idx + 1 > c.played ? 'pend' : ''}`}
                  onClick={() => setJornada(idx + 1)}>{mon}</button>
              ))}
            </div>
          )}

          {content}
        </div>
      </section>
    </>
  );
}
