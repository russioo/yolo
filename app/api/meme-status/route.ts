import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const taskId = request.nextUrl.searchParams.get("taskId")

    if (!taskId) {
      return NextResponse.json({ error: "TaskId is required" }, { status: 400 })
    }

    const response = await fetch(`https://api.kie.ai/api/v1/jobs/recordInfo?taskId=${taskId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.KIE_AI_API_KEY}`,
      },
    })

    const data = await response.json()
    console.log("Status check response:", JSON.stringify(data, null, 2))

    return NextResponse.json(data)
  } catch (error) {
    console.error("Meme status error:", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

