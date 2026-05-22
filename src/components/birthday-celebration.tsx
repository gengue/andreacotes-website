"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Confetti from "react-confetti";

function isTodayBirthday() {
	const today = new Date();
	return today.getMonth() === 5 && today.getDate() === 19;
}

function subscribe() {
	return () => {};
}

const BirthdayCelebration = () => {
	const isClientBirthday = useSyncExternalStore(
		subscribe,
		isTodayBirthday,
		() => false,
	);
	const [dismissed, setDismissed] = useState(false);

	useEffect(() => {
		if (!isClientBirthday) return;
		const timer = setTimeout(() => setDismissed(true), 16 * 1000);
		return () => clearTimeout(timer);
	}, [isClientBirthday]);

	if (!isClientBirthday || dismissed) {
		return null;
	}

	return (
		<div className="fixed inset-0 z-50 pointer-events-none">
			<div className="absolute inset-0 bg-black/50" />
			<div className="absolute inset-0 flex items-center justify-center p-4">
				<h1
					className="text-5xl md:text-9xl font-bold text-pink-500 animate-bounce text-center"
					style={{ WebkitTextStroke: "2px white" }}
				>
					Happy Birthday!
				</h1>
			</div>
			<Confetti
				numberOfPieces={400}
				width={typeof window !== "undefined" ? window.innerWidth : 0}
				height={typeof window !== "undefined" ? window.innerHeight : 0}
			/>
			<audio src="/happy_birthday.mp3" preload="auto" autoPlay />
		</div>
	);
};

export default BirthdayCelebration;
