"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "../Items/ToogleTheme";
import { Menu, X, Gauge } from "lucide-react";

import Link from "next/link";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { icons } from "@/app/(core)/lib/icons";
import { Authenticated, AuthLoading, Unauthenticated } from "convex/react";
import { UserButton } from "@clerk/clerk-react";
import Flutter from "../../Icons/Flutter";
import Dart from "../../Icons/Dart";
import TypeScript from "../../Icons/Typescript";
import Rust from "../../Icons/Rust";
import React from "../../Icons/React";
import Angular from "../../Icons/Angular";
import { useQuery as useTanQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import SearchDialog from "../../Dialogs/Search";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function Hit({ hit }: { hit: any }) {
	const t = useTranslations("navbar.search");
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const icons: { [key: string]: any } = {
		flutter: <Flutter className="h-4 w-4" />,
		dart: <Dart className="h-4 w-4" />,
		typescript: <TypeScript className="h-4 w-4" />,
		rust: <Rust className="h-4 w-4" />,
		react: <React className="h-4 w-4" />,
		angular: <Angular className="h-4 w-4" />,
	};

	const { data, error, isLoading, isFetched } = useTanQuery({
		queryKey: [hit.name],
		queryFn: () =>
			fetch("/api/translate", {
				method: "POST",
				body: JSON.stringify({
					contents: [hit.description],
				}),
			}).then((res) => res.json()),
	});

	return (
		<article className="flex flex-row items-center gap-2">
			<a href={hit.html_url} className="dark:bg-[#0a0a0a]">
				<div className="flex flex-col gap-2 dark:bg-[#0a0a0a]">
					<h1>{hit.name}</h1>
					{!isFetched ? (
						<div className="space-y-2">
							<Skeleton className="h-4 w-[250px]" />
							<Skeleton className="h-4 w-[200px]" />
						</div>
					) : (
						<p>
							{data.data[0].translations[0].translatedText !== "null"
								? data.data[0].translations[0].translatedText
								: ""}
						</p>
					)}
					<div className="flex flex-row gap-2 mt-2 items-center">
						{hit.topics.map((topic: string) => (
							<div key={topic}>{icons[topic]}</div>
						))}
					</div>
				</div>
			</a>
		</article>
	);
}

export default function NavbarMenu() {
	const [menuState, setMenuState] = useState(false);
	const items = useTranslations("navbar.items");
	const social = useTranslations("navbar.social");
	const itemsKeys = ["home", "about", "contact", "projects"];
	const socialKeys = ["github", "linkedin"];
	const router = useRouter();

	return (
		<header>
			<nav
				data-state={menuState && "active"}
				className="fixed z-20 w-full border-b border-dashed bg-white backdrop-blur md:relative dark:bg-zinc-950/50 lg:dark:bg-transparent"
			>
				<div className="m-auto  px-6">
					<div className="flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
						<div className="flex w-full justify-between lg:w-auto">
							<Link
								href="/"
								aria-label="home"
								className="flex items-center space-x-2"
							/>

							<button
								type="button"
								onClick={() => setMenuState(!menuState)}
								aria-label={menuState === true ? "Close Menu" : "Open Menu"}
								className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
							>
								<Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
								<X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
							</button>
						</div>

						<div className="bg-background in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
							<div className="lg:pr-4">
								<ul className="space-y-6 text-base lg:flex lg:gap-8 lg:space-y-0 lg:text-sm">
									{itemsKeys.map((key) => (
										<li key={key}>
											<Link
												href={items(`${key}.url`)}
												className="text-muted-foreground hover:text-accent-foreground block duration-150"
											>
												<span>{items(`${key}.title`)}</span>
											</Link>
										</li>
									))}
								</ul>
							</div>

							<div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit lg:border-l lg:pl-6">
								<Unauthenticated>
									<SearchDialog />
									{socialKeys.map((key) => (
										<ul key={key}>
											{key === "github" ? (
												<Button
													size="sm"
													className="w-full md:!w-auto"
													onClick={() => router.push(social(`${key}.url`))}
												>
													{
														icons[
															social(`${key}.icon`) as "Github" | "LinkedIn"
														]
													}
													<Link href="#">
														<span>{social(`${key}.title`)}</span>
													</Link>
												</Button>
											) : (
												<Button
													variant="outline"
													size="sm"
													className="w-full md:!w-auto"
													onClick={() => router.push(social(`${key}.url`))}
												>
													{
														icons[
															social(`${key}.icon`) as "Github" | "LinkedIn"
														]
													}
													<Link href="#">
														<span>{social(`${key}.title`)}</span>
													</Link>
												</Button>
											)}
										</ul>
									))}

									<ModeToggle />
								</Unauthenticated>
								<AuthLoading>
									<div>
										<svg
											aria-hidden="true"
											className="w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-neutral-600"
											viewBox="0 0 100 101"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
												fill="currentColor"
											/>
											<path
												d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
												fill="currentFill"
											/>
										</svg>
										<span className="sr-only">Loading...</span>
									</div>
								</AuthLoading>
								<Authenticated>
									<SearchDialog />
									<Button size="sm" onClick={() => router.push("/dashboard")}>
										<Gauge />
										<Link href="/dashboard">
											<span>Dashboard</span>
										</Link>
									</Button>
									<UserButton
										appearance={{
											elements: {
												userButtonPopoverFooter: "dark:!bg-none",
												userButtonPopoverActionButton:
													"dark:!text-[#e4e4e7] dark:!bg-[#18181b]",
												userButtonPopoverMain:
													"dark:!bg-[#18181b] dark:!text-[#e4e4e7] dark:!shadow-lg dark:!shadow-[#18181b] dark:!border-[##71717b] dark:!border ",
												userButtonPopoverActions:
													"dark:!bg-[#18181b] dark:!text-[#e4e4e7]",
												userButtonPopoverCard: "dark:!bg-[#18181b]",
											},
										}}
									/>
								</Authenticated>
							</div>
						</div>
					</div>
				</div>
			</nav>
		</header>
	);
}
