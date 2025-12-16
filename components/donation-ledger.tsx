"use client"

import { useCallback, useEffect, useState } from "react"
import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"
import { searchPublicDonations } from "@/lib/api/donations"
import type { DonationSearchParams, DonationSearchResponse } from "@/types/donation"

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(value)

const formatDate = (date?: string | null) => {
  if (!date) {
    return "Chưa xác nhận"
  }
  const parsed = new Date(date)
  if (Number.isNaN(parsed.getTime())) {
    return "Chưa xác nhận"
  }
  return parsed.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
}

export default function DonationLedger() {
  const [ledgerParams, setLedgerParams] = useState<DonationSearchParams>({
    page: 1,
    limit: 6,
  })
  const [ledgerResult, setLedgerResult] = useState<DonationSearchResponse | null>(null)
  const [ledgerLoading, setLedgerLoading] = useState(false)
  const [ledgerError, setLedgerError] = useState<string | null>(null)
  const [mssvQuery, setMssvQuery] = useState("")

  const fetchLedger = useCallback(async (params: DonationSearchParams) => {
    setLedgerLoading(true)
    setLedgerError(null)
    try {
      const response = await searchPublicDonations(params)
      setLedgerResult(response)
    } catch (error) {
      console.error("[DonationLedger] Failed to load ledger", error)
      setLedgerError(
        error instanceof Error ? error.message : "Không thể tải danh sách ủng hộ.",
      )
      setLedgerResult(null)
    } finally {
      setLedgerLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchLedger(ledgerParams)
  }, [ledgerParams, fetchLedger])

  const handleLedgerSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmed = mssvQuery.trim()
    setLedgerParams((prev) => ({
      ...prev,
      page: 1,
      mssv: trimmed ? trimmed : undefined,
    }))
  }

  const handleChangeLimit = (nextLimit: number) => {
    setLedgerParams((prev) => ({
      ...prev,
      page: 1,
      limit: nextLimit,
    }))
  }

  const handleChangePage = (direction: "prev" | "next") => {
    setLedgerParams((prev) => {
      const currentPage = prev.page ?? 1
      const totalPages = ledgerResult?.meta.pages ?? 1
      if (direction === "prev") {
        return { ...prev, page: Math.max(1, currentPage - 1) }
      }
      return { ...prev, page: Math.min(totalPages, currentPage + 1) }
    })
  }

  const ledgerItems = ledgerResult?.data ?? []
  const currentPage = ledgerResult?.meta.page ?? ledgerParams.page ?? 1
  const totalPages = ledgerResult?.meta.pages ?? 1

  return (
    <section
      id="donation-ledger"
      className="py-20 px-4 bg-gradient-to-b from-[#f3f7ff] via-white to-[#fdfdfd]"
    >
      <div className="max-w-5xl mx-auto space-y-10">
        <div className="text-center space-y-4">
          <p className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#eef6ff] text-[#3f7ee8] text-sm font-semibold">
            Sao kê minh bạch
          </p>
          <h2 className="text-4xl font-bold text-[#2d3a4a]">Danh sách ủng hộ sinh viên</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Theo dõi các khoản quyên góp đã xác nhận. Thông tin số điện thoại được ẩn để bảo vệ quyền riêng tư.
          </p>
        </div>

        <div className="rounded-3xl border border-[#e0e7ff] bg-[#f9fbff] p-6 shadow-inner space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2">
              <p className="text-sm uppercase tracking-wide text-[#7ba4ff]">Sao kê công khai</p>
              <p className="text-sm text-gray-600 max-w-md">
                Chúng mình sẽ cập nhật danh sách ủng hộ vào lúc 18h hàng ngày để đảm bảo tính minh bạch và kịp thời. Cảm ơn bạn đã đồng hành cùng Xuân Tình Nguyện 2026!
              </p>
            </div>
            <form className="w-full sm:w-auto" onSubmit={handleLedgerSearch}>
              <Label htmlFor="ledger-mssv" className="sr-only">
                Tra cứu MSSV
              </Label>
              <div className="flex gap-2">
                <Input
                  id="ledger-mssv"
                  placeholder="Nhập MSSV để tra cứu"
                  value={mssvQuery}
                  onChange={(event) => setMssvQuery(event.target.value)}
                />
                <Button type="submit" variant="secondary">
                  <Search className="size-4 mr-2" />
                  Tìm
                </Button>
              </div>
            </form>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ledger-limit">Số kết quả mỗi trang</Label>
              <Select
                value={String(ledgerParams.limit ?? 6)}
                onValueChange={(value) => handleChangeLimit(Number(value))}
              >
                <SelectTrigger id="ledger-limit">
                  <SelectValue placeholder="Chọn số kết quả" />
                </SelectTrigger>
                <SelectContent>
                  {[6, 9, 12].map((option) => (
                    <SelectItem key={option} value={String(option)}>
                      {option} kết quả
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="ledger-page">Trang hiện tại</Label>
              <div id="ledger-page" className="flex items-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => handleChangePage("prev")}
                  disabled={currentPage <= 1 || ledgerLoading}
                >
                  Trước
                </Button>
                <div className="text-sm text-gray-600 min-w-[120px] text-center">
                  Trang {currentPage} / {totalPages}
                </div>
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => handleChangePage("next")}
                  disabled={currentPage >= totalPages || ledgerLoading}
                >
                  Sau
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {ledgerLoading ? (
            <div className="flex items-center justify-center py-12 text-sm text-gray-500">
              <Spinner className="mr-2" />
              Đang tải danh sách ủng hộ...
            </div>
          ) : ledgerError ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
              {ledgerError}
            </div>
          ) : ledgerItems.length === 0 ? (
            <div className="text-center text-sm text-gray-500 py-12 border border-dashed rounded-2xl">
              Chưa có ủng hộ được tìm thấy. Hãy thử điều chỉnh bộ lọc.
            </div>
          ) : (
            <div className="space-y-4">
              {ledgerItems.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-gray-100 p-5 bg-white space-y-4 shadow-sm"
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <p className="font-semibold text-gray-900">{item.student_name}</p>
                    <p className="text-xs text-gray-500">
                      Ngày chuyển: {formatDate(item.confirmed_at)}
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <p className="text-xs uppercase tracking-wide text-gray-500">Số tiền</p>
                    <p className="text-xl font-semibold text-gray-900">{formatCurrency(item.amount)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
