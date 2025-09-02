"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Github, 
  Star, 
  GitFork, 
  ExternalLink, 
  Code, 
  Heart, 
  Sparkles,
  Palette,
  Zap,
  Shield,
  Users,
  Coffee,
  Play,
  RefreshCw
} from "lucide-react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface GitHubRepoData {
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
  description: string;
  topics: string[];
  open_issues_count: number;
  size: number;
  default_branch: string;
  license?: {
    name: string;
    spdx_id: string;
  };
}

export function AboutPage() {
  const [repoStats, setRepoStats] = useState({
    stars: 0,
    forks: 0,
    language: "TypeScript",
    lastUpdate: "2025-01-01",
    description: "",
    topics: [] as string[],
    openIssues: 0,
    size: 0,
    license: "Appache-2.0"
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRepoData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/github', {
        method: 'GET',
        cache: 'no-cache'
      });

      console.log('API 响应状态:', response.status, response.statusText);

      if (!response.ok) {
        const errorData = await response.json();
       
        throw new Error(errorData.error || `API 请求失败: ${response.status}`);
      }

      const result = await response.json();
    
      
      if (!result.success) {
        throw new Error(result.error || '获取数据失败');
      }

      const data = result.data;
      
      setRepoStats({
        stars: data.stargazers_count || 0,
        forks: data.forks_count || 0,
        language: data.language || "TypeScript",
        lastUpdate: data.updated_at ? new Date(data.updated_at).toLocaleDateString('zh-CN') : new Date().toLocaleDateString('zh-CN'),
        description: data.description || "一个优雅而强大的开发模板",
        topics: data.topics || ["nextjs", "typescript", "react", "tailwindcss"],
        openIssues: data.open_issues_count || 0,
        size: data.size ? Math.round(data.size / 1024) : 0,
        license: "Appache-2.0"
      });
      
      
    } catch (err) {
    
      let errorMessage = '获取数据失败';
      if (err instanceof Error) {
        errorMessage = err.message;
      } else if (typeof err === 'string') {
        errorMessage = err;
      }
      
      setError(errorMessage);
      
      setRepoStats({
        stars: 0,
        forks: 0,
        language: "TypeScript",
        lastUpdate: new Date().toLocaleDateString('zh-CN'),
        description: "一个优雅而强大的开发模板",
        topics: ["nextjs", "typescript", "react", "tailwindcss"],
        openIssues: 0,
        size: 0,
        license: "Appache-2.0"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRepoData();
  }, []);

  const handleRefresh = () => {
    fetchRepoData();
  };

  const techStack = [
    { name: "React", color: "bg-blue-500 text-white", iconUrl: "https://techstack-generator.vercel.app/react-icon.svg" },
    { name: "TypeScript", color: "bg-blue-600 text-white", iconUrl: "https://skillicons.dev/icons?i=typescript" },
    { name: "JavaScript", color: "bg-yellow-500 text-black", iconUrl: "https://techstack-generator.vercel.app/js-icon.svg" },
    { name: "Next.JS", color: "bg-black text-white", iconUrl: "https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/next_js.png" },
    { name: "C++", color: "bg-blue-700 text-white", iconUrl: "https://techstack-generator.vercel.app/cpp-icon.svg" },
    { name: "MySQL", color: "bg-orange-600 text-white", iconUrl: "https://techstack-generator.vercel.app/mysql-icon.svg" },
    { name: "C#", color: "bg-purple-600 text-white", iconUrl: "https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/c%23.png" },
    { name: "Git", color: "bg-red-600 text-white", iconUrl: "https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/git.png" },
    { name: "HTML5", color: "bg-orange-500 text-white", iconUrl: "https://skillicons.dev/icons?i=html" },
    { name: "CSS", color: "bg-blue-400 text-white", iconUrl: "https://skillicons.dev/icons?i=css" },
    { name: "Node.JS", color: "bg-green-600 text-white", iconUrl: "https://skillicons.dev/icons?i=nodejs" },
    { name: "Electron", color: "bg-teal-600 text-white", iconUrl: "https://skillicons.dev/icons?i=electron" },
    { name: "CloudFlare", color: "bg-orange-400 text-white", iconUrl: "https://skillicons.dev/icons?i=cloudflare" },
    { name: "Docker", color: "bg-blue-600 text-white", iconUrl: "https://techstack-generator.vercel.app/docker-icon.svg" },
    { name: "Flutter", color: "bg-sky-500 text-white", iconUrl: "https://skillicons.dev/icons?i=flutter" },
    { name: "Dart", color: "bg-blue-400 text-white", iconUrl: "https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/dart.png" },
    { name: "Nginx", color: "bg-green-700 text-white", iconUrl: "https://techstack-generator.vercel.app/nginx-icon.svg" },
    { name: "Postgres", color: "bg-blue-800 text-white", iconUrl: "https://skillicons.dev/icons?i=postgres" },
    { name: "Obsidian", color: "bg-purple-700 text-white", iconUrl: "https://skillicons.dev/icons?i=obsidian" },
    { name: "Swift", color: "bg-orange-400 text-white", iconUrl: "https://techstack-generator.vercel.app/swift-icon.svg" },
    { name: "Tailwind", color: "bg-sky-400 text-white", iconUrl: "https://skillicons.dev/icons?i=tailwind" },
  ];

  const features = [
    {
      icon: Palette,
      title: "优雅设计",
      description: "浮冰般优雅的UI设计，支持深色/浅色主题切换",
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: Zap,
      title: "极速体验",
      description: "基于Next.js 15和Turbopack的超快开发体验",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: Shield,
      title: "类型安全",
      description: "完整的TypeScript支持，确保代码质量",
      color: "from-blue-500 to-indigo-500"
    },
    {
      icon: Sparkles,
      title: "动画效果",
      description: "流畅的Framer Motion动画，提升用户体验",
      color: "from-purple-500 to-violet-500"
    }
  ];

  return (
    <div className="space-y-8">
      <div className="max-w-6xl mx-auto space-y-8">
       
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center py-12"
        >
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full blur-lg opacity-30 animate-pulse"></div>
            <div className="relative">
              <Image
                src="https://img.kuaz.net/app/hide.php?key=UzUzdnMva2J1eWo4VS9tVm5oaUh2S0JVZFJSMkdad0M="
                className="w-24 h-24 rounded-2xl object-cover shadow-2xl ring-4 ring-white/20"
                alt="Floe Ice Logo"
                width={96}
                height={96}
              />
            </div>
          </div>
          <h1 className="text-5xl p-5 font-bold bg-gradient-to-r from-pink-400 via-rose-500 to-pink-600 bg-clip-text text-transparent mb-4 animate-pulse">
            𝕱𝖑𝖔𝖊 𝖎𝖈𝖊
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            一个优雅而强大的开发模板，采用最新的Web技术栈构建，
            为开发者提供流畅、美观、高效的开发体验。
            
          </p>
        </motion.div>

       
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Card className="backdrop-blur-xl bg-background/50 border border-border/50 shadow-xl h-full">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center space-x-2">
                  <Users className="w-6 h-6" />
                  <span>开发者信息</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full blur opacity-20"></div>
                    <Image
                      src="https://avatars.githubusercontent.com/u/53825298?v=4"
                      className="relative w-20 h-20 rounded-full object-cover ring-4 ring-white/20"
                      alt="RainNight-PrincessHighness"
                      width={80}
                      height={80}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-foreground">RainNight-PrincessHighness</h3>
                    <p className="text-muted-foreground">全栈开发工程师</p>
                    <p className="text-muted-foreground text-sm mt-1">
                      专注于现代化Web应用开发，热衷于创造优雅的用户体验
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-foreground border border-blue-500/30">
                    <Code className="w-3 h-3 mr-1" />
                    TypeScript
                  </Badge>
                  <Badge variant="secondary" className="bg-gradient-to-r from-green-500/20 to-blue-500/20 text-foreground border border-green-500/30">
                    <Heart className="w-3 h-3 mr-1" />
                    React
                  </Badge>
                  <Badge variant="secondary" className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-foreground border border-purple-500/30">
                    <Coffee className="w-3 h-3 mr-1" />
                    咖啡爱好者
                  </Badge>
                </div>
                <h1 className="text-center text-8xl">
                    &#62;&gt; &#94; &#60;&lt;
                </h1>
              
                <Button 
                  className="w-full bg-gradient-to-r from-gray-900 to-gray-700 hover:from-gray-800 hover:to-gray-600 text-white border-0"
                  onClick={() => window.open('https://github.com/RainNight-PrincessHighness', '_blank')}
                >
                  <Github className="w-4 h-4 mr-2" />
                  访问 GitHub 主页
                  <ExternalLink className="w-3 h-3 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Card className="backdrop-blur-xl bg-background/50 border border-border/50 shadow-xl h-full">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Github className="w-6 h-6" />
                    <span>项目信息</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleRefresh}
                    disabled={loading}
                    className="h-8 w-8 p-0"
                  >
                    <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {loading ? (
                  <div className="text-center py-8">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    <p className="text-muted-foreground mt-2">正在获取项目数据...</p>
                  </div>
                ) : error ? (
                  <div className="text-center py-6 space-y-3">
                    <div className="text-red-500 text-sm mb-2">⚠️ {error}</div>
                    {error.includes('仓库未找到') && (
                      <div className="text-muted-foreground text-xs space-y-2">
                        <p>该项目尚未推送到 GitHub</p>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open('https://github.com/new', '_blank')}
                          className="text-xs"
                        >
                          创建 GitHub 仓库
                        </Button>
                      </div>
                    )}
                    <p className="text-muted-foreground text-xs">显示默认数据</p>
                  </div>
                ) : null}
                
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center p-3 rounded-lg bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20">
                    <Star className="w-6 h-6 mx-auto mb-1 text-yellow-500" />
                    <div className="text-xl font-bold text-foreground">{repoStats.stars}</div>
                    <div className="text-xs text-muted-foreground">Stars</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/20">
                    <GitFork className="w-6 h-6 mx-auto mb-1 text-blue-500" />
                    <div className="text-xl font-bold text-foreground">{repoStats.forks}</div>
                    <div className="text-xs text-muted-foreground">Forks</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20">
                    <Play className="w-6 h-6 mx-auto mb-1 text-green-500" />
                    <div className="text-xl font-bold text-foreground">{repoStats.openIssues}</div>
                    <div className="text-xs text-muted-foreground">Issues</div>
                  </div>
                </div>
                
                {repoStats.description && (
                  <div className="p-3 rounded-lg bg-muted/30 border border-border/50">
                    <p className="text-sm text-muted-foreground text-center">
                      {repoStats.description}
                    </p>
                  </div>
                )}
                
                {repoStats.topics.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-sm text-muted-foreground">项目标签</span>
                    <div className="flex flex-wrap gap-1">
                      {repoStats.topics.slice(0, 6).map((topic) => (
                        <Badge key={topic} variant="secondary" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">主要语言</span>
                    <Badge className="bg-blue-600 text-white">{repoStats.language}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">最后更新</span>
                    <span className="text-foreground font-medium">{repoStats.lastUpdate}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">开源协议</span>
                    <Badge variant="outline">{repoStats.license}</Badge>
                  </div>
                  {repoStats.size > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">项目大小</span>
                      <span className="text-foreground font-medium">{repoStats.size} MB</span>
                    </div>
                  )}
                </div>

                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0"
                  onClick={() => window.open('https://github.com/RainNight-PrincessHighness/floe-ice', '_blank')}
                >
                  <Github className="w-4 h-4 mr-2" />
                  查看源代码
                  <ExternalLink className="w-3 h-3 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

       <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.6 }}
                  className="w-full"
                >
                  <Card className="mb-11 backdrop-blur-sm bg-background/80 border-border/50 hover:bg-background/90 transition-all duration-300">
                    <CardHeader className="text-center">
                      <CardTitle className="text-foreground flex items-center justify-center space-x-2">
                        <Play className="w-6 h-6 text-pink-500" />
                        <span>关注我的哔哩哔哩</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-muted-foreground mb-6">
                        在哔哩哔哩上关注我，获取更多技术分享和项目更新喵！
                        &#62;&gt; &#94; &#60;&lt;
                      </p>
                      <div className="flex justify-center">
                        <Button 
                          size="lg"
                          className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white"
                          onClick={() => window.open('https://space.bilibili.com/296540216', '_blank')}
                        >
                          <Play className="w-5 h-5 mr-2" />
                          关注 UP 主
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Card className="backdrop-blur-xl bg-background/50 border border-border/50 shadow-xl">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center space-x-2">
                <Code className="w-6 h-6" />
                <span>技术栈</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {techStack.map((tech, index) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.05, duration: 0.3 }}
                    whileHover={{ scale: 1.05 }}
                    className="group"
                  >
                    <div className={`${tech.color} rounded-lg p-3 text-center transition-all duration-300 group-hover:shadow-lg group-hover:shadow-current/20`}>
                      <div className="text-xl mb-1">
                        <Image 
                          src={tech.iconUrl} 
                          alt={tech.name} 
                          className="w-6 h-6 mx-auto" 
                          width={24}
                          height={24}
                          loading="lazy"
                        />
                      </div>
                      <div className="font-semibold text-xs">{tech.name}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

      
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Card className="backdrop-blur-xl bg-background/50 border border-border/50 shadow-xl">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center space-x-2">
                <Sparkles className="w-6 h-6" />
                <span>项目特色</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.02 }}
                    className="group"
                  >
                    <div className="p-6 rounded-lg bg-gradient-to-br from-white/5 to-white/10 border border-white/10 backdrop-blur-sm transition-all duration-300 group-hover:from-white/10 group-hover:to-white/20">
                      <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${feature.color} mb-4`}>
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center py-12"
        >
          <Card className="backdrop-blur-xl bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-blue-500/10 border border-purple-500/20 shadow-xl">
            <CardContent className="p-8">
              <div className="text-4xl mb-4">❤️</div>
              <h2 className="text-2xl font-bold text-foreground mb-4">感谢您的关注</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-6">
                这个项目凝聚了对美好开发体验的追求和对技术的热爱。
                如果您喜欢这个项目，欢迎给个 Star ⭐️
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white border-0"
                  onClick={() => window.open('https://github.com/RainNight-PrincessHighness/floe-ice', '_blank')}
                >
                  <Star className="w-5 h-5 mr-2" />
                  给个 Star
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-purple-500/30 text-foreground hover:bg-purple-500/10"
                  onClick={() => window.open('https://github.com/RainNight-PrincessHighness/floe-ice/fork', '_blank')}
                >
                  <GitFork className="w-5 h-5 mr-2" />
                  Fork 项目
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
      </div>
    </div>
  );
}
