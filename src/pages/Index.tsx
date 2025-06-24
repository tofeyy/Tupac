
import React from 'react';
import TikTokDownloader from '@/components/TikTokDownloader';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
            أداة تحميل فيديوهات تيك توك
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            قم بتحميل فيديوهات تيك توك المفضلة لديك بجودة عالية وبشكل مجاني
          </p>
        </div>

        {/* TikTok Downloader Section */}
        <div className="max-w-2xl mx-auto">
          <TikTokDownloader />
        </div>

        {/* Features Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-12 max-w-6xl mx-auto">
          <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-center">دقة عالية</h3>
            <p className="text-gray-600 text-center">تحميل بأعلى جودة متاحة</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-center">سرعة فائقة</h3>
            <p className="text-gray-600 text-center">تحميل سريع وموثوق</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔒</span>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-center">آمان تام</h3>
            <p className="text-gray-600 text-center">حماية كاملة لخصوصيتك</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
