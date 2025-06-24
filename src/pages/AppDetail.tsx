
import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useSite } from '@/contexts/SiteContext';
import { Download, Star, Shield, Zap, Users, ArrowRight, CheckCircle, Crown, Sparkles } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const AppDetail = () => {
  const { appId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { apps } = useSite();
  const [countdown, setCountdown] = useState(15);
  const [showDownload, setShowDownload] = useState(false);
  
  const app = apps.find(a => a.id === appId);
  const appName = location.state?.appName || app?.name || 'التطبيق';

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setShowDownload(true);
    }
  }, [countdown]);

  const progress = ((15 - countdown) / 15) * 100;

  const handleDownload = () => {
    if (app?.appFile) {
      // Create download link for uploaded file
      const url = URL.createObjectURL(app.appFile);
      const link = document.createElement('a');
      link.href = url;
      link.download = app.fileName || `${app.name}.apk`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } else if (app?.downloadUrl) {
      // Open external download link
      window.open(app.downloadUrl, '_blank');
    }
  };

  return (
    <div className="min-h-screen luxury-gradient relative overflow-hidden">
      {/* Animated Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="container mx-auto max-w-7xl p-4 sm:p-6 lg:p-8 relative z-10">
        {/* Back Button */}
        <div className="mb-6 sm:mb-8">
          <Button
            onClick={() => navigate('/apps')}
            variant="ghost"
            className="glass-effect text-white/90 hover:text-white border-white/20 hover:bg-white/10 transition-all duration-300 text-sm sm:text-base"
          >
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            العودة للتطبيقات
          </Button>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 mb-8 lg:mb-12">
          {/* App Info Card */}
          <Card className="luxury-card border-white/20 h-fit">
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-8 luxury-gradient rounded-full"></div>
                <h3 className="text-xl sm:text-2xl font-bold font-playfair text-white">معلومات التطبيق</h3>
                <Sparkles className="w-5 h-5 text-yellow-400" />
              </div>
              
              {/* App Icon and Title */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8">
                <div className="relative group">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 luxury-gradient rounded-3xl flex items-center justify-center shadow-2xl group-hover:shadow-purple-500/25 transition-all duration-300">
                    <Download className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-pulse">
                    <Crown className="w-3 h-3 text-white" />
                  </div>
                </div>
                
                <div className="text-center sm:text-right flex-1">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-playfair text-shimmer mb-3">{appName}</h1>
                  <div className="flex flex-wrap justify-center sm:justify-start items-center gap-4 text-sm">
                    <div className="flex items-center gap-2 text-yellow-400 bg-yellow-400/10 px-3 py-1 rounded-full">
                      <Star className="w-4 h-4 fill-current" />
                      <span>4.8 (2.1K مراجعة)</span>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full">
                      <Users className="w-4 h-4" />
                      <span>50K+ تحميل</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* App Description */}
              {app?.description && (
                <div className="mb-8 p-4 glass-effect rounded-2xl border border-white/10">
                  <h4 className="text-lg font-semibold text-white/90 mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    الوصف
                  </h4>
                  <p className="text-white/70 leading-relaxed text-sm sm:text-base">{app.description}</p>
                </div>
              )}

              {/* Features Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 text-emerald-400 p-3 glass-effect rounded-xl border border-emerald-400/20">
                  <Shield className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm font-medium">آمن 100%</span>
                </div>
                <div className="flex items-center gap-3 text-blue-400 p-3 glass-effect rounded-xl border border-blue-400/20">
                  <Zap className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm font-medium">سريع وخفيف</span>
                </div>
                <div className="flex items-center gap-3 text-purple-400 p-3 glass-effect rounded-xl border border-purple-400/20">
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm font-medium">مجاني بالكامل</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Download Section Card */}
          <Card className="luxury-card border-white/20">
            <CardContent className="p-6 sm:p-8 text-center min-h-[400px] flex flex-col justify-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-3 h-8 luxury-gradient rounded-full"></div>
                <h3 className="text-xl sm:text-2xl font-bold font-playfair text-white">تحميل التطبيق</h3>
                <Crown className="w-5 h-5 text-yellow-400" />
              </div>
              
              {!showDownload ? (
                <div className="space-y-8">
                  {/* Countdown Circle */}
                  <div className="relative w-32 h-32 sm:w-40 sm:h-40 mx-auto">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                      <circle
                        cx="60"
                        cy="60"
                        r="50"
                        stroke="white"
                        strokeOpacity="0.1"
                        strokeWidth="8"
                        fill="none"
                      />
                      <circle
                        cx="60"
                        cy="60"
                        r="50"
                        stroke="url(#gradient)"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 50}`}
                        strokeDashoffset={`${2 * Math.PI * 50 * (1 - progress / 100)}`}
                        className="transition-all duration-1000 ease-out"
                        strokeLinecap="round"
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#667eea" />
                          <stop offset="100%" stopColor="#764ba2" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl sm:text-4xl font-bold text-white font-playfair">{countdown}</span>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-full h-full border-4 border-white/20 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  
                  {/* Progress Info */}
                  <div className="space-y-4">
                    <p className="text-white/90 text-lg font-medium">🎯 جاري التحضير للتحميل...</p>
                    <div className="max-w-xs mx-auto">
                      <Progress value={progress} className="w-full h-3 bg-white/10" />
                    </div>
                    <p className="text-sm sm:text-base text-white/60">
                      ⏰ الرجاء الانتظار {countdown} ثانية للحصول على رابط التحميل الآمن
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  {/* Success Icon */}
                  <div className="relative mx-auto w-fit">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl animate-pulse-glow">
                      <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-bounce">
                      <Crown className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  
                  {/* Download Ready */}
                  <div className="space-y-6">
                    <h4 className="text-xl sm:text-2xl font-bold text-white font-playfair">🎉 جاهز للتحميل!</h4>
                    <p className="text-white/80 text-sm sm:text-base max-w-sm mx-auto">
                      {app?.appFile 
                        ? `📱 ملف التطبيق: ${app.fileName || app.name}`
                        : '🔗 سيتم توجيهك لرابط التحميل الآمن'
                      }
                    </p>
                    
                    <Button
                      onClick={handleDownload}
                      className="w-full max-w-sm mx-auto bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 hover:from-emerald-600 hover:via-blue-600 hover:to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-bold rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-white/20"
                    >
                      <Download className="w-5 h-5 sm:w-6 sm:h-6 mr-3" />
                      تحميل فوري
                    </Button>
                    
                    {app?.appFile && (
                      <p className="text-xs sm:text-sm text-white/50">
                        💾 حجم الملف: {(app.appFile.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* App Description Section */}
        <Card className="luxury-card border-white/20 mb-6 lg:mb-8">
          <CardContent className="p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-8 luxury-gradient rounded-full"></div>
              <h3 className="text-xl sm:text-2xl font-bold font-playfair text-white">وصف التطبيق التفصيلي</h3>
              <Sparkles className="w-5 h-5 text-blue-400" />
            </div>
            <div className="text-white/80 space-y-6 leading-relaxed text-sm sm:text-base">
              <div className="p-4 sm:p-6 glass-effect rounded-2xl border border-white/10">
                <p className="mb-4">
                  🌟 {appName} هو تطبيق مذهل ومفيد جداً يوفر لك تجربة استثنائية ومميزات رائعة لن تجدها في أي مكان آخر. 
                  تم تطوير هذا التطبيق بعناية فائقة واهتمام بأدق التفاصيل لضمان حصولك على أفضل تجربة ممكنة.
                </p>
                <p className="mb-4">
                  🚀 يتميز التطبيق بواجهة مستخدم عصرية وسهلة الاستخدام، بالإضافة إلى أداء سريع ومستقر على جميع الأجهزة. 
                  كما يحتوي على العديد من الأدوات والخصائص المتقدمة التي ستساعدك في إنجاز مهامك بكفاءة عالية.
                </p>
                <p>
                  🔄 نحن نحرص على تحديث التطبيق بانتظام لإضافة مميزات جديدة وتحسين الأداء، ونقدم دعماً فنياً ممتازاً 
                  لضمان حصولك على أفضل تجربة استخدام ممكنة. جرب التطبيق الآن واكتشف الفرق!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features Section */}
        <Card className="luxury-card border-white/20">
          <CardContent className="p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-8 luxury-gradient rounded-full"></div>
              <h3 className="text-xl sm:text-2xl font-bold font-playfair text-white">المميزات الرئيسية</h3>
              <Crown className="w-5 h-5 text-purple-400" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: "🎨", text: "واجهة مستخدم عصرية وجذابة", color: "text-pink-400 border-pink-400/20" },
                { icon: "⚡", text: "أداء سريع ومستقر", color: "text-yellow-400 border-yellow-400/20" },
                { icon: "🎯", text: "سهولة في الاستخدام", color: "text-blue-400 border-blue-400/20" },
                { icon: "📱", text: "يدعم جميع الأجهزة", color: "text-emerald-400 border-emerald-400/20" },
                { icon: "🔄", text: "تحديثات مجانية مدى الحياة", color: "text-purple-400 border-purple-400/20" },
                { icon: "🛠️", text: "دعم فني متميز", color: "text-orange-400 border-orange-400/20" },
                { icon: "🔒", text: "حماية وأمان عالي", color: "text-red-400 border-red-400/20" },
                { icon: "✨", text: "مميزات متقدمة ومفيدة", color: "text-indigo-400 border-indigo-400/20" }
              ].map((feature, index) => (
                <div key={index} className={`flex items-center gap-3 p-4 glass-effect rounded-xl border transition-all duration-300 hover:scale-105 animate-fade-in ${feature.color}`} style={{animationDelay: `${index * 100}ms`}}>
                  <span className="text-xl">{feature.icon}</span>
                  <span className="text-sm font-medium text-white/90">{feature.text}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AppDetail;
