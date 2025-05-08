"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import { Button, CounterLabel } from "@primer/react";
import { useQuery } from "convex/react";
import { useQuery as useTanQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import Dart from "../../Icons/Dart";
import type React from "react";
import Flutter from "../../Icons/Flutter";
import TypeScript from "../../Icons/Typescript";
import JavaScript from "../../Icons/Javascript";
import Rust from "../../Icons/Rust";
import Markdown from "../../Icons/Markdown";
import { StarFillIcon, StarIcon } from "@primer/octicons-react";
import TanStack from "../../Icons/TanStack";
import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import Nextjs from "../../Icons/NextJS";
import ReactIcon from "../../Icons/React";
import Angular from "../../Icons/Angular";
import Expo from "../../Icons/Expo";
export default function CommonProjects() {
  const languages: { [key: string]: React.ReactNode } = {
    dart: <Dart className="size-6" />,
    typescript: <TypeScript className="size-6" />,
    javascript: <JavaScript className="size-6" />,
    rust: <Rust className="size-6" />,
    markdown: <Markdown className="size-6" />,
  };

  const router = useRouter();

  const frameworks: { [key: string]: React.ReactNode } = {
    flutter: <Flutter className="size-4" />,
    nextjs: <Nextjs className="size-4" />,
    react: <ReactIcon className="size=4" />,
    tanstack: <TanStack className="size-4" />,
    angular: <Angular className="size-4" />,
    expo: <Expo className="size-4" />,
  };
  const repos = useQuery(api.projects.getProjects);
  const t = useTranslations("projects");
  const { data, error, isLoading, isFetched } = useTanQuery({
    queryKey: ["repos"],
    queryFn: () =>
      fetch("/api/translate", {
        method: "POST",
        body: JSON.stringify({
          contents: repos?.map((item) => {
            if (item.description != null && item.description !== "null")
              return item.description;
          }),
        }),
      }).then((res) => res.json()),
  });

  if (isFetched) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.5 } }}
        >
          <section className="py-16 md:py-32 dark:bg-transparent">
            <div className="@container mx-auto max-w-5xl px-6">
              <div className="text-center">
                <h2 className="text-balance text-4xl font-semibold lg:text-5xl">
                  {t("title")}
                </h2>
                <p className="mt-4">{t("description")}</p>
              </div>
              <div className="@min-4xl:max-w-full @min-4xl:grid-cols-3 mx-auto mt-8 grid max-w-sm gap-6 *:text-center md:mt-16">
                {/* biome-ignore lint/suspicious/noExplicitAny: <explanation> */}
                {repos?.map((item: any, index: number) => (
                  <Card
                    className="group shadow-zinc-950/5 justify-between cursor-pointer"
                    key={`${item.html_url}${index}`}
                    onClick={() => router.push(item.html_url)}
                  >
                    <CardHeader className="pb-3">
                      <CardDecorator>
                        {languages[String(item.language).toLowerCase()]
                          ? languages[String(item.language).toLowerCase()]
                          : languages.markdown}
                      </CardDecorator>

                      <h3 className="mt-6 font-medium">{item.name}</h3>
                    </CardHeader>

                    <CardContent>
                      <p className="text-sm text-justify">
                        {data.data[0].translations[index].translatedText
                          .length > 5
                          ? data.data[0].translations[index].translatedText
                          : t("items.description.default")}
                      </p>
                    </CardContent>
                    <CardFooter className="gap-2">
                      <Button
                        leadingVisual={() => {
                          if (item.stargazers_count > 0) {
                            return <StarFillIcon className="fill-[#e3b341]" />;
                          }
                          return <StarIcon />;
                        }}
                      >
                        {t("button.title")}
                        <CounterLabel scheme="primary">
                          {item.stargazers_count}
                        </CounterLabel>
                      </Button>
                      {item.topics.map((topic: string) => frameworks[topic])}
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </motion.div>
      </AnimatePresence>
    );
  }
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <svg
        aria-hidden="true"
        className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-neutral-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
}

const CardDecorator = ({ children }: { children: React.ReactNode }) => (
  <div className="relative mx-auto size-36 duration-200 [--color-border:color-mix(in_oklab,var(--color-zinc-950)10%,transparent)] group-hover:[--color-border:color-mix(in_oklab,var(--color-zinc-950)20%,transparent)] dark:[--color-border:color-mix(in_oklab,var(--color-white)15%,transparent)] dark:group-hover:bg-white/5 dark:group-hover:[--color-border:color-mix(in_oklab,var(--color-white)20%,transparent)]">
    <div
      aria-hidden
      className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px]"
    />
    <div
      aria-hidden
      className="bg-radial to-background absolute inset-0 from-transparent to-75%"
    />
    <div className="bg-background absolute inset-0 m-auto flex size-12 items-center justify-center border-l border-t">
      {children}
    </div>
  </div>
);
