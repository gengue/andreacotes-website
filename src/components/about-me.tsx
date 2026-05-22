export default function AboutMe() {
	return (
		<div className="relative basis-1/2">
			<h1 className="text-3xl text-center my-4 font-bold">About me</h1>

			<div className="space-y-4">
				<div>
					<p className="leading-relaxed">
						I&apos;m Andrea, a Colombian biologist currently based in Norway. My
						research focuses on analyzing the relationship between pathogenic
						microorganisms transmitted by ticks and seasonal variation to
						understand potential outcomes under climate change influence.
					</p>
				</div>

				<div>
					<h3 className="text-lg font-semibold mb-2">Background & Expertise</h3>
					<p className="leading-relaxed">
						My work began with tick-borne diseases in Colombia, studying ticks
						from reptiles, amphibians, cattle, and poultry. I continue
						researching the systematics of the Amblyomma genus and their
						associated bacteria, with broad interests in the evolution and
						ecology of ectoparasites and vector-borne pathogens.
					</p>
				</div>
			</div>
		</div>
	);
}
