"use client"; // MUST for context

import { createContext, useContext, useEffect, useState } from "react";


// 1️⃣ create context
const ThemeContext = createContext(null);

// 2️⃣ provider
export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState("light");
    const [user, setuser] = useState('fasfasd')

    useEffect(() => {

        let dat = async () => {
            let data = localStorage.getItem("user")
            console.log('userdta', data)
            setuser(data)
        }
        dat()
    }, [])



    const toggleTheme = () =>
        setTheme((prev) => (prev === "light" ? "dark" : "light"));

    return (
        <ThemeContext.Provider value={{ theme, user, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

// 3️⃣ hook to use context
export const useTheme = () => useContext(ThemeContext);
