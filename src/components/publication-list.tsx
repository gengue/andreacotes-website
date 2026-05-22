import Link from "next/link";

const formatDate = (date: Date) => {
	const config: Intl.DateTimeFormatOptions = {
		year: "numeric",
		month: "short",
		day: "numeric",
	};
	return date.toLocaleDateString("en-GB", config);
};

const publications = [
	{
		id: 293,
		title:
			"New insights into the molecular phylogeny, biogeographical history, and diversification of Amblyomma ticks (Acari: Ixodidae) based on mitogenomes and nuclear sequences",
		subtitle: "Parasites and Vectors",
		date: new Date(2024, 2, 18),
		url: "https://parasitesandvectors.biomedcentral.com/articles/10.1186/s13071-024-06131-w",
	},
	{
		id: 666,
		title:
			"New insights into the systematics of the afrotropical Amblyomma marmoreum complex (Acari: Ixodidae) and the genome of a novel Rickettsia africae strain using morphological and metagenomic approaches",
		subtitle: "Ticks and Tick-borne Diseases",
		date: new Date(2024, 4, 1),
		url: "https://www.sciencedirect.com/science/article/pii/S1877959X24000165",
	},
	{
		id: 1,
		title:
			"Phylogenetic relationships of the Amblyomma cajennense complex (Acari: Ixodidae) at mitogenomic resolution",
		subtitle: "Ticks and Tick-borne Diseases",
		date: new Date(2023, 0, 25),
		url: "https://www.sciencedirect.com/science/article/pii/S1877959X23000079?via%3Dihub",
	},
	{
		id: 2,
		title:
			"Molecular detection of Candidatus Rickettsia colombianensi in ticks (Acari, Ixodidae) collected from herpetofauna in San Juan de Carare, Colombia",
		subtitle: "International journal for parasitology parasites and wildlife",
		date: new Date(2022, 11, 10),
		url: "https://www.sciencedirect.com/science/article/pii/S221322442200075X?via%3Dihub",
	},
	{
		id: 3,
		title:
			"Molecular detection of pathogens in ticks associated with domestic animals from the Colombian Caribbean region",
		subtitle: "Experimental and Applied Acarology",
		date: new Date(2020, 8, 18),
		url: "https://link.springer.com/article/10.1007/s10493-020-00531-0",
	},
	{
		id: 4,
		title:
			"Molecular detection of Rickettsia spp., Anaplasma platys and Theileria equi in ticks collected from horses in Tayrona National Park, Colombia",
		subtitle: "Experimental and Applied Acarology",
		date: new Date(2019, 0, 1),
		url: "https://link.springer.com/article/10.1007/s10493-019-00354-8",
	},
	{
		id: 5,
		title:
			"Hemogregarine and Rickettsial infection in ticks of toads from northeastern Colombia",
		subtitle: "International Journal for Parasitology: Parasites and Wildlife",
		date: new Date(2018, 5, 25),
		url: "https://www.sciencedirect.com/science/article/pii/S2213224418300397",
	},
	{
		id: 6,
		title:
			"Rickettsial infection in ticks (Acari: Ixodidae) from reptiles in the Colombian Caribbean",
		subtitle: "Ticks and Tick-borne Diseases",
		date: new Date(2018, 2, 15),
		url: "https://www.sciencedirect.com/science/article/abs/pii/S1877959X1730208X",
	},
];

export default function PublicationList() {
	return (
		<ul className="divide-y divide-primary-200 flex flex-col">
			{publications.map((publication) => (
				<li
					className="p-4 hover:bg-background/30 transition-all duration-200 hover:shadow-sm"
					key={publication.id}
				>
					<div className="">
						<div className="">
							<Link
								href={publication.url}
								target="_blank"
								referrerPolicy="no-referrer"
								className="text-xl font-medium text-primary hover:underline hover:underline-offset-2"
							>
								{publication.title}
							</Link>
							<p className="text-lg text-foreground/80 mt-1">
								{publication.subtitle}
							</p>
						</div>
						<div className="text-sm text-foreground/50 mt-2">
							{formatDate(publication.date)}
						</div>
					</div>
				</li>
			))}
		</ul>
	);
}
