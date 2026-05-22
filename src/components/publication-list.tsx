import Link from "next/link";

import { PUBLICATION_HIGHLIGHTS } from "@/lib/publications-highlights";

const ORCID_ID = "0000-0003-2605-9302";
const ONE_WEEK_SECONDS = 60 * 60 * 24 * 7;

type Publication = {
  id: number;
  title: string;
  subtitle: string;
  year: number;
  month: number | null;
  url: string;
};

type WorkSummary = {
  "put-code": number;
  title: { title: { value: string } | null } | null;
  "journal-title": { value: string } | null;
  "publication-date": {
    year: { value: string } | null;
    month: { value: string } | null;
  } | null;
  url: { value: string } | null;
  "external-ids": {
    "external-id": Array<{
      "external-id-type": string;
      "external-id-value": string;
      "external-id-url": { value: string } | null;
    }>;
  } | null;
};

type WorksResponse = { group: Array<{ "work-summary": WorkSummary[] }> };

function toPublication(w: WorkSummary): Publication | null {
  const title = w.title?.title?.value;
  const yearStr = w["publication-date"]?.year?.value;
  if (!title || !yearStr) return null;

  const monthStr = w["publication-date"]?.month?.value;
  const doi = w["external-ids"]?.["external-id"].find(
    (e) => e["external-id-type"] === "doi",
  );
  const url =
    doi?.["external-id-url"]?.value ??
    (doi ? `https://doi.org/${doi["external-id-value"]}` : null) ??
    w.url?.value ??
    "#";

  return {
    id: w["put-code"],
    title,
    subtitle: w["journal-title"]?.value ?? "",
    year: Number(yearStr),
    month: monthStr ? Number(monthStr) : null,
    url,
  };
}

function sortPublications(a: Publication, b: Publication): number {
  if (b.year !== a.year) return b.year - a.year;
  return (b.month ?? 0) - (a.month ?? 0);
}

function groupByYear(pubs: Publication[]): Array<[number, Publication[]]> {
  const map = new Map<number, Publication[]>();
  for (const p of pubs) {
    const list = map.get(p.year) ?? [];
    list.push(p);
    map.set(p.year, list);
  }
  return Array.from(map.entries()).sort((a, b) => b[0] - a[0]);
}

async function fetchPublications(): Promise<Publication[]> {
  try {
    const res = await fetch(`https://pub.orcid.org/v3.0/${ORCID_ID}/works`, {
      headers: { Accept: "application/json" },
      next: { revalidate: ONE_WEEK_SECONDS },
    });
    if (!res.ok) return FALLBACK_PUBLICATIONS;
    const data: WorksResponse = await res.json();
    const pubs = data.group
      .map((g) => g["work-summary"][0])
      .map(toPublication)
      .filter((p): p is Publication => p !== null)
      .sort(sortPublications);
    return pubs.length > 0 ? pubs : FALLBACK_PUBLICATIONS;
  } catch {
    return FALLBACK_PUBLICATIONS;
  }
}

function formatDate({ year, month }: Publication): string {
  if (month === null) return String(year);
  return new Date(year, month - 1).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
  });
}

export default async function PublicationList() {
  const publications = await fetchPublications();
  const groups = groupByYear(publications);

  return (
    <section id="publications" className="py-10 md:py-12">
      <div className="relative pt-5">
        <span aria-hidden="true" className="absolute left-0 top-0 h-0.5 w-16 bg-accent" />
        <h2 className="font-display text-[36px] leading-none text-ink">
          Publications
        </h2>
        <p className="mt-1.5 font-sans text-xs uppercase tracking-[0.16em] text-label">
          {publications.length} papers · open access where possible
        </p>
      </div>

      <div className="mt-6">
        {groups.map(([year, pubs]) => (
          <div key={year}>
            <div className="mt-5 pb-1 border-b border-dashed border-rule font-sans text-[12px] uppercase tracking-[0.18em] text-label first:mt-0">
              {year}
            </div>
            {pubs.map((p) => {
              const note = PUBLICATION_HIGHLIGHTS[p.id];
              return (
                <div
                  key={p.id}
                  className={`grid grid-cols-1 ${
                    note ? "md:grid-cols-[1fr_200px] md:gap-6" : ""
                  } gap-2 py-2.5 border-b border-rule last:border-b-0`}
                >
                  <div>
                    <Link
                      href={p.url}
                      target="_blank"
                      referrerPolicy="no-referrer"
                      className="font-serif font-medium text-[17px] leading-snug text-ink hover:text-accent hover:underline decoration-accent/40"
                    >
                      {p.title}
                    </Link>
                    <div className="font-serif italic text-[14px] text-ink-mute mt-1">
                      {p.subtitle}
                    </div>
                    <div className="mt-1 font-sans text-[11px] tracking-wider text-label">
                      {formatDate(p)} ·{" "}
                      <Link
                        href={p.url}
                        target="_blank"
                        referrerPolicy="no-referrer"
                        className="hover:text-accent"
                      >
                        DOI →
                      </Link>
                    </div>
                  </div>
                  {note ? (
                    <div className="font-display text-[17px] leading-snug text-accent pt-1">
                      {note}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
}

// Snapshot of ORCID works as of 2026-05-22, used if the ORCID API is unreachable.
const FALLBACK_PUBLICATIONS: Publication[] = [
  {
    id: 215138519,
    title:
      "Seasonality and environmental drivers of tick-borne encephalitis virus prevalence in Ixodes ricinus ticks from Southern Norway",
    subtitle: "Ticks and Tick-borne Diseases",
    year: 2026,
    month: 5,
    url: "https://doi.org/10.1016/j.ttbdis.2026.102658",
  },
  {
    id: 211773382,
    title:
      "Seasonal variation in prevalence of Borrelia burgdorferi sensu lato and Neoehrlichia mikurensis in Ixodes ricinus nymphs in southern Norway",
    subtitle: "Acta Veterinaria Scandinavica",
    year: 2026,
    month: 4,
    url: "https://doi.org/10.1186/s13028-026-00860-x",
  },
  {
    id: 186605685,
    title: "First report of the taiga tick Ixodes persulcatus in Norway",
    subtitle: "Ticks and Tick-borne Diseases",
    year: 2025,
    month: 7,
    url: "https://doi.org/10.1016/j.ttbdis.2025.102508",
  },
  {
    id: 185017767,
    title:
      "Making the best of a bad sample: Comparison of DNA extraction and quantification methods using sub-optimally stored Ixodes ricinus ticks",
    subtitle: "PLOS One",
    year: 2025,
    month: 5,
    url: "https://doi.org/10.1371/journal.pone.0323251",
  },
  {
    id: 172611255,
    title:
      "New insights into the molecular phylogeny, biogeographical history, and diversification of Amblyomma ticks (Acari: Ixodidae) based on mitogenomes and nuclear sequences",
    subtitle: "Parasites and Vectors",
    year: 2024,
    month: null,
    url: "https://doi.org/10.1186/s13071-024-06131-w",
  },
  {
    id: 172611256,
    title:
      "New insights into the systematics of the afrotropical Amblyomma marmoreum complex (Acari: Ixodidae) and the genome of a novel Rickettsia africae strain using morphological and metagenomic approaches",
    subtitle: "Ticks and Tick-borne Diseases",
    year: 2024,
    month: null,
    url: "https://doi.org/10.1016/j.ttbdis.2024.102323",
  },
  {
    id: 172611254,
    title:
      "New insights into the systematics of the Afrotropical Amblyomma marmoreum complex (Acari, Ixodidae) and a novel Rickettsia africae strain using morphological and metagenomic approaches",
    subtitle: "bioRxiv",
    year: 2023,
    month: null,
    url: "https://doi.org/10.1101/2023.08.18.553479",
  },
  {
    id: 172611257,
    title:
      "Phylogenetic relationships of the Amblyomma cajennense complex (Acari: Ixodidae) at mitogenomic resolution",
    subtitle: "Ticks and Tick-borne Diseases",
    year: 2023,
    month: null,
    url: "https://doi.org/10.1016/j.ttbdis.2023.102125",
  },
  {
    id: 172611249,
    title: "Phylogeny and origin of diversification of Amblyomma (Acari: Ixodidae)",
    subtitle: "Research Square",
    year: 2023,
    month: null,
    url: "https://doi.org/10.21203/rs.3.rs-3404165/v1",
  },
  {
    id: 172611258,
    title:
      "Molecular detection of Candidatus Rickettsia colombianensi in ticks (Acari, Ixodidae) collected from herpetofauna in San Juan de Carare, Colombia",
    subtitle: "International Journal for Parasitology: Parasites and Wildlife",
    year: 2022,
    month: null,
    url: "https://doi.org/10.1016/j.ijppaw.2022.08.004",
  },
  {
    id: 172611250,
    title:
      "Molecular detection of pathogens in ticks associated with domestic animals from the Colombian Caribbean region",
    subtitle: "Experimental and Applied Acarology",
    year: 2020,
    month: null,
    url: "https://doi.org/10.1007/s10493-020-00531-0",
  },
  {
    id: 172611253,
    title:
      "Molecular detection of Rickettsia spp., Anaplasma platys and Theileria equi in ticks collected from horses in Tayrona National Park, Colombia",
    subtitle: "Experimental and Applied Acarology",
    year: 2019,
    month: null,
    url: "https://doi.org/10.1007/s10493-019-00354-8",
  },
  {
    id: 172611252,
    title:
      "Hemogregarine and Rickettsial infection in ticks of toads from northeastern Colombia",
    subtitle: "International Journal for Parasitology: Parasites and Wildlife",
    year: 2018,
    month: null,
    url: "https://doi.org/10.1016/j.ijppaw.2018.06.003",
  },
  {
    id: 172611251,
    title:
      "Rickettsial infection in ticks (Acari: Ixodidae) from reptiles in the Colombian Caribbean",
    subtitle: "Ticks and Tick-borne Diseases",
    year: 2018,
    month: null,
    url: "https://doi.org/10.1016/j.ttbdis.2018.02.003",
  },
];
