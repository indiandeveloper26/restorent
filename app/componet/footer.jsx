"use client";

import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-yellow-400 text-black mt-16 border-t-4 border-yellow-500">
            <div className="container mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

                {/* Brand */}
                <div>
                    <h2 className="text-2xl font-bold mb-3">My Pizza</h2>
                    <p className="text-sm leading-relaxed">
                        Delicious pizzas, fast delivery, and best service in town.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/" className="hover:underline">Home</Link></li>
                        <li><Link href="/menu" className="hover:underline">Menu</Link></li>
                        <li><Link href="/order" className="hover:underline">Order</Link></li>
                        <li><Link href="/booking" className="hover:underline">Booking</Link></li>
                    </ul>
                </div>

                {/* Customer Support */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">Customer Support</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/about" className="hover:underline">About Us</Link></li>
                        <li><Link href="/contact" className="hover:underline">Contact Us</Link></li>
                        <li><Link href="/privacy" className="hover:underline">Privacy Policy</Link></li>
                        <li><Link href="/terms" className="hover:underline">Terms & Conditions</Link></li>
                    </ul>
                </div>

                {/* Social + Contact */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">Connect With Us</h3>

                    <div className="flex gap-3 mb-4">
                        <a href="#" className="p-2 border-2 border-black rounded-full hover:bg-black hover:text-yellow-400 transition">
                            <FaFacebookF />
                        </a>
                        <a href="#" className="p-2 border-2 border-black rounded-full hover:bg-black hover:text-yellow-400 transition">
                            <FaInstagram />
                        </a>
                        <a href="#" className="p-2 border-2 border-black rounded-full hover:bg-black hover:text-yellow-400 transition">
                            <FaTwitter />
                        </a>
                        <a href="#" className="p-2 border-2 border-black rounded-full hover:bg-black hover:text-yellow-400 transition">
                            <FaWhatsapp />
                        </a>
                    </div>

                    <p className="text-sm">
                        📞 +91 98765 43210 <br />
                        ✉ support@mypizza.com
                    </p>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="bg-yellow-500 text-center py-4 text-sm border-t border-black/20">
                © {new Date().getFullYear()} My Pizza. All rights reserved.
            </div>
        </footer>
    );
}
