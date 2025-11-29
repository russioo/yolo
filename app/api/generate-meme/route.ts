import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json()

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
    }

    const apiKey = process.env.KIE_AI_API_KEY
    const templateUrl = process.env.TEMPLATE_IMAGE_URL

    console.log("API Key exists:", !!apiKey)
    console.log("Template URL:", templateUrl)

    if (!apiKey) {
      return NextResponse.json({ error: "KIE_AI_API_KEY not configured" }, { status: 500 })
    }

    if (!templateUrl) {
      return NextResponse.json({ error: "TEMPLATE_IMAGE_URL not configured" }, { status: 500 })
    }

    const requestBody = {
      model: "nano-banana-pro",
      input: {
        prompt: prompt,
        image_input: [templateUrl],
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

    const data = await response.json()
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

