
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useSite } from '@/contexts/SiteContext';
import { useAuth } from '@/contexts/AuthContext';
import { LogIn, LogOut, Settings, Download, Video, Globe, Smartphone, BookOpen, Crown, Star } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
  onNavigate: (path: string) => void;
  currentPath: string;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, onLogin, onNavigate, currentPath }) => {
  const { menuItems } = useSite();
  const { user, logout } = useAuth();

  const getIcon = (type: string) => {
    switch (type) {
      case 'tiktok':
      case 'instagram':
      case 'twitter':
      case 'pinterest':
        return <Download className="w-5 h-5" />;
      case 'tutorials':
        return <Video className="w-5 h-5" />;
      case 'websites':
        return <Globe className="w-5 h-5" />;
      case 'apps':
        return <Smartphone className="w-5 h-5" />;
      default:
        return <BookOpen className="w-5 h-5" />;
    }
  };

  const getPath = (item: any) => {
    if (item.type === 'tiktok') return '/tiktok';
    if (item.name === 'حولي') return '/';
    if (item.type === 'tutorials') return '/tutorials';
    if (item.type === 'websites') return '/websites';
    if (item.type === 'apps') return '/apps';
    return `/downloader/${item.type}`;
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed top-0 right-0 h-full w-96 luxury-card z-50 transform transition-all duration-500 ease-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        lg:relative lg:translate-x-0 lg:shadow-2xl
      `}>
        <div className="p-8 h-full overflow-y-auto">
          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center space-x-3 space-x-reverse mb-6">
              <div className="w-14 h-14 luxury-gradient rounded-2xl flex items-center justify-center shadow-xl">
                <Crown className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold font-playfair text-shimmer">القائمة الفاخرة</h2>
                <p className="text-sm text-gray-500">اختر ما تريد</p>
              </div>
            </div>
            
            {/* Login/Logout Button */}
            {user ? (
              <div className="space-y-4">
                <div className="p-4 luxury-card rounded-2xl">
                  <div className="flex items-center space-x-3 space-x-reverse mb-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full flex items-center justify-center">
                      <Star className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">مرحباً</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2 space-x-reverse">
                    <Button 
                      onClick={logout}
                      variant="outline" 
                      size="sm"
                      className="flex-1 luxury-card border-red-200 text-red-600 hover:bg-red-50 transition-all duration-300"
                    >
                      <LogOut className="w-4 h-4 ml-2" />
                      خروج
                    </Button>
                    {user.isAdmin && (
                      <Button 
                        onClick={() => {
                          onNavigate('/admin');
                          onClose();
                        }}
                        size="sm"
                        className="luxury-gradient-2 text-white hover:shadow-xl transition-all duration-300"
                      >
                        <Settings className="w-4 h-4 ml-2" />
                        إدارة
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <Button 
                onClick={() => {
                  onLogin();
                  onClose();
                }}
                className="w-full luxury-gradient text-white hover:shadow-2xl transition-all duration-300 h-14 text-lg font-semibold rounded-2xl"
              >
                <LogIn className="w-5 h-5 ml-3" />
                دخول فخم
              </Button>
            )}
          </div>

          {/* Menu Items */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold font-playfair text-gray-700 mb-6 flex items-center">
              <div className="w-6 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full ml-3"></div>
              الأقسام المتاحة
            </h3>
            
            {menuItems.map((item, index) => {
              const path = getPath(item);
              const isActive = currentPath === path;
              
              return (
                <Card key={item.id} className={`
                  relative overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1
                  ${isActive ? 'luxury-card border-2 border-purple-300 shadow-2xl' : 'bg-white/60 backdrop-blur-sm hover:bg-white/80'}
                `} style={{ animationDelay: `${index * 100}ms` }}>
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"></div>
                  )}
                  <button
                    onClick={() => {
                      onNavigate(path);
                      onClose();
                    }}
                    className="w-full text-right flex items-center gap-4 p-6 relative z-10"
                  >
                    <div className={`p-3 rounded-xl transition-all duration-300 ${
                      isActive 
                        ? 'luxury-gradient text-white shadow-lg' 
                        : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'
                    }`}>
                      {getIcon(item.type)}
                    </div>
                    <div className="flex-1">
                      <span className={`font-semibold text-lg ${
                        isActive ? 'text-purple-700' : 'text-gray-700'
                      }`}>
                        {item.name}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">خدمة فاخرة</p>
                    </div>
                    {isActive && (
                      <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
                    )}
                  </button>
                </Card>
              );
            })}
          </div>

          {/* Footer */}
          <div className="mt-8 p-4 luxury-card rounded-2xl text-center">
            <div className="w-12 h-12 luxury-gradient rounded-full mx-auto mb-3 flex items-center justify-center">
              <Crown className="w-6 h-6 text-white" />
            </div>
            <p className="text-sm font-medium text-gray-700">منصة التحميل الفاخرة</p>
            <p className="text-xs text-gray-500">تجربة مميزة وأنيقة</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
