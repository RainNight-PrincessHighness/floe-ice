import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900" />
      
      <motion.div
        className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-400/30 to-purple-500/30 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      <motion.div
        className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-indigo-400/30 to-cyan-500/30 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-pink-400/20 to-orange-500/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          x: [-50, 50, -50],
          y: [-30, 30, -30],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-white/20 rounded-full blur-sm"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 4,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  withHover?: boolean;
}

export function GlassCard({ children, className = "", withHover = true }: GlassCardProps) {
  return (
    <motion.div
      whileHover={withHover ? { scale: 1.02, y: -5 } : {}}
      className={`backdrop-blur-xl bg-white/10 dark:bg-gray-800/10 border border-white/20 dark:border-gray-700/20 shadow-2xl transition-all duration-300 ${withHover ? 'hover:shadow-3xl hover:border-white/30' : ''} ${className}`}
    >
      <Card className="bg-transparent border-none shadow-none">
        <CardContent className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/3 pointer-events-none" />
          {children}
        </CardContent>
      </Card>
    </motion.div>
  );
}
