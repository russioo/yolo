# YOLO Meme Generator

## Setup

1. **Få en KIE.AI API Key**
   - Besøg https://kie.ai/api-key
   - Opret en konto og få din API key

2. **Tilføj API Key til miljøvariabler**
   
   Opret en `.env.local` fil i projektets rod:
   ```bash
   KIE_AI_API_KEY=din_api_key_her
   TEMPLATE_IMAGE_URL=https://din-image-url.com/mascot.png
   ```

3. **YOLO Mascot Template**
   - Upload dit YOLO mascot billede til en hosting service (f.eks. imgbb.com, imgur.com)
   - Tilføj URL'en til `TEMPLATE_IMAGE_URL` i `.env.local`
   - Dette billede bruges som base for alle meme genereringer
   - Understøttede formater: JPG, PNG, WEBP

4. **Deploy til Vercel**
   - Tilføj `KIE_AI_API_KEY` som environment variable i Vercel dashboard
   - Tilføj `TEMPLATE_IMAGE_URL` med URL til dit mascot billede

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

