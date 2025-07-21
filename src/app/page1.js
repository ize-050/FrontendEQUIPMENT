import Link from 'next/link';

// Since I cannot use local images easily, I'll use text for the logo.
function Logo() {
  return (
    <Link href="/">
      <div className="flex flex-col leading-tight">
        <span className="font-bold text-xl tracking-wider">SMART/AGRIRENT</span>
        <span className="text-xs text-gray-500">AGRICULTURAL EQUIPMENT RENTAL PLATFORM</span>
      </div>
    </Link>
  );
}

function Header() {
  return (
    <header className="bg-white/95 backdrop-blur-sm fixed top-0 left-0 right-0 z-50 border-b border-gray-200">
      <nav className="container mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-10">
          <Logo />
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#" className="text-gray-600 font-medium hover:text-green-700">หน้าแรก</Link>
            <Link href="#" className="text-gray-600 font-medium hover:text-green-700">ค้นหาเครื่องจักร</Link>
            <Link href="#" className="text-gray-600 font-medium hover:text-green-700">นโยบายส่วนตัว</Link>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="bg-white text-gray-800 font-semibold py-2 px-6 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors">
            ผู้เช่า
          </button>
          <button className="bg-green-800 text-white font-semibold py-2 px-6 rounded-full hover:bg-green-900 transition-colors">
            เจ้าของเครื่องมือ
          </button>
        </div>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <div className="relative h-screen w-full">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1627920523425-923a4e1575d6?q=80&w=2070&auto=format&fit=crop')" }}
      ></div>
      <div 
        className="absolute inset-0"
        style={{ 
          backgroundColor: 'rgba(22, 54, 34, 0.85)',
          clipPath: 'polygon(0 0, 60% 0, 40% 100%, 0% 100%)'
        }}
      ></div>
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-6 w-full md:w-1/2 lg:w-2/5">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight whitespace-nowrap">
            ค้นหา เปรียบเทียบ<br />
            เช็คราคา ทุกที่ทุกเวลา
          </h1>
          <button className="mt-10 bg-white text-green-800 font-bold py-4 px-10 rounded-full text-xl hover:bg-gray-200 transition duration-300 shadow-lg">
            ค้นหาอุปกรณ์
          </button>
        </div>
      </div>
    </div>
  );
}


export default function HomePage() {
  return (
    <div className="bg-gray-50">
      <Header />
      <main>
        <Hero />
        {/* You can add more sections here */}
        <div className="py-20 text-center">
            <h2 className="text-3xl font-bold">ส่วนเนื้อหาเพิ่มเติม</h2>
        </div>
      </main>
    </div>
  );
}
