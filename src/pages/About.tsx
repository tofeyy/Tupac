
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, Code, Zap, Heart, Star } from 'lucide-react';

const About = () => {
  const skills = [
    { name: 'تطوير التطبيقات', icon: '💻', color: 'bg-blue-500', description: 'تطوير تطبيقات ويب متطورة وسريعة الاستجابة' },
    { name: 'أدوات Python', icon: '🐍', color: 'bg-green-500', description: 'إنشاء أدوات وسكريبت بايثون متخصصة' },
    { name: 'بوتات تيليجرام', icon: '🤖', color: 'bg-purple-500', description: 'برمجة بوتات ذكية ومتطورة لتيليجرام' },
    { name: 'قواعد البيانات', icon: '💾', color: 'bg-orange-500', description: 'تصميم وإدارة قواعد البيانات المتطورة' },
    { name: 'واجهات المستخدم', icon: '🎨', color: 'bg-pink-500', description: 'تصميم واجهات جميلة وسهلة الاستخدام' },
    { name: 'الذكاء الاصطناعي', icon: '🧠', color: 'bg-indigo-500', description: 'تطبيق تقنيات الذكاء الاصطناعي في المشاريع' }
  ];

  const achievements = [
    { title: 'مشاريع مكتملة', count: '50+', icon: <Code className="w-5 h-5" /> },
    { title: 'عملاء راضون', count: '100+', icon: <Heart className="w-5 h-5" /> },
    { title: 'سنوات خبرة', count: '5+', icon: <Star className="w-5 h-5" /> },
    { title: 'بوتات نشطة', count: '20+', icon: <Zap className="w-5 h-5" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full blur-lg opacity-30 animate-pulse"></div>
            <img
              src="https://b.top4top.io/p_34587ahd40.jpg"
              alt="توفي العامري"
              className="relative w-40 h-40 rounded-full mx-auto border-4 border-white shadow-2xl object-cover"
            />
          </div>
          
          <div className="space-y-4 max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
              توفي العامري
            </h1>
            
            <div className="flex items-center justify-center gap-4 mb-6">
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <MapPin className="w-4 h-4 ml-2" />
                الناصرية، العراق
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <Calendar className="w-4 h-4 ml-2" />
                19 عامًا
              </Badge>
            </div>
            
            <p className="text-xl text-gray-700 leading-relaxed px-4">
              مطور محترف متخصص في تطوير التطبيقات وبرمجة البوتات، بخبرة عميقة في Python وتقنيات الويب الحديثة. 
              أسعى لتحويل الأفكار إلى حلول تقنية مبتكرة ومفيدة.
            </p>
          </div>
        </div>

        {/* Achievements */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {achievements.map((achievement, index) => (
            <Card key={index} className="text-center p-6 hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-0">
                <div className="flex justify-center mb-3 text-blue-600">
                  {achievement.icon}
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-2">{achievement.count}</div>
                <div className="text-sm text-gray-600">{achievement.title}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Skills Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            مهاراتي التقنية
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-0 bg-white/90 backdrop-blur-sm overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 ${skill.color} rounded-lg flex items-center justify-center text-white text-xl group-hover:scale-110 transition-transform duration-300`}>
                      {skill.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2 text-gray-800">{skill.name}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{skill.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* About Me Section */}
        <Card className="border-0 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <CardContent className="p-8 md:p-12">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">نبذة عني</h2>
              <p className="text-lg leading-relaxed mb-6 opacity-95">
                أنا كاظم، المعروف باسم توفي العامري، مطور شغوف بالتكنولوجيا والابتكار. 
                بدأت رحلتي في عالم البرمجة منذ سنوات، وتطورت مهاراتي لتشمل تطوير التطبيقات، 
                برمجة بوتات تيليجرام المتطورة، وإنشاء أدوات Python المتخصصة.
              </p>
              <p className="text-lg leading-relaxed opacity-95">
                أؤمن بأن التكنولوجيا يجب أن تكون في خدمة الإنسان، ولذلك أسعى دائماً لإنشاء حلول 
                تقنية تجعل الحياة أسهل وأكثر إنتاجية. كل مشروع أعمل عليه هو فرصة جديدة للتعلم والإبداع.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;
