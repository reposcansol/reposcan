import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { GitBranch, Star, Users, Code } from "lucide-react";

export function RepoStats({ data }: { data: any }) {
  const stats = [
    {
      label: "Stars",
      value: data.repo.stargazers_count,
      icon: Star,
      color: "text-yellow-500",
    },
    {
      label: "Forks",
      value: data.repo.forks_count,
      icon: GitBranch,
      color: "text-blue-500",
    },
    {
      label: "Contributors",
      value: data.contributors.length,
      icon: Users,
      color: "text-green-500",
    },
    {
      label: "Open Issues",
      value: data.repo.open_issues_count,
      icon: Code,
      color: "text-purple-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="bg-black/50 backdrop-blur border-purple-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">{stat.label}</p>
                  <h3 className="text-2xl font-bold text-white mt-1">
                    {stat.value.toLocaleString()}
                  </h3>
                </div>
                <div className={`${stat.color}`}>
                  <stat.icon className="h-8 w-8" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
