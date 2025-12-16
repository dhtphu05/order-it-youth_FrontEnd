"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Timer } from "lucide-react"

import { Button } from "@/components/ui/button"
import FallingPetals from "./falling-petals"

const CAMPAIGN_START_DATE = new Date("2026-01-31T04:00:00+07:00")
const CAMPAIGN_START_LABEL = new Intl.DateTimeFormat("vi-VN", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
}).format(CAMPAIGN_START_DATE)

const MS_PER_SECOND = 1000
const MS_PER_MINUTE = MS_PER_SECOND * 60
const MS_PER_HOUR = MS_PER_MINUTE * 60
const MS_PER_DAY = MS_PER_HOUR * 24

type CountdownState = {
  days: number
  hours: number
  minutes: number
  seconds: number
  isComplete: boolean
}

const calculateTimeDifference = (): CountdownState => {
  const now = Date.now()
  const distance = Math.max(0, CAMPAIGN_START_DATE.getTime() - now)

  const days = Math.floor(distance / MS_PER_DAY)
  const hours = Math.floor((distance % MS_PER_DAY) / MS_PER_HOUR)
  const minutes = Math.floor((distance % MS_PER_HOUR) / MS_PER_MINUTE)
  const seconds = Math.floor((distance % MS_PER_MINUTE) / MS_PER_SECOND)

  return {
    days,
    hours,
    minutes,
    seconds,
    isComplete: distance === 0,
  }
}

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [timeLeft, setTimeLeft] = useState<CountdownState>(() => calculateTimeDifference())

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const parentElement = canvas.parentElement as HTMLElement
    if (!parentElement) return

    const setupCanvas = () => {
      canvas.width = parentElement.clientWidth
      canvas.height = parentElement.clientHeight
    }

    setupCanvas()

    const particles: any[] = []
    const particleCount = 50

    class Particle {
      x: number; y: number; vx: number; vy: number; radius: number; opacity: number; life: number;
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.vx = (Math.random() - 0.5) * 2
        this.vy = (Math.random() - 0.5) * 2
        this.radius = Math.random() * 2 + 1
        this.opacity = Math.random() * 0.5 + 0.3
        this.life = 1
      }
      update() {
        this.x += this.vx
        this.y += this.vy
        this.life -= 0.005
        this.opacity = Math.max(0, this.opacity - 0.01)
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1
      }
      draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = `rgba(165, 200, 88, ${this.opacity})`
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle, index) => {
        if (particle.life <= 0) {
          particles[index] = new Particle()
        }
        particle.update()
        particle.draw(ctx as CanvasRenderingContext2D)
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      setupCanvas()
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setTimeLeft(calculateTimeDifference())
    }, 1000)

    return () => window.clearInterval(intervalId)
  }, [])

  const countdownItems = [
    { label: "Ngày", value: String(timeLeft.days).padStart(2, "0") },
    { label: "Giờ", value: String(timeLeft.hours).padStart(2, "0") },
    { label: "Phút", value: String(timeLeft.minutes).padStart(2, "0") },
    { label: "Giây", value: String(timeLeft.seconds).padStart(2, "0") },
  ]

  return (
    <section 
      className="relative overflow-hidden min-h-screen flex flex-col justify-center items-center px-4"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src="/bg3.png"
          alt="Hero Background"
          fill={true}
          priority={true}
          objectFit="cover"
          objectPosition="top"
        />
      </div>
      
      <FallingPetals petalImageSrc="/animations/petal.png" numberOfPetals={40} />
      
      <div className="absolute inset-0 bg-black/20 z-10" />

      <canvas ref={canvasRef} className="absolute inset-0 z-10" /> 
        
      <div className="absolute inset-0 z-10">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-[#FCE8E7] rounded-full mix-blend-multiply blur-3xl opacity-30 animate-float" />
        <div
          className="absolute top-1/3 right-1/3 w-96 h-96 bg-[#FCEDBE] rounded-full mix-blend-multiply blur-3xl opacity-30"
          style={{ animation: "float 4s ease-in-out infinite 2s" }}
        />
        <div
          className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-[#D3E281] rounded-full mix-blend-multiply blur-3xl opacity-30"
          style={{ animation: "float 4s ease-in-out infinite 4s" }}
        />
      </div>

      <div className="relative z-20 flex flex-col items-center text-center max-w-3xl space-y-6 py-20"> 
        <Image
          src="/new_title2.svg"
          alt="Xuân 2026 Logo"
          width={580}
          height={420}
          className="mx-auto"
        />

        <div className="flex flex-col sm:flex-row gap-4 mt-0.5 animate-fadeInUp" style={{ animationDelay: "0.3s" }}>
          <Link href="#donate">
            <Button className="group bg-[#A5C858] hover:bg-[#92B94F] text-white px-10 py-4 text-xl font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl animate-bounce-soft">
              <span className="flex items-center gap-2">Gửi chút hơi ấm</span>
            </Button>
          </Link>

          {/* <Link href="#charity-support">
            <Button className="border-2 border-[#A5C858] hover:bg-[#A5C858]/10 px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-300 bg-white/10 backdrop-blur-sm text-white hover:text-white">
              Ủng hộ
            </Button>
          </Link> */}
        </div>

        <div className="w-full max-w-3xl mt-8 space-y-4 animate-fadeInUp" style={{ animationDelay: "0.5s" }}>
          <div className="flex items-center justify-center gap-2 text-white/90 text-xs uppercase tracking-[0.2em]">
            <Timer className="size-4" />
            <span>Đếm ngược tới ngày xuất phát</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {countdownItems.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl bg-white/10 border border-white/15 shadow-[0px_15px_35px_rgba(0,0,0,0.25)] backdrop-blur-md px-4 py-5 text-center text-white"
              >
                <p className="text-4xl font-semibold tracking-tight">{item.value}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.3em] text-white/70">{item.label}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-white/80 tracking-wide">
            {timeLeft.isComplete
              ? "Chiến dịch Xuân Tình Nguyện 2026 đang diễn ra! Hãy cùng chung tay lan tỏa yêu thương bằng những ủng hộ của bạn."
              : `Xuân Tình Nguyện 2026 sẽ xuất quân vào ngày ${CAMPAIGN_START_LABEL}-01/02/2026. Cùng đếm ngược nàooooooo!`}
          </p>
        </div>
      </div>
      <style>{`
        @keyframes bounce-soft {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .animate-bounce-soft {
          animation: bounce-soft 2.4s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}
