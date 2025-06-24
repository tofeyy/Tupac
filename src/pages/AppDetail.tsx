
import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, Download, Shield, Zap, Star, Users, CheckCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const AppDetail = () => {
  const { appId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const appName = location.state?.appName || 'التطبيق المطلوب';
  
  const [countdown, setCountdown] = useState(15);
  const [isDownloadReady, setIsDownloadReady] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Show content after a short delay for animation
    setTimeout(() => setShowContent(true), 300);

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsDownloadReady(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleDownload = () => {
    toast({
      title: "تم بدء التحميل",
      description: `جاري تحميل ${appName}...`,
    });
    
    // Simulate download
    const link = document.createElement('a');
    link.href = '#';
    link.download = `${appName}.apk`;
    link.click();
  };

  const progressPercentage = ((15 - countdown) / 15) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-blue-500/10 to-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-pink-500/10 to-red-600/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="container mx-auto max-w-4xl p-6 relative z-10">
        {/* Back Button */}
        <Button
          onClick={() => navigate('/apps')}
          variant="ghost"
          className="text-white/80 hover:text-white mb-8 hover:bg-white/10"
        >
          <ArrowRight className="w-4 h-4 mr-2" />
          العودة للتطبيقات
        </Button>

        {showContent && (
          <div className="space-y-8 animate-fade-in">
            {/* App Header */}
            <Card className="glass-effect border-white/20 overflow-hidden">
              <CardContent className="p-8">
                <div className="flex items-center gap-6 mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl">
                    <Download className="w-12 h-12 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-white mb-2">{appName}</h1>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1 text-yellow-400">
                        <Star className="w-4 h-4 fill-current" />
                        <span>4.8 (2.1K مراجعة)</span>
                      </div>
                      <div className="flex items-center gap-1 text-white/60">
                        <Users className="w-4 h-4" />
                        <span>50K+ تحميل</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3 text-green-400">
                    <Shield className="w-5 h-5" />
                    <span>آمن 100%</span>
                  </div>
                  <div className="flex items-center gap-3 text-blue-400">
                    <Zap className="w-5 h-5" />
                    <span>سريع وخفيف</span>
                  </div>
                  <div className="flex items-center gap-3 text-purple-400">
                    <CheckCircle className="w-5 h-5" />
                    <span>مجاني بالكامل</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Download Section */}
            <Card className="glass-effect border-white/20">
              <CardContent className="p-8 text-center">
                {!isDownloadReady ? (
                  <div className="space-y-8">
                    <h2 className="text-2xl font-bold text-white mb-4">
                      جاري تحضير التحميل...
                    </h2>
                    
                    {/* Circular Progress */}
                    <div className="relative w-48 h-48 mx-auto">
                      <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 200 200">
                        <circle
                          cx="100"
                          cy="100"
                          r="80"
                          stroke="rgba(255,255,255,0.1)"
                          strokeWidth="8"
                          fill="none"
                        />
                        <circle
                          cx="100"
                          cy="100"
                          r="80"
                          stroke="url(#gradient)"
                          strokeWidth="8"
                          fill="none"
                          strokeLinecap="round"
                          strokeDasharray={`${2 * Math.PI * 80}`}
                          strokeDashoffset={`${2 * Math.PI * 80 * (1 - progressPercentage / 100)}`}
                          className="transition-all duration-1000 ease-in-out"
                        />
                        <defs>
                          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#8B5CF6" />
                            <stop offset="100%" stopColor="#EC4899" />
                          </linearGradient>
                        </defs>
                      </svg>
                      
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-5xl font-bold text-white mb-2">{countdown}</div>
                          <div className="text-white/70">ثانية</div>
                        </div>
                      </div>
                    </div>

                    <Progress value={progressPercentage} className="w-full max-w-md mx-auto h-3" />
                    
                    <p className="text-white/70 text-lg">
                      يرجى الانتظار حتى اكتمال التحضير...
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6 animate-scale-in">
                    <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto shadow-2xl">
                      <CheckCircle className="w-12 h-12 text-white" />
                    </div>
                    
                    <h2 className="text-3xl font-bold text-white">
                      🎉 التحميل جاهز!
                    </h2>
                    
                    <p className="text-white/80 text-lg max-w-md mx-auto">
                      تم تحضير ملف التطبيق بنجاح. يمكنك الآن تحميله والاستمتاع بجميع المميزات الرائعة!
                    </p>
                    
                    <Button
                      onClick={handleDownload}
                      className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-12 py-4 text-xl rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
                    >
                      <Download className="w-6 h-6 mr-3" />
                      تحميل {appName}
                    </Button>
                    
                    <p className="text-white/60 text-sm">
                      حجم الملف: 12.5 MB • آخر تحديث: اليوم
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* App Description */}
            <Card className="glass-effect border-white/20">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-white mb-4">وصف التطبيق</h3>
                <div className="text-white/80 space-y-4 leading-relaxed">
                  <p>
                    {appName} هو تطبيق مذهل ومفيد جداً يوفر لك تجربة استثنائية ومميزات رائعة لن تجدها في أي مكان آخر. 
                    تم تطوير هذا التطبيق بعناية فائقة واهتمام بأدق التفاصيل لضمان حصولك على أفضل تجربة ممكنة.
                  </p>
                  <p>
                    يتميز التطبيق بواجهة مستخدم عصرية وسهلة الاستخدام، بالإضافة إلى أداء سريع ومستقر على جميع الأجهزة. 
                    كما يحتوي على العديد من الأدوات والخصائص المتقدمة التي ستساعدك في إنجاز مهامك بكفاءة عالية.
                  </p>
                  <p>
                    نحن نحرص على تحديث التطبيق بانتظام لإضافة مميزات جديدة وتحسين الأداء، ونقدم دعماً فنياً ممتازاً 
                    لضمان حصولك على أفضل تجربة استخدام ممكنة. جرب التطبيق الآن واكتشف الفرق!
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <Card className="glass-effect border-white/20">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-white mb-6">المميزات الرئيسية</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    "واجهة مستخدم عصرية وجذابة",
                    "أداء سريع ومستقر",
                    "سهولة في الاستخدام",
                    "يدعم جميع الأجهزة",
                    "تحديثات مجانية مدى الحياة",
                    "دعم فني متميز",
                    "حماية وأمان عالي",
                    "مميزات متقدمة ومفيدة"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-3 text-white/80">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppDetail;
