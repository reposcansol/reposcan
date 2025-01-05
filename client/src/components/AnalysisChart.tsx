import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export function AnalysisChart({ data }: { data: any }) {
  const commitData = data.commits.reduce((acc: any[], commit: any) => {
    const date = new Date(commit.commit.author.date).toLocaleDateString();
    const existing = acc.find((item) => item.date === date);
    if (existing) {
      existing.commits += 1;
    } else {
      acc.push({ date, commits: 1 });
    }
    return acc;
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Card className="bg-black/50 backdrop-blur border-purple-500/20">
        <CardHeader>
          <CardTitle className="text-white">Commit Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={commitData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis
                  dataKey="date"
                  stroke="#666"
                  tick={{ fill: "#666" }}
                />
                <YAxis stroke="#666" tick={{ fill: "#666" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1a1a1a",
                    border: "1px solid #333",
                    borderRadius: "4px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="commits"
                  stroke="#9333ea"
                  strokeWidth={2}
                  dot={{ fill: "#9333ea" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
