"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Check, Copy, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"
import { useToast } from "@/hooks/use-toast"
import { createDonationRequest } from "@/lib/api/donations"
import type { DonationReceipt } from "@/types/donation"

const donationFormSchema = z.object({
  student_name: z.string().min(2, "Vui lòng nhập họ tên sinh viên"),
  student_class: z.string().min(2, "Vui lòng nhập lớp/khoa"),
  mssv: z.string().min(3, "MSSV không hợp lệ"),
  phone: z
    .string()
    .min(10, "Số điện thoại gồm 10 số")
    .max(10, "Số điện thoại gồm 10 số")
    .regex(/^0\d{9}$/, "Số điện thoại phải bắt đầu bằng 0"),
  amount: z.coerce.number().min(10000, "Số tiền tối thiểu 10.000đ"),
  provider: z.enum(["VIETQR"]).default("VIETQR"),
})

type DonationFormValues = z.infer<typeof donationFormSchema>

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(value)

const calculatePvcdPoints = (amount: number) => {
  if (amount < 20000) return 0
  if (amount <= 30000) return 5
  if (amount <= 50000) return 7
  if (amount <= 100000) return 8
  return 10
}

export default function DonationSection() {
  const donationForm = useForm<DonationFormValues>({
    resolver: zodResolver(donationFormSchema),
    defaultValues: {
      student_name: "",
      student_class: "",
      mssv: "",
      phone: "",
      amount: 50000,
      provider: "VIETQR",
    },
  })

  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [donationReceipt, setDonationReceipt] = useState<DonationReceipt | null>(null)
  const [lastDonation, setLastDonation] = useState<DonationFormValues | null>(null)
  const [copySuccess, setCopySuccess] = useState(false)
  const [showGratitude, setShowGratitude] = useState(false)

  const watchAmount = donationForm.watch("amount") ?? 0
  const previewPoints = calculatePvcdPoints(watchAmount)

  const handleCreateDonation = donationForm.handleSubmit(async (values) => {
    setIsSubmitting(true)
    try {
      const response = await createDonationRequest(values)
      setDonationReceipt(response)
      setLastDonation({ ...values })
      setShowGratitude(false)
      toast({
        title: "Tạo yêu cầu thành công",
        description: "Quét VietQR để hoàn tất quyên góp nhé!",
      })
    } catch (error) {
      console.error("[Donation] Failed to create donation", error)
      toast({
        title: "Không gửi được yêu cầu",
        description:
          error instanceof Error
            ? error.message
            : "Vui lòng thử lại sau ít phút.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  });

  const handleCopyCode = async () => {
    if (!donationReceipt?.donation_code) {
      return
    }
    try {
      await navigator.clipboard.writeText(donationReceipt.donation_code)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (error) {
      console.error("[Donation] Could not copy donation code", error)
      toast({
        title: "Không thể sao chép mã",
        description: "Hãy bôi đen và sao chép thủ công nhé.",
        variant: "destructive",
      })
    }
  };

  const latestPoints = lastDonation ? calculatePvcdPoints(lastDonation.amount) : null

  const handleConfirmTransfer = () => {
    setShowGratitude(true)
    toast({
      title: "Đã ghi nhận thông báo",
      description: "Cảm ơn bạn! Chúng mình sẽ kiểm tra sao kê mỗi ngày một lần và cập nhật kết quả sớm nhất.",
    })
  };

  return (
    <section id="donate" className="py-20 px-4 bg-gradient-to-b from-[#fffaf2] via-white to-[#fff0f5]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm text-sm font-semibold text-[#a75a96]">
            <Sparkles className="size-4 text-[#f5b1ac]" />
            IT Youth gây quỹ sinh viên
          </p>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold text-[#a5c858] text-balance">
            Đăng ký ủng hộ sinh viên khó khăn
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Điền thông tin phía dưới để nhận mã VietQR chuyển khoản nhanh cho các sinh viên có hoàn cảnh cần hỗ trợ.
          </p>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-[#fce4d6] bg-white/90 p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm uppercase tracking-wider text-[#f5b1ac]">Đăng ký quyên góp</p>
                <h3 className="text-2xl font-semibold text-gray-900">Nhận VietQR tức thì</h3>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#fce4d6] text-[#c96f58]">
                3 bước
              </span>
            </div>

            <Form {...donationForm}>
              <form className="space-y-4" onSubmit={handleCreateDonation}>
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={donationForm.control}
                    name="student_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Họ tên sinh viên</FormLabel>
                        <FormControl>
                          <Input placeholder="Nguyễn Văn A" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={donationForm.control}
                    name="student_class"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Lớp</FormLabel>
                        <FormControl>
                          <Input placeholder="23T_DT3" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={donationForm.control}
                    name="mssv"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mã số sinh viên (MSSV)</FormLabel>
                        <FormControl>
                          <Input placeholder="102230300" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={donationForm.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Số điện thoại liên hệ</FormLabel>
                        <FormControl>
                          <Input placeholder="0987654321" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-4">
                  <FormField
                    control={donationForm.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Số tiền ủng hộ (VND)</FormLabel>
                        <FormControl>
                          <Input type="number" min={10000} step={1000} placeholder="30.000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={donationForm.control}
                    name="provider"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phương thức thanh toán</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn phương thức" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="VIETQR">VietQR</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="rounded-2xl border border-dashed border-[#a5c858]/40 bg-[#f5ffef] p-4 flex flex-col gap-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-gray-700">PVCĐ dự kiến</span>
                    <span className="text-lg font-bold text-[#a5c858]">{previewPoints} điểm</span>
                  </div>
                  <p className="text-xs text-gray-500">
                    Điều chỉnh số tiền để xem mức điểm tương ứng theo quy định Ban tổ chức.
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#a5c858] hover:bg-[#90b647] text-white font-semibold text-base h-12"
                >
                  {isSubmitting ? (
                    <>
                      <Spinner className="mr-2" />
                      Đang tạo yêu cầu...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 size-4" />
                      Nhận mã VietQR
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </div>

          {donationReceipt ? (
            <div className="rounded-3xl border border-[#c5e6a5] bg-white p-6 shadow-lg">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                <div>
                  <p className="text-sm uppercase tracking-wider text-[#a5c858]">Ủng hộ đã khởi tạo</p>
                  <h4 className="text-xl font-semibold text-gray-900">Mã chuyển khoản: {donationReceipt.donation_code}</h4>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={handleCopyCode}
                >
                  {copySuccess ? <Check className="size-4" /> : <Copy className="size-4" />}
                  {copySuccess ? "Đã sao chép!" : "Sao chép mã"}
                </Button>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2 text-sm">
                  <p className="text-gray-500">Thông tin sinh viên</p>
                  <p className="font-medium text-gray-900">{lastDonation?.student_name}</p>
                  <p className="text-gray-700">
                    Lớp {lastDonation?.student_class} • MSSV {lastDonation?.mssv}
                  </p>
                  <p className="text-gray-700">Số tiền: {lastDonation ? formatCurrency(lastDonation.amount) : "—"}</p>
                  <p className="text-gray-700">PVCĐ dự kiến: {latestPoints ?? 0} điểm</p>
                  <p className="text-xs text-gray-500 mt-2">
                    Nội dung chuyển khoản nên chứa mã trên để hệ thống đối soát tự động.
                  </p>
                </div>
                <div className="flex flex-col gap-4 items-center justify-center">
                  {donationReceipt.vietqr_data ? (
                    <div className="w-48 h-48 rounded-2xl bg-white border border-gray-100 shadow-inner overflow-hidden p-3">
                      <img
                        src={donationReceipt.vietqr_data}
                        alt="Mã VietQR"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className="w-full text-center text-sm text-gray-600 bg-gray-50 rounded-2xl p-4">
                      Không nhận được hình ảnh QR. Hãy mở liên kết VietQR trong email hoặc dùng mã chuyển khoản.
                    </div>
                  )}
                  <div className="text-xs text-gray-500 text-center">
                    Quét VietQR hoặc nhập mã ủy nhiệm chi:{" "}
                    <span className="font-semibold">{donationReceipt.donation_code}</span>
                  </div>
                </div>
                <div className="md:col-span-2 flex flex-col gap-4">
                  <Button
                    type="button"
                    variant="secondary"
                    className="w-full sm:w-auto"
                    onClick={handleConfirmTransfer}
                  >
                    Tôi xác nhận đã chuyển khoản
                  </Button>
                  {showGratitude && (
                    <div className="rounded-2xl border border-[#fce4d6] bg-gradient-to-r from-[#fff5f4] to-[#fffdf6] p-4 flex items-start gap-3">
                      <div className="text-3xl">💝</div>
                      <div className="space-y-1 text-sm">
                        <p className="font-semibold text-gray-900">Cảm ơn tấm lòng của bạn!</p>
                        <p className="text-gray-600">
                          Chúng mình đã ghi nhận xác nhận chuyển khoản và sẽ kiểm tra sao kê mỗi ngày một lần. Kết quả sẽ được cập nhật ngay khi hoàn tất đối soát.
                        </p>
                        <p className="text-xs text-gray-500">Nếu cần hỗ trợ thêm, hãy liên hệ đội ngũ IT Youth nhé.</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-[#f5b1ac]/60 bg-white/70 p-6 text-center text-sm text-gray-600">
              VietQR và hướng dẫn chuyển khoản sẽ hiển thị tại đây sau khi bạn bấm &quot;Nhận mã VietQR&quot;.
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
