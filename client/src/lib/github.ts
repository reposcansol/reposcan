import { type } from "os";

export interface RepoData {
  repo: {
    stargazers_count: number;
    forks_count: number;
    open_issues_count: number;
    name: string;
    description: string;
    html_url: string;
    created_at: string;
    updated_at: string;
    pushed_at: string;
    fork: boolean;
    default_branch: string;
  };
  commits: Array<{
    commit: {
      author: {
        date: string;
      };
      message: string;
    };
  }>;
  contributors: Array<{
    login: string;
    contributions: number;
  }>;
}

export interface SecurityAnalysis {
  score: number; // 0-100, higher is better
  warnings: string[];
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
}

export async function fetchRepoData(owner: string, repo: string): Promise<RepoData> {
  const response = await fetch(`/api/repo/${owner}/${repo}`);
  if (!response.ok) {
    throw new Error('Failed to fetch repository data');
  }
  return response.json();
}

export function analyzeRepoSecurity(data: RepoData): SecurityAnalysis {
  const warnings: string[] = [];
  let score = 100;

  // Calculate repository age in days
  const createdAt = new Date(data.repo.created_at);
  const now = new Date();
  const ageInDays = Math.floor((now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24));

  // Check repository age vs activity
  if (ageInDays < 30 && data.repo.stargazers_count > 1000) {
    warnings.push("Suspicious rapid growth: High star count for a very new repository");
    score -= 30;
  }

  // Analyze commit patterns
  const commitFrequency = data.commits.length / Math.max(ageInDays, 1);
  if (commitFrequency > 50 && ageInDays < 7) {
    warnings.push("Unusual commit pattern: Extremely high commit frequency in a new repository");
    score -= 25;
  }

  // Check fork relationships
  if (data.repo.fork) {
    const hasSignificantChanges = data.commits.length > 10;
    if (!hasSignificantChanges) {
      warnings.push("Suspicious fork: Minimal changes from original repository");
      score -= 20;
    }
  }

  // Contributor analysis
  const contributorCount = data.contributors.length;
  if (contributorCount === 1 && data.repo.stargazers_count > 500) {
    warnings.push("Unusual pattern: High popularity but single contributor");
    score -= 15;
  }

  // Determine risk level
  let riskLevel: SecurityAnalysis['riskLevel'];
  if (score < 40) {
    riskLevel = 'critical';
  } else if (score < 60) {
    riskLevel = 'high';
  } else if (score < 80) {
    riskLevel = 'medium';
  } else {
    riskLevel = 'low';
  }

  return {
    score,
    warnings,
    riskLevel,
  };
}