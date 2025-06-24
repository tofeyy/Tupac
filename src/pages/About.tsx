
import React from 'react';
import HeroSection from '@/components/about/HeroSection';
import AchievementsGrid from '@/components/about/AchievementsGrid';
import ChannelsSection from '@/components/about/ChannelsSection';
import SkillsSection from '@/components/about/SkillsSection';
import AboutMeSection from '@/components/about/AboutMeSection';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-pink-400 to-red-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <HeroSection />
        <AchievementsGrid />
        <ChannelsSection />
        <SkillsSection />
        <AboutMeSection />
      </div>
    </div>
  );
};

export default About;
