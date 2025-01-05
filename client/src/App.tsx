import { Switch, Route } from "wouter";
import { Home } from "@/pages/Home";
import { RepoAnalysis } from "@/pages/RepoAnalysis";
import { Roadmap } from "@/pages/Roadmap";
import { BannerDownload } from "@/pages/BannerDownload";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

function App() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/analyze/:owner/:repo" component={RepoAnalysis} />
      <Route path="/roadmap" component={Roadmap} />
      <Route path="/banner" component={BannerDownload} />
      <Route component={NotFound} />
    </Switch>
  );
}

function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-purple-900">
      <Card className="w-full max-w-md mx-4 bg-black/50 backdrop-blur border-purple-500/20">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <h1 className="text-2xl font-bold text-white">404 Page Not Found</h1>
          </div>
          <p className="mt-4 text-sm text-gray-400">
            The page you're looking for doesn't exist.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;