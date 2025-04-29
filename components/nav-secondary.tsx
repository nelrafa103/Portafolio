"use client";

import type { Icon } from "@tabler/icons-react";
import { IconSearch, IconSettings } from "@tabler/icons-react";
import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useTranslations } from "next-intl";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "./ui/dialog";
import { Hits, SearchBox } from "react-instantsearch";
import { Hit } from "@/app/(core)/components/Menus/Navbar/Menu";
import { Sidebar } from "lucide-react";
import { RedirectToUserProfile, UserProfile } from "@clerk/clerk-react";
import { useState } from "react";
import MenuStore from "@/app/(admin)/stores/Menu";
import { Button } from "./ui/button";

export function NavSecondary({
	items,
	...props
}: {
	items: {
		title: string;
		url: string;
		icon: Icon;
	}[];
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
	const t = useTranslations("sidebar.secondary.items");
	const secondaryItems = ["settings", "search"];
	const { setOpen, isOpen } = MenuStore();
	const icons = {
		SearchIcon: <IconSearch />,
		SettingsIcon: <IconSettings />,
	};
	return (
		<SidebarGroup {...props}>
			<SidebarGroupContent>
				<SidebarMenu>
					{secondaryItems.map((item) => (
						<SidebarMenuItem key={t(`${item}.title`)}>
							{t(`${item}.icon`) === "SearchIcon" ? (
								<Dialog>
									<SidebarMenuButton onClick={() => {}} asChild>
										<DialogTrigger asChild>
											<SidebarMenuButton>
												{icons[t(`${item}.icon`) as keyof typeof icons]}
												<span>{t(`${item}.title`)}</span>
											</SidebarMenuButton>
										</DialogTrigger>
									</SidebarMenuButton>

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
													root: "dark:!bg-[#0a0a0a] ",
													list: "dark:!bg-[#0a0a0a] !space-y-2",
													item: "dark:!bg-[#0a0a0a] dark:border",
												}}
											/>
										</div>
									</DialogContent>
								</Dialog>
							) : (
								<Dialog>
									<DialogTrigger asChild>
										<SidebarMenuButton onClick={() => setOpen(true)}>
											{icons[t(`${item}.icon`) as keyof typeof icons]}
											<span>{t(`${item}.title`)}</span>

											<DialogContent className="min-w-[80%] flex items-center justify-center">
												<DialogTitle />
												<UserProfile
													appearance={{
														elements: {
															rootBox: "!shadow-none !w-full",
															card: "!shadow-none",
															cardBox: "!shadow-none !w-full",
														},
													}}
												/>
											</DialogContent>
										</SidebarMenuButton>
									</DialogTrigger>
								</Dialog>
							)}
						</SidebarMenuItem>
					))}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	);
}
