"use client";

import { useState } from "react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-yellow-400 shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo */}
                    <div className="text-2xl font-bold">🍕 My Pizza</div>

                    {/* Desktop Menu */}
                    <ul className="hidden md:flex space-x-6 font-semibold">
                        <li className="hover:text-gray-800 cursor-pointer">listiem</li>
                        <li className="hover:text-gray-800 cursor-pointer">Menu</li>
                        <li className="hover:text-gray-800 cursor-pointer">Order</li>
                        <li className="hover:text-gray-800 cursor-pointer">Booking</li>
                        <li className="hover:text-gray-800 cursor-pointer">Contact</li>
                    </ul>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="focus:outline-none text-black"
                        >
                            {isOpen ? "✖️" : "☰"}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <ul className="md:hidden bg-yellow-300 px-4 py-2 space-y-2 font-semibold">
                    <li className="hover:text-gray-800 cursor-pointer">Home</li>
                    <li className="hover:text-gray-800 cursor-pointer">Menu</li>
                    <li className="hover:text-gray-800 cursor-pointer">Order</li>
                    <li className="hover:text-gray-800 cursor-pointer">Booking</li>
                    <li className="hover:text-gray-800 cursor-pointer">Contact</li>
                </ul>
            )}
        </nav>
    );
}
