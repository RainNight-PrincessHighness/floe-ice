"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Menu, 
  X, 
  Home, 
  User, 
  Wallet, 
  CreditCard, 
  History, 
  Sun, 
  Moon, 
  Monitor,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

export type Theme = 'light' | 'dark' | 'system';
export type Page = 'home' | 'profile' | 'wallet' | 'recharge' | 'history' | 'about';

interface TopNavProps {
  currentPage: Page;
  onPageChange: (page: Page) => void;
  balance: number;
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
}

export function TopNav({ currentPage, onPageChange, balance, theme, onThemeChange }: TopNavProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // 检测屏幕尺寸
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1150);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const menuItems = [
    { id: 'home' as Page, label: '首页', icon: Home },
    { id: 'profile' as Page, label: '个人中心', icon: User },
    { id: 'wallet' as Page, label: '钱包', icon: Wallet },
    { id: 'recharge' as Page, label: '充值', icon: CreditCard },
    { id: 'history' as Page, label: '订单记录', icon: History },
    { id: 'about' as Page, label: '关于', icon: Info },
  ];

  const themeOptions = [
    { value: 'light' as Theme, label: '浅色', icon: Sun },
    { value: 'dark' as Theme, label: '深色', icon: Moon },
    { value: 'system' as Theme, label: '跟随系统', icon: Monitor },
  ];

  const getCurrentThemeIcon = () => {
    switch (theme) {
      case 'light': return Sun;
      case 'dark': return Moon;
      default: return Monitor;
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-4 left-10 right-10 z-50 transition-transform duration-200 hover:scale-105"
    >
      <div className="backdrop-blur-xl bg-white/20 dark:bg-gray-900/20 rounded-2xl shadow-2xl px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo 区域 */}
          <div className="flex items-center space-x-3">
            <div className="p-2">
              <Image
                src="https://img.kuaz.net/app/hide.php?key=Nk9LbDZDVVhNN2ZZbk1uc1ZOcXZaVE5sbndWSzZEVnQ="
                className="rounded-2xl object-cover shadow-2xl ring-4 ring-white/20"
                alt="Luminous"
                width={48}
                height={48}
              />

            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-foreground">
                𝕱𝖑𝖔𝖊 𝖎𝖈𝖊
              </h1>
            </div>
          </div>

          {/* 桌面端菜单 */}
          {!isMobile && (
            <div className="flex items-center space-x-1">
              {menuItems.map((item) => (
                <Button
                  key={item.id}
                  variant={currentPage === item.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => onPageChange(item.id)}
                  className={`flex items-center space-x-2 transition-all duration-200 transform hover:scale-105 active:scale-100 ${
                    currentPage === item.id
                      ? "bg-primary/80 text-primary-foreground shadow-md backdrop-blur-sm"
                      : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Button>
              ))}
            </div>
          )}

      
          <div className="flex items-center space-x-3">
         
            <Badge variant="secondary" className="backdrop-blur-sm bg-green-500/20 text-green-600 dark:text-green-400 border border-green-500/30 px-3 py-1 hidden sm:block">
              ¥{balance.toFixed(2)}
            </Badge>

            {/* 主题切换 */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="p-2 hover:bg-muted/50 transition-all duration-200">
                  {(() => {
                    const Icon = getCurrentThemeIcon();
                    return <Icon className="w-4 h-4" />;
                  })()}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="backdrop-blur-xl bg-white/90 dark:bg-gray-900/90 border border-white/30 dark:border-gray-700/30">
                {themeOptions.map((option) => (
                  <DropdownMenuItem
                    key={option.value}
                    onClick={() => onThemeChange(option.value)}
                    className="flex items-center space-x-2"
                  >
                    <option.icon className="w-4 h-4" />
                    <span>{option.label}</span>
                    {theme === option.value && (
                      <Badge variant="secondary" className="ml-auto text-xs">当前</Badge>
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* 移动端菜单按钮 */}
            {isMobile && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            )}
          </div>
        </div>

        {/* 移动端下拉菜单 */}
        {isMobile && isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 pt-4 border-t border-white/20"
          >
            <div className="grid grid-cols-2 gap-2">
              {menuItems.map((item) => (
                <Button
                  key={item.id}
                  variant={currentPage === item.id ? "default" : "ghost"}
                  onClick={() => {
                    onPageChange(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`flex items-center space-x-2 justify-start ${
                    currentPage === item.id
                      ? "bg-primary/80 text-primary-foreground shadow-md backdrop-blur-sm"
                      : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="text-sm">{item.label}</span>
                </Button>
              ))}
            </div>
            
            {/* 移动端余额显示 */}
            <div className="mt-3 flex justify-center">
              <Badge variant="secondary" className="backdrop-blur-sm bg-green-100/50 text-green-700 px-3 py-1">
                余额: ¥{balance.toFixed(2)}
              </Badge>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
