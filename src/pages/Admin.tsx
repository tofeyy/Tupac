
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useSite } from '@/contexts/SiteContext';
import { toast } from '@/hooks/use-toast';
import { Plus, Trash2, Settings } from 'lucide-react';

const Admin = () => {
  const { 
    menuItems, 
    tutorials, 
    websites, 
    apps, 
    addMenuItem, 
    addTutorial, 
    addWebsite, 
    addApp,
    deleteMenuItem,
    deleteTutorial,
    deleteWebsite,
    deleteApp
  } = useSite();

  const [newMenuItem, setNewMenuItem] = useState({
    name: '',
    type: 'instagram' as any,
    apiUrl: ''
  });

  const [newTutorial, setNewTutorial] = useState({
    title: '',
    description: '',
    thumbnail: '',
    youtubeUrl: ''
  });

  const [newWebsite, setNewWebsite] = useState({
    name: '',
    description: '',
    url: '',
    image: ''
  });

  const [newApp, setNewApp] = useState({
    name: '',
    description: '',
    downloadUrl: '',
    icon: ''
  });

  const handleAddMenuItem = () => {
    if (!newMenuItem.name || !newMenuItem.type) {
      toast({
        title: "خطأ",
        description: "الرجاء ملء جميع الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }

    addMenuItem(newMenuItem);
    setNewMenuItem({ name: '', type: 'instagram', apiUrl: '' });
    toast({
      title: "تم بنجاح",
      description: "تم إضافة عنصر القائمة بنجاح",
    });
  };

  const handleAddTutorial = () => {
    if (!newTutorial.title || !newTutorial.description || !newTutorial.youtubeUrl) {
      toast({
        title: "خطأ",
        description: "الرجاء ملء جميع الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }

    addTutorial(newTutorial);
    setNewTutorial({ title: '', description: '', thumbnail: '', youtubeUrl: '' });
    toast({
      title: "تم بنجاح",
      description: "تم إضافة الشرح بنجاح",
    });
  };

  const handleAddWebsite = () => {
    if (!newWebsite.name || !newWebsite.url) {
      toast({
        title: "خطأ",
        description: "الرجاء ملء جميع الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }

    addWebsite(newWebsite);
    setNewWebsite({ name: '', description: '', url: '', image: '' });
    toast({
      title: "تم بنجاح",
      description: "تم إضافة الموقع بنجاح",
    });
  };

  const handleAddApp = () => {
    if (!newApp.name || !newApp.downloadUrl) {
      toast({
        title: "خطأ",
        description: "الرجاء ملء جميع الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }

    addApp(newApp);
    setNewApp({ name: '', description: '', downloadUrl: '', icon: '' });
    toast({
      title: "تم بنجاح",
      description: "تم إضافة التطبيق بنجاح",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 p-4">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold gradient-text flex items-center justify-center gap-2 mb-2">
            <Settings className="w-8 h-8" />
            لوحة التحكم
          </h1>
          <p className="text-gray-600">إدارة محتوى الموقع وإضافة ميزات جديدة</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Add Menu Item */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                إضافة عنصر قائمة جديد
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="menuName">اسم العنصر</Label>
                <Input
                  id="menuName"
                  value={newMenuItem.name}
                  onChange={(e) => setNewMenuItem({ ...newMenuItem, name: e.target.value })}
                  placeholder="مثال: تحميل من انستغرام"
                />
              </div>
              
              <div>
                <Label htmlFor="menuType">نوع العنصر</Label>
                <Select value={newMenuItem.type} onValueChange={(value) => setNewMenuItem({ ...newMenuItem, type: value as any })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="instagram">تحميل من انستغرام</SelectItem>
                    <SelectItem value="twitter">تحميل من تويتر</SelectItem>
                    <SelectItem value="pinterest">تحميل من بنترست</SelectItem>
                    <SelectItem value="tutorials">مجموعة شروحات</SelectItem>
                    <SelectItem value="websites">مجموعة مواقع</SelectItem>
                    <SelectItem value="apps">مجموعة تطبيقات</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {(newMenuItem.type === 'instagram' || newMenuItem.type === 'twitter' || newMenuItem.type === 'pinterest') && (
                <div>
                  <Label htmlFor="apiUrl">رابط API</Label>
                  <Input
                    id="apiUrl"
                    value={newMenuItem.apiUrl}
                    onChange={(e) => setNewMenuItem({ ...newMenuItem, apiUrl: e.target.value })}
                    placeholder="https://api.example.com/download?url="
                  />
                </div>
              )}

              <Button onClick={handleAddMenuItem} className="w-full">
                إضافة العنصر
              </Button>
            </CardContent>
          </Card>

          {/* Add Tutorial */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                إضافة شرح جديد
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="tutorialTitle">عنوان الشرح</Label>
                <Input
                  id="tutorialTitle"
                  value={newTutorial.title}
                  onChange={(e) => setNewTutorial({ ...newTutorial, title: e.target.value })}
                  placeholder="عنوان الشرح"
                />
              </div>
              
              <div>
                <Label htmlFor="tutorialDesc">الوصف</Label>
                <Textarea
                  id="tutorialDesc"
                  value={newTutorial.description}
                  onChange={(e) => setNewTutorial({ ...newTutorial, description: e.target.value })}
                  placeholder="وصف الشرح"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="tutorialThumbnail">رابط الصورة المصغرة</Label>
                <Input
                  id="tutorialThumbnail"
                  value={newTutorial.thumbnail}
                  onChange={(e) => setNewTutorial({ ...newTutorial, thumbnail: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div>
                <Label htmlFor="youtubeUrl">رابط يوتيوب</Label>
                <Input
                  id="youtubeUrl"
                  value={newTutorial.youtubeUrl}
                  onChange={(e) => setNewTutorial({ ...newTutorial, youtubeUrl: e.target.value })}
                  placeholder="https://youtube.com/watch?v=..."
                />
              </div>

              <Button onClick={handleAddTutorial} className="w-full">
                إضافة الشرح
              </Button>
            </CardContent>
          </Card>

          {/* Add Website */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                إضافة موقع جديد
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="websiteName">اسم الموقع</Label>
                <Input
                  id="websiteName"
                  value={newWebsite.name}
                  onChange={(e) => setNewWebsite({ ...newWebsite, name: e.target.value })}
                  placeholder="اسم الموقع"
                />
              </div>
              
              <div>
                <Label htmlFor="websiteDesc">الوصف</Label>
                <Textarea
                  id="websiteDesc"
                  value={newWebsite.description}
                  onChange={(e) => setNewWebsite({ ...newWebsite, description: e.target.value })}
                  placeholder="وصف الموقع"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="websiteUrl">رابط الموقع</Label>
                <Input
                  id="websiteUrl"
                  value={newWebsite.url}
                  onChange={(e) => setNewWebsite({ ...newWebsite, url: e.target.value })}
                  placeholder="https://example.com"
                />
              </div>

              <div>
                <Label htmlFor="websiteImage">رابط الصورة</Label>
                <Input
                  id="websiteImage"
                  value={newWebsite.image}
                  onChange={(e) => setNewWebsite({ ...newWebsite, image: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <Button onClick={handleAddWebsite} className="w-full">
                إضافة الموقع
              </Button>
            </CardContent>
          </Card>

          {/* Add App */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                إضافة تطبيق جديد
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="appName">اسم التطبيق</Label>
                <Input
                  id="appName"
                  value={newApp.name}
                  onChange={(e) => setNewApp({ ...newApp, name: e.target.value })}
                  placeholder="اسم التطبيق"
                />
              </div>
              
              <div>
                <Label htmlFor="appDesc">الوصف</Label>
                <Textarea
                  id="appDesc"
                  value={newApp.description}
                  onChange={(e) => setNewApp({ ...newApp, description: e.target.value })}
                  placeholder="وصف التطبيق"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="downloadUrl">رابط التحميل</Label>
                <Input
                  id="downloadUrl"
                  value={newApp.downloadUrl}
                  onChange={(e) => setNewApp({ ...newApp, downloadUrl: e.target.value })}
                  placeholder="https://example.com/app.apk"
                />
              </div>

              <div>
                <Label htmlFor="appIcon">رابط الأيقونة</Label>
                <Input
                  id="appIcon"
                  value={newApp.icon}
                  onChange={(e) => setNewApp({ ...newApp, icon: e.target.value })}
                  placeholder="https://example.com/icon.png"
                />
              </div>

              <Button onClick={handleAddApp} className="w-full">
                إضافة التطبيق
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Current Items */}
        <div className="mt-12 space-y-8">
          {/* Menu Items */}
          {menuItems.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>عناصر القائمة الحالية</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {menuItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">{item.name}</span>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => deleteMenuItem(item.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Tutorials */}
          {tutorials.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>الشروحات الحالية</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {tutorials.map((tutorial) => (
                    <div key={tutorial.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">{tutorial.title}</span>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => deleteTutorial(tutorial.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
