"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Check, Copy, Sparkles, ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Spinner } from "@/components/ui/spinner"
import { useToast } from "@/hooks/use-toast"
import { createDonationRequest } from "@/lib/api/donations"
import { cn } from "@/lib/utils"
import type { DonationReceipt, DonationRequestPayload } from "@/types/donation"

const donorTypeOptions = [
  {
    value: "STUDENT",
    label: "Sinh viên",
    description: "Nhập đầy đủ thông tin để ghi nhận PVCĐ",
  },
  {
    value: "GUEST",
    label: "Khách ủng hộ",
    description: "Gửi hơi ấm tại đây",
  },
] as const

const fallbackBankInfo = {
  bankName: "BIDV",
  accountNumber: "8897311357",
  accountName: "NGUYEN THAI NGOC THAO",
}

const donationFormSchema = z
  .object({
    donor_type: z.enum(["STUDENT", "GUEST"]).default("STUDENT"),
    student_name: z.string().min(2, "Vui lòng nhập họ tên người ủng hộ"),
    student_class: z.string().optional(),
    mssv: z.string().optional(),
    phone: z.string().optional(),
    amount: z.coerce.number().min(5000, "Số tiền tối thiểu 5.000đ"),
  })
  .superRefine((values, ctx) => {
    if (values.donor_type !== "STUDENT") {
      return
    }

    if (!values.student_class || values.student_class.trim().length < 2) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["student_class"],
        message: "Vui lòng nhập lớp",
      })
    }

    if (!values.mssv || values.mssv.trim().length < 3) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["mssv"],
        message: "MSSV không hợp lệ",
      })
    }

    if (!values.phone || !/^0\d{9}$/.test(values.phone)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["phone"],
        message: "Số điện thoại gồm 10 số và bắt đầu bằng 0",
      })
    }
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
  if (amount < 30000) return 5
  if (amount < 50000) return 7
  if (amount < 100000) return 8
  return 10
}

export default function DonationSection() {
  const donationForm = useForm<DonationFormValues>({
    resolver: zodResolver(donationFormSchema),
    defaultValues: {
      donor_type: "STUDENT",
      student_name: "",
      student_class: "",
      mssv: "",
      phone: "",
      amount: 0,
    },
  })

  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [donationReceipt, setDonationReceipt] = useState<DonationReceipt | null>(null)
  const [lastDonation, setLastDonation] = useState<DonationFormValues | null>(null)
  const [copySuccess, setCopySuccess] = useState(false)

  const donorType = donationForm.watch("donor_type")
  const isStudentDonor = donorType === "STUDENT"
  const watchAmount = donationForm.watch("amount") ?? 0
  const previewPoints = isStudentDonor ? calculatePvcdPoints(watchAmount) : null

  const handleCreateDonation = donationForm.handleSubmit(async (values) => {
    setIsSubmitting(true)
    try {
      const payload: DonationRequestPayload = {
        student_name: values.student_name.trim(),
        amount: values.amount,
        provider: "VIETQR",
      }

      if (values.donor_type === "STUDENT") {
        payload.student_class = values.student_class?.trim() || undefined
        payload.mssv = values.mssv?.trim() || undefined
        payload.phone = values.phone?.trim() || undefined
      }

      const response = await createDonationRequest(payload)
      setDonationReceipt(response)
      setLastDonation({ ...values })
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

  return (
    <section id="donate" className="py-20 px-4 bg-gradient-to-b from-[#fffaf2] via-white to-[#fff0f5]">
      <div className="max-w-4xl mx-auto">
        {/* <div className="text-center mb-12">
          <p className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm text-sm font-semibold text-[#a75a96]">
            <Sparkles className="size-4 text-[#f5b1ac]" />
           Gây quỹ sinh viên
          </p>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold text-[#a5c858] text-balance">
            Chung tay gieo mầm yêu thương
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Mỗi đóng góp của bạn là một tia sáng, mang đến nụ cười và hy vọng cho những hoàn cảnh khó khăn.
          </p>
          
         
        </div> */}

        <div className="space-y-6">
          <div className="rounded-3xl border border-[#fce4d6] bg-white/90 p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm uppercase tracking-wider text-[#f5b1ac]">Hãy điền thông tin ở bên dưới</p>
                {/* <h3 className="text-2xl font-semibold text-gray-900">Nhận VietQR tức thì</h3> */}
              </div>
              {/* <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#fce4d6] text-[#c96f58]">
                3 bước
              </span> */}
            </div>

            <Form {...donationForm}>
              <form className="space-y-4" onSubmit={handleCreateDonation}>
                <FormField
                  control={donationForm.control}
                  name="donor_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bạn là</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                          className="grid gap-3 sm:grid-cols-2"
                        >
                          {donorTypeOptions.map((option) => {
                            const inputId = `donor-type-${option.value}`
                            const isActive = field.value === option.value
                            return (
                              <label
                                key={option.value}
                                htmlFor={inputId}
                                className={cn(
                                  "flex cursor-pointer items-start gap-3 rounded-2xl border bg-white p-4 shadow-sm transition-colors",
                                  isActive
                                    ? "border-[#a5c858] bg-[#f5ffef]"
                                    : "border-gray-200 hover:border-[#a5c858]/50",
                                )}
                              >
                                <RadioGroupItem id={inputId} value={option.value} className="mt-1" />
                                <div>
                                  <p className="font-semibold text-gray-900">{option.label}</p>
                                  <p className="text-sm text-gray-500">{option.description}</p>
                                </div>
                              </label>
                            )
                          })}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={donationForm.control}
                  name="student_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Họ tên người ủng hộ</FormLabel>
                      <FormControl>
                        <Input placeholder="Nguyễn Văn A" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {isStudentDonor && (
                  <>
                    <div className="grid md:grid-cols-2 gap-4">
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
                    </div>

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
                  </>
                )}

                <FormField
                  control={donationForm.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Số tiền muốn sẻ chia (VND)</FormLabel>
                      <FormControl>
                        <Input type="number" min={5000} step={1000} placeholder="30.000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {previewPoints !== null && (
                  <div className="rounded-2xl border border-dashed border-[#a5c858]/40 bg-[#f5ffef] p-4 flex flex-col gap-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-gray-700">PVCĐ dự kiến</span>
                      <span className="text-lg font-bold text-[#a5c858]">{previewPoints} điểm</span>
                    </div>
                    {/* <p className="text-xs text-gray-500">
                      Điều chỉnh số tiền để xem mức điểm tương ứng theo quy định Ban tổ chức.
                    </p> */}
                  </div>
                )}

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
                      Lấy mã QR chuyển khoản
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
              <div className="flex flex-col gap-4 items-center justify-center text-center">
                <p className="text-sm text-gray-600 font-medium">Quét QR dưới đây để ủng hộ</p>
                {donationReceipt.vietqr_data ? (
                  <div className="w-64 h-64 sm:w-72 sm:h-72 rounded-2xl bg-white border border-gray-100 shadow-inner overflow-hidden p-3">
                    <img
                      src={donationReceipt.vietqr_data}
                      alt="Mã VietQR"
                      className="w-full h-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="w-full text-center text-sm text-gray-600 bg-gray-50 rounded-2xl p-4">
                    Không nhận được hình ảnh QR. Hãy mã chuyển khoản.
                  </div>
                )}
                <div className="text-xs text-gray-500 text-center">
                  Quét VietQR hoặc nhập mã ủy nhiệm chi:{" "}
                  <span className="font-semibold">{donationReceipt.donation_code}</span>
                </div>
                <div className="w-full max-w-md rounded-2xl border border-dashed border-[#f5b1ac]/60 bg-white/70 p-4 text-sm text-gray-700 space-y-2">
                  <p className="font-semibold text-gray-900 text-center">Thông tin chuyển khoản thủ công</p>
                  <div className="flex items-center justify-between gap-4 text-xs sm:text-sm">
                    <span className="text-gray-500">Ngân hàng</span>
                    <span className="font-medium">{fallbackBankInfo.bankName}</span>
                  </div>
                  <div className="flex items-center justify-between gap-4 text-xs sm:text-sm">
                    <span className="text-gray-500">Số tài khoản</span>
                    <span className="font-medium">{fallbackBankInfo.accountNumber}</span>
                  </div>
                  <div className="flex items-center justify-between gap-4 text-xs sm:text-sm">
                    <span className="text-gray-500">Chủ tài khoản</span>
                    <span className="font-medium">{fallbackBankInfo.accountName}</span>
                  </div>
                  <p className="text-xs text-gray-500 text-center">
                    Nội dung chuyển khoản: <span className="font-semibold">{donationReceipt.donation_code}</span>
                  </p>
                  <p className="text-xs text-gray-500 text-center">
                    Bạn có thể nhập thông tin trên để chuyển khoản nếu không quét được mã QR.
                  </p>
                </div>
                <div className="md:col-span-2 flex flex-col gap-4">
                  <p className="text-sm text-gray-600 text-center">
                    Chúng mình xin chân thành cảm ơn sự ủng hộ và tấm lòng sẻ chia vô cùng quý báu của bạn. Mỗi đóng góp của bạn là nguồn động lực lớn lao, giúp chúng mình luôn vững bước trên hành trình lan tỏa giá trị.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-[#f5b1ac]/60 bg-white/70 p-6 text-center text-sm text-gray-600">
              Mã QR chuyển khoản sẽ xuất hiện ngay bên dưới
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
