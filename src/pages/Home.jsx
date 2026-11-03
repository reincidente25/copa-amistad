// src/pages/Home.jsx
import { Link } from 'react-router-dom';
import { useStore } from '../store/AppStore';
import { CAT_ORDER, CAT_TITLES, STATUS_LABEL, CURRENT_SEASON } from '../data/mock';
import { teamMap, fixture, compByBase } from '../lib/compute';
import { useSeason } from '../store/Season';
import Crest from '../components/Crest';
import { Trophy, Arrow } from '../components/Icons';
import { NewsCard } from '../components/Displays';
import HistoricosGrid from './HistoricosGrid';

const HOW = [
  ['📅', '2 domingos al mes', 'Una jornada para la Liga y las copas; otra para la Liga Nacional.'],
  ['⚡', 'Jornada relámpago', '16 equipos en 2–3 canchas en simultáneo, repartidos en Turno 1 y 2.'],
  ['🏆', 'La Liga, trampolín', 'El rendimiento en Apertura y Clausura clasifica a las copas.'],
  ['🔄', 'Tablas quincenales', 'Los puntos se acumulan relámpago tras relámpago.'],
];

export default function Home() {
  const { data } = useStore();
  const { season } = useSeason();
  const tm = teamMap(data);
  const pibes = tm.pibes, potrero = tm.potrero;
  const curCl = compByBase(data, 'clausura', CURRENT_SEASON);
  const seasonComps = data.competitions.filter((c) => c.season === season);

  const featured = data.news.find((n) => n.feat) || data.news[0];
  const restNews = data.news.filter((n) => n !== featured).slice(0, 4);

  const relMatches = fixture(data, curCl.id).filter((m) => m.status !== 'played').slice(0, 8);
  const t1 = relMatches.slice(0, 4), t2 = relMatches.slice(4, 8);
  const relRow = (m) => (
    <div className="match-row" key={m.id}>
      <div className="s h"><span className="nm">{tm[m.homeId]?.name}</span><Crest team={tm[m.homeId]} size={24} /></div>
      <div className="sc vs">VS</div>
      <div className="s"><Crest team={tm[m.awayId]} size={24} /><span className="nm">{tm[m.awayId]?.name}</span></div>
    </div>
  );

  return (
    <>
      <section className="hero">
        <svg className="pitch" viewBox="0 0 1200 560" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <g stroke="#2b4a6b" strokeWidth="2" fill="none" opacity="0.9">
            <path d="M-100 560 L420 120" /><path d="M200 560 L520 120" /><path d="M520 560 L620 120" />
            <path d="M860 560 L720 120" /><path d="M1200 560 L820 120" /><path d="M1500 560 L930 120" />
            <path d="M-50 230 Q600 180 1250 230" /><path d="M-80 330 Q600 270 1280 330" /><path d="M-120 460 Q600 380 1320 460" />
          </g>
          <ellipse cx="600" cy="300" rx="150" ry="52" stroke="#2b4a6b" strokeWidth="2" fill="none" />
        </svg>
        <div className="glow" />
        <div className="wrap">
          <div className="hero-copy">
            <div className="eyebrow"><i />Liga Clausura · 6.º relámpago</div>
            <h1>Los Pibes golean y se afirman en <em>la cima</em></h1>
            <p>Triplete de Martín Sosa en la goleada ante Real Potrero. El puntero estira la ventaja y se encamina a las copas.</p>
            <div className="hero-meta">
              <span>📅 <b>2 domingos</b>/mes</span><span>⚡ <b>16 equipos</b> · 2 canchas</span><span>🔄 Tablas <b>quincenales</b></span>
            </div>
            <div className="cta-row">
              <Link className="btn btn-accent" to={`/competencia/${curCl.id}`}>Ver la Clausura <Arrow /></Link>
              <a className="btn btn-ghost" href="#competencias">Las competencias</a>
            </div>
          </div>
          <div className="scoreboard">
            <div className="sb-top"><span>Clausura · La Terminal</span><span className="final">● Final</span></div>
            <div className="sb-teams">
              <div className="t"><Crest team={pibes} size={52} /><span className="nm">Los Pibes</span></div>
              <div className="sb-score">4–0</div>
              <div className="t"><Crest team={potrero} size={52} /><span className="nm">R. Potrero</span></div>
            </div>
            <div className="sb-foot"><span>Goleador: <b>M. Sosa (3)</b></span><span>Posesión <b>63%</b></span></div>
          </div>
        </div>
      </section>

      <section className="band">
        <div className="wrap">
          <div className="sec-head"><div><div className="eyebrow">Cómo funciona</div><h2>Un torneo, muchas competencias</h2><p>Así se juega la Copa Amistad a lo largo del año.</p></div></div>
          <div className="how">
            {HOW.map((h) => (<div className="h" key={h[1]}><div className="ic" style={{ fontSize: 20 }}>{h[0]}</div><h4>{h[1]}</h4><p>{h[2]}</p></div>))}
          </div>
        </div>
      </section>

      <section className="band alt" id="competencias">
        <div className="wrap">
          <div className="sec-head"><div><div className="eyebrow">El calendario · {season}</div><h2>Competencias</h2><p>Entrá a cada una para ver su tabla, goleadores y resultados.</p></div></div>
          {CAT_ORDER.map((cat) => {
            const items = seasonComps.filter((c) => c.cat === cat);
            if (!items.length) return null;
            return (
              <div className="comp-group" key={cat}>
                <h3>{CAT_TITLES[cat]}</h3>
                <div className={`comp-cards ${cat === 'liga' ? 'two' : ''}`}>
                  {items.map((c) => (
                    <Link className="comp-card" to={`/competencia/${c.id}`} key={c.id}>
                      <div className="ch" style={{ background: `linear-gradient(135deg,${c.color},${c.c2})` }}><Trophy size={28} color="#fff" /><span className="nm">{c.name}</span></div>
                      <div className="cb"><span className="win">{c.win}</span><span className={`status ${c.status}`}>{STATUS_LABEL[c.status]}</span></div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="band">
        <div className="wrap">
          <div className="sec-head"><div><div className="eyebrow">Al día</div><h2>Últimas noticias</h2></div></div>
          <div className="news-grid">
            <div className="news-col">{featured && <NewsCard n={{ ...featured, feat: true }} />}</div>
            <div className="news-col small">{restNews.map((n) => <NewsCard key={n.id} n={n} />)}</div>
          </div>
        </div>
      </section>

      <section className="band alt">
        <div className="wrap">
          <div className="sec-head"><div><div className="eyebrow">Próxima jornada</div><h2>Relámpago</h2><p>Los 16 equipos en dos turnos y dos canchas en simultáneo.</p></div></div>
          <div className="relampago">
            <div className="rel-top">
              <div><div className="when">Domingo 9 nov</div><div className="sub">Liga Clausura · 6.º relámpago</div></div>
              <div className="rel-badges"><span className="rel-badge">2 canchas</span><span className="rel-badge">Turnos 1 y 2</span><span className="rel-badge">16 equipos</span></div>
            </div>
            <div className="turnos">
              <div className="turno"><h4>Turno 1 · 10:00 <span className="cancha">Cancha 1 y 2</span></h4>{t1.map(relRow)}</div>
              <div className="turno"><h4>Turno 2 · 12:30 <span className="cancha">Cancha 1 y 2</span></h4>{t2.map(relRow)}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="band">
        <div className="wrap">
          <div className="sec-head"><div><div className="eyebrow">Para la historia</div><h2>Históricos</h2></div><Link className="link" to="/historicos">Ver todos <Arrow /></Link></div>
          <HistoricosGrid tm={tm} limit={3} />
        </div>
      </section>
    </>
  );
}
