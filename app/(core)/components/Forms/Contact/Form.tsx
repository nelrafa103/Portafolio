"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import * as z from "zod";
type ContactFormProps = {
  title: string;
  subtitle?: string;
  advise: {
    text: string;
    link: {
      title: string;
      url: string;
    };
  };
  offer: {
    title: string;
    list: string[];
  };
  button: {
    title: string;
    url: string;
  };
  fields?: {
    defaults: {
      name: { value: string; error: string };
      companyName: { value: string; error: string };
      email: { value: string; error: string };
      phone: { value: string; error: string };
    };
    selects: {
      [key: string]: {
        id: string;
        name: string;
        label: string;
        placeholder: string;
        description: string;
        options: [{ value: string; label: string }];
      };
    };
    inputs: {
      [key: string]: {
        name: string;
        label: string;
        placeholder: string;
        description: string;
        id: string;
      };
    };
  };
};

export default function ContactForm({
  title,
  advise,
  subtitle,
  offer,
  button,
  fields,
}: ContactFormProps) {
  const FormSchema = z.object({
    name: z.string().min(2, {
      message: fields?.defaults.name.error,
    }),
    companyName: z.string().min(2, {
      message: fields?.defaults.companyName.error,
    }),
    phoneNumber: z.string().min(2, {
      message: fields?.defaults.phone.error,
    }),
    email: z.string().email(),
    country: z.string().min(2),
    size: z.string().min(2),
    knowledge: z.string().min(2),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      companyName: "",
      phoneNumber: "",
      email: "",
    },
  });

  const selects = useTranslations("contact.form.fields.selects");
  const inputs = useTranslations("contact.form.fields.inputs");
  const options = useTranslations("contact.form.fields.selects");
  const countries = ["DR", "US", "ES"];
  const selectsKeys = ["country"];
  const inputKeys = ["name", "email", "company", "phone"];

  return (
    <section className="relative py-32">
      <div className="pointer-events-none absolute inset-x-0 -top-20 -bottom-20 bg-[radial-gradient(ellipse_35%_15%_at_40%_55%,hsl(var(--accent))_0%,transparent_100%)] lg:bg-[radial-gradient(ellipse_12%_20%_at_60%_45%,hsl(var(--accent))_0%,transparent_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 -top-20 -bottom-20 bg-[radial-gradient(ellipse_35%_20%_at_70%_75%,hsl(var(--accent))_0%,transparent_80%)] lg:bg-[radial-gradient(ellipse_15%_30%_at_70%_65%,hsl(var(--accent))_0%,transparent_80%)]" />
      <div className="pointer-events-none absolute inset-x-0 -top-20 -bottom-20 bg-[radial-gradient(hsl(var(--accent-foreground)/0.1)_1px,transparent_1px)] [background-size:8px_8px] [mask-image:radial-gradient(ellipse_60%_60%_at_65%_50%,#000_0%,transparent_80%)]" />
      <div className="container grid w-full grid-cols-1 gap-x-32 overflow-hidden lg:grid-cols-2">
        <div className="w-full pb-10 md:space-y-10 md:pb-0">
          <div className="space-y-4 md:max-w-[40rem]">
            <h1 className="text-4xl font-medium lg:text-5xl">{title}</h1>
            <div className="text-muted-foreground md:text-base lg:text-lg lg:leading-7">
              {subtitle}
            </div>
          </div>
        </div>
        <div className="flex w-full justify-center lg:mt-2.5">
          <div className="relative flex w-full max-w-[30rem] min-w-[20rem] flex-col items-center overflow-visible md:min-w-[24rem]">
            <div className="w-full space-y-6 rounded-xl border border-border bg-background px-6 py-10 shadow-sm">
              <Form {...form}>
                <form
                  className="z-10 space-y-6"
                  action={"/api/contact"}
                  method="POST"
                >
                  {inputKeys.map((item) => (
                    <FormField
                      key={inputs(`${item}.id`)}
                      control={form.control}
                      name={
                        inputs(`${item}.name`) as
                          | "name"
                          | "companyName"
                          | "phoneNumber"
                          | "email"
                          | "country"
                          | "size"
                          | "knowledge"
                      }
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{inputs(`${item}.label`)}</FormLabel>
                          <FormControl>
                            <Input
                              placeholder={inputs(`${item}.placeholder`)}
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            {inputs(`${item}.description`)}
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                  {selectsKeys.map((item) => (
                    <FormField
                      key={selects(`${item}.id`)}
                      control={form.control}
                      name={
                        selects(`${item}.name`) as
                          | "country"
                          | "name"
                          | "companyName"
                          | "phoneNumber"
                          | "email"
                          | "size"
                          | "knowledge"
                      }
                      render={({ field }) => (
                        <FormItem key={selects(`${item}.id`)}>
                          <FormLabel>
                            {selects(`${item}.description`)}
                          </FormLabel>
                          <FormControl>
                            <Select
                              name={selects(`${item}.name`)}
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger className="w-[180px]">
                                <SelectValue
                                  placeholder={selects(`${item}.placeholder`)}
                                />
                              </SelectTrigger>
                              <SelectContent>
                                {countries.map((option) => (
                                  <SelectItem
                                    key={options(
                                      `${item}.options.${option}.label`,
                                    )}
                                    value={options(
                                      `${item}.options.${option}.value`,
                                    )}
                                  >
                                    {options(`${item}.options.${option}.label`)}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  ))}
                  <div className="flex w-full flex-col justify-end space-y-3 pt-2">
                    <Button
                      className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([className*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 h-9 px-4 py-2 has-[>svg]:px-3"
                      type="submit"
                    >
                      {button.title}
                    </Button>
                    <div className="text-xs text-muted-foreground">
                      {advise.text}
                      <a href={advise.link.url} className="underline">
                        {advise.link.title}
                      </a>
                      .
                    </div>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
