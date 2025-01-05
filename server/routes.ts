import type { Express } from "express";
import { createServer, type Server } from "http";

export function registerRoutes(app: Express): Server {
  app.get("/api/repo/:owner/:repo", async (req, res) => {
    const { owner, repo } = req.params;

    try {
      const [repoRes, commitsRes, contributorsRes] = await Promise.all([
        fetch(`https://api.github.com/repos/${owner}/${repo}`),
        fetch(`https://api.github.com/repos/${owner}/${repo}/commits?per_page=100`),
        fetch(`https://api.github.com/repos/${owner}/${repo}/contributors`)
      ]);

      if (!repoRes.ok || !commitsRes.ok || !contributorsRes.ok) {
        throw new Error("Failed to fetch repository data");
      }

      const repoData = await repoRes.json();
      const commitsData = await commitsRes.json();
      const contributorsData = await contributorsRes.json();

      res.json({
        repo: repoData,
        commits: commitsData,
        contributors: contributorsData
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch repository data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}