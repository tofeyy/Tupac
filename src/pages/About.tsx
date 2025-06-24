
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Calendar, Code, Zap, Heart, Star, Youtube, MessageCircle, Instagram, Github, ExternalLink } from 'lucide-react';

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
    { title: 'مشاريع مكتملة', count: '50+', icon: <Code className="w-6 h-6" /> },
    { title: 'عملاء راضون', count: '100+', icon: <Heart className="w-6 h-6" /> },
    { title: 'سنوات خبرة', count: '5+', icon: <Star className="w-6 h-6" /> },
    { title: 'بوتات نشطة', count: '20+', icon: <Zap className="w-6 h-6" /> }
  ];

  const channels = [
    {
      name: 'قناة توفي التقنية',
      type: 'يوتيوب',
      subscribers: '15K+',
      description: 'تعلم البرمجة والتطوير',
      icon: <Youtube className="w-6 h-6" />,
      color: 'bg-red-500',
      url: '#'
    },
    {
      name: 'توفي للبرمجة',
      type: 'تيليجرام',
      subscribers: '8K+',
      description: 'مشاركة الأكواد والمشاريع',
      icon: <MessageCircle className="w-6 h-6" />,
      color: 'bg-blue-500',
      url: '#'
    },
    {
      name: 'توفي الشخصي',
      type: 'انستغرام',
      subscribers: '5K+',
      description: 'محتوى شخصي وتقني',
      icon: <Instagram className="w-6 h-6" />,
      color: 'bg-gradient-to-r from-purple-500 to-pink-500',
      url: '#'
    },
    {
      name: 'مشاريع توفي',
      type: 'جيت هاب',
      subscribers: '200+',
      description: 'مشاريع مفتوحة المصدر',
      icon: <Github className="w-6 h-6" />,
      color: 'bg-gray-800',
      url: '#'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full blur-xl opacity-30 animate-pulse scale-110"></div>
            <img
              src="https://b.top4top.io/p_34587ahd40.jpg"
              alt="توفي العامري"
              className="relative w-32 h-32 md:w-40 md:h-40 rounded-full mx-auto border-4 border-white shadow-2xl object-cover"
            />
          </div>
          
          <div className="space-y-4 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              توفي العامري
            </h1>
            
            <div className="flex items-center justify-center gap-4 mb-6 flex-wrap">
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <MapPin className="w-4 h-4 ml-2" />
                الناصرية، العراق
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <Calendar className="w-4 h-4 ml-2" />
                19 عامًا
              </Badge>
            </div>
            
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed px-4 max-w-3xl mx-auto">
              مطور محترف ومنشئ محتوى تقني، متخصص في تطوير التطبيقات وبرمجة البوتات. 
              أشارك خبرتي عبر قنواتي المختلفة وأسعى لتحويل الأفكار إلى حلول تقنية مبتكرة.
            </p>
          </div>
        </div>

        {/* Achievements */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
          {achievements.map((achievement, index) => (
            <Card key={index} className="text-center p-4 md:p-6 hover:shadow-xl transition-all duration-300 border-0 bg-white/90 backdrop-blur-sm hover:-translate-y-1">
              <CardContent className="p-0">
                <div className="flex justify-center mb-3 text-indigo-600">
                  {achievement.icon}
                </div>
                <div className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{achievement.count}</div>
                <div className="text-xs md:text-sm text-gray-600">{achievement.title}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Channels Section */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
              قنواتي ووسائل التواصل
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              تابعني عبر قنواتي المختلفة للحصول على أحدث المحتوى التقني والتعليمي
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {channels.map((channel, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-0 bg-white/95 backdrop-blur-sm overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 ${channel.color} rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}>
                        {channel.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-1">{channel.name}</h3>
                        <p className="text-sm text-gray-500">{channel.type}</p>
                      </div>
                    </div>
                    <Badge className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200">
                      {channel.subscribers}
                    </Badge>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{channel.description}</p>
                  
                  <Button 
                    className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white"
                    onClick={() => window.open(channel.url, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 ml-2" />
                    زيارة القناة
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Skills Section */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            مهاراتي التقنية
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-0 bg-white/95 backdrop-blur-sm overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 ${skill.color} rounded-xl flex items-center justify-center text-white text-xl group-hover:scale-110 transition-transform duration-300`}>
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
        <Card className="border-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-2xl">
          <CardContent className="p-8 md:p-12">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">نبذة عني</h2>
              <div className="space-y-4 text-lg leading-relaxed opacity-95">
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
      </div>
    </div>
  );
};

export default About;
