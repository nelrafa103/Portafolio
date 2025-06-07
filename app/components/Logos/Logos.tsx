import React from "../Icons/Names/React";
import GitHub from "../Icons/Names/Github";
import TailwindCSS from "../Icons/Names/Tailwind";
import Vercel from "../Icons/Names/Vercel";
import Algolia from "../Icons/Names/Algolia";
import Nextjs from "../Icons/Names/NextJS";
import { getTranslations } from "next-intl/server";
export default async function LogoCloud() {
  const t = await getTranslations("logos");
  const icons = [
    <React key={"React"} className="size-24" />,
    <GitHub key={"Github"} className="size-24" />,
    <TailwindCSS key={"Tailwind"} className="size-24" />,
    <Vercel key={"Vercel"} className="size-24" />,
    <Algolia key={"Algolia"} className="size-24" />,
    <Nextjs key={"Nextjs"} className="size-24" />,
  ];
  return (
    <section className="bg-background py-16">
      <div className="mx-auto px-6">
        <h2 className="text-center text-lg font-medium">{t("title")}</h2>
        <div className="mx-auto mt-20 flex max-w-4xl flex-wrap items-center justify-center gap-x-12 gap-y-8 sm:gap-x-16 sm:gap-y-12">
          {icons.map((item) => (
            <ul className="h-5 w-fit" key={item.key}>
              {item}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
