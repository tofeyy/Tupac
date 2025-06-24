
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Youtube, MessageCircle, Instagram, ExternalLink } from 'lucide-react';

const ChannelsSection = () => {
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
  );
};

export default ChannelsSection;
