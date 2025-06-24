
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Calendar, Code, Zap, Heart, Star, Youtube, MessageCircle, Instagram, ExternalLink, Sparkles } from 'lucide-react';

const About = () => {
  const skills = [
    { name: 'تطوير التطبيقات', icon: '💻', color: 'bg-gradient-to-r from-blue-500 to-cyan-500', description: 'تطوير تطبيقات ويب متطورة وسريعة الاستجابة' },
    { name: 'أدوات Python', icon: '🐍', color: 'bg-gradient-to-r from-green-500 to-emerald-500', description: 'إنشاء أدوات وسكريبت بايثون متخصصة' },
    { name: 'بوتات تيليجرام', icon: '🤖', color: 'bg-gradient-to-r from-purple-500 to-violet-500', description: 'برمجة بوتات ذكية ومتطورة لتيليجرام' },
    { name: 'قواعد البيانات', icon: '💾', color: 'bg-gradient-to-r from-orange-500 to-amber-500', description: 'تصميم وإدارة قواعد البيانات المتطورة' },
    { name: 'واجهات المستخدم', icon: '🎨', color: 'bg-gradient-to-r from-pink-500 to-rose-500', description: 'تصميم واجهات جميلة وسهلة الاستخدام' },
    { name: 'الذكاء الاصطناعي', icon: '🧠', color: 'bg-gradient-to-r from-indigo-500 to-purple-600', description: 'تطبيق تقنيات الذكاء الاصطناعي في المشاريع' }
  ];

  const achievements = [
    { title: 'مشاريع مكتملة', count: '50+', icon: <Code className="w-6 h-6" />, color: 'from-blue-500 to-cyan-500' },
    { title: 'عملاء راضون', count: '100+', icon: <Heart className="w-6 h-6" />, color: 'from-red-500 to-pink-500' },
    { title: 'سنوات خبرة', count: '5+', icon: <Star className="w-6 h-6" />, color: 'from-yellow-500 to-orange-500' },
    { title: 'بوتات نشطة', count: '20+', icon: <Zap className="w-6 h-6" />, color: 'from-purple-500 to-indigo-500' }
  ];

  const channels = [
    {
      name: 'قناة توفي التقنية',
      type: 'يوتيوب',
      subscribers: '15K+',
      description: 'تعلم البرمجة والتطوير',
      icon: <Youtube className="w-6 h-6" />,
      color: 'bg-gradient-to-r from-red-500 to-red-600',
      textColor: 'text-red-600',
      bgColor: 'bg-red-50',
      url: 'https://youtube.com/@t66td'
    },
    {
      name: 'قناة توفي',
      type: 'تيليجرام',
      subscribers: '8K+',
      description: 'قناة توفي الرسمية',
      icon: <MessageCircle className="w-6 h-6" />,
      color: 'bg-gradient-to-r from-blue-500 to-blue-600',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
      url: 'https://t.me/t66td'
    },
    {
      name: 'توفي الشخصي',
      type: 'انستغرام',
      subscribers: '5K+',
      description: 'محتوى شخصي وتقني',
      icon: <Instagram className="w-6 h-6" />,
      color: 'bg-gradient-to-r from-purple-500 to-pink-500',
      textColor: 'text-purple-600',
      bgColor: 'bg-purple-50',
      url: 'https://www.instagram.com/f8__x'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-pink-400 to-red-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Hero Section */}
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
            
            {/* Contact Button */}
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

        {/* Achievements */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {achievements.map((achievement, index) => (
            <Card key={index} className="text-center p-6 hover:shadow-2xl transition-all duration-500 border-0 bg-white/90 backdrop-blur-sm hover:-translate-y-2 animate-fade-in group" style={{animationDelay: `${0.8 + index * 0.1}s`}}>
              <CardContent className="p-0">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${achievement.color} flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  {achievement.icon}
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">{achievement.count}</div>
                <div className="text-sm md:text-base text-gray-600 font-medium">{achievement.title}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Channels Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6 animate-fade-in">
              قنواتي ووسائل التواصل
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-fade-in" style={{animationDelay: '0.2s'}}>
              تابعني عبر قنواتي المختلفة للحصول على أحدث المحتوى التقني والتعليمي
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {channels.map((channel, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 bg-white/95 backdrop-blur-sm overflow-hidden animate-fade-in" style={{animationDelay: `${0.4 + index * 0.2}s`}}>
                <CardContent className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className={`w-16 h-16 ${channel.color} rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        {channel.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-1">{channel.name}</h3>
                        <p className="text-sm text-gray-500">{channel.type}</p>
                      </div>
                    </div>
                    <Badge className={`${channel.bgColor} ${channel.textColor} border-0 px-4 py-2 font-bold`}>
                      {channel.subscribers}
                    </Badge>
                  </div>
                  
                  <p className="text-gray-600 mb-6 text-base leading-relaxed">{channel.description}</p>
                  
                  <Button 
                    className={`w-full ${channel.color} hover:opacity-90 text-white rounded-xl py-3 text-base font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300`}
                    onClick={() => window.open(channel.url, '_blank')}
                  >
                    <ExternalLink className="w-5 h-5 ml-2" />
                    زيارة القناة
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Skills Section */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent animate-fade-in">
            مهاراتي التقنية
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 bg-white/95 backdrop-blur-sm overflow-hidden animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                <CardContent className="p-8">
                  <div className="flex items-start gap-5">
                    <div className={`w-16 h-16 ${skill.color} rounded-2xl flex items-center justify-center text-white text-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      {skill.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-3 text-gray-800">{skill.name}</h3>
                      <p className="text-gray-600 leading-relaxed">{skill.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* About Me Section */}
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
      </div>
    </div>
  );
};

export default About;
