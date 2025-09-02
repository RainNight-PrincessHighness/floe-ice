import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  withHover?: boolean;
  delay?: number;
}

export function GlassCard({ children, className, withHover = true, delay = 0 }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={withHover ? { scale: 1.02, y: -5 } : {}}
      className={cn(
        "backdrop-blur-xl bg-white/10 dark:bg-gray-800/10",
        "border border-white/20 dark:border-gray-700/20",
        "shadow-2xl rounded-2xl",
        "relative overflow-hidden",
        "before:absolute before:inset-0",
        "before:bg-gradient-to-r before:from-white/5 before:to-transparent",
        "before:pointer-events-none",
        "transition-all duration-300",
        withHover && "hover:shadow-3xl hover:border-white/30",
        className
      )}
    >
      {/* 内部光泽效果 */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 pointer-events-none" />
      
      {/* 内容 */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}

interface FloatingElementProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function FloatingElement({ children, className, delay = 0 }: FloatingElementProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        y: [0, -10, 0],
      }}
      transition={{
        delay,
        y: {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }}
      className={cn("relative", className)}
    >
      {children}
    </motion.div>
  );
}
