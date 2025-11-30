import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { prompt, imageUrl } = await request.json()

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
    }

    if (!imageUrl) {
      return NextResponse.json({ error: "Image URL is required" }, { status: 400 })
    }

    const apiKey = process.env.KIE_AI_API_KEY

    console.log("API Key exists:", !!apiKey)
    console.log("Image URL:", imageUrl)
    console.log("Prompt:", prompt)

    if (!apiKey) {
      return NextResponse.json({ error: "KIE_AI_API_KEY not configured" }, { status: 500 })
    }

    // Generate meme with user's image URL
    const requestBody = {
      model: "nano-banana-pro",
      input: {
        prompt: prompt,
        image_input: [imageUrl],
        aspect_ratio: "1:1",
        resolution: "1K",
        output_format: "png",
      },
    }

    console.log("Sending request to KIE.AI:", JSON.stringify(requestBody, null, 2))

    const response = await fetch("https://api.kie.ai/api/v1/jobs/createTask", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })

    console.log("Response status:", response.status)
    console.log("Response headers:", Object.fromEntries(response.headers.entries()))

    const responseText = await response.text()
    console.log("Response text:", responseText.substring(0, 500))

    let data
    try {
      data = JSON.parse(responseText)
    } catch (parseError) {
      console.error("Failed to parse response as JSON:", parseError)
      return NextResponse.json(
        { error: `API returned invalid response: ${responseText.substring(0, 200)}` },
        { status: 500 }
      )
    }

    console.log("KIE.AI response:", JSON.stringify(data, null, 2))

    if (data.code !== 200) {
      return NextResponse.json(
        { error: `KIE.AI error: ${data.message || "Unknown error"}`, details: data },
        { status: 500 }
      )
    }

    return NextResponse.json({ taskId: data.data.taskId })
  } catch (error: any) {
    console.error("Meme generation error:", error)
    return NextResponse.json({ error: `Server error: ${error.message}` }, { status: 500 })
  }
}

