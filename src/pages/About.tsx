
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="mb-8">
            <img
              src="https://b.top4top.io/p_34587ahd40.jpg"
              alt="توفي العامري"
              className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-purple-200 shadow-xl animate-float"
            />
            <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
              توفي العامري
            </h1>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-gray-700 leading-relaxed">
                أنا كاظم، الملقب بـ توفي العامري، مبرمج محترف ومطور قديم من الناصرية - العراق. 
                وُلدت عام 2006، وأبلغ من العمر 19 عامًا. بدأت رحلتي في عالم البرمجة منذ سنوات، 
                وامتلكت خبرة عميقة في تطوير التطبيقات، صناعة أدوات Python، وبرمجة بوتات تيليجرام. 
                أنا لست مجرد مطوّر... بل أُتقن السيطرة على التفاصيل خلف الكواليس، 
                حيث لا يُرى العمل، لكن يُشعَر أثره.
              </p>
            </div>
          </div>
        </div>

        {/* Skills Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-12 max-w-6xl mx-auto">
          <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                <span className="text-2xl">💻</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">تطوير التطبيقات</h3>
              <p className="text-gray-600">خبرة في تطوير تطبيقات متنوعة ومتطورة</p>
            </CardContent>
          </Card>
          
          <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                <span className="text-2xl">🐍</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">أدوات Python</h3>
              <p className="text-gray-600">صناعة أدوات متخصصة بلغة البايثون</p>
            </CardContent>
          </Card>
          
          <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">بوتات تيليجرام</h3>
              <p className="text-gray-600">برمجة بوتات ذكية ومتطورة</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;
