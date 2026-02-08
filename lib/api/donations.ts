import type {
  DonationReceipt,
  DonationRequestPayload,
  DonationSearchParams,
  DonationSearchResponse,
} from "@/types/donation"

const DEFAULT_API_BASE_URL = "https://api.lcdkhoacntt-dut.live"

const normalizeBaseUrl = (url: string) => url.replace(/\/+$/, "")

const API_BASE_URL = normalizeBaseUrl(process.env.NEXT_PUBLIC_API_BASE_URL ?? DEFAULT_API_BASE_URL)
const API_ROOT = `${API_BASE_URL}/api`

const parseResponse = async (response: Response) => {
  const text = await response.text()
  if (!text) {
    return null
  }

  try {
    return JSON.parse(text) as unknown
  } catch (error) {
    console.warn("[donationsApi] Failed to parse JSON response", error)
    return null
  }
}

const handleResponse = async <T>(response: Response): Promise<T> => {
  const data = await parseResponse(response)

  if (!response.ok) {
    let parsedMessage: string | null = null
    if (typeof data === "object" && data !== null && "message" in data) {
      const candidate = (data as { message?: unknown }).message
      parsedMessage = typeof candidate === "string" ? candidate : null
    }

    const message = parsedMessage ?? `Donation API trả về lỗi ${response.status}`
    throw new Error(message)
  }

  return (data as T) ?? ({} as T)
}

export const createDonationRequest = async (
  payload: DonationRequestPayload,
): Promise<DonationReceipt> => {
  const response = await fetch(`${API_ROOT}/donations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  })

  return handleResponse<DonationReceipt>(response)
}

export const searchPublicDonations = async (
  params: DonationSearchParams = {},
): Promise<DonationSearchResponse> => {
  const url = new URL(`${API_ROOT}/donations`)
  const query = new URLSearchParams()

  if (typeof params.page === "number" && params.page > 0) {
    query.set("page", String(params.page))
  }

  if (typeof params.limit === "number" && params.limit > 0) {
    query.set("limit", String(params.limit))
  }

  const trimmedMssv = params.mssv?.trim()
  if (trimmedMssv) {
    query.set("mssv", trimmedMssv)
  }

  if (params.has_class) {
    query.set("has_class", "true")
  }

  const queryString = query.toString()
  if (queryString) {
    url.search = queryString
  }

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })

  return handleResponse<DonationSearchResponse>(response)
}
