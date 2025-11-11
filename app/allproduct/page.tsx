"use client";

import React, { useState, useMemo } from 'react';
// import { useRouter } from 'next/navigation'; // 1. ลบ import นี้ออก
// 1. Import ไอคอนที่เราจะใช้ (รวมถึงไอคอนจัดเรียง)
import { 
    Store, 
    ShoppingCart, 
    ImageIcon, 
    Filter, // ไอคอนจัดเรียง (ค่าเริ่มต้น)
    ArrowDownAZ, // ไอคอนเรียงตามชื่อ
    ArrowDownWideNarrow // ไอคอนเรียงตามราคา (น้อยไปมาก)
} from 'lucide-react';

// -- COMPONENT 1: Header (Navbar) --
// (เหมือนเดิมจากโค้ดที่คุณให้มา)
function Header() {
    return (
        <header className="bg-amber-900 text-white shadow-md sticky top-0 z-10">
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                {/* ส่วนด้านซ้าย: โลโก้ และ เมนู */}
                <div className="flex items-center space-x-8">
                    {/* โลโก้ */}
                    <a href="#" className="flex items-center space-x-2">
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
        </header>
    );
}

// -- ประเภท (Type) สำหรับ Product --
interface Product {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
}

// -- COMPONENT 2: Product Card --
// (เหมือนเดิมจากโค้ดที่คุณให้มา)
function ProductCard({ product }: { product: Product }) {
    return (
        <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            {/* รูปสินค้า */}
            <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                {product.imageUrl ? (
                    <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                ) : (
                    <ImageIcon size={48} className="text-gray-400" />
                )}
            </div>
            {/* รายละเอียดสินค้า */}
            <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-800 mb-2">{product.name}</h3>
                <p className="text-amber-800 font-bold text-lg">
                    {product.price.toLocaleString('th-TH', { style: 'currency', currency: 'THB' })}
                </p>
            </div>
        </div>
    );
}

// ข้อมูลสินค้าจำลอง (Mock Data)
const mockProducts: Product[] = [
    { id: 1, name: 'ตะเกียงโบราณ', price: 1200, imageUrl: 'https://placehold.co/300x300/e2e8f0/8a4f1a?text=Antique+Lamp' },
    { id: 2, name: 'นาฬิกาพก', price: 3500, imageUrl: 'https://placehold.co/300x300/e2e8f0/8a4f1a?text=Pocket+Watch' },
    { id: 3, name: 'กล้องฟิล์มเก่า', price: 2800, imageUrl: 'https://placehold.co/300x300/e2e8f0/8a4f1a?text=Film+Camera' },
    { id: 4, name: 'เครื่องพิมพ์ดีด', price: 4100, imageUrl: 'https://placehold.co/300x300/e2e8f0/8a4f1a?text=Typewriter' },
    { id: 5, name: 'แสตมป์เก่า', price: 500, imageUrl: 'https://placehold.co/300x300/e2e8f0/8a4f1a?text=Old+Stamp' },
    { id: 6, name: 'ไหสังคโลก', price: 8900, imageUrl: 'https://placehold.co/300x300/e2e8f0/8a4f1a?text=Pottery' },
];

// -- COMPONENT 3: Product Grid (Body) --
// *** ส่วนนี้คือส่วนที่เราเพิ่ม Logic การจัดเรียง ***
function ProductGrid() {
    
    // 2. ใช้ useState เก็บสถานะการจัดเรียง (0=ค่าเริ่มต้น, 1=ชื่อ, 2=ราคา)
    const [sortState, setSortState] = useState(0);

    // 3. ใช้ useMemo เพื่อคำนวณรายการสินค้าที่จะแสดงผลใหม่
    // (จะทำงานใหม่ก็ต่อเมื่อ mockProducts หรือ sortState เปลี่ยนไป)
    const sortedProducts = useMemo(() => {
        // 0 = ค่าเริ่มต้น (ตาม mockProducts)
        if (sortState === 0) {
            return mockProducts;
        }
        
        // สร้าง Array ใหม่เพื่อไม่ให้กระทบข้อมูลเดิม
        const sorted = [...mockProducts];

        if (sortState === 1) { // 1 = เรียงตามชื่อ
            sorted.sort((a, b) => a.name.localeCompare(b.name, 'th'));
        } else if (sortState === 2) { // 2 = เรียงตามราคา
            sorted.sort((a, b) => a.price - b.price);
        }

        return sorted;
    }, [sortState]); // ให้คำนวณใหม่เมื่อ sortState เปลี่ยน

    // 4. ฟังก์ชันสำหรับสลับการจัดเรียง (0 -> 1 -> 2 -> 0)
    const toggleSort = () => {
        setSortState((currentState) => (currentState + 1) % 3);
    };

    // 5. ฟังก์ชันช่วยสำหรับแสดงไอคอนและข้อความของปุ่ม
    const getSortInfo = () => {
        if (sortState === 1) {
            return { icon: <ArrowDownAZ size={16} />, text: 'ตามชื่อ', active: true };
        }
        if (sortState === 2) {
            return { icon: <ArrowDownWideNarrow size={16} />, text: 'ตามราคา', active: true };
        }
        return { icon: <Filter size={16} />, text: 'จัดเรียง', active: false };
    };

    const sortInfo = getSortInfo();

    return (
        <main className="container mx-auto px-6 py-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                
                {/* 6. ปุ่มจัดเรียง (เชื่อมต่อกับ React State) */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">สินค้าน่าสนใจ</h2>
                    
                    <button 
                        onClick={toggleSort} // 7. เรียกใช้ฟังก์ชัน toggleSort
                        title="จัดเรียงสินค้า"
                        className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm transition-colors ${
                            sortInfo.active
                                ? 'bg-amber-800 text-white' // สถานะ Active
                                : 'bg-gray-200 text-gray-800 hover:bg-gray-300' // สถานะปกติ
                        }`}
                    >
                        <span className="inline-block w-4 h-4">{sortInfo.icon}</span>
                        <span>{sortInfo.text}</span>
                    </button>
                </div>

                {/* 8. ตารางสินค้า (ใช้ sortedProducts ที่คำนวณแล้ว) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {sortedProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </main>
    );
}

// -- COMPONENT 4: Floating Cart Button --
// (เหมือนเดิมจากโค้ดที่คุณให้มา)
function CartButton() {

    // 3. เปลี่ยนจาก <button> เป็น <a> (แท็ก Link ธรรมดา)
    return (
        <a
            href="/bucket" // 4. ใช้ href เพื่อไปยังหน้าตะกร้า
            className="fixed bottom-8 right-8 bg-amber-800 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg hover:bg-amber-700 transition-transform hover:scale-110"
            aria-label="เปิดตะกร้าสินค้า"
        >
            <ShoppingCart size={28} />
        </a>
    );
}

// -- MAIN APP COMPONENT --
export default function AntiqueShopPage() {
    return (
        <div className="min-h-screen bg-gray-100 font-sans">
            <Header />
            <ProductGrid />
            <CartButton />
        </div>
    );
}