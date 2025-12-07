const REFERRAL_KEY = "oiy_referral_team_code"
export const REFERRAL_UPDATED_EVENT = "referral-code-updated"

const dispatchReferralEvent = (code: string | null) => {
  if (typeof window === "undefined") return
  window.dispatchEvent(new CustomEvent(REFERRAL_UPDATED_EVENT, { detail: code }))
}

export function saveReferralCode(code: string) {
  if (typeof window === "undefined" || !code) return
  try {
    window.localStorage.setItem(REFERRAL_KEY, code)
    dispatchReferralEvent(code)
  } catch {
    // ignore storage issues
  }
}

export function getReferralCode(): string | null {
  if (typeof window === "undefined") return null
  try {
    return window.localStorage.getItem(REFERRAL_KEY)
  } catch {
    return null
  }
}

export function clearReferralCode() {
  if (typeof window === "undefined") return
  try {
    window.localStorage.removeItem(REFERRAL_KEY)
    dispatchReferralEvent(null)
  } catch {
    // ignore storage issues
  }
}
