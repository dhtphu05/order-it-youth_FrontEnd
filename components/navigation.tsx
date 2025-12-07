"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import Image from "next/image"
import { usePathname } from "next/navigation"

export default function Navigation() {
  const pathname = usePathname()
  const isHome = pathname === "/"

  const [isOpen, setIsOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)

  const peach = "#F5B1AC"
  const rose = "#FCE8E7"

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50
      if (scrolled !== isScrolled) setIsScrolled(scrolled)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isScrolled])

  // Cart update listener
  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]")
      const count = cart.reduce((sum: number, item: any) => sum + item.quantity, 0)
      setCartCount(count)
    }

    updateCartCount()
    window.addEventListener("cart-updated", updateCartCount)
    return () => window.removeEventListener("cart-updated", updateCartCount)
  }, [])


  const linkColor = isScrolled || !isHome
    ? "text-gray-900 hover:text-[#A5C858]"
    : "text-white hover:text-[#A5C858]"

  const wrapperClasses = `
    fixed z-40 w-full transition-all duration-300
    ${isScrolled ? "top-3" : "top-5"}
    px-3 sm:px-6 lg:px-8
  `

  const navClasses = `
    mx-auto max-w-5xl rounded-[36px] border border-white/40 bg-white/35
    backdrop-blur-2xl shadow-xl saturate-150
    px-4 sm:px-6
    transition-colors duration-300
  `

  return (
    <div className={wrapperClasses}>
      <nav className={navClasses}>
        <div className="h-16 flex items-center justify-between gap-3">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.svg"
              alt="Logo"
              width={130}
              height={130}
              className="object-contain"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/#charity-support" className={`${linkColor} transition`}>Ủng hộ</Link>
            <Link href="/#activities" className={`${linkColor} transition`}>Hoạt động</Link>
            <Link href="/#marketplace" className={`${linkColor} transition`}>Cửa hàng</Link>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/checkout" className="relative">
              <Button
                variant="outline"
                className="bg-white/40 backdrop-blur-md flex items-center gap-2 hover:bg-[#A5C858] transition"
              >
                <ShoppingCart size={18} />
                Giỏ hàng
                {cartCount > 0 && (
                  <span
                    className="absolute -top-2 -right-2 text-xs font-bold px-2 py-1 rounded-full"
                    style={{ backgroundColor: rose }}
                  >
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>

            <Link href="/my-orders">
              <Button
                variant="outline"
                className="bg-white/40 backdrop-blur-md hover:bg-[#A5C858] transition"
              >
                Đơn hàng
              </Button>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-white/40 backdrop-blur-md rounded-lg"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link href="#charity-support" className="block px-4 py-2 rounded-lg bg-white/60 text-gray-900">Ủng hộ</Link>
            <Link href="#activities" className="block px-4 py-2 rounded-lg bg-white/60 text-gray-900">Hoạt động</Link>
            <Link href="#marketplace" className="block px-4 py-2 rounded-lg bg-white/60 text-gray-900">Cửa hàng</Link>
            <Link href="/my-orders" className="block px-4 py-2 rounded-lg bg-white/60 text-gray-900">Đơn hàng</Link>
          </div>
        )}
      </nav>
    </div>
  )
}
