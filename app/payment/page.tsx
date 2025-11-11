'use client';
import { useState } from 'react';
import { Store } from 'lucide-react';


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
