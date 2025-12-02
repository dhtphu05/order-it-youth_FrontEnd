"use client"

import { useCallback, useEffect, useState } from "react"
import type { LocalOrder } from "@/types/order"

const ORDERS_STORAGE_KEY = "orders"

export function useMyOrders() {
  const [orders, setOrdersState] = useState<LocalOrder[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadFromLocalStorage = useCallback((): LocalOrder[] => {
    if (typeof window === "undefined") {
      return []
    }
    try {
      const raw = window.localStorage.getItem(ORDERS_STORAGE_KEY)
      if (!raw) {
        return []
      }
      const parsed = JSON.parse(raw)
      return Array.isArray(parsed) ? parsed : []
    } catch (e) {
      console.error("[useMyOrders] Failed to parse orders from localStorage", e)
      return []
    }
  }, [])

  const persistOrders = useCallback((nextOrders: LocalOrder[]) => {
    setOrdersState(nextOrders)
    if (typeof window !== "undefined") {
      window.localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(nextOrders))
    }
  }, [])

  const reload = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    const localOrders = loadFromLocalStorage()

    // No public backend endpoint for listing customer orders yet.
    // We keep using the mirrored orders saved in localStorage.
    persistOrders(localOrders)
    setIsLoading(false)
  }, [loadFromLocalStorage, persistOrders])

  useEffect(() => {
    reload()
    if (typeof window !== "undefined") {
      const handler = () => reload()
      window.addEventListener("order-completed", handler)
      return () => window.removeEventListener("order-completed", handler)
    }
  }, [reload])

  return {
    orders,
    setOrders: persistOrders,
    isLoading,
    error,
    reload,
  }
}
