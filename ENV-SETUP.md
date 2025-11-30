# Environment Variables Setup

Create a `.env.local` file in the root of your project:

```bash
# KIE.AI API Key (REQUIRED)
KIE_AI_API_KEY=your_api_key_here

# Template Image URL (REQUIRED)
# This is the mascot/character image that will be used for all meme generations
TEMPLATE_IMAGE_URL=https://your-image-url.com/template.png
```

## Local Development

1. Add your API key to `.env.local`
2. Add the template image URL (your YOLO mascot image)
3. Run `npm run dev`
4. Go to http://localhost:3000/meme
5. Enter a prompt (e.g., "sitting in a porsche")
6. Generate memes!

## Production Deployment

Add environment variables to your hosting platform:
- `KIE_AI_API_KEY` = your KIE.AI API key
- `TEMPLATE_IMAGE_URL` = URL to your template mascot image

Then deploy!

## How It Works

1. User enters a prompt describing what they want the mascot to do
2. The system uses the TEMPLATE_IMAGE_URL (your mascot) for all generations
3. Meme is generated with the template image + user's prompt
4. User downloads the generated meme!

**All memes use the same template character!** ✅

## Get KIE.AI API Key

1. Visit https://kie.ai/api-key
2. Sign up or log in
3. Generate your API key
4. Copy and paste it into your environment variables

**Note:** Keep your API key secret and never commit it to GitHub!

