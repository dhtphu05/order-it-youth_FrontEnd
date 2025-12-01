/**
 * Shared cart data shape used by the checkout flow, marketplace, and any new Orval integration.
 */
export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image?: string

  // Optional metadata required by the backend DTO
  variantId?: string
  comboId?: string
  priceVersion?: number
  clientPriceVnd?: number
}
