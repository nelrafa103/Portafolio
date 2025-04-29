"use node";
import { action, query } from "./_generated/server";
import * as sgMail from "@sendgrid/mail";
import { v } from "convex/values";

sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");
export const requestContact = action({
  args: {
    to: v.string(),
    from: v.string(),
    name: v.string(),
    company: v.string(),
    phone: v.string(),
    country: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      const request = await sgMail.send({
        to: args.to,
        from: args.from,
        subject: "Contact Request",
        text: `Sender Name: ${args.name} \n Sender Email: ${args.from} \n Sender Company: ${args.company} \n Sender Phone: ${args.phone} \n Country Name: ${args.country} \n `,
        templateId: "d-8780d897240f4846b88a29e51fdcb9a1",
        dynamicTemplateData: {
          Sender_Email: args.from,
          Sender_Name: args.name,
          Sender_Company: args.company,
          Sender_Phone: args.phone,
          Country_Name: args.country,
        },
      });

      // Return only simple types that Convex supports
      const response = request;

      return true;
    } catch (error) {
      // Return a simplified error object
      return false;
    }
  },
});

export const sendContact = action({
  args: {
    to: v.string(),
    from: v.string(),
    subject: v.string(),
    text: v.string(),
    email: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      const request = await sgMail.send({
        to: args.to,
        from: args.from,
        subject: args.subject,
        dynamicTemplateData: {
          Sender_Email: args.email,
        },
        text: args.text,
      });

      // Return only simple types that Convex supports
      const response = request;

      return true;
    } catch (error) {
      console.log((error as Error).message);
      // Return a simplified error object
      return false;
    }
  },
});
