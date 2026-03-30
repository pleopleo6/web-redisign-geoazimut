# Netlify Deploy

## Option 1 — Drag and drop (fastest)

1. In this project, build the site:

```bash
npm run build
```

2. Open Netlify
3. Create a new site or open an existing one
4. Drag the `dist/` folder into Netlify deploys

## Option 2 — Connect Git repo (recommended)

If you want continuous deployment:

### Build settings
- **Build command:** `npm run build`
- **Publish directory:** `dist`

### Node version
If needed, set Node 22 in Netlify environment variables or `.nvmrc`.

## Notes
This is a Vite static site, so no special server config is required.
