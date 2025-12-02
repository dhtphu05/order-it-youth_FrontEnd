import type { CartItem } from "@/types/cart"

export type LocalOrderStatus = "pending" | "confirmed" | "shipped" | "delivered" | "cancelled"

export interface LocalOrder {
  id: string
  backendCode?: string
  items: CartItem[]
  total: number
  customerName: string
  customerEmail: string
  customerPhone: string
  customerAddress?: string
  deliveryType?: "delivery" | "pickup"
  status: LocalOrderStatus
  paymentMethod?: "vietqr" | "cash"
  createdAt: string
  backendMeta?: {
    payment_status?: string
    order_status?: string
  }
}
