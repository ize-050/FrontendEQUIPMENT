import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-gray-800">
            <Link href="/">Logo</Link>
          </div>
          <div className="flex items-center">
            <Link href="/" className="text-gray-800 mx-3 hover:text-blue-500">Home</Link>
            <Link href="/booking" className="text-gray-800 mx-3 hover:text-blue-500">Booking</Link>
            <Link href="/about" className="text-gray-800 mx-3 hover:text-blue-500">About</Link>
            <Link href="/contact" className="text-gray-800 mx-3 hover:text-blue-500">Contact</Link>
          </div>
          <div>
            <Link href="/login">
              <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700">
                Login
              </button>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
