import { Badge } from "@/components/ui/badge";

const interests = [
  "Parasitology",
  "Ticks and Tick-borne Diseases",
  "Molecular biology",
  "I love dogs 🐶",
  "Yoga",
];

export default function InterestList() {
  return (
    <div className="w-full">
      <h3 className="text-xl">Interests</h3>
      <div className="mt-3 flex flex-wrap gap-2">
        {interests.map((interest) => (
          <Badge key={interest} variant="secondary" className="text-sm">
            {interest}
          </Badge>
        ))}
      </div>
    </div>
  );
}
