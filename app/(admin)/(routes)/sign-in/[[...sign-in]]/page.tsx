import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <main className="min-w-screen h-screen flex justify-center items-center">
      <SignIn
        appearance={{
          elements: {
            footer: "!bg-none",
            footerActionText: "dark:!text-[#e4e4e7]",
            footerActionLink: "dark:!text-[#e4e4e7]",
            cardBox:
              "dark:!bg-[#09090b] dark:!text-[#e4e4e7] !shadow-lg !shadow-[#18181b] !border-[##71717b] dark:!border ",
            selectOption: "dark:!bg-[#09090b] dark:!text-[#e4e4e7]",
            card: "dark:!bg-[#18181b] dark:!text-[#e4e4e7] shadow-lg dark:!border-[#e4e4e7] dark:border-1 shadow-[#18181b]",
            headerTitle: "dark:!text-[#e4e4e7]",
            headerSubtitle: "dark:!text-[#a1a1aa]",
            formFieldLabel: "dark:!text-[#e4e4e7]",
            socialButtonsBlockButtonText__google: "dark:!text-[#09090b]",
            socialButtonsBlockButton__google: "dark:!bg-[#e4e4e7]",
            alternativeMethods: "dark:!text-[#e4e4e7]",
            formFieldInputShowPasswordButton: "dark:!text-[#e4e4e7]",
            alternativeMethodsBlockButtonText: "dark:!text-[#e4e4e7]",
            alternativeMethodsBlockButton__google: "dark:!bg-[#e4e4e7]",
            formButtonPrimary:
              "dark:!text-[#09090b] dark:!bg-[#e4e4e7] dark:!hover:bg-[#a1a1aa] dark:!border-[#a1a1aa]",
          },
        }}
      />
    </main>
  );
}
