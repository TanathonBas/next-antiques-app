"use client";

import { useEffect, useState } from "react";

// Interfaces for type safety
interface FormData {
    fullName: string;
    email: string;
    password: string;
    gender: "male" | "female" | "other" | "";
    profilePic: File | null;
}

export default function Page() {
    const [formData, setFormData] = useState<FormData>({
        fullName: "",
        email: "",
        password: "",
        gender: "",
        profilePic: null,
    });

    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, gender: e.target.value as "male" | "female" | "other" }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setFormData((prev) => ({ ...prev, profilePic: file }));
            setImagePreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form Data:", formData);
    };

    return (
        <div className={`flex min-h-screen items-center justify-center p-6 sm:p-24 transition-colors duration-1000`}>
            <div className="flex flex-col items-center w-full max-w-md p-8 bg-white bg-opacity-80 rounded-3xl shadow-2xl">
                <h1 className="text-4xl font-extrabold text-amber-900 tracking-tight mb-6">
                    ลงทะเบียนผู้ใช้
                </h1>
                <form onSubmit={handleSubmit} className="w-full space-y-6">
                    <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-900">
                            ชื่อ-นามสกุล
                        </label>
                        <input
                            type="text"
                            name="fullName"
                            id="fullName"
                            required
                            value={formData.fullName}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-full border-gray-500 shadow-sm focus:border-amber-500 focus:ring-amber-500 p-3"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                            อีเมล์
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-full border-gray-500 shadow-sm focus:border-amber-500 focus:ring-amber-500 p-3"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                            รหัสผ่าน
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            required
                            value={formData.password}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-full border-gray-500 shadow-sm focus:border-amber-500 focus:ring-amber-500 p-3"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                            เพศ
                        </label>
                        <div className="flex items-center space-x-4">
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="male"
                                    required
                                    checked={formData.gender === "male"}
                                    onChange={handleGenderChange}
                                    className="form-radio h-5 w-5 text-emerald-600 rounded-full"
                                />
                                <span className="ml-2 text-gray-900">ชาย</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="female"
                                    required
                                    checked={formData.gender === "female"}
                                    onChange={handleGenderChange}
                                    className="form-radio h-5 w-5 text-emerald-600 rounded-full"
                                />
                                <span className="ml-2 text-gray-900">หญิง</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="other"
                                    required
                                    checked={formData.gender === "other"}
                                    onChange={handleGenderChange}
                                    className="form-radio h-5 w-5 text-emerald-600 rounded-full"
                                />
                                <span className="ml-2 text-gray-900">อื่น ๆ</span>
                            </label>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 mt-6 text-lg font-semibold text-white bg-amber-600 hover:bg-blue-600 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
                    >
                        ลงทะเบียน
                    </button>
                </form>
                <div className="mt-8 text-sm">
                    <p className="text-gray-900">
                        มีบัญชีอยู่แล้ว?
                        <a href="/login" className="font-semibold text-amber-600 hover:text-sky-700 ml-1">
                            เข้าสู่ระบบที่นี่
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}