import { getTranslations } from "next-intl/server";
import Link from "next/link";
import XformerlyTwitter from "../Icons/Twitter";
import YouTube from "../Icons/Youtube";

 
export default async function FooterSection() {
	const pages = ["about", "contact", "projects"];
	const t = await getTranslations("footer");
	return (
		<footer className="py-16 md:py-32">
			<div className="mx-auto max-w-5xl px-6">
				<Link
					href="/"
					aria-label="go home"
					className="mx-auto block size-fit"
				/>

				<div className="my-8 flex flex-wrap justify-center gap-6 text-sm">
					{pages.map((link, index) => (
						<Link
							key={t(`${link}.title`)}
							href={t(`${link}.url`)}
							className="text-muted-foreground hover:text-primary block duration-150"
						>
							<span>{t(`${link}.title`)}</span>
						</Link>
					))}
				</div>
				<div className="my-8 flex flex-wrap justify-center gap-6 text-sm">
					<Link
						href="https://x.com/DiazNelcido"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="X/Twitter"
						className="text-muted-foreground hover:text-primary block"
					>
						<XformerlyTwitter />
					</Link>
					<Link
						href="https://www.youtube.com/@nelcidorafaeldiazperez3749"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="LinkedIn"
						className="text-muted-foreground hover:text-primary block"
					>
						<YouTube />
					</Link>
				</div>
				<span className="text-muted-foreground block text-center text-sm">
					{" "}
					© {new Date().getFullYear()} Nelcido Rafael Diaz Delgado
				</span>
			</div>
		</footer>
	);
}
