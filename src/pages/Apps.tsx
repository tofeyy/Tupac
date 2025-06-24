
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useSite } from '@/contexts/SiteContext';
import { Download, Smartphone, Star, Users, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Apps = () => {
  const { apps, getPageContent } = useSite();
  const pageContent = getPageContent('apps');
  const navigate = useNavigate();

  const handleAppClick = (appId: string, appName: string) => {
    navigate(`/app/${appId}`, { state: { appName } });
  };

  if (apps.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
        <Card className="p-12 text-center max-w-md glass-effect border-white/20">
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-pink-400/20 to-red-600/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="container mx-auto max-w-7xl p-6 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          {pageContent?.image && (
            <div className="mb-8 animate-fade-in">
              <img
                src={pageContent.image}
                alt={pageContent.title}
                className="w-32 h-32 mx-auto rounded-full shadow-2xl object-cover border-4 border-white/20"
              />
            </div>
          )}
          
          <h1 className="text-5xl font-bold text-white mb-6 animate-fade-in">
            {pageContent?.title || '🚀 متجر التطبيقات'}
          </h1>
          <p className="text-xl text-white/80 mb-4">
            {pageContent?.subtitle || 'اكتشف تطبيقات مذهلة من تطوير توفي العامري'}
          </p>
          
          {pageContent?.description && (
            <p className="text-white/70 text-lg max-w-3xl mx-auto leading-relaxed">
              {pageContent.description}
            </p>
          )}

          {pageContent?.content && (
            <div className="mt-8 p-6 glass-effect rounded-2xl border border-white/20 max-w-3xl mx-auto">
              <p className="text-white/90 whitespace-pre-wrap text-lg leading-relaxed">
                {pageContent.content}
              </p>
            </div>
          )}

          {pageContent?.ctaText && pageContent?.ctaUrl && (
            <div className="mt-8">
              <Button
                onClick={() => window.open(pageContent.ctaUrl, '_blank')}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 text-lg rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                <Star className="w-5 h-5 mr-2" />
                {pageContent.ctaText}
              </Button>
            </div>
          )}
        </div>

        {/* Apps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {apps.map((app, index) => (
            <Card 
              key={app.id} 
              className="group glass-effect border-white/20 hover:border-white/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer overflow-hidden"
              style={{
                animationDelay: `${index * 0.1}s`
              }}
              onClick={() => handleAppClick(app.id, app.name)}
            >
              <CardContent className="p-0">
                {/* App Icon Header */}
                <div className="bg-gradient-to-br from-white/10 to-white/5 p-8 text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-pink-400/20 group-hover:from-purple-400/30 group-hover:to-pink-400/30 transition-all duration-500"></div>
                  
                  {app.icon ? (
                    <img
                      src={app.icon}
                      alt={app.name}
                      className="w-20 h-20 mx-auto rounded-3xl shadow-2xl transform group-hover:scale-110 transition-transform duration-500 relative z-10"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto shadow-2xl transform group-hover:scale-110 transition-transform duration-500 relative z-10">
                      <Smartphone className="w-10 h-10 text-white" />
                    </div>
                  )}
                </div>

                {/* App Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-purple-300 transition-colors duration-300">
                    {app.name}
                  </h3>
                  
                  {app.description && (
                    <p className="text-white/70 mb-6 text-sm leading-relaxed line-clamp-3">
                      {app.description}
                    </p>
                  )}

                  {/* App Stats */}
                  <div className="flex items-center justify-between mb-6 text-sm">
                    <div className="flex items-center gap-1 text-yellow-400">
                      <Star className="w-4 h-4 fill-current" />
                      <span>4.8</span>
                    </div>
                    <div className="flex items-center gap-1 text-white/60">
                      <Users className="w-4 h-4" />
                      <span>10K+</span>
                    </div>
                    <div className="flex items-center gap-1 text-green-400">
                      <Zap className="w-4 h-4" />
                      <span>سريع</span>
                    </div>
                  </div>
                  
                  <Button
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl shadow-lg transform group-hover:scale-105 transition-all duration-300 flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    تحميل مجاني
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <div className="glass-effect rounded-2xl border border-white/20 p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">هل تريد تطبيق مخصص؟</h3>
            <p className="text-white/70 mb-6">نحن نقوم بتطوير تطبيقات مخصصة حسب احتياجاتك</p>
            <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-3 rounded-full">
              تواصل معنا
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Apps;
