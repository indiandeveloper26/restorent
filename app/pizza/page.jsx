"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/producttahnk";
import { setUser } from "../redux/slice"

export default function ProductsClient() {
    const router = useRouter();


    const [filtered, setFiltered] = useState([]);
    const [search, setSearch] = useState("");


    // Get restaurantId from localStorage



    // Fetch products from backend API
    const { products, loading, error } = useSelector((state) => state.products);

    let dispatch = useDispatch()

    console.log('itemlistdata', products)

    useEffect(() => {
        const userData = localStorage.getItem("user");
        console.log('data', userData);

        if (userData) {
            const parsed = JSON.parse(userData);

            const restaurantId = parsed.userdata._id;

            // 1️⃣ Save user info in Redux
            dispatch(setUser(products));

            // 2️⃣ Fetch products for this restaurant
            dispatch(fetchProducts(restaurantId));
        }
    }, [dispatch]);

    // Filter products based on search
    useEffect(() => {
        if (!search) return setFiltered(products);

        setFiltered(
            products.filter(
                (p) =>
                    p.name.toLowerCase().includes(search.toLowerCase()) ||
                    (p.category && p.category.toLowerCase().includes(search.toLowerCase()))
            )
        );
    }, [search, products]);

    if (loading) return <h1 className="text-center py-16">Loading products...</h1>;
    if (!loading && products.length === 0)
        return <p className="text-center py-16 text-gray-500 text-lg">No products available.</p>;

    return (
        <section className="bg-gray-50 min-h-screen font-sans py-12">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold mb-6 text-center text-yellow-500">Our Products</h1>

                {/* Search */}
                <div className="flex justify-center mb-8">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search products..."
                        className="w-full max-w-md px-4 py-2 border border-yellow-400 rounded-lg shadow-sm
                       focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400
                       bg-white text-gray-900 placeholder-gray-400 transition"
                    />
                </div>

                {/* PRODUCTS GRID */}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
                    {filtered.length > 0 ? (
                        filtered.map((product) => (
                            <div
                                key={product._id}
                                onClick={() => router.push(`/pizza/${product.slug}`)}
                                className="bg-white border border-yellow-400 rounded-lg shadow-md
                           hover:shadow-xl transform hover:scale-105 transition-all duration-300
                           cursor-pointer flex flex-col overflow-hidden"
                            >
                                {/* Image */}
                                <div className="h-48 w-full overflow-hidden relative">
                                    <img
                                        src={product.images?.[0] || "/placeholder.png"}
                                        alt={product.name}
                                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                                    />
                                </div>

                                {/* Details */}
                                <div className="p-4 flex flex-col flex-grow">
                                    <h2 className="text-lg font-semibold text-gray-900 truncate">{product.name}</h2>
                                    <p className="text-sm text-gray-500 mt-1 capitalize">{product.category}</p>

                                    {/* Price */}
                                    <div className="mt-2">
                                        {product.discountPrice ? (
                                            <div className="flex items-center gap-2">
                                                <span className="text-yellow-500 font-bold text-lg">₹{product.discountPrice}</span>
                                                <span className="line-through text-gray-400 text-sm">₹{product.price}</span>
                                            </div>
                                        ) : (
                                            <span className="text-yellow-500 font-bold text-lg">₹{product.price}</span>
                                        )}
                                    </div>

                                    {/* Button */}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            router.push(`/pizza/${product.slug}`);
                                        }}
                                        className="mt-4 w-full bg-yellow-500 text-white py-2 rounded-lg
                               hover:bg-yellow-600 transition font-medium text-sm sm:text-base"
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="col-span-2 text-center text-gray-500 text-lg">No products match your search.</p>
                    )}
                </div>
            </div>
        </section>
    );
}
