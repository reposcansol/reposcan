import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { motion } from "framer-motion";
import { RepoAnalyzer } from "@/components/RepoAnalyzer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useLocation } from "wouter";

export function RepoAnalysis() {
  const { owner, repo } = useParams();
  const [, setLocation] = useLocation();

  const { data, isLoading, error } = useQuery({
    queryKey: [`/api/repo/${owner}/${repo}`],
    enabled: !!owner && !!repo,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-900 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-900 flex items-center justify-center p-4">
        <Card className="p-6 bg-black/50 backdrop-blur text-center">
          <h2 className="text-xl font-bold text-red-500 mb-4">Error Loading Repository</h2>
          <p className="text-gray-300 mb-4">Failed to fetch repository data. Please try again.</p>
          <Button onClick={() => setLocation("/")} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-900 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <Button
          onClick={() => setLocation("/")}
          variant="ghost"
          className="mb-6 text-white"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Search
        </Button>

        <RepoAnalyzer data={data} />
      </motion.div>
    </div>
  );
}