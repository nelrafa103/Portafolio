"use client";

import type React from "react";

import { useEffect, useState } from "react";
import {
	CircleX,
	CircleCheck
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";
import AnimatedContent from "@/app/(core)/components/Animations/AnimatedContent";
import { AnimatePresence } from "motion/react";

export default function ProjectForm() {
	const t = useTranslations("dashboard.projects.add");
	const [formData, setFormData] = useState({
		name: "",
		repository: "",
		description: "",
	});

	const [success, setSuccess] = useState<boolean | null>(null);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const clearFields = () => {
		setFormData({
			name: "",
			repository: "",
			description: "",
		});
	};

	useEffect(() => {
		if (success === null) return;
		setTimeout(() => setSuccess(null), 2000);
	}, [success]);
	const handleSubmit = async () => {
		const request = await fetch("/api/dashboard/projects/add", {
			method: "POST",
			body: JSON.stringify({
				data: {
					url: formData.repository,
					repo: formData.name,
					description: formData.description,
				},
			}),
		});

		const body = request.json();
		if (request.status === 200) {
			setSuccess(true);
		} else {
			setSuccess(false);
		}
		// Aquí iría la lógica para enviar los datos
	};

	const setSuccessFromForm = (success: boolean) => {
		setSuccess(success);
	};
	return (
		<div className="flex-1 overflow-auto">
			<div className="container mx-auto p-4 md:p-6">
				<div className="mt-6">
					<Card>
						<CardHeader>
							<CardTitle>{t("title")}</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid gap-4 md:grid-cols-2">
								<div className="space-y-2">
									<Label htmlFor={t("input.name.label")}>
										{t("input.name.label")}
									</Label>
									<Input
										id={t("input.name.label")}
										name={t("input.name.label").toLowerCase()}
										value={formData.name}
										onChange={handleChange}
										placeholder={t("input.name.placeholder")}
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor={t("input.repo.label").toLowerCase()}>
										{t("input.repo.label")}
									</Label>
									<Input
										id={t("input.repo.label").toLocaleLowerCase()}
										name={t("input.repo.label").toLowerCase()}
										value={formData.repository}
										onChange={handleChange}
										placeholder={t("input.repo.placeholder")}
									/>
								</div>
							</div>

							<div className="space-y-2">
								<Label htmlFor={t("input.description.label").toLowerCase()}>
									{t("input.description.label")}
								</Label>
								<textarea
									id={t("input.description.label").toLowerCase()}
									name={t("input.description.label").toLowerCase()}
									value={formData.description}
									onChange={handleChange}
									className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
									placeholder={t("input.description.placeholder")}
								/>
							</div>
						</CardContent>
						<CardFooter className="flex justify-between">
							<Button variant="outline">Cancelar</Button>
							<Button
								type="button"
								onClick={handleSubmit}
								className="cursor-pointer"
							>
								<AnimatePresence>
									{success && (
										<AnimatedContent>
											<CircleCheck />
										</AnimatedContent>
									)}
									{success === false && (
										<AnimatedContent>
											<CircleX />
										</AnimatedContent>
									)}
								</AnimatePresence>
								Guardar Proyecto
							</Button>
						</CardFooter>
					</Card>
				</div>
			</div>
		</div>
	);
}
