"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Globe, Zap, Clock, MessageSquare, Copy, Activity } from "lucide-react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TopNav, type Page } from "@/components/ui/top-nav";
import { ThemeProvider, useTheme } from "@/components/theme-provider";
import { ProfilePage } from "@/components/pages/profile-page";
import { WalletPage } from "@/components/pages/wallet-page";
import { RechargePage } from "@/components/pages/recharge-page";
import { HistoryPage } from "@/components/pages/history-page";
import { AboutPage } from "@/components/pages/about-page";

function HomePage({ setBalance }: { setBalance: (value: (prev: number) => number) => void }) {
  const [selectedService, setSelectedService] = useState("");
  const [activeServices, setActiveServices] = useState<Array<{
    id: string;
    name: string;
    service: string;
    status: string;
    timeLeft: number;
    usage: number;
  }>>([]);
  const [notifications, setNotifications] = useState<Array<{
    id: string;
    service: string;
    content: string;
    time: string;
    type: string;
  }>>([]);
  const [logs, setLogs] = useState<string[]>([]);
  const [services, setServices] = useState<Array<{
    id: string;
    name: string;
    icon: string;
    price: number;
    color: string;
    description: string;
    features: string[];
  }>>([]);
  const [isActivating, setIsActivating] = useState(false);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const mockServices = [
          { 
            id: "security", 
            name: "安全防护", 
            icon: "🛡️", 
            price: 29999.9, 
            description: "企业级安全防护解决方案",
            features: ["实时威胁检测", "数据加密", "安全审计"]
          },
          { 
            id: "cloud", 
            name: "云存储", 
            icon: "☁️", 
            price: 1999.9, 
            description: "高性能云存储服务",
            features: ["无限容量", "自动备份", "多端同步"]
          },
          { 
            id: "global", 
            name: "全球网络", 
            icon: "🌐", 
            price: 3999.9, 
            description: "全球CDN加速网络",
            features: ["全球节点", "智能路由", "低延迟"]
          },
          { 
            id: "performance", 
            name: "性能优化", 
            icon: "⚡", 
            price: 2499.9, 
            description: "系统性能优化套件",
            features: ["自动优化", "实时监控", "资源管理"]
          }
        ];
        
        const servicesWithColor = mockServices.map((service) => ({
          ...service,
          color: getServiceColor(service.id)
        }));
        setServices(servicesWithColor);
      } catch (error) {
        console.error('Failed to load services:', error);
      }
    };
    loadServices();
  }, []);

  const getServiceColor = (serviceId: string) => {
    const colors: Record<string, string> = {
      security: "bg-blue-500/20 border-blue-500/30",
      cloud: "bg-purple-500/20 border-purple-500/30", 
      global: "bg-green-500/20 border-green-500/30",
      performance: "bg-orange-500/20 border-orange-500/30"
    };
    return colors[serviceId] || "bg-gray-500/20 border-gray-500/30";
  };

  useEffect(() => {
    const updateData = async () => {
      try {
        setBalance((prev) => prev);
        
        const mockActiveServices = [
          {
            id: "svc001",
            name: "安全防护 Pro",
            service: "security",
            status: "active",
            timeLeft: 86400,
            usage: 75
          }
        ];
        setActiveServices(mockActiveServices);

        const mockNotifications = [
          {
            id: "notif1",
            service: "安全防护",
            content: "检测到3个潜在威胁，已自动拦截",
            time: new Date().toLocaleTimeString(),
            type: "security"
          },
          {
            id: "notif2", 
            service: "云存储",
            content: "数据备份完成，共同步 1.2GB 文件",
            time: new Date().toLocaleTimeString(),
            type: "success"
          }
        ];
        setNotifications(mockNotifications);
      } catch (error) {
        console.error('Failed to update data:', error);
      }
    };

    updateData();
    const interval = setInterval(updateData, 5000);
    return () => clearInterval(interval);
  }, [setBalance]);

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [`[${timestamp}] ${message}`, ...prev.slice(0, 9)]);
  };

  const activateService = async () => {
    if (!selectedService || isActivating) {
      return;
    }

    setIsActivating(true);
    try {
      const selectedSvc = services.find(s => s.id === selectedService);
      if (selectedSvc) {
        addLog(`✅ 成功激活 ${selectedSvc.name} 服务`);
        setBalance(prev => prev - selectedSvc.price);
        
        const newActiveService = {
          id: `svc${Date.now()}`,
          name: selectedSvc.name + " Pro",
          service: selectedSvc.id,
          status: "active",
          timeLeft: 30 * 24 * 3600,
          usage: 0
        };
        setActiveServices(prev => [...prev, newActiveService]);
      }
    } catch (error) {
      console.error('Failed to activate service:', error);
      addLog('❌ 服务激活失败，请重试');
    } finally {
      setIsActivating(false);
    }
  };

  const copyNotification = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      addLog(`📋 已复制通知: ${content}`);
    } catch {
      addLog("❌ 复制失败");
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveServices(prev => 
        prev.map(service => ({
          ...service,
          timeLeft: Math.max(0, service.timeLeft - 1),
          status: service.timeLeft <= 1 ? "expired" : service.status
        })).filter(service => service.timeLeft > 0)
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (days > 0) return `${days}天${hours}小时`;
    if (hours > 0) return `${hours}小时${minutes}分钟`;
    return `${minutes}分钟`;
  };

  return (
    <div className="space-y-6">
      <div className="mb-15 max-w-7xl mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center py-8"
        >
          <h1 className="text-4xl font-bold text-foreground mb-4">
            专业数字服务平台
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            提供企业级安全防护、云存储、全球网络加速等一站式数字化解决方案
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <Card className="backdrop-blur-xl bg-background/50 border border-border/50 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-foreground flex items-center space-x-2">
                    <Shield className="w-6 h-6" />
                    <span>选择服务套餐</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <AnimatePresence>
                      {services.map((service, idx) => (
                        <motion.div
                          key={service.id}
                          initial={{ opacity: 0, y: 32 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 32 }}
                          transition={{ duration: 0.35, delay: idx * 0.08 }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Card 
                            className={`cursor-pointer transition-all duration-300 backdrop-blur-xl border h-full ${
                              selectedService === service.id 
                                ? `${service.color} shadow-lg` 
                                : "bg-white/5 dark:bg-white/5 border-white/20 hover:bg-white/10 dark:hover:bg-white/10"
                            }`}
                            onClick={() => setSelectedService(service.id)}
                          >
                            <CardContent className="p-6">
                              <div className="flex items-start justify-between mb-4">
                                <div className="text-4xl">{service.icon}</div>
                                <Badge className="bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 border border-yellow-500/30">
                                  ¥{service.price}/月
                                </Badge>
                              </div>
                              
                              <h3 className="text-foreground font-semibold text-lg mb-2">{service.name}</h3>
                              <p className="text-muted-foreground text-sm mb-4">{service.description}</p>
                              
                              <div className="space-y-2">
                                {service.features.map((feature, index) => (
                                  <div key={index} className="flex items-center space-x-2">
                                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                                    <span className="text-muted-foreground text-sm">{feature}</span>
                                  </div>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                  
                  <div className="mt-6">
                    <Button 
                      onClick={activateService}
                      disabled={!selectedService || isActivating}
                      className="w-full backdrop-blur-xl bg-primary/80 hover:bg-primary/90 text-primary-foreground border border-primary/20 shadow-lg transition-all duration-300 disabled:opacity-50"
                    >
                      <Activity className="w-4 h-4 mr-2" />
                      {isActivating ? '激活中...' : '立即激活服务'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Card className="backdrop-blur-xl bg-background/50 border border-border/50 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-foreground flex items-center space-x-2">
                    <Clock className="w-6 h-6" />
                    <span>活跃服务</span>
                    <Badge variant="secondary">{activeServices.length}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {activeServices.length === 0 ? (
                    <div className="text-center py-8">
                      <div className="text-muted-foreground text-6xl mb-4">🚀</div>
                      <p className="text-muted-foreground">暂无活跃的服务</p>
                      <p className="text-muted-foreground text-sm mt-2">选择上方服务开始体验</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {activeServices.map((service) => (
                        <motion.div
                          key={service.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className="p-4 rounded-lg bg-background/30 border border-border/30"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                                <Activity className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <p className="text-foreground font-medium">{service.name}</p>
                                <p className="text-muted-foreground text-sm">运行状态良好</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <Badge className="bg-green-500/20 text-green-400 border border-green-500/30 mb-1">
                                {service.status === 'active' ? '运行中' : '已停止'}
                              </Badge>
                              <div className="text-muted-foreground text-xs">
                                使用率: {service.usage}%
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground text-sm">剩余时间</span>
                            <span className="text-foreground font-medium">{formatTime(service.timeLeft)}</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <Card className="backdrop-blur-xl bg-background/50 border border-border/50 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-foreground flex items-center space-x-2">
                    <MessageSquare className="w-6 h-6" />
                    <span>系统通知</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="text-center py-8">
                        <div className="text-muted-foreground text-4xl mb-3">🔔</div>
                        <p className="text-muted-foreground text-sm">暂无系统通知</p>
                      </div>
                    ) : (
                      notifications.map((notification) => (
                        <motion.div
                          key={notification.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className="p-3 rounded-lg bg-background/30 border border-border/30"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <div className={`w-2 h-2 rounded-full ${
                                notification.type === 'security' ? 'bg-red-400' : 'bg-green-400'
                              }`}></div>
                              <span className="text-foreground font-medium text-sm">{notification.service}</span>
                            </div>
                            <span className="text-muted-foreground text-xs">{notification.time}</span>
                          </div>
                          <p className="text-muted-foreground text-sm mb-2">{notification.content}</p>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyNotification(notification.content)}
                            className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground"
                          >
                            <Copy className="w-3 h-3 mr-1" />
                            复制
                          </Button>
                        </motion.div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Card className="backdrop-blur-xl bg-background/50 border border-border/50 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-foreground text-lg">操作日志</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {logs.length === 0 ? (
                      <div className="text-center py-4">
                        <p className="text-muted-foreground text-sm">暂无操作记录</p>
                      </div>
                    ) : (
                      logs.map((log, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.2, delay: index * 0.05 }}
                          className="text-muted-foreground text-xs font-mono p-2 rounded bg-background/30 border border-border/30"
                        >
                          {log}
                        </motion.div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Card className="backdrop-blur-xl bg-background/50 border border-border/50 shadow-lg">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-foreground font-semibold">企业级安全</h3>
                    <p className="text-muted-foreground text-sm">银行级加密保护</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-foreground font-semibold">全球覆盖</h3>
                    <p className="text-muted-foreground text-sm">200+ 国家节点</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-foreground font-semibold">极速性能</h3>
                    <p className="text-muted-foreground text-sm">99.9% 可用性保障</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

export default function RootPage() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [balance, setBalance] = useState(1288.88);
  const { theme, setTheme } = useTheme();

  const renderPage = () => {
    switch (currentPage) {
      case 'profile':
        return <ProfilePage />;
      case 'wallet':
        return <WalletPage />;
      case 'recharge':
        return <RechargePage />;
      case 'history':
        return <HistoryPage />;
      case 'about':
        return <AboutPage />;
      default:
        return <HomePage setBalance={setBalance} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 transition-colors duration-500">
      <TopNav 
        currentPage={currentPage} 
        onPageChange={setCurrentPage} 
        balance={balance}
        theme={theme}
        onThemeChange={setTheme}
      />
      <main className="pt-28 pb-8 px-4">
        {renderPage()}
      </main>
      
      {/* Footer */}
      <div
        className="fixed left-1/2 bottom-6 -translate-x-1/2 z-40 px-6 py-2 rounded-2xl shadow-2xl backdrop-blur-xl bg-white/20 dark:bg-gray-900/20 border border-white/30 dark:border-gray-700/30 flex items-center space-x-2 text-sm text-foreground transition-transform duration-200 hover:scale-105"
        style={{ pointerEvents: 'auto', boxShadow: '0 2px 12px 0 rgba(0,0,0,0.10)' }}
      >
        <span className="font-bold tracking-wide">Floe ice</span>
        <span className="opacity-60">© {new Date().getFullYear()}</span>
        <a
          href="https://github.com/RainNight-PrincessHighness"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-4 flex items-center justify-center w-9 h-9 rounded-full border border-white/30 dark:border-gray-700/30 bg-white/60 dark:bg-gray-900/60 shadow hover:scale-110 transition-transform duration-200"
          title="RainNight-PrincessHighness on GitHub"
        >
          <Image
            src="https://avatars.githubusercontent.com/u/53825298?v=4"
            className="w-7 h-7 rounded-full object-cover"
            alt="GitHub Profile"
            width={28}
            height={28}
          />
        </a>
      </div>
    </div>
  );
}
