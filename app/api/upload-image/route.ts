import { NextRequest, NextResponse } from "next/server"
import { writeFile } from "fs/promises"
import { join } from "path"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const imageFile = formData.get("image") as File

    if (!imageFile) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 })
    }

    console.log("Saving image:", imageFile.name, imageFile.type, imageFile.size)

    // Save to public/uploads folder
    const bytes = await imageFile.arrayBuffer()
    const buffer = Buffer.from(bytes)
    
    const fileName = `upload-${Date.now()}-${imageFile.name.replace(/[^a-zA-Z0-9.]/g, "_")}`
    const filePath = join(process.cwd(), "public", "uploads", fileName)
    
    await writeFile(filePath, buffer)
    
    // Return public URL
    const publicUrl = `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/uploads/${fileName}`
    
    console.log("Image saved to:", publicUrl)
    
    return NextResponse.json({ url: publicUrl })
  } catch (error: any) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: `Upload failed: ${error.message}` }, { status: 500 })
  }
}

