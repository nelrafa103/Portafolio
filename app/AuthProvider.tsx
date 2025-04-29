"use client";
import { ClerkProvider } from "@clerk/nextjs";
import { useAuth } from "@clerk/clerk-react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { InstantSearch } from "react-instantsearch";
import { algoliasearch } from "algoliasearch";
import { createFetchRequester } from "@algolia/requester-fetch";

const queryClient = new QueryClient();

export const angoliaClient = algoliasearch(
	process.env.NEXT_PUBLIC_ALGOLIA_APP_ID as string,
	process.env.NEXT_PUBLIC_ALGOLIA_API_KEY as string,
	{
		requester: createFetchRequester(),
	},
);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const convex = new ConvexReactClient(
		process.env.NEXT_PUBLIC_CONVEX_URL as string,
	);

	return (
		<ClerkProvider>
			<ConvexProviderWithClerk client={convex} useAuth={useAuth}>
				<QueryClientProvider client={queryClient}>
					<InstantSearch searchClient={angoliaClient} indexName={process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME as string}>
						{children}
					</InstantSearch>
				</QueryClientProvider>
			</ConvexProviderWithClerk>
		</ClerkProvider>
	);
};

export default AuthProvider;
