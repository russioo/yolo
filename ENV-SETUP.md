# Environment Variables Setup

Create a `.env.local` file in the root of your project:

```bash
# KIE.AI API Key (REQUIRED)
KIE_AI_API_KEY=your_api_key_here
```

**That's it!** No need to upload template images anywhere - users upload their own reference images directly in the app!

## Local Development

1. Add your API key to `.env.local`
2. Run `npm run dev`
3. Go to http://localhost:3000/meme
4. Upload your reference image
5. Enter a prompt
6. Generate memes!

## Production Deployment

Add environment variable to your hosting platform:
- `KIE_AI_API_KEY` = your KIE.AI API key

Then deploy!

## How It Works

1. User uploads their own reference image
2. Image is uploaded to KIE.AI file storage
3. Meme is generated with the uploaded image + user's prompt
4. User downloads the generated meme!

**No manual hosting or template setup required!** ✅

## Get KIE.AI API Key

1. Visit https://kie.ai/api-key
2. Sign up or log in
3. Generate your API key
4. Copy and paste it into your environment variables

**Note:** Keep your API key secret and never commit it to GitHub!

