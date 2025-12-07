"use client"

import { useState } from "react"
import Link from "next/link"
import { ShoppingCart, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/useCart"
import { useProducts } from "@/hooks/useProducts"
import type { CartItem } from "@/types/cart"


export default function Marketplace() {
  const { products, isLoading, error, reload } = useProducts()
  const [addedProduct, setAddedProduct] = useState<string | null>(null)
  const { cart, addItem, updateQuantity } = useCart()
  const formatPrice = (value: number) => `${new Intl.NumberFormat("vi-VN").format(value)} Đ`

  const handleAddToCart = (productId: string) => {
    const product = products.find((p) => p.id === productId)
    if (!product) return

    const existing = cart.find((item) => item.id === product.id)

    if (existing) {
      updateQuantity(product.id, existing.quantity + 1)
    } else {
      const newItem: CartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.imageId, 
        variantId: product.id,
        priceVersion: product.priceVersion,
        clientPriceVnd: product.price,
      }
      addItem(newItem)
    }

    setAddedProduct(productId)
    setTimeout(() => setAddedProduct(null), 2000)
  }

  return (
    <section
      id="marketplace"
      className="py-20 md:py-28 px-4 bg-white relative"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16 animate-fadeInUp">
          <h2 className="text-4xl md:text-5xl font-bold text-[#A5C858] mb-4">
            Cửa hàng
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light">
            Hãy gửi chút hơi ấm bằng việc mua những sản phẩm ý nghĩa và ủng hộ chiến dịch Xuân Tình Nguyện cùng chúng mình nhé!
          </p>
          <div className="flex items-center justify-center gap-3 mt-4">
            {error && <span className="text-sm text-red-500">{error}</span>}
            <Button variant="outline" size="sm" className="hover:bg-[#A5C858]" onClick={reload} disabled={isLoading}>
              Làm mới
            </Button>
          </div>
        </div>

        {/* loading skeleton */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="rounded-2xl border-2 border-muted animate-pulse p-6 h-80"
                style={{
                  background: `linear-gradient(135deg, ${leaf}10, transparent)`
                }}
              >
                <div className="h-32 bg-muted rounded-xl mb-4" />
                <div className="h-4 bg-muted rounded mb-2" />
                <div className="h-4 bg-muted rounded w-2/3" />
                <div className="mt-6 h-10 rounded bg-gray-200" />
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#A5C858]/50 p-12 text-center mb-12">
            <p className="text-4xl mb-4">🛒</p>
            <p className="text-lg text-muted-foreground">
              Chưa có sản phẩm nào khả dụng.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {products.map((product, index) => (
              <div
                key={product.id}
                className="rounded-2xl border border-gray-100 bg-white p-5 flex flex-col gap-4 transition hover:-translate-y-1 hover:shadow-lg animate-in fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="h-48 rounded-xl border border-gray-100 overflow-hidden bg-gray-50">
                  <img
                    src={`/products/${product.imageId}.png`}
                    alt={product.name}
                    className="object-cover w-full h-full"
                  />
                </div>

                <div className="p-5">
                  <h3 className="font-bold text-lg text-foreground mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {product.description ?? "Sản phẩm gây quỹ IT Youth"}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="text-3xl font-bold bg-clip-text text-transparent"
                      style={{
                        backgroundImage: leaf
                      }}
                    >
                      {(product.price / 1000).toFixed(0)}K
                    </span>
                    <span
                      className="text-xs font-semibold px-3 py-1 rounded-full"
                      style={{
                        background: sand,
                        // color: "#333"
                      }}
                    >
                      Giá: {product.price}
                    </span>
                  </div>

                <Button
                  onClick={() => handleAddToCart(product.id)}
                  className={`w-full font-semibold py-2 rounded-lg border border-gray-200 transition ${
                    addedProduct === product.id
                      ? "bg-foreground text-white"
                      : "bg-white text-foreground hover:bg-[#A5C858] hover:text-white"
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
            ))}
          </div>
        )}

        {/* footer buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/checkout" className="flex-1 sm:flex-none">
            <Button
              className="w-full px-8 py-3 text-lg font-semibold rounded-xl transition-all duration-300 shadow-elevated flex items-center justify-center gap-2 h-12 transform hover:scale-105 text-white bg-[#A5C858] hover:bg-[#8dbd45]"
            >
              <ShoppingCart size={20} />
              Đi đến thanh toán
            </Button>
          </Link>

          <Link href="/my-orders" className="flex-1 sm:flex-none">
            <Button
              variant="outline"
              className="w-full px-8 py-3 text-lg font-semibold rounded-xl transition-all duration-300 shadow-elevated flex items-center justify-center gap-2 h-12 transform hover:scale-105 text-white border-none bg-[#A5C858] hover:bg-[#8dbd45]"
            >
              Xem đơn của bạn
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
