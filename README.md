# Amor en rosa (Angular)

Una landing romántica con orquídeas, paleta en tonos azul/rosa/crema, charts informativos (Chart.js) y una escena navideña con nieve (CSS) + árbol navideño generado/animado en JavaScript.

## Requisitos
- Node.js 18+ (recomendado 20)
- npm

## Ejecutar en local
```bash
npm install
npm start
```

## Build producción
```bash
npm run build:prod
```

## Deploy en Vercel
1. Sube esta carpeta a GitHub.
2. En Vercel: Import Project.
3. Si Vercel no detecta automáticamente, configura:
   - **Build Command**: `npm run build:prod`
   - **Output Directory**: `dist/amor-en-rosa/browser`
4. Listo.

## Personalización rápida
- Texto y narrativa: `src/app/components/hero/*`
- Datos de charts: `src/app/components/charts/charts.component.ts`
- Árbol navideño (JS puro): `src/assets/js/christmas-tree.js`
- Paleta: `src/styles.css`
