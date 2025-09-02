"use client";

import { motion } from "framer-motion";
import { 
  History, 
  Search, 
  Download, 
  CheckCircle,
  XCircle,
  Clock,
  Phone,
  MessageSquare,
  Calendar
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function HistoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const historyData = [
    {
      id: "SVC001",
      service: "邮箱服务",
      phoneNumber: "+86 138****8888",
      message: "邮箱服务搭建",
      code: "123456",
      status: "completed",
      amount: 9125.50,
      time: "2024-01-20 14:30:25",
      duration: "52分18秒"
    },
    {
      id: "SVC002",
      service: "社交平台",
      phoneNumber: "+86 139****9999",
      message: "社交平台操作",
      code: "789012",
      status: "completed",
      amount: 118.00,
      time: "2024-01-20 12:15:10",
      duration: "16分45秒"
    },
    {
      id: "SVC003",
      service: "软件测试",
      phoneNumber: "+86 137****7777",
      message: "软件测试服务",
      code: "456789",
      status: "completed", 
      amount: 5022.00,
      time: "2024-01-20 10:45:32",
      duration: "32分02秒"
    },
    {
      id: "SVC004",
      service: "服务器修复",
      phoneNumber: "+86 136****6666",
      message: "服务器修复服务",
      code: "321654",
      status: "failed",
      amount: 50000.00,
      time: "2024-01-19 18:20:15",
      duration: "超时"
    },
    {
      id: "SVC005",
      service: "环境搭建",
      phoneNumber: "+86 135****5555",
      message: "环境搭建服务",
      code: "987654",
      status: "completed",
      amount: 2500.50,
      time: "2024-01-19 16:10:42",
      duration: "30分30秒"
    }
  ];

  const stats = {
    totalCount: 128,
    successCount: 115,
    failCount: 13,
    totalAmount: 2847.50
  };

  const filters = [
    { id: "all", label: "全部", count: stats.totalCount },
    { id: "completed", label: "成功", count: stats.successCount },
    { id: "failed", label: "失败", count: stats.failCount },
    { id: "pending", label: "进行中", count: 0 }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-500/20 text-green-400 border border-green-500/30">成功</Badge>;
      case 'failed':
        return <Badge className="bg-red-500/20 text-red-400 border border-red-500/30">失败</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">进行中</Badge>;
      default:
        return <Badge variant="secondary">未知</Badge>;
    }
  };

  const filteredData = historyData.filter(item => {
    const matchesSearch = item.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.phoneNumber.includes(searchTerm) ||
                         item.code.includes(searchTerm);
    const matchesFilter = selectedFilter === "all" || item.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="mb-15 max-w-7xl mx-auto space-y-6">
      
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
                  <p className="text-muted-foreground text-sm">总请求次数</p>
                  <h3 className="text-foreground text-2xl font-bold">{stats.totalCount}</h3>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <History className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-xl bg-background/50 border border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">有效次数</p>
                  <h3 className="text-foreground text-2xl font-bold">{stats.successCount}</h3>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-xl bg-background/50 border border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">无效次数</p>
                  <h3 className="text-foreground text-2xl font-bold">{stats.failCount}</h3>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center">
                  <XCircle className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-xl bg-background/50 border border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">总花费</p>
                  <h3 className="text-foreground text-2xl font-bold">¥{stats.totalAmount}</h3>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
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
      >
        <Card className="backdrop-blur-xl bg-background/50 border border-border/50">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="搜索服务名称、联系方式或识别码..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-background/30 border-border text-foreground placeholder:text-muted-foreground"
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  {filters.map((filter) => (
                    <Button
                      key={filter.id}
                      variant={selectedFilter === filter.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedFilter(filter.id)}
                      className={selectedFilter === filter.id 
                        ? "bg-primary text-primary-foreground" 
                        : "border-border text-foreground hover:bg-muted"
                      }
                    >
                      {filter.label} ({filter.count})
                    </Button>
                  ))}
                </div>
                
            
              </div>
            </div>
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
              <MessageSquare className="w-6 h-6" />
              <span>支援记录</span>
              <Badge variant="secondary" className="ml-2">
                {filteredData.length} 条记录
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {paginatedData.map((record, index) => (
                <motion.div
                  key={record.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 * index }}
                  className="p-4 rounded-lg bg-background/30 border border-border/30 hover:bg-background/50 transition-all duration-200"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl"></div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="text-foreground font-semibold">{record.service}</h4>
                          {getStatusBadge(record.status)}
                        </div>
                        <div className="flex items-center space-x-4 mt-1">
                          <div className="flex items-center space-x-1 text-muted-foreground text-sm">
                            <Phone className="w-3 h-3" />
                            <span>{record.phoneNumber}</span>
                          </div>
                          <div className="flex items-center space-x-1 text-muted-foreground text-sm">
                            <Clock className="w-3 h-3" />
                            <span>{record.duration}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-foreground font-bold">¥{record.amount.toFixed(2)}</div>
                      <div className="text-muted-foreground text-xs">{record.time}</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="p-3 bg-background/50 rounded-lg">
                      <p className="text-muted-foreground text-sm mb-1">备注:</p>
                      <p className="text-foreground text-sm">{record.message}</p>
                    </div>
                    
                    {record.code && (
                      <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg border border-green-500/20">
                        <div>
                          <p className="text-muted-foreground text-xs">支援识别码</p>
                          <p className="text-foreground font-mono text-lg font-bold">{record.code}</p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigator.clipboard.writeText(record.code)}
                          className="border-border text-foreground hover:bg-muted"
                        >
                          复制
                        </Button>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
            
           
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2 mt-6">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="border-border text-foreground hover:bg-muted"
                >
                  上一页
                </Button>
                
                <div className="flex space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className={currentPage === page 
                        ? "bg-primary text-primary-foreground" 
                        : "border-border text-foreground hover:bg-muted"
                      }
                    >
                      {page}
                    </Button>
                  ))}
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="border-border text-foreground hover:bg-muted"
                >
                  下一页
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
