"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { login } from "../Redux/authslice";
import { toast } from "react-toastify";


export default function LoginPage() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const router = useRouter();


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const res = await fetch("backend/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            console.log('data', data)

            if (data.login === "true") {
                localStorage.setItem("id", data.user._id);
                dispatch(login({ userdata: data.user }));
                toast.success("Login successful!");
                // router.push("/products");
            } else {
                setMessage("Invalid credentials");
            }
        } catch {
            setMessage("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className={`min-h-screen flex items-center justify-center px-4  "bg-yellow-400" : "bg-white"
                }`}
        >
            <div
                className={`w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 rounded-2xl shadow-xl overflow-hidden  "bg-white"  "bg-yellow-400"
                    }`}
            >
                {/* LEFT */}
                <div className="hidden md:flex items-center justify-center bg-yellow-300 p-6">
                    <Image
                        src="/img/login.jpg"
                        alt="login"
                        width={350}
                        height={350}
                        className="rounded-lg shadow-md"
                    />
                </div>

                {/* RIGHT */}
                <div className="p-8 sm:p-10 bg-white">
                    <h1 className="text-3xl font-bold text-center text-yellow-500 mb-6">
                        Welcome Back
                    </h1>

                    {message && (
                        <p className="text-center text-red-500 mb-4 text-sm">
                            {message}
                        </p>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="email"
                            placeholder="Email"
                            required
                            value={form.email}
                            onChange={(e) =>
                                setForm({ ...form, email: e.target.value })
                            }
                            className="w-full px-4 py-3 rounded-lg border border-yellow-400 focus:ring-2 focus:ring-yellow-400 outline-none"
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            required
                            value={form.password}
                            onChange={(e) =>
                                setForm({ ...form, password: e.target.value })
                            }
                            className="w-full px-4 py-3 rounded-lg border border-yellow-400 focus:ring-2 focus:ring-yellow-400 outline-none"
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-3 rounded-lg font-semibold transition ${loading
                                ? "bg-yellow-300"
                                : "bg-yellow-400 hover:bg-yellow-500"
                                }`}
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </form>

                    <p className="text-center text-sm mt-4">
                        Don&apos;t have an account?{" "}
                        <Link href="/signup" className="text-yellow-500 font-semibold">
                            Sign Up
                        </Link>
                    </p>

                    <p className="text-center text-xs mt-6 text-yellow-500">
                        © 2026 YourShop
                    </p>
                </div>
            </div>
        </div>
    );
}
