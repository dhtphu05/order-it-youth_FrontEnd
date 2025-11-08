"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function OrderCheckout() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to new checkout page
    router.push("/checkout")
  }, [router])

  return null
}
