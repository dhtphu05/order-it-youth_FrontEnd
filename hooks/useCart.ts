"use client"

import { useCallback, useEffect, useState } from "react"
import type { CartItem } from "@/types/cart"

const CART_KEY = "cart"
const CART_UPDATED_EVENT = "cart-updated"

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([])

  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }
    try {
      const stored = window.localStorage.getItem(CART_KEY)
      if (!stored) {
        return
      }
      const parsed = JSON.parse(stored)
      if (Array.isArray(parsed)) {
        setCart(parsed)
      }
    } catch (error) {
      console.error("[useCart] failed to parse saved cart", error)
    }
  }, [])

  const persistCart = useCallback((nextCart: CartItem[]) => {
    setCart(nextCart)

    if (typeof window === "undefined") {
      return
    }

    try {
      window.localStorage.setItem(CART_KEY, JSON.stringify(nextCart))
      window.dispatchEvent(
        new CustomEvent(CART_UPDATED_EVENT, {
          detail: {
            cart: nextCart,
          },
        }),
      )
    } catch (error) {
      console.error("[useCart] failed to persist cart", error)
    }
  }, [])

  const addItem = useCallback(
    (item: CartItem) => {
      persistCart([...cart, item])
    },
    [cart, persistCart],
  )

  const removeItem = useCallback(
    (id: string) => {
      persistCart(cart.filter((entry) => entry.id !== id))
    },
    [cart, persistCart],
  )

  const updateQuantity = useCallback(
    (id: string, quantity: number) => {
      persistCart(
        cart.map((entry) => (entry.id === id ? { ...entry, quantity } : entry)),
      )
    },
    [cart, persistCart],
  )

  const clearCart = useCallback(() => {
    persistCart([])
  }, [persistCart])

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return {
    cart,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalPrice,
  }
}
