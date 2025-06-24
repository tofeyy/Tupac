
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { Download, Play, Loader2, AlertCircle } from 'lucide-react';

const TikTokDownloader: React.FC = () => {
  const [url, setUrl] = useState('');
  const [videoData, setVideoData] = useState<{ video: string; title?: string; thumbnail?: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');

  const isValidTikTokUrl = (url: string) => {
    const tiktokRegex = /^https?:\/\/(www\.)?(vm\.tiktok\.com|tiktok\.com|m\.tiktok\.com|vt\.tiktok\.com|lite\.tiktok\.com)/i;
    return tiktokRegex.test(url);
  };

  const handlePreview = async () => {
    if (!url.trim()) {
      toast({
        title: "خطأ",
        description: "الرجاء إدخال رابط الفيديو",
        variant: "destructive",
      });
      return;
    }

    if (!isValidTikTokUrl(url)) {
      toast({
        title: "خطأ",
        description: "الرجاء إدخال رابط TikTok صحيح",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setVideoData(null);
    setError('');

    try {
      console.log('جاري جلب الفيديو من:', url);
      
      // استخدم الـ API المحدد
      const apiUrl = `https://tofey.serv00.net/tiktok?url=${encodeURIComponent(url)}`;
      console.log('جاري تجربة API:', apiUrl);
      
      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('استجابة API:', data);

      // تحقق من وجود رابط الفيديو في الاستجابة
      if (data.video) {
        setVideoData({
          video: data.video,
          title: data.title || '',
          thumbnail: data.thumbnail || ''
        });
        toast({
          title: "تم بنجاح",
          description: "تم جلب الفيديو بنجاح",
        });
      } else {
        throw new Error('لم يتم العثور على رابط الفيديو في الاستجابة');
      }

    } catch (error) {
      console.error('خطأ في جلب الفيديو:', error);
      setError('فشل في جلب الفيديو. تأكد من صحة الرابط أو جرب مرة أخرى لاحقاً');
      toast({
        title: "خطأ",
        description: "فشل في جلب الفيديو. تأكد من صحة الرابط",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!videoData?.video) return;

    setProcessing(true);
    try {
      console.log('جاري تحميل الفيديو من:', videoData.video);
      
      // إنشاء رابط تحميل مباشر
      const link = document.createElement('a');
      link.href = videoData.video;
      link.download = `tiktok-video-${Date.now()}.mp4`;
      link.target = '_blank';
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "تم التحميل",
        description: "تم بدء تحميل الفيديو",
      });
      
    } catch (error) {
      console.error('خطأ في التحميل:', error);
      toast({
        title: "خطأ في التحميل",
        description: "فشل في تحميل الفيديو، جرب فتح الرابط يدوياً",
        variant: "destructive",
      });
      // كبديل، افتح الرابط في تبويب جديد
      if (videoData?.video) {
        window.open(videoData.video, '_blank');
      }
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-2 border-purple-100 shadow-lg">
        <CardHeader className="text-center bg-gradient-to-r from-purple-50 to-blue-50">
          <CardTitle className="text-2xl gradient-text flex items-center justify-center gap-2">
            <Download className="w-6 h-6" />
            تحميل فيديوهات تيك توك
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div>
              <Input
                type="url"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  setError('');
                }}
                placeholder="الصق رابط فيديو تيك توك هنا... (مثال: https://vm.tiktok.com/xxxxx)"
                className="text-right"
                dir="ltr"
              />
              {error && (
                <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm">{error}</span>
                </div>
              )}
            </div>
            
            <Button
              onClick={handlePreview}
              disabled={loading}
              className="w-full gradient-bg text-white hover:opacity-90 flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  جاري الجلب...
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  عرض الفيديو
                </>
              )}
            </Button>

            {/* نصائح للاستخدام */}
            <div className="text-xs text-gray-500 space-y-1 bg-gray-50 p-3 rounded-lg">
              <p><strong>نصائح:</strong></p>
              <p>• تأكد من أن الرابط يبدأ بـ https://</p>
              <p>• يمكن استخدام الروابط المختصرة (vm.tiktok.com, vt.tiktok.com)</p>
              <p>• تأكد من أن الفيديو متاح للعامة</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {videoData && (
        <Card className="animate-fade-in border-green-200 bg-green-50">
          <CardContent className="p-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-green-800 text-center">
                الفيديو جاهز للمشاهدة والتحميل
              </h3>

              {videoData.title && (
                <p className="text-sm text-gray-600 text-center font-medium">
                  {videoData.title}
                </p>
              )}
              
              <div className="flex justify-center relative">
                <video
                  controls
                  className="max-w-full max-h-96 rounded-lg shadow-lg"
                  src={videoData.video}
                  poster={videoData.thumbnail}
                  preload="metadata"
                  onError={(e) => {
                    console.error('خطأ في تحميل الفيديو:', e);
                  }}
                >
                  متصفحك لا يدعم تشغيل الفيديو
                </video>
                
                {/* زر التحميل داخل منطقة الفيديو */}
                <div className="absolute bottom-4 right-4">
                  <Button
                    onClick={handleDownload}
                    disabled={processing}
                    size="sm"
                    className="bg-black/70 hover:bg-black/90 text-white backdrop-blur-sm"
                  >
                    {processing ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Download className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
              
              <Button
                onClick={handleDownload}
                disabled={processing}
                className="w-full bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
              >
                {processing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    جاري التحميل...
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    تحميل الفيديو
                  </>
                )}
              </Button>
              
              <p className="text-xs text-gray-500 text-center">
                اضغط على زر التحميل لحفظ الفيديو على جهازك
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TikTokDownloader;
