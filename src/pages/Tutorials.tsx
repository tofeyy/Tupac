
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useSite } from '@/contexts/SiteContext';
import { ExternalLink, Play } from 'lucide-react';

const Tutorials = () => {
  const { tutorials } = useSite();

  if (tutorials.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold gradient-text mb-4">لا توجد شروحات حالياً</h2>
          <p className="text-gray-600">سيتم إضافة شروحات قريباً...</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 p-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold gradient-text mb-4">الشروحات التعليمية</h1>
          <p className="text-gray-600">شروحات متنوعة في مجال البرمجة والتقنية</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutorials.map((tutorial) => (
            <Card key={tutorial.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
              <div className="relative">
                {tutorial.thumbnail ? (
                  <img
                    src={tutorial.thumbnail}
                    alt={tutorial.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-48 bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center">
                    <Play className="w-16 h-16 text-white" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                  <Play className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-gray-800 line-clamp-2">
                  {tutorial.title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {tutorial.description}
                </p>
                
                <Button
                  onClick={() => window.open(tutorial.youtubeUrl, '_blank')}
                  className="w-full gradient-bg text-white hover:opacity-90 flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  مشاهدة على يوتيوب
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tutorials;
