"use client";

import React, { useState, useMemo } from 'react';
// 1. Import ไอคอน (เพิ่ม Search)
import { 
    Store, 
    ShoppingCart, 
    ImageIcon, 
    Filter, 
    ArrowDownAZ, 
    ArrowDownWideNarrow,
    Search, // 2. เพิ่มไอคอนค้นหา
    Plus // 1. เพิ่มไอคอน Plus
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
function ProductCard({ product, onAddToCart }: { product: Product, onAddToCart: () => void }) {
    return (
        <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            {/* รูปสินค้า */}
            <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                {product.imageUrl ? (
                    <img 
                        src={product.imageUrl} 
                        alt={product.name} 
                        className="w-full h-full object-cover" 
                        onError={(e) => {
                            // In case the image fails to load, show a placeholder
                            const target = e.target as HTMLImageElement;
                            target.onerror = null; // Prevent infinite loop
                            target.src = `https://placehold.co/300x300/e2e8f0/8a4f1a?text=Image+Error`;
                        }}
                    />
                ) : (
                    <ImageIcon size={48} className="text-gray-400" />
                )}
            </div>
            {/* รายละเอียดสินค้า */}
            <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-800 mb-2 truncate" title={product.name}>{product.name}</h3>
                
                {/* 2. สร้าง Flex container สำหรับราคาและปุ่มบวก */}
                <div className="flex justify-between items-center mt-2">
                    <p className="text-amber-800 font-bold text-lg">
                        {product.price.toLocaleString('th-TH', { style: 'currency', currency: 'THB' })}
                    </p>
                    
                    {/* 3. ปุ่ม "บวก" สำหรับเพิ่มเข้าตะกร้า - เปลี่ยน onClick */}
                    <button 
                        onClick={onAddToCart} // <--- เปลี่ยนตรงนี้
                        className="bg-amber-800 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-amber-700 transition-colors shadow"
                        aria-label={`เพิ่ม ${product.name} ลงในตะกร้า`}
                        title="เพิ่มลงตะกร้า"
                    >
                        <Plus size={18} />
                    </button>
                </div>
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
    { id: 7, name: 'โทรศัพท์โบราณ', price: 2200, imageUrl: 'https://placehold.co/300x300/e2e8f0/8a4f1a?text=Old+Phone' },
    { id: 8, name: 'เหรียญเก่า', price: 750, imageUrl: 'https://placehold.co/300x300/e2e8f0/8a4f1a?text=Old+Coin' },
];

// -- COMPONENT 3: Product Grid (Body) --
// *** ส่วนนี้คือส่วนที่เราเพิ่ม Logic การค้นหาและจัดเรียง ***
function ProductGrid({ onAddToCart }: { onAddToCart: () => void }) {
    
    // สถานะสำหรับจัดเรียง
    const [sortState, setSortState] = useState(0); // 0: default, 1: name, 2: price
    
    // 3. เพิ่ม State สำหรับเก็บค่าในช่องค้นหา
    const [searchTerm, setSearchTerm] = useState("");

    // 4. อัปเดต useMemo ให้กรองข้อมูล (filter) ก่อน แล้วจึงจัดเรียง (sort)
    const filteredAndSortedProducts = useMemo(() => {
        
        // 4.1 กรองตาม searchTerm ก่อน
        const filteredProducts = mockProducts.filter(product => 
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        // 4.2 จัดเรียง
        if (sortState === 0) {
            return filteredProducts; // คืนค่าที่กรองแล้ว (แต่ยังไม่จัดเรียง)
        }
        
        // สร้าง Array ใหม่จากข้อมูลที่กรองแล้วเพื่อจัดเรียง
        const sorted = [...filteredProducts];

        if (sortState === 1) { // 1 = เรียงตามชื่อ
            sorted.sort((a, b) => a.name.localeCompare(b.name, 'th'));
        } else if (sortState === 2) { // 2 = เรียงตามราคา
            sorted.sort((a, b) => a.price - b.price);
        }

        return sorted;
    }, [sortState, searchTerm]); // 5. เพิ่ม searchTerm ใน dependencies

    // ฟังก์ชันสำหรับสลับการจัดเรียง
    const toggleSort = () => {
        setSortState((currentState) => (currentState + 1) % 3);
    };

    // ฟังก์ชันช่วยสำหรับแสดงไอคอนและข้อความของปุ่ม
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
        <main className="container mx-auto px-4 sm:px-6 py-8">
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg">
                
                {/* 6. ปรับ Layout ส่วนหัว (H2, Search, Sort) */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                    <h2 className="text-2xl font-bold text-gray-800 flex-shrink-0">สินค้าน่าสนใจ</h2>
                    
                    {/* 7. เพิ่ม Container สำหรับช่องค้นหาและปุ่มจัดเรียง */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full md:w-auto">
                        
                        {/* 8. ช่องค้นหา */}
                        <div className="relative w-full sm:w-auto">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                <Search size={18} />
                            </span>
                            <input 
                                type="text"
                                placeholder="ค้นหาด้วยชื่อ..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="border border-gray-300 rounded-full px-4 py-2 text-sm pl-10 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-amber-800 focus:border-transparent transition-all"
                            />
                        </div>

                        {/* 9. ปุ่มจัดเรียง (เหมือนเดิม แต่ปรับ w-full) */}
                        <button 
                            onClick={toggleSort}
                            title="จัดเรียงสินค้า"
                            className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-full text-sm transition-colors w-full sm:w-auto ${
                                sortInfo.active
                                    ? 'bg-amber-800 text-white shadow-md'
                                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                            }`}
                        >
                            <div className="flex-shrink-0 w-4 h-4">{sortInfo.icon}</div>
                            <span>{sortInfo.text}</span>
                        </button>
                    </div>
                </div>

                {/* 10. ตารางสินค้า (ใช้ filteredAndSortedProducts) */}
                {/* 11. เพิ่มการตรวจสอบว่ามีสินค้าหรือไม่ */}
                {filteredAndSortedProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredAndSortedProducts.map(product => (
                            <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} /> // <--- ส่ง prop ไปที่นี่
                        ))}
                    </div>
                ) : (
                    // 12. แสดงข้อความเมื่อไม่พบสินค้า
                    <div className="text-center text-gray-500 py-16">
                        <p className="text-lg font-semibold">ไม่พบสินค้าที่ตรงกัน</p>
                        {searchTerm && (
                            <p className="text-sm mt-1">
                                จากคำค้นหา: {searchTerm}
                            </p>
                        )}
                    </div>
                )}
            </div>
        </main>
    );
}

// -- COMPONENT 4: Floating Cart Button --
// (เหมือนเดิมจากโค้ดที่คุณให้มา)
function CartButton({ itemCount }: { itemCount: number }) { // <--- รับ itemCount
    return (
        <a
            href="/bucket" // 4. ใช้ href เพื่อไปยังหน้าตะกร้า
            className="fixed bottom-8 right-8 bg-amber-800 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg hover:bg-amber-700 transition-transform hover:scale-110"
            aria-label="เปิดตะกร้าสินค้า"
        >
            <ShoppingCart size={28} />
            
            {/* เพิ่ม Badge แสดงจำนวนสินค้า */}
            {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center border-2 border-white">
                    {itemCount}
                </span>
            )}
        </a>
    );
}

// -- MAIN APP COMPONENT --
export default function AntiqueShopPage() {
    // 1. เพิ่ม State สำหรับนับจำนวนสินค้าในตะกร้า
    const [cartItemCount, setCartItemCount] = useState(0);

    // 2. สร้างฟังก์ชันสำหรับเพิ่มสินค้า (แค่เพิ่มจำนวนนับ)
    const handleAddToCart = () => {
        setCartItemCount(prevCount => prevCount + 1);
    };

    return (
        // ใช้ Inter font (ถ้า Tailwind config ตั้งไว้) และ anti-aliased เพื่อความสวยงาม
        <div className="min-h-screen bg-gray-100 font-sans antialiased">
            <Header />
            {/* 3. ส่งฟังก์ชัน onAddToCart และ itemCount ไปยัง Component ลูก */}
            <ProductGrid onAddToCart={handleAddToCart} />
            <CartButton itemCount={cartItemCount} />
        </div>
    );
}