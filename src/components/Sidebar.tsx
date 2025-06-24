
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useSite } from '@/contexts/SiteContext';
import { useAuth } from '@/contexts/AuthContext';
import { LogIn, LogOut, Settings, Download, Video, Globe, Smartphone, BookOpen } from 'lucide-react';

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
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        lg:relative lg:translate-x-0 lg:shadow-lg
      `}>
        <div className="p-6 h-full overflow-y-auto">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold gradient-text mb-4">القائمة الرئيسية</h2>
            
            {/* Login/Logout Button */}
            {user ? (
              <div className="space-y-3">
                <p className="text-sm text-gray-600">مرحباً، {user.email}</p>
                <div className="flex space-x-2 space-x-reverse">
                  <Button 
                    onClick={logout}
                    variant="outline" 
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    تسجيل خروج
                  </Button>
                  {user.isAdmin && (
                    <Button 
                      onClick={() => {
                        onNavigate('/admin');
                        onClose();
                      }}
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <Settings className="w-4 h-4" />
                      الإدارة
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              <Button 
                onClick={() => {
                  onLogin();
                  onClose();
                }}
                className="w-full gradient-bg text-white hover:opacity-90 flex items-center gap-2"
              >
                <LogIn className="w-5 h-5" />
                تسجيل دخول
              </Button>
            )}
          </div>

          {/* Menu Items */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">الأقسام</h3>
            
            {menuItems.map((item) => {
              const path = getPath(item);
              const isActive = currentPath === path;
              
              return (
                <Card key={item.id} className={`
                  p-4 cursor-pointer transition-all duration-200 hover:shadow-md
                  ${isActive ? 'bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200' : 'hover:bg-gray-50'}
                `}>
                  <button
                    onClick={() => {
                      onNavigate(path);
                      onClose();
                    }}
                    className="w-full text-right flex items-center gap-3"
                  >
                    <div className={`p-2 rounded-lg ${isActive ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-600'}`}>
                      {getIcon(item.type)}
                    </div>
                    <span className={`font-medium ${isActive ? 'text-purple-700' : 'text-gray-700'}`}>
                      {item.name}
                    </span>
                  </button>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
