"use client";

import {
	Dialog,
	DialogHeader,
	DialogTrigger,
	DialogContent,
	DialogTitle,
} from "@/components/ui/dialog";
import { Command } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchBox, Hits } from "react-instantsearch";
import { Hit } from "../Menus/Navbar/Menu";
import { useState } from "react";
import { useCommandMenuToggle } from "../../lib/open-menu";

export default function SearchDialog() {
	const [isOpen, setIsOpen] = useState(false);

	useCommandMenuToggle(() => setIsOpen((prev) => !prev));
	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button variant="outline" size="sm">
					<Command />
					<p className="text-gray-500">K</p>
				</Button>
			</DialogTrigger>

			<DialogContent className="min-w-[50%] min-h-[50%]">
				<DialogTitle>
					<img
						src="/SVG/Algolia-mark-blue.svg"
						className="dark:hidden w-4 h-4"
						alt="Algolia blue logo"
					/>
					<img
						src="/SVG/Algolia-mark-white.svg"
						className="hidden w-4 h-4 dark:block"
						alt="Algolia blue logo"
					/>
				</DialogTitle>
				<DialogHeader className="flex flex-row items-center">
					<p className="text-gray-500">Powered by:</p>
					<img
						src="/SVG/Algolia-logo-blue.svg"
						className="dark:hidden w-20 h-8"
						alt="Algolia blue logo"
					/>
					<img
						src="/SVG/Algolia-logo-white.svg"
						className="hidden w-20 h-8 dark:block"
						alt="Algolia blue logo"
					/>
				</DialogHeader>

				<div className="grid gap-4 py-4">
					<SearchBox
						classNames={{
							form: "dark:!bg-[#171717] !rounded-lg",
							root: "!rounded-lg dark:!bg-[#171717] w-full",
							input: "dark:!bg-[#171717] !rounded-lg",
						}}
					/>

					<Hits
						hitComponent={Hit}
						classNames={{
							root: "dark:!bg-[#0a0a0a] max-h-[60vh] overflow-y-auto",
							list: "dark:!bg-[#0a0a0a] !space-y-2",
							item: "dark:!bg-[#0a0a0a] dark:border",
						}}
					/>
				</div>
			</DialogContent>
		</Dialog>
	);
}
