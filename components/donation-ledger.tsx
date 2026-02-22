"use client"

import { useCallback, useEffect, useState } from "react"
import { Search, Download } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { searchPublicDonations, API_ROOT } from "@/lib/api/donations"
import type { DonationSearchParams, DonationSearchResponse } from "@/types/donation"

export default function DonationLedger() {
  const [ledgerParams, setLedgerParams] = useState<DonationSearchParams>({
    page: 1,
    limit: 20,
    has_class: true,
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
        error instanceof Error ? error.message : "Không thể tải danh sách.",
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
  const totalItems = ledgerResult?.meta.total ?? 0

  return (
    <section
      id="donation-ledger"
      className="py-20 px-4 bg-gradient-to-b from-[#f3f7ff] via-white to-[#fdfdfd]"
    >
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="text-center space-y-4">
          <p className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#eef6ff] text-[#3f7ee8] text-sm font-semibold">
            Vinh danh
          </p>
          <h2 className="text-3xl md:text-3xl font-bold text-[#3f7ee8]">
            Danh sách Tình Nguyện Viên Online Chiến Dịch Tình Nguyện Xuân 2026
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Cảm ơn bạn đã ủng hộ một chút tấm lòng cho chiến dịch Xuân tình nguyện 2026 - Gùi Xuân Gieo Bản Nhỏ do LCĐ Khoa Công nghệ Thông tin tổ chức. Sự hỗ trợ và ủng hộ của bạn đã góp phần giúp các trẻ em nơi đây có một mùa Tết Nguyên Đán năm 2026 thật vui tươi, ấm áp, và trọn vẹn.
          </p>
        </div>

        <div className="rounded-3xl border border-[#e0e7ff] bg-[#f9fbff] p-6 shadow-inner space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2">
              <p className="text-sm uppercase tracking-wide text-[#7ba4ff]">Danh sách công khai</p>
              <p className="text-sm text-gray-600 max-w-md">
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
                  className="bg-white"
                />
                <Button type="submit" variant="secondary">
                  <Search className="size-4 mr-2" />
                  Tìm
                </Button>
              </div>
            </form>
          </div>

          <div className="rounded-2xl border bg-white overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-gray-50/50">
                  <TableRow>
                    <TableHead className="w-[80px] text-center font-bold text-gray-700">STT</TableHead>
                    <TableHead className="font-bold text-gray-700">Họ và tên</TableHead>
                    <TableHead className="font-bold text-gray-700">MSSV</TableHead>
                    <TableHead className="font-bold text-gray-700">Lớp</TableHead>
                    <TableHead className="font-bold text-gray-700 text-right">Chứng nhận</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ledgerLoading ? (
                    <TableRow>
                      <TableCell colSpan={5} className="h-32 text-center text-gray-500">
                        <div className="flex items-center justify-center">
                          <Spinner className="mr-2" />
                          Đang tải danh sách...
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : ledgerItems.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="h-32 text-center text-gray-500">
                        Không tìm thấy dữ liệu phù hợp.
                      </TableCell>
                    </TableRow>
                  ) : (
                    ledgerItems.map((item, index) => {
                      const stt = (currentPage - 1) * (ledgerParams.limit ?? 20) + index + 1
                      return (
                        <TableRow key={item.id} className="hover:bg-blue-50/30 transition-colors">
                          <TableCell className="text-center font-medium text-gray-500">
                            {stt}
                          </TableCell>
                          <TableCell className="font-semibold text-gray-900">
                            {item.student_name}
                          </TableCell>
                          <TableCell className="text-gray-600 font-mono">
                            {item.mssv || "-"}
                          </TableCell>
                          <TableCell className="text-gray-600">
                            {item.student_class || "-"}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-blue-600 hover:text-blue-800 hover:bg-blue-100/50 rounded-full"
                              asChild
                            >
                              <a href={`${API_ROOT}/donations/${item.id}/certificate`} download>
                                <Download className="size-4" />
                              </a>
                            </Button>
                          </TableCell>
                        </TableRow>
                      )
                    })
                  )}
                </TableBody>
              </Table>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-100">
            <div className="text-sm text-gray-500">
              Hiển thị {ledgerItems.length > 0 ? (currentPage - 1) * (ledgerParams.limit ?? 20) + 1 : 0} - {Math.min(currentPage * (ledgerParams.limit ?? 20), totalItems)} trên tổng số {totalItems} kết quả
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleChangePage("prev")}
                  disabled={currentPage <= 1 || ledgerLoading}
                >
                  Trước
                </Button>
                <div className="text-sm font-medium px-2 min-w-[80px] text-center">
                  Trang {currentPage} / {totalPages}
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleChangePage("next")}
                  disabled={currentPage >= totalPages || ledgerLoading}
                >
                  Sau
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
