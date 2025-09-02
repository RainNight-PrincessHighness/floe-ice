"use client";

import { motion } from "framer-motion";
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  Plus, 
  Minus, 
  Eye, 
  EyeOff,
  CreditCard,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function WalletPage() {
  const [showBalance, setShowBalance] = useState(true);
  
  const walletData = {
    balance: 1288.88,
    frozen: 0.00,
    totalRecharge: 5000.00,
    totalSpent: 3711.12,
    todaySpent: 128.50
  };

  const transactions = [
    {
      id: 1,
      type: "recharge",
      amount: 500,
      description: "在线充值",
      time: "2024-01-20 14:30:25",
      status: "completed"
    },
    {
      id: 2,
      type: "spend",
      amount: -25.50,
      description: "数字服务",
      time: "2024-01-20 12:15:10",
      status: "completed"
    },
    {
      id: 3,
      type: "spend",
      amount: -12.00,
      description: "数字服务 - 社交平台",
      time: "2024-01-20 10:45:32",
      status: "completed"
    },
    {
      id: 4,
      type: "recharge",
      amount: 1000,
      description: "在线充值",
      time: "2024-01-19 16:20:15",
      status: "completed"
    },
    {
      id: 5,
      type: "spend",
      amount: -18.80,
      description: "数字服务",
      time: "2024-01-19 14:12:08",
      status: "completed"
    }
  ];

  return (
    <div className="mb-15 max-w-6xl mx-auto space-y-6">
     
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="backdrop-blur-xl bg-background/50 border border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">账户余额</p>
                  <div className="flex items-center space-x-2">
                    {showBalance ? (
                      <h3 className="text-foreground text-2xl font-bold">¥{walletData.balance}</h3>
                    ) : (
                      <h3 className="text-foreground text-2xl font-bold">¥****</h3>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowBalance(!showBalance)}
                      className="text-muted-foreground hover:text-foreground p-1"
                    >
                      {showBalance ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Wallet className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-xl bg-background/50 border border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">冻结金额</p>
                  <h3 className="text-foreground text-2xl font-bold">¥{walletData.frozen}</h3>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full flex items-center justify-center">
                  <Minus className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-xl bg-background/50 border border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">累计消费</p>
                  <h3 className="text-foreground text-2xl font-bold">¥{walletData.totalRecharge}</h3>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-xl bg-background/50 border border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">今日消费</p>
                  <h3 className="text-foreground text-2xl font-bold">¥{walletData.todaySpent}</h3>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center">
                  <TrendingDown className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>

    
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <Card className="backdrop-blur-xl bg-background/30 border border-border/30 hover:bg-background/50 transition-all duration-200 cursor-pointer">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <Plus className="w-6 h-6 text-white" />
            </div>
            <p className="text-foreground font-semibold">充值</p>
          </CardContent>
        </Card>
        
        <Card className="backdrop-blur-xl bg-background/30 border border-border/30 hover:bg-background/50 transition-all duration-200 cursor-pointer">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <p className="text-foreground font-semibold">提现</p>
          </CardContent>
        </Card>
        
        <Card className="backdrop-blur-xl bg-background/30 border border-border/30 hover:bg-background/50 transition-all duration-200 cursor-pointer">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <p className="text-foreground font-semibold">明细</p>
          </CardContent>
        </Card>
        
    
      </motion.div>

     
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="backdrop-blur-xl bg-background/50 border border-border/50">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center space-x-2">
              <TrendingUp className="w-6 h-6" />
              <span>最近交易</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {transactions.map((transaction, index) => (
                <motion.div
                  key={transaction.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  className="flex items-center justify-between p-4 rounded-lg bg-background/30 border border-border/30 hover:bg-background/50 transition-all duration-200"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.type === 'recharge' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {transaction.type === 'recharge' ? 
                        <TrendingUp className="w-5 h-5" /> : 
                        <TrendingDown className="w-5 h-5" />
                      }
                    </div>
                    <div>
                      <p className="text-foreground font-medium">{transaction.description}</p>
                      <p className="text-muted-foreground text-sm">{transaction.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-lg font-bold ${
                      transaction.amount > 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {transaction.amount > 0 ? '+' : ''}¥{Math.abs(transaction.amount).toFixed(2)}
                    </p>
                    <Badge variant="secondary" className="bg-green-500/20 text-green-400 border border-green-500/30">
                      已完成
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-6 text-center">
              <Button variant="outline" className="border-border text-foreground hover:bg-muted">
                查看更多交易记录
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
