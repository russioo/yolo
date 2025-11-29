# YOLO Meme Generator

## Setup

1. **Få en KIE.AI API Key**
   - Besøg https://kie.ai/api-key
   - Opret en konto og få din API key

2. **Tilføj API Key til miljøvariabler**
   
   Opret en `.env.local` fil i projektets rod:
   ```bash
   KIE_AI_API_KEY=din_api_key_her
   NEXT_PUBLIC_BASE_URL=https://din-deployment-url.vercel.app
   ```

3. **YOLO Mascot Template**
   - Template billede: `public/template.png`
   - This image is used as the base for all meme generations
   - Replace with your own YOLO mascot if needed (JPG, PNG, WEBP formats supported)

4. **Deploy til Vercel**
   - Tilføj `KIE_AI_API_KEY` som environment variable i Vercel dashboard
   - Tilføj `NEXT_PUBLIC_BASE_URL` med din Vercel URL

## Brug

1. Klik på "Meme Generator" knappen i øverste højre hjørne
2. Indtast en beskrivelse af dit meme (fx: "wearing sunglasses at a party")
3. Klik "Generer Meme"
4. Vent mens AI'en genererer dit meme
5. Download dit færdige meme!

## Features

- ✨ AI-generated memes based on YOLO mascot template
- 🎨 Automatically includes mascot character in all memes
- 📱 Works on desktop and mobile
- ⬇️ Download generated memes directly
- 🚀 No database required - powered by KIE.AI API only

## Technology

- **Next.js 16** - React framework
- **KIE.AI GPT-4o Image API** - AI meme generation
- **No Database** - Stateless, API-only architecture

## API Credits

Meme generation uses KIE.AI credits. Check your balance at https://kie.ai/billing

