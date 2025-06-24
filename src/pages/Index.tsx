
import React from 'react';
import TikTokDownloader from '@/components/TikTokDownloader';
import { useSite } from '@/contexts/SiteContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Sparkles, Crown, Diamond, Star, Zap, Shield, Rocket } from 'lucide-react';

const Index = () => {
  const { getPageContent } = useSite();
  const pageContent = getPageContent('home');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-pink-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-r from-emerald-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16 animate-fade-in">
          {pageContent?.image && (
            <div className="mb-8">
              <div className="relative inline-block">
                <img
                  src={pageContent.image}
                  alt={pageContent.title}
                  className="w-40 h-40 mx-auto rounded-3xl shadow-2xl object-cover border-4 border-white/50"
                />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-pulse">
                  <Crown className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          )}
          
          <div className="relative">
            <h1 className="text-5xl md:text-7xl font-bold font-playfair text-shimmer mb-6 leading-tight">
              {pageContent?.title || 'توباك الفاخر'}
            </h1>
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <Sparkles className="w-8 h-8 text-yellow-400 animate-pulse" />
            </div>
          </div>
          
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-8 font-medium leading-relaxed">
            {pageContent?.subtitle || 'تجربة تحميل فيديوهات تيك توك بتصميم فاخر وأنيق'}
          </p>
          
          {pageContent?.description && (
            <div className="max-w-2xl mx-auto mb-8">
              <Card className="luxury-card p-8 text-center">
                <p className="text-lg text-gray-700 leading-relaxed">
                  {pageContent.description}
                </p>
              </Card>
            </div>
          )}

          {pageContent?.content && (
            <div className="mt-8">
              <Card className="luxury-card p-8 max-w-3xl mx-auto">
                <p className="text-gray-700 whitespace-pre-wrap text-lg leading-relaxed">
                  {pageContent.content}
                </p>
              </Card>
            </div>
          )}

          {pageContent?.ctaText && pageContent?.ctaUrl && (
            <div className="mt-8">
              <Button
                onClick={() => window.open(pageContent.ctaUrl, '_blank')}
                className="luxury-gradient text-white hover:shadow-2xl transition-all duration-300 px-12 py-6 text-xl font-bold rounded-2xl"
              >
                <Rocket className="w-6 h-6 ml-3" />
                {pageContent.ctaText}
              </Button>
            </div>
          )}
        </div>

        {/* TikTok Downloader Section */}
        <div className="max-w-4xl mx-auto mb-20">
          <TikTokDownloader />
        </div>

        {/* Features Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <Card className="luxury-card p-8 text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group animate-scale-in floating-animation">
            <div className="w-20 h-20 luxury-gradient rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xl">
              <Diamond className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold font-playfair mb-4 text-gray-800">جودة فائقة</h3>
            <p className="text-gray-600 text-lg leading-relaxed">تحميل بأعلى جودة متاحة مع تقنيات متطورة</p>
            <div className="mt-4 flex justify-center space-x-1 space-x-reverse">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
              ))}
            </div>
          </Card>
          
          <Card className="luxury-card p-8 text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group animate-scale-in floating-animation" style={{ animationDelay: '200ms' }}>
            <div className="w-20 h-20 luxury-gradient-2 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xl">
              <Zap className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold font-playfair mb-4 text-gray-800">سرعة البرق</h3>
            <p className="text-gray-600 text-lg leading-relaxed">تحميل فوري وسريع بتقنيات حديثة</p>
            <div className="mt-4 flex justify-center space-x-1 space-x-reverse">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
              ))}
            </div>
          </Card>
          
          <Card className="luxury-card p-8 text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group animate-scale-in floating-animation" style={{ animationDelay: '400ms' }}>
            <div className="w-20 h-20 luxury-gradient-3 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xl">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold font-playfair mb-4 text-gray-800">أمان كامل</h3>
            <p className="text-gray-600 text-lg leading-relaxed">حماية متقدمة وخصوصية تامة لبياناتك</p>
            <div className="mt-4 flex justify-center space-x-1 space-x-reverse">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
              ))}
            </div>
          </Card>
        </div>

        {/* Bottom decoration */}
        <div className="text-center mt-20">
          <div className="inline-flex items-center space-x-2 space-x-reverse text-gray-500">
            <Crown className="w-5 h-5" />
            <span className="font-medium">منصة التحميل الفاخرة</span>
            <Crown className="w-5 h-5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
