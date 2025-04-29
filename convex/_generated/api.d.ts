/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as contactAction from "../contactAction.js";
import type * as crons from "../crons.js";
import type * as dashboard from "../dashboard.js";
import type * as featured from "../featured.js";
import type * as projects from "../projects.js";
import type * as youtube from "../youtube.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  contactAction: typeof contactAction;
  crons: typeof crons;
  dashboard: typeof dashboard;
  featured: typeof featured;
  projects: typeof projects;
  youtube: typeof youtube;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
