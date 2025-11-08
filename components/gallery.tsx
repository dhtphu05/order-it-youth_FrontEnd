export default function Gallery() {
  const gallery = [
    { id: 1, emoji: "📸", title: "Hoạt động Tết 2025", desc: "Chúng tôi đã trao tặng 500+ suất quà Tết" },
    { id: 2, emoji: "🤝", title: "Cộng đồng kết nối", desc: "Hàng ngàn tình nguyện viên cùng hành động" },
    { id: 3, emoji: "🌍", title: "Bảo vệ môi trường", desc: "Cùng nhau xây dựng một thế giới xanh" },
    { id: 4, emoji: "💚", title: "Yêu thương chia sẻ", desc: "Từng hành động nhỏ tạo thay đổi lớn" },
  ]

  return (
    <section className="py-16 md:py-24 px-4 bg-gradient-to-r from-pink-50 to-blue-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Những khoảnh khắc ý nghĩa</h2>
          <p className="text-xl text-gray-600">Theo dõi những câu chuyện cảm động từ cộng đồng</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {gallery.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-2xl bg-white border border-gray-200 hover:shadow-xl transition-all duration-300"
            >
              <div className="h-64 bg-gradient-to-br from-blue-100 to-pink-100 flex items-center justify-center text-8xl group-hover:scale-110 transition-transform duration-300">
                {item.emoji}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-100">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Theo dõi chúng tôi trên mạng xã hội</p>
          <div className="flex justify-center gap-4">
            <a
              href="#"
              className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition"
            >
              f
            </a>
            <a
              href="#"
              className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center text-white hover:bg-pink-700 transition"
            >
              IG
            </a>
            <a
              href="#"
              className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-white hover:bg-gray-900 transition"
            >
              X
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
