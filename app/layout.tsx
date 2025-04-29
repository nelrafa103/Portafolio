import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import { ThemeProvider } from "./ThemeProvider";
import "./globals.css";
import { headers } from "next/headers";
import AuthProvider from "./AuthProvider";
import { PostHogProvider } from "./providers";
import "instantsearch.css/themes/satellite.css";
const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Nélcido Rafael Diaz Delgado",
	description: "Portfolio of Nélcido Rafael Diaz Delgado",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const locale = await getLocale();
	const headerStore = await headers();

	return (
		<html lang={locale} suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="light"
					enableSystem
					disableTransitionOnChange
				>
					<AuthProvider>
						<NextIntlClientProvider>
							<PostHogProvider>
							 {children}
								 
							</PostHogProvider>
						</NextIntlClientProvider>
					</AuthProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
