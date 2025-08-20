'use client';

import MainHeader from '../../components/MainHeader';
import AnimateOnScroll from '../../components/AnimateOnScroll';
import BenefitsCycle from '../../components/BenefitsCycle';
import ContactForm from '../../components/ContactForm';
import { Tractor, Leaf, Wrench, CheckCircle, Users, Shield, Clock, Star, MapPin, Phone, Mail } from 'lucide-react';

export default function MainPage() {
  const benefits = [
    {
      icon: <CheckCircle className="w-12 h-12 text-green-500" />,
      title: "ประหยัดต้นทุน",
      description: "ไม่ต้องลงทุนซื้ออุปกรณ์ราคาแพง เช่าเท่าที่ใช้จริง"
    },
    {
      icon: <Wrench className="w-12 h-12 text-blue-500" />,
      title: "บำรุงรักษาครบครัน",
      description: "อุปกรณ์ทุกชิ้นผ่านการตรวจสอบและบำรุงรักษาอย่างสม่ำเสมอ"
    },
    {
      icon: <Users className="w-12 h-12 text-purple-500" />,
      title: "ช่วยเหลือตลอด 24 ชม.",
      description: "ทีมงานผู้เชี่ยวชาญพร้อมให้คำปรึกษาและช่วยเหลือตลอดเวลา"
    },
    {
      icon: <Shield className="w-12 h-12 text-red-500" />,
      title: "ประกันความเสียหาย",
      description: "คุ้มครองความเสียหายที่อาจเกิดขึ้นระหว่างการใช้งาน"
    },
    {
      icon: <Clock className="w-12 h-12 text-orange-500" />,
      title: "ยืดหยุ่นเวลาเช่า",
      description: "เช่ารายวัน รายสัปดาห์ หรือรายเดือน ตามความต้องการ"
    },
    {
      icon: <Leaf className="w-12 h-12 text-green-600" />,
      title: "เทคโนโลยีใหม่",
      description: "อุปกรณ์รุ่นใหม่ล่าสุด เพิ่มประสิทธิภาพการทำงาน"
    }
  ];

  const testimonials = [
    {
      name: "นายสมชาย ใจดี",
      location: "เชียงใหม่",
      text: "ใช้บริการมา 3 ปี อุปกรณ์คุณภาพดี ราคาเป็นธรรม",
      rating: 5
    },
    {
      name: "นางสาวมาลี สวยงาม",
      location: "นครราชสีมา",
      text: "บริการดีมาก ส่งตรงเวลา ช่วยเหลือดี",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
      <MainHeader />
      
      {/* Hero Section */}
      <main className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/90 to-blue-600/90"></div>
        <div 
          className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
          style={{
            backgroundImage: "url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 1200 800\"><defs><pattern id=\"farm\" patternUnits=\"userSpaceOnUse\" width=\"100\" height=\"100\"><rect fill=\"%2334d399\" width=\"100\" height=\"100\"/><circle fill=\"%2316a34a\" cx=\"50\" cy=\"50\" r=\"20\" opacity=\"0.1\"/></pattern></defs><rect fill=\"url(%23farm)\" width=\"1200\" height=\"800\"/></svg>')"
          }}
        >
          <div className="text-center text-white px-4 max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              <span className="inline-block animate-bounce delay-100">ค้นหา</span>{" "}
              <span className="inline-block animate-bounce delay-200">เปรียบเทียบ</span>{" "}
              <span className="inline-block animate-bounce delay-300">เช็คราคา</span><br/>
              <span className="inline-block animate-bounce delay-500 text-yellow-300">ทุกที่ทุกเวลา</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              เช่าอุปกรณ์การเกษตรคุณภาพสูง เพื่อเกษตรกรยุคใหม่
            </p>
            <button className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-4 px-8 rounded-full text-xl transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              ค้นหาอุปกรณ์
            </button>
          </div>
        </div>
        
        {/* Floating Icons Animation */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 left-10 animate-float">
            <Tractor className="w-16 h-16 text-white/20" />
          </div>
          <div className="absolute top-40 right-20 animate-float-delayed">
            <Leaf className="w-12 h-12 text-white/20" />
          </div>
          <div className="absolute bottom-40 left-1/4 animate-float">
            <Wrench className="w-10 h-10 text-white/20" />
          </div>
        </div>
      </main>

      {/* Benefits Section */}
      <AnimateOnScroll
        className="py-20 px-4"
        animationClasses={{ visible: 'opacity-100 translate-y-0', hidden: 'opacity-0 translate-y-10' }}
      >
        <section id="benefits">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                ทำไมต้องเช่าอุปกรณ์กับเรา?
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-blue-500 mx-auto"></div>
            </div>
            
            {/* Featured Benefit */}
            <div className="mb-16 text-center">
              <BenefitsCycle benefits={benefits} />
            </div>

            {/* Benefits Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border-l-4 border-green-500"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="mb-4">{benefit.icon}</div>
                  <h3 className="text-xl font-bold mb-3 text-gray-800">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </AnimateOnScroll>

      {/* Testimonials */}
      <section className="py-16 bg-gradient-to-r from-green-100 to-blue-100">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            ความคิดเห็นจากลูกค้า
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                <div className="border-t pt-4">
                  <p className="font-semibold text-gray-800">{testimonial.name}</p>
                  <p className="text-gray-600 text-sm">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment Categories */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
            หมวดหมู่อุปกรณ์
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { name: "รถไถ", icon: "🚜", color: "from-green-400 to-green-600" },
              { name: "เครื่องเก็บเกี่ยว", icon: "🌾", color: "from-yellow-400 to-orange-500" },
              { name: "ระบบน้ำ", icon: "💧", color: "from-blue-400 to-blue-600" },
              { name: "อุปกรณ์อื่นๆ", icon: "⚙️", color: "from-purple-400 to-purple-600" }
            ].map((category, index) => (
              <div 
                key={index}
                className={`bg-gradient-to-br ${category.color} text-white rounded-2xl p-6 text-center hover:scale-105 transform transition-all duration-300 cursor-pointer shadow-lg hover:shadow-2xl`}
              >
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="font-bold text-lg">{category.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <AnimateOnScroll
        className="py-20 px-4 bg-gray-900 text-white"
        animationClasses={{ visible: 'opacity-100 translate-y-0', hidden: 'opacity-0 translate-y-10' }}
      >
        <section id="contact">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">ติดต่อเรา</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-blue-500 mx-auto"></div>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div className="space-y-8">
                <div className="bg-gray-800 rounded-2xl p-6 hover:bg-gray-700 transition-colors duration-300">
                  <div className="flex items-center space-x-4">
                    <div className="bg-green-500 p-3 rounded-full">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">ที่อยู่</h3>
                      <p className="text-gray-300">123/45 หมู่ 2 ตำบลคลองหลวง<br/>อำเภอคลองหลวง จังหวัดปทุมธานี 12120</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-800 rounded-2xl p-6 hover:bg-gray-700 transition-colors duration-300">
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-500 p-3 rounded-full">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">โทรศัพท์</h3>
                      <p className="text-gray-300">02-123-4567<br/>089-123-4567</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-800 rounded-2xl p-6 hover:bg-gray-700 transition-colors duration-300">
                  <div className="flex items-center space-x-4">
                    <div className="bg-purple-500 p-3 rounded-full">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">อีเมล</h3>
                      <p className="text-gray-300">info@agrirent.co.th<br/>support@agrirent.co.th</p>
                    </div>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-6">
                  <h3 className="font-bold text-lg mb-3">เวลาทำการ</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>จันทร์ - ศุกร์:</span>
                      <span>08:00 - 18:00 น.</span>
                    </div>
                    <div className="flex justify-between">
                      <span>เสาร์ - อาทิตย์:</span>
                      <span>09:00 - 17:00 น.</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Google Maps & Form */}
              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-2 shadow-lg">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d247.89844444820038!2d100.65147!3d14.1508!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTTCsDA5JzAyLjkiTiAxMDDCsDM5JzA1LjMiRQ!5e0!3m2!1sen!2sth!4v1629789474729!5m2!1sen!2sth"
                    width="100%"
                    height="300"
                    style={{ border: 0, borderRadius: '12px' }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="ที่ตั้งบริษัท AgriRent Thailand"
                  ></iframe>
                </div>
                
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </AnimateOnScroll>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: "500+", label: "อุปกรณ์พร้อมใช้" },
              { number: "1000+", label: "ลูกค้าที่ไว้วางใจ" },
              { number: "1", label: "ปีประสบการณ์" },
              { number: "24/7", label: "บริการตลอดเวลา" }
            ].map((stat, index) => (
              <div key={index} className="transform hover:scale-110 transition-transform duration-300">
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-lg opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Tractor className="w-8 h-8" />
                <h3 className="text-xl font-bold">SMART/AGRIRENT</h3>
              </div>
              <p className="text-gray-400">
                ผู้นำด้านการให้เช่าอุปกรณ์การเกษตรในประเทศไทย
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">เมนูหลัก</h4>
              <div className="space-y-2 text-gray-400">
                <div>หน้าแรก</div>
                <div>อุปกรณ์เช่า</div>
                <div>ราคา</div>
                <div>เกี่ยวกับเรา</div>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">ติดตามเรา</h4>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-500 transition-colors">
                  f
                </div>
                <div className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-pink-500 transition-colors">
                  IG
                </div>
                <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-500 transition-colors">
                  YT
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 SMART/AGRIRENT. สงวนลิขสิทธิ์</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-3deg); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
        
        .animate-bounce {
          animation: bounce 2s infinite;
        }
        
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-500 { animation-delay: 0.5s; }
      `}</style>
    </div>
  );
}