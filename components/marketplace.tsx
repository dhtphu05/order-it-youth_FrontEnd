"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ShoppingCart, Check } from "lucide-react"

export default function Marketplace() {
  const [products] = useState([
    {
      id: 1,
      name: "Áo phông tình nguyện",
      price: 150000,
      image: "👕",
      description: "Áo phông chất lượng cao với logo Xuân Tình Nguyện",
      sold: 234,
    },
    {
      id: 2,
      name: "Cốc giữ nhiệt",
      price: 120000,
      image: "☕",
      description: "Cốc thân thiện môi trường, giữ nhiệt tốt",
      sold: 156,
    },
    {
      id: 3,
      name: "Dây tư",
      price: 80000,
      image: "📿",
      description: "Vòng tay may mắn ủng hộ tình nguyện",
      sold: 412,
    },
    {
      id: 4,
      name: "Túi vải tote",
      price: 200000,
      image: "👜",
      description: "Túi vải bền bỉ, tiện dụng cho sinh viên",
      sold: 189,
    },
  ])

  const [addedProduct, setAddedProduct] = useState<number | null>(null)

  const handleAddToCart = (productId: number) => {
    const product = products.find((p) => p.id === productId)
    if (!product) return

    const cart = JSON.parse(localStorage.getItem("cart") || "[]")
    const existing = cart.find((item: any) => item.id === productId)

    if (existing) {
      existing.quantity += 1
    } else {
      cart.push({ ...product, quantity: 1 })
    }

    localStorage.setItem("cart", JSON.stringify(cart))

    setAddedProduct(productId)
    setTimeout(() => setAddedProduct(null), 2000)

    const event = new CustomEvent("cart-updated", { detail: { productId, quantity: existing ? existing.quantity : 1 } })
    window.dispatchEvent(event)
  }

  return (
    <section id="marketplace" className="py-20 md:py-28 px-4 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16 animate-fadeInUp">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">🛍 Cửa hàng IT Youth</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light">
            Mua sắm những sản phẩm ý nghĩa và ủng hộ cộng đồng tình nguyện
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="group card-premium rounded-2xl overflow-hidden border-2 border-primary/10 hover:border-primary/40 transition-all duration-300 hover:shadow-elevated animate-fadeInUp"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 h-48 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/0 to-transparent opacity-0 group-hover:opacity-10 transition-opacity" />
                {product.image}
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg text-foreground mb-2 line-clamp-2">{product.name}</h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      {(product.price / 1000).toFixed(0)}K
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-muted-foreground bg-muted px-3 py-1 rounded-full">
                    {product.sold} bán
                  </span>
                </div>
                <Button
                  onClick={() => handleAddToCart(product.id)}
                  className={`w-full font-semibold py-2 rounded-lg transition-all duration-300 shadow-medium hover:shadow-elevated flex items-center justify-center gap-2 ${
                    addedProduct === product.id
                      ? "bg-green-500 hover:bg-green-600 text-white animate-pulse-glow"
                      : "bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white transform hover:scale-105"
                  }`}
                >
                  {addedProduct === product.id ? (
                    <>
                      <Check size={18} />
                      Đã thêm!
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={18} />
                      Thêm vào giỏ
                    </>
                  )}
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/checkout" className="flex-1 sm:flex-none">
            <Button className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white px-8 py-3 text-lg font-semibold rounded-xl transition-all duration-300 shadow-elevated hover:shadow-glow-blue flex items-center justify-center gap-2 h-12 transform hover:scale-105">
              <ShoppingCart size={20} />
              Đi đến thanh toán
            </Button>
          </Link>
          <Link href="/my-orders" className="flex-1 sm:flex-none">
            <Button
              variant="outline"
              className="w-full border-2 border-primary/40 hover:border-primary/60 text-foreground hover:bg-primary/5 px-8 py-3 text-lg font-semibold rounded-xl transition-all duration-300 h-12 bg-transparent font-medium"
            >
              Xem đơn của tôi
            </Button>
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  )
}
