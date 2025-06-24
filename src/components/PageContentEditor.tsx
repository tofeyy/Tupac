
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSite } from '@/contexts/SiteContext';
import { toast } from '@/hooks/use-toast';
import { Edit, Save } from 'lucide-react';
import ImageUploader from './ImageUploader';

const PageContentEditor = () => {
  const { pageContents, updatePageContent, getPageContent } = useSite();
  const [selectedPage, setSelectedPage] = useState('');
  const [editContent, setEditContent] = useState({
    title: '',
    subtitle: '',
    description: '',
    image: '',
    content: '',
    ctaText: '',
    ctaUrl: ''
  });

  const pages = [
    { key: 'home', name: 'الصفحة الرئيسية' },
    { key: 'about', name: 'صفحة حولي' },
    { key: 'tutorials', name: 'صفحة الشروحات' },
    { key: 'websites', name: 'صفحة المواقع' },
    { key: 'apps', name: 'صفحة التطبيقات' }
  ];

  const handlePageSelect = (pageKey: string) => {
    setSelectedPage(pageKey);
    const content = getPageContent(pageKey);
    if (content) {
      setEditContent({
        title: content.title || '',
        subtitle: content.subtitle || '',
        description: content.description || '',
        image: content.image || '',
        content: content.content || '',
        ctaText: content.ctaText || '',
        ctaUrl: content.ctaUrl || ''
      });
    } else {
      setEditContent({
        title: '',
        subtitle: '',
        description: '',
        image: '',
        content: '',
        ctaText: '',
        ctaUrl: ''
      });
    }
  };

  const handleSave = () => {
    if (!selectedPage) {
      toast({
        title: "خطأ",
        description: "الرجاء اختيار صفحة للتعديل",
        variant: "destructive",
      });
      return;
    }

    updatePageContent(selectedPage, editContent);
    toast({
      title: "تم بنجاح",
      description: "تم حفظ تغييرات الصفحة بنجاح",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Edit className="w-5 h-5" />
          تحرير محتوى الصفحات
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="pageSelect">اختر الصفحة للتعديل</Label>
          <Select value={selectedPage} onValueChange={handlePageSelect}>
            <SelectTrigger>
              <SelectValue placeholder="اختر صفحة..." />
            </SelectTrigger>
            <SelectContent>
              {pages.map((page) => (
                <SelectItem key={page.key} value={page.key}>
                  {page.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedPage && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="pageTitle">العنوان الرئيسي</Label>
              <Input
                id="pageTitle"
                value={editContent.title}
                onChange={(e) => setEditContent({ ...editContent, title: e.target.value })}
                placeholder="العنوان الرئيسي للصفحة"
              />
            </div>

            <div>
              <Label htmlFor="pageSubtitle">العنوان الفرعي</Label>
              <Input
                id="pageSubtitle"
                value={editContent.subtitle}
                onChange={(e) => setEditContent({ ...editContent, subtitle: e.target.value })}
                placeholder="العنوان الفرعي للصفحة"
              />
            </div>

            <div>
              <Label htmlFor="pageDescription">الوصف</Label>
              <Textarea
                id="pageDescription"
                value={editContent.description}
                onChange={(e) => setEditContent({ ...editContent, description: e.target.value })}
                placeholder="وصف الصفحة"
                rows={3}
              />
            </div>

            <ImageUploader
              label="صورة الصفحة"
              currentImage={editContent.image}
              onImageSelect={(imageUrl) => setEditContent({ ...editContent, image: imageUrl })}
            />

            <div>
              <Label htmlFor="pageContent">المحتوى الإضافي</Label>
              <Textarea
                id="pageContent"
                value={editContent.content}
                onChange={(e) => setEditContent({ ...editContent, content: e.target.value })}
                placeholder="محتوى إضافي للصفحة"
                rows={4}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="ctaText">نص زر الإجراء</Label>
                <Input
                  id="ctaText"
                  value={editContent.ctaText}
                  onChange={(e) => setEditContent({ ...editContent, ctaText: e.target.value })}
                  placeholder="مثال: ابدأ الآن"
                />
              </div>

              <div>
                <Label htmlFor="ctaUrl">رابط زر الإجراء</Label>
                <Input
                  id="ctaUrl"
                  value={editContent.ctaUrl}
                  onChange={(e) => setEditContent({ ...editContent, ctaUrl: e.target.value })}
                  placeholder="https://example.com"
                />
              </div>
            </div>

            <Button onClick={handleSave} className="w-full flex items-center gap-2">
              <Save className="w-4 h-4" />
              حفظ التغييرات
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PageContentEditor;
