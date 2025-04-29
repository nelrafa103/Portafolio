import { Octokit } from "octokit";
import config from "@/app/config";

const octokit = new Octokit({
  auth: config.github.token,
});

export default octokit;
