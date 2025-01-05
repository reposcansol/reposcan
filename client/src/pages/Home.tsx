import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Github, SearchCode, X, MessageSquare } from "lucide-react";
import { ParticleBackground } from "@/components/ParticleBackground";
import { toast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { AnimatedSocialButton } from "@/components/AnimatedSocialButton";

export function Home() {
  const [, setLocation] = useLocation();
  const [repoUrl, setRepoUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    const match = repoUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
    if (match) {
      setIsAnalyzing(true);
      const [, owner, repo] = match;

      // Delay to show animation
      await new Promise(resolve => setTimeout(resolve, 800));
      setLocation(`/analyze/${owner}/${repo}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-900 flex flex-col relative overflow-hidden">
      <ParticleBackground />

      {/* Navigation Bar */}
      <nav className="w-full p-4 flex justify-between items-center relative z-10">
        {/* Logo */}
        <button
          onClick={() => setLocation("/")}
          className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 hover:opacity-80 transition-opacity"
        >
          R
        </button>

        {/* Right side navigation items */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            className="text-purple-400 hover:bg-purple-500/10"
            onClick={() => setLocation("/roadmap")}
          >
            Roadmap
          </Button>

          <div className="flex items-center gap-3">
            <AnimatedSocialButton
              href="#"
              icon={Github}
              label="GitHub repository coming soon"
              onClick={(e) => {
                e.preventDefault();
                alert("GitHub repository coming soon!");
              }}
            />
            <AnimatedSocialButton
              href="https://x.com/RepoScan"
              icon={X}
              label="Follow us on X"
            />
            <AnimatedSocialButton
              href="#"
              icon={MessageSquare}
              label="Telegram group coming soon"
              onClick={(e) => {
                e.preventDefault();
                alert("Telegram group coming soon!");
              }}
            />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-7xl font-bold mb-6 relative">
            <span className="absolute -inset-1 blur-xl bg-gradient-to-r from-purple-600/50 to-pink-600/50"></span>
            <span className="relative bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 text-transparent bg-clip-text font-black tracking-tight">
              REPOSCAN
            </span>
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-purple-200/80 font-medium tracking-wide"
          >
            Instantly evaluate GitHub repositories
            <br />
            <span className="text-purple-400/90">with confidence</span>
          </motion.p>
        </motion.div>

        <Card className="w-full max-w-2xl bg-black/50 backdrop-blur border-purple-500/20">
          <CardContent className="pt-6">
            <div className="flex gap-4 flex-col md:flex-row">
              <div className="flex-1 glow-border">
                <Input
                  placeholder="Enter GitHub repository URL"
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                  className="bg-gray-800/80 border-purple-500/30 text-white w-full"
                />
              </div>
              <Button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
              >
                <AnimatePresence mode="wait">
                  {isAnalyzing ? (
                    <motion.div
                      key="analyzing"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="flex items-center"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="mr-2 h-4 w-4"
                      >
                        <SearchCode className="h-4 w-4" />
                      </motion.div>
                      Analyzing...
                    </motion.div>
                  ) : (
                    <motion.div
                      key="analyze"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      className="flex items-center"
                      whileTap={{ scale: 0.95 }}
                    >
                      <SearchCode className="mr-2 h-4 w-4" />
                      Analyze
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Ripple effect */}
                <motion.div
                  initial={{ scale: 0, opacity: 0.35 }}
                  animate={isAnalyzing ? { scale: 2, opacity: 0 } : { scale: 0, opacity: 0.35 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 bg-white rounded-full pointer-events-none"
                />
              </Button>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <Feature
                icon={<Github className="h-8 w-8" />}
                title="Deep Analysis"
                description="Get detailed insights into repository activity and health"
              />
              <Feature
                icon={<SearchCode className="h-8 w-8" />}
                title="Code Quality"
                description="Evaluate code quality and development practices"
              />
              <Feature
                icon={<SearchCode className="h-8 w-8" />}
                title="Community Stats"
                description="Understand community engagement and contributions"
              />
            </div>
          </CardContent>
        </Card>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 w-full max-w-lg mx-auto px-4 pb-6"
        >
          <Card className="bg-black/70 backdrop-blur-lg border-purple-500/30 shadow-2xl shadow-purple-500/10">
            <CardContent className="py-4">
              <p className="text-lg font-medium text-center text-purple-300 mb-2">
                Contract Address
              </p>
              <div className="glow-border">
                <div className="p-4 rounded-lg bg-purple-950/40 border border-purple-500/30">
                  <p className="text-purple-300 font-mono text-base md:text-lg break-all text-center">
                    XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

function Feature({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex flex-col items-center text-center p-4 rounded-lg bg-gray-800/50">
      <div className="mb-2 text-purple-400">{icon}</div>
      <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
      <p className="text-sm text-gray-400">{description}</p>
    </div>
  );
}