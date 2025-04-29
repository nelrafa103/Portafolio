import { getTranslations } from "next-intl/server";
import ContactForm from "../../components/Forms/Contact/Form";
import NavbarMenu from "../../components/Menus/Navbar/Menu";
import FooterSection from "../../components/Footer/Footer";
export default async function Page({
	searchParams,
}: {
	searchParams: Promise<{ success: boolean }>;
}) {
	const t = await getTranslations("contact");
	return (
		<>
			<NavbarMenu />
			<main className=" flex items-center justify-center">
				<ContactForm
					title={t("title")}
					offer={{
						title: t("offer.title"),
						list: [],
					}}
					advise={{
						text: t("advise.text"),
						link: {
							title: t("advise.link.title"),
							url: t("advise.link.url"),
						},
					}}
					subtitle={t("subtitle")}
					button={{
						title: t("form.button.title"),
						url: "",
					}}
				/>
			</main>
			<FooterSection />
		</>
	);
}
