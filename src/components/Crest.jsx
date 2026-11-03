// src/components/Crest.jsx
export default function Crest({ team, size = 28 }) {
  if (!team) return null;
  const gid = `cr-${team.id}-${size}`;
  return (
    <svg className="crest" width={size} height={size * 1.16} viewBox="0 0 48 56"
         aria-label={`Escudo ${team.name}`} style={{ flex: 'none', display: 'block' }}>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={team.c1} />
          <stop offset="1" stopColor={team.c2} />
        </linearGradient>
      </defs>
      <path d="M24 2 44 9 V30 Q44 47 24 54 Q4 47 4 30 V9 Z" fill={`url(#${gid})`}
            stroke="rgba(255,255,255,.65)" strokeWidth="1.4" />
      <path d="M4 20 H44" stroke="rgba(255,255,255,.3)" strokeWidth="7" />
      <text x="24" y="31" textAnchor="middle" fontFamily="Anton, sans-serif" fontSize="14" fill="#fff">
        {team.abbr}
      </text>
    </svg>
  );
}
