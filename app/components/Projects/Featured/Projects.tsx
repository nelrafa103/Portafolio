import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "../../Icons/Names/React";
import GitHub from "../../Icons/Names/Github";
import TailwindCSS from "../../Icons/Names/Tailwind";
import Vercel from "../../Icons/Names/Vercel";
import Algolia from "../../Icons/Names/Algolia";
import Nextjs from "../../Icons/Names/NextJS";
import Rust from "../../Icons/Rust";
import convexClient from "../../../lib/convex";
import { api } from "@/convex/_generated/api";
import Flutter from "../../Icons/Flutter";
import { getTranslations } from "next-intl/server";
import { headers } from "next/headers";
import Translationclient from "@/app/lib/translation";

export default async function FeaturedProjects() {
	const headersStore = await headers();
  const language = headersStore.get("Accept-Language") || "en";
	const icons: { [key: string]: React.ReactNode } = {
		react: <React key={"React"} />,
		github: <GitHub key={"Github"} />,
		tailwindcss: <TailwindCSS key={"Tailwind"} />,
		vercel: <Vercel key={"Vercel"} />,
		algolia: <Algolia key={"Algolia"} />,
		nextjs: <Nextjs key={"Nextjs"} />,
		rust: <Rust key={"Rust"} />,
		flutter: <Flutter key={"Flutter"} />,
	};

	const t = await getTranslations("skills");
  const projects = await getTranslations("projects");
	const query = await convexClient.query(api.featured.getAllFeaturedProjects);
	const contents = query.map((item) => item.description);
	const languageCodes = {
		targetLanguageCode: "",
		sourceLanguageCode: "",
	};
	if (language.startsWith("en")) {
		languageCodes.targetLanguageCode = "en-US";
		languageCodes.sourceLanguageCode = "es-DO";
	} else {
		languageCodes.targetLanguageCode = "es-DO";
		languageCodes.sourceLanguageCode = "en-US";
	}

	const request = {
		parent: `projects/${process.env.GOOGLE_PROJECT_ID}`,
		contents,
		mimeType: "text/plain",
		...languageCodes,
	};

  const data = (await Translationclient.translateText(request));

  const translations = data[0].translations?.map((item) => item.translatedText) || []

	return (
		<section>
			<div className="py-32">
				<div className="mx-auto max-w-5xl px-6">
					<div className="text-center">
						<h2 className="text-balance text-3xl font-semibold md:text-4xl">
							{t("title")}
						</h2>
						<p className="text-muted-foreground mt-6">{t("subtitle")}</p>
					</div>

					<div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
						{query.map((item, index) => (
							<IntegrationCard
								key={item.name}
								title={item.name}
								button={{ title: t("button.title"), url: item.html_url }}
								description={translations[index] ? translations[index]: projects("items.description.default")}
							>
								{item.topics.map((topic: string) => icons[topic])}
							</IntegrationCard>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}

const IntegrationCard = ({
	title,
	description,
	button,
	children,
}: {
	title: string;
	button: { title: string; url: string };
	description: string;
	children: React.ReactNode;
	link?: string;
}) => {
	return (
		<Card className="p-6">
			<div className="relative">
				<div className="*:size-10">{children}</div>

				<div className="space-y-2 py-6">
					<h3 className="text-base font-medium">{title}</h3>
					<p className="text-muted-foreground line-clamp-2 text-sm">
						{description}
					</p>
				</div>

				<div className="flex gap-3 border-t border-dashed pt-6">
					<Button
						asChild
						variant="secondary"
						size="sm"
						className="gap-1 pr-2 shadow-none"
					>
						<Link href={button.url} target="_blank">
							{button.title}
							<ChevronRight className="ml-0 !size-3.5 opacity-50" />
						</Link>
					</Button>
				</div>
			</div>
		</Card>
	);
};
