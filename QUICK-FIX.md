# QUICK FIX - Ny Model (nano-banana-pro) ✅

**OPDATERET:** Nu bruger vi `/api/v1/jobs/createTask` og `/api/v1/jobs/recordInfo`

## Step 1: Upload Template til Imgur

1. Gå til: https://imgur.com/upload
2. Upload `public/template.png`
3. Klik på det uploadede billede (det åbner i en ny side)
4. **VIGTIGT:** Højreklik på billedet → "Copy image address"
5. URL'en SKAL ende med `.png` (fx: `https://i.imgur.com/abc123.png`)

❌ FORKERT: `https://imgur.com/a/IUq8PW8` (album link)
✅ KORREKT: `https://i.imgur.com/abc123.png` (direkte billede link)

## Step 2: Opdater .env.local

Åbn `.env.local` i project root og tilføj:

```bash
KIE_AI_API_KEY=9b3bb07759cf9e758c9872d3a089d919
TEMPLATE_IMAGE_URL=https://i.imgur.com/din-image.png
```

**Erstat** `https://i.imgur.com/din-image.png` med din egen Imgur URL!

## Step 3: Test Configuration

1. Start development server: `npm run dev`
2. Åbn browser: http://localhost:3000/api/test-config
3. Tjek at der står:
   - `kieApiKeySet: true`
   - `templateUrlSet: true`
   - `templateUrl: https://i.imgur.com/...`

Hvis der står `false`, er environment variables ikke sat korrekt!

## Step 4: Test Meme Generator

1. Gå til: http://localhost:3000/meme
2. Skriv en prompt (fx: "sitting in a porsche")
3. Klik "Generate Meme"
4. Tjek console (F12) for fejl hvis det ikke virker

## Step 5: Deploy til Production

1. Gå til din hosting platform (Vercel/etc)
2. Settings → Environment Variables
3. Tilføj BÅDE:
   - `KIE_AI_API_KEY=9b3bb07759cf9e758c9872d3a089d919`
   - `TEMPLATE_IMAGE_URL=https://i.imgur.com/din-image.png`
4. Redeploy

## Debugging

Hvis det stadig ikke virker:
1. Tjek browser console (F12) for fejl
2. Tjek server logs for fejl
3. Tjek at Imgur URL'en virker (åbn i ny tab)
4. Sørg for at det er en DIREKTE image URL (ender med .png)

## Hvad jeg har ændret:

✅ Tilføjet bedre error logging  
✅ Tilføjet /api/test-config endpoint til at teste setup  
✅ Klarere error messages  
✅ Bruger `fileUrl` parameter (som virker bedre)  

Alt skulle virke nu!

