
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const SkillsSection = () => {
  const skills = [
    { name: 'تطوير التطبيقات', icon: '💻', color: 'bg-gradient-to-r from-blue-500 to-cyan-500', description: 'تطوير تطبيقات ويب متطورة وسريعة الاستجابة' },
    { name: 'أدوات Python', icon: '🐍', color: 'bg-gradient-to-r from-green-500 to-emerald-500', description: 'إنشاء أدوات وسكريبت بايثون متخصصة' },
    { name: 'بوتات تيليجرام', icon: '🤖', color: 'bg-gradient-to-r from-purple-500 to-violet-500', description: 'برمجة بوتات ذكية ومتطورة لتيليجرام' },
    { name: 'قواعد البيانات', icon: '💾', color: 'bg-gradient-to-r from-orange-500 to-amber-500', description: 'تصميم وإدارة قواعد البيانات المتطورة' },
    { name: 'واجهات المستخدم', icon: '🎨', color: 'bg-gradient-to-r from-pink-500 to-rose-500', description: 'تصميم واجهات جميلة وسهلة الاستخدام' },
    { name: 'الذكاء الاصطناعي', icon: '🧠', color: 'bg-gradient-to-r from-indigo-500 to-purple-600', description: 'تطبيق تقنيات الذكاء الاصطناعي في المشاريع' }
  ];

  return (
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
  );
};

export default SkillsSection;
