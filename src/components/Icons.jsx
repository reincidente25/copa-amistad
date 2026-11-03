// src/components/Icons.jsx
const base = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' };

export const Trophy = ({ size = 24, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base} stroke={color || 'currentColor'}>
    <path d="M8 3h8v5a4 4 0 0 1-8 0V3Z" /><path d="M8 5H5v1a3 3 0 0 0 3 3M16 5h3v1a3 3 0 0 1-3 3M10 13v3M14 13v3M8 20h8M9 20l.5-4M15 20l-.5-4" />
  </svg>
);
export const Arrow = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth="2.4"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);
export const Gear = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base}>
    <circle cx="12" cy="12" r="3.2" />
    <path d="M12 2.5v2M12 19.5v2M4.5 12h-2M21.5 12h-2M5.6 5.6 7 7M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4" />
  </svg>
);
export const Menu = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth="2.2"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
);
export const Plus = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth="2.2"><path d="M12 5v14M5 12h14" /></svg>
);
export const Trash = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base}><path d="M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13" /></svg>
);
export const Back = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth="2.2"><path d="M19 12H5M11 18l-6-6 6-6" /></svg>
);
export const icons = {
  grid: (s) => <svg width={s} height={s} viewBox="0 0 24 24" {...base}><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></svg>,
  shield: (s) => <svg width={s} height={s} viewBox="0 0 24 24" {...base}><path d="M12 3l7 3v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6l7-3Z" /></svg>,
  user: (s) => <svg width={s} height={s} viewBox="0 0 24 24" {...base}><circle cx="12" cy="8" r="3.4" /><path d="M5 20a7 7 0 0 1 14 0" /></svg>,
  ball: (s) => <svg width={s} height={s} viewBox="0 0 24 24" {...base}><circle cx="12" cy="12" r="9" /><path d="M12 7l4 3-1.5 5h-5L8 10l4-3Z" /></svg>,
  cup: (s) => <Trophy size={s} />,
};
