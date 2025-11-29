import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  return NextResponse.json({
    kieApiKeySet: !!process.env.KIE_AI_API_KEY,
    kieApiKeyLength: process.env.KIE_AI_API_KEY?.length || 0,
    templateUrlSet: !!process.env.TEMPLATE_IMAGE_URL,
    templateUrl: process.env.TEMPLATE_IMAGE_URL || "NOT SET",
  })
}

