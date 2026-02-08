export type DonationPaymentProvider = "VIETQR"

export type DonationPaymentStatus = "PENDING" | "CONFIRMED" | "FAILED"

export interface DonationRequestPayload {
  student_name: string
  student_class?: string
  mssv?: string
  phone?: string
  amount: number
  provider?: DonationPaymentProvider
}

export interface DonationReceipt {
  donation_id: string
  donation_code: string
  payment_provider: DonationPaymentProvider
  vietqr_data?: string | null
}

export interface DonationRecord {
  id: string
  donation_code: string
  student_name: string
  student_class?: string | null
  mssv?: string | null
  amount: number
  pvcd_points: number | null
  payment_status: DonationPaymentStatus
  confirmed_at?: string | null
}

export interface DonationSearchMeta {
  total: number
  page: number
  limit: number
  pages: number
}

export interface DonationSearchResponse {
  data: DonationRecord[]
  meta: DonationSearchMeta
}

export interface DonationSearchParams {
  page?: number
  limit?: number
  mssv?: string
  has_class?: boolean
}
