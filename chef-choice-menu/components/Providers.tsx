"use client";

import GlobalProgressBar from "@/components/GlobalProgressBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";

export default function Providers() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <>
            <GlobalProgressBar />
            <ToastContainer position="top-right" autoClose={3000} />
        </>
    );
}
