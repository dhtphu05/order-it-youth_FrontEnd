"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]")
      const count = cart.reduce((sum: number, item: any) => sum + item.quantity, 0)
      setCartCount(count)
      console.log("[v0] Cart count updated:", count)
    }

    updateCartCount()

    window.addEventListener("cart-updated", updateCartCount)
    return () => window.removeEventListener("cart-updated", updateCartCount)
  }, [])

  return (
    <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">XTN</span>
            </div>
            <span className="font-bold text-lg text-blue-900">Xuân Tình Nguyện</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/#activities" className="text-gray-700 hover:text-blue-600 transition">
              Hoạt động
            </Link>
            <Link href="/#transparency" className="text-gray-700 hover:text-blue-600 transition">
              Minh bạch
            </Link>
            <Link href="/#marketplace" className="text-gray-700 hover:text-blue-600 transition">
              Cửa hàng
            </Link>
            <Link href="/my-orders" className="text-gray-700 hover:text-blue-600 transition">
              Đơn hàng
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link href="/checkout" className="relative">
              <Button
                variant="outline"
                className="border-blue-200 hover:bg-blue-50 bg-transparent flex items-center gap-2"
              >
                <ShoppingCart size={18} />
                Giỏ hàng
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>
            <Link href="/my-orders">
              <Button variant="outline" className="border-blue-200 hover:bg-blue-50 bg-transparent">
                Đơn hàng của tôi
              </Button>
            </Link>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">Tham gia ngay</Button>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 hover:bg-gray-100 rounded-lg">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link href="#activities" className="block px-4 py-2 hover:bg-blue-50 rounded-lg">
              Hoạt động
            </Link>
            <Link href="#transparency" className="block px-4 py-2 hover:bg-blue-50 rounded-lg">
              Minh bạch
            </Link>
            <Link href="#marketplace" className="block px-4 py-2 hover:bg-blue-50 rounded-lg">
              Cửa hàng
            </Link>
            <Link href="/my-orders" className="block px-4 py-2 hover:bg-blue-50 rounded-lg">
              Đơn hàng của tôi
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
