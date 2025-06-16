"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export function ThemeToggle() {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	// Avoid hydration mismatch
	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return (
			<button className="p-2 rounded-md transition-colors">
				<div className="w-5 h-5" />
			</button>
		);
	}

	return (
		<Button
			onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
			variant="outline"
			className="p-2 rounded-md"
			aria-label="Toggle theme"
		>
			{theme === "dark" ? (
				<Sun className="w-5 h-5 text-yellow-500" />
			) : (
				<Moon className="w-5 h-5 " />
			)}
		</Button>
	);
}
