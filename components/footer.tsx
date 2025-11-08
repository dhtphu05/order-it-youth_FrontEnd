export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-white font-bold mb-4">Về chúng tôi</h3>
            <p className="text-sm">
              Xuân Tình Nguyện là chiến dịch tình nguyện hàng năm nhằm mang lại ý nghĩa cho cộng đồng.
            </p>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">Liên kết</h3>
            <ul className="text-sm space-y-2">
              <li>
                <a href="#" className="hover:text-white transition">
                  Trang chủ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Hoạt động
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Cửa hàng
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Liên hệ
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">Pháp lý</h3>
            <ul className="text-sm space-y-2">
              <li>
                <a href="#" className="hover:text-white transition">
                  Điều khoản sử dụng
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Chính sách bảo mật
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Chính sách cookie
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">Liên hệ</h3>
            <ul className="text-sm space-y-2">
              <li>Email: info@xuantinhnguyen.vn</li>
              <li>Điện thoại: (84) 1234 5678</li>
              <li>Địa chỉ: TP. Hồ Chí Minh</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-sm">
          <p>&copy; 2026 Xuân Tình Nguyện. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  )
}
