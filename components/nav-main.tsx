"use client";

import { IconCirclePlusFilled, IconMail, type Icon } from "@tabler/icons-react";
import * as z from "zod";
import { CirclePlus, Pencil, ArrowDownUp, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import {
  DialogTrigger,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormLabel,
  FormItem,
  FormDescription,
  FormMessage,
  FormControl,
} from "./ui/form";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "./ui/collapsible";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: Icon;
  }[];
}) {
  const FormSchema = z.object({
    url: z.string().url().min(2).max(100),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    defaultValues: {
      url: "",
    },
    resolver: zodResolver(FormSchema),
  });

  const t = useTranslations("sidebar");
  const collection = { projects: ["add", "edit", "order"] };
  const mainItems: ["projects"] = ["projects"];
  const inputs = ["url"];
  const mainIcons = {
    Add: <CirclePlus />,
    Edit: <Pencil />,
    Order: <ArrowDownUp />,
  };
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <SidebarMenuButton
                  tooltip="Quick Create"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
                >
                  <IconCirclePlusFilled />
                  <span>{t("buttons.primary.title")}</span>
                </SidebarMenuButton>
              </DialogTrigger>
              <DialogContent>
                <Form {...form}>
                  <form
                    className="z-10 space-y-6"
                    action={"/api/contact"}
                    method="POST"
                  >
                    {inputs.map((item) => (
                      <FormField
                        key={item}
                        control={form.control}
                        name="url"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{"URL"}</FormLabel>
                            <FormControl>
                              <Input
                                placeholder={"place your url"}
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>{"hello"}</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ))}
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
            <Button
              size="icon"
              className="size-8 group-data-[collapsible=icon]:opacity-0"
              variant="outline"
            >
              <IconMail />
              <span className="sr-only">{t("buttons.secondary.title")}</span>
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          {mainItems.map((item) => (
            <Collapsible key={item} defaultOpen className="group/collapsible">
              <SidebarGroup>
                <SidebarGroupLabel
                  asChild
                  className="group/label text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                >
                  <CollapsibleTrigger>
                    {t(`main.${item}.title`)}
                    <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                  </CollapsibleTrigger>
                </SidebarGroupLabel>
                <CollapsibleContent>
                  {collection[item].map((element) => (
                    <SidebarMenuItem
                      key={t(`main.${item}.items.${element}.title`)}
                    >
                      <SidebarMenuButton
                        asChild
                        tooltip={t(`main.${item}.items.${element}.title`)}
                      >
                        <a href={t(`main.${item}.items.${element}.url`)}>
                          {mainIcons[t(`main.${item}.items.${element}.icon`) as keyof typeof mainIcons]}
                          <span>{t(`main.${item}.items.${element}.title`)}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </CollapsibleContent>
              </SidebarGroup>
            </Collapsible>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
