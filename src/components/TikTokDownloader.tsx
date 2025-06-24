
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { Download, Play, Loader2, AlertCircle, Sparkles, Crown, Zap } from 'lucide-react';

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

  // قائمة APIs احتياطية
  const apiUrls = [
    'https://api.tiklydown.eu.org/api/download?url=',
    'https://api.tiktokv.com/aweme/v1/feed/?url=',
    'https://tofey.serv00.net/tiktok?url=',
    'https://www.tikwm.com/api/?url=',
    'https://tikdown.org/api?url='
  ];

  const tryDownloadWithApi = async (apiUrl: string, videoUrl: string) => {
    console.log(`جاري تجربة API: ${apiUrl}${encodeURIComponent(videoUrl)}`);
    
    try {
      const response = await fetch(`${apiUrl}${encodeURIComponent(videoUrl)}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(`استجابة API (${apiUrl}):`, data);

      // تحليل الاستجابة حسب نوع API
      if (data.video || data.data?.play || data.aweme_list?.[0]?.video?.play_addr?.url_list?.[0]) {
        const videoLink = data.video || 
                         data.data?.play || 
                         data.aweme_list?.[0]?.video?.play_addr?.url_list?.[0] ||
                         data.data?.video_no_watermark ||
                         data.video_no_watermark;
        
        if (videoLink) {
          return {
            video: videoLink,
            title: data.title || data.data?.title || data.aweme_list?.[0]?.desc || '',
            thumbnail: data.thumbnail || data.data?.cover || data.aweme_list?.[0]?.video?.cover?.url_list?.[0] || ''
          };
        }
      }
      
      throw new Error('لم يتم العثور على رابط الفيديو في الاستجابة');
    } catch (error) {
      console.error(`فشل API ${apiUrl}:`, error);
      throw error;
    }
  };

  const handlePreview = async () => {
    if (!url.trim()) {
      toast({
        title: "خطأ فاخر",
        description: "الرجاء إدخال رابط الفيديو الكريم",
        variant: "destructive",
      });
      return;
    }

    if (!isValidTikTokUrl(url)) {
      toast({
        title: "خطأ في الرابط",
        description: "الرجاء إدخال رابط TikTok صحيح وفاخر",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setVideoData(null);
    setError('');

    console.log('جاري جلب الفيديو من:', url);

    // محاولة استخدام APIs متعددة
    for (let i = 0; i < apiUrls.length; i++) {
      try {
        console.log(`محاولة ${i + 1}/${apiUrls.length}: ${apiUrls[i]}`);
        const result = await tryDownloadWithApi(apiUrls[i], url);
        
        if (result && result.video) {
          setVideoData(result);
          toast({
            title: "تم بنجاح فاخر ✨",
            description: "تم جلب الفيديو بأناقة وفخامة",
          });
          setLoading(false);
          return;
        }
      } catch (error) {
        console.error(`فشل API ${i + 1}:`, error);
        // استمر في المحاولة مع API التالي
        if (i === apiUrls.length - 1) {
          // إذا فشلت جميع APIs
          setError('فشل في جلب الفيديو من جميع المصادر. تأكد من صحة الرابط أو جرب مرة أخرى لاحقاً');
          toast({
            title: "خطأ مؤسف",
            description: "فشل في جلب الفيديو من جميع المصادر المتاحة",
            variant: "destructive",
          });
        }
      }
    }

    setLoading(false);
  };

  const handleDownload = async () => {
    if (!videoData?.video) return;

    setProcessing(true);
    try {
      console.log('جاري تحميل الفيديو من:', videoData.video);
      
      // محاولة التحميل المباشر
      try {
        const response = await fetch(videoData.video);
        const blob = await response.blob();
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
          title: "تحميل فاخر ✨",
          description: "تم تحميل الفيديو بنجاح",
        });
      } catch (downloadError) {
        // إذا فشل التحميل المباشر، افتح الرابط في نافذة جديدة
        console.log('فشل التحميل المباشر، فتح الرابط في نافذة جديدة');
        window.open(videoData.video, '_blank');
        
        toast({
          title: "تم فتح الفيديو",
          description: "تم فتح الفيديو في نافذة جديدة للتحميل اليدوي",
        });
      }
      
    } catch (error) {
      console.error('خطأ في التحميل:', error);
      toast({
        title: "خطأ في التحميل",
        description: "فشل في تحميل الفيديو، جرب فتح الرابط يدوياً",
        variant: "destructive",
      });
      if (videoData?.video) {
        window.open(videoData.video, '_blank');
      }
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="space-y-8">
      <Card className="luxury-card border-0 shadow-2xl overflow-hidden">
        <CardHeader className="text-center luxury-gradient p-10">
          <CardTitle className="text-3xl font-bold font-playfair text-white flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
              <Crown className="w-7 h-7 text-white" />
            </div>
            تحميل فيديوهات تيك توك الفاخر
          </CardTitle>
          <p className="text-white/90 text-lg font-medium">تجربة تحميل بتصميم أنيق وفاخر</p>
        </CardHeader>
        <CardContent className="p-10">
          <div className="space-y-6">
            <div className="relative">
              <Input
                type="url"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  setError('');
                }}
                placeholder="الصق رابط فيديو تيك توك الفاخر هنا... ✨"
                className="text-right h-16 text-lg rounded-2xl border-2 border-purple-200 focus:border-purple-400 transition-all duration-300 bg-white/80 backdrop-blur-sm"
                dir="ltr"
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <Sparkles className="w-6 h-6 text-purple-400" />
              </div>
              {error && (
                <div className="mt-4 p-4 bg-red-50 border-2 border-red-200 rounded-2xl flex items-center gap-3 text-red-700">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span className="font-medium">{error}</span>
                </div>
              )}
            </div>
            
            <Button
              onClick={handlePreview}
              disabled={loading}
              className="w-full luxury-gradient text-white hover:shadow-2xl transition-all duration-300 h-16 text-xl font-bold rounded-2xl"
            >
              {loading ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin ml-3" />
                  جاري الجلب الفاخر...
                </>
              ) : (
                <>
                  <Play className="w-6 h-6 ml-3" />
                  عرض الفيديو بأناقة
                </>
              )}
            </Button>

            {/* نصائح للاستخدام */}
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200/50 rounded-2xl p-6">
              <div className="text-sm text-gray-700 space-y-2">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="w-5 h-5 text-blue-500" />
                  <strong className="text-lg font-semibold">نصائح فاخرة:</strong>
                </div>
                <p className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  تأكد من أن الرابط يبدأ بـ https://
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  يمكن استخدام الروابط المختصرة (vm.tiktok.com, vt.tiktok.com)
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                  تأكد من أن الفيديو متاح للعامة
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  النظام يجرب عدة مصادر لضمان أفضل خدمة
                </p>
              </div>
            </Card>
          </div>
        </CardContent>
      </Card>

      {videoData && (
        <Card className="animate-scale-in luxury-card border-0 shadow-2xl overflow-hidden">
          <CardContent className="p-0">
            <div className="luxury-gradient p-6 text-center">
              <h3 className="text-2xl font-bold font-playfair text-white flex items-center justify-center gap-3">
                <Crown className="w-7 h-7" />
                الفيديو جاهز بأناقة فائقة
                <Crown className="w-7 h-7" />
              </h3>
            </div>

            <div className="p-8 space-y-6">
              {videoData.title && (
                <div className="text-center">
                  <p className="text-lg text-gray-700 font-semibold bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-2xl border-2 border-purple-200/50">
                    {videoData.title}
                  </p>
                </div>
              )}
              
              <div className="flex justify-center relative group">
                <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                  <video
                    controls
                    className="max-w-full max-h-96 rounded-3xl"
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
                      className="bg-black/70 hover:bg-black/90 text-white backdrop-blur-sm rounded-xl shadow-xl"
                    >
                      {processing ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Download className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
              
              <Button
                onClick={handleDownload}
                disabled={processing}
                className="w-full luxury-gradient-2 text-white hover:shadow-2xl transition-all duration-300 h-16 text-xl font-bold rounded-2xl"
              >
                {processing ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin ml-3" />
                    جاري التحميل الفاخر...
                  </>
                ) : (
                  <>
                    <Download className="w-6 h-6 ml-3" />
                    تحميل الفيديو بأناقة
                  </>
                )}
              </Button>
              
              <div className="text-center">
                <p className="text-sm text-gray-500 bg-gray-50 p-3 rounded-xl border border-gray-200">
                  اضغط على زر التحميل لحفظ الفيديو على جهازك بجودة فائقة ✨
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TikTokDownloader;
