const education = [
	{
		id: 1,
		institution: "University of South-Eastern Norway",
		title: "Doctor of Philosophy in Ecology",
		startYear: 2023,
		endYear: null,
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
		<div className="w-full">
			<h3 className="text-xl">Education</h3>
			<ul className="my-2 mx-2">
				{education.map((item) => (
					<li key={item.id} className="my-4 flex">
						<div className="flex-grow">
							<div className="text-primary text-lg font-semibold">
								{item.institution}
							</div>
							<div className="text-foreground/80 text-base">{item.title}</div>
							<div className="text-foreground/50 text-sm">
								{item.startYear} - {item.endYear ? item.endYear : "Present"}
							</div>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}
