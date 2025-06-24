
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Code, Heart, Star, Zap } from 'lucide-react';

const AchievementsGrid = () => {
  const achievements = [
    { title: 'مشاريع مكتملة', count: '50+', icon: <Code className="w-6 h-6" />, color: 'from-blue-500 to-cyan-500' },
    { title: 'عملاء راضون', count: '100+', icon: <Heart className="w-6 h-6" />, color: 'from-red-500 to-pink-500' },
    { title: 'سنوات خبرة', count: '5+', icon: <Star className="w-6 h-6" />, color: 'from-yellow-500 to-orange-500' },
    { title: 'بوتات نشطة', count: '20+', icon: <Zap className="w-6 h-6" />, color: 'from-purple-500 to-indigo-500' }
  ];

  return (
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
  );
};

export default AchievementsGrid;
