"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';

// --- ไอคอน SVG ---

// (ย้าย type IconProps มาไว้ตรงนี้ และลบส่วนที่ซ้ำซ้อน)
type IconProps = {
    className: string;
};

// ไอคอน: ลังสินค้า
const IconBox = ({ className }: IconProps) => (
    <svg className={className} xmlns="http://www.w.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {/*
          <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        */}
        <path d="M21 10c0-1.1-.9-2-2-2h-6.2c-.4 0-.7-.2-.9-.5l-1.4-2c-.3-.4-.8-.6-1.3-.6H4.8C3.8 5 3 5.9 3 7v10c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-4M7 15h10"/>
        <path d="M12 11v6"/>
    </svg>
);

// ไอคอน: รถ
const IconTruck = ({ className }: IconProps) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 18H3c-1.1 0-2-.9-2-2V7c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2v3.5"/>
        <path d="M15 9h4l3 3v4h-8v-7z"/>
        <circle cx="18" cy="18" r="2"/>
        <circle cx="7" cy="18" r="2"/>
    </svg>
);

// ไอคอน: เงิน
const IconMoney = ({ className }: IconProps) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" x2="12" y1="1" y2="23"/>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
    </svg>
);

// 2. ไอคอน: ผิด (เพิ่มใหม่)
const IconError = ({ className }: IconProps) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="15" y1="9" x2="9" y2="15" />
        <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
);

// --- กำหนด Type ---
// (ลบ IconProps ที่ซ้ำซ้อนจากตรงนี้)

type CartItem = {
    id: number;
    name: string;
    description: string;
    quantity: number;
    price: number;
    imageUrl: string;
};

// --- 1. คอมโพเนนต์สำหรับแถบสถานะ ---
// รับ props: currentStep และ handleNextStep
type StatusTrackerProps = {
    currentStep: number;
    handleNextStep: () => void;
};

const StatusTracker = ({ currentStep, handleNextStep }: StatusTrackerProps) => {
    const steps = [
        { name: 'กำลังเตรียมสินค้า', icon: <IconBox className="w-6 h-6" /> },
        { name: 'กำลังจัดส่ง', icon: <IconTruck className="w-6 h-6" /> },
        { name: 'จัดส่งเรียบร้อย', icon: <IconMoney className="w-6 h-6" /> }
    ];

    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold text-center mb-8 text-gray-800">สถานะการสั่งซื้อ</h2>
            
            <div className="relative flex justify-between items-start max-w-xl mx-auto">
                {/* เส้นเชื่อมพื้นหลัง (สีเทา) */}
                <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200" style={{ transform: 'translateY(-50%)', zIndex: 1 }}></div>
                
                {/* เส้นเชื่อม (Active - สีฟ้า) */}
                <div 
                    className="absolute top-5 left-0 h-1 bg-blue-500"
                    style={{ 
                        transform: 'translateY(-50%)', 
                        zIndex: 2,
                        width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
                        transition: 'width 0.3s ease'
                    }}
                ></div>

                {steps.map((step, index) => {
                    const stepNumber = index + 1;
                    const isActive = stepNumber <= currentStep;

                    return (
                        <div key={step.name} className="text-center relative z-10">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto border-2 transition-all duration-300 ${
                                isActive 
                                ? 'bg-blue-500 border-blue-500 text-white' 
                                : 'bg-white border-gray-300 text-gray-400'
                            }`}>
                                {step.icon}
                            </div>
                            <p className={`text-sm mt-2 transition-all duration-300 ${
                                isActive ? 'font-semibold text-gray-800' : 'text-gray-500'
                            }`}>
                                {step.name}
                            </p>
                        </div>
                    );
                })}
            </div>
            {/* ปุ่มชั่วคราวสำหรับทดสอบ */}
            {/* <div className="text-center mt-6">
                <button 
                    onClick={handleNextStep}
                    className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg text-sm hover:bg-blue-200 transition-colors"
                >
                    (ทดสอบ) เลื่อนสถานะ
                </button>
            </div> 
            */}
        </div>
    );
};

// --- 2. คอมโพเนนต์สำหรับรายการสินค้า ---
// รับ props: cartItems และ handleRemoveItem
type CartItemsListProps = {
    cartItems: CartItem[];
    handleRemoveItem: (id: number) => void;
};

const CartItemsList = ({ cartItems, handleRemoveItem }: CartItemsListProps) => (
    <div className="space-y-4 mb-6">
        <h2 className="text-xl font-semibold text-gray-800">รายการสินค้า ({cartItems.length} ชิ้น)</h2>
        
        {cartItems.length === 0 ? (
            <p className="text-gray-600 bg-white rounded-lg shadow-md p-4">ไม่มีสินค้าในตะกร้า</p>
        ) : (
            cartItems.map(item => (
                <div key={item.id} className="bg-white rounded-lg shadow-md p-4 flex items-center space-x-4">
                    <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 truncate">{item.name}</h3>
                        <p className="text-sm text-gray-600 truncate">{item.description}</p>
                        <p className="text-sm text-gray-500">จำนวน: {item.quantity}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                        <p className="font-semibold text-gray-900">฿{(item.price * item.quantity).toFixed(2)}</p>
                        <button 
                            className="text-red-500 hover:text-red-700 text-sm mt-1"
                            onClick={() => handleRemoveItem(item.id)}
                        >
                            ลบ
                        </button>
                    </div>
                </div>
            ))
        )}
    </div>
);

// --- 3. คอมโพเนนต์สำหรับสรุปยอด ---
// รับ props: subtotal, shipping, และ total
type OrderSummaryProps = {
    subtotal: number;
    shipping: number;
    total: number;
};

const OrderSummary = ({ subtotal, shipping, total }: OrderSummaryProps) => (
    <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">สรุปยอด</h2>
        <div className="space-y-2">
            <div className="flex justify-between">
                <span className="text-gray-600">ราคารวม (สินค้า)</span>
                <span className="font-medium text-gray-900">฿{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
                <span className="text-gray-600">ค่าจัดส่ง</span>
                <span className="font-medium text-gray-900">฿{shipping.toFixed(2)}</span>
            </div>
            <div className="border-t border-gray-200 my-2"></div>
            <div className="flex justify-between text-lg font-bold">
                <span className="text-gray-900">ยอดรวมที่ต้องจ่าย</span>
                <span className="text-blue-600">฿{total.toFixed(2)}</span>
            </div>
        </div>
        <Link href="/payment" className="w-full">
            <button className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg mt-6 hover:bg-blue-700 transition-colors">
                ไปที่หน้าชำระเงิน
            </button>
        </Link>
    </div>
);


// คอมโพเนนต์หลัก
export default function App() {
    // สถานะสำหรับเก็บรายการสินค้า (เริ่มต้นเป็น 0 ชิ้น)
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    // สถานะสำหรับเก็บขั้นตอนการจัดส่ง (1, 2, หรือ 3)
    const [currentStep, setCurrentStep] = useState(1);

    // ฟังก์ชันสำหรับลบสินค้า
    const handleRemoveItem = (id: number) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    };

    // *** ฟังก์ชันใหม่: สำหรับเพิ่มสินค้า ***
    const handleAddItem = (product: CartItem) => {
        // เช็คว่ามีสินค้าชิ้นนี้ในตะกร้าหรือยัง
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === product.id);
            if (existingItem) {
                // ถ้ามีแล้ว, ให้อัปเดตจำนวน (quantity)
                return prevItems.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                // ถ้ายังไม่มี, ให้เพิ่มเข้าไปใหม่ (quantity = 1)
                return [...prevItems, { ...product, quantity: 1 }];
            }
        });
    };
    

    // ฟังก์ชัน (ชั่วคราว) สำหรับเลื่อนสถานะ
    const handleNextStep = () => {
        setCurrentStep(prev => (prev < 3 ? prev + 1 : 1)); // วนกลับไป 1 เมื่อถึง 3
    };

    // คำนวณราคาสรุป
    const { subtotal, shipping, total } = useMemo(() => {
        const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shipping = cartItems.length > 0 ? 50.00 : 0.00; // ค่าส่ง 50 บาทถ้ามีของ
        const total = subtotal + shipping;
        return { subtotal, shipping, total };
    }, [cartItems]);

    // โครงสร้างหน้าหลัก
    return (
        <div className="bg-gray-100 min-h-screen p-4 md:p-8 font-['Inter',_sans-serif]">
            <div className="max-w-3xl mx-auto">   
                {/* สถานะ */}
                <StatusTracker 
                    currentStep={currentStep} 
                    handleNextStep={handleNextStep} 
                />

                {/* รายการสินค้า */}
                <CartItemsList 
                    cartItems={cartItems} 
                    handleRemoveItem={handleRemoveItem} 
                />

                {/* สรุปยอด */}
                <OrderSummary 
                    subtotal={subtotal} 
                    shipping={shipping} 
                    total={total}
                />
            </div>
        </div>
    );
}