"use client";

import React from "react";
import Image from "next/image";
import FallingPetals from "./falling-petals";
import { ChevronDown } from "lucide-react";

export default function CharitySupport() {
  const qrCodeSrc = "/qr/qr_ntnt.png";
  const bankInfo = {
    bankName: "Vietcombank",
    accountNumber: "1062486818",
    accountName: "NGUYEN THAI NGOC THAO",
  };

  return (
    <section 
      id="charity-support"
      className="py-16 md:py-24 relative overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src="/hmm.png"
          alt="Charity Background"
          fill={true}
          objectFit="cover"
          objectPosition="top"
          priority={true}
        />
      </div>

      <FallingPetals petalImageSrc="/animations/sakura.png" numberOfPetals={50} />

      <div className="container mx-auto px-4 relative z-10">
        
        <div className="text-center mb-12 flex flex-col backdrop-blur-md bg-white/30 items-center rounded-3xl px-8 py-4 shadow-lg mx-auto max-w-3xl">
          <div className="inline-block  px-8 py-4 rounded-3xl  mb-4">
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#a5c858]  animate-fadeInUp ">
              Chung tay gieo mầm yêu thương
            </h2>
          </div>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto animate-fadeInUp delay-100 backdrop-blur-sm bg-white/40 px-6 py-3 rounded-2xl shadow-md">
            Mỗi đóng góp của bạn là một tia sáng, mang đến nụ cười và hy vọng cho những hoàn cảnh khó khăn.
          </p>
        </div>

        <div className="max-w-3xl mx-auto flex justify-center">
          <div className="w-full max-w-2xl">

            {/* <div className="w-full md:w-1/2 flex">
              <div className="flex flex-col w-full p-8 bg-[#fff8e7] rounded-2xl shadow-xl 
                hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 
                border border-gray-100 animate-fadeInLeft">

                <h3 className="text-[22px] font-bold text-gray-900 mb-6 text-center">
                  Ủng Hộ Qua Chuyển Khoản
                </h3>

                <div className="w-64 h-64 mx-auto bg-gray-100 rounded-lg p-4 flex items-center justify-center 
                  border border-gray-200 shadow-inner mb-6">
                  <Image
                    src={qrCodeSrc}
                    alt="QR Code"
                    width={250}
                    height={250}
                    objectFit="contain"
                    className="rounded-md"
                  />
                </div>

                <div className="text-[14px] text-gray-900 space-y-3 w-full max-w-sm mx-auto">
                  <p className="flex justify-between">
                    <span className="font-bold">Ngân hàng:</span>
                    <span>{bankInfo.bankName}</span>
                  </p>

                  <p className="flex justify-between">
                    <span className="font-bold">Số tài khoản:</span>
                    <span>{bankInfo.accountNumber}</span>
                  </p>

                  <p className="flex justify-between">
                    <span className="font-bold">Chủ tài khoản:</span>
                    <span>{bankInfo.accountName}</span>
                  </p>
                </div>

                <p className="mt-8 text-sm text-gray-900 text-center">
                  Xin chân thành cảm ơn mọi tấm lòng hảo tâm đã đồng hành cùng Xuân Tình Nguyện 2026.
                </p>
              </div>
            </div> */}

            <div className="w-full flex justify-center">
              <div className="flex flex-col w-full p-8 bg-[#fff8e7] rounded-2xl shadow-xl 
                hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 
                border border-gray-100 animate-fadeInRight">

                <h3 className="text-[22px] font-bold text-gray-900 mb-6 text-center">
                  Lời Gửi Gắm Từ Trái Tim
                </h3>

                <div className="prose prose-lg text-gray-700 leading-relaxed space-y-6">
                  <p>
                    Mỗi độ Xuân về, không chỉ là khởi đầu của một năm mới, mà còn là khởi nguồn của những dòng chảy yêu thương vô tận.
                    Với tâm huyết và sứ mệnh Tình nguyện vì cộng đồng, chúng mình tin rằng: điều kỳ diệu được tạo ra từ những trái tim biết sẻ chia.
                  </p>

                  <p>
                    Hành trình thắp sáng hy vọng này sẽ chẳng thể trọn vẹn nếu thiếu đi sự đồng hành ấm áp của các bạn.
                    Mỗi đóng góp từ bạn, cũng đều là một ngọn lửa vô giá, giúp chúng mình sưởi ấm thêm bao mảnh đời còn giá lạnh, mang nụ cười chân thật trở lại với những hoàn cảnh khó khăn.
                  </p>

                  <p>
                    Hãy cùng chúng mình đan dệt nên một mùa xuân diệu kỳ, các bạn nhé! Cảm ơn bạn, từ tận đáy lòng, vì đã cùng chúng mình gieo mầm yêu thương!
                  </p>
                </div>
                
              </div>
               {/* Animated Arrow */}
          
            </div>

          </div>
        </div>

      </div>
      <div className="mt-8 flex justify-center">
            <div className="animate-bounce">
              <ChevronDown className="size-8 text-[#a5c858]" strokeWidth={3} />
            </div>
          </div>
          <div className="mt-8 flex justify-center">
            <div className="animate-bounce">
              <ChevronDown className="size-8 text-[#a5c858]" strokeWidth={3} />
            </div>
          </div>
    </section>
  );
}
