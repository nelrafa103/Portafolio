import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

crons.weekly(
  "Weekly video update",
  {
    dayOfWeek: "saturday",
    hourUTC: 23,
    minuteUTC: 10,
  },
  internal.youtube.getLastYoutubeVideo,
);

crons.weekly(
  "Index update",
  {
    dayOfWeek: "monday",
    hourUTC: 5,
    minuteUTC: 43,
  },
  internal.projects.updateSearchIndex
)

crons.weekly(
  "Weekly github repos update",
  {
    dayOfWeek: "monday",
    hourUTC: 20,
    minuteUTC: 4,
  },
  internal.projects.getGithubRepos,
)

export default crons;
