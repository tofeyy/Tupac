
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, MessageCircle, Sparkles } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="text-center mb-16">
      <div className="relative inline-block mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full blur-2xl opacity-40 animate-pulse scale-110"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full blur-xl opacity-30 animate-pulse scale-125" style={{animationDelay: '1s'}}></div>
        <img
          src="https://b.top4top.io/p_34587ahd40.jpg"
          alt="توفي العامري"
          className="relative w-36 h-36 md:w-44 md:h-44 rounded-full mx-auto border-4 border-white shadow-2xl object-cover animate-fade-in hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-bounce">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
      </div>
      
      <div className="space-y-6 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6 animate-fade-in">
          توفي العامري
        </h1>
        
        <div className="flex items-center justify-center gap-6 mb-8 flex-wrap animate-fade-in" style={{animationDelay: '0.2s'}}>
          <Badge variant="secondary" className="px-6 py-3 text-base bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow">
            <MapPin className="w-5 h-5 ml-2 text-blue-600" />
            الناصرية، العراق
          </Badge>
          <Badge variant="secondary" className="px-6 py-3 text-base bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow">
            <Calendar className="w-5 h-5 ml-2 text-purple-600" />
            19 عامًا
          </Badge>
        </div>
        
        <p className="text-xl md:text-2xl text-gray-700 leading-relaxed px-4 max-w-3xl mx-auto animate-fade-in" style={{animationDelay: '0.4s'}}>
          مطور محترف ومنشئ محتوى تقني، متخصص في تطوير التطبيقات وبرمجة البوتات. 
          أشارك خبرتي عبر قنواتي المختلفة وأسعى لتحويل الأفكار إلى حلول تقنية مبتكرة.
        </p>
        
        <div className="mt-10 animate-fade-in" style={{animationDelay: '0.6s'}}>
          <Button 
            className="bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600 hover:from-blue-600 hover:via-purple-700 hover:to-pink-700 text-white px-10 py-4 text-xl rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
            onClick={() => window.open('https://t.me/qqxqqv', '_blank')}
          >
            <MessageCircle className="w-6 h-6 ml-3" />
            تواصل معي
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
