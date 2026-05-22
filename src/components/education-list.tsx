import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const education = [
  {
    id: 1,
    institution: "University of South-Eastern Norway",
    title: "Doctor of Philosophy in Ecology",
    startYear: 2023,
    endYear: 2026,
  },
  {
    id: 2,
    institution: "University of Valencia",
    title:
      "MSc Tropical Parasitic Diseases, Biological and Biomedical Sciences",
    startYear: 2020,
    endYear: 2021,
  },
  {
    id: 3,
    institution: "University of Magdalena",
    title: "Bachelor of Science in Biology",
    startYear: 2013,
    endYear: 2018,
  },
];

export default function EducationList() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Education</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {education.map((item, index) => (
          <div key={item.id}>
            <div className="text-lg font-semibold text-primary">
              {item.institution}
            </div>
            <div className="text-base text-muted-foreground">{item.title}</div>
            <div className="text-sm text-muted-foreground/70">
              {item.startYear} - {item.endYear ?? "Present"}
            </div>
            {index < education.length - 1 && <Separator className="mt-4" />}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
