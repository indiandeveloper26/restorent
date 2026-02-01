"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/producttahnk";

export default function page() {

  const [restaurantId, setRestaurantId] = useState("");
  const { products, error } = useSelector((state) => state.products);

  let dispatch = useDispatch()

  console.log('itemlistdata', products)

  useEffect(() => {
    // Restaurant ID localStorage से ले रहे हैं
    const userData = localStorage.getItem("user");
    console.log('data', userData)
    if (userData) {
      const restaurantId = JSON.parse(userData).userdata._id;
      dispatch(fetchProducts(restaurantId)); // ✅ यह thunk run होगा
    }
  }, [dispatch]);




  useEffect(() => {
    const getData = async () => {
      let data = localStorage.getItem("user");
      if (data) {
        try {
          const parsed = JSON.parse(data);          // parse karo
          setRestaurantId(parsed.userdata._id);    // _id set karo
        } catch (err) {
          console.error("Failed to parse user data", err);
        }
      }
    };
    getData();
  }, []);


  console.log('idd', restaurantId)

  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    price: "",
    discountPrice: "",
    category: "",
    isVeg: true,
  });

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFiles = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!restaurantId) {
      toast.error("Restaurant ID missing!");
      setLoading(false);
      return;
    }

    try {
      const data = new FormData();
      // Append all fields
      Object.entries(form).forEach(([key, val]) => {
        // Convert numbers to string if needed
        if (key === "price" || key === "discountPrice") val = val.toString();
        data.append(key, val);
      });
      // Append restaurant ID
      data.append("restaurant", restaurantId);

      // Append images
      images.forEach((img) => data.append("images", img));

      const res = await fetch("/backend/menu/add", {
        method: "POST",
        body: data,
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to add item");
      }

      toast.success("Menu item added 🍽️");

    } catch (err) {
      console.error(err);
      toast.error(err.message || "Error adding item");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full p-3 rounded-lg border border-yellow-400 focus:ring-2 focus:ring-yellow-400 outline-none bg-white";

  return (
    <section className="min-h-screen py-10 bg-white">
      <div className="max-w-xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-yellow-500 mb-8">
          Add Restaurant Item
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-white p-6 rounded-xl shadow-lg"
        >
          <input
            name="name"
            placeholder="Item Name"
            onChange={handleChange}
            required
            className={inputClass}
          />

          <input
            name="slug"
            placeholder="Slug"
            onChange={handleChange}
            required
            className={inputClass}
          />

          <textarea
            name="description"
            placeholder="Description"
            onChange={handleChange}
            className={inputClass}
            rows={3}
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            onChange={handleChange}
            required
            className={inputClass}
          />

          <input
            type="number"
            name="discountPrice"
            placeholder="Discount Price"
            onChange={handleChange}
            className={inputClass}
          />

          <input
            name="category"
            placeholder="Category (Veg / Non-Veg / Drinks)"
            onChange={handleChange}
            required
            className={inputClass}
          />

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="isVeg"
              checked={form.isVeg}
              onChange={handleChange}
              className="accent-yellow-400"
            />
            Veg Item
          </label>

          <input
            type="file"
            multiple
            onChange={handleFiles}
            className={inputClass}
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold ${loading
              ? "bg-yellow-300"
              : "bg-yellow-400 hover:bg-yellow-500"
              }`}
          >
            {loading ? "Adding..." : "Add Item"}
          </button>
        </form>
      </div>
    </section>
  );
}
