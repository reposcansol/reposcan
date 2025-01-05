import { useState } from "react";
import { Command } from "cmdk";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const SUGGESTED_REPOS = [
  "solana-labs/solana",
  "bitcoin/bitcoin",
  "ethereum/go-ethereum",
  "cosmos/cosmos-sdk",
  "near/nearcore",
  "algorand/go-algorand"
];

export function RepoSearch({ value, onChange, className }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Command className={cn("relative z-50", className)}>
      <div className="glow-border">
        <div className="flex items-center border border-purple-500/30 rounded-lg bg-gray-800/80 px-3">
          <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          <Command.Input
            value={value}
            onValueChange={onChange}
            onFocus={() => setOpen(true)}
            onBlur={() => setTimeout(() => setOpen(false), 200)}
            placeholder="Enter GitHub repository URL"
            className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
      </div>
      {open && (
        <div className="absolute top-full w-full mt-2">
          <Command.List className="animate-in fade-in-0 slide-in-from-top-2 rounded-lg border border-purple-500/30 bg-black/90 backdrop-blur shadow-2xl">
            {SUGGESTED_REPOS.map((repo) => (
              <Command.Item
                key={repo}
                value={`https://github.com/${repo}`}
                onSelect={onChange}
                className="relative flex cursor-default select-none items-center rounded-sm px-3 py-2.5 text-sm outline-none hover:bg-purple-500/20 aria-selected:bg-purple-500/30"
              >
                <Github className="mr-2 h-4 w-4 text-purple-400" />
                {repo}
              </Command.Item>
            ))}
          </Command.List>
        </div>
      )}
    </Command>
  );
}
