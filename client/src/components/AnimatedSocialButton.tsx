import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface Props {
  href: string;
  icon: LucideIcon;
  label: string;
  onClick?: (e: React.MouseEvent) => void;
}

export function AnimatedSocialButton({ href, icon: Icon, label, onClick }: Props) {
  return (
    <motion.a
      href={href}
      onClick={onClick}
      className="relative group"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      title={label}
    >
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full bg-purple-500/20 blur-md"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0 }}
        whileHover={{ opacity: 0.5, scale: 1.2 }}
        transition={{ duration: 0.2 }}
      />

      {/* Icon container */}
      <motion.div
        className={cn(
          "relative flex items-center justify-center",
          "text-gray-400 hover:text-gray-200 transition-colors",
          "rounded-full p-2"
        )}
      >
        <Icon className="h-5 w-5" />
      </motion.div>

      {/* Click ripple effect */}
      <motion.div
        className="absolute inset-0 bg-purple-500/30 rounded-full pointer-events-none"
        initial={{ scale: 0, opacity: 0.5 }}
        whileTap={{ scale: 2, opacity: 0 }}
        transition={{ duration: 0.5 }}
      />
    </motion.a>
  );
}
