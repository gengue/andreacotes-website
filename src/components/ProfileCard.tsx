import Image from "next/image";

export default function ProfileCard() {
	return (
		<div className="flex flex-col justify-center items-center px-2">
			<Image
				className="relative rounded-full"
				src="/andrea.jpeg"
				alt="Andrea Cotes Perdomo"
				width={230}
				height={330}
				priority
			/>
			<div className="mt-4 text-primary text-2xl font-bold">
				Andrea Cotes Perdomo
			</div>
			<div className="text-foreground/80 text-lg">PhD Candidate in Ecology</div>
			<div className="text-foreground/80 text-lg">
				University of South-Eastern, Norway
			</div>
		</div>
	);
}
