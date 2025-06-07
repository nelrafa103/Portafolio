"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import { useTranslations } from "next-intl";

export default function Chat() {
	const { messages, input, handleInputChange, handleSubmit, isLoading } =
		useChat({
			api: "/api/chat",
		});

	const messagesEndRef = useRef<HTMLDivElement>(null);
	const [mounted, setMounted] = useState(false);

	const t = useTranslations("about");
	// Scroll to bottom when new messages arrive

	// Handle hydration issues
	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	return (
		<div className="flex flex-col h-auto bg-background pt-20">
			<main className="flex-1 overflow-hidden">
				<div className="container h-full max-w-3xl mx-auto flex flex-col">
					<div className="py-4 border-b">
						<h1 className="text-xl font-bold text-center">{t("title")}</h1>
					</div>

					{/* Messages container */}
					<div className="flex-1 overflow-y-auto py-4 px-2">
						{messages.length === 0 ? (
							<div className="h-full flex items-center justify-center text-center">
								<div className="max-w-md space-y-4">
									<h2 className="text-2xl font-bold">{t("info.title")}</h2>
									<p className="text-muted-foreground">{t("info.subtitle")}</p>
								</div>
							</div>
						) : (
							<div className="space-y-4 pb-4">
								{messages.map((message) => (
									<div
										key={message.id}
										className={cn(
											"flex w-full items-start gap-2 rounded-lg p-4",
											message.role === "user"
												? "bg-muted justify-end"
												: "bg-primary/10",
										)}
									>
										<div className="flex-1 max-w-prose space-y-2">
											<div className="font-semibold">
												{message.role === "user" ? "You" : "AI Assistant"}
											</div>
											<div className="whitespace-pre-wrap">
												<ReactMarkdown>{message.content}</ReactMarkdown>
											</div>
										</div>
									</div>
								))}
								<div ref={messagesEndRef} />
							</div>
						)}
					</div>

					{/* Input form */}
					<div className="border-t p-4">
						<form onSubmit={handleSubmit} className="flex items-center gap-2">
							<Input
								value={input}
								onChange={handleInputChange}
								placeholder="Type your message..."
								className="flex-1"
								disabled={isLoading}
							/>
							<Button type="submit" size="icon" disabled={isLoading}>
								<Send className="h-4 w-4" />
								<span className="sr-only">{t("button.title")}</span>
							</Button>
						</form>
					</div>
				</div>
			</main>
		</div>
	);
}
