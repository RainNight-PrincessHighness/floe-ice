import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface MockTerminalProps {
  isActive: boolean;
  rentedNumber?: string;
}

export function MockTerminal({ isActive, rentedNumber }: MockTerminalProps) {
  const [logs, setLogs] = useState<Array<{ id: number; text: string; type: 'system' | 'sms' | 'error' }>>([
    { id: 1, text: "SMS接码系统已就绪...", type: 'system' },
    { id: 2, text: "等待租用号码...", type: 'system' }
  ]);

  useEffect(() => {
    if (isActive && rentedNumber) {
      // 清空之前的日志
      setLogs([
        { id: Date.now(), text: `正在初始化号码 ${rentedNumber}...`, type: 'system' }
      ]);

      // 模拟连接过程
      setTimeout(() => {
        setLogs(prev => [...prev, 
          { id: Date.now() + 1, text: `号码 ${rentedNumber} 已激活`, type: 'system' },
          { id: Date.now() + 2, text: "等待短信接收中...", type: 'system' }
        ]);
      }, 1000);

      // 模拟接收短信
      setTimeout(() => {
        const messages = [
          "【微信】您的验证码为：123456，5分钟内有效",
          "【Google】Your verification code is: 789012",
          "【QQ】验证码：456789，请在10分钟内完成验证",
          "【Twitter】Your Twitter confirmation code is 246810"
        ];
        
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        setLogs(prev => [...prev, 
          { id: Date.now() + 3, text: `📨 收到新短信`, type: 'sms' },
          { id: Date.now() + 4, text: randomMessage, type: 'sms' }
        ]);
      }, 5000);

      // 可能的第二条短信
      if (Math.random() > 0.6) {
        setTimeout(() => {
          setLogs(prev => [...prev, 
            { id: Date.now() + 5, text: `📨 收到新短信`, type: 'sms' },
            { id: Date.now() + 6, text: "请勿回复此短信。如非本人操作，请忽略。", type: 'sms' }
          ]);
        }, 8000);
      }
    }
  }, [isActive, rentedNumber]);

  return (
    <Card className="backdrop-blur-xl bg-black/80 border-green-500/30 shadow-2xl font-mono text-sm">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center space-x-2 text-green-400">
          <Terminal className="w-4 h-4" />
          <span>SMS接收终端</span>
          <Badge variant={isActive ? "default" : "secondary"} className="ml-auto">
            {isActive ? "运行中" : "待机"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-1 max-h-48 overflow-y-auto bg-black/20 rounded-lg p-3">
        <AnimatePresence>
          {logs.map((log) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className={`flex items-center space-x-2 ${
                log.type === 'system' 
                  ? 'text-green-400' 
                  : log.type === 'sms' 
                  ? 'text-blue-400' 
                  : 'text-red-400'
              }`}
            >
              {log.type === 'system' && <span className="text-gray-500">$</span>}
              {log.type === 'sms' && <MessageSquare className="w-3 h-3" />}
              {log.type === 'error' && <span className="text-red-500">!</span>}
              <span className="text-xs">{log.text}</span>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {/* 光标闪烁 */}
        {isActive && (
          <motion.div
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="flex items-center space-x-2 text-green-400"
          >
            <span className="text-gray-500">$</span>
            <span className="w-2 h-4 bg-green-400 inline-block"></span>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
