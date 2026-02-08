"use client"

import { Check, Star, Heart, Sun, Leaf, Book, Gift, Home, MapPin } from "lucide-react";

export default function Activities() {
  const leaf = "#A5C858";
  const peach = "#F5B1AC";
  const softlime = "#D3E281";
  const rose = "#FCE8E7";
  const sand = "#FCEDBE";
  const light = "#FFF8E7";

  const activities = [
    {
      id: 1,
      title: "Trồng 52 cây vàng anh lá mít tại Nhà trưng bày chiến tích đồi A Biah.",
      color: leaf,
      icon: <Leaf className="text-white" />,
    },
    {
      id: 2,
      title: "Sửa chữa sân bóng chuyền: thay 2 cột bóng, tặng 1 lưới, 2 bóng và sơn lại mặt sân.",
      color: softlime,
      icon: <Check className="text-gray-700" />,
    },
    {
      id: 3,
      title: "Lắp đặt 10 cột đèn năng lượng mặt trời thắp sáng đường quê.",
      color: peach,
      icon: <Sun className="text-white" />,
    },
    {
      id: 4,
      title: "Trao bản bàn giao các công trình: Thắp sáng đường quê - Mầm xanh tình nguyện - Không gian thể thao.",
      color: rose,
      icon: <Home className="text-gray-700" />,
    },
    {
      id: 5,
      title: "Tặng quà cho 15 hộ gia đình có hoàn cảnh khó khăn.",
      color: sand,
      icon: <Gift className="text-gray-700" />,
    },
    {
      id: 6,
      title: "Tặng quà cho Đồn Biên phòng và Đoàn xã A Lưới.",
      color: light,
      icon: <Star className="text-yellow-500" />,
    },
    {
      id: 7,
      title: "Tham quan và nghe giảng về lịch sử địa chỉ đỏ nhà trưng bày chứng tích chiến tranh di tích lịch sử Đồi Abiah.",
      color: "#E0F2FE", // Light Sky Blue
      icon: <MapPin className="text-sky-600" />,
    },
    {
      id: 8,
      title: "Tặng 50 phần quà cho các em trẻ em vùng cao.",
      color: "#F3E8FF", // Light Purple
      icon: <Heart className="text-purple-500" />,
    },
    {
      id: 9,
      title: "Tặng 200 phần áo quần và hơn 50 gấu bông nhận quyên góp từ mọi người đến bà con A Lưới.",
      color: "#FEF3C7", // Light Amber
      icon: <Gift className="text-amber-600" />,
    },
    {
      id: 10,
      title: "Hoạt động vui chơi lồng ghép dạy học, làm thiệp, tập dân vũ cho các em.",
      color: "#D1FAE5", // Light Emerald
      icon: <Book className="text-emerald-600" />,
    },
    {
      id: 11,
      title: "Tổ chức đêm giao lưu văn hóa, văn nghệ giữa tình nguyện viên và người dân địa phương.",
      color: "#FFEDD5", // Light Orange
      icon: <Star className="text-orange-500" />,
    },
  ];

  return (
    <section id="activities" className="py-20 md:py-28 px-4 bg-gradient-to-b from-white to-gray-50/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-block px-4 py-1.5 rounded-full bg-green-50 text-green-600 text-sm font-semibold mb-2">
            Hành trình ý nghĩa
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#A5C858] leading-tight">
            Hoạt động nổi bật
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Mỗi hành động nhỏ góp phần tạo nên thay đổi lớn. Dưới đây là những dấu ấn chúng mình đã cùng nhau thực hiện trong chiến dịch.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((activity, index) => (
            <div
              key={activity.id}
              className="group relative overflow-hidden rounded-3xl p-6 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 bg-white border border-gray-100"
            >
              {/* Background accent */}
              <div
                className="absolute top-0 right-0 w-32 h-32 rounded-bl-full opacity-20 group-hover:scale-150 transition-transform duration-700 ease-out"
                style={{ backgroundColor: activity.color }}
              />

              <div className="relative z-10 flex flex-col h-full">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 shadow-sm group-hover:rotate-12 transition-transform duration-300"
                  style={{ backgroundColor: activity.color }}
                >
                  {activity.icon}
                </div>

                <h3 className="text-lg font-semibold text-gray-800 leading-snug group-hover:text-gray-900 transition-colors">
                  {activity.title}
                </h3>

                <div className="mt-auto pt-4 flex items-center justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-2 group-hover:translate-x-0">
                  <div className="w-8 h-1 rounded-full bg-gray-200" style={{ backgroundColor: activity.color }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
