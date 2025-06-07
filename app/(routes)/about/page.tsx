import Chat from "@/app/components/Chat/Chat";
import FooterSection from "@/app/components/Footer/Footer";
import NavbarMenu from "@/app/components/Menus/Navbar/Menu";

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
