"use client";

import { useProgressStore } from "@/stores/progressStore";
import { useEffect, useState } from "react";

export default function GlobalProgressBar() {
    const isLoading = useProgressStore((state) => state.isLoading);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isLoading) {
            setProgress(0);
            interval = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 90) return prev;
                    // Slow down as it gets higher
                    const increment = Math.max(1, (90 - prev) / 10);
                    return prev + increment;
                });
            }, 200);
        } else {
            setProgress(100);
            const timeout = setTimeout(() => {
                setProgress(0);
            }, 500);
            return () => clearTimeout(timeout);
        }

        return () => clearInterval(interval);
    }, [isLoading]);

    if (progress === 0 && !isLoading) return null;

    return (
        <div className="fixed top-0 left-0 right-0 z-[9999] h-1 bg-transparent pointer-events-none">
            <div
                className="h-full bg-primary-600 transition-all duration-300 ease-out shadow-[0_0_10px_rgba(234,88,12,0.5)]"
                style={{ width: `${progress}%` }}
            />
        </div>
    );
}
