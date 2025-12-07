"use client"

import { useCallback, useEffect, useMemo, useState } from "react"

import {
  combosControllerListCombos,
  productsControllerListProducts,
} from "@/lib/api/generated/endpoints/orderITYouthAdminAPI"
import type {
  ComboComponentDto,
  ComboResponseDto,
  ProductResponseDto,
  ProductVariantDto,
} from "@/lib/api/generated/models"

export type MarketplaceProduct = {
  id: string
  kind: "product" | "combo"
  productId?: string
  comboId?: string
  variantId?: string
  name: string
  description?: string
  price: number
  priceVersion: number
  stock: number
  badge?: string
  imageUrl: string
  components?: ComboComponentDto[]
  raw: {
    product?: ProductResponseDto
    variant?: ProductVariantDto
    combo?: ComboResponseDto
  }
}

const resolveDescription = (description: ProductResponseDto["description"]) => {
  if (!description) return undefined
  if (typeof description === "string") return description
  if (typeof description === "object") {
    const maybeText = (description as Record<string, unknown>).text ?? (description as Record<string, unknown>).content
    if (typeof maybeText === "string") {
      return maybeText
    }
    return JSON.stringify(description)
  }
  return undefined
}

const buildDisplayName = (product: ProductResponseDto, variant: ProductVariantDto) => {
  const extras = [variant.option1, variant.option2].filter(Boolean)
  if (extras.length === 0) {
    return product.name
  }
  return `${product.name} (${extras.join(" / ")})`
}

export function useProducts() {
  const [products, setProducts] = useState<MarketplaceProduct[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const normalizeProducts = useCallback((list: ProductResponseDto[]) => {
    const normalized: MarketplaceProduct[] = []
    
    list.forEach((product) => {
      if (!product.variants || product.variants.length === 0) {
        return
      }
      
      const productName = product.name.trim()
      let customImageId = product.id; // Giá trị mặc định là product.id

      
      if (productName.includes("Nui chiên")) {
          customImageId = "nui-chien"; 
      } else if (productName.includes("Su kem")) {
          customImageId = "su-kem"; 
      }

      product.variants.forEach((variant) => {
        normalized.push({
          id: variant.id,
          kind: "product",
          productId: product.id,
          variantId: variant.id,
          name: buildDisplayName(product, variant),
          description: resolveDescription(product.description),
          price: variant.price_vnd,
          priceVersion: variant.price_version,
          stock: variant.stock,
          badge: variant.sku,
          imageUrl: `/products/${customImageId}.png`,
          raw: {
            product,
            variant,
          },
        })
      })
    })
    return normalized
  }, [])

  const computeComboBasePrice = (combo: ComboResponseDto) =>
    combo.components?.reduce(
      (sum, component) => sum + (component.variant?.price_vnd ?? 0) * (component.quantity ?? 0),
      0,
    ) ?? 0

  const normalizeCombos = useCallback((combos: ComboResponseDto[]) => {
    return combos.map((combo) => {
      const basePrice = computeComboBasePrice(combo)
      let finalPrice = basePrice

      switch (combo.pricing_type) {
        case "FIXED_PRICE":
          finalPrice = combo.list_price_vnd ?? basePrice
          break
        case "SUM_MINUS_AMOUNT":
          finalPrice = Math.max(basePrice - (combo.amount_off_vnd ?? 0), 0)
          break
        case "SUM_MINUS_PERCENT":
          finalPrice = Math.max(basePrice - basePrice * ((combo.percent_off ?? 0) / 100), 0)
          break
        case "SUM_COMPONENTS":
        default:
          finalPrice = basePrice
      }

      const componentsSummary = combo.components
        ?.map((component) => {
          const sku = component.variant?.sku ?? component.variant?.id ?? "Sản phẩm"
          return `${sku} × ${component.quantity}`
        })
        .join(", ")

      return {
        id: `combo-${combo.id}`,
        kind: "combo" as const,
        comboId: combo.id,
        name: combo.name,
        description: componentsSummary,
        price: finalPrice,
        priceVersion: combo.price_version,
        stock: Number.MAX_SAFE_INTEGER,
        badge: "Combo",
        imageUrl: "/placeholder.jpg",
        components: combo.components,
        raw: {
          combo,
        },
      }
    })
  }, [])

  const fetchProducts = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const [productResult, comboResult] = await Promise.allSettled([
        productsControllerListProducts(),
        combosControllerListCombos(),
      ])

      if (productResult.status !== "fulfilled") {
        throw productResult.reason ?? new Error("Không tải được sản phẩm")
      }

      const productData = Array.isArray(productResult.value?.data)
        ? (productResult.value.data as ProductResponseDto[])
        : []

      const comboData =
        comboResult.status === "fulfilled" && Array.isArray(comboResult.value?.data)
          ? (comboResult.value.data as ComboResponseDto[])
          : []

      const normalizedProducts = normalizeProducts(productData)
      const normalizedCombos = normalizeCombos(comboData)

      setProducts([...normalizedProducts, ...normalizedCombos])
    } catch (err: any) {
      console.error("[useProducts] Failed to load products", err)
      setError(err?.response?.data?.message ?? "Không tải được danh sách sản phẩm.")
      setProducts([])
    } finally {
      setIsLoading(false)
    }
  }, [normalizeProducts, normalizeCombos])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const groupedProducts = useMemo(() => products, [products])

  return {
    products: groupedProducts,
    isLoading,
    error,
    reload: fetchProducts,
  }
}
