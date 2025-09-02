"use client";

import { motion } from "framer-motion";
import { 
  User, 
  Mail, 
  Phone, 
  Edit3, 
  Shield, 
  Key,
  Bell,
  Globe,
  Smartphone,
  Calendar,
  MapPin
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function ProfilePage() {
  const userInfo = {
    username: "用户12345",
    email: "demo@example.com",
    phone: "+86 138****8888",
    avatar: "",
    joinDate: "2024-01-15",
    lastLogin: "2024-01-20 14:30:25",
    location: "香港东区",
    language: "简体中文",
    level: "ZETA",
    points: 2580
  };

  const securitySettings = [
    {
      id: 1,
      title: "登录密码",
      description: "用于账户登录的密码",
      status: "已设置",
      action: "修改"
    },
    {
      id: 2,
      title: "联系方式验证",
      description: "绑定联系方式用于安全验证",
      status: "已绑定",
      action: "更换"
    },
    {
      id: 3,
      title: "电子邮箱验证",
      description: "绑定电子邮箱用于重要通知",
      status: "已绑定",
      action: "更换"
    },
    {
      id: 4,
      title: "两步验证",
      description: "开启两步验证提升账户安全",
      status: "未开启",
      action: "设置"
    }
  ];

  const notificationSettings = [
    {
      id: 1,
      title: "短信通知",
      description: "新消息和重要通知",
      enabled: true
    },
    {
      id: 2,
      title: "邮件通知",
      description: "账户变动和安全提醒",
      enabled: true
    },
    {
      id: 3,
      title: "系统推送",
      description: "服务更新和优惠活动",
      enabled: false
    }
  ];

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
              <User className="w-6 h-6" />
              <span>个人信息</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start space-x-6">
              <Avatar className="w-24 h-24">
                <AvatarImage src={userInfo.avatar} />
                <AvatarFallback className="text-2xl bg-primary/20 text-primary">
                  {userInfo.username.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-muted-foreground text-sm block mb-1">用户名</label>
                    <div className="flex space-x-2">
                      <Input
                        value={userInfo.username}
                        readOnly
                        className="bg-background/30 border-border text-foreground"
                      />
                      <Button variant="outline" size="sm" className="border-border hover:bg-muted">
                        <Edit3 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-muted-foreground text-sm block mb-1">等级</label>
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-600 dark:text-yellow-400 border border-yellow-500/30">
                        {userInfo.level}
                      </Badge>
                      <span className="text-muted-foreground text-sm">{userInfo.points} 积分</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-muted-foreground text-sm block mb-1">电子邮箱</label>
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span className="text-foreground">{userInfo.email}</span>
                      <Badge variant="secondary" className="text-xs">已验证</Badge>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-muted-foreground text-sm block mb-1">手机号</label>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span className="text-foreground">{userInfo.phone}</span>
                      <Badge variant="secondary" className="text-xs">已绑定</Badge>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-muted-foreground text-xs">注册时间</p>
                      <p className="text-foreground text-sm">{userInfo.joinDate}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-muted-foreground text-xs">所在地区</p>
                      <p className="text-foreground text-sm">{userInfo.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Globe className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-muted-foreground text-xs">语言</p>
                      <p className="text-foreground text-sm">{userInfo.language}</p>
                    </div>
                  </div>
                </div>
              </div>
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
              <CardTitle className="text-foreground flex items-center space-x-2">
                <Shield className="w-6 h-6" />
                <span>安全设置</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {securitySettings.map((setting, index) => (
                  <motion.div
                    key={setting.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    className="p-4 bg-background/30 rounded-lg border border-border/30"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <Key className="w-4 h-4 text-muted-foreground" />
                          <h4 className="text-foreground font-medium">{setting.title}</h4>
                        </div>
                        <p className="text-muted-foreground text-sm">{setting.description}</p>
                        <div className="mt-2">
                          <Badge 
                            variant={setting.status === "未开启" ? "destructive" : "secondary"}
                            className="text-xs"
                          >
                            {setting.status}
                          </Badge>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="border-border hover:bg-muted">
                        {setting.action}
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
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
                <Bell className="w-6 h-6" />
                <span>通知设置</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notificationSettings.map((setting, index) => (
                  <motion.div
                    key={setting.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    className="p-4 bg-background/30 rounded-lg border border-border/30"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-foreground font-medium">{setting.title}</h4>
                        <p className="text-muted-foreground text-sm">{setting.description}</p>
                      </div>
                      <Button
                        variant={setting.enabled ? "default" : "outline"}
                        size="sm"
                        className={setting.enabled ? "bg-primary text-primary-foreground" : "border-border"}
                      >
                        {setting.enabled ? "已开启" : "已关闭"}
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Smartphone className="w-4 h-4 text-muted-foreground" />
                  <span className="text-foreground text-sm font-medium">最后登录</span>
                </div>
                <p className="text-muted-foreground text-sm">{userInfo.lastLogin}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
