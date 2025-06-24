import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useSite } from '@/contexts/SiteContext';
import { Download, Star, Shield, Zap, Users, ArrowRight, CheckCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const AppDetail = () => {
  const { appId } = useParams();
  const location = useLocation();
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
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

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* App Info */}
          <Card className="glass-effect border-white/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-white mb-6">معلومات التطبيق</h3>
              
              {app?.description && (
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-white/90 mb-2">الوصف</h4>
                  <p className="text-white/70 leading-relaxed">{app.description}</p>
                </div>
              )}

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
              <h3 className="text-2xl font-bold text-white mb-6">تحميل التطبيق</h3>
              
              {!showDownload ? (
                <div className="space-y-6">
                  <div className="relative w-32 h-32 mx-auto">
                    <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                      <circle
                        cx="60"
                        cy="60"
                        r="50"
                        stroke="white"
                        strokeOpacity="0.2"
                        strokeWidth="8"
                        fill="none"
                      />
                      <circle
                        cx="60"
                        cy="60"
                        r="50"
                        stroke="white"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 50}`}
                        strokeDashoffset={`${2 * Math.PI * 50 * (1 - progress / 100)}`}
                        className="transition-all duration-1000 ease-linear"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-4xl font-bold text-white">{countdown}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <p className="text-white/80">جاري التحضير للتحميل...</p>
                    <Progress value={progress} className="w-full h-2" />
                    <p className="text-sm text-white/60">
                      الرجاء الانتظار {countdown} ثانية
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-12 h-12 text-white" />
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="text-xl font-bold text-white">جاهز للتحميل!</h4>
                    <p className="text-white/70">
                      {app?.appFile 
                        ? `ملف التطبيق: ${app.fileName || app.name}`
                        : 'سيتم توجيهك لرابط التحميل'
                      }
                    </p>
                    
                    <Button
                      onClick={handleDownload}
                      className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-4 text-lg rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
                    >
                      <Download className="w-6 h-6 mr-3" />
                      تحميل الآن
                    </Button>
                    
                    {app?.appFile && (
                      <p className="text-xs text-white/50">
                        حجم الملف: {(app.appFile.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

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
    </div>
  );
};

export default AppDetail;
