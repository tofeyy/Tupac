
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useSite } from '@/contexts/SiteContext';
import { ExternalLink, Globe } from 'lucide-react';

const Websites = () => {
  const { websites } = useSite();

  if (websites.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold gradient-text mb-4">لا توجد مواقع حالياً</h2>
          <p className="text-gray-600">سيتم إضافة مواقع مفيدة قريباً...</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 p-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold gradient-text mb-4">مجموعة المواقع المفيدة</h1>
          <p className="text-gray-600">مواقع وأدوات مفيدة في مجال البرمجة والتقنية</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {websites.map((website) => (
            <Card key={website.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
              <div className="relative">
                {website.image ? (
                  <img
                    src={website.image}
                    alt={website.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-48 bg-gradient-to-br from-green-400 to-blue-400 flex items-center justify-center">
                    <Globe className="w-16 h-16 text-white" />
                  </div>
                )}
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  {website.name}
                </h3>
                
                {website.description && (
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {website.description}
                  </p>
                )}
                
                <Button
                  onClick={() => window.open(website.url, '_blank')}
                  className="w-full gradient-bg text-white hover:opacity-90 flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  زيارة الموقع
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Websites;
