# Environment Variables Setup

## Step 1: Upload Template to Imgur

1. Go to https://imgur.com/upload
2. Upload `public/template.png`
3. Click on the uploaded image
4. Right-click → "Copy image address"
5. You'll get a URL like: `https://i.imgur.com/abc123.png`

## Step 2: Create Environment Variables

Create a `.env.local` file in the root of your project:

```bash
# KIE.AI API Key (REQUIRED)
KIE_AI_API_KEY=your_api_key_here

# Template Image URL (REQUIRED)
# Use the direct Imgur image URL (must end with .png/.jpg)
TEMPLATE_IMAGE_URL=https://i.imgur.com/your-image.png
```

**Important:** Make sure to use the DIRECT image URL (ending with .png), not the Imgur page URL!

## Step 3: Local Development

1. Make sure you have both environment variables in `.env.local`
2. Run `npm run dev`
3. Go to http://localhost:3000/meme
4. Test meme generation!

## Step 4: Production Deployment

Add BOTH environment variables to your hosting platform:
- `KIE_AI_API_KEY` = your KIE.AI API key
- `TEMPLATE_IMAGE_URL` = your Imgur direct image URL

Then deploy!

## How It Works

1. User enters meme prompt
2. Backend uses `fileUrl` parameter with your Imgur template URL
3. KIE.AI generates meme based on template + prompt
4. User downloads the generated meme!

Simple and reliable! ✅

## Get KIE.AI API Key

1. Visit https://kie.ai/api-key
2. Sign up or log in
3. Generate your API key
4. Copy and paste it into your environment variables

**Note:** Keep your API key secret and never commit it to GitHub!

