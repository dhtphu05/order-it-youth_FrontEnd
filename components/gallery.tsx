"use client"

import * as React from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X, ZoomIn } from "lucide-react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

const images = [
  "622912485_1585853886883410_754634918578593989_n.jpg",
  "622971074_1585605596908239_8726703496550319888_n.jpg",
  "624948176_1589447823190683_7013286695118099522_n.jpg",
  "625257199_1589446706524128_4685604494069775165_n.jpg",
  "625299013_1589448053190660_61564625022756704_n.jpg",
  "625514268_1590546223080843_1572246246424026378_n.jpg",
  "625749599_1592333772902088_4307864752414973758_n.jpg",
  "625894232_1590546149747517_5220802092330195304_n.jpg",
  "625993464_1589448099857322_1349206343918680944_n.jpg",
  "626044488_1590546346414164_4847775253696858806_n.jpg",
  "626099969_1590546013080864_6323770292996779329_n.jpg",
  "626313150_1592334146235384_3838676514170332018_n.jpg",
  "626352114_1592334502902015_6839880655389599739_n.jpg",
  "626546297_1589448176523981_7850736008035410045_n.jpg",
  "626662306_1592334412902024_1979713207325240192_n.jpg",
  "626814370_1589445526524246_8342621629114652831_n.jpg",
  "627205552_1592334556235343_3506653509502845766_n.jpg",
  "627541683_1589448016523997_6339556732057077429_n.jpg",
  "627693539_1589446029857529_4349782102912810047_n.jpg",
  "627721605_1592334029568729_2181095463769313002_n.jpg",
  "627849132_1590546443080821_3410677583275305945_n.jpg",
  "627872152_1592333779568754_4325154320029400307_n.jpg",
  "627983776_1592334326235366_5357576339445905766_n.jpg",
  "628155965_1592334566235342_8500999826920714733_n.jpg",
  "628715821_1592334139568718_7985297000392580175_n.jpg",
  "628783573_1592334076235391_2722116047458902325_n.jpg",
  "629138809_1592334432902022_8483664310315785678_n.jpg",
  "629154766_1590546016414197_2804424312938555796_n.jpg",
  "629273601_1592334336235365_8476555628143232172_n.jpg",
  "DSC00177.jpg",
  "DSC00193.jpg",
  "DSC00214 (1).jpg",
  "DSC00250.jpg",
  "DSC00436.jpg",
  "DSC08977-Enhanced-NR.jpg",
  "DSC09055.jpg",
].map(filename => `/xtn26/${filename}`)

export default function Gallery() {
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null)

  return (
    <section id="gallery" className="py-20 md:py-32 px-4 bg-[#fffdf5] overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-20 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-6 py-2 rounded-full bg-[#fde9e8] text-[#e85d56] text-sm font-bold tracking-wider mb-2 uppercase"
          >
            Khoảnh khắc đáng nhớ
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#A5C858] font-heading tracking-tight"
          >
            Những khoảnh khắc đáng nhớ
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed"
          >
            Lưu giữ những nụ cười, những giọt mồ hôi và những khoảnh khắc đẹp nhất trong hành trình mang xuân về bản làng.
          </motion.p>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6 px-2">
          {images.map((src, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="break-inside-avoid"
            >
              <Dialog>
                <DialogTrigger asChild>
                  <div className="group relative overflow-hidden rounded-3xl cursor-pointer bg-gray-100">
                    <Image
                      src={src}
                      alt={`Gallery image ${index + 1}`}
                      width={600}
                      height={800}
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="bg-white/90 backdrop-blur-sm p-3 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-300 delay-100">
                        <ZoomIn className="w-6 h-6 text-gray-800" />
                      </div>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-[95vw] h-[90vh] bg-transparent border-none shadow-none p-0 flex items-center justify-center">
                  <div className="relative w-full h-full flex items-center justify-center">
                    {/* Close button handled by Dialog primitive usually, but we can customize or rely on default */}
                    <div className="relative w-auto h-auto max-w-full max-h-full rounded-lg overflow-hidden shadow-2xl">
                      <Image
                        src={src}
                        alt="Full viewing"
                        width={1920}
                        height={1080}
                        className="object-contain max-w-full max-h-[90vh]"
                      />
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}