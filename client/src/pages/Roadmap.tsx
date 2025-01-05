import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";

export function Roadmap() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <Button
          onClick={() => setLocation("/")}
          variant="ghost"
          className="mb-6 text-white"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4">
              Project Roadmap
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Our vision for building the most comprehensive crypto repository analyzer
            </p>
          </div>

          <div className="grid gap-8">
            {/* Token Benefits Section */}
            <div className="bg-black/50 backdrop-blur border border-purple-500/20 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-purple-400 mb-4">Token Holder Benefits</h2>
              <p className="text-gray-300 mb-6">
                Token holders gain exclusive access to premium features and participate in platform governance.
              </p>
              <div className="bg-gray-800/50 rounded-lg p-4 space-y-3">
                <h3 className="text-white font-medium mb-2">Why Support Us?</h3>
                <BenefitItem text="Priority access to new features and tools" />
                <BenefitItem text="Exclusive insights and detailed analysis reports" />
                <BenefitItem text="Community governance participation" />
                <BenefitItem text="Higher API limits and integrations" />
              </div>
            </div>

            {/* Phases Section */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Project Roadmap */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-white mb-4">Project Development</h3>
                <Phase
                  number={1}
                  title="Launch & Community Foundation"
                  items={[
                    "Advanced repository analysis platform",
                    "Initial token distribution",
                    "Community building initiatives"
                  ]}
                />
                <Phase
                  number={2}
                  title="Enhanced Analysis"
                  items={[
                    "AI-powered risk assessment",
                    "Extended security features",
                    "Performance optimizations"
                  ]}
                />
                <Phase
                  number={3}
                  title="Community Evolution"
                  items={[
                    "Governance system launch",
                    "Advanced AI training",
                    "Community-driven verification"
                  ]}
                />
              </div>

              {/* Token Holder Roadmap */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-white mb-4">Token Holder Benefits</h3>
                <Phase
                  number={1}
                  title="Early Access"
                  items={[
                    "Beta feature access",
                    "Extended API access",
                    "Custom dashboards"
                  ]}
                />
                <Phase
                  number={2}
                  title="Advanced Tools"
                  items={[
                    "Real-time alerts",
                    "Advanced reporting",
                    "Platform integrations"
                  ]}
                />
                <Phase
                  number={3}
                  title="Premium Features"
                  items={[
                    "AI predictions",
                    "Automated reports",
                    "Priority support"
                  ]}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function BenefitItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-1.5 rounded-full bg-purple-500" />
      <span className="text-gray-300">{text}</span>
    </div>
  );
}

function Phase({ number, title, items }: { number: number; title: string; items: string[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: number * 0.1 }}
      className="bg-black/30 backdrop-blur border border-purple-500/20 rounded-lg p-4"
    >
      <h4 className="text-lg font-medium text-purple-400 mb-2">
        Phase {number}: {title}
      </h4>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2 text-gray-300">
            <div className="h-1.5 w-1.5 rounded-full bg-purple-500" />
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}