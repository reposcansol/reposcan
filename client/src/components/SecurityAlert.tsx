import { AlertTriangle, ShieldAlert, ShieldCheck } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { type SecurityAnalysis } from "@/lib/github";

interface Props {
  analysis: SecurityAnalysis;
}

export function SecurityAlert({ analysis }: Props) {
  if (analysis.riskLevel === 'low') {
    return null;
  }

  const variants = {
    medium: {
      icon: AlertTriangle,
      title: "Potential Concerns",
      className: "border-yellow-500/50 bg-yellow-500/10",
    },
    high: {
      icon: ShieldAlert,
      title: "High Risk Detected",
      className: "border-red-500/50 bg-red-500/10",
    },
    critical: {
      icon: ShieldAlert,
      title: "Critical Risk - Potential Scam",
      className: "border-red-600/50 bg-red-600/10",
    },
  }[analysis.riskLevel];

  if (!variants) return null;

  const Icon = variants.icon;

  return (
    <Alert className={variants.className}>
      <Icon className="h-5 w-5 text-red-400" />
      <AlertTitle className="text-red-400">{variants.title}</AlertTitle>
      <AlertDescription className="mt-2 text-red-200/90">
        <ul className="list-disc pl-4 space-y-1">
          {analysis.warnings.map((warning, index) => (
            <li key={index}>{warning}</li>
          ))}
        </ul>
      </AlertDescription>
    </Alert>
  );
}
