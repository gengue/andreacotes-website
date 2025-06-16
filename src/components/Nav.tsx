"use client";
import { useState } from "react";
import { Dialog, Popover } from "@headlessui/react";
import { GrClose as CloseIcon } from "react-icons/gr";
import { HiMenu as MenuIcon } from "react-icons/hi";
import { Caveat } from "next/font/google";
import { ThemeToggle } from "./ThemeToggle";

const caveat = Caveat({
	weight: ["600"],
	style: ["normal"],
	subsets: ["latin"],
});

const sections = [
	{
		id: "about",
		name: "About me",
	},
	{
		id: "publications",
		name: "Publications",
	},
	{
		id: "contact",
		name: "Contact",
	},
];

export default function Header() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	return (
		<header>
			<nav
				className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8 text-primary"
				aria-label="Global"
			>
				<div className="flex lg:flex-1">
					<a href="#about " className={`${caveat.className} -m-1.5 p-1.5`}>
						<span className="text-4xl text-bold">Andrea Cotes</span>
					</a>
				</div>
				<div className="flex lg:hidden items-center gap-2">
					<ThemeToggle />
					<button
						type="button"
						className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-slate-700 dark:text-slate-300"
						onClick={() => setMobileMenuOpen(true)}
					>
						<span className="sr-only">Open main menu</span>
						<MenuIcon className="h-6 w-6" aria-hidden="true" />
					</button>
				</div>
				<div className="hidden lg:flex lg:items-center lg:gap-x-8">
					<Popover.Group className="flex lg:gap-x-12">
						{sections.map((section) => (
							<a
								key={section.id}
								href={`#${section.id}`}
								className="text-sm font-semibold leading-6 hover:text-primary transition-colors"
							>
								{section.name}
							</a>
						))}
					</Popover.Group>
					<ThemeToggle />
				</div>
			</nav>
			<Dialog
				as="div"
				className="lg:hidden"
				open={mobileMenuOpen}
				onClose={setMobileMenuOpen}
			>
				<div className="fixed inset-0 z-10" />
				<Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-background px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 dark:sm:ring-gray-100/10">
					<div className="flex items-center justify-between">
						<a href="#" className="-m-1.5 p-1.5">
							<span className="text-xl text-primary">Andrea Cotes</span>
						</a>
						<button
							type="button"
							className="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-gray-300"
							onClick={() => setMobileMenuOpen(false)}
						>
							<span className="sr-only">Close menu</span>
							<CloseIcon className="h-6 w-6" aria-hidden="true" />
						</button>
					</div>
					<div className="mt-6 flow-root">
						<div className="-my-6 divide-y divide-gray-500/10 dark:divide-gray-400/10">
							<div className="space-y-2 py-6">
								{sections.map((section) => (
									<a
										key={section.id}
										href={`#${section.id}`}
										className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
										onClick={() => setMobileMenuOpen(false)}
									>
										{section.name}
									</a>
								))}
							</div>
						</div>
					</div>
				</Dialog.Panel>
			</Dialog>
		</header>
	);
}
