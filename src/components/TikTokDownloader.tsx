
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { Download, Play, Loader2 } from 'lucide-react';

const TikTokDownloader: React.FC = () => {
  const [url, setUrl] = useState('');
  const [videoData, setVideoData] = useState<{ video: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);

  const handlePreview = async () => {
    if (!url.trim()) {
      toast({
        title: "خطأ",
        description: "الرجاء إدخال رابط الفيديو",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setVideoData(null);

    try {
      console.log('جاري جلب الفيديو من:', url);
      const response = await fetch(`https://tofey.serv00.net/tiktok?url=${encodeURIComponent(url)}`);
      
      if (!response.ok) {
        throw new Error('فشل في جلب الفيديو');
      }

      const data = await response.json();
      console.log('استجابة API:', data);

      if (data.video) {
        setVideoData(data);
        toast({
          title: "تم بنجاح",
          description: "تم جلب الفيديو بنجاح",
        });
      } else {
        throw new Error('لم يتم العثور على رابط الفيديو');
      }
    } catch (error) {
      console.error('خطأ في جلب الفيديو:', error);
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
      const response = await fetch(videoData.video);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `tiktok-video-${Date.now()}.mp4`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      window.URL.revokeObjectURL(downloadUrl);
      
      toast({
        title: "تم التحميل",
        description: "تم تحميل الفيديو بنجاح",
      });
    } catch (error) {
      console.error('خطأ في التحميل:', error);
      toast({
        title: "خطأ في التحميل",
        description: "فشل في تحميل الفيديو",
        variant: "destructive",
      });
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
                onChange={(e) => setUrl(e.target.value)}
                placeholder="الصق رابط فيديو تيك توك هنا..."
                className="text-right"
                dir="ltr"
              />
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
              
              <video
                controls
                className="w-full max-w-md mx-auto rounded-lg shadow-lg"
                src={videoData.video}
              >
                متصفحك لا يدعم تشغيل الفيديو
              </video>
              
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
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TikTokDownloader;
