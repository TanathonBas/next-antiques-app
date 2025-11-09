'use client';
import { useState } from 'react';
import { Store, ChevronDown, } from 'lucide-react';

function ProductMenu() {
    // สร้าง state เพื่อจัดการการเปิด/ปิด ของ dropdown
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            {/* ปุ่มสำหรับเปิด/ปิด dropdown */}
            <button
                onClick={() => setIsOpen(!isOpen)} // เมื่อคลิก ให้สลับค่า isOpen
                className="flex items-center space-x-1 hover:text-yellow-300 transition-colors"
            >
                <span>สินค้า</span>
                <ChevronDown size={16} />
            </button>

            {/* กล่อง dropdown ที่จะแสดงเมื่อ isOpen เป็น true */}
            {isOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-20">
                    <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100 rounded-t-md">ชื่อ</a>
                    <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">ราคา</a>
                    <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100 rounded-b-md">เวลาของตัวสินค้า</a>
                </div>
            )}
        </div>
    );
}

// -- COMPONENT 2: Header (Navbar) --
// ส่วนหัวของเว็ป (Navbar)
function Header() {
    return (
        <header className="bg-amber-900 text-white shadow-md sticky top-0 z-10">
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                {/* ส่วนด้านซ้าย: โลโก้ และ เมนู */}
                <div className="flex items-center space-x-8">
                    {/* โลโก้ */}
                    <a href="/allproduct" className="flex items-center space-x-2">
                        <Store size={28} />
                        <span className="text-xl font-bold">ของเก่าเล่าเรื่อง</span>
                    </a>

                    {/* เมนู */}
                    <ul className="hidden md:flex items-center space-x-6">
                        <li>
                            <ProductMenu /> {/* เรียกใช้ Component Dropdown */}
                        </li>
                        <li>
                            <a href="/newsapp" className="hover:text-yellow-300 transition-colors">ข่าวสาร</a>
                        </li>
                        <li>
                            <a href="/aboutus" className="hover:text-yellow-300 transition-colors">เกี่ยวกับเรา</a>
                        </li>
                    </ul>
                </div>

                {/* ส่วนด้านขวา: Sign in / Sign up */}
                <div className="flex items-center space-x-4">
                    <a href="/login" className="hover:text-yellow-300 transition-colors text-sm">Sign In</a>
                    <a
                        href="/register"
                        className="bg-white text-amber-900 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
                    >
                        Sign Up
                    </a>
                </div>
            </nav>

            {/* Mockup สำหรับข่าวสารและเกี่ยวกับเรา (จะแสดงเมื่อคลิกเมนูจริงๆ) */}
            {/* ในตัวอย่างนี้เราจะยังไม่ทำระบบ routing/modal ครับ */}
        </header>
    );
}

export default function page() {
    return (
        <div>
            <Header />
        </div>
    )
}
