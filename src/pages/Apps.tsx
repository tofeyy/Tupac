
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSite } from '@/contexts/SiteContext';
import { Download, Smartphone, Star, Users, Search, Grid } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Apps = () => {
  const { apps, getPageContent } = useSite();
  const pageContent = getPageContent('apps');
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredApps = apps.filter(app =>
    app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (app.description && app.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleAppClick = (appId: string, appName: string) => {
    navigate(`/app/${appId}`, { state: { appName } });
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto max-w-7xl p-6">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            📱 متجر التطبيقات
          </h1>
          <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
            اكتشف مجموعة رائعة من التطبيقات المفيدة والمميزة
          </p>

          {/* Search Section */}
          <div className="max-w-md mx-auto mb-8">
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

          {/* Apps Count */}
          <div className="flex items-center justify-center gap-2 text-white/70 mb-8">
            <Grid className="w-5 h-5" />
            <span>{filteredApps.length} تطبيق متاح</span>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredApps.map((app, index) => (
              <Card 
                key={app.id} 
                className="group bg-white/10 backdrop-blur-md border-white/20 hover:border-white/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer overflow-hidden rounded-3xl"
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
                onClick={() => handleAppClick(app.id, app.name)}
              >
                <CardContent className="p-0">
                  {/* App Icon Section */}
                  <div className="bg-gradient-to-br from-white/20 to-white/5 p-8 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20 group-hover:from-blue-400/30 group-hover:to-purple-400/30 transition-all duration-500"></div>
                    
                    {app.icon ? (
                      <img
                        src={app.icon}
                        alt={app.name}
                        className="w-24 h-24 mx-auto rounded-3xl shadow-2xl transform group-hover:scale-110 transition-transform duration-500 relative z-10 object-cover"
                      />
                    ) : (
                      <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-3xl flex items-center justify-center mx-auto shadow-2xl transform group-hover:scale-110 transition-transform duration-500 relative z-10">
                        <Smartphone className="w-12 h-12 text-white" />
                      </div>
                    )}
                  </div>

                  {/* App Info */}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-blue-300 transition-colors duration-300 text-center">
                      {app.name}
                    </h3>
                    
                    {app.description && (
                      <p className="text-white/70 mb-6 text-sm leading-relaxed text-center line-clamp-2 min-h-[40px]">
                        {app.description}
                      </p>
                    )}

                    {/* App Stats */}
                    <div className="flex items-center justify-between mb-6 text-sm bg-white/5 rounded-xl p-3">
                      <div className="flex items-center gap-1 text-yellow-400">
                        <Star className="w-4 h-4 fill-current" />
                        <span>4.9</span>
                      </div>
                      <div className="flex items-center gap-1 text-white/60">
                        <Users className="w-4 h-4" />
                        <span>50K+</span>
                      </div>
                      <div className="text-green-400 font-semibold">
                        مجاني
                      </div>
                    </div>
                    
                    <Button
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-2xl shadow-lg transform group-hover:scale-105 transition-all duration-300 flex items-center gap-2 py-3 text-lg font-semibold"
                    >
                      <Download className="w-5 h-5" />
                      تحميل مجاني
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Bottom Section */}
        <div className="text-center mt-20">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-8 max-w-2xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-4">تطبيقات مخصصة</h3>
            <p className="text-white/70 mb-6 text-lg">هل تحتاج تطبيق مخصص لعملك؟ نحن هنا لمساعدتك</p>
            <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold">
              تواصل معنا الآن
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Apps;
