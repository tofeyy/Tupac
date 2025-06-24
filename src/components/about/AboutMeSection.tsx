
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const AboutMeSection = () => {
  return (
    <Card className="border-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-2xl animate-fade-in overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 backdrop-blur-sm"></div>
      <CardContent className="p-12 md:p-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">نبذة عني</h2>
          <div className="space-y-6 text-xl leading-relaxed opacity-95">
            <p>
              أنا كاظم، المعروف باسم توفي العامري، مطور شغوف بالتكنولوجيا ومنشئ محتوى تقني. 
              بدأت رحلتي في عالم البرمجة منذ سنوات، وطورت مهاراتي لتشمل تطوير التطبيقات، 
              برمجة بوتات تيليجرام المتطورة، وإنشاء أدوات Python المتخصصة.
            </p>
            <p>
              أؤمن بأن التكنولوجيا يجب أن تكون في خدمة الإنسان، ولذلك أسعى دائماً لإنشاء حلول 
              تقنية تجعل الحياة أسهل وأكثر إنتاجية. كما أشارك معرفتي وخبرتي عبر قنواتي المختلفة 
              لمساعدة المطورين الجدد على تعلم البرمجة وتطوير مهاراتهم.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AboutMeSection;
