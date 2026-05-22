import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutMe() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl text-center">About me</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="leading-relaxed">
          I&apos;m Andrea, a Colombian biologist currently based in Norway. My
          research focuses on analyzing the relationship between pathogenic
          microorganisms transmitted by ticks and seasonal variation to
          understand potential outcomes under climate change influence.
        </p>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Background & Expertise</h3>
          <p className="leading-relaxed">
            My work began with tick-borne diseases in Colombia, studying ticks
            from reptiles, amphibians, cattle, and poultry. I continue
            researching the systematics of the Amblyomma genus and their
            associated bacteria, with broad interests in the evolution and
            ectoparasites and vector-borne pathogens.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
