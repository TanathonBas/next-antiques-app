import React from 'react';

// ไอคอนจาก 'lucide-react' (เป็นที่นิยมในโปรเจกต์ React/Next.js)
// ใน Next.js จริง คุณจะต้องติดตั้ง: npm install lucide-react
import { Link, Sparkles } from 'lucide-react';

// -- MAIN APP COMPONENT --
// คอมโพเนนต์หลักสำหรับหน้า Landing/Login
// เราจะสร้างหน้าใหม่ตามรูปวาดของคุณ
export default function LandingPage() {
  return (
    // จัดหน้าให้อยู่กึ่งกลางจอ และใช้พื้นหลังสีน้ำตาลอ่อน
    <div className="min-h-screen bg-amber-100 flex items-center justify-center p-4">

      {/* การ์ดสีขาวสำหรับแสดงโลโก้และปุ่ม */}
      <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg">

        {/* ส่วนโลโก้และชื่อเว็ป */}
        <div className="flex flex-col items-center mb-8">
          {/* โลโก้ (วงกลม) */}
          <div className="bg-amber-800 text-white w-24 h-24 rounded-full flex items-center justify-center mb-4">
            <Sparkles size={60} />
          </div>
          {/* ชื่อเว็ป */}
          <h1 className="text-3xl font-bold text-amber-900">ของเก่าเล่าเรื่อง</h1>
          <p className="text-gray-600">ยินดีต้อนรับ</p>
        </div>

        {/* ส่วนปุ่ม (ช่องสี่เหลี่ยม) */}
        <div className="flex flex-col space-y-4">

          {/* ช่องสี่เหลี่ยมแรก: เข้าสู่เว็ป (เปลี่ยนเป็น <a> tag) */}
          {/* เราเปลี่ยน <button> เป็น <a> tag เพื่อให้เป็นลิ้งค์
              และเพิ่ม className 'text-center' เพื่อจัดข้อความให้อยู่กลาง (เพราะ <a> tag ไม่ได้อยู่กลางโดยอัตโนมัติเหมือน <button>)
          */}
          <a
            href="/allproduct" // นี่คือลิ้งค์ปเข้าสู่เว็ป
            className="w-full bg-amber-800 text-white py-3 rounded-md text-lg font-semibold hover:bg-amber-700 transition-colors text-center"
          >
            เข้าสู่เว็ป
          </a>

          {/* ช่องสี่เหลี่ยมที่สอง: Login */}
          <button className="w-full bg-gray-200 text-gray-800 py-3 rounded-md text-lg font-semibold hover:bg-gray-300 transition-colors">
            Login
          </button>

          {/* ช่องสี่เหลี่ยมที่สาม: Register */}
          <button className="w-full border-2 border-amber-800 text-amber-800 py-3 rounded-md text-lg font-semibold hover:bg-amber-50 transition-colors">
            Register
          </button>

        </div>

      </div>
    </div>
  );
}