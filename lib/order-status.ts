export type StatusBadge = {
  label: string
  colorClass: string
}

const defaultBadge: StatusBadge = {
  label: "Không rõ",
  colorClass: "bg-gray-100 text-gray-800",
}

export function mapPaymentStatusToBadge(status?: string): StatusBadge {
  if (!status) {
    return { label: "Chưa xác định", colorClass: "bg-gray-100 text-gray-800" }
  }

  switch (status.toUpperCase()) {
    case "SUCCESS":
    case "PAID":
      return { label: "Đã thanh toán", colorClass: "bg-green-100 text-green-800" }
    case "PENDING":
    case "AWAITING_PAYMENT":
      return { label: "Chờ thanh toán", colorClass: "bg-yellow-100 text-yellow-800" }
    case "FAILED":
      return { label: "Thanh toán thất bại", colorClass: "bg-red-100 text-red-800" }
    case "REFUNDED":
      return { label: "Đã hoàn tiền", colorClass: "bg-blue-100 text-blue-800" }
    case "CASH":
      return { label: "Thanh toán tiền mặt", colorClass: "bg-purple-100 text-purple-800" }
    default:
      return defaultBadge
  }
}

export function mapOrderStatusToBadge(status?: string): StatusBadge {
  if (!status) {
    return { label: "Đang xử lý", colorClass: "bg-gray-100 text-gray-800" }
  }

  switch (status.toUpperCase()) {
    case "CREATED":
    case "PENDING":
      return { label: "Đã tạo", colorClass: "bg-gray-100 text-gray-800" }
    case "CONFIRMED":
    case "PAID":
      return { label: "Đã xác nhận", colorClass: "bg-blue-100 text-blue-800" }
    case "FULFILLING":
    case "SHIPPED":
      return { label: "Đang giao", colorClass: "bg-indigo-100 text-indigo-800" }
    case "DELIVERY_FAILED":
      return { label: "Giao thất bại", colorClass: "bg-orange-100 text-orange-800" }
    case "DELIVERED":
    case "FULFILLED":
      return { label: "Hoàn tất", colorClass: "bg-green-100 text-green-800" }
    case "CANCELLED":
      return { label: "Đã hủy", colorClass: "bg-red-100 text-red-800" }
    default:
      return defaultBadge
  }
}
