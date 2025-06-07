import GitHub from "@/app/components/Icons/Github";
import LinkedIn from "@/app/components/Icons/LinkedIn";
import Clerk from "../components/Icons/Clerk";
import Docker from "../components/Icons/Docker";
import React from "../components/Icons/React";
import TanStack from "../components/Icons/TanStack";
import Youtube from "../components/Icons/Youtube";
import Tailwind from "../components/Icons/Tailwind";
const icons = {
  Github: <GitHub />,
  LinkedIn: <LinkedIn />,
  Clerk: <Clerk />,
  Docker: <Docker />,
  React: <React />,
  "TanStack Start": <TanStack />,
  Youtube: <Youtube />,
  Tailwind: <Tailwind />,
};

type IconType = keyof typeof icons;

export { icons, type IconType };
