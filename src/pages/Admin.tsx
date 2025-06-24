import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useSite } from '@/contexts/SiteContext';
import { toast } from '@/hooks/use-toast';
import { Plus, Trash2, Settings, Pen } from 'lucide-react';
import ImageUploader from '@/components/ImageUploader';
import AppFileUploader from '@/components/AppFileUploader';
import PageContentEditor from '@/components/PageContentEditor';

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
    deleteApp,
    updateMenuItem,
    updateTutorial,
    updateWebsite,
    updateApp
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
    icon: '',
    appFile: undefined as File | undefined,
    fileName: ''
  });

  // Edit states
  const [editingMenuItem, setEditingMenuItem] = useState<string | null>(null);
  const [editingTutorial, setEditingTutorial] = useState<string | null>(null);
  const [editingWebsite, setEditingWebsite] = useState<string | null>(null);
  const [editingApp, setEditingApp] = useState<string | null>(null);

  const [editMenuItem, setEditMenuItem] = useState({
    name: '',
    type: 'instagram' as any,
    apiUrl: ''
  });

  const [editTutorial, setEditTutorial] = useState({
    title: '',
    description: '',
    thumbnail: '',
    youtubeUrl: ''
  });

  const [editWebsite, setEditWebsite] = useState({
    name: '',
    description: '',
    url: '',
    image: ''
  });

  const [editApp, setEditApp] = useState({
    name: '',
    description: '',
    downloadUrl: '',
    icon: '',
    appFile: undefined as File | undefined,
    fileName: ''
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
    if (!newApp.name || (!newApp.downloadUrl && !newApp.appFile)) {
      toast({
        title: "خطأ",
        description: "الرجاء ملء جميع الحقول المطلوبة (الاسم + رابط التحميل أو ملف التطبيق)",
        variant: "destructive",
      });
      return;
    }

    addApp(newApp);
    setNewApp({ name: '', description: '', downloadUrl: '', icon: '', appFile: undefined, fileName: '' });
    toast({
      title: "تم بنجاح",
      description: "تم إضافة التطبيق بنجاح",
    });
  };

  const startEditMenuItem = (item: any) => {
    setEditingMenuItem(item.id);
    setEditMenuItem({
      name: item.name,
      type: item.type,
      apiUrl: item.apiUrl || ''
    });
  };

  const handleUpdateMenuItem = () => {
    if (!editMenuItem.name || !editMenuItem.type) {
      toast({
        title: "خطأ",
        description: "الرجاء ملء جميع الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }

    updateMenuItem(editingMenuItem!, editMenuItem);
    setEditingMenuItem(null);
    toast({
      title: "تم بنجاح",
      description: "تم تحديث عنصر القائمة بنجاح",
    });
  };

  const startEditTutorial = (tutorial: any) => {
    setEditingTutorial(tutorial.id);
    setEditTutorial({
      title: tutorial.title,
      description: tutorial.description,
      thumbnail: tutorial.thumbnail,
      youtubeUrl: tutorial.youtubeUrl
    });
  };

  const handleUpdateTutorial = () => {
    if (!editTutorial.title || !editTutorial.description || !editTutorial.youtubeUrl) {
      toast({
        title: "خطأ",
        description: "الرجاء ملء جميع الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }

    updateTutorial(editingTutorial!, editTutorial);
    setEditingTutorial(null);
    toast({
      title: "تم بنجاح",
      description: "تم تحديث الشرح بنجاح",
    });
  };

  const startEditWebsite = (website: any) => {
    setEditingWebsite(website.id);
    setEditWebsite({
      name: website.name,
      description: website.description,
      url: website.url,
      image: website.image
    });
  };

  const handleUpdateWebsite = () => {
    if (!editWebsite.name || !editWebsite.url) {
      toast({
        title: "خطأ",
        description: "الرجاء ملء جميع الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }

    updateWebsite(editingWebsite!, editWebsite);
    setEditingWebsite(null);
    toast({
      title: "تم بنجاح",
      description: "تم تحديث الموقع بنجاح",
    });
  };

  const startEditApp = (app: any) => {
    setEditingApp(app.id);
    setEditApp({
      name: app.name,
      description: app.description,
      downloadUrl: app.downloadUrl || '',
      icon: app.icon,
      appFile: app.appFile,
      fileName: app.fileName || ''
    });
  };

  const handleUpdateApp = () => {
    if (!editApp.name || (!editApp.downloadUrl && !editApp.appFile)) {
      toast({
        title: "خطأ",
        description: "الرجاء ملء جميع الحقول المطلوبة (الاسم + رابط التحميل أو ملف التطبيق)",
        variant: "destructive",
      });
      return;
    }

    updateApp(editingApp!, editApp);
    setEditingApp(null);
    toast({
      title: "تم بنجاح",
      description: "تم تحديث التطبيق بنجاح",
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

        {/* Page Content Editor - New Section */}
        <div className="mb-8">
          <PageContentEditor />
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
                    <SelectItem value="tiktok">تحميل من تيك توك</SelectItem>
                    <SelectItem value="instagram">تحميل من انستغرام</SelectItem>
                    <SelectItem value="twitter">تحميل من تويتر</SelectItem>
                    <SelectItem value="pinterest">تحميل من بنترست</SelectItem>
                    <SelectItem value="tutorials">مجموعة شروحات</SelectItem>
                    <SelectItem value="websites">مجموعة مواقع</SelectItem>
                    <SelectItem value="apps">مجموعة تطبيقات</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {(newMenuItem.type === 'tiktok' || newMenuItem.type === 'instagram' || newMenuItem.type === 'twitter' || newMenuItem.type === 'pinterest') && (
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

              <ImageUploader
                label="الصورة المصغرة"
                currentImage={newTutorial.thumbnail}
                onImageSelect={(imageUrl) => setNewTutorial({ ...newTutorial, thumbnail: imageUrl })}
              />

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

              <ImageUploader
                label="صورة الموقع"
                currentImage={newWebsite.image}
                onImageSelect={(imageUrl) => setNewWebsite({ ...newWebsite, image: imageUrl })}
              />

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
                <Label htmlFor="downloadUrl">رابط التحميل (اختياري)</Label>
                <Input
                  id="downloadUrl"
                  value={newApp.downloadUrl}
                  onChange={(e) => setNewApp({ ...newApp, downloadUrl: e.target.value })}
                  placeholder="https://example.com/app.apk"
                />
              </div>

              <AppFileUploader
                label="أو ارفع ملف التطبيق من جهازك"
                currentFile={newApp.appFile}
                fileName={newApp.fileName}
                onFileSelect={(file, fileName) => setNewApp({ ...newApp, appFile: file || undefined, fileName: fileName || '' })}
              />

              <ImageUploader
                label="أيقونة التطبيق"
                currentImage={newApp.icon}
                onImageSelect={(imageUrl) => setNewApp({ ...newApp, icon: imageUrl })}
              />

              <Button onClick={handleAddApp} className="w-full">
                إضافة التطبيق
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Current Items with Edit functionality */}
        <div className="mt-12 space-y-8">
          {/* Menu Items */}
          {menuItems.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>عناصر القائمة الحالية</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {menuItems.map((item) => (
                    <div key={item.id}>
                      {editingMenuItem === item.id ? (
                        <Card className="p-4 bg-blue-50">
                          <div className="space-y-4">
                            <div>
                              <Label>اسم العنصر</Label>
                              <Input
                                value={editMenuItem.name}
                                onChange={(e) => setEditMenuItem({ ...editMenuItem, name: e.target.value })}
                                placeholder="اسم العنصر"
                              />
                            </div>
                            
                            <div>
                              <Label>نوع العنصر</Label>
                              <Select value={editMenuItem.type} onValueChange={(value) => setEditMenuItem({ ...editMenuItem, type: value as any })}>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="tiktok">تحميل من تيك توك</SelectItem>
                                  <SelectItem value="instagram">تحميل من انستغرام</SelectItem>
                                  <SelectItem value="twitter">تحميل من تويتر</SelectItem>
                                  <SelectItem value="pinterest">تحميل من بنترست</SelectItem>
                                  <SelectItem value="tutorials">مجموعة شروحات</SelectItem>
                                  <SelectItem value="websites">مجموعة مواقع</SelectItem>
                                  <SelectItem value="apps">مجموعة تطبيقات</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            {(editMenuItem.type === 'tiktok' || editMenuItem.type === 'instagram' || editMenuItem.type === 'twitter' || editMenuItem.type === 'pinterest') && (
                              <div>
                                <Label>رابط API</Label>
                                <Input
                                  value={editMenuItem.apiUrl}
                                  onChange={(e) => setEditMenuItem({ ...editMenuItem, apiUrl: e.target.value })}
                                  placeholder="https://api.example.com/download?url="
                                />
                              </div>
                            )}

                            <div className="flex gap-2">
                              <Button onClick={handleUpdateMenuItem} size="sm">
                                حفظ التغييرات
                              </Button>
                              <Button 
                                onClick={() => setEditingMenuItem(null)} 
                                size="sm" 
                                variant="outline"
                              >
                                إلغاء
                              </Button>
                            </div>
                          </div>
                        </Card>
                      ) : (
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="font-medium">{item.name}</span>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => startEditMenuItem(item)}
                            >
                              <Pen className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => deleteMenuItem(item.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      )}
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
                <div className="space-y-4">
                  {tutorials.map((tutorial) => (
                    <div key={tutorial.id}>
                      {editingTutorial === tutorial.id ? (
                        <Card className="p-4 bg-blue-50">
                          <div className="space-y-4">
                            <div>
                              <Label>عنوان الشرح</Label>
                              <Input
                                value={editTutorial.title}
                                onChange={(e) => setEditTutorial({ ...editTutorial, title: e.target.value })}
                                placeholder="عنوان الشرح"
                              />
                            </div>
                            
                            <div>
                              <Label>الوصف</Label>
                              <Textarea
                                value={editTutorial.description}
                                onChange={(e) => setEditTutorial({ ...editTutorial, description: e.target.value })}
                                placeholder="وصف الشرح"
                                rows={3}
                              />
                            </div>

                            <ImageUploader
                              label="الصورة المصغرة"
                              currentImage={editTutorial.thumbnail}
                              onImageSelect={(imageUrl) => setEditTutorial({ ...editTutorial, thumbnail: imageUrl })}
                            />

                            <div>
                              <Label>رابط يوتيوب</Label>
                              <Input
                                value={editTutorial.youtubeUrl}
                                onChange={(e) => setEditTutorial({ ...editTutorial, youtubeUrl: e.target.value })}
                                placeholder="https://youtube.com/watch?v=..."
                              />
                            </div>

                            <div className="flex gap-2">
                              <Button onClick={handleUpdateTutorial} size="sm">
                                حفظ التغييرات
                              </Button>
                              <Button 
                                onClick={() => setEditingTutorial(null)} 
                                size="sm" 
                                variant="outline"
                              >
                                إلغاء
                              </Button>
                            </div>
                          </div>
                        </Card>
                      ) : (
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="font-medium">{tutorial.title}</span>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => startEditTutorial(tutorial)}
                            >
                              <Pen className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => deleteTutorial(tutorial.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Websites */}
          {websites.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>المواقع الحالية</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {websites.map((website) => (
                    <div key={website.id}>
                      {editingWebsite === website.id ? (
                        <Card className="p-4 bg-blue-50">
                          <div className="space-y-4">
                            <div>
                              <Label>اسم الموقع</Label>
                              <Input
                                value={editWebsite.name}
                                onChange={(e) => setEditWebsite({ ...editWebsite, name: e.target.value })}
                                placeholder="اسم الموقع"
                              />
                            </div>
                            
                            <div>
                              <Label>الوصف</Label>
                              <Textarea
                                value={editWebsite.description}
                                onChange={(e) => setEditWebsite({ ...editWebsite, description: e.target.value })}
                                placeholder="وصف الموقع"
                                rows={3}
                              />
                            </div>

                            <div>
                              <Label>رابط الموقع</Label>
                              <Input
                                value={editWebsite.url}
                                onChange={(e) => setEditWebsite({ ...editWebsite, url: e.target.value })}
                                placeholder="https://example.com"
                              />
                            </div>

                            <ImageUploader
                              label="صورة الموقع"
                              currentImage={editWebsite.image}
                              onImageSelect={(imageUrl) => setEditWebsite({ ...editWebsite, image: imageUrl })}
                            />

                            <div className="flex gap-2">
                              <Button onClick={handleUpdateWebsite} size="sm">
                                حفظ التغييرات
                              </Button>
                              <Button 
                                onClick={() => setEditingWebsite(null)} 
                                size="sm" 
                                variant="outline"
                              >
                                إلغاء
                              </Button>
                            </div>
                          </div>
                        </Card>
                      ) : (
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="font-medium">{website.name}</span>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => startEditWebsite(website)}
                            >
                              <Pen className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => deleteWebsite(website.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Apps */}
          {apps.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>التطبيقات الحالية</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {apps.map((app) => (
                    <div key={app.id}>
                      {editingApp === app.id ? (
                        <Card className="p-4 bg-blue-50">
                          <div className="space-y-4">
                            <div>
                              <Label>اسم التطبيق</Label>
                              <Input
                                value={editApp.name}
                                onChange={(e) => setEditApp({ ...editApp, name: e.target.value })}
                                placeholder="اسم التطبيق"
                              />
                            </div>
                            
                            <div>
                              <Label>الوصف</Label>
                              <Textarea
                                value={editApp.description}
                                onChange={(e) => setEditApp({ ...editApp, description: e.target.value })}
                                placeholder="وصف التطبيق"
                                rows={3}
                              />
                            </div>

                            <div>
                              <Label>رابط التحميل (اختياري)</Label>
                              <Input
                                value={editApp.downloadUrl}
                                onChange={(e) => setEditApp({ ...editApp, downloadUrl: e.target.value })}
                                placeholder="https://example.com/app.apk"
                              />
                            </div>

                            <AppFileUploader
                              label="أو ارفع ملف التطبيق من جهازك"
                              currentFile={editApp.appFile}
                              fileName={editApp.fileName}
                              onFileSelect={(file, fileName) => setEditApp({ ...editApp, appFile: file || undefined, fileName: fileName || '' })}
                            />

                            <ImageUploader
                              label="أيقونة التطبيق"
                              currentImage={editApp.icon}
                              onImageSelect={(imageUrl) => setEditApp({ ...editApp, icon: imageUrl })}
                            />

                            <div className="flex gap-2">
                              <Button onClick={handleUpdateApp} size="sm">
                                حفظ التغييرات
                              </Button>
                              <Button 
                                onClick={() => setEditingApp(null)} 
                                size="sm" 
                                variant="outline"
                              >
                                إلغاء
                              </Button>
                            </div>
                          </div>
                        </Card>
                      ) : (
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <span className="font-medium">{app.name}</span>
                            {app.appFile && (
                              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                                ملف مرفوع
                              </span>
                            )}
                            {app.downloadUrl && (
                              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                رابط خارجي
                              </span>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => startEditApp(app)}
                            >
                              <Pen className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => deleteApp(app.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      )}
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
