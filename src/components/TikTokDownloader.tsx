
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
    const tiktokRegex = /^https?:\/\/(www\.)?(vm\.tiktok\.com|tiktok\.com|m\.tiktok\.com)/i;
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
      
      // جرب عدة APIs للتأكد من نجاح التحميل
      const apis = [
        `https://tofey.serv00.net/tiktok?url=${encodeURIComponent(url)}`,
        `https://api.tiklydown.eu.org/api/download?url=${encodeURIComponent(url)}`,
        `https://tikmate.app/download?url=${encodeURIComponent(url)}`
      ];

      let success = false;
      
      for (const apiUrl of apis) {
        try {
          console.log('جاري تجربة API:', apiUrl);
          const response = await fetch(apiUrl);
          
          if (!response.ok) {
            console.log('فشل API:', apiUrl, response.status);
            continue;
          }

          const data = await response.json();
          console.log('استجابة API:', data);

          // تحقق من وجود رابط الفيديو في الاستجابة
          const videoUrl = data.video || data.play || data.videoUrl || data.download_url;
          
          if (videoUrl) {
            setVideoData({
              video: videoUrl,
              title: data.title || data.desc || '',
              thumbnail: data.thumbnail || data.cover || ''
            });
            success = true;
            toast({
              title: "تم بنجاح",
              description: "تم جلب الفيديو بنجاح",
            });
            break;
          }
        } catch (apiError) {
          console.error('خطأ في API:', apiUrl, apiError);
          continue;
        }
      }

      if (!success) {
        throw new Error('فشل في جلب الفيديو من جميع الخوادم');
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
      
      // استخدم طريقة أكثر موثوقية للتحميل
      const proxyUrl = `https://cors-anywhere.herokuapp.com/${videoData.video}`;
      
      try {
        const response = await fetch(videoData.video, { mode: 'no-cors' });
        const blob = await response.blob();
        
        if (blob.size > 0) {
          const downloadUrl = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = downloadUrl;
          link.download = `tiktok-video-${Date.now()}.mp4`;
          link.style.display = 'none';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(downloadUrl);
          
          toast({
            title: "تم التحميل",
            description: "تم تحميل الفيديو بنجاح",
          });
        } else {
          throw new Error('ملف فارغ');
        }
      } catch (fetchError) {
        // إذا فشل التحميل المباشر، افتح الرابط في تبويب جديد
        console.log('فشل التحميل المباشر، فتح الرابط في تبويب جديد');
        window.open(videoData.video, '_blank');
        toast({
          title: "إعادة توجيه",
          description: "تم فتح رابط التحميل في تبويب جديد",
        });
      }
      
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
              <p>• يمكن استخدام الروابط المختصرة (vm.tiktok.com)</p>
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
                الفيديو جاهز للتحميل
              </h3>

              {videoData.title && (
                <p className="text-sm text-gray-600 text-center font-medium">
                  {videoData.title}
                </p>
              )}
              
              <div className="flex justify-center">
                <video
                  controls
                  className="max-w-full max-h-96 rounded-lg shadow-lg"
                  src={videoData.video}
                  poster={videoData.thumbnail}
                  preload="metadata"
                  onError={(e) => {
                    console.error('خطأ في تحميل الفيديو:', e);
                    setError('فشل في تحميل الفيديو للمعاينة، لكن يمكن تحميله');
                  }}
                >
                  متصفحك لا يدعم تشغيل الفيديو
                </video>
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
                إذا لم يعمل التحميل التلقائي، سيتم فتح رابط التحميل في تبويب جديد
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TikTokDownloader;
