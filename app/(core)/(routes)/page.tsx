import FooterSection from "../components/Footer/Footer";
import PrimaryHero from "../components/Heroes/Primary/Heroe";
import LogoCloud from "../components/Logos/Logos";
import NavbarMenu from "../components/Menus/Navbar/Menu";
import SettingsModal from "@/app/(admin)/components/Modals/Settings/Modal";
import FeaturedProjects from "../components/Projects/Featured/Projects";

export default async function Home() {
	return (
		<div className="w-full">
			<SettingsModal/>
			<NavbarMenu />
			<main className="w-full">
				<PrimaryHero />
				<LogoCloud />
				<FeaturedProjects />
			</main>
			<FooterSection />
		</div>
	);
}
