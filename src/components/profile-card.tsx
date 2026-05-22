import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

export default function ProfileCard() {
  return (
    <Card className="border-0 bg-transparent shadow-none">
      <CardContent className="flex flex-col items-center px-2">
        <Avatar className="size-[230px]">
          <AvatarImage
            src="/andrea.jpeg"
            alt="Andrea Cotes Perdomo"
            className="object-cover"
          />
          <AvatarFallback>AC</AvatarFallback>
        </Avatar>
        <div className="mt-4 text-2xl font-bold text-primary">
          Andrea Cotes Perdomo
        </div>
        <div className="text-lg text-muted-foreground">
          PhD in Ecology
        </div>
        <div className="text-lg text-muted-foreground">
          University of South-Eastern, Norway
        </div>
      </CardContent>
    </Card>
  );
}
