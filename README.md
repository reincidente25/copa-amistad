# ⚽ Copa Amistad

Sitio web de la liga **Copa Amistad**: un ecosistema de competencias de fútbol amateur
(Liga Apertura/Clausura, copas con fase de grupos + playoffs, y Liga Nacional), con tablas,
goleadores, resultados e históricos. Incluye un panel de administración.

> **Estado:** front-end con **datos mock** (persistidos en el navegador). Todavía sin backend:
> el siguiente paso es conectar Firebase/Firestore.

## Stack

- **React 18** + **Vite 5** + **React Router 6**
- CSS propio con variables (paleta del escudo: navy + dorado), sin frameworks
- Tipografías: Anton (títulos) + Barlow / Barlow Condensed (Google Fonts)

## Estructura

```
src/
├── data/mock.js          ← equipos, jugadores, competencias, noticias + generador de fixture
├── lib/compute.js        ← cálculos derivados (posiciones, goleadores, fixture)
├── store/
│   ├── AppStore.jsx       ← estado global mock + CRUD (persistido en localStorage)
│   └── MockAuth.jsx       ← login simulado del admin
├── components/           ← Crest, Icons, SiteLayout, Displays (tabla, goleadores, etc.)
├── pages/
│   ├── Home.jsx           ← landing (hero, cómo funciona, competencias, noticias, relámpago, históricos)
│   ├── Competition.jsx    ← detalle por competencia (Posiciones · Goleadores · Resultados)
│   ├── Historicos.jsx · Equipos.jsx
│   └── admin/             ← panel: Dashboard, Competencias, Equipos, Jugadores, Resultados
├── App.jsx               ← rutas (público + /admin)
└── index.css             ← sistema de estilos (tema claro/oscuro)
```

## Rutas

- `/` — landing · `/competencia/:id` — detalle · `/historicos` · `/equipos`
- `/admin` — panel de administración (login demo: cualquier email/clave)

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de producción
```

## Datos mock

Todo el contenido es de ejemplo y se guarda en `localStorage`. Desde el panel se pueden crear
competencias, equipos y jugadores, y cargar resultados (las tablas y goleadores se recalculan
solos). El botón **"Restaurar datos de ejemplo"** (Panel) vuelve al estado inicial.

## Próximos pasos

- Conectar Firebase (Auth + Firestore) reemplazando `store/` y `MockAuth`.
- Subida de escudos/fotos reales, generador de llaves (playoffs), más estadística.
