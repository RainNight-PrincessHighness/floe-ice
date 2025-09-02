"use client";

import { motion } from "framer-motion";
import { 
  CreditCard, 
  Copy, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  QrCode,
  Wallet,
  ArrowRight
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function RechargePage() {
  const [amount, setAmount] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("digital");
  const [copied, setCopied] = useState(false);

  const rechargeAddress = "01a0a26d-7821-4e20-b639-baa370de3e6a";
  
  const quickAmounts = [100, 200, 500, 1000, 2000, 5000];
  
  const rechargeHistory = [
    {
      id: 1,
      amount: 500,
      method: "序列号",
      status: "completed",
      time: "2024-01-20 14:30:25",
      txHash: "0x1234...abcd"
    },
    {
      id: 2,
      amount: 1000,
      method: "序列号",
      status: "pending",
      time: "2024-01-20 12:15:10",
      txHash: "0x5678...efgh"
    },
    {
      id: 3,
      amount: 200,
      method: "序列号",
      status: "completed",
      time: "2024-01-19 16:20:15",
      txHash: "0x9abc...ijkl"
    }
  ];

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-500/20 text-green-400 border-green-400/30">已完成</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-400/30">处理中</Badge>;
      case 'failed':
        return <Badge className="bg-red-500/20 text-red-400 border-red-400/30">失败</Badge>;
      default:
        return <Badge variant="secondary">未知</Badge>;
    }
  };

  return (
    <div className="mb-15 max-w-6xl mx-auto space-y-6">
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="backdrop-blur-xl bg-background/50 border border-border/50">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center space-x-2">
              <CreditCard className="w-6 h-6" />
              <span>选择支付方式</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card 
                className={`cursor-pointer transition-all duration-200 ${
                  selectedMethod === 'digital' 
                    ? 'bg-gradient-to-r from-blue-500/20 to-purple-600/20 border-blue-400' 
                    : 'backdrop-blur-xl bg-background/30 border border-border/30 hover:bg-background/50'
                }`}
                onClick={() => setSelectedMethod('digital')}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Wallet className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-foreground font-semibold mb-2">序列号</h3>
                  <p className="text-muted-foreground text-sm">推荐 • 零手续费</p>
                  <Badge className="mt-2 bg-green-500/20 text-green-400">实时到账</Badge>
                </CardContent>
              </Card>

              <Card className="backdrop-blur-xl bg-background/30 border border-border/30 opacity-50 cursor-not-allowed">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CreditCard className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-foreground font-semibold mb-2">银行卡</h3>
                  <p className="text-muted-foreground text-sm">即将开放</p>
                  <Badge variant="secondary" className="mt-2">暂不可用</Badge>
                </CardContent>
              </Card>

              <Card className="backdrop-blur-xl bg-background/30 border border-border/30 opacity-50 cursor-not-allowed">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <QrCode className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-foreground font-semibold mb-2">支付宝</h3>
                  <p className="text-muted-foreground text-sm">即将开放</p>
                  <Badge variant="secondary" className="mt-2">暂不可用</Badge>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="backdrop-blur-xl bg-background/50 border border-border/50">
            <CardHeader>
              <CardTitle className="text-foreground">序列号充值</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              <div>
                <label className="text-muted-foreground text-sm block mb-2">充值金额 (数字币)</label>
                <Input
                  type="number"
                  placeholder="请输入充值金额"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="bg-background/30 border-border text-foreground placeholder:text-muted-foreground"
                />
                <div className="grid grid-cols-3 gap-2 mt-3">
                  {quickAmounts.map((quickAmount) => (
                    <Button
                      key={quickAmount}
                      variant="outline"
                      size="sm"
                      onClick={() => setAmount(quickAmount.toString())}
                      className="border-border text-foreground hover:bg-muted"
                    >
                      {quickAmount}
                    </Button>
                  ))}
                </div>
              </div>

            
              <div>
                <label className="text-muted-foreground text-sm block mb-2">序列号</label>
                <div className="flex space-x-2">
                  <Input
                    value={rechargeAddress}
                    readOnly
                    className="bg-background/30 border-border text-foreground flex-1"
                  />
                  <Button
                    onClick={() => copyToClipboard(rechargeAddress)}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                  >
                    {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
                <p className="text-yellow-400 text-xs mt-2 flex items-center space-x-1">
                  <AlertCircle className="w-3 h-3" />
                  <span>请确保使用安全的网络</span>
                </p>
              </div>

             
              <div className="p-4 bg-background/30 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-muted-foreground">当前汇率</span>
                  <span className="text-foreground">1 数字币 = 7.2 CNY</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">预计到账</span>
                  <span className="text-green-400">
                    {amount ? (parseFloat(amount) * 7.2).toFixed(2) : "0.00"} CNY
                  </span>
                </div>
              </div>

              <Button 
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                disabled={!amount || parseFloat(amount) <= 0}
              >
                确认充值
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>

     
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="backdrop-blur-xl bg-background/50 border border-border/50">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center space-x-2">
                <Clock className="w-6 h-6" />
                <span>充值记录</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {rechargeHistory.map((record, index) => (
                  <motion.div
                    key={record.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    className="p-4 bg-background/30 rounded-lg border border-border/30"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-foreground font-medium">+{record.amount} USD</p>
                        <p className="text-muted-foreground text-sm">{record.method}</p>
                      </div>
                      {getStatusBadge(record.status)}
                    </div>
                    <div className="text-muted-foreground text-xs space-y-1">
                      <p>{record.time}</p>
                      <div className="flex items-center space-x-2">
                        <span>交易哈希:</span>
                        <code className="bg-background/50 px-2 py-1 rounded text-xs">
                          {record.txHash}
                        </code>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(record.txHash)}
                          className="p-1 h-auto text-muted-foreground hover:text-foreground"
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-6">
                <Button variant="outline" className="w-full border-border text-foreground hover:bg-muted">
                  查看更多记录
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
