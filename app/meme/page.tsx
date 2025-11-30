"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function MemePage() {
  const router = useRouter()
  const [prompt, setPrompt] = useState("")
  const [loading, setLoading] = useState(false)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError("Please enter a prompt")
      return
    }

    setLoading(true)
    setError(null)
    setGeneratedImage(null)

    try {
      // Generate meme using template image from env
      const generateResponse = await fetch("/api/generate-meme", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          prompt
        }),
      })

      const data = await generateResponse.json()

      if (!generateResponse.ok) {
        throw new Error(data.error || "Generation failed")
      }

      const taskId = data.taskId

      const pollStatus = async () => {
        const statusResponse = await fetch(`/api/meme-status?taskId=${taskId}`)
        const statusData = await statusResponse.json()

        if (statusData.code === 200 && statusData.data?.state === "success") {
          // Parse resultJson string to get image URLs
          const resultJson = JSON.parse(statusData.data.resultJson || "{}")
          const imageUrl = resultJson.resultUrls?.[0]
          
          if (imageUrl) {
            setGeneratedImage(imageUrl)
            setLoading(false)
          } else {
            throw new Error("No image generated")
          }
        } else if (statusData.data?.state === "fail") {
          const failMsg = statusData.data?.failMsg || "Generation failed"
          throw new Error(failMsg)
        } else {
          // Still processing (waiting, queuing, generating)
          setTimeout(pollStatus, 2000)
        }
      }

      pollStatus()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error")
      setLoading(false)
    }
  }

  const handleDownload = () => {
    if (generatedImage) {
      window.open(generatedImage, "_blank")
    }
  }

  return (
    <main className="min-h-screen w-full bg-background flex flex-col items-center justify-center p-6 relative">
      {/* Back button */}
      <button
        onClick={() => router.push("/")}
        className="absolute top-8 left-8 flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="text-sm uppercase tracking-wider">Back</span>
      </button>

      {/* Main content */}
      <div className="w-full max-w-2xl space-y-12">
        {/* Title */}
        <div className="text-center space-y-4">
          <h1 className="text-6xl md:text-8xl font-bold tracking-[0.3em]">
            <span className="text-primary">YOLO</span>
          </h1>
          <p className="text-xl md:text-2xl font-light tracking-[0.2em] text-foreground">
            MEME GENERATOR
          </p>
        </div>

        {/* Generator form */}
        <div className="space-y-6">
          <div className="space-y-4">
            <Input
              placeholder="Describe your meme... (e.g., 'sitting in a porsche')"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !loading && handleGenerate()}
              disabled={loading}
              className="h-14 text-lg px-6"
            />

            <Button
              onClick={handleGenerate}
              disabled={loading || !prompt.trim()}
              className="w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground text-lg font-semibold tracking-[0.1em] uppercase transition-colors"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate Meme"
              )}
            </Button>
          </div>

          {error && (
            <div className="text-center text-red-500 bg-red-500/10 py-4 px-6 rounded">
              {error}
            </div>
          )}

          {generatedImage && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <div className="relative aspect-square bg-black rounded-lg overflow-hidden border-2 border-primary/20">
                <img
                  src={generatedImage}
                  alt="Generated YOLO meme"
                  className="w-full h-full object-cover"
                />
              </div>

              <Button
                onClick={handleDownload}
                className="w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground text-lg font-semibold tracking-[0.1em] uppercase transition-colors"
              >
                Download Meme
              </Button>
            </div>
          )}
        </div>

        {/* Info text - larger */}
        <div className="text-center">
          <p className="text-lg md:text-xl font-light tracking-[0.15em] text-primary/80">
            ALL MEMES GENERATED WITH YOLO MASCOT
          </p>
        </div>
      </div>
    </main>
  )
}

