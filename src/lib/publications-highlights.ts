/**
 * Margin notes shown next to selected publications.
 * Keyed by ORCID `put-code` (numeric). Add or remove entries to surface notes.
 *
 * Glyph conventions used in the spec — feel free to mix:
 *   ←  ↙  ↗   point at the citation
 *   ★          flag of pride
 */
export const PUBLICATION_HIGHLIGHTS: Record<number, string> = {
  // "Seasonality and environmental drivers of TBEV..." (2026)
  215138519: "← the thesis chapter, basically",
  // "First report of the taiga tick Ixodes persulcatus in Norway" (2025)
  186605685: "★ first sighting in Norway",
  // "Molecular detection of Candidatus Rickettsia colombianensi..." (2022)
  172611258: "↙ named for home",
};
