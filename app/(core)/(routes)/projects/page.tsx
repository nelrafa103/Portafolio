import CommonProjects from "../../components/Projects/Common/Projects";
import FooterSection from "../../components/Footer/Footer";
import NavbarMenu from "../../components/Menus/Navbar/Menu";

export default function Page() {
	return (
		<>
			<NavbarMenu />
			<main>
				<CommonProjects />
			</main>
			<FooterSection />
		</>
	);
}
