"use client";
import MenuStore from "@/app/(admin)/stores/Menu";
import { UserProfile } from "@clerk/clerk-react";
export default function SettingsModal() {
	const { isOpen } = MenuStore();
	if (isOpen) return <UserProfile />;
}
