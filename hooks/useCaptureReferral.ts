"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { saveReferralCode } from "@/lib/referral"

export function useCaptureReferral() {
  const searchParams = useSearchParams()

  useEffect(() => {
    const ref = searchParams?.get("ref")
    if (ref) {
      saveReferralCode(ref)
    }
  }, [searchParams])
}
