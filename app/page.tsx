"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Volume2, VolumeX } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const [currentTime, setCurrentTime] = useState("")
  const [isMuted, setIsMuted] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" }))
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  }, [])

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play()
      } else {
        videoRef.current.pause()
      }
    }
  }

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setIsMuted(!isMuted)
    }
  }

  return (
    <main className="min-h-screen w-full bg-background flex flex-col items-center justify-center p-6 relative">
      {/* Header with meme generator and clock */}
      <div className="absolute top-8 right-8 flex items-center gap-4">
        <Link
          href="/meme"
          className="px-6 py-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold tracking-[0.05em] uppercase transition-colors text-sm"
        >
          Meme
        </Link>
        <div className="text-2xl font-light tracking-wider text-muted-foreground">{currentTime}</div>
      </div>

      {/* Text above video */}
      <div className="text-center mb-12">
        <h1 className="text-8xl md:text-9xl font-bold tracking-[0.3em] mb-4">
          <span className="text-primary">YOLO</span>
        </h1>
        <p className="text-2xl md:text-3xl font-light tracking-[0.2em] text-foreground">YOU ONLY LIVE ONCE</p>
      </div>

      <div className="w-full max-w-5xl relative group">
        <video
          ref={videoRef}
          className="w-full aspect-video bg-black cursor-pointer"
          onClick={togglePlay}
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/hero-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Mute button overlay */}
        <button
          onClick={toggleMute}
          className="absolute bottom-6 right-6 bg-black/50 hover:bg-black/70 p-3 transition-colors"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeX className="w-6 h-6 text-white" /> : <Volume2 className="w-6 h-6 text-white" />}
        </button>
      </div>

      {/* Wallet address */}
      <div className="mt-6 text-sm text-muted-foreground/50 font-mono">
        CA: 2LkVadXoNgk1y3tHRvzebRukagHXnN7qgs9WeYEtdtPt
      </div>

      {/* Community link */}
      <a
        href="https://x.com/i/communities/1994577905771540895"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-12 bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-4 font-semibold tracking-[0.1em] uppercase transition-colors"
      >
        Join X Community
      </a>
    </main>
  )
}
