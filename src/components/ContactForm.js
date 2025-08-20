'use client';

export default function ContactForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('ขอบคุณสำหรับข้อความ เราจะติดต่อกลับในเร็วๆ นี้');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-lg">
      <h3 className="font-bold text-lg mb-4 text-gray-800">ส่งข้อความถึงเรา</h3>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="ชื่อ-นามสกุล"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-800"
          required
        />
        <input
          type="tel"
          placeholder="เบอร์โทรศัพท์"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-800"
          required
        />
        <textarea
          placeholder="ข้อความ"
          rows="4"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-800"
          required
        ></textarea>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold py-3 rounded-lg hover:from-green-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105"
        >
          ส่งข้อความ
        </button>
      </div>
    </form>
  );
}
