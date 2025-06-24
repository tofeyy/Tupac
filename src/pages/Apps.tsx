import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSite } from '@/contexts/SiteContext';
import { Smartphone, Search, Star, Download, ArrowLeft, Share2 } from 'lucide-react';
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
    const shareText = `تحقق من هذا التطبيق الرائع: ${app.name}`;
    
    if (navigator.share) {
      navigator.share({
        title: app.name,
        text: shareText,
        url: shareUrl,
      }).catch((error) => console.log('Error sharing:', error));
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`${shareText}\n${shareUrl}`).then(() => {
        toast({
          title: "تم النسخ!",
          description: "تم نسخ رابط التطبيق إلى الحافظة",
        });
      });
    }
  };

  if (apps.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
        <Card className="p-12 text-center max-w-md bg-white/10 backdrop-blur-md border-white/20">
          <div className="mb-6">
            <Smartphone className="w-16 h-16 mx-auto text-white/80" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">لا توجد تطبيقات حالياً</h2>
          <p className="text-white/70 text-lg">سيتم إضافة تطبيقات مفيدة قريباً...</p>
        </Card>
      </div>
    );
  }

  // Show app details view
  if (selectedApp) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="container mx-auto max-w-2xl">
          {/* Back Button */}
          <Button
            onClick={handleBackToApps}
            variant="ghost"
            className="text-gray-600 hover:text-gray-800 mb-8"
          >
            <ArrowLeft className="w-4 h-4 ml-2" />
            العودة للتطبيقات
          </Button>

          {/* App Details Card */}
          <Card className="bg-white shadow-xl border-0 overflow-hidden">
            <CardContent className="p-0">
              {/* App Header */}
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-8 text-center text-white">
                {selectedApp.icon ? (
                  <img
                    src={selectedApp.icon}
                    alt={selectedApp.name}
                    className="w-32 h-32 mx-auto rounded-3xl shadow-2xl mb-6 border-4 border-white/20"
                  />
                ) : (
                  <div className="w-32 h-32 bg-white/20 rounded-3xl flex items-center justify-center mx-auto shadow-2xl mb-6 border-4 border-white/20">
                    <Smartphone className="w-16 h-16 text-white" />
                  </div>
                )}
                <h1 className="text-4xl font-bold mb-2">{selectedApp.name}</h1>
                <div className="flex items-center justify-center gap-4 text-sm">
                  <div className="flex items-center gap-1 text-yellow-300">
                    <Star className="w-4 h-4 fill-current" />
                    <span>4.8</span>
                  </div>
                  <span className="text-green-300 font-semibold">مجاني</span>
                </div>
              </div>

              {/* App Info */}
              <div className="p-8">
                {selectedApp.description && (
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">الوصف</h3>
                    <p className="text-gray-600 leading-relaxed text-lg">
                      {selectedApp.description}
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-4">
                  <Button
                    onClick={() => handleDownloadClick(selectedApp.id, selectedApp.name)}
                    className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white py-6 text-xl font-bold rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    <Download className="w-6 h-6 ml-3" />
                    تحميل التطبيق
                  </Button>
                  
                  <Button
                    onClick={() => handleShareApp(selectedApp)}
                    variant="outline"
                    className="w-full border-2 border-blue-500 text-blue-500 hover:bg-blue-50 py-4 text-lg font-semibold rounded-2xl transition-all duration-300"
                  >
                    <Share2 className="w-5 h-5 ml-2" />
                    مشاركة التطبيق
                  </Button>
                </div>

                {/* Additional Info */}
                <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="text-2xl font-bold text-gray-800">50K+</div>
                    <div className="text-gray-500 text-sm">تحميل</div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="text-2xl font-bold text-gray-800">4.8</div>
                    <div className="text-gray-500 text-sm">تقييم</div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="text-2xl font-bold text-gray-800">مجاني</div>
                    <div className="text-gray-500 text-sm">السعر</div>
                  </div>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto max-w-6xl p-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-6">
            متجر التطبيقات
          </h1>
          <p className="text-xl text-white/70 mb-8">
            اكتشف وحمل أفضل التطبيقات
          </p>

          {/* Search */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
              <Input
                type="text"
                placeholder="ابحث عن تطبيق..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border-white/30 text-white placeholder:text-white/60 rounded-2xl text-lg focus:bg-white/20 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Apps Grid */}
        {filteredApps.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-12 max-w-md mx-auto border border-white/20">
              <Search className="w-16 h-16 mx-auto text-white/60 mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">لا توجد نتائج</h3>
              <p className="text-white/70">جرب البحث بكلمات مختلفة</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {filteredApps.map((app) => (
              <Card 
                key={app.id} 
                className="group bg-white/10 backdrop-blur-md border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden rounded-3xl"
                onClick={() => handleAppClick(app)}
              >
                <CardContent className="p-6 text-center">
                  {app.icon ? (
                    <img
                      src={app.icon}
                      alt={app.name}
                      className="w-20 h-20 mx-auto rounded-2xl shadow-lg mb-4 object-cover"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg mb-4">
                      <Smartphone className="w-10 h-10 text-white" />
                    </div>
                  )}
                  <h3 className="text-white font-semibold text-sm leading-tight line-clamp-2">
                    {app.name}
                  </h3>
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
