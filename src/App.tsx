import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate, useNavigate } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { SiteProvider, useSite } from '@/contexts/SiteContext';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import LoginModal from '@/components/LoginModal';
import GenericDownloader from '@/components/GenericDownloader';
import Index from "@/pages/Index";
import About from "@/pages/About";
import Admin from "@/pages/Admin";
import Tutorials from "@/pages/Tutorials";
import Websites from "@/pages/Websites";
import Apps from "@/pages/Apps";
import AppDetail from "@/pages/AppDetail";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  
  console.log('ProtectedRoute: التحقق من المستخدم:', user);
  
  if (!user?.isAdmin) {
    console.log('ProtectedRoute: المستخدم ليس أدمن، إعادة توجيه للصفحة الرئيسية');
    return <Navigate to="/" replace />;
  }
  
  console.log('ProtectedRoute: المستخدم أدمن، السماح بالوصول');
  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  const { menuItems } = useSite();
  const location = useLocation();

  const getDownloaderTitle = (type: string) => {
    switch (type) {
      case 'instagram': return 'تحميل من انستغرام';
      case 'twitter': return 'تحميل من تويتر';
      case 'pinterest': return 'تحميل من بنترست';
      default: return 'تحميل المحتوى';
    }
  };

  const getDownloaderPlaceholder = (type: string) => {
    switch (type) {
      case 'instagram': return 'الصق رابط انستغرام هنا...';
      case 'twitter': return 'الصق رابط تويتر هنا...';
      case 'pinterest': return 'الصق رابط بنترست هنا...';
      default: return 'الصق الرابط هنا...';
    }
  };

  return (
    <Routes>
      <Route path="/" element={<About />} />
      <Route path="/tiktok" element={<Index />} />
      <Route path="/about" element={<About />} />
      <Route path="/tutorials" element={<Tutorials />} />
      <Route path="/websites" element={<Websites />} />
      <Route path="/apps" element={<Apps />} />
      <Route path="/app/:appId" element={<AppDetail />} />
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        } 
      />
      {menuItems
        .filter(item => ['instagram', 'twitter', 'pinterest'].includes(item.type))
        .map(item => (
          <Route
            key={item.id}
            path={`/downloader/${item.type}`}
            element={
              <GenericDownloader
                title={getDownloaderTitle(item.type)}
                apiUrl={item.apiUrl || ''}
                placeholder={getDownloaderPlaceholder(item.type)}
              />
            }
          />
        ))
      }
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const AppContent: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  console.log('المسار الحالي:', location.pathname);

  const handleNavigate = (path: string) => {
    console.log('الانتقال إلى:', path);
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Header
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />
      
      <div className="flex">
        <div className="hidden lg:block lg:w-80 flex-shrink-0">
          <Sidebar
            isOpen={true}
            onClose={() => {}}
            onLogin={() => setLoginModalOpen(true)}
            onNavigate={handleNavigate}
            currentPath={location.pathname}
          />
        </div>
        
        <div className="lg:hidden">
          <Sidebar
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            onLogin={() => setLoginModalOpen(true)}
            onNavigate={handleNavigate}
            currentPath={location.pathname}
          />
        </div>

        <main className="flex-1 min-h-screen">
          <AppRoutes />
        </main>
      </div>

      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
      />
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <SiteProvider>
          <Router>
            <AppContent />
            <Toaster />
            <Sonner />
          </Router>
        </SiteProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
