"use client";
import { Button } from "@/components/ui/button";
import {
	ArrowRight,
	Ban,
	CircleCheck,
	CircleX,
	Cookie,
	Database,
	Mail,
	SendHorizonal,
} from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AnimatePresence } from "motion/react";

import { useTranslations } from "next-intl";
import { icons, type IconType } from "@/app/(core)/lib/icons";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import CookiesStore, {
	type CookiesStoreType,
} from "@/app/(core)/stores/cookies";
import AnimatedContent from "../../Animations/AnimatedContent";
const menuItems = [
	{ name: "Features", href: "#" },
	{ name: "Solution", href: "#" },
	{ name: "Pricing", href: "#" },
	{ name: "About", href: "#" },
];
const notify = () =>
	toast("Accept the cookies", {
		duration: Number.POSITIVE_INFINITY,
	});

export default function PrimaryHero() {
	const params = useSearchParams();
	const state = params.get("success");
	const t = useTranslations("hero");
	const [success, setSuccess] = useState<boolean | null>(null);

	const isPending = CookiesStore(
		(state) => (state as CookiesStoreType).isPending,
	);
	const setPending = CookiesStore(
		(state) => (state as CookiesStoreType).setPending,
	);
	const userChoice = CookiesStore(
		(state) => (state as CookiesStoreType).userChoice,
	);
	const setChoice = CookiesStore(
		(state) => (state as CookiesStoreType).setChoice,
	);

	const setCookies = CookiesStore(
		(state) => (state as CookiesStoreType).setCookies,
	);
	const frameworks = ["nextjs", "tanstack", "angular"];
	const [query] = useQuery(api.youtube.queryLastYoutubeVideo) || [
		{ videoId: "", title: "" },
	];

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (state === "true") {
			setSuccess(true);
			setTimeout(() => {
				setSuccess(null);
			}, 2000);
		} else if (state === "false") {
			setSuccess(false);
			setTimeout(() => {
				setSuccess(null);
			}, 2000);
		}
		if (!userChoice && !isPending) {
			// notify();
			setPending(true);
		}
	}, []);

	return (
		<>
			<main>
				<section className="overflow-hidden">
					{!userChoice && (
						<Toaster
							position="bottom-right"
							reverseOrder={false}
							gutter={8}
							containerClassName=""
							containerStyle={{}}
						>
							{(toast) => (
								<Alert className="w-[25%]">
									<Database className="h-4 w-4" />
									<AlertTitle className="capitalize">
										{t("cookies.title")}
									</AlertTitle>
									<AlertDescription className="gap-2">
										{t("cookies.description")}
										<div className="flex gap-2 items-center ">
											<Button
												onClick={() => {
													setChoice();
													setCookies();
												}}
											>
												<Cookie />
												{t("cookies.button.acept")}
											</Button>
											<Button variant={"secondary"} onClick={() => setChoice()}>
												<Ban />
												{t("cookies.button.decline")}
											</Button>
										</div>
									</AlertDescription>
								</Alert>
							)}
						</Toaster>
					)}

					<div className="relative mx-auto px-6 py-28 lg:py-20">
						<div className="lg:flex lg:items-center lg:gap-12">
							<div className="relative z-10 mx-auto max-w-xl text-center lg:ml-0 lg:w-1/2 lg:text-left">
								<Link
									href={`https://youtube.com/watch?v=${query.videoId}`}
									className="rounded-(--radius) mx-auto flex w-fit items-center gap-2 border p-1 pr-3 lg:ml-0"
								>
									<span className="flex items-center gap-1 bg-muted rounded-[calc(var(--radius)-0.25rem)] px-2 py-1 text-xs">
										{icons[t("social.icon") as IconType]} {t("social.span")}
									</span>
									<span className="text-sm">{t("social.title")}</span>
									<span className="bg-(--color-border) block h-4 w-px" />

									<ArrowRight className="size-4" />
								</Link>

								<h1 className="mt-10 text-balance text-4xl font-bold md:text-5xl xl:text-5xl">
									{t("title")}
								</h1>
								<p className="mt-8">{t("subtitle")}</p>

								<div>
									<form
										method="POST"
										action="/api/"
										className="mx-auto my-10 max-w-sm lg:my-12 lg:ml-0 lg:mr-auto"
									>
										<div className="bg-background has-[input:focus]:ring-muted relative grid grid-cols-[1fr_auto] items-center rounded-lg border pr-3 shadow shadow-zinc-950/5 has-[input:focus]:ring-2">
											<Mail className="text-caption pointer-events-none absolute inset-y-0 left-5 my-auto size-5" />

											<input
												aria-label="email"
												id="email"
												name="email"
												placeholder={t("input.placeholder")}
												className="h-14 w-full !border-0 !ring-0 !shadow-none bg-transparent pl-12 focus:outline-none"
												type="email"
											/>

											<div className="md:pr-1.5 lg:pr-0">
												<Button
													aria-label="submit"
													className="rounded-(--radius)"
												>
													<AnimatePresence>
														{success && (
															<AnimatedContent>
																<CircleCheck />
															</AnimatedContent>
														)}
														{success === false && (
															<AnimatedContent>
																<CircleX />
															</AnimatedContent>
														)}
													</AnimatePresence>
													<span className="hidden md:block">
														{t("input.button.title")}
													</span>
													<SendHorizonal
														className="relative mx-auto size-5 md:hidden"
														strokeWidth={2}
													/>
												</Button>
											</div>
										</div>
									</form>

									<ul className="list-inside list-disc space-y-2">
										{frameworks.map((framework, index) => (
											<li key={t(`skills.${framework}.title`)}>
												{t(`skills.${framework}.title`)}
											</li>
										))}
									</ul>
								</div>
							</div>
						</div>
						<div className="absolute inset-0 -mx-4 rounded-3xl p-3 lg:col-span-3">
							<div className="relative">
								<div className="bg-radial-[at_65%_25%] to-background z-1 -inset-17 absolute from-transparent to-40%" />
								<Image
									className="hidden dark:block"
									src="/hero-dark.png"
									alt="app illustration"
									width={2796}
									height={2008}
								/>
								<Image
									className="dark:hidden"
									src="/hero-light.png"
									alt="app illustration"
									width={2796}
									height={2008}
								/>
							</div>
						</div>
					</div>
				</section>
			</main>
		</>
	);
}
