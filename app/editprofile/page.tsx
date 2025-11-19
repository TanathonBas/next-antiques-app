"use client";

import { useEffect, useState, useRef } from "react";

// Interfaces for type safety
interface ProfileData {
    firstName: string;
    lastName: string;
    email: string;
    password?: string; // Password can be optional for profile edits
    gender: string;
    profileImage: File | null;
}

export default function Page() {
    // State for form data
    const [formData, setFormData] = useState<ProfileData>({
        firstName: "",
        lastName: "",
        email: "",
        gender: "ชาย",
        profileImage: null,
    });
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(
        "https://placehold.co/150x150/ffffff/000000?text=Profile"
    );

    // Reference for the file input element
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Handle form input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle image file selection
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            setFormData((prev) => ({ ...prev, profileImage: file }));
            setImagePreviewUrl(URL.createObjectURL(file));
        }
    };

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Profile Data Saved:", formData);
        // Add logic to save data to a database here
    };

    return (
        <div className={`flex min-h-screen items-center justify-center p-6 sm:p-24 transition-colors duration-1000`}>
            <div className="flex flex-col items-center w-full max-w-lg p-8 bg-white bg-opacity-80 rounded-3xl shadow-2xl">
                <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight mb-6">
                    แก้ไขโปรไฟล์
                </h1>
                <form onSubmit={handleSubmit} className="w-full space-y-6">
                    {/* Profile Image and Input */}
                    <div className="flex flex-col items-center space-y-4">
                        <div className="relative w-40 h-40">
                            <img
                                src={imagePreviewUrl || "https://placehold.co/150x150/ffffff/000000?text=Profile"}
                                alt="Profile Preview"
                                className="w-full h-full object-cover rounded-full border-4 border-emerald-400 shadow-md"
                            />
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="absolute bottom-0 right-0 p-2 bg-sky-500 hover:bg-sky-600 text-white rounded-full shadow-lg transition-all duration-300 transform hover:scale-110"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                </svg>
                            </button>
                        </div>
                        <input
                            type="file"
                            name="profileImage"
                            id="profileImage"
                            accept="image/*"
                            onChange={handleImageChange}
                            ref={fileInputRef}
                            className="hidden"
                        />
                    </div>

                    {/* First and Last Name Input */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                                ชื่อ
                            </label>
                            <input
                                type="text"
                                name="firstName"
                                id="firstName"
                                required
                                value={formData.firstName}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-full border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 p-3"
                            />
                        </div>
                        <div>
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                                นามสกุล
                            </label>
                            <input
                                type="text"
                                name="lastName"
                                id="lastName"
                                required
                                value={formData.lastName}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-full border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 p-3"
                            />
                        </div>
                    </div>

                    {/* Email and Password Input */}
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                อีเมล์
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                required
                                value={formData.email}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-full border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 p-3"
                            />
                        </div>
                    </div>

                    {/* Gender Selection */}
                    <div>
                        <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                            เพศ
                        </label>
                        <select
                            name="gender"
                            id="gender"
                            required
                            value={formData.gender}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-full border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 p-3"
                        >
                            <option value="ชาย">ชาย</option>
                            <option value="หญิง">หญิง</option>
                            <option value="ไม่ระบุ">ไม่ระบุ</option>
                        </select>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-between mt-8 space-x-4">
                        <button
                            type="submit"
                            className="flex-1 py-3 text-lg font-semibold text-white bg-emerald-500 hover:bg-emerald-600 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
                        >
                            บันทึก
                        </button>
                        <button
                            type="button"
                            onClick={() => window.location.href = '/dashboard'}
                            className="flex-1 py-3 text-lg font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
                        >
                            ย้อนกลับ
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}