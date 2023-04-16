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
      <div className="mt-4 text-emerald-400 text-2xl">Andrea Cotes Perdomo</div>
      <div className="text-slate-400 text-lg">PhD Candidate in Ecology</div>
      <div className="text-slate-400 text-lg">
        University of South-Eastern, Norway
      </div>
    </div>
  );
}
