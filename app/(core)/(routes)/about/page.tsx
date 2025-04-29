import Chat from "../../components/Chat/Chat";
import FooterSection from "../../components/Footer/Footer";
import NavbarMenu from "../../components/Menus/Navbar/Menu";

export default function ChatPage() {
  return (
    <>
      <NavbarMenu />
      <main>
        <Chat />
      </main>
      <FooterSection />
    </>
  );
}
