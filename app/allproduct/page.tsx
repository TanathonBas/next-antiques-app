'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Store, ChevronDown, ShoppingCart, Image as ImageIcon, Link } from 'lucide-react';

// -- COMPONENT 1: Product Menu Dropdown --
// คอมโพเนนต์สำหรับเมนูสินค้าที่มี dropdown
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
                    <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100 rounded-t-md">ประเภทสินค้า</a>
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
                    <a href="#" className="flex items-center space-x-2">
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

// -- ประเภท (Type) สำหรับ Product --
// เราจะกำหนด interface (โครงสร้างข้อมูล) ของ Product เพื่อแก้ปัญหา TypeScript error 'any' type
// ที่แสดงในรูปภาพของคุณ
interface Product {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
}

// -- COMPONENT 3: Product Card --
// การ์ดสำหรับแสดงสินค้าแต่ละชิ้น
// เราได้เพิ่ม { product: Product } เพื่อบอกว่า 'product' ที่รับเข้ามาต้องมีโครงสร้างตาม interface Product
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

// -- COMPONENT 4: Product Grid (Body) --
// ส่วน Body ที่มีตารางสินค้า
function ProductGrid() {
    // ข้อมูลสินค้าจำลอง (Mock Data)
    const mockProducts = [
        { id: 1, name: 'ตะเกียงโบราณ', price: 1200, imageUrl: 'https://placehold.co/300x300/e2e8f0/8a4f1a?text=Antique+Lamp' },
        { id: 2, name: 'นาฬิกาพก', price: 3500, imageUrl: 'https://placehold.co/300x300/e2e8f0/8a4f1a?text=Pocket+Watch' },
        { id: 3, name: 'กล้องฟิล์มเก่า', price: 2800, imageUrl: 'https://placehold.co/300x300/e2e8f0/8a4f1a?text=Film+Camera' },
        { id: 4, name: 'เครื่องพิมพ์ดีด', price: 4100, imageUrl: 'https://placehold.co/300x300/e2e8f0/8a4f1a?text=Typewriter' },
        { id: 5, name: 'แสตมป์เก่า', price: 500, imageUrl: 'https://placehold.co/300x300/e2e8f0/8a4f1a?text=Old+Stamp' },
        { id: 6, name: 'ไหสังคโลก', price: 8900, imageUrl: 'https://placehold.co/300x300/e2e8f0/8a4f1a?text=Pottery' },
    ];

    return (
        <main className="container mx-auto px-6 py-8">
            {/* ส่วนตารางสินค้า (ตรงกลางสีขาว) */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">สินค้าน่าสนใจ</h2>

                {/* ตารางสินค้าแบบ Responsive */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {mockProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </main>
    );
}

// -- COMPONENT 5: Floating Cart Button --
// ปุ่มตะกร้าสินค้าแบบลอย (ลูกบอล)
function CartButton() {
    // 1. เรียกใช้ useRouter
    const router = useRouter();

    // 2. สร้างฟังก์ชันสำหรับ onClick
    const handleCartClick = () => {
        // 3. สั่งให้เปลี่ยนหน้าไปที่ /bucket
        router.push('/bucket');
    };

    return (
        <button
            onClick={handleCartClick} // 4. เรียกใช้ฟังก์ชันเมื่อคลิก
            className="fixed bottom-8 right-8 bg-amber-800 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg hover:bg-amber-700 transition-transform hover:scale-110"
            aria-label="เปิดตะกร้าสินค้า"
        >
            <ShoppingCart size={28} />
        </button>
    );
}

// -- MAIN APP COMPONENT --
// คอมโพเนนต์หลักที่รวมทุกส่วนเข้าด้วยกัน
// นี่คือ default export ที่ Next.js จะใช้เป็น Page
export default function AntiqueShopPage() {
    return (
        // เราใช้ bg-gray-100 เพื่อให้เห็นขอบเขตของ 'body สีขาว' ชัดเจนขึ้น
        <div className="min-h-screen bg-gray-100 font-sans">
            <Header />
            <ProductGrid />
            <CartButton />
        </div>
    );
}
