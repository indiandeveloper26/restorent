"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "../Redux/authslice";

export default function SignupPage() {
    const router = useRouter();
    const dispatch = useDispatch();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [agree, setAgree] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        if (!agree) {
            setMessage("Please accept Terms & Conditions");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("/backend/api/singup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            if (res.status === 409) {
                setMessage("Email already exists");
                return;
            }

            const data = await res.json();

            if (data.userId) {
                localStorage.setItem("id", data.userId);
                dispatch(login({ userdata: data }));
                toast.success("Signup successful!");
                router.push("/");
            } else {
                setMessage("Signup failed");
            }
        } catch {
            setMessage("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-white dark:bg-yellow-400">
            <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 rounded-2xl shadow-xl overflow-hidden bg-yellow-400 dark:bg-white">

                {/* LEFT IMAGE */}
                <div className="hidden md:flex items-center justify-center p-6 bg-yellow-300">
                    <Image
                        src="/img/login.jpg"
                        alt="Signup"
                        width={350}
                        height={350}
                        className="rounded-lg shadow-md"
                    />
                </div>

                {/* RIGHT FORM */}
                <div className="p-8 sm:p-10 bg-white">
                    <h1 className="text-3xl font-bold text-center text-yellow-500 mb-6">
                        Create Account
                    </h1>

                    {message && (
                        <p className="text-center text-sm text-red-500 mb-4">
                            {message}
                        </p>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            placeholder="Name"
                            required
                            value={form.name}
                            onChange={(e) =>
                                setForm({ ...form, name: e.target.value })
                            }
                            className="w-full px-4 py-3 rounded-lg border border-yellow-400 focus:ring-2 focus:ring-yellow-400 outline-none"
                        />

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

                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                required
                                value={form.password}
                                onChange={(e) =>
                                    setForm({ ...form, password: e.target.value })
                                }
                                className="w-full px-4 py-3 rounded-lg border border-yellow-400 focus:ring-2 focus:ring-yellow-400 outline-none"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-yellow-500 text-sm"
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>

                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={agree}
                                onChange={() => setAgree(!agree)}
                                className="accent-yellow-400"
                            />
                            <span className="text-sm">
                                I agree to{" "}
                                <Link href="/terms" className="text-yellow-500 font-semibold">
                                    Terms & Conditions
                                </Link>
                            </span>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-3 rounded-lg font-semibold transition ${loading
                                ? "bg-yellow-300"
                                : "bg-yellow-400 hover:bg-yellow-500"
                                }`}
                        >
                            {loading ? "Signing up..." : "Sign Up"}
                        </button>
                    </form>

                    <p className="text-center text-sm mt-4">
                        Already have an account?{" "}
                        <Link href="/login" className="text-yellow-500 font-semibold">
                            Login
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
