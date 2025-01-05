import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Circle, GitBranch, GitCommit, Users, Shield, Star, Clock, Eye, Code, GitPullRequest, AlertTriangle } from "lucide-react";

interface RepoAnalysisProps {
  data: any;
}

export function RepoAnalyzer({ data }: RepoAnalysisProps) {
  // Calculate health score (0-100)
  const calculateHealthScore = () => {
    const metrics = {
      hasReadme: data.repo.readme ? 20 : 0,
      activeContributors: Math.min(data.contributors.length * 5, 20),
      recentActivity: data.commits.length > 0 ? 20 : 0,
      issuesHandling: data.repo.open_issues > 0 ? 20 : 0,
      documentation: data.repo.description ? 20 : 0,
    };

    return Object.values(metrics).reduce((sum: number, score: number) => sum + score, 0);
  };

  const healthScore = calculateHealthScore();

  // Format languages with percentages
  const languages = Object.entries(data.repo.languages || {}).map(([name, bytes]: [string, number]) => ({
    name,
    percentage: Math.round((bytes / Object.values(data.repo.languages || {}).reduce((a: number, b: number) => a + b, 0)) * 100)
  }));

  const stats = [
    {
      title: "Stars",
      value: data.repo.stargazers_count,
      icon: Star,
      color: "text-yellow-500",
    },
    {
      title: "Age",
      value: "~1 month",
      icon: Clock,
      color: "text-blue-500",
    },
    {
      title: "Last Update",
      value: "~1 day ago",
      icon: Clock,
      color: "text-green-500",
    },
    {
      title: "Contributors",
      value: data.contributors.length,
      icon: Users,
      color: "text-purple-500",
    },
    {
      title: "Watchers",
      value: data.repo.subscribers_count,
      icon: Eye,
      color: "text-indigo-500",
    },
    {
      title: "Languages",
      value: languages.map(l => `${l.name} (${l.percentage}%)`).join(", "),
      icon: Code,
      color: "text-pink-500",
    },
    {
      title: "Forks",
      value: data.repo.forks_count,
      icon: GitBranch,
      color: "text-cyan-500",
    },
    {
      title: "Issues",
      value: data.repo.open_issues_count,
      icon: AlertTriangle,
      color: "text-orange-500",
    },
    {
      title: "Pull Requests",
      value: data.repo.pull_requests_count || 0,
      icon: GitPullRequest,
      color: "text-teal-500",
    },
  ];

  const insights = [
    {
      title: "Code Activity",
      description: `${data.commits.length} commits in the last month`,
      icon: GitCommit,
      color: "text-emerald-500",
    },
    {
      title: "Community",
      description: `${data.contributors.length} active contributors`,
      icon: Users,
      color: "text-blue-500",
    },
    {
      title: "Maintenance",
      description: `${data.repo.open_issues} open issues`,
      icon: GitBranch,
      color: "text-amber-500",
    },
    {
      title: "Security",
      description: "Repository security analysis",
      icon: Shield,
      color: "text-purple-500",
    },
  ];

  const checks = [
    {
      title: "Owner Verified",
      value: "No",
      description: "Repository owner verification status"
    },
    {
      title: "Has Active Discussions",
      value: "No",
      description: "Community engagement through discussions"
    },
    {
      title: "Clear Documentation",
      value: "No",
      description: "Presence of clear documentation and guides"
    },
    {
      title: "Security Alerts",
      value: "0",
      description: "Number of active security alerts"
    },
    {
      title: "Has Monetization Links",
      value: "No",
      description: "Presence of monetization-related links"
    },
    {
      title: "Code Similarity Alert",
      value: "No",
      description: "Detection of similar code patterns"
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-black/50 backdrop-blur border-purple-500/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Circle className="text-purple-500 h-5 w-5" />
            Repository Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            {/* Repository Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 rounded-lg bg-gray-800/50"
                >
                  <div className="flex items-center gap-3">
                    <div className={`${stat.color} p-2 rounded-lg bg-gray-800`}>
                      <stat.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">{stat.title}</p>
                      <p className="text-white font-medium">{stat.value}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Languages Breakdown */}
            {languages.length > 0 && (
              <div className="p-4 rounded-lg bg-gray-800/50">
                <h3 className="text-white font-medium mb-3 flex items-center gap-2">
                  <Code className="h-5 w-5 text-pink-500" />
                  Language Breakdown
                </h3>
                <div className="space-y-2">
                  {languages.map((lang) => (
                    <div key={lang.name} className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-pink-500 rounded-full h-2"
                          style={{ width: `${lang.percentage}%` }}
                        />
                      </div>
                      <span className="text-gray-300 text-sm min-w-[100px]">
                        {lang.name} ({lang.percentage}%)
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Repository Checks */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {checks.map((check, index) => (
                <motion.div
                  key={check.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 rounded-lg bg-gray-800/50"
                >
                  <h3 className="text-white font-medium mb-1">{check.title}</h3>
                  <p className="text-purple-400 font-mono text-sm mb-2">{check.value}</p>
                  <p className="text-gray-400 text-sm">{check.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Health Score Visualization */}
            <div className="relative w-48 h-48 mx-auto">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  className="fill-none stroke-gray-700"
                  strokeWidth="12"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  className="fill-none stroke-purple-500"
                  strokeWidth="12"
                  strokeDasharray={`${2 * Math.PI * 88 * (healthScore / 100)} ${
                    2 * Math.PI * 88
                  }`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <span className="text-4xl font-bold text-purple-400">
                    {healthScore}
                  </span>
                  <span className="text-gray-400 text-sm block">Health Score</span>
                </div>
              </div>
            </div>

            {/* Analysis Insights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {insights.map((insight, index) => (
                <motion.div
                  key={insight.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 rounded-lg bg-gray-800/50"
                >
                  <div className="flex items-start gap-3">
                    <div className={`${insight.color} p-2 rounded-lg bg-gray-800`}>
                      <insight.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium">{insight.title}</h3>
                      <p className="text-gray-400 text-sm">{insight.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}