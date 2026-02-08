"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import FallingPetals from "./falling-petals"

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

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
        this.x = Math.random() * canvas!.width
        this.y = Math.random() * canvas!.height
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
        if (this.x < 0 || this.x > canvas!.width) this.vx *= -1
        if (this.y < 0 || this.y > canvas!.height) this.vy *= -1
      }
      draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = `rgba(165, 200, 88, ${this.opacity})`
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    for (let i = 0; i < particleCount; i++) {
      // @ts-ignore
      particles.push(new Particle())
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle, index) => {
        if (particle.life <= 0) {
          // @ts-ignore
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

      <div className="relative z-20 flex flex-col items-center text-center max-w-4xl space-y-8 py-20">
        <Image
          src="/new_title2.svg"
          alt="Xuân 2026 Logo"
          width={580}
          height={420}
          className="mx-auto"
        />

        <div className="w-full max-w-2xl mx-auto mt-6 animate-fadeInUp" style={{ animationDelay: "0.2s" }}>
          <div className="relative overflow-hidden rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 p-8 shadow-2xl hover:bg-white/15 transition-colors duration-500">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-70" />
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-green-400/20 rounded-full blur-3xl" />
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-pink-400/20 rounded-full blur-3xl" />

            <div className="space-y-6 relative z-10">
              <div className="space-y-3">
                {/* <div className="inline-block px-3 py-1 rounded-full bg-green-500/20 border border-green-400/30 backdrop-blur-sm">
                  <p className="text-xs md:text-sm uppercase tracking-[0.15em] text-green-50 font-semibold shadow-sm">
                    Thông báo hoàn thành
                  </p>
                </div> */}

                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white drop-shadow-lg leading-tight tracking-tight">
                  Chiến dịch Xuân Tình Nguyện 2026 <br className="hidden sm:block" /> đã khép lại rực rỡ
                </h2>

                <div className="flex flex-wrap items-center justify-center gap-3 text-base md:text-lg font-medium text-white/95 pt-1">
                  <span className="opacity-90">vào ngày</span>
                  <span className="bg-white/20 px-3 py-1 rounded-lg backdrop-blur-sm border border-white/10 shadow-sm">31/01</span>
                  <span className="opacity-90">&</span>
                  <span className="bg-white/20 px-3 py-1 rounded-lg backdrop-blur-sm border border-white/10 shadow-sm">01/02/2026</span>
                </div>
              </div>

              <div className="h-px w-32 mx-auto bg-gradient-to-r from-transparent via-white/40 to-transparent" />

              <p className="text-lg md:text-xl text-white/95 font-light italic leading-relaxed drop-shadow-sm">
                "Xin chân thành cảm ơn mọi sự đóng góp và đồng hành quý báu của các bạn!"
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-4 animate-fadeInUp" style={{ animationDelay: "0.4s" }}>
          <Link href="#gallery">
            <Button className="group bg-[#A5C858] hover:bg-[#92B94F] text-white px-8 py-6 text-lg font-semibold rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1">
              <span className="flex items-center gap-2">
                Cùng nhìn lại chiến dịch tại đây
                <ArrowDown className="size-5 group-hover:animate-bounce" />
              </span>
            </Button>
          </Link>
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
