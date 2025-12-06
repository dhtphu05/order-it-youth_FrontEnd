export default function Activities() {
  const leaf = "#A5C858";
  const peach = "#F5B1AC";
  const softlime = "#D3E281";
  const rose = "#FCE8E7";
  const sand = "#FCEDBE";

  const activities = [
    {
      id: 1,
      title: "Ươm Mầm Khát Vọng Tương Lai",
      description: "Góp những cuốn sách, chiếc áo, đồ dùng thân thương, nâng đỡ những ước mơ nhỏ bé của trẻ em vùng cao, mang hơi ấm tri thức đến mọi nẻo đường.",
      icon: "📚",
      color: leaf,
    },
    {
      id: 2,
      title: "Sưởi Ấm Những Cuộc Đời An Yên",
      description: "Dành thời gian ân cần thăm hỏi, trở thành người thân, và cùng nhau gìn giữ không gian sống sạch đẹp cho các cụ già neo đơn, mang lại sự trọn vẹn yêu thương.",
      icon: "❤️",
      color: softlime,
    },
    {
      id: 3,
      title: "Vì Một Thế Giới Xanh",
      description: "Cùng nhau thanh lọc môi trường, gieo thêm những mầm sắc xanh hy vọng, nâng cao ý thức bảo vệ vẻ đẹp của thiên nhiên.",
      icon: "🌱",
      color: peach,
    },
    {
      id: 4,
      title: "Thắp Sáng Ngọn Lửa Tri Thức",
      description: "Mang tri thức và kỹ năng sống làm hành trang, tổ chức các lớp học miễn phí như chìa khóa vàng, mở lối cho thế hệ trẻ tự tin bước vào tương lai.",
      icon: "🎓",
      color: rose,
    },
    {
      id: 5,
      title: "Chắp Cánh Ngôn Ngữ Yêu Thương",
      description: "Dạy tiếng Anh không chỉ là ngôn ngữ, mà là cách chúng ta giúp các em vượt qua rào cản, tự tin mở ra một thế giới rộng lớn hơn.",
      icon: "🌎",
      color: sand,
    },
  ];

  return (
    <section id="activities" className="py-16 md:py-24 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-6xl md:text-5xl font-bold text-[#A5C858] mb-4">
            Các hoạt động tình nguyện
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Hãy mở lòng đón nhận hành trình trọn vẹn của sự cho đi. Mỗi bước chân, mỗi hành động nhân ái của bạn là phép màu thầm lặng, là một bước đệm tạo nên sự thay đổi tích cực và sâu sắc cho cuộc sống.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 transition-all duration-30">
          {activities.map((activity) => (
            <div
              key={activity.id}
              style={{ backgroundColor: activity.color }}
              className="p-8 rounded-2xl hover:shadow-xl transition-all duration-300 border border-gray-200 
                         transform hover:translate-y-[-4px] hover:scale-[1.01]"
            >
              <div className="text-5xl mb-4">{activity.icon}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{activity.title}</h3>
              <p className="text-gray-700 leading-relaxed">{activity.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
