
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useSite } from '@/contexts/SiteContext';
import { Download, Smartphone } from 'lucide-react';

const Apps = () => {
  const { apps } = useSite();

  if (apps.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold gradient-text mb-4">لا توجد تطبيقات حالياً</h2>
          <p className="text-gray-600">سيتم إضافة تطبيقات مفيدة قريباً...</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 p-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold gradient-text mb-4">متجر التطبيقات</h1>
          <p className="text-gray-600">تطبيقات وأدوات مفيدة من تطوير توفي العامري</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apps.map((app) => (
            <Card key={app.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <div className="mb-4">
                  {app.icon ? (
                    <img
                      src={app.icon}
                      alt={app.name}
                      className="w-16 h-16 mx-auto rounded-2xl shadow-lg"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-blue-400 rounded-2xl flex items-center justify-center mx-auto">
                      <Smartphone className="w-8 h-8 text-white" />
                    </div>
                  )}
                </div>
                
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  {app.name}
                </h3>
                
                {app.description && (
                  <p className="text-gray-600 mb-6 line-clamp-3">
                    {app.description}
                  </p>
                )}
                
                <Button
                  onClick={() => window.open(app.downloadUrl, '_blank')}
                  className="w-full gradient-bg text-white hover:opacity-90 flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  تحميل التطبيق
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Apps;
