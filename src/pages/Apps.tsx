
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSite } from '@/contexts/SiteContext';
import { Smartphone, Search, Star, Download, ArrowLeft, Share2, Crown, Sparkles, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

const Apps = () => {
  const { apps } = useSite();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedApp, setSelectedApp] = useState(null);

  const filteredApps = apps.filter(app =>
    app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (app.description && app.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleAppClick = (app) => {
    setSelectedApp(app);
  };

  const handleDownloadClick = (appId, appName) => {
    navigate(`/app/${appId}`, { state: { appName } });
  };

  const handleBackToApps = () => {
    setSelectedApp(null);
  };

  const handleShareApp = (app) => {
    const shareUrl = `${window.location.origin}/app/${app.id}`;
    const shareText = `تحقق من هذا التطبيق الفاخر: ${app.name}`;
    
    if (navigator.share) {
      navigator.share({
        title: app.name,
        text: shareText,
        url: shareUrl,
      }).catch((error) => console.log('Error sharing:', error));
    } else {
      navigator.clipboard.writeText(`${shareText}\n${shareUrl}`).then(() => {
        toast({
          title: "تم النسخ بأناقة! ✨",
          description: "تم نسخ رابط التطبيق إلى الحافظة",
        });
      });
    }
  };

  if (apps.length === 0) {
    return (
      <div className="min-h-screen luxury-gradient relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        </div>
        
        <div className="flex items-center justify-center min-h-screen p-4 relative z-10">
          <Card className="luxury-card p-12 sm:p-16 text-center max-w-2xl border-white/20 shadow-2xl">
            <div className="mb-8">
              <div className="w-20 h-20 sm:w-24 sm:h-24 luxury-gradient rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
                <Smartphone className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
              </div>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-playfair text-white mb-6">لا توجد تطبيقات حالياً</h2>
            <p className="text-white/80 text-lg sm:text-xl leading-relaxed">سيتم إضافة تطبيقات فاخرة ومميزة قريباً...</p>
            <div className="mt-6 flex justify-center space-x-1 space-x-reverse">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Show app details view
  if (selectedApp) {
    return (
      <div className="min-h-screen luxury-gradient relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="container mx-auto max-w-5xl p-4 sm:p-6 lg:p-8 relative z-10">
          {/* Back Button */}
          <div className="mb-6 sm:mb-8">
            <Button
              onClick={handleBackToApps}
              variant="ghost"
              className="glass-effect text-white/90 hover:text-white border-white/20 hover:bg-white/10 transition-all duration-300 text-sm sm:text-base"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              العودة للتطبيقات الفاخرة
            </Button>
          </div>

          {/* App Details Card */}
          <Card className="luxury-card border-white/20 shadow-2xl overflow-hidden">
            <CardContent className="p-0">
              {/* App Header */}
              <div className="luxury-gradient p-8 sm:p-12 text-center text-white relative overflow-hidden">
                <div className="absolute top-4 right-4">
                  <Crown className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-300" />
                </div>
                <div className="absolute top-4 left-4">
                  <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-300 animate-pulse" />
                </div>
                
                {selectedApp.icon ? (
                  <div className="relative inline-block">
                    <img
                      src={selectedApp.icon}
                      alt={selectedApp.name}
                      className="w-32 h-32 sm:w-40 sm:h-40 mx-auto rounded-3xl shadow-2xl mb-6 sm:mb-8 border-4 border-white/30"
                    />
                    <div className="absolute -top-2 -right-2 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                      <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                  </div>
                ) : (
                  <div className="w-32 h-32 sm:w-40 sm:h-40 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto shadow-2xl mb-6 sm:mb-8 border-4 border-white/30">
                    <Smartphone className="w-16 h-16 sm:w-20 sm:h-20 text-white" />
                  </div>
                )}
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-playfair mb-4 text-shimmer">{selectedApp.name}</h1>
                <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-base sm:text-lg">
                  <div className="flex items-center gap-2 text-yellow-300 bg-yellow-300/10 px-3 py-1 rounded-full">
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                    <span className="font-bold">4.9</span>
                  </div>
                  <span className="text-emerald-300 font-bold text-lg sm:text-xl bg-emerald-300/10 px-3 py-1 rounded-full">مجاني فاخر</span>
                  <div className="flex items-center gap-2 text-blue-300 bg-blue-300/10 px-3 py-1 rounded-full">
                    <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="font-medium">سريع</span>
                  </div>
                </div>
              </div>

              {/* App Info */}
              <div className="p-6 sm:p-8 lg:p-12">
                {selectedApp.description && (
                  <div className="mb-8 lg:mb-10">
                    <h3 className="text-xl sm:text-2xl font-bold font-playfair text-white mb-4 sm:mb-6 flex items-center gap-3">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 luxury-gradient rounded-full flex items-center justify-center">
                        <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                      </div>
                      الوصف الفاخر
                    </h3>
                    <Card className="glass-effect border-white/20 p-6 sm:p-8 rounded-2xl">
                      <p className="text-white/80 leading-relaxed text-base sm:text-lg lg:text-xl">
                        {selectedApp.description}
                      </p>
                    </Card>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-4 sm:space-y-6">
                  <Button
                    onClick={() => handleDownloadClick(selectedApp.id, selectedApp.name)}
                    className="w-full bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 hover:from-emerald-600 hover:via-blue-600 hover:to-purple-600 text-white py-6 sm:py-8 text-lg sm:text-xl lg:text-2xl font-bold rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-white/20"
                  >
                    <Download className="w-6 h-6 sm:w-8 sm:h-8 mr-3 sm:mr-4" />
                    تحميل التطبيق الفاخر
                  </Button>
                  
                  <Button
                    onClick={() => handleShareApp(selectedApp)}
                    variant="outline"
                    className="w-full glass-effect border-white/30 text-white hover:bg-white/10 py-4 sm:py-6 text-base sm:text-lg lg:text-xl font-bold rounded-3xl transition-all duration-300"
                  >
                    <Share2 className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" />
                    مشاركة التطبيق
                  </Button>
                </div>

                {/* Additional Info */}
                <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                  <Card className="luxury-card border-white/20 p-4 sm:p-6 rounded-2xl text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-purple-400 mb-2">100K+</div>
                    <div className="text-white/70 font-medium text-sm sm:text-base">تحميل فاخر</div>
                  </Card>
                  <Card className="luxury-card border-white/20 p-4 sm:p-6 rounded-2xl text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-2 flex items-center justify-center gap-1">
                      4.9 <Star className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 fill-current" />
                    </div>
                    <div className="text-white/70 font-medium text-sm sm:text-base">تقييم ممتاز</div>
                  </Card>
                  <Card className="luxury-card border-white/20 p-4 sm:p-6 rounded-2xl text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-emerald-400 mb-2">مجاني</div>
                    <div className="text-white/70 font-medium text-sm sm:text-base">السعر الفاخر</div>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Main apps grid view
  return (
    <div className="min-h-screen luxury-gradient relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-float" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="container mx-auto max-w-7xl p-4 sm:p-6 lg:p-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 animate-fade-in">
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
            <Crown className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-yellow-400" />
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-playfair text-white text-shimmer">
              متجر التطبيقات الفاخر
            </h1>
            <Crown className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-yellow-400" />
          </div>
          <p className="text-lg sm:text-xl lg:text-2xl text-white/80 mb-8 sm:mb-10 font-medium px-4">
            اكتشف وحمل أفضل التطبيقات بتصميم أنيق وفاخر
          </p>

          {/* Search */}
          <div className="max-w-2xl mx-auto px-4">
            <div className="relative">
              <Search className="absolute left-4 sm:left-6 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5 sm:w-6 sm:h-6" />
              <Input
                type="text"
                placeholder="ابحث عن تطبيق فاخر... ✨"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 sm:pl-16 pr-12 sm:pr-16 py-4 sm:py-6 glass-effect border-2 border-white/30 text-white placeholder:text-white/60 rounded-3xl text-base sm:text-lg lg:text-xl focus:bg-white/20 transition-all duration-300"
              />
              <div className="absolute right-4 sm:right-6 top-1/2 transform -translate-y-1/2">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400 animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* Apps Grid */}
        {filteredApps.length === 0 ? (
          <div className="text-center py-16 sm:py-20">
            <Card className="luxury-card border-white/20 rounded-3xl p-12 sm:p-16 max-w-2xl mx-auto">
              <Search className="w-16 h-16 sm:w-20 sm:h-20 mx-auto text-white/40 mb-6" />
              <h3 className="text-2xl sm:text-3xl font-bold font-playfair text-white mb-6">لا توجد نتائج</h3>
              <p className="text-white/70 text-lg sm:text-xl">جرب البحث بكلمات مختلفة أو تصفح التطبيقات المتاحة</p>
            </Card>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6 lg:gap-8">
            {filteredApps.map((app, index) => (
              <Card 
                key={app.id} 
                className="group luxury-card border-white/20 hover:shadow-2xl transition-all duration-500 hover:scale-110 cursor-pointer overflow-hidden rounded-3xl animate-scale-in"
                onClick={() => handleAppClick(app)}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-4 sm:p-6 lg:p-8 text-center">
                  {app.icon ? (
                    <div className="relative">
                      <img
                        src={app.icon}
                        alt={app.name}
                        className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto rounded-3xl shadow-lg mb-4 sm:mb-6 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                        <Crown className="w-2 h-2 sm:w-3 sm:h-3 text-white" />
                      </div>
                    </div>
                  ) : (
                    <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 luxury-gradient rounded-3xl flex items-center justify-center mx-auto shadow-lg mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Smartphone className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white" />
                    </div>
                  )}
                  <h3 className="text-white font-bold text-sm sm:text-base lg:text-lg leading-tight line-clamp-2 mb-2 sm:mb-3">
                    {app.name}
                  </h3>
                  <div className="flex justify-center space-x-1 space-x-reverse">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-2 h-2 sm:w-3 sm:h-3 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Apps;
