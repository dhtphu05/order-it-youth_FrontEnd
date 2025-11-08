"use client"

import { useState } from "react"
import { Download, FileText } from "lucide-react"

export default function Transparency() {
  const [showLog, setShowLog] = useState(false)

  const fundraisingStat = {
    current: 45000000,
    goal: 100000000,
    percentage: 45,
  }

  const breakdown = [
    { category: "Giáo dục", amount: 20000000, color: "from-primary to-primary/60" },
    { category: "Sức khỏe", amount: 15000000, color: "from-accent to-accent/60" },
    { category: "Môi trường", amount: 10000000, color: "from-green-500 to-green-600" },
  ]

  const logs = [
    {
      date: "2026-01-15",
      activity: "Tặng sách cho trường tiểu học Hoa Hồng",
      amount: "5.000.000",
      category: "Giáo dục",
    },
    { date: "2026-01-10", activity: "Hỗ trợ y tế cho bà con vùng khó khăn", amount: "8.500.000", category: "Sức khỏe" },
    {
      date: "2026-01-05",
      activity: "Trồng cây xanh tại công viên thành phố",
      amount: "3.200.000",
      category: "Môi trường",
    },
    { date: "2025-12-28", activity: "Hỗ trợ học bổng cho học sinh nghèo", amount: "6.500.000", category: "Giáo dục" },
    { date: "2025-12-20", activity: "Khám bệnh và phát thuốc miễn phí", amount: "5.800.000", category: "Sức khỏe" },
  ]

  const handlePrintLog = () => {
    const logContent = logs.map((log) => `${log.date} | ${log.activity} | ${log.amount}đ | ${log.category}`).join("\n")

    const element = document.createElement("a")
    element.setAttribute("href", `data:text/plain;charset=utf-8,${encodeURIComponent(logContent)}`)
    element.setAttribute("download", "sao-ke-tham-nien.txt")
    element.style.display = "none"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <section id="transparency" className="py-20 md:py-32 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-white to-accent/5 -z-10" />
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -z-10 animate-float" />
      <div
        className="absolute bottom-20 left-10 w-72 h-72 bg-accent/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -z-10"
        style={{ animation: "float 4s ease-in-out infinite 2s" }}
      />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 animate-fadeInDown">
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
            📊 Minh bạch & Báo cáo
          </h2>
          <p className="text-xl text-muted-foreground font-light">
            Mọi đồng tiền được sử dụng một cách hiệu quả và minh bạch
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="card-premium rounded-2xl shadow-elevated p-8 md:p-10 hover:shadow-glow-blue transition-all duration-300 transform hover:scale-105 animate-slideInLeft">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-medium">
                <div className="w-6 h-6 rounded-full bg-white/20" />
              </div>
              <h3 className="text-3xl font-bold text-foreground">Tiến độ quyên góp</h3>
            </div>

            <div className="mb-8">
              <div className="flex justify-between mb-3">
                <span className="text-muted-foreground font-semibold">Đã quyên góp</span>
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-bold text-lg">
                  {(fundraisingStat.current / 1000000).toFixed(0)}M / {(fundraisingStat.goal / 1000000).toFixed(0)}M
                </span>
              </div>
              <div className="relative w-full bg-muted rounded-full h-3 overflow-hidden shadow-soft">
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-accent to-secondary rounded-full transition-all duration-700 shadow-medium"
                  style={{ width: `${fundraisingStat.percentage}%` }}
                />
              </div>
              <p className="text-muted-foreground text-sm mt-3 font-light">
                Mục tiêu: {(fundraisingStat.goal / 1000000).toFixed(0)} triệu đồng
              </p>
            </div>

            <div className="space-y-4">
              {breakdown.map((item, idx) => (
                <div key={idx} className="group">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-foreground font-medium">{item.category}</span>
                    <span className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent font-bold">
                      {(item.amount / 1000000).toFixed(0)}M
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 overflow-hidden group-hover:shadow-medium transition-shadow">
                    <div
                      className={`bg-gradient-to-r ${item.color} h-2 rounded-full transition-all duration-500 group-hover:shadow-soft`}
                      style={{ width: `${(item.amount / fundraisingStat.current) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card-premium rounded-2xl shadow-elevated p-8 md:p-10 hover:shadow-glow-blue transition-all duration-300 transform hover:scale-105 animate-slideInRight">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center shadow-medium">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-foreground">Sao Kê chi tiết</h3>
              </div>
              <button
                onClick={handlePrintLog}
                className="p-2 rounded-lg bg-gradient-to-r from-accent to-accent/80 text-white hover:shadow-medium transition-all transform hover:scale-110 shadow-soft"
                title="Tải xuống sao kê"
              >
                <Download className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
              {logs.map((entry, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-lg bg-gradient-to-r from-white/40 to-white/20 hover:from-white/60 hover:to-white/40 transition-all duration-300 transform hover:translate-x-1 group cursor-pointer border border-primary/10 hover:border-primary/30 shadow-soft"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <p className="text-xs font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-1">
                        {entry.date}
                      </p>
                      <p className="text-foreground font-medium text-sm group-hover:text-primary transition-colors">
                        {entry.activity}
                      </p>
                    </div>
                    <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent font-bold whitespace-nowrap">
                      {entry.amount}đ
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowLog(!showLog)}
              className="mt-6 w-full py-3 rounded-lg bg-gradient-to-r from-primary to-accent text-white font-semibold hover:shadow-elevated transition-all transform hover:scale-105 shadow-medium"
            >
              {showLog ? "Ẩn toàn bộ log" : "Xem toàn bộ log"}
            </button>

            {showLog && (
              <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-border animate-scaleIn">
                <p className="text-xs font-mono text-muted-foreground whitespace-pre-wrap break-words max-h-48 overflow-y-auto">
                  {logs.map((log) => `${log.date} | ${log.activity} | ${log.amount}đ | ${log.category}`).join("\n")}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
