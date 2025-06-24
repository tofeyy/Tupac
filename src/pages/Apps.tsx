
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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-pink-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
        </div>
        
        <Card className="luxury-card p-16 text-center max-w-lg border-0 shadow-2xl">
          <div className="mb-8">
            <div className="w-24 h-24 luxury-gradient rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
              <Smartphone className="w-12 h-12 text-white" />
            </div>
          </div>
          <h2 className="text-4xl font-bold font-playfair text-white mb-6">لا توجد تطبيقات حالياً</h2>
          <p className="text-white/80 text-xl leading-relaxed">سيتم إضافة تطبيقات فاخرة ومميزة قريباً...</p>
          <div className="mt-6 flex justify-center space-x-1 space-x-reverse">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
            ))}
          </div>
        </Card>
      </div>
    );
  }

  // Show app details view
  if (selectedApp) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-pink-400/10 to-blue-400/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto max-w-3xl relative z-10">
          {/* Back Button */}
          <Button
            onClick={handleBackToApps}
            variant="ghost"
            className="text-gray-600 hover:text-gray-800 mb-8 luxury-card px-6 py-3 rounded-2xl"
          >
            <ArrowLeft className="w-5 h-5 ml-2" />
            العودة للتطبيقات الفاخرة
          </Button>

          {/* App Details Card */}
          <Card className="luxury-card border-0 shadow-2xl overflow-hidden">
            <CardContent className="p-0">
              {/* App Header */}
              <div className="luxury-gradient p-12 text-center text-white relative overflow-hidden">
                <div className="absolute top-4 right-4">
                  <Crown className="w-8 h-8 text-yellow-300" />
                </div>
                <div className="absolute top-4 left-4">
                  <Sparkles className="w-8 h-8 text-yellow-300 animate-pulse" />
                </div>
                
                {selectedApp.icon ? (
                  <div className="relative inline-block">
                    <img
                      src={selectedApp.icon}
                      alt={selectedApp.name}
                      className="w-40 h-40 mx-auto rounded-3xl shadow-2xl mb-8 border-4 border-white/30"
                    />
                    <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                      <Crown className="w-5 h-5 text-white" />
                    </div>
                  </div>
                ) : (
                  <div className="w-40 h-40 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto shadow-2xl mb-8 border-4 border-white/30">
                    <Smartphone className="w-20 h-20 text-white" />
                  </div>
                )}
                <h1 className="text-5xl font-bold font-playfair mb-4">{selectedApp.name}</h1>
                <div className="flex items-center justify-center gap-6 text-lg">
                  <div className="flex items-center gap-2 text-yellow-300">
                    <Star className="w-5 h-5 fill-current" />
                    <span className="font-bold">4.9</span>
                  </div>
                  <span className="text-green-300 font-bold text-xl">مجاني فاخر</span>
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-blue-300" />
                    <span className="font-medium">سريع</span>
                  </div>
                </div>
              </div>

              {/* App Info */}
              <div className="p-12">
                {selectedApp.description && (
                  <div className="mb-10">
                    <h3 className="text-2xl font-bold font-playfair text-gray-800 mb-6 flex items-center gap-3">
                      <div className="w-8 h-8 luxury-gradient rounded-full flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-white" />
                      </div>
                      الوصف الفاخر
                    </h3>
                    <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-purple-200/50 p-8 rounded-2xl">
                      <p className="text-gray-700 leading-relaxed text-xl">
                        {selectedApp.description}
                      </p>
                    </Card>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-6">
                  <Button
                    onClick={() => handleDownloadClick(selectedApp.id, selectedApp.name)}
                    className="w-full luxury-gradient text-white py-8 text-2xl font-bold rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-300"
                  >
                    <Download className="w-8 h-8 ml-4" />
                    تحميل التطبيق الفاخر
                  </Button>
                  
                  <Button
                    onClick={() => handleShareApp(selectedApp)}
                    variant="outline"
                    className="w-full border-3 border-purple-300 text-purple-600 hover:bg-purple-50 py-6 text-xl font-bold rounded-3xl transition-all duration-300 luxury-card"
                  >
                    <Share2 className="w-6 h-6 ml-3" />
                    مشاركة التطبيق
                  </Button>
                </div>

                {/* Additional Info */}
                <div className="mt-12 grid grid-cols-3 gap-6 text-center">
                  <Card className="luxury-card p-6 rounded-2xl">
                    <div className="text-3xl font-bold text-purple-600 mb-2">100K+</div>
                    <div className="text-gray-500 font-medium">تحميل فاخر</div>
                  </Card>
                  <Card className="luxury-card p-6 rounded-2xl">
                    <div className="text-3xl font-bold text-purple-600 mb-2 flex items-center justify-center gap-1">
                      4.9 <Star className="w-6 h-6 text-yellow-400 fill-current" />
                    </div>
                    <div className="text-gray-500 font-medium">تقييم ممتاز</div>
                  </Card>
                  <Card className="luxury-card p-6 rounded-2xl">
                    <div className="text-3xl font-bold text-green-600 mb-2">مجاني</div>
                    <div className="text-gray-500 font-medium">السعر الفاخر</div>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-pink-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-r from-emerald-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto max-w-7xl p-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="flex items-center justify-center gap-4 mb-8">
            <Crown className="w-12 h-12 text-yellow-400" />
            <h1 className="text-6xl font-bold font-playfair text-white text-shimmer">
              متجر التطبيقات الفاخر
            </h1>
            <Crown className="w-12 h-12 text-yellow-400" />
          </div>
          <p className="text-2xl text-white/80 mb-10 font-medium">
            اكتشف وحمل أفضل التطبيقات بتصميم أنيق وفاخر
          </p>

          {/* Search */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white/60 w-6 h-6" />
              <Input
                type="text"
                placeholder="ابحث عن تطبيق فاخر... ✨"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-16 pr-6 py-6 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white placeholder:text-white/60 rounded-3xl text-xl focus:bg-white/20 transition-all duration-300"
              />
              <div className="absolute right-6 top-1/2 transform -translate-y-1/2">
                <Sparkles className="w-6 h-6 text-purple-400 animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* Apps Grid */}
        {filteredApps.length === 0 ? (
          <div className="text-center py-20">
            <Card className="luxury-card rounded-3xl p-16 max-w-2xl mx-auto border-0">
              <Search className="w-20 h-20 mx-auto text-gray-400 mb-6" />
              <h3 className="text-3xl font-bold font-playfair text-gray-700 mb-6">لا توجد نتائج</h3>
              <p className="text-gray-500 text-xl">جرب البحث بكلمات مختلفة أو تصفح التطبيقات المتاحة</p>
            </Card>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8">
            {filteredApps.map((app, index) => (
              <Card 
                key={app.id} 
                className="group luxury-card hover:shadow-2xl transition-all duration-500 hover:scale-110 cursor-pointer overflow-hidden rounded-3xl border-0 animate-scale-in"
                onClick={() => handleAppClick(app)}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-8 text-center">
                  {app.icon ? (
                    <div className="relative">
                      <img
                        src={app.icon}
                        alt={app.name}
                        className="w-24 h-24 mx-auto rounded-3xl shadow-lg mb-6 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                        <Crown className="w-3 h-3 text-white" />
                      </div>
                    </div>
                  ) : (
                    <div className="w-24 h-24 luxury-gradient rounded-3xl flex items-center justify-center mx-auto shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Smartphone className="w-12 h-12 text-white" />
                    </div>
                  )}
                  <h3 className="text-white font-bold text-lg leading-tight line-clamp-2 mb-3">
                    {app.name}
                  </h3>
                  <div className="flex justify-center space-x-1 space-x-reverse">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
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
